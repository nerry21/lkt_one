<?php

namespace App\Console\Commands;

use App\Exceptions\TripGenerationDriverMissingException;
use App\Exceptions\TripSlotConflictException;
use App\Models\DailyDriverAssignment;
use App\Models\TripCutoverLog;
use App\Services\TripGenerationService;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Throwable;

/**
 * Daily 21:00 WIB trip cutover — generate besok's schedule (Fase D4 Sesi 24).
 *
 * Scheduler di routes/console.php invoke tanpa argument (trigger_source=scheduler).
 * Admin manual backfill pakai --date=YYYY-MM-DD (trigger_source=manual).
 *
 * Retry: 3x dengan fixed 5s delay (DP-24.2). Skip sleep di test env biar fast.
 *
 * Idempotent: kalau trip untuk target_date sudah ada (TripSlotConflictException
 * dari TripGenerationService), catat sebagai idempotent_skip dan exit sukses.
 *
 * Audit dual-track: trip_cutover_logs table (structured) + Log::error (alerting).
 */
class ProcessTripCutoverCommand extends Command
{
    protected $signature = 'trips:cutover {--date= : Target date YYYY-MM-DD (default: besok)}';

    protected $description = 'Generate trip schedule untuk besok (atau --date). Dipanggil scheduler jam 21:00 WIB.';

    private const MAX_RETRIES = 3;
    private const RETRY_DELAY_SECONDS = 5;

    public function __construct(
        private readonly TripGenerationService $tripGenerationService,
    ) {
        parent::__construct();
    }

    public function handle(): int
    {
        $targetDate = $this->resolveTargetDate();
        $triggerSource = $this->option('date')
            ? TripCutoverLog::TRIGGER_MANUAL
            : TripCutoverLog::TRIGGER_SCHEDULER;

        $this->info("Starting trip cutover for {$targetDate->toDateString()} (source: {$triggerSource})");

        // Pre-check: ada driver assignments untuk target_date?
        $assignments = $this->fetchAssignments($targetDate);

        if ($assignments === []) {
            $this->logMissingAssignments($targetDate, $triggerSource, null);
            $this->error("No driver assignments found for {$targetDate->toDateString()}. Aborting.");
            return self::FAILURE;
        }

        // Retry loop
        $startedAt = now();
        $lastError = null;

        for ($attempt = 1; $attempt <= self::MAX_RETRIES; $attempt++) {
            try {
                $result = $this->tripGenerationService->generateForDate(
                    $targetDate->toDateString(),
                    $assignments,
                );

                $this->logSuccess($targetDate, $triggerSource, $attempt, $startedAt, $result);
                $this->info("Cutover SUCCESS (attempt {$attempt}): trips generated for {$targetDate->toDateString()}");
                return self::SUCCESS;
            } catch (TripSlotConflictException $e) {
                // DP-24.4: idempotent — trip sudah ada untuk target_date.
                $this->logIdempotentSkip($targetDate, $triggerSource, $attempt, $startedAt);
                $this->info("Cutover IDEMPOTENT SKIP: {$targetDate->toDateString()} already has trips.");
                return self::SUCCESS;
            } catch (TripGenerationDriverMissingException $e) {
                // Partial mapping — mobil aktif tanpa driver. Not transient; no retry.
                $this->logMissingAssignments($targetDate, $triggerSource, $e);
                $this->error("Cutover ABORTED: missing driver for active mobil: ".implode(', ', $e->missingMobilIds));
                return self::FAILURE;
            } catch (Throwable $e) {
                $lastError = $e;
                Log::error('Trip cutover attempt failed', [
                    'attempt' => $attempt,
                    'target_date' => $targetDate->toDateString(),
                    'error' => $e->getMessage(),
                ]);

                if ($attempt < self::MAX_RETRIES) {
                    $this->warn("Attempt {$attempt} failed: {$e->getMessage()}. Retrying in ".self::RETRY_DELAY_SECONDS.'s...');
                    if (! app()->runningUnitTests()) {
                        sleep(self::RETRY_DELAY_SECONDS);
                    }
                }
            }
        }

        // Retries exhausted
        $this->logFailure($targetDate, $triggerSource, self::MAX_RETRIES, $startedAt, $lastError);
        $this->error('Cutover FAILED after '.self::MAX_RETRIES.' attempts: '.($lastError?->getMessage() ?? 'unknown'));
        return self::FAILURE;
    }

