<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AdminBookingValidationController extends Controller
{
    public function index(Request $request): View
    {
        $status = (string) $request->query('status', '');
        $allowedStatuses = ['Menunggu Validasi', 'Lunas', 'Ditolak', 'Belum Bayar'];
        $activeStatus = in_array($status, $allowedStatuses, true) ? $status : '';

        $bookings = Booking::query()
            ->with(['passengers', 'validator'])
            ->when($activeStatus !== '', fn ($query) => $query->where('payment_status', $activeStatus))
            ->orderByDesc('id')
            ->paginate(15)
            ->withQueryString();

        return view('admin.bookings.validation-index', [
            'bookings' => $bookings,
            'status' => $activeStatus,
            'pageTitle' => 'Validasi Pembayaran Booking | Lancang Kuning Travelindo',
            'guardMode' => 'protected',
            'pageHeading' => 'Validasi Booking',
            'pageDescription' => 'Approve atau reject pembayaran booking reguler',
        ]);
    }

    public function show(int $id): View
    {
        $booking = Booking::query()
            ->with(['passengers', 'validator'])
            ->findOrFail($id);

        return view('admin.bookings.validation-show', [
            'booking' => $booking,
            'pageTitle' => 'Detail Validasi Booking | Lancang Kuning Travelindo',
            'guardMode' => 'protected',
            'pageHeading' => 'Detail Validasi Booking',
            'pageDescription' => 'Pemeriksaan bukti transfer, status pembayaran, dan penerbitan E-Ticket',
        ]);
    }

    public function approve(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'validation_notes' => ['nullable', 'string', 'max:1000'],
        ]);

        $booking = Booking::query()
            ->with('passengers')
            ->findOrFail($id);

        if ($booking->payment_status !== 'Menunggu Validasi') {
            return redirect()
                ->route('admin.bookings.validation.show', $booking->id)
                ->with('error', 'Pembayaran ini tidak sedang menunggu validasi.');
        }

        $booking->update([
            'payment_status' => 'Lunas',
            'booking_status' => 'Confirmed',
            'validated_by' => (string) Auth::id(),
            'validated_at' => now(),
            'validation_notes' => $validated['validation_notes'] ?? null,
            'ticket_status' => 'Draft',
        ]);

        return redirect()
            ->route('admin.bookings.validation.show', $booking->id)
            ->with('success', 'Pembayaran berhasil divalidasi.');
    }

    public function reject(Request $request, int $id): RedirectResponse
    {
        $validated = $request->validate([
            'validation_notes' => ['required', 'string', 'max:1000'],
        ]);

        $booking = Booking::query()->findOrFail($id);

        if ($booking->payment_status !== 'Menunggu Validasi') {
            return redirect()
                ->route('admin.bookings.validation.show', $booking->id)
                ->with('error', 'Pembayaran ini tidak sedang menunggu validasi.');
        }

        $booking->update([
            'payment_status' => 'Ditolak',
            'booking_status' => 'Confirmed',
            'validated_by' => (string) Auth::id(),
            'validated_at' => now(),
            'validation_notes' => $validated['validation_notes'],
            'ticket_status' => 'Draft',
            'ticket_issued_at' => null,
        ]);

        return redirect()
            ->route('admin.bookings.validation.show', $booking->id)
            ->with('success', 'Pembayaran ditolak.');
    }
}
