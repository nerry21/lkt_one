import { apiRequest } from '../../services/http';
import { escapeHtml, formatCurrency, formatNumber } from '../../services/helpers';
import { toastError } from '../../ui/toast';

const PIE_COLORS = ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'];

const state = {
    revenueChart: null,
    passengerChart: null,
    mobilChart: null,
};

function parseInitialState() {
    const element = document.getElementById('dashboard-initial-state');

    if (!element) {
        return {
            stats: {},
            revenueData: [],
            mobilRevenue: [],
        };
    }

    try {
        return JSON.parse(element.textContent || '{}');
    } catch (error) {
        return {
            stats: {},
            revenueData: [],
            mobilRevenue: [],
        };
    }
}

function destroyChart(chart) {
    if (chart && typeof chart.destroy === 'function') {
        chart.destroy();
    }
}

function setStat(key, value) {
    const element = document.querySelector(`[data-stat="${key}"]`);

    if (!element) {
        return;
    }

    const moneyKeys = ['total_uang_bersih', 'total_uang_pc'];
    element.textContent = moneyKeys.includes(key) ? formatCurrency(value) : formatNumber(value);
}

function setChartVisibility(canvasId, emptyId, hasData) {
    const canvas = document.getElementById(canvasId);
    const empty = document.getElementById(emptyId);

    if (canvas) {
        canvas.hidden = !hasData;
    }

    if (empty) {
        empty.hidden = hasData;
    }
}

function chartTextColor() {
    return '#065f46';
}

function gridColor() {
    return '#d1fae5';
}

function tooltipBase() {
    return {
        backgroundColor: '#ffffff',
        titleColor: '#064e3b',
        bodyColor: '#065f46',
        borderColor: '#d1fae5',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        displayColors: true,
    };
}

function renderRevenueChart(data) {
    const canvas = document.getElementById('dashboard-revenue-chart');
    const hasData = Array.isArray(data) && data.length > 0;

    setChartVisibility('dashboard-revenue-chart', 'dashboard-revenue-empty', hasData);
    destroyChart(state.revenueChart);

    if (!canvas || !window.Chart || !hasData) {
        state.revenueChart = null;
        return;
    }

    state.revenueChart = new window.Chart(canvas, {
        type: 'line',
        data: {
            labels: data.map((item) => item.bulan),
            datasets: [
                {
                    label: 'Pendapatan Bersih',
                    data: data.map((item) => item.uang_bersih),
                    borderColor: '#059669',
                    backgroundColor: 'rgba(5, 150, 105, 0.08)',
                    fill: false,
                    tension: 0.35,
                    pointRadius: 4,
                    pointHoverRadius: 5,
                    pointBackgroundColor: '#059669',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    borderWidth: 3,
                },
                {
                    label: 'Uang PC',
                    data: data.map((item) => item.uang_pc),
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    fill: false,
                    tension: 0.35,
                    pointRadius: 4,
                    pointHoverRadius: 5,
                    pointBackgroundColor: '#f59e0b',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    borderWidth: 3,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    labels: {
                        color: chartTextColor(),
                        usePointStyle: true,
                        pointStyle: 'circle',
                        boxWidth: 8,
                        boxHeight: 8,
                        padding: 18,
                    },
                },
                tooltip: {
                    ...tooltipBase(),
                    callbacks: {
                        label(context) {
                            return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
                        },
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#047857',
                        font: {
                            size: 12,
                        },
                    },
                    grid: {
                        color: gridColor(),
                    },
                    border: {
                        display: false,
                    },
                },
                y: {
                    ticks: {
                        color: '#047857',
                        font: {
                            size: 12,
                        },
                        callback(value) {
                            return `${Math.round(Number(value) / 1000000)}jt`;
                        },
                    },
                    grid: {
                        color: gridColor(),
                    },
                    border: {
                        display: false,
                    },
                },
            },
        },
    });
}

