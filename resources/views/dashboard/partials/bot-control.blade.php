{{-- Sesi 78 PR-CRM-6L — Bot Control (kill switch + whitelist) --}}
@php
    $bot = $botStatus ?? null;
    $modeLabels = [
        'off' => '⛔ MATI',
        'whitelist' => '🛡️ WHITELIST 3 NOMOR',
        'live_public' => '✅ LIVE — UMUM',
    ];
@endphp

@if ($bot)
    <section class="dashboard-bot-control-section" data-testid="dashboard-bot-control-section">
        <header class="dashboard-section-header">
            <div>
                <h2>🤖 Status Bot WhatsApp</h2>
                <p>Kontrol kill switch + whitelist untuk JET Travel customer-facing assistant</p>
            </div>
        </header>

        <div class="dashboard-stat-card dashboard-stat-card--{{ $bot['mode'] === 'live_public' ? 'healthy' : ($bot['mode'] === 'off' ? 'warning' : 'warning') }}" data-testid="bot-status-card">
            <span class="dashboard-stat-label">Mode saat ini</span>
            <span class="dashboard-stat-value" data-testid="bot-mode-display" data-bot-mode="{{ $bot['mode'] }}">
                {{ $modeLabels[$bot['mode']] ?? $bot['mode'] }}
            </span>
            @if (! empty($bot['updated_at']))
                <span class="dashboard-stat-detail">
                    Diubah: {{ \Carbon\Carbon::parse($bot['updated_at'])->locale('id')->diffForHumans() }}
                </span>
            @endif

            <div class="dashboard-bot-control-actions" style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 16px;">
                <button type="button"
                    class="dashboard-primary-button dashboard-primary-button--danger"
                    data-testid="btn-bot-mode-off"
                    data-bot-mode-set="off"
                    data-confirm="Yakin matikan bot total? Pelanggan tidak akan dapat balasan otomatis sama sekali.">
                    ⛔ MATIKAN
                </button>
                <button type="button"
                    class="dashboard-ghost-button"
                    data-testid="btn-bot-mode-whitelist"
                    data-bot-mode-set="whitelist"
                    data-confirm="Aktifkan mode whitelist? Bot hanya melayani 3 nomor admin yang sudah didaftarkan.">
                    🛡️ WHITELIST
                </button>
                <button type="button"
                    class="dashboard-primary-button"
                    data-testid="btn-bot-mode-live"
                    data-bot-mode-set="live_public"
                    data-confirm="Buka bot untuk SEMUA pelanggan? Pastikan whitelist sudah selesai diuji 24 jam.">
                    ✅ LIVE UMUM
                </button>
            </div>

            <div style="margin-top: 14px; font-size: 0.85em; color: #475569;">
                <strong>Whitelist nomor (mode whitelist):</strong>
                <code data-testid="bot-whitelist-display">{{ implode(', ', $bot['whitelist']) }}</code>
            </div>
        </div>
    </section>

    <script>
        (function () {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const buttons = document.querySelectorAll('[data-bot-mode-set]');

            buttons.forEach((btn) => {
                btn.addEventListener('click', async function () {
                    const mode = this.dataset.botModeSet;
                    const confirmMsg = this.dataset.confirm;

                    if (! window.confirm(confirmMsg)) {
                        return;
                    }

                    this.disabled = true;
                    try {
                        const response = await fetch('{{ route('dashboard.bot-mode-set') }}', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRF-TOKEN': csrfToken,
                                'Accept': 'application/json',
                            },
                            body: JSON.stringify({ mode: mode }),
                        });

                        const result = await response.json();

                        if (response.ok && result.success) {
                            window.alert('Status bot berhasil diubah ke: ' + mode.toUpperCase());
                            window.location.reload();
                        } else {
                            window.alert('Gagal: ' + (result.message ?? 'Unknown error'));
                            this.disabled = false;
                        }
                    } catch (err) {
                        window.alert('Error: ' + err.message);
                        this.disabled = false;
                    }
                });
            });
        })();
    </script>
@endif