    private function resolveTargetDate(): Carbon
    {
        $option = $this->option('date');
        if ($option) {
            return Carbon::parse($option)->startOfDay();
        }
        return now()->addDay()->startOfDay();
    }

    /**
     * @return array<string, string>  Map mobil_id => driver_id untuk target_date.
     */
    private function fetchAssignments(Carbon $targetDate): array
    {
        return DailyDriverAssignment::query()
            ->whereDate('date', $targetDate->toDateString())
            ->pluck('driver_id', 'mobil_id')
            ->toArray();
    }

    private function logSuccess(Carbon $date, string $source, int $attempt, Carbon $startedAt, array $result): void
    {
        TripCutoverLog::create([
            'target_date' => $date->toDateString(),
            'status' => TripCutoverLog::STATUS_SUCCESS,
            'trigger_source' => $source,
            'retry_count' => $attempt - 1,
            'error_message' => null,
            'context' => ['generation_result' => $this->summarizeResult($result)],
            'started_at' => $startedAt,
            'finished_at' => now(),
        ]);
    }

    private function logIdempotentSkip(Carbon $date, string $source, int $attempt, Carbon $startedAt): void
    {
        TripCutoverLog::create([
            'target_date' => $date->toDateString(),
            'status' => TripCutoverLog::STATUS_IDEMPOTENT_SKIP,
            'trigger_source' => $source,
            'retry_count' => $attempt - 1,
            'error_message' => null,
            'context' => ['reason' => 'Trips already exist for target_date'],
            'started_at' => $startedAt,
            'finished_at' => now(),
        ]);
    }

    private function logFailure(Carbon $date, string $source, int $attempts, Carbon $startedAt, ?Throwable $error): void
    {
        TripCutoverLog::create([
            'target_date' => $date->toDateString(),
            'status' => TripCutoverLog::STATUS_FAILED,
            'trigger_source' => $source,
            'retry_count' => $attempts,
            'error_message' => $error?->getMessage(),
            'context' => [
                'exception_class' => $error ? $error::class : null,
            ],
            'started_at' => $startedAt,
            'finished_at' => now(),
        ]);

        Log::error('Trip cutover FAILED permanently', [
            'target_date' => $date->toDateString(),
            'attempts' => $attempts,
            'final_error' => $error?->getMessage(),
        ]);
    }

    private function logMissingAssignments(Carbon $date, string $source, ?TripGenerationDriverMissingException $exception): void
    {
        $context = null;
        $errorMessage = 'No driver assignments found for target_date';

        if ($exception !== null) {
            $context = ['missing_mobil_ids' => $exception->missingMobilIds];
            $errorMessage = $exception->getMessage();
        }

        TripCutoverLog::create([
            'target_date' => $date->toDateString(),
            'status' => TripCutoverLog::STATUS_MISSING_ASSIGNMENTS,
            'trigger_source' => $source,
            'retry_count' => 0,
            'error_message' => $errorMessage,
            'context' => $context,
            'started_at' => now(),
            'finished_at' => now(),
        ]);

        Log::error('Trip cutover aborted: missing driver assignments', [
            'target_date' => $date->toDateString(),
            'partial' => $exception !== null,
        ]);
    }

    /**
     * Summarize TripGenerationService::generateForDate result untuk context JSON.
     * Actual return: array<int, array{direction, slots_filled, waiting_list_count, trip_ids}>.
     */
    private function summarizeResult(array $result): array
    {
        $totalTrips = 0;
        $byDirection = [];
        foreach ($result as $directionResult) {
            $direction = $directionResult['direction'] ?? 'unknown';
            $count = count($directionResult['trip_ids'] ?? []);
            $byDirection[$direction] = [
                'slots_filled' => $directionResult['slots_filled'] ?? 0,
                'waiting_list_count' => $directionResult['waiting_list_count'] ?? 0,
                'trips_created' => $count,
            ];
            $totalTrips += $count;
        }

        return [
            'total_trips_created' => $totalTrips,
            'by_direction' => $byDirection,
        ];
    }
}
