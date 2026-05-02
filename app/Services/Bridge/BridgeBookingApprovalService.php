<?php

declare(strict_types=1);

namespace App\Services\Bridge;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Schema;
use Illuminate\Validation\ValidationException;

/**
 * BridgeBookingApprovalService — handles approve/reject from chatbot bridge.
 *
 * Sesi 70 PR-CRM-6G.
 *
 * Authority is ENFORCED at chatbot side via config (JET_APPROVER_PHONES /
 * JET_REJECTER_PHONES). LKT trusts the bridge after middleware auth, but
 * stores the validator phone in validation_notes prefix for audit trail.
 *
 * validated_by FK resolution:
 *   - Lookup User::where('phone', $validatorPhone)->first()
 *   - If found: set validated_by = $user->id (UUID)
 *   - If null: validated_by remains NULL, audit captured in validation_notes prefix
 *
 * State transitions:
 *   - approve: Draft → Diproses (sets total_amount + price_per_seat + validated_at + validation_notes)
 *   - reject:  Draft → Ditolak  (sets validation_notes with reason)
 *
 * Race condition: first-write-wins via DB transaction + lockForUpdate.
 */
class BridgeBookingApprovalService
{
    /**
     * @param  array{
     *     approver_identifier: string,
     *     total_amount?: float|int|null,
     *     price_per_seat?: float|int|null,
     *     notes?: string|null,
     * } $payload
     * @throws ValidationException
     */
    public function approve(string $bookingCode, array $payload): Booking
    {
        return DB::transaction(function () use ($bookingCode, $payload): Booking {
            $booking = $this->lockBookingByCode($bookingCode);
            $this->ensureDraftStatus($booking, 'approve');

            $isReguler = $this->isRegulerBooking($booking);
            $totalAmount = isset($payload['total_amount']) ? (float) $payload['total_amount'] : null;
            $pricePerSeat = isset($payload['price_per_seat']) ? (float) $payload['price_per_seat'] : null;

            if (! $isReguler) {
                if ($totalAmount === null || $totalAmount <= 0) {
                    throw ValidationException::withMessages([
                        'total_amount' => ['Untuk booking non-Reguler, total_amount wajib diisi saat approve.'],
                    ]);
                }
                $booking->total_amount = $totalAmount;
                if ($pricePerSeat !== null && $pricePerSeat > 0) {
                    $booking->price_per_seat = $pricePerSeat;
                }
            } else {
                if ($totalAmount !== null && $totalAmount > 0) {
                    $booking->total_amount = $totalAmount;
                }
                if ($pricePerSeat !== null && $pricePerSeat > 0) {
                    $booking->price_per_seat = $pricePerSeat;
                }
            }

            $now = Carbon::now();
            $approverPhone = (string) ($payload['approver_identifier'] ?? 'unknown');
            $extraNotes = trim((string) ($payload['notes'] ?? ''));
            $auditPrefix = sprintf('[approved by chatbot:%s @ %s]', $approverPhone, $now->toIso8601String());
            $existingNotes = trim((string) $booking->validation_notes);
            $newNotes = $existingNotes === ''
                ? ($extraNotes === '' ? $auditPrefix : "{$auditPrefix} {$extraNotes}")
                : "{$existingNotes}\n{$auditPrefix}" . ($extraNotes === '' ? '' : " {$extraNotes}");

            $booking->booking_status = 'Diproses';
            $booking->validated_at = $now;
            $booking->validation_notes = $newNotes;
            $booking->validated_by = $this->resolveValidatorUserId($approverPhone);

            $booking->save();

            Log::channel('chatbot-bridge')->info('Booking approved via chatbot bridge', [
                'booking_code' => $bookingCode,
                'approver_phone' => $approverPhone,
                'validated_by' => $booking->validated_by,
                'total_amount' => $booking->total_amount,
                'is_reguler' => $isReguler,
            ]);

            return $booking->fresh();
        });
    }

    /**
     * @param  array{rejecter_identifier: string, reason: string} $payload
     * @throws ValidationException
     */
    public function reject(string $bookingCode, array $payload): Booking
    {
        return DB::transaction(function () use ($bookingCode, $payload): Booking {
            $booking = $this->lockBookingByCode($bookingCode);
            $this->ensureDraftStatus($booking, 'reject');

            $reason = trim((string) ($payload['reason'] ?? ''));
            if ($reason === '') {
                throw ValidationException::withMessages([
                    'reason' => ['Alasan reject wajib diisi.'],
                ]);
            }

            $now = Carbon::now();
            $rejecterPhone = (string) ($payload['rejecter_identifier'] ?? 'unknown');
            $auditPrefix = sprintf(
                '[rejected by chatbot:%s @ %s] %s',
                $rejecterPhone,
                $now->toIso8601String(),
                $reason
            );
            $existingNotes = trim((string) $booking->validation_notes);
            $newNotes = $existingNotes === '' ? $auditPrefix : "{$existingNotes}\n{$auditPrefix}";

            $booking->booking_status = 'Ditolak';
            $booking->validated_at = $now;
            $booking->validation_notes = $newNotes;
            $booking->validated_by = $this->resolveValidatorUserId($rejecterPhone);

            $booking->save();

            Log::channel('chatbot-bridge')->info('Booking rejected via chatbot bridge', [
                'booking_code' => $bookingCode,
                'rejecter_phone' => $rejecterPhone,
                'validated_by' => $booking->validated_by,
                'reason' => $reason,
            ]);

            return $booking->fresh();
        });
    }

    private function lockBookingByCode(string $code): Booking
    {
        $booking = Booking::query()
            ->where('booking_code', $code)
            ->lockForUpdate()
            ->first();

        if ($booking === null) {
            throw ValidationException::withMessages([
                'booking_code' => ["Booking dengan kode {$code} tidak ditemukan."],
            ]);
        }

        return $booking;
    }

    private function ensureDraftStatus(Booking $booking, string $action): void
    {
        if ($booking->booking_status !== 'Draft') {
            throw ValidationException::withMessages([
                'booking_status' => [sprintf(
                    'Booking %s tidak dalam status Draft (current: %s). Tidak bisa di-%s.',
                    $booking->booking_code,
                    $booking->booking_status,
                    $action
                )],
            ]);
        }
    }

    /**
     * Booking model uses `category` field (verified Sesi 70 pre-flight).
     * Fallback: parse booking_code prefix (RBK = Reguler) kalau category null.
     */
    private function isRegulerBooking(Booking $booking): bool
    {
        $category = $booking->category ?? null;
        if ($category !== null && $category !== '') {
            return strcasecmp((string) $category, 'Reguler') === 0;
        }
        return str_starts_with((string) $booking->booking_code, 'RBK-');
    }

    /**
     * Resolve validator UUID from phone (Opsi B).
     * Returns null kalau user dengan phone tersebut tidak ditemukan.
     */
    private function resolveValidatorUserId(string $phoneE164): ?string
    {
        if (! $this->phoneColumnExists()) {
            return null;
        }

        $user = User::query()->where('phone', $phoneE164)->first();
        return $user?->id;
    }

    private function phoneColumnExists(): bool
    {
        static $cached = null;
        if ($cached !== null) {
            return $cached;
        }
        try {
            $cached = Schema::hasColumn('users', 'phone');
        } catch (\Throwable) {
            $cached = false;
        }
        return $cached;
    }
}
