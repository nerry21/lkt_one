import { logout } from '../services/auth';
import { closeModal } from '../ui/modal';
import { toastError } from '../ui/toast';

function setSidebarOpen(isOpen) {
    const sidebar = document.querySelector('[data-sidebar]');
    const overlay = document.querySelector('[data-sidebar-overlay]');

    if (!sidebar || !overlay) {
        return;
    }

    sidebar.classList.toggle('is-open', isOpen);
    overlay.hidden = !isOpen;
}

function closeUserMenus(except = null) {
    document.querySelectorAll('[data-user-dropdown]').forEach((dropdown) => {
        if (except && dropdown === except) {
            return;
        }

        dropdown.classList.remove('is-open');

        const trigger = dropdown.querySelector('[data-user-menu-trigger]');
        const panel = dropdown.querySelector('[data-user-menu-panel]');

        if (trigger) {
            trigger.setAttribute('aria-expanded', 'false');
        }

        if (panel) {
            panel.hidden = true;
        }
    });
}

function toggleUserMenu(dropdown, forceOpen = null) {
    if (!dropdown) {
        return;
    }

    const trigger = dropdown.querySelector('[data-user-menu-trigger]');
    const panel = dropdown.querySelector('[data-user-menu-panel]');
    const shouldOpen = forceOpen ?? !dropdown.classList.contains('is-open');

    closeUserMenus(shouldOpen ? dropdown : null);
    dropdown.classList.toggle('is-open', shouldOpen);

    if (trigger) {
        trigger.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    }

    if (panel) {
        panel.hidden = !shouldOpen;
    }
}

export function initDashboardShell() {
    document.querySelector('[data-sidebar-open]')?.addEventListener('click', () => {
        setSidebarOpen(true);
    });

    document.querySelector('[data-sidebar-close]')?.addEventListener('click', () => {
        setSidebarOpen(false);
    });

    document.querySelector('[data-sidebar-overlay]')?.addEventListener('click', () => {
        setSidebarOpen(false);
    });

    document.querySelectorAll('[data-user-dropdown]').forEach((dropdown) => {
        dropdown.querySelector('[data-user-menu-trigger]')?.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleUserMenu(dropdown);
        });
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('[data-user-dropdown]')) {
            closeUserMenus();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeUserMenus();
            setSidebarOpen(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1100) {
            setSidebarOpen(false);
        }
    });

    document.querySelectorAll('[data-auth-logout]').forEach((button) => {
        button.addEventListener('click', async () => {
            closeModal();
            closeUserMenus();

            try {
                button.disabled = true;
                await logout();
            } catch (error) {
                button.disabled = false;
                toastError(error.message || 'Gagal logout');
            }
        });
    });
}
