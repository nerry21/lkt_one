<?php

namespace App\Http\Controllers\RentalBookings;

use App\Models\Booking;
use App\Http\Controllers\Controller;
use App\Http\Requests\RentalBooking\StoreRentalBookingInformationRequest;
use App\Http\Requests\RentalBooking\StoreRentalBookingPassengersRequest;
use App\Http\Requests\RentalBooking\StoreRentalBookingPaymentRequest;
use App\Services\RentalBookingDraftService;
use App\Services\RentalBookingPersistenceService;
use App\Services\RentalBookingService;
use App\Services\RegularBookingPaymentService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RentalBookingPageController extends Controller
{
    public function index(
        Request $request,
        RentalBookingService $service,
        RentalBookingDraftService $drafts,
    ): View {
        $draft = $drafts->get($request->session());
        $formState = $drafts->buildFormState($request, $draft, $service);

        return view('rental-bookings.index', [
            'pageTitle'       => 'Pemesanan Rental Mobil | Lancang Kuning Travelindo',
            'pageScript'      => 'dropping-bookings/index',
            'guardMode'       => 'protected',
            'pageHeading'     => 'Pemesanan Rental Mobil',
            'pageDescription' => 'Lengkapi informasi pemesanan rental. Seluruh kursi kendaraan akan dipesan.',
            'steps'           => $this->steps(1),
            'bookingTypes'    => $service->bookingTypes(),
            'formState'       => $formState,
            'draftSummary'    => $drafts->buildSummary($draft, $service),
            'flashNotice'     => $request->session()->get('rental_booking_notice'),
        ]);
    }

    public function storeInformation(
        StoreRentalBookingInformationRequest $request,
        RentalBookingService $service,
        RentalBookingDraftService $drafts,
    ): RedirectResponse {
        $validated      = $request->validated();
        $fareAmount     = (int) ($validated['fare_amount'] ?? 0);
        $additionalFare = (int) ($validated['additional_fare'] ?? 0);

        $drafts->store(
            $request->session(),
            $drafts->fromValidated($validated, $fareAmount, $additionalFare),
        );

        $request->session()->forget(RentalBookingDraftService::PERSISTED_BOOKING_ID_SESSION_KEY);

        return redirect()
            ->route('rental-bookings.passengers')
            ->with('rental_booking_success', 'Informasi pemesanan rental berhasil disimpan. Silakan lanjut ke langkah data pemesan.');
    }

    public function passengers(
        Request $request,
        RentalBookingService $service,
        RentalBookingDraftService $drafts,
    ): View|RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan rental terlebih dahulu sebelum masuk ke data pemesan.')) {
            return $redirect;
        }

        $passengerFormState = $drafts->buildPassengerFormState($request, $draft, $service);

        return view('rental-bookings.passengers', [
            'pageTitle'          => 'Data Pemesan | Lancang Kuning Travelindo',
            'pageScript'         => '',
            'guardMode'          => 'protected',
            'pageHeading'        => 'Data Pemesan',
            'pageDescription'    => 'Lengkapi nama dan nomor HP pemesan untuk seluruh 6 kursi rental.',
            'steps'              => $this->steps(2),
            'draft'              => $draft,
            'draftSummary'       => $drafts->buildSummary($draft, $service),
            'passengerFormState' => $passengerFormState,
            'flashSuccess'       => $request->session()->get('rental_booking_success'),
            'flashNotice'        => $request->session()->get('rental_booking_notice'),
        ]);
    }

    public function storePassengers(
        StoreRentalBookingPassengersRequest $request,
        RentalBookingService $service,
        RentalBookingDraftService $drafts,
    ): RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan rental terlebih dahulu sebelum mengisi data pemesan.')) {
            return $redirect;
        }

        $drafts->storePassengers(
            $request->session(),
            $request->validated('passenger_name'),
            $request->validated('passenger_phone'),
            $service,
        );

        return redirect()
            ->route('rental-bookings.review')
            ->with('rental_booking_success', 'Data pemesan berhasil disimpan. Silakan periksa review pemesanan rental sebelum melanjutkan.');
    }

    public function review(
        Request $request,
        RentalBookingService $service,
        RentalBookingDraftService $drafts,
        RentalBookingPersistenceService $persistence,
    ): View|RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan rental terlebih dahulu sebelum masuk ke review.')) {
            return $redirect;
        }

        if ($redirect = $this->ensurePassengerStepIsComplete($draft, $service, $drafts, 'Lengkapi data pemesan terlebih dahulu sebelum masuk ke review pemesanan.')) {
            return $redirect;
        }

        return view('rental-bookings.review', [
            'pageTitle'        => 'Review Pemesanan Rental | Lancang Kuning Travelindo',
            'pageScript'       => '',
            'guardMode'        => 'protected',
            'pageHeading'      => 'Review Pemesanan Rental',
            'pageDescription'  => 'Periksa kembali seluruh data pemesanan rental sebelum melanjutkan ke pembayaran.',
            'steps'            => $this->steps(3),
            'draft'            => $draft,
            'draftSummary'     => $drafts->buildSummary($draft, $service),
            'reviewState'      => $drafts->buildReviewState($draft, $service),
            'persistedBooking' => $persistence->currentDraftBooking($request->session(), $drafts),
            'flashSuccess'     => $request->session()->get('rental_booking_success'),
            'flashNotice'      => $request->session()->get('rental_booking_notice'),
        ]);
    }

    public function storeReview(
        Request $request,
        RentalBookingService $service,
        RentalBookingDraftService $drafts,
        RentalBookingPersistenceService $persistence,
    ): RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan rental terlebih dahulu sebelum menyimpan review.')) {
            return $redirect;
        }

        if ($redirect = $this->ensurePassengerStepIsComplete($draft, $service, $drafts, 'Lengkapi data pemesan terlebih dahulu sebelum menyimpan review pemesanan.')) {
            return $redirect;
        }

        $booking = $persistence->persistDraft($request->session(), $draft, $service, $drafts);

        return redirect()
            ->route('rental-bookings.payment')
            ->with('rental_booking_success', "Review pemesanan rental berhasil disimpan sebagai draft dengan kode {$booking->booking_code}. Silakan lanjutkan ke tahap pembayaran.");
    }

    public function payment(
        Request $request,
        RentalBookingService $service,
        RentalBookingDraftService $drafts,
        RentalBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): View|RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan rental terlebih dahulu sebelum masuk ke pembayaran.')) {
            return $redirect;
        }

        if ($redirect = $this->ensurePassengerStepIsComplete($draft, $service, $drafts, 'Lengkapi data pemesan terlebih dahulu sebelum masuk ke pembayaran.')) {
            return $redirect;
        }

        $persistedBooking = $persistence->currentDraftBooking($request->session(), $drafts);

        if (! $persistedBooking) {
            return redirect()
                ->route('rental-bookings.review')
                ->with('rental_booking_notice', 'Simpan review pemesanan rental terlebih dahulu sebelum memilih metode pembayaran.');
        }

        return view('rental-bookings.payment', [
            'pageTitle'        => 'Pembayaran Rental | Lancang Kuning Travelindo',
            'pageScript'       => '',
            'guardMode'        => 'protected',
            'pageHeading'      => 'Pembayaran',
            'pageDescription'  => 'Pilih metode pembayaran untuk rental mobil yang sudah direview dan disimpan.',
            'steps'            => $this->steps(4),
            'draft'            => $draft,
            'draftSummary'     => $drafts->buildSummary($draft, $service),
            'reviewState'      => $drafts->buildReviewState($draft, $service),
            'persistedBooking' => $persistedBooking,
            'paymentMethods'   => $payments->paymentMethods(),
            'bankAccounts'     => $payments->transferBankAccounts(),
            'paymentFormState' => $payments->buildFormState($request, $persistedBooking),
            'flashSuccess'     => $request->session()->get('rental_booking_success'),
            'flashNotice'      => $request->session()->get('rental_booking_notice'),
        ]);
    }

    public function storePayment(
        StoreRentalBookingPaymentRequest $request,
        RentalBookingService $service,
        RentalBookingDraftService $drafts,
        RentalBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan rental terlebih dahulu sebelum memilih metode pembayaran.')) {
            return $redirect;
        }

        if ($redirect = $this->ensurePassengerStepIsComplete($draft, $service, $drafts, 'Lengkapi data pemesan terlebih dahulu sebelum memilih metode pembayaran.')) {
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
            ->route('rental-bookings.invoice')
            ->with('rental_booking_success', "Pembayaran rental dengan metode {$payments->paymentMethodLabel($booking->payment_method)} berhasil dicatat. Invoice dan e-ticket siap dilihat.");
    }

    public function invoice(
        Request $request,
        RentalBookingService $service,
        RentalBookingDraftService $drafts,
        RentalBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): View|RedirectResponse {
        $persistedBooking = $this->resolveInvoiceBookingOrRedirect($request, $service, $drafts, $persistence, $payments);

        if ($persistedBooking instanceof RedirectResponse) {
            return $persistedBooking;
        }

        return view('rental-bookings.invoice', [
            'pageTitle'        => 'Invoice Pemesanan Rental | Lancang Kuning Travelindo',
            'pageScript'       => '',
            'guardMode'        => 'protected',
            'pageHeading'      => 'Invoice Pemesanan Rental',
            'pageDescription'  => 'Ringkasan pembayaran rental mobil setelah transaksi dicatat.',
            'persistedBooking' => $persistedBooking,
            'invoiceState'     => $payments->buildInvoiceState($persistedBooking, $service),
            'rentalEndDate'    => $persistedBooking->rental_end_date?->format('d M Y') ?? '-',
            'flashSuccess'     => $request->session()->get('rental_booking_success'),
            'flashNotice'      => $request->session()->get('rental_booking_notice'),
        ]);
    }

    public function downloadInvoice(
        Request $request,
        RentalBookingService $service,
        RentalBookingDraftService $drafts,
        RentalBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): Response|RedirectResponse {
        $persistedBooking = $this->resolveInvoiceBookingOrRedirect($request, $service, $drafts, $persistence, $payments);

        if ($persistedBooking instanceof RedirectResponse) {
            return $persistedBooking;
        }

        $invoiceState = $payments->buildInvoiceState($persistedBooking, $service);
        $fileName = ($invoiceState['invoice_number'] !== '-' ? $invoiceState['invoice_number'] : $persistedBooking->booking_code) . '.pdf';

        return Pdf::loadView('dropping-bookings.pdf.invoice', [
            'invoiceState' => $invoiceState,
        ])->setPaper('a4')->download($fileName);
    }

    public function ticket(
        Request $request,
        RentalBookingService $service,
        RentalBookingDraftService $drafts,
        RentalBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): View|RedirectResponse {
        $persistedBooking = $this->resolveTicketBookingOrRedirect($request, $service, $drafts, $persistence, $payments);

        if ($persistedBooking instanceof RedirectResponse) {
            return $persistedBooking;
        }

        $persistedBooking = $persistence->ensureTicketMetadata($persistedBooking);

        return view('rental-bookings.ticket', [
            'pageTitle'        => 'E-ticket Rental | Lancang Kuning Travelindo',
            'pageScript'       => '',
            'guardMode'        => 'protected',
            'pageHeading'      => 'E-ticket Rental Mobil',
            'pageDescription'  => 'Tiket elektronik rental mobil setelah transaksi dicatat.',
            'persistedBooking' => $persistedBooking,
            'ticketState'      => $payments->buildTicketState($persistedBooking, $service),
            'rentalEndDate'    => $persistedBooking->rental_end_date?->format('d M Y') ?? '-',
            'flashSuccess'     => $request->session()->get('rental_booking_success'),
            'flashNotice'      => $request->session()->get('rental_booking_notice'),
        ]);
    }

    public function downloadTicket(
        Request $request,
        RentalBookingService $service,
        RentalBookingDraftService $drafts,
        RentalBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): Response|RedirectResponse {
        $persistedBooking = $this->resolveTicketBookingOrRedirect($request, $service, $drafts, $persistence, $payments);

        if ($persistedBooking instanceof RedirectResponse) {
            return $persistedBooking;
        }

        $persistedBooking = $persistence->ensureTicketMetadata($persistedBooking);
        $ticketState = $payments->buildTicketState($persistedBooking, $service);
        $fileName = ($ticketState['ticket_number'] !== '-' ? $ticketState['ticket_number'] : $persistedBooking->booking_code) . '.pdf';

        return Pdf::loadView('dropping-bookings.pdf.ticket', [
            'ticketState' => $ticketState,
        ])->setPaper('a4')->download($fileName);
    }

    private function steps(int $currentStep): array
    {
        return collect([
            [
                'number'      => 1,
                'title'       => 'Informasi Rental',
                'description' => 'Lengkapi data awal rental termasuk lokasi, periode sewa, dan tarif.',
            ],
            [
                'number'      => 2,
                'title'       => 'Data Pemesan',
                'description' => 'Isi nama dan nomor HP pemesan untuk seluruh 6 kursi yang otomatis dipesan.',
            ],
            [
                'number'      => 3,
                'title'       => 'Review Pemesanan',
                'description' => 'Periksa kembali seluruh detail sebelum melanjutkan ke proses berikutnya.',
            ],
            [
                'number'      => 4,
                'title'       => 'Pembayaran',
                'description' => 'Simpan data pembayaran dan lanjutkan ke invoice serta e-ticket rental.',
            ],
        ])->map(function (array $step) use ($currentStep): array {
            $step['status'] = match (true) {
                $step['number'] < $currentStep   => 'completed',
                $step['number'] === $currentStep => 'current',
                default                          => 'upcoming',
            };

            return $step;
        })->all();
    }

    private function ensureInformationStepIsComplete(
        array $draft,
        RentalBookingService $service,
        RentalBookingDraftService $drafts,
        string $message,
    ): ?RedirectResponse {
        if (! $drafts->hasCompleteInformation($draft, $service)) {
            return redirect()
                ->route('rental-bookings.index')
                ->with('rental_booking_notice', $message);
        }

        return null;
    }

    private function ensurePassengerStepIsComplete(
        array $draft,
        RentalBookingService $service,
        RentalBookingDraftService $drafts,
        string $message,
    ): ?RedirectResponse {
        if (! $drafts->hasCompletePassengerData($draft, $service)) {
            return redirect()
                ->route('rental-bookings.passengers')
                ->with('rental_booking_notice', $message);
        }

        return null;
    }

    private function resolveInvoiceBookingOrRedirect(
        Request $request,
        RentalBookingService $service,
        RentalBookingDraftService $drafts,
        RentalBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): Booking|RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan rental terlebih dahulu sebelum membuka invoice.')) {
            return $redirect;
        }

        if ($redirect = $this->ensurePassengerStepIsComplete($draft, $service, $drafts, 'Lengkapi data pemesan terlebih dahulu sebelum membuka invoice.')) {
            return $redirect;
        }

        $persistedBooking = $persistence->currentDraftBooking($request->session(), $drafts);

        if (! $payments->hasRecordedPayment($persistedBooking)) {
            return redirect()
                ->route('rental-bookings.payment')
                ->with('rental_booking_notice', 'Selesaikan pembayaran terlebih dahulu sebelum membuka invoice.');
        }

        return $persistedBooking;
    }

    private function resolveTicketBookingOrRedirect(
        Request $request,
        RentalBookingService $service,
        RentalBookingDraftService $drafts,
        RentalBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): Booking|RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan rental terlebih dahulu sebelum membuka e-ticket.')) {
            return $redirect;
        }

        if ($redirect = $this->ensurePassengerStepIsComplete($draft, $service, $drafts, 'Lengkapi data pemesan terlebih dahulu sebelum membuka e-ticket.')) {
            return $redirect;
        }

        $persistedBooking = $persistence->currentDraftBooking($request->session(), $drafts);

        if (! $payments->hasRecordedPayment($persistedBooking)) {
            return redirect()
                ->route('rental-bookings.payment')
                ->with('rental_booking_notice', 'Selesaikan pembayaran terlebih dahulu sebelum membuka e-ticket.');
        }

        return $persistedBooking;
    }
}
