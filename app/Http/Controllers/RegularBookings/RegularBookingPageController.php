<?php

namespace App\Http\Controllers\RegularBookings;

use App\Models\Booking;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegularBooking\StoreRegularBookingInformationRequest;
use App\Http\Requests\RegularBooking\StoreRegularBookingPassengersRequest;
use App\Http\Requests\RegularBooking\StoreRegularBookingPaymentRequest;
use App\Http\Requests\RegularBooking\StoreRegularBookingSeatsRequest;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Services\RegularBookingDraftService;
use App\Services\RegularBookingPaymentService;
use App\Services\RegularBookingPersistenceService;
use App\Services\RegularBookingService;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

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
            'pageTitle' => 'Pemesanan Reguler | JET (JAYA EXCECUTIVE TRANSPORT)',
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
        $additionalFare = (int) ($validated['additional_fare_per_passenger'] ?? 0);

        $drafts->store(
            $request->session(),
            $drafts->fromValidated($validated, $fareAmount, $additionalFare),
        );

        // Clear any previously persisted booking ID so the new booking attempt
        // does not accidentally exclude an old Draft booking when computing
        // occupied seats on the seat-selection step.
        $request->session()->forget(RegularBookingDraftService::PERSISTED_BOOKING_ID_SESSION_KEY);

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

        $tripDate = trim((string) ($draft['trip_date'] ?? now()->toDateString()));
        $tripTime = trim((string) ($draft['departure_time'] ?? ''));
        $timePrefix = strlen($tripTime) >= 5 ? substr($tripTime, 0, 5) : $tripTime;
        $persistedBookingId = $drafts->getPersistedBookingId($request->session());
        $passengerCount = max(1, (int) ($draft['passenger_count'] ?? 1));
        $totalSeatCount = count($service->selectableSeatCodes());

        // Build per-armada occupied-seat map for this date/time slot
        $allSlotBookings = ($tripDate !== '' && $tripTime !== '')
            ? Booking::query()
                ->where('trip_date', $tripDate)
                ->where('trip_time', 'like', $timePrefix . '%')
                ->whereNotIn('booking_status', ['Dibatalkan'])
                ->when($persistedBookingId, fn ($q) => $q->where('id', '!=', $persistedBookingId))
                ->get()
            : collect();

        // Group occupied seat codes by armada_index (NULL treated as armada 1)
        $occupiedByArmada = $allSlotBookings
            ->groupBy(fn (Booking $b) => $b->armada_index ?? 1)
            ->map(fn ($bookings) => $bookings
                ->flatMap(fn (Booking $b) => (array) ($b->selected_seats ?? []))
                ->unique()
                ->values()
                ->all()
            );

        // Find the first armada that has enough room for the requested passenger count.
        // If all known armadas are full, spill into the next index automatically.
        $maxKnownArmada = $occupiedByArmada->keys()->max() ?? 0;
        $targetArmadaIndex = 1;
        for ($i = 1; $i <= $maxKnownArmada + 1; $i++) {
            $taken = count($occupiedByArmada->get($i, []));
            if ($taken + $passengerCount <= $totalSeatCount) {
                $targetArmadaIndex = $i;
                break;
            }
        }

        $occupiedSeats = $occupiedByArmada->get($targetArmadaIndex, []);

        // Persist the resolved armada index into the draft so persistence uses it
        $draft['armada_index'] = $targetArmadaIndex;
        $drafts->store($request->session(), $draft);

        return view('regular-bookings.seats', [
            'pageTitle' => 'Pilih Kursi | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript' => 'regular-bookings/seats',
            'guardMode' => 'protected',
            'pageHeading' => 'Pilih Kursi',
            'pageDescription' => 'Lanjutkan pemesanan reguler ke langkah pemilihan kursi',
            'steps' => $this->steps(2),
            'draft' => $draft,
            'draftSummary' => $drafts->buildSummary($draft, $service),
            'seatLayout' => $service->seatLayoutState(
                $seatSelectionState['selected_seats'],
                $seatSelectionState['required_seat_count'],
                $occupiedSeats,
            ),
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
            'pageTitle' => 'Data Penumpang | JET (JAYA EXCECUTIVE TRANSPORT)',
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
            'pageTitle' => 'Review Pemesanan | JET (JAYA EXCECUTIVE TRANSPORT)',
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
            ->route('regular-bookings.payment')
            ->with('regular_booking_success', "Review pemesanan berhasil disimpan sebagai draft dengan kode {$booking->booking_code}. Silakan lanjutkan ke tahap pembayaran.");
    }

    public function payment(
        Request $request,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
        RegularBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): View|RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan terlebih dahulu sebelum masuk ke pembayaran.')) {
            return $redirect;
        }

        if ($redirect = $this->ensureSeatStepIsComplete($draft, $service, $drafts, 'Pilih kursi sesuai jumlah penumpang terlebih dahulu sebelum masuk ke pembayaran.')) {
            return $redirect;
        }

        if ($redirect = $this->ensurePassengerStepIsComplete($draft, $service, $drafts, 'Lengkapi data penumpang terlebih dahulu sebelum masuk ke pembayaran.')) {
            return $redirect;
        }

        $persistedBooking = $persistence->currentDraftBooking($request->session(), $drafts);

        if (! $persistedBooking) {
            return redirect()
                ->route('regular-bookings.review')
                ->with('regular_booking_notice', 'Simpan review pemesanan terlebih dahulu sebelum memilih metode pembayaran.');
        }

        $reviewState = $drafts->buildReviewState($draft, $service);

        return view('regular-bookings.payment', [
            'pageTitle' => 'Pembayaran | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript' => '',
            'guardMode' => 'protected',
            'pageHeading' => 'Pembayaran',
            'pageDescription' => 'Pilih metode pembayaran dan siapkan proses transaksi regular booking',
            'steps' => $this->steps(5),
            'draft' => $draft,
            'draftSummary' => $drafts->buildSummary($draft, $service),
            'reviewState' => $reviewState,
            'persistedBooking' => $persistedBooking,
            'paymentMethods' => $payments->paymentMethods(),
            'bankAccounts' => $payments->transferBankAccounts(),
            'paymentFormState' => $payments->buildFormState($request, $persistedBooking),
            'flashSuccess' => $request->session()->get('regular_booking_success'),
            'flashNotice' => $request->session()->get('regular_booking_notice'),
        ]);
    }

    public function storePayment(
        StoreRegularBookingPaymentRequest $request,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
        RegularBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan terlebih dahulu sebelum memilih metode pembayaran.')) {
            return $redirect;
        }

        if ($redirect = $this->ensureSeatStepIsComplete($draft, $service, $drafts, 'Pilih kursi sesuai jumlah penumpang terlebih dahulu sebelum memilih metode pembayaran.')) {
            return $redirect;
        }

        if ($redirect = $this->ensurePassengerStepIsComplete($draft, $service, $drafts, 'Lengkapi data penumpang terlebih dahulu sebelum memilih metode pembayaran.')) {
            return $redirect;
        }

        $booking = $persistence->persistPaymentSelection(
            $request->session(),
            $draft,
            $request->validated(),
            $service,
            $drafts,
            $payments,
        );

        return redirect()
            ->route('regular-bookings.invoice')
            ->with('regular_booking_success', "Pembayaran dengan metode {$payments->paymentMethodLabel($booking->payment_method)} berhasil dicatat. Invoice dan e-ticket siap dilihat.");
    }

    public function invoice(
        Request $request,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
        RegularBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): View|RedirectResponse {
        $persistedBooking = $this->resolveInvoiceBookingOrRedirect(
            $request,
            $service,
            $drafts,
            $persistence,
            $payments,
        );

        if ($persistedBooking instanceof RedirectResponse) {
            return $persistedBooking;
        }

        return view('regular-bookings.invoice', [
            'pageTitle' => 'Invoice Pemesanan | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript' => '',
            'guardMode' => 'protected',
            'pageHeading' => 'Invoice Pemesanan',
            'pageDescription' => 'Ringkasan pembayaran regular booking setelah transaksi dicatat',
            'persistedBooking' => $persistedBooking,
            'invoiceState' => $payments->buildInvoiceState($persistedBooking, $service),
            'flashSuccess' => $request->session()->get('regular_booking_success'),
            'flashNotice' => $request->session()->get('regular_booking_notice'),
        ]);
    }

    public function downloadInvoice(
        Request $request,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
        RegularBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): Response|RedirectResponse {
        $persistedBooking = $this->resolveInvoiceBookingOrRedirect(
            $request,
            $service,
            $drafts,
            $persistence,
            $payments,
        );

        if ($persistedBooking instanceof RedirectResponse) {
            return $persistedBooking;
        }

        $invoiceState = $payments->buildInvoiceState($persistedBooking, $service);
        $fileName = ($invoiceState['invoice_number'] !== '-' ? $invoiceState['invoice_number'] : $persistedBooking->booking_code) . '.pdf';

        return Pdf::loadView('regular-bookings.pdf.invoice', [
            'invoiceState' => $invoiceState,
        ])->setPaper('a4')->download($fileName);
    }

    public function ticket(
        Request $request,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
        RegularBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): View|RedirectResponse {
        $persistedBooking = $this->resolveTicketBookingOrRedirect(
            $request,
            $service,
            $drafts,
            $persistence,
            $payments,
        );

        if ($persistedBooking instanceof RedirectResponse) {
            return $persistedBooking;
        }

        $persistedBooking = $persistence->ensureTicketMetadata($persistedBooking);

        return view('regular-bookings.ticket', [
            'pageTitle' => 'E-ticket Pemesanan | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript' => '',
            'guardMode' => 'protected',
            'pageHeading' => 'E-ticket Pemesanan',
            'pageDescription' => 'Ringkasan e-ticket regular booking setelah transaksi dicatat',
            'persistedBooking' => $persistedBooking,
            'ticketState' => $payments->buildTicketState($persistedBooking, $service),
            'flashSuccess' => $request->session()->get('regular_booking_success'),
            'flashNotice' => $request->session()->get('regular_booking_notice'),
        ]);
    }

    public function downloadTicket(
        Request $request,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
        RegularBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): Response|RedirectResponse {
        $persistedBooking = $this->resolveTicketBookingOrRedirect(
            $request,
            $service,
            $drafts,
            $persistence,
            $payments,
        );

        if ($persistedBooking instanceof RedirectResponse) {
            return $persistedBooking;
        }

        $persistedBooking = $persistence->ensureTicketMetadata($persistedBooking);
        $ticketState = $payments->buildTicketState($persistedBooking, $service);
        $fileName = ($ticketState['ticket_number'] !== '-' ? $ticketState['ticket_number'] : $persistedBooking->booking_code) . '.pdf';

        return Pdf::loadView('regular-bookings.pdf.ticket', [
            'ticketState' => $ticketState,
        ])->setPaper('a4')->download($fileName);
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
            [
                'number' => 5,
                'title' => 'Pembayaran',
                'description' => 'Simpan data pembayaran dan lanjutkan ke invoice serta e-ticket.',
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

    private function resolveInvoiceBookingOrRedirect(
        Request $request,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
        RegularBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): Booking|RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan terlebih dahulu sebelum membuka invoice.')) {
            return $redirect;
        }

        if ($redirect = $this->ensureSeatStepIsComplete($draft, $service, $drafts, 'Pilih kursi sesuai jumlah penumpang terlebih dahulu sebelum membuka invoice.')) {
            return $redirect;
        }

        if ($redirect = $this->ensurePassengerStepIsComplete($draft, $service, $drafts, 'Lengkapi data penumpang terlebih dahulu sebelum membuka invoice.')) {
            return $redirect;
        }

        $persistedBooking = $persistence->currentDraftBooking($request->session(), $drafts);

        if (! $payments->hasRecordedPayment($persistedBooking)) {
            return redirect()
                ->route('regular-bookings.payment')
                ->with('regular_booking_notice', 'Selesaikan pembayaran terlebih dahulu sebelum membuka invoice.');
        }

        return $persistedBooking;
    }

    private function resolveTicketBookingOrRedirect(
        Request $request,
        RegularBookingService $service,
        RegularBookingDraftService $drafts,
        RegularBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): Booking|RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan terlebih dahulu sebelum membuka e-ticket.')) {
            return $redirect;
        }

        if ($redirect = $this->ensureSeatStepIsComplete($draft, $service, $drafts, 'Pilih kursi sesuai jumlah penumpang terlebih dahulu sebelum membuka e-ticket.')) {
            return $redirect;
        }

        if ($redirect = $this->ensurePassengerStepIsComplete($draft, $service, $drafts, 'Lengkapi data penumpang terlebih dahulu sebelum membuka e-ticket.')) {
            return $redirect;
        }

        $persistedBooking = $persistence->currentDraftBooking($request->session(), $drafts);

        if (! $payments->hasRecordedPayment($persistedBooking)) {
            return redirect()
                ->route('regular-bookings.payment')
                ->with('regular_booking_notice', 'Selesaikan pembayaran terlebih dahulu sebelum membuka e-ticket.');
        }

        return $persistedBooking;
    }
}
