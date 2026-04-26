import { formatCurrency } from '../../services/helpers';

function parseJsonScript(id) {
    const element = document.getElementById(id);

    if (!element) {
        return {};
    }

    try {
        return JSON.parse(element.textContent || '{}');
    } catch (error) {
        return {};
    }
}

export default function initRegularBookingsPage() {
    const page = document.querySelector('[data-regular-booking-page]');

    if (!page) {
        return;
    }

    const routeMatrix = parseJsonScript('regular-booking-route-matrix');
    // Sesi 44D PR #1D: cluster_map + forbidden_pairs untuk auto-resolve dropdown
    // dan banner "tarif tidak terdaftar".
    const clusterMap = parseJsonScript('regular-booking-cluster-map');
    const originSelect = page.querySelector('[data-booking-origin]');
    const destinationSelect = page.querySelector('[data-booking-destination]');
    const scheduleSelect = page.querySelector('[data-booking-schedule]');
    const passengerSelect = page.querySelector('[data-booking-passengers]');
    const routeFareInput = page.querySelector('[data-route-fare-input]');
    const additionalFareInput = page.querySelector('[data-additional-fare-input]');
    const estimatedTotalInput = page.querySelector('[data-estimated-total-input]');
    const routeFeedback = page.querySelector('[data-route-feedback]');
    const routeFeedbackTitle = page.querySelector('[data-route-feedback-title]');
    const routeFeedbackText = page.querySelector('[data-route-feedback-text]');
    const submitButton = page.querySelector('[data-booking-submit]');
    const routeViaSelect = page.querySelector('[data-booking-route-via]');
    const routeViaHelper = page.querySelector('[data-route-via-helper]');
    const fareBanner = page.querySelector('[data-fare-not-listed-banner]');
    const bookingTypeInputs = Array.from(page.querySelectorAll('[data-booking-type]'));
    const summaryBookingType = page.querySelector('[data-summary-booking-for]');
    const summaryRoute = page.querySelector('[data-summary-route]');
    const summarySchedule = page.querySelector('[data-summary-schedule]');
    const summaryPassengers = page.querySelector('[data-summary-passengers]');
    const summaryFare = page.querySelector('[data-summary-fare]');
    const summaryAdditionalFare = page.querySelector('[data-summary-additional-fare]');
    const summaryTotal = page.querySelector('[data-summary-total]');
    const bookingTypeLabels = new Map(bookingTypeInputs.map((input) => [input.value, input.dataset.label || input.value]));
    const scheduleLabels = new Map(
        Array.from(scheduleSelect?.options || [])
            .filter((option) => option.value)
            .map((option) => [option.value, option.textContent.trim()]),
    );

    function resolveFare(origin, destination) {
        if (!origin || !destination || origin === destination) {
            return { fare: null, isListed: false };
        }

        const fare = routeMatrix?.[origin]?.[destination];

        if (fare === undefined || fare === null) {
            return { fare: null, isListed: false };
        }

        return { fare: Number(fare), isListed: true };
    }

    // Sesi 44D PR #1D: auto-resolve dropdown jalur dari cluster_map.
    function updateRouteVia() {
        if (!routeViaSelect) return;

        const origin = originSelect?.value || '';
        const destination = destinationSelect?.value || '';
        const fromCluster = clusterMap[origin] ?? null;
        const toCluster = clusterMap[destination] ?? null;

        let resolvedCluster = null;
        if (fromCluster && fromCluster !== 'HUB') {
            resolvedCluster = fromCluster;
        } else if (toCluster && toCluster !== 'HUB') {
            resolvedCluster = toCluster;
        }

        const userTouched = routeViaSelect.dataset.userTouched === '1';

        if (resolvedCluster) {
            if (!userTouched || routeViaSelect.value === '') {
                routeViaSelect.value = resolvedCluster;
            }
        } else if (!userTouched) {
            routeViaSelect.value = '';
        }

        if (routeViaHelper) {
            const isAmbiguous = !resolvedCluster && origin && destination && origin !== destination;
            routeViaHelper.hidden = !isAmbiguous;
        }
    }

    function updateFareBanner(origin, destination, isListed) {
        if (!fareBanner) return;

        const showBanner = origin && destination && origin !== destination && !isListed;
        fareBanner.hidden = !showBanner;
    }

    function setRouteFeedback(state, title, message) {
        if (!routeFeedback || !routeFeedbackTitle || !routeFeedbackText) {
            return;
        }

        routeFeedback.dataset.state = state;
        routeFeedbackTitle.textContent = title;
        routeFeedbackText.textContent = message;
    }

    function syncRadioCards() {
        page.querySelectorAll('.regular-booking-radio').forEach((card) => {
            const input = card.querySelector('input[type="radio"]');

            card.classList.toggle('is-selected', Boolean(input?.checked));
        });
    }

    function passengerLabel(total) {
        if (total <= 0) {
            return 'Belum dipilih';
        }

        return `${total} Penumpang`;
    }

    function updateSummary() {
        const origin = originSelect?.value || '';
        const destination = destinationSelect?.value || '';
        const schedule = scheduleSelect?.value || '';
        const passengerTotal = Number(passengerSelect?.value || 0);
        const selectedBookingType = bookingTypeInputs.find((input) => input.checked)?.value || '';
        const fareResult = resolveFare(origin, destination);
        const fareValue = fareResult.fare !== null ? fareResult.fare : 0;
        const additionalFare = Math.max(parseInt(additionalFareInput?.value || '0', 10) || 0, 0);
        const showRouteSummary = origin && destination && origin !== destination;
        const total = showRouteSummary && passengerTotal > 0
            ? (fareValue + additionalFare) * passengerTotal
            : null;

        if (routeFareInput) {
            routeFareInput.value = showRouteSummary ? formatCurrency(fareValue) : '';
        }

        if (estimatedTotalInput) {
            estimatedTotalInput.value = total !== null ? formatCurrency(total) : '';
        }

        // Sesi 44D PR #1D: tarif null bukan blocker — banner UI notify, admin/customer
        // boleh save dengan tarif Rp 0 + ongkos tambahan manual.
        if (!origin || !destination) {
            setRouteFeedback('idle', 'Tarif akan ditampilkan otomatis', 'Pilih asal dan tujuan untuk melihat tarif perjalanan reguler.');
        } else if (origin === destination) {
            setRouteFeedback('error', 'Asal dan tujuan tidak boleh sama', 'Silakan pilih tujuan yang berbeda agar tarif dapat dihitung.');
        } else if (!fareResult.isListed) {
            setRouteFeedback('idle', 'Tarif tidak terdaftar', 'Rute ini belum ada di tarif resmi. Silakan input ongkos tambahan secara manual.');
        } else {
            setRouteFeedback('ready', 'Rute tersedia', 'Tarif telah diisi otomatis berdasarkan kombinasi rute dua arah yang tersedia.');
        }

        if (submitButton) {
            submitButton.disabled = Boolean(origin && destination && origin === destination);
        }

        updateFareBanner(origin, destination, fareResult.isListed);

        if (summaryBookingType) {
            summaryBookingType.textContent = bookingTypeLabels.get(selectedBookingType) || 'Belum dipilih';
        }

        if (summaryRoute) {
            summaryRoute.textContent = origin && destination ? `${origin} - ${destination}` : 'Belum dipilih';
        }

        if (summarySchedule) {
            summarySchedule.textContent = scheduleLabels.get(schedule) || 'Belum dipilih';
        }

        if (summaryPassengers) {
            summaryPassengers.textContent = passengerLabel(passengerTotal);
        }

        if (summaryFare) {
            summaryFare.textContent = fareResult.isListed ? formatCurrency(fareValue) : 'Belum tersedia';
        }

        if (summaryAdditionalFare) {
            summaryAdditionalFare.textContent = additionalFare > 0 ? formatCurrency(additionalFare) : 'Tidak ada';
        }

        if (summaryTotal) {
            summaryTotal.textContent = total !== null ? formatCurrency(total) : 'Belum tersedia';
        }

        syncRadioCards();
    }

    [originSelect, destinationSelect].forEach((field) => {
        field?.addEventListener('change', () => {
            // Sesi 44D PR #1D: reset user-touched flag supaya auto-resolve aktif
            // lagi untuk kombinasi rute baru.
            if (routeViaSelect) routeViaSelect.dataset.userTouched = '0';
            updateRouteVia();
            updateSummary();
        });
    });

    [scheduleSelect, passengerSelect].forEach((field) => {
        field?.addEventListener('change', updateSummary);
    });

    routeViaSelect?.addEventListener('change', () => {
        routeViaSelect.dataset.userTouched = '1';
    });

    additionalFareInput?.addEventListener('input', updateSummary);

    bookingTypeInputs.forEach((input) => {
        input.addEventListener('change', updateSummary);
    });

    page.querySelector('form')?.addEventListener('reset', () => {
        window.requestAnimationFrame(() => {
            if (routeViaSelect) routeViaSelect.dataset.userTouched = '0';
            updateRouteVia();
            updateSummary();
        });
    });

    // Sesi 44D PR #1D: kalau formState sudah punya route_via dari draft (back-edit
    // wizard), tandai sebagai user-touched supaya tidak ke-overwrite cluster_map.
    if (routeViaSelect && routeViaSelect.value !== '') {
        routeViaSelect.dataset.userTouched = '1';
    }

    updateRouteVia();
    updateSummary();
}
