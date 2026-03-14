export default function initRegularBookingSeatsPage() {
    const page = document.querySelector('[data-regular-booking-seat-page]');

    if (!page) {
        return;
    }

    const requiredSeatCount = Number(page.dataset.requiredSeatCount || 0);
    const seatCards = Array.from(page.querySelectorAll('[data-seat-card]'));
    const seatInputs = Array.from(page.querySelectorAll('[data-seat-input]'));
    const summaryCount = page.querySelector('[data-seat-summary-count]');
    const summaryList = page.querySelector('[data-seat-summary-list]');
    const summaryRemaining = page.querySelector('[data-seat-summary-remaining]');
    const submitButton = page.querySelector('[data-seat-submit]');
    const feedback = page.querySelector('[data-seat-feedback]');
    const feedbackTitle = page.querySelector('[data-seat-feedback-title]');
    const feedbackText = page.querySelector('[data-seat-feedback-text]');

    function selectedSeatCodes() {
        return seatInputs
            .filter((input) => input.checked)
            .map((input) => input.value);
    }

    function selectedSeatLabels(values) {
        return values.length > 0 ? values.join(', ') : 'Belum dipilih';
    }

    function setFeedback(state, title, message) {
        if (!feedback || !feedbackTitle || !feedbackText) {
            return;
        }

        feedback.dataset.state = state;
        feedbackTitle.textContent = title;
        feedbackText.textContent = message;
    }

    function syncSeatCards() {
        const selectedCodes = selectedSeatCodes();
        const selectedCount = selectedCodes.length;
        const selectionIsFull = requiredSeatCount > 0 && selectedCount >= requiredSeatCount;

        seatCards.forEach((card) => {
            const input = card.querySelector('[data-seat-input]');

            if (!input) {
                return;
            }

            const isSelected = input.checked;
            const shouldDisable = selectionIsFull && !isSelected;

            input.disabled = shouldDisable;
            card.classList.toggle('is-selected', isSelected);
            card.classList.toggle('is-disabled', shouldDisable);
        });

        if (summaryCount) {
            summaryCount.textContent = `${selectedCount} dari ${requiredSeatCount}`;
        }

        if (summaryList) {
            summaryList.textContent = selectedSeatLabels(selectedCodes);
        }

        if (summaryRemaining) {
            summaryRemaining.textContent = String(Math.max(requiredSeatCount - selectedCount, 0));
        }

        if (submitButton) {
            submitButton.disabled = selectedCount !== requiredSeatCount;
        }

        if (selectedCount === 0) {
            setFeedback('idle', 'Pilih kursi sesuai jumlah penumpang', 'Jumlah kursi yang dipilih harus sama dengan jumlah penumpang pada booking draft.');

            return;
        }

        if (selectedCount < requiredSeatCount) {
            setFeedback(
                'idle',
                'Pemilihan kursi belum lengkap',
                `Masih perlu memilih ${requiredSeatCount - selectedCount} kursi lagi sebelum dapat melanjutkan.`,
            );

            return;
        }

        if (requiredSeatCount === 6) {
            setFeedback('ready', 'Semua kursi sudah terisi', 'Jumlah penumpang 6 orang sudah terpenuhi dan kursi tambahan 2B ikut terpakai.');

            return;
        }

        setFeedback('ready', 'Kursi sudah sesuai', 'Jumlah kursi yang dipilih sudah sesuai dengan jumlah penumpang dan siap disimpan.');
    }

    seatInputs.forEach((input) => {
        input.addEventListener('change', () => {
            syncSeatCards();
        });
    });

    syncSeatCards();
}
