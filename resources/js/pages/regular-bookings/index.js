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
            return null;
        }

        const fare = routeMatrix?.[origin]?.[destination];

        return fare === undefined || fare === null ? null : Number(fare);
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
        const fare = resolveFare(origin, destination);
        const additionalFare = Math.max(parseInt(additionalFareInput?.value || '0', 10) || 0, 0);
        const total = fare !== null && passengerTotal > 0 ? (fare + additionalFare) * passengerTotal : null;

        if (routeFareInput) {
            routeFareInput.value = fare !== null ? formatCurrency(fare) : '';
        }

        if (estimatedTotalInput) {
            estimatedTotalInput.value = total !== null ? formatCurrency(total) : '';
        }

        if (!origin || !destination) {
            setRouteFeedback('idle', 'Tarif akan ditampilkan otomatis', 'Pilih asal dan tujuan untuk melihat tarif perjalanan reguler.');
        } else if (origin === destination) {
            setRouteFeedback('error', 'Asal dan tujuan tidak boleh sama', 'Silakan pilih tujuan yang berbeda agar tarif dapat dihitung.');
        } else if (fare === null) {
            setRouteFeedback('error', 'Rute belum tersedia', 'Rute yang Anda pilih saat ini belum tersedia. Silakan pilih kombinasi asal dan tujuan lain.');
        } else {
            setRouteFeedback('ready', 'Rute tersedia', 'Tarif telah diisi otomatis berdasarkan kombinasi rute dua arah yang tersedia.');
        }

        if (submitButton) {
            submitButton.disabled = Boolean(origin && destination && (origin === destination || fare === null));
        }

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
            summaryFare.textContent = fare !== null ? formatCurrency(fare) : 'Belum tersedia';
        }

        if (summaryAdditionalFare) {
            summaryAdditionalFare.textContent = additionalFare > 0 ? formatCurrency(additionalFare) : 'Tidak ada';
        }

        if (summaryTotal) {
            summaryTotal.textContent = total !== null ? formatCurrency(total) : 'Belum tersedia';
        }

        syncRadioCards();
    }

    [originSelect, destinationSelect, scheduleSelect, passengerSelect].forEach((field) => {
        field?.addEventListener('change', updateSummary);
    });

    additionalFareInput?.addEventListener('input', updateSummary);

    bookingTypeInputs.forEach((input) => {
        input.addEventListener('change', updateSummary);
    });

    page.querySelector('form')?.addEventListener('reset', () => {
        window.requestAnimationFrame(updateSummary);
    });

    updateSummary();
}
