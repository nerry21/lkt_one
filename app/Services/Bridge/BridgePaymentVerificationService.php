<?php

declare(strict_types=1);

namespace App\Services\Bridge;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

/**
 * Sesi 71 PR-CRM-6H — Payment verification service.
 *
 * 2 metode utama:
 *   - verifyTransfer(): admin konfirmasi transfer diterima → flip ke Dibayar
 *   - confirmCashPayment(): admin konfirmasi cash diterima post-departure
 *
 * Pattern: transaction + lockForUpdate + audit trail di validation_notes.
 * Toleransi nominal: ±1 rupiah (untuk handle rounding) — kalau lebih dari itu
 * throw ValidationException biar admin bisa correct.
 */
class BridgePaymentVerificationService
{
    private const NOMINAL_TOLERANCE = 1;

    /**
     * @param array{
     *     verifier_identifier: string,
     *     amount?: float|int|null,
     *     reference?: string|null,
     *     notes?: string|null,
     * } $payload
     */
    public function verifyTransfer(string $bookingCode, array $payload): Booking
    {
        return DB::transaction(function () use ($bookingCode, $payload): Booking {
            $booking = $this->lockBookingByCode($bookingCode);

            if ($booking->booking_status !== 'Diproses') {
                throw ValidationException::withMessages([
                    'booking_status' => [
                        sprintf(
                            'Booking %s tidak bisa di-verify (current status: %s). Hanya status "Diproses" yang bisa di-verify transfer.',
                            $bookingCode,
                            $booking->booking_status
                        ),
                    ],
                ]);
            }

            $expectedMethod = $booking->payment_method ?: 'transfer';
            if ($expectedMethod !== 'transfer') {
                throw ValidationException::withMessages([
                    'payment_method' => [
                        sprintf(
                            'Booking %s payment_method=%s, bukan transfer. Gunakan endpoint confirm-cash untuk cash.',
                            $bookingCode,
                            $expectedMethod
                        ),
                    ],
                ]);
            }

            // Cross-check nominal (Q2 = B)
            if (isset($payload['amount']) && $payload['amount'] !== null) {
                $confirmedAmount = (float) $payload['amount'];
                $expectedAmount = (float) $booking->total_amount;
                if (abs($confirmedAmount - $expectedAmount) > self::NOMINAL_TOLERANCE) {
                    throw ValidationException::withMessages([
                        'amount' => [
                            sprintf(
                                'Nominal tidak cocok. Total booking: Rp %s, nominal yang Anda konfirmasi: Rp %s. Mohon cek ulang bukti transfer.',
                                number_format($expectedAmount, 0, ',', '.'),
                                number_format($confirmedAmount, 0, ',', '.'),
                            ),
                        ],
                    ]);
                }
            }

            $now = Carbon::now();
            $verifierPhone = (string) $payload['verifier_identifier'];
            $reference = trim((string) ($payload['reference'] ?? ''));
            $extraNotes = trim((string) ($payload['notes'] ?? ''));

            $auditPrefix = sprintf(
                '[transfer verified by chatbot:%s @ %s%s]',
                $verifierPhone,
                $now->toIso8601String(),
                $reference !== '' ? ", ref={$reference}" : ''
            );
            $existingNotes = trim((string) $booking->validation_notes);
            $newNotes = $existingNotes === ''
                ? ($extraNotes === '' ? $auditPrefix : "{$auditPrefix} {$extraNotes}")
                : "{$existingNotes}\n{$auditPrefix}" . ($extraNotes === '' ? '' : " {$extraNotes}");

            $booking->payment_status = 'Dibayar';
            $booking->validation_notes = $newNotes;
            $booking->save();

            Log::channel('chatbot-bridge')->info('Transfer verified via chatbot bridge', [
                'booking_code' => $bookingCode,
                'verifier_phone' => $verifierPhone,
                'amount_confirmed' => $payload['amount'] ?? null,
                'total_amount' => $booking->total_amount,
            ]);

            return $booking->fresh();
        });
    }

    /**
     * @param array{
     *     confirmer_identifier: string,
     *     paid: bool,
     *     amount?: float|int|null,
     *     notes?: string|null,
     * } $payload
     */
    public function confirmCashPayment(string $bookingCode, array $payload): Booking
    {
        return DB::transaction(function () use ($bookingCode, $payload): Booking {
            $booking = $this->lockBookingByCode($bookingCode);

            if ($booking->booking_status !== 'Menunggu Pembayaran Cash') {
                throw ValidationException::withMessages([
                    'booking_status' => [
                        sprintf(
                            'Booking %s status=%s, bukan "Menunggu Pembayaran Cash".',
                            $bookingCode,
                            $booking->booking_status
                        ),
                    ],
                ]);
            }

            $expectedMethod = $booking->payment_method ?: 'transfer';
            if ($expectedMethod !== 'cash') {
                throw ValidationException::withMessages([
                    'payment_method' => [
                        sprintf(
                            'Booking %s payment_method=%s, bukan cash.',
                            $bookingCode,
                            $expectedMethod
                        ),
                    ],
                ]);
            }

            $paid = (bool) $payload['paid'];
            $now = Carbon::now();
            $confirmerPhone = (string) $payload['confirmer_identifier'];
            $extraNotes = trim((string) ($payload['notes'] ?? ''));

            if ($paid) {
                if (isset($payload['amount']) && $payload['amount'] !== null) {
                    $confirmedAmount = (float) $payload['amount'];
                    $expectedAmount = (float) $booking->total_amount;
                    if (abs($confirmedAmount - $expectedAmount) > self::NOMINAL_TOLERANCE) {
                        throw ValidationException::withMessages([
                            'amount' => [
                                sprintf(
                                    'Nominal tidak cocok. Total booking: Rp %s, nominal yang dikonfirmasi: Rp %s.',
                                    number_format($expectedAmount, 0, ',', '.'),
                                    number_format($confirmedAmount, 0, ',', '.'),
                                ),
                            ],
                        ]);
                    }
                }

                $auditPrefix = sprintf('[cash confirmed PAID by chatbot:%s @ %s]', $confirmerPhone, $now->toIso8601String());
                $booking->booking_status = 'Diproses';
                $booking->payment_status = 'Dibayar Tunai';
            } else {
                $auditPrefix = sprintf('[cash confirmed UNPAID by chatbot:%s @ %s]', $confirmerPhone, $now->toIso8601String());
                // Keep status; jangan flip ke Diproses
            }

            $existingNotes = trim((string) $booking->validation_notes);
            $newNotes = $existingNotes === ''
                ? ($extraNotes === '' ? $auditPrefix : "{$auditPrefix} {$extraNotes}")
                : "{$existingNotes}\n{$auditPrefix}" . ($extraNotes === '' ? '' : " {$extraNotes}");
            $booking->validation_notes = $newNotes;
            $booking->save();

            Log::channel('chatbot-bridge')->info('Cash payment confirmation', [
                'booking_code' => $bookingCode,
                'confirmer_phone' => $confirmerPhone,
                'paid' => $paid,
                'new_status' => $booking->booking_status,
            ]);

            return $booking->fresh();
        });
    }

    private function lockBookingByCode(string $bookingCode): Booking
    {
        $booking = Booking::query()
            ->where('booking_code', $bookingCode)
            ->lockForUpdate()
            ->first();

        if (! $booking) {
            throw ValidationException::withMessages([
                'booking_code' => ["Booking dengan kode {$bookingCode} tidak ditemukan."],
            ]);
        }

        return $booking;
    }
}
