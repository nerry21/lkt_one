<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class BookingPageController extends Controller
{
    public function reguler(): View
    {
        return view('booking.reguler', [
            'pageTitle' => 'Booking Reguler | Lancang Kuning Travelindo',
            'guardMode' => 'none',
        ]);
    }

    public function review(int $id): View
    {
        $booking = Booking::query()
            ->with('passengers')
            ->findOrFail($id);

        return view('booking.review', [
            'booking' => $booking,
            'pageTitle' => 'Review Booking | Lancang Kuning Travelindo',
            'guardMode' => 'none',
        ]);
    }

    public function payment(int $id): View
    {
        $booking = Booking::query()
            ->with('passengers')
            ->findOrFail($id);

        return view('booking.payment', [
            'booking' => $booking,
            'paymentMethods' => $this->paymentMethods(),
            'pageTitle' => 'Payment Booking | Lancang Kuning Travelindo',
            'guardMode' => 'none',
        ]);
    }

    public function submitPayment(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'payment_method' => ['required', 'string', 'max:100', Rule::in($this->paymentMethods())],
            'sender_name' => ['nullable', 'string', 'max:150'],
            'sender_bank' => ['nullable', 'string', 'max:100'],
            'notes' => ['nullable', 'string', 'max:1000'],
            'payment_proof' => ['nullable', 'file', 'mimes:jpg,jpeg,png,pdf', 'max:4096'],
        ]);

        $booking = Booking::query()->findOrFail($id);
        $proofPath = $booking->payment_proof_path;

        if ($request->hasFile('payment_proof')) {
            if ($proofPath && Storage::disk('public')->exists($proofPath)) {
                Storage::disk('public')->delete($proofPath);
            }

            $proofPath = $request->file('payment_proof')->store('payment-proofs', 'public');
        }

        $existingNotes = trim((string) $booking->notes);
        $paymentNotes = collect([
            'Pengirim: ' . ($validated['sender_name'] ?? '-'),
            'Bank Pengirim: ' . ($validated['sender_bank'] ?? '-'),
            'Catatan: ' . ($validated['notes'] ?? '-'),
        ])->implode("\n");

        $booking->update([
            'payment_method' => $validated['payment_method'],
            'payment_proof_path' => $proofPath,
            'paid_at' => now(),
            'payment_status' => 'Menunggu Validasi',
            'booking_status' => 'Menunggu Validasi',
            'validated_by' => null,
            'validated_at' => null,
            'validation_notes' => null,
            'ticket_status' => 'Draft',
            'ticket_issued_at' => null,
            'notes' => $existingNotes !== ''
                ? $existingNotes . "\n\n" . $paymentNotes
                : $paymentNotes,
        ]);

        return redirect()
            ->route('booking.review', $booking->id)
            ->with('success', 'Pembayaran berhasil dikirim dan menunggu validasi admin.');
    }

    protected function paymentMethods(): array
    {
        return [
            'Transfer BCA',
            'Transfer BRI',
            'Transfer Mandiri',
            'QRIS',
            'Cash',
        ];
    }
}