function renderPassengerChart(data) {
    const canvas = document.getElementById('dashboard-passenger-chart');
    const hasData = Array.isArray(data) && data.length > 0;

    setChartVisibility('dashboard-passenger-chart', 'dashboard-passenger-empty', hasData);
    destroyChart(state.passengerChart);

    if (!canvas || !window.Chart || !hasData) {
        state.passengerChart = null;
        return;
    }

    state.passengerChart = new window.Chart(canvas, {
        type: 'bar',
        data: {
            labels: data.map((item) => item.bulan),
            datasets: [{
                label: 'Penumpang',
                data: data.map((item) => item.penumpang),
                backgroundColor: '#10B981',
                borderRadius: 8,
                maxBarThickness: 44,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    ...tooltipBase(),
                    callbacks: {
                        label(context) {
                            return `Penumpang: ${formatNumber(context.parsed.y)}`;
                        },
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: '#047857',
                        font: {
                            size: 12,
                        },
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0)',
                    },
                    border: {
                        display: false,
                    },
                },
                y: {
                    ticks: {
                        color: '#047857',
                        font: {
                            size: 12,
                        },
                    },
                    grid: {
                        color: gridColor(),
                    },
                    border: {
                        display: false,
                    },
                },
            },
        },
    });
}

function renderMobilList(data) {
    const list = document.getElementById('dashboard-mobil-list');

    if (!list) {
        return;
    }

    list.innerHTML = data.map((item, index) => `
        <div class="dashboard-mobil-item">
            <div class="dashboard-mobil-meta">
                <span class="dashboard-mobil-dot" style="background-color: ${PIE_COLORS[index % PIE_COLORS.length]}"></span>
                <div>
                    <p class="dashboard-mobil-code">${escapeHtml(item.kode_mobil)}</p>
                    <p class="dashboard-mobil-trips">${formatNumber(item.total_trips)} trip</p>
                </div>
            </div>
            <p class="dashboard-mobil-value">${formatCurrency(item.total_uang_bersih)}</p>
        </div>
    `).join('');
}

function renderMobilChart(data) {
    const canvas = document.getElementById('dashboard-mobil-chart');
    const content = document.getElementById('dashboard-mobil-content');
    const empty = document.getElementById('dashboard-mobil-empty');
    const list = document.getElementById('dashboard-mobil-list');
    const hasData = Array.isArray(data) && data.length > 0;

    destroyChart(state.mobilChart);

    if (content) {
        content.hidden = !hasData;
    }

    if (empty) {
        empty.hidden = hasData;
    }

    if (hasData) {
        renderMobilList(data);
    } else if (list) {
        list.innerHTML = '';
    }

    if (!canvas || !window.Chart || !hasData) {
        state.mobilChart = null;
        return;
    }

    state.mobilChart = new window.Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: data.map((item) => item.kode_mobil),
            datasets: [{
                data: data.map((item) => item.total_uang_bersih),
                backgroundColor: data.map((_, index) => PIE_COLORS[index % PIE_COLORS.length]),
                borderColor: '#ffffff',
                borderWidth: 6,
                hoverOffset: 6,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '58%',
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    ...tooltipBase(),
                    callbacks: {
                        label(context) {
                            return `${context.label}: ${formatCurrency(context.parsed)}`;
                        },
                    },
                },
            },
        },
    });
}

function renderDashboard(payload) {
    Object.entries(payload.stats || {}).forEach(([key, value]) => setStat(key, value));
    renderRevenueChart(payload.revenueData || []);
    renderPassengerChart(payload.revenueData || []);
    renderMobilChart(payload.mobilRevenue || []);
}

async function fetchDashboardPayload() {
    const [stats, revenueData, mobilRevenue] = await Promise.all([
        apiRequest('/statistics/dashboard'),
        apiRequest('/statistics/revenue-chart'),
        apiRequest('/statistics/mobil-revenue'),
    ]);

    return {
        stats,
        revenueData,
        mobilRevenue,
    };
}

function togglePageLoading(busy) {
    const loading = document.querySelector('[data-dashboard-loading]');
    const content = document.querySelector('[data-dashboard-content]');
    const refreshButton = document.getElementById('dashboard-refresh-btn');

    if (loading) {
        loading.hidden = !busy;
    }

    if (content) {
        content.hidden = busy;
    }

    if (refreshButton) {
        refreshButton.disabled = busy;
    }
}

export default async function initDashboardPage() {
    const refreshButton = document.getElementById('dashboard-refresh-btn');

    if (!refreshButton) {
        return;
    }

    renderDashboard(parseInitialState());

    refreshButton.addEventListener('click', async () => {
        togglePageLoading(true);

        try {
            renderDashboard(await fetchDashboardPayload());
        } catch (error) {
            toastError('Silakan coba lagi', 'Gagal memuat data');
        } finally {
            togglePageLoading(false);
        }
    });
}
