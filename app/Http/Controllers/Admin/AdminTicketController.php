<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;

class AdminTicketController extends Controller
{
    public function issue(int $id): RedirectResponse
    {
        $booking = Booking::query()
            ->with('passengers')
            ->findOrFail($id);

        if ($booking->payment_status !== 'Lunas') {
            return redirect()
                ->route('admin.bookings.validation.show', $booking->id)
                ->with('error', 'E-Ticket hanya bisa diterbitkan jika pembayaran sudah Lunas.');
        }

        if ($booking->ticket_status === 'Active') {
            return redirect()
                ->route('admin.bookings.validation.show', $booking->id)
                ->with('success', 'E-Ticket sudah aktif.');
        }

        $booking->update([
            'ticket_status' => 'Active',
            'ticket_issued_at' => now(),
            'booking_status' => 'Confirmed',
        ]);

        foreach ($booking->passengers as $passenger) {
            $passenger->update([
                'ticket_status' => 'Active',
            ]);
        }

        return redirect()
            ->route('admin.bookings.validation.show', $booking->id)
            ->with('success', 'E-Ticket berhasil diterbitkan.');
    }

    public function show(int $id): View
    {
        $booking = Booking::query()
            ->with('passengers')
            ->findOrFail($id);

        abort_if($booking->ticket_status !== 'Active', 404);

        return view('booking.eticket', [
            'booking' => $booking,
            'pageTitle' => 'E-Ticket | Lancang Kuning Travelindo',
            'guardMode' => 'none',
        ]);
    }
}
