<?php

namespace App\Http\Controllers\DroppingBookings;

use App\Models\Booking;
use App\Http\Controllers\Controller;
use App\Http\Requests\DroppingBooking\StoreDroppingBookingInformationRequest;
use App\Http\Requests\DroppingBooking\StoreDroppingBookingPassengersRequest;
use App\Http\Requests\DroppingBooking\StoreDroppingBookingPaymentRequest;
use App\Services\DroppingBookingDraftService;
use App\Services\DroppingBookingPersistenceService;
use App\Services\DroppingBookingService;
use App\Services\RegularBookingPaymentService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Contracts\View\View;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DroppingBookingPageController extends Controller
{
    public function index(
        Request $request,
        DroppingBookingService $service,
        DroppingBookingDraftService $drafts,
    ): View {
        $draft = $drafts->get($request->session());
        $formState = $drafts->buildFormState($request, $draft, $service);

        return view('dropping-bookings.index', [
            'pageTitle'       => 'Pemesanan Dropping | Lancang Kuning Travelindo',
            'pageScript'      => 'dropping-bookings/index',
            'guardMode'       => 'protected',
            'pageHeading'     => 'Pemesanan Dropping',
            'pageDescription' => 'Lengkapi informasi pemesanan dropping. Seluruh kursi kendaraan akan dipesan.',
            'steps'           => $this->steps(1),
            'bookingTypes'    => $service->bookingTypes(),
            'formState'       => $formState,
            'draftSummary'    => $drafts->buildSummary($draft, $service),
            'flashNotice'     => $request->session()->get('dropping_booking_notice'),
        ]);
    }

    public function storeInformation(
        StoreDroppingBookingInformationRequest $request,
        DroppingBookingService $service,
        DroppingBookingDraftService $drafts,
    ): RedirectResponse {
        $validated = $request->validated();
        $fareAmount = (int) ($validated['fare_amount'] ?? 0);
        $additionalFare = (int) ($validated['additional_fare_per_passenger'] ?? 0);

        $drafts->store(
            $request->session(),
            $drafts->fromValidated($validated, $fareAmount, $additionalFare),
        );

        $request->session()->forget(DroppingBookingDraftService::PERSISTED_BOOKING_ID_SESSION_KEY);

        return redirect()
            ->route('dropping-bookings.passengers')
            ->with('dropping_booking_success', 'Informasi pemesanan dropping berhasil disimpan. Silakan lanjut ke langkah data penumpang.');
    }

    public function passengers(
        Request $request,
        DroppingBookingService $service,
        DroppingBookingDraftService $drafts,
    ): View|RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan dropping terlebih dahulu sebelum masuk ke data penumpang.')) {
            return $redirect;
        }

        $passengerFormState = $drafts->buildPassengerFormState($request, $draft, $service);

        return view('dropping-bookings.passengers', [
            'pageTitle'         => 'Data Penumpang | Lancang Kuning Travelindo',
            'pageScript'        => '',
            'guardMode'         => 'protected',
            'pageHeading'       => 'Data Penumpang',
            'pageDescription'   => 'Lengkapi nama dan nomor HP untuk seluruh 6 kursi pemesanan dropping.',
            'steps'             => $this->steps(2),
            'draft'             => $draft,
            'draftSummary'      => $drafts->buildSummary($draft, $service),
            'passengerFormState'=> $passengerFormState,
            'flashSuccess'      => $request->session()->get('dropping_booking_success'),
            'flashNotice'       => $request->session()->get('dropping_booking_notice'),
        ]);
    }

    public function storePassengers(
        StoreDroppingBookingPassengersRequest $request,
        DroppingBookingService $service,
        DroppingBookingDraftService $drafts,
    ): RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan dropping terlebih dahulu sebelum mengisi data penumpang.')) {
            return $redirect;
        }

        $drafts->storePassengers(
            $request->session(),
            $request->validated('passengers'),
            $service,
        );

        return redirect()
            ->route('dropping-bookings.review')
            ->with('dropping_booking_success', 'Data penumpang berhasil disimpan. Silakan periksa review pemesanan dropping sebelum melanjutkan.');
    }

    public function review(
        Request $request,
        DroppingBookingService $service,
        DroppingBookingDraftService $drafts,
        DroppingBookingPersistenceService $persistence,
    ): View|RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan dropping terlebih dahulu sebelum masuk ke review.')) {
            return $redirect;
        }

        if ($redirect = $this->ensurePassengerStepIsComplete($draft, $service, $drafts, 'Lengkapi data penumpang terlebih dahulu sebelum masuk ke review pemesanan.')) {
            return $redirect;
        }

        return view('dropping-bookings.review', [
            'pageTitle'       => 'Review Pemesanan Dropping | Lancang Kuning Travelindo',
            'pageScript'      => '',
            'guardMode'       => 'protected',
            'pageHeading'     => 'Review Pemesanan Dropping',
            'pageDescription' => 'Periksa kembali seluruh data pemesanan dropping sebelum melanjutkan ke pembayaran.',
            'steps'           => $this->steps(3),
            'draft'           => $draft,
            'draftSummary'    => $drafts->buildSummary($draft, $service),
            'reviewState'     => $drafts->buildReviewState($draft, $service),
            'persistedBooking'=> $persistence->currentDraftBooking($request->session(), $drafts),
            'flashSuccess'    => $request->session()->get('dropping_booking_success'),
            'flashNotice'     => $request->session()->get('dropping_booking_notice'),
        ]);
    }

    public function storeReview(
        Request $request,
        DroppingBookingService $service,
        DroppingBookingDraftService $drafts,
        DroppingBookingPersistenceService $persistence,
    ): RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan dropping terlebih dahulu sebelum menyimpan review.')) {
            return $redirect;
        }

        if ($redirect = $this->ensurePassengerStepIsComplete($draft, $service, $drafts, 'Lengkapi data penumpang terlebih dahulu sebelum menyimpan review pemesanan.')) {
            return $redirect;
        }

        $booking = $persistence->persistDraft($request->session(), $draft, $service, $drafts);

        return redirect()
            ->route('dropping-bookings.payment')
            ->with('dropping_booking_success', "Review pemesanan dropping berhasil disimpan sebagai draft dengan kode {$booking->booking_code}. Silakan lanjutkan ke tahap pembayaran.");
    }

    public function payment(
        Request $request,
        DroppingBookingService $service,
        DroppingBookingDraftService $drafts,
        DroppingBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): View|RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan dropping terlebih dahulu sebelum masuk ke pembayaran.')) {
            return $redirect;
        }

        if ($redirect = $this->ensurePassengerStepIsComplete($draft, $service, $drafts, 'Lengkapi data penumpang terlebih dahulu sebelum masuk ke pembayaran.')) {
            return $redirect;
        }

        $persistedBooking = $persistence->currentDraftBooking($request->session(), $drafts);

        if (! $persistedBooking) {
            return redirect()
                ->route('dropping-bookings.review')
                ->with('dropping_booking_notice', 'Simpan review pemesanan dropping terlebih dahulu sebelum memilih metode pembayaran.');
        }

        return view('dropping-bookings.payment', [
            'pageTitle'        => 'Pembayaran Dropping | Lancang Kuning Travelindo',
            'pageScript'       => '',
            'guardMode'        => 'protected',
            'pageHeading'      => 'Pembayaran',
            'pageDescription'  => 'Pilih metode pembayaran untuk dropping booking yang sudah direview dan disimpan.',
            'steps'            => $this->steps(4),
            'draft'            => $draft,
            'draftSummary'     => $drafts->buildSummary($draft, $service),
            'reviewState'      => $drafts->buildReviewState($draft, $service),
            'persistedBooking' => $persistedBooking,
            'paymentMethods'   => $payments->paymentMethods(),
            'bankAccounts'     => $payments->transferBankAccounts(),
            'paymentFormState' => $payments->buildFormState($request, $persistedBooking),
            'flashSuccess'     => $request->session()->get('dropping_booking_success'),
            'flashNotice'      => $request->session()->get('dropping_booking_notice'),
        ]);
    }

    public function storePayment(
        StoreDroppingBookingPaymentRequest $request,
        DroppingBookingService $service,
        DroppingBookingDraftService $drafts,
        DroppingBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan dropping terlebih dahulu sebelum memilih metode pembayaran.')) {
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
            ->route('dropping-bookings.invoice')
            ->with('dropping_booking_success', "Pembayaran dropping dengan metode {$payments->paymentMethodLabel($booking->payment_method)} berhasil dicatat. Invoice dan e-ticket siap dilihat.");
    }

    public function invoice(
        Request $request,
        DroppingBookingService $service,
        DroppingBookingDraftService $drafts,
        DroppingBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): View|RedirectResponse {
        $persistedBooking = $this->resolveInvoiceBookingOrRedirect($request, $service, $drafts, $persistence, $payments);

        if ($persistedBooking instanceof RedirectResponse) {
            return $persistedBooking;
        }

        return view('dropping-bookings.invoice', [
            'pageTitle'       => 'Invoice Pemesanan Dropping | Lancang Kuning Travelindo',
            'pageScript'      => '',
            'guardMode'       => 'protected',
            'pageHeading'     => 'Invoice Pemesanan Dropping',
            'pageDescription' => 'Ringkasan pembayaran dropping booking setelah transaksi dicatat.',
            'persistedBooking'=> $persistedBooking,
            'invoiceState'    => $payments->buildInvoiceState($persistedBooking, $service),
            'flashSuccess'    => $request->session()->get('dropping_booking_success'),
            'flashNotice'     => $request->session()->get('dropping_booking_notice'),
        ]);
    }

    public function downloadInvoice(
        Request $request,
        DroppingBookingService $service,
        DroppingBookingDraftService $drafts,
        DroppingBookingPersistenceService $persistence,
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
        DroppingBookingService $service,
        DroppingBookingDraftService $drafts,
        DroppingBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): View|RedirectResponse {
        $persistedBooking = $this->resolveTicketBookingOrRedirect($request, $service, $drafts, $persistence, $payments);

        if ($persistedBooking instanceof RedirectResponse) {
            return $persistedBooking;
        }

        $persistedBooking = $persistence->ensureTicketMetadata($persistedBooking);

        return view('dropping-bookings.ticket', [
            'pageTitle'       => 'E-ticket Dropping | Lancang Kuning Travelindo',
            'pageScript'      => '',
            'guardMode'       => 'protected',
            'pageHeading'     => 'E-ticket Dropping',
            'pageDescription' => 'Tiket elektronik dropping booking setelah transaksi dicatat.',
            'persistedBooking'=> $persistedBooking,
            'ticketState'     => $payments->buildTicketState($persistedBooking, $service),
            'flashSuccess'    => $request->session()->get('dropping_booking_success'),
            'flashNotice'     => $request->session()->get('dropping_booking_notice'),
        ]);
    }

    public function downloadTicket(
        Request $request,
        DroppingBookingService $service,
        DroppingBookingDraftService $drafts,
        DroppingBookingPersistenceService $persistence,
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
                'title'       => 'Informasi Pemesanan',
                'description' => 'Lengkapi data awal perjalanan dropping termasuk rute bebas dan jam berangkat.',
            ],
            [
                'number'      => 2,
                'title'       => 'Data Penumpang',
                'description' => 'Isi nama dan nomor HP untuk seluruh 6 kursi yang otomatis dipesan.',
            ],
            [
                'number'      => 3,
                'title'       => 'Review Pemesanan',
                'description' => 'Periksa kembali seluruh detail sebelum melanjutkan ke proses berikutnya.',
            ],
            [
                'number'      => 4,
                'title'       => 'Pembayaran',
                'description' => 'Simpan data pembayaran dan lanjutkan ke invoice serta e-ticket dropping.',
            ],
        ])->map(function (array $step) use ($currentStep): array {
            $step['status'] = match (true) {
                $step['number'] < $currentStep  => 'completed',
                $step['number'] === $currentStep => 'current',
                default                         => 'upcoming',
            };

            return $step;
        })->all();
    }

    private function ensureInformationStepIsComplete(
        array $draft,
        DroppingBookingService $service,
        DroppingBookingDraftService $drafts,
        string $message,
    ): ?RedirectResponse {
        if (! $drafts->hasCompleteInformation($draft, $service)) {
            return redirect()
                ->route('dropping-bookings.index')
                ->with('dropping_booking_notice', $message);
        }

        return null;
    }

    private function ensurePassengerStepIsComplete(
        array $draft,
        DroppingBookingService $service,
        DroppingBookingDraftService $drafts,
        string $message,
    ): ?RedirectResponse {
        if (! $drafts->hasCompletePassengerData($draft, $service)) {
            return redirect()
                ->route('dropping-bookings.passengers')
                ->with('dropping_booking_notice', $message);
        }

        return null;
    }

    private function resolveInvoiceBookingOrRedirect(
        Request $request,
        DroppingBookingService $service,
        DroppingBookingDraftService $drafts,
        DroppingBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): Booking|RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan dropping terlebih dahulu sebelum membuka invoice.')) {
            return $redirect;
        }

        if ($redirect = $this->ensurePassengerStepIsComplete($draft, $service, $drafts, 'Lengkapi data penumpang terlebih dahulu sebelum membuka invoice.')) {
            return $redirect;
        }

        $persistedBooking = $persistence->currentDraftBooking($request->session(), $drafts);

        if (! $payments->hasRecordedPayment($persistedBooking)) {
            return redirect()
                ->route('dropping-bookings.payment')
                ->with('dropping_booking_notice', 'Selesaikan pembayaran terlebih dahulu sebelum membuka invoice.');
        }

        return $persistedBooking;
    }

    private function resolveTicketBookingOrRedirect(
        Request $request,
        DroppingBookingService $service,
        DroppingBookingDraftService $drafts,
        DroppingBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): Booking|RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts, 'Lengkapi informasi pemesanan dropping terlebih dahulu sebelum membuka e-ticket.')) {
            return $redirect;
        }

        if ($redirect = $this->ensurePassengerStepIsComplete($draft, $service, $drafts, 'Lengkapi data penumpang terlebih dahulu sebelum membuka e-ticket.')) {
            return $redirect;
        }

        $persistedBooking = $persistence->currentDraftBooking($request->session(), $drafts);

        if (! $payments->hasRecordedPayment($persistedBooking)) {
            return redirect()
                ->route('dropping-bookings.payment')
                ->with('dropping_booking_notice', 'Selesaikan pembayaran terlebih dahulu sebelum membuka e-ticket.');
        }

        return $persistedBooking;
    }
}
