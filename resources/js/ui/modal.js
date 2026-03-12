function visibleModals() {
    return Array.from(document.querySelectorAll('.modal-shell')).filter((modal) => !modal.hidden);
}

function syncBodyState() {
    document.body.style.overflow = visibleModals().length > 0 ? 'hidden' : '';
}

export function openModal(id) {
    const modal = document.getElementById(id);

    if (!modal) {
        return;
    }

    modal.hidden = false;
    syncBodyState();
}

export function closeModal(id = null) {
    if (id) {
        const modal = document.getElementById(id);

        if (modal) {
            modal.hidden = true;
        }
    } else {
        visibleModals().forEach((modal) => {
            modal.hidden = true;
        });
    }

    syncBodyState();
}

export function setupModalBindings() {
    document.addEventListener('click', (event) => {
        const openTrigger = event.target.closest('[data-modal-open]');

        if (openTrigger) {
            openModal(openTrigger.dataset.modalOpen);
            return;
        }

        const closeTrigger = event.target.closest('[data-modal-close]');

        if (closeTrigger) {
            const modalId = closeTrigger.dataset.modalClose || closeTrigger.closest('.modal-shell')?.id;
            closeModal(modalId || undefined);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') {
            return;
        }

        const lastVisibleModal = visibleModals().pop();

        if (lastVisibleModal) {
            closeModal(lastVisibleModal.id);
        }
    });
}
