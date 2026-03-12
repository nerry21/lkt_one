import { login, register } from '../../services/auth';
import { toastError, toastSuccess } from '../../ui/toast';

const modeConfig = {
    login: {
        title: 'Selamat Datang!',
        description: 'Masuk ke akun Anda untuk melanjutkan',
        submit: 'Masuk',
        switchText: 'Belum punya akun?',
        switchAction: 'Daftar sekarang',
    },
    register: {
        title: 'Buat Akun Baru',
        description: 'Daftar untuk mulai menggunakan sistem',
        submit: 'Daftar',
        switchText: 'Sudah punya akun?',
        switchAction: 'Masuk',
    },
};

function setMode(mode, elements) {
    const config = modeConfig[mode];

    elements.form.dataset.authMode = mode;
    elements.title.textContent = config.title;
    elements.description.textContent = config.description;
    elements.submitText.textContent = config.submit;
    if (elements.switchText) {
        elements.switchText.textContent = config.switchText;
    }

    if (elements.switchButton) {
        elements.switchButton.textContent = config.switchAction;
    }

    elements.nameField.hidden = mode !== 'register';
    elements.nameInput.required = mode === 'register';
}

export default function initAuthPage() {
    const form = document.getElementById('auth-form');

    if (!form) {
        return;
    }

    const elements = {
        form,
        title: document.querySelector('[data-auth-title]'),
        description: document.querySelector('[data-auth-description]'),
        submitText: document.querySelector('[data-auth-submit-text]'),
        switchText: document.querySelector('[data-auth-switch-text]'),
        switchButton: document.querySelector('[data-toggle-auth-mode]'),
        nameField: document.getElementById('auth-name-field'),
        nameInput: document.getElementById('nama'),
        emailInput: document.getElementById('email'),
        passwordInput: document.getElementById('password'),
        passwordToggle: document.querySelector('[data-toggle-password]'),
        submitButton: document.getElementById('auth-submit-button'),
    };

    const dashboardUrl = document.body.dataset.dashboardUrl || '/dashboard';

    setMode('login', elements);

    elements.switchButton?.addEventListener('click', () => {
        const nextMode = elements.form.dataset.authMode === 'login' ? 'register' : 'login';
        setMode(nextMode, elements);
    });

    elements.passwordToggle?.addEventListener('click', () => {
        const nextType = elements.passwordInput.type === 'password' ? 'text' : 'password';
        elements.passwordInput.type = nextType;
        elements.passwordToggle.textContent = nextType === 'password' ? 'Lihat' : 'Sembunyikan';
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const mode = form.dataset.authMode || 'login';
        const payload = {
            email: String(formData.get('email') || '').trim(),
            password: String(formData.get('password') || '').trim(),
        };

        if (mode === 'register') {
            payload.nama = String(formData.get('nama') || '').trim();
        }

        elements.submitButton.disabled = true;
        elements.submitText.textContent = mode === 'login' ? 'Memproses...' : 'Mendaftarkan...';

        try {
            if (mode === 'login') {
                await login(payload);
                toastSuccess('Selamat datang kembali', 'Login berhasil!');
            } else {
                await register(payload);
                toastSuccess('Akun Anda telah dibuat', 'Registrasi berhasil!');
            }

            window.location.replace(dashboardUrl);
        } catch (error) {
            toastError(error.message || 'Terjadi kesalahan', mode === 'login' ? 'Login gagal' : 'Registrasi gagal');
        } finally {
            elements.submitButton.disabled = false;
            elements.submitText.textContent = modeConfig[mode].submit;
        }
    });
}
