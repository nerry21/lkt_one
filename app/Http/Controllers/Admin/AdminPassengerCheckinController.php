<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BookingPassenger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class AdminPassengerCheckinController extends Controller
{
    public function checkin(int $id): RedirectResponse
    {
        $passenger = BookingPassenger::query()
            ->with('booking.departure')
            ->findOrFail($id);

        if (! $passenger->booking || ! $passenger->booking->departure_id) {
            return back()->with('error', 'Penumpang belum masuk manifest keberangkatan.');
        }

        if ($passenger->ticket_status !== 'Active') {
            return back()->with('error', 'Ticket penumpang belum aktif.');
        }

        $passenger->update([
            'checkin_status' => 'Checked In',
            'checked_in_at' => now(),
            'checked_in_by' => Auth::id(),
        ]);

        return back()->with('success', 'Penumpang berhasil check-in.');
    }

    public function noShow(int $id): RedirectResponse
    {
        $passenger = BookingPassenger::query()
            ->with('booking.departure')
            ->findOrFail($id);

        if (! $passenger->booking || ! $passenger->booking->departure_id) {
            return back()->with('error', 'Penumpang belum masuk manifest keberangkatan.');
        }

        $passenger->update([
            'checkin_status' => 'No Show',
            'checked_in_at' => null,
            'checked_in_by' => null,
        ]);

        return back()->with('success', 'Status penumpang diubah menjadi No Show.');
    }

    public function reset(int $id): RedirectResponse
    {
        BookingPassenger::query()->findOrFail($id)->update([
            'checkin_status' => 'Pending',
            'checked_in_at' => null,
            'checked_in_by' => null,
        ]);

        return back()->with('success', 'Check-in penumpang berhasil direset.');
    }
}
