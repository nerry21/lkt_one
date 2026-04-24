<?php

namespace App\Http\Controllers\PackageBookings;

use App\Exceptions\WizardBackEditOnPaidBookingException;
use App\Models\Booking;
use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\PackageBooking\StorePackageBookingInformationRequest;
use App\Http\Requests\PackageBooking\StorePackageBookingPackageRequest;
use App\Http\Requests\PackageBooking\StorePackageBookingPaymentRequest;
use App\Services\PackageBookingDraftService;
use App\Services\PackageBookingPersistenceService;
use App\Services\PackageBookingService;
use App\Services\RegularBookingPaymentService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Contracts\View\View;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PackageBookingPageController extends Controller
{
    public function index(
        Request $request,
        PackageBookingService $service,
        PackageBookingDraftService $drafts,
    ): View {
        $draft = $drafts->get($request->session());
        $formState = $drafts->buildFormState($request, $draft, $service);

        return view('package-bookings.index', [
            'pageTitle' => 'Pengantaran Paket | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript' => '',
            'guardMode' => 'protected',
            'pageHeading' => 'Pengantaran Paket',
            'pageDescription' => 'Lengkapi informasi pengiriman paket sebelum melanjutkan ke langkah berikutnya',
            'steps' => $this->steps(1),
            'departureSchedules' => $service->departureSchedules(),
            'locations' => $service->locations(),
            'formState' => $formState,
            'draftSummary' => $drafts->buildSummary($draft, $service),
            'flashNotice' => $request->session()->get('package_booking_notice'),
        ]);
    }

    public function storeInformation(
        StorePackageBookingInformationRequest $request,
        PackageBookingService $service,
        PackageBookingDraftService $drafts,
    ): RedirectResponse {
        $validated = $request->validated();
        $fareAmount = max(0, (int) ($validated['fare_amount'] ?? 0));
        $additionalFare = max(0, (int) ($validated['additional_fare'] ?? 0));

        $drafts->store(
            $request->session(),
            $drafts->fromValidated($validated, $fareAmount, $additionalFare),
        );

        $request->session()->forget(PackageBookingDraftService::PERSISTED_BOOKING_ID_SESSION_KEY);

        return redirect()
            ->route('package-bookings.package')
            ->with('package_booking_success', 'Informasi pengiriman berhasil disimpan. Silakan lanjut ke langkah pilih ukuran paket.');
    }

    public function package(
        Request $request,
        PackageBookingService $service,
        PackageBookingDraftService $drafts,
    ): View|RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts)) {
            return $redirect;
        }

        $packageSelectionState = $drafts->buildPackageSelectionState($request, $draft, $service);

        $tripDate = trim((string) ($draft['trip_date'] ?? now()->toDateString()));
        $tripTime = trim((string) ($draft['departure_time'] ?? ''));
        $timePrefix = strlen($tripTime) >= 5 ? substr($tripTime, 0, 5) : $tripTime;
        $persistedBookingId = $drafts->getPersistedBookingId($request->session());
        $totalSeatCount = count($service->selectableSeatCodes());

        // Build occupied seats for Paket Besar (only 1 seat needed)
        $allSlotBookings = ($tripDate !== '' && $tripTime !== '')
            ? Booking::query()
                ->where('trip_date', $tripDate)
                ->where('trip_time', 'like', $timePrefix . '%')
                ->whereNotIn('booking_status', ['Dibatalkan'])
                ->when($persistedBookingId, fn ($q) => $q->where('id', '!=', $persistedBookingId))
                ->get()
            : collect();

        $occupiedByArmada = $allSlotBookings
            ->groupBy(fn (Booking $b) => $b->armada_index ?? 1)
            ->map(fn ($bookings) => $bookings
                ->flatMap(fn (Booking $b) => (array) ($b->selected_seats ?? []))
                ->unique()
                ->values()
                ->all()
            );

        $maxKnownArmada = $occupiedByArmada->keys()->max() ?? 0;
        $targetArmadaIndex = 1;
        for ($i = 1; $i <= $maxKnownArmada + 1; $i++) {
            $taken = count($occupiedByArmada->get($i, []));
            if ($taken + 1 <= $totalSeatCount) {
                $targetArmadaIndex = $i;
                break;
            }
        }

        $occupiedSeats = $occupiedByArmada->get($targetArmadaIndex, []);

        $draft['armada_index'] = $targetArmadaIndex;
        $drafts->store($request->session(), $draft);

        $actor = $request->user();
        $isAdmin = $actor instanceof User && $actor->isAdmin();

        return view('package-bookings.package', [
            'pageTitle' => 'Ukuran Paket | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript' => 'package-bookings/package',
            'guardMode' => 'protected',
            'pageHeading' => 'Ukuran Paket',
            'pageDescription' => 'Pilih ukuran paket yang akan dikirim. Paket Besar memerlukan tempat duduk di kendaraan.',
            'steps' => $this->steps(2),
            'draft' => $draft,
            'draftSummary' => $drafts->buildSummary($draft, $service),
            'packageSizes' => $service->packageSizes(),
            'packageSelectionState' => $packageSelectionState,
            'seatLayout' => $service->seatLayoutState(
                $packageSelectionState['selected_seats'],
                1,
                $occupiedSeats,
                $isAdmin,
            ),
            'isAdmin' => $isAdmin,
            'flashSuccess' => $request->session()->get('package_booking_success'),
            'flashNotice' => $request->session()->get('package_booking_notice'),
        ]);
    }

    public function storePackage(
        StorePackageBookingPackageRequest $request,
        PackageBookingService $service,
        PackageBookingDraftService $drafts,
    ): RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts)) {
            return $redirect;
        }

        $packageSize = $request->validated('package_size');
        $seatCodes = $request->validated('seat_codes') ?? [];

        $drafts->storePackageSelection($request->session(), $packageSize, (array) $seatCodes, $service);

        return redirect()
            ->route('package-bookings.review')
            ->with('package_booking_success', 'Ukuran paket berhasil disimpan. Silakan periksa review pengiriman sebelum melanjutkan.');
    }

    public function review(
        Request $request,
        PackageBookingService $service,
        PackageBookingDraftService $drafts,
        PackageBookingPersistenceService $persistence,
    ): View|RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts)) {
            return $redirect;
        }

        if ($redirect = $this->ensurePackageStepIsComplete($draft, $service, $drafts)) {
            return $redirect;
        }

        return view('package-bookings.review', [
            'pageTitle' => 'Review Pengiriman | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript' => '',
            'guardMode' => 'protected',
            'pageHeading' => 'Review Pengiriman',
            'pageDescription' => 'Periksa kembali seluruh data pengiriman paket sebelum melanjutkan ke pembayaran',
            'steps' => $this->steps(3),
            'draft' => $draft,
            'draftSummary' => $drafts->buildSummary($draft, $service),
            'reviewState' => $drafts->buildReviewState($draft, $service),
            'persistedBooking' => $persistence->currentDraftBooking($request->session(), $drafts),
            'flashSuccess' => $request->session()->get('package_booking_success'),
            'flashNotice' => $request->session()->get('package_booking_notice'),
        ]);
    }

    public function storeReview(
        Request $request,
        PackageBookingService $service,
        PackageBookingDraftService $drafts,
        PackageBookingPersistenceService $persistence,
    ): RedirectResponse|JsonResponse {
        $actor = $request->user();
        if (! $actor instanceof User) {
            return redirect()->route('login')->with('error', 'Sesi habis, silakan login ulang.');
        }

        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts)) {
            return $redirect;
        }

        if ($redirect = $this->ensurePackageStepIsComplete($draft, $service, $drafts)) {
            return $redirect;
        }

        try {
            $booking = $persistence->persistDraft($request->session(), $draft, $service, $drafts, $actor);
        } catch (WizardBackEditOnPaidBookingException $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'booking_id' => $e->bookingId,
                'booking_code' => $e->bookingCode,
                'category' => $e->category,
            ], 403);
        }

        return redirect()
            ->route('package-bookings.payment')
            ->with('package_booking_success', "Review pengiriman berhasil disimpan dengan kode {$booking->booking_code}. Silakan lanjutkan ke tahap pembayaran.");
    }

    public function payment(
        Request $request,
        PackageBookingService $service,
        PackageBookingDraftService $drafts,
        PackageBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): View|RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts)) {
            return $redirect;
        }

        if ($redirect = $this->ensurePackageStepIsComplete($draft, $service, $drafts)) {
            return $redirect;
        }

        $persistedBooking = $persistence->currentDraftBooking($request->session(), $drafts);

        if (! $persistedBooking) {
            return redirect()
                ->route('package-bookings.review')
                ->with('package_booking_notice', 'Simpan review pengiriman terlebih dahulu sebelum memilih metode pembayaran.');
        }

        return view('package-bookings.payment', [
            'pageTitle' => 'Pembayaran | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript' => '',
            'guardMode' => 'protected',
            'pageHeading' => 'Pembayaran',
            'pageDescription' => 'Pilih metode pembayaran untuk pengiriman paket',
            'steps' => $this->steps(4),
            'draft' => $draft,
            'draftSummary' => $drafts->buildSummary($draft, $service),
            'reviewState' => $drafts->buildReviewState($draft, $service),
            'persistedBooking' => $persistedBooking,
            'paymentMethods' => $payments->paymentMethods(),
            'bankAccounts' => $payments->transferBankAccounts(),
            'paymentFormState' => $payments->buildFormState($request, $persistedBooking),
            'flashSuccess' => $request->session()->get('package_booking_success'),
            'flashNotice' => $request->session()->get('package_booking_notice'),
        ]);
    }

    public function storePayment(
        StorePackageBookingPaymentRequest $request,
        PackageBookingService $service,
        PackageBookingDraftService $drafts,
        PackageBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): RedirectResponse|JsonResponse {
        $actor = $request->user();
        if (! $actor instanceof User) {
            return redirect()->route('login')->with('error', 'Sesi habis, silakan login ulang.');
        }

        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts)) {
            return $redirect;
        }

        if ($redirect = $this->ensurePackageStepIsComplete($draft, $service, $drafts)) {
            return $redirect;
        }

        try {
            $booking = $persistence->persistPaymentSelection(
                $request->session(),
                $draft,
                $request->validated(),
                $service,
                $drafts,
                $payments,
                $actor,
            );
        } catch (WizardBackEditOnPaidBookingException $e) {
            return response()->json([
                'message' => $e->getMessage(),
                'booking_id' => $e->bookingId,
                'booking_code' => $e->bookingCode,
                'category' => $e->category,
            ], 403);
        }

        return redirect()
            ->route('package-bookings.invoice')
            ->with('package_booking_success', "Pembayaran berhasil dicatat. Surat Bukti Pengiriman Barang siap dilihat.");
    }

    public function invoice(
        Request $request,
        PackageBookingService $service,
        PackageBookingDraftService $drafts,
        PackageBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): View|RedirectResponse {
        $persistedBooking = $this->resolveInvoiceBookingOrRedirect($request, $service, $drafts, $persistence, $payments);

        if ($persistedBooking instanceof RedirectResponse) {
            return $persistedBooking;
        }

        return view('package-bookings.invoice', [
            'pageTitle' => 'Surat Bukti Pengiriman Barang | JET (JAYA EXCECUTIVE TRANSPORT)',
            'pageScript' => '',
            'guardMode' => 'protected',
            'pageHeading' => 'Surat Bukti Pengiriman Barang',
            'pageDescription' => 'Bukti resmi pengiriman paket melalui JET (JAYA EXCECUTIVE TRANSPORT)',
            'persistedBooking' => $persistedBooking,
            'invoiceState' => $this->buildPackageInvoiceState($persistedBooking, $service, $payments),
            'flashSuccess' => $request->session()->get('package_booking_success'),
            'flashNotice' => $request->session()->get('package_booking_notice'),
        ]);
    }

    public function downloadInvoice(
        Request $request,
        PackageBookingService $service,
        PackageBookingDraftService $drafts,
        PackageBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): Response|RedirectResponse {
        $persistedBooking = $this->resolveInvoiceBookingOrRedirect($request, $service, $drafts, $persistence, $payments);

        if ($persistedBooking instanceof RedirectResponse) {
            return $persistedBooking;
        }

        $invoiceState = $this->buildPackageInvoiceState($persistedBooking, $service, $payments);
        $fileName = ($invoiceState['invoice_number'] !== '-' ? $invoiceState['invoice_number'] : $persistedBooking->booking_code) . '.pdf';

        return Pdf::loadView('package-bookings.pdf.invoice', [
            'invoiceState' => $invoiceState,
        ])->setPaper('a4', 'landscape')->download($fileName);
    }

    private function buildPackageInvoiceState(Booking $booking, PackageBookingService $service, RegularBookingPaymentService $payments): array
    {
        $notes = [];
        if ($booking->notes) {
            $decoded = json_decode($booking->notes, true);
            if (is_array($decoded)) {
                $notes = $decoded;
            }
        }

        $transactionDate = $booking->paid_at ?? $booking->updated_at ?? $booking->created_at;

        return [
            'booking_code' => $booking->booking_code,
            'invoice_number' => $booking->invoice_number ?: '-',
            'payment_reference' => $booking->payment_reference ?: '-',
            'payment_method' => $payments->paymentMethodLabel($booking->payment_method),
            'payment_status' => (string) $booking->payment_status,
            'booking_status' => (string) $booking->booking_status,
            'from_city' => (string) $booking->from_city,
            'to_city' => (string) $booking->to_city,
            'route_label' => (string) $booking->route_label,
            'trip_date' => $booking->trip_date?->format('d M Y') ?? '-',
            'trip_time' => $booking->time ?? '-',
            'sender_name' => (string) $booking->passenger_name,
            'sender_phone' => (string) $booking->passenger_phone,
            'sender_address' => (string) $booking->pickup_location,
            'recipient_name' => (string) ($notes['recipient_name'] ?? '-'),
            'recipient_phone' => (string) ($notes['recipient_phone'] ?? '-'),
            'recipient_address' => (string) $booking->dropoff_location,
            'item_name' => (string) ($notes['item_name'] ?? '-'),
            'item_qty' => (int) ($notes['item_qty'] ?? $booking->passenger_count ?? 1),
            'package_size' => (string) ($notes['package_size'] ?? $booking->booking_for ?? '-'),
            'package_size_label' => $service->packageSizeLabel((string) ($notes['package_size'] ?? $booking->booking_for ?? '')),
            'selected_seats_label' => $service->selectedSeatLabels((array) ($booking->selected_seats ?? [])),
            'fare_amount_formatted' => $service->formatCurrency((int) ($booking->price_per_seat ?? 0)),
            'total_amount_formatted' => $service->formatCurrency((int) ($booking->total_amount ?? 0)),
            'nominal_payment_formatted' => $service->formatCurrency((int) round((float) ($booking->nominal_payment ?? 0))),
            'payment_account_label' => $booking->payment_account_bank && $booking->payment_account_number
                ? $booking->payment_account_bank . ' - ' . $booking->payment_account_number
                : 'Tidak diperlukan',
            'transaction_date_label' => $transactionDate?->format('d M Y H:i') ?? '-',
        ];
    }

    private function steps(int $currentStep): array
    {
        return collect([
            [
                'number' => 1,
                'title' => 'Informasi Pengiriman',
                'description' => 'Lengkapi data pengirim, penerima, rute, jadwal, dan ongkos.',
            ],
            [
                'number' => 2,
                'title' => 'Ukuran Paket',
                'description' => 'Pilih ukuran paket. Paket Besar memerlukan tempat duduk kendaraan.',
            ],
            [
                'number' => 3,
                'title' => 'Review Pengiriman',
                'description' => 'Periksa kembali seluruh detail sebelum melanjutkan ke pembayaran.',
            ],
            [
                'number' => 4,
                'title' => 'Pembayaran',
                'description' => 'Simpan data pembayaran dan lanjutkan ke surat bukti pengiriman.',
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
        PackageBookingService $service,
        PackageBookingDraftService $drafts,
    ): ?RedirectResponse {
        if (! $drafts->hasCompleteInformation($draft, $service)) {
            return redirect()
                ->route('package-bookings.index')
                ->with('package_booking_notice', 'Lengkapi informasi pengiriman terlebih dahulu sebelum melanjutkan.');
        }

        return null;
    }

    private function ensurePackageStepIsComplete(
        array $draft,
        PackageBookingService $service,
        PackageBookingDraftService $drafts,
    ): ?RedirectResponse {
        if (! $drafts->hasCompletePackageSelection($draft, $service)) {
            return redirect()
                ->route('package-bookings.package')
                ->with('package_booking_notice', 'Pilih ukuran paket terlebih dahulu sebelum melanjutkan.');
        }

        return null;
    }

    private function resolveInvoiceBookingOrRedirect(
        Request $request,
        PackageBookingService $service,
        PackageBookingDraftService $drafts,
        PackageBookingPersistenceService $persistence,
        RegularBookingPaymentService $payments,
    ): Booking|RedirectResponse {
        $draft = $drafts->get($request->session());

        if ($redirect = $this->ensureInformationStepIsComplete($draft, $service, $drafts)) {
            return $redirect;
        }

        if ($redirect = $this->ensurePackageStepIsComplete($draft, $service, $drafts)) {
            return $redirect;
        }

        $persistedBooking = $persistence->currentDraftBooking($request->session(), $drafts);

        if (! $payments->hasRecordedPayment($persistedBooking)) {
            return redirect()
                ->route('package-bookings.payment')
                ->with('package_booking_notice', 'Selesaikan pembayaran terlebih dahulu sebelum membuka surat bukti pengiriman.');
        }

        return $persistedBooking;
    }
}
