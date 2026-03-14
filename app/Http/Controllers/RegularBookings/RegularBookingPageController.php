<?php

namespace App\Http\Controllers\RegularBookings;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegularBooking\StoreRegularBookingInformationRequest;
use App\Http\Requests\RegularBooking\StoreRegularBookingPassengersRequest;
use App\Http\Requests\RegularBooking\StoreRegularBookingSeatsRequest;
use App\Services\RegularBookingDraftService;
use App\Services\RegularBookingPersistenceService;
use App\Services\RegularBookingService;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class RegularBookingPageController extends Controller
{
    public function index(
        Request $request,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
    ): View
    {
        $draft = $drafts->get($request->session());
        $formState = $drafts->buildFormState($request, $draft, $service);

        return view('regular-bookings.index', [
            'pageTitle' => 'Pemesanan Reguler | Lancang Kuning Travelindo',
            'pageScript' => 'regular-bookings/index',
            'guardMode' => 'protected',
            'pageHeading' => 'Pemesanan Reguler',
            'pageDescription' => 'Lengkapi informasi pemesanan reguler sebelum memilih kursi',
            'steps' => $this->steps(1),
            'bookingTypes' => $service->bookingTypes(),
            'departureSchedules' => $service->departureSchedules(),
            'passengerCounts' => $service->passengerCounts(),
            'locations' => $service->locations(),
            'routeMatrix' => $service->routeMatrix(),
            'formState' => $formState,
            'draftSummary' => $drafts->buildSummary($formState, $service),
            'flashNotice' => $request->session()->get('regular_booking_notice'),
        ]);
    }

    public function storeInformation(
        StoreRegularBookingInformationRequest $request,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
    ): RedirectResponse {
        $validated = $request->validated();
        $fareAmount = $service->resolveFare($validated['pickup_location'], $validated['destination_location']) ?? 0;

        $drafts->store(
            $request->session(),
            $drafts->fromValidated($validated, $fareAmount),
        );

        return redirect()
            ->route('regular-bookings.seats')
            ->with('regular_booking_success', 'Informasi pemesanan berhasil disimpan. Silakan lanjut ke langkah pilih kursi.');
    }

    public function seats(
        Request $request,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
    ): View|RedirectResponse
    {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan terlebih dahulu sebelum masuk ke langkah pilih kursi.')) {
            return $redirect;
        }

        $seatSelectionState = $drafts->buildSeatSelectionState($request, $draft, $service);

        return view('regular-bookings.seats', [
            'pageTitle' => 'Pilih Kursi | Lancang Kuning Travelindo',
            'pageScript' => 'regular-bookings/seats',
            'guardMode' => 'protected',
            'pageHeading' => 'Pilih Kursi',
            'pageDescription' => 'Lanjutkan pemesanan reguler ke langkah pemilihan kursi',
            'steps' => $this->steps(2),
            'draft' => $draft,
            'draftSummary' => $drafts->buildSummary($draft, $service),
            'seatLayout' => $service->seatLayoutState($seatSelectionState['selected_seats']),
            'seatSelectionState' => $seatSelectionState,
            'flashSuccess' => $request->session()->get('regular_booking_success'),
            'flashNotice' => $request->session()->get('regular_booking_notice'),
        ]);
    }

    public function storeSeats(
        StoreRegularBookingSeatsRequest $request,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
    ): RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan terlebih dahulu sebelum memilih kursi.')) {
            return $redirect;
        }

        $drafts->storeSeatSelection(
            $request->session(),
            $service->sortSeatCodes($request->validated('seat_codes')),
            $service,
        );

        return redirect()
            ->route('regular-bookings.passengers')
            ->with('regular_booking_success', 'Pilihan kursi berhasil disimpan. Silakan lanjut ke langkah data penumpang.');
    }

    public function passengers(
        Request $request,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
    ): View|RedirectResponse
    {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan terlebih dahulu sebelum masuk ke data penumpang.')) {
            return $redirect;
        }

        if ($redirect = $this->ensureSeatStepIsComplete($draft, $service, $drafts, 'Pilih kursi sesuai jumlah penumpang terlebih dahulu sebelum masuk ke data penumpang.')) {
            return $redirect;
        }

        $passengerFormState = $drafts->buildPassengerFormState($request, $draft, $service);

        return view('regular-bookings.passengers', [
            'pageTitle' => 'Data Penumpang | Lancang Kuning Travelindo',
            'pageScript' => '',
            'guardMode' => 'protected',
            'pageHeading' => 'Data Penumpang',
            'pageDescription' => 'Lanjutkan pemesanan reguler ke langkah data penumpang',
            'steps' => $this->steps(3),
            'draft' => $draft,
            'draftSummary' => $drafts->buildSummary($draft, $service),
            'passengerFormState' => $passengerFormState,
            'flashSuccess' => $request->session()->get('regular_booking_success'),
            'flashNotice' => $request->session()->get('regular_booking_notice'),
        ]);
    }

    public function storePassengers(
        StoreRegularBookingPassengersRequest $request,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
    ): RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan terlebih dahulu sebelum mengisi data penumpang.')) {
            return $redirect;
        }

        if ($redirect = $this->ensureSeatStepIsComplete($draft, $service, $drafts, 'Pilih kursi sesuai jumlah penumpang terlebih dahulu sebelum mengisi data penumpang.')) {
            return $redirect;
        }

        $drafts->storePassengers(
            $request->session(),
            $request->validated('passengers'),
            $service,
        );

        return redirect()
            ->route('regular-bookings.review')
            ->with('regular_booking_success', 'Data penumpang berhasil disimpan. Silakan periksa review pemesanan sebelum melanjutkan.');
    }

    public function review(
        Request $request,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
        RegularBookingPersistenceService $persistence,
    ): View|RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan terlebih dahulu sebelum masuk ke review pemesanan.')) {
            return $redirect;
        }

        if ($redirect = $this->ensureSeatStepIsComplete($draft, $service, $drafts, 'Pilih kursi sesuai jumlah penumpang terlebih dahulu sebelum masuk ke review pemesanan.')) {
            return $redirect;
        }

        if ($redirect = $this->ensurePassengerStepIsComplete($draft, $service, $drafts, 'Lengkapi data penumpang terlebih dahulu sebelum masuk ke review pemesanan.')) {
            return $redirect;
        }

        return view('regular-bookings.review', [
            'pageTitle' => 'Review Pemesanan | Lancang Kuning Travelindo',
            'pageScript' => '',
            'guardMode' => 'protected',
            'pageHeading' => 'Review Pemesanan',
            'pageDescription' => 'Periksa kembali seluruh data pemesanan reguler sebelum masuk ke tahap berikutnya',
            'steps' => $this->steps(4),
            'draft' => $draft,
            'draftSummary' => $drafts->buildSummary($draft, $service),
            'reviewState' => $drafts->buildReviewState($draft, $service),
            'persistedBooking' => $persistence->currentDraftBooking($request->session(), $drafts),
            'flashSuccess' => $request->session()->get('regular_booking_success'),
            'flashNotice' => $request->session()->get('regular_booking_notice'),
        ]);
    }

    public function storeReview(
        Request $request,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
        RegularBookingPersistenceService $persistence,
    ): RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan terlebih dahulu sebelum menyimpan review pemesanan.')) {
            return $redirect;
        }

        if ($redirect = $this->ensureSeatStepIsComplete($draft, $service, $drafts, 'Pilih kursi sesuai jumlah penumpang terlebih dahulu sebelum menyimpan review pemesanan.')) {
            return $redirect;
        }

        if ($redirect = $this->ensurePassengerStepIsComplete($draft, $service, $drafts, 'Lengkapi data penumpang terlebih dahulu sebelum menyimpan review pemesanan.')) {
            return $redirect;
        }

        $booking = $persistence->persistDraft(
            $request->session(),
            $draft,
            $service,
            $drafts,
        );

        return redirect()
            ->route('regular-bookings.review')
            ->with('regular_booking_success', "Review pemesanan berhasil disimpan sebagai draft dengan kode {$booking->booking_code}. Tahap pembayaran dapat dilanjutkan pada langkah berikutnya.");
    }

    private function steps(int $currentStep): array
    {
        return collect([
            [
                'number' => 1,
                'title' => 'Informasi Pemesanan',
                'description' => 'Lengkapi data awal perjalanan reguler sebelum memilih kursi.',
            ],
            [
                'number' => 2,
                'title' => 'Pilih Kursi',
                'description' => 'Pilih kursi penumpang berdasarkan penampang kursi kendaraan.',
            ],
            [
                'number' => 3,
                'title' => 'Data Penumpang',
                'description' => 'Lengkapi nama dan nomor HP untuk setiap kursi yang dipilih.',
            ],
            [
                'number' => 4,
                'title' => 'Review Pemesanan',
                'description' => 'Periksa kembali seluruh detail sebelum melanjutkan ke proses berikutnya.',
            ],
        ])->map(function (array $step) use ($currentStep): array {
            $step['status'] = match (true) {
                $step['number'] < $currentStep => 'completed',
                $step['number'] === $currentStep => 'current',
                default => 'upcoming',
            };

            return $step;
        })->all();
    }

    private function ensureInformationStepIsComplete(
        array $draft,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
        string $message,
    ): ?RedirectResponse {
        if (! $drafts->hasCompleteInformation($draft, $service)) {
            return redirect()
                ->route('regular-bookings.index')
                ->with('regular_booking_notice', $message);
        }

        return null;
    }

    private function ensureSeatStepIsComplete(
        array $draft,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
        string $message,
    ): ?RedirectResponse {
        if (! $drafts->hasCompleteSeatSelection($draft, $service)) {
            return redirect()
                ->route('regular-bookings.seats')
                ->with('regular_booking_notice', $message);
        }

        return null;
    }

    private function ensurePassengerStepIsComplete(
        array $draft,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
        string $message,
    ): ?RedirectResponse {
        if (! $drafts->hasCompletePassengerData($draft, $service)) {
            return redirect()
                ->route('regular-bookings.passengers')
                ->with('regular_booking_notice', $message);
        }

        return null;
    }
}
