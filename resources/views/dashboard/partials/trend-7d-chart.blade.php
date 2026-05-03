{{-- Sesi 77 PR-CRM-6K4 — Trend 7 Hari (Chart.js sudah pre-loaded di base layout) --}}
@if (!empty($trend7d) && !empty($trend7d['labels']))
    <section class="dashboard-trend-section" data-testid="dashboard-trend-section">
        <header class="dashboard-section-header">
            <div>
                <h2>Tren 7 Hari</h2>
                <p>Trips, revenue, dan response rate inquiry</p>
            </div>
        </header>

        <div class="dashboard-trend-chart-container">
            <canvas id="dashboard-trend-chart" data-testid="dashboard-trend-chart" height="120"></canvas>
        </div>
    </section>

    <script>
        (function () {
            var data = @json($trend7d);
            var canvas = document.getElementById('dashboard-trend-chart');
            if (!canvas || typeof window.Chart === 'undefined') {
                return;
            }
            new window.Chart(canvas, {
                type: 'line',
                data: {
                    labels: data.labels,
                    datasets: (data.datasets || []).map(function (ds) {
                        return {
                            label: ds.name,
                            data: ds.values,
                            borderWidth: 2,
                            tension: 0.3,
                            fill: false,
                        };
                    }),
                },
                options: {
                    responsive: true,
                    interaction: { mode: 'index', intersect: false },
                    plugins: { legend: { position: 'top' } },
                    scales: { y: { beginAtZero: true } },
                },
            });
        })();
    </script>
@endif
