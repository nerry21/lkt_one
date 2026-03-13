@extends('layouts.base')

@section('body')
    <div class="booking-shell">
        <div class="booking-frame">
            <header class="booking-banner">
                <div class="booking-banner-copy">
                    <span class="booking-kicker">Lancang Kuning Travelindo</span>
                    <h1>@yield('page_title', 'Booking Reguler')</h1>
                    <p>@yield('page_subtitle', 'Atur perjalanan reguler, cek kursi, dan kirim pembayaran dari satu alur yang sama.')</p>
                </div>

                <div class="booking-banner-actions">
                    <a class="booking-button booking-button--ghost" href="{{ route('booking.reguler') }}">
                        Booking Reguler
                    </a>

                    <a class="booking-button booking-button--secondary" href="{{ url('/') }}">
                        Dashboard
                    </a>
                </div>
            </header>

            <main class="booking-main">
                @yield('content')
            </main>
        </div>
    </div>

    <style>
        .booking-shell {
            min-height: 100vh;
            padding: 32px 20px 48px;
        }

        .booking-frame {
            width: min(1180px, 100%);
            margin: 0 auto;
            display: grid;
            gap: 24px;
        }

        .booking-banner {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            gap: 24px;
            padding: 32px;
            border-radius: 32px;
            background:
                radial-gradient(circle at top left, rgba(52, 211, 153, 0.18), transparent 32%),
                linear-gradient(135deg, rgba(4, 42, 34, 0.96), rgba(2, 23, 19, 0.98));
            border: 1px solid rgba(110, 231, 183, 0.16);
            box-shadow: 0 28px 80px rgba(2, 18, 14, 0.28);
        }

        .booking-banner-copy h1 {
            margin: 10px 0 12px;
            color: #f0fdf4;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-size: clamp(2rem, 5vw, 3.4rem);
            line-height: 1.05;
            letter-spacing: -0.04em;
        }

        .booking-banner-copy p {
            max-width: 640px;
            margin: 0;
            color: rgba(236, 253, 245, 0.82);
            line-height: 1.75;
        }

        .booking-kicker {
            display: inline-flex;
            align-items: center;
            padding: 7px 12px;
            border-radius: 999px;
            background: rgba(16, 185, 129, 0.14);
            color: #86efac;
            font-size: 0.78rem;
            font-weight: 800;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        .booking-banner-actions {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
        }

        .booking-main {
            display: grid;
            gap: 24px;
        }

        .booking-card {
            border-radius: 28px;
            background: rgba(255, 255, 255, 0.96);
            border: 1px solid rgba(16, 185, 129, 0.14);
            box-shadow: 0 26px 70px rgba(15, 23, 42, 0.08);
        }

        .booking-card-body {
            padding: 28px;
        }

        .booking-card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            margin-bottom: 24px;
        }

        .booking-card-header h2,
        .booking-card-header h3,
        .booking-section-title,
        .booking-summary-title {
            margin: 0;
            color: #052e2b;
            font-family: 'Plus Jakarta Sans', sans-serif;
            letter-spacing: -0.03em;
        }

        .booking-card-header p,
        .booking-section-subtitle,
        .booking-muted {
            margin: 0;
            color: #64748b;
            line-height: 1.65;
        }

        .booking-grid {
            display: grid;
            grid-template-columns: repeat(12, minmax(0, 1fr));
            gap: 18px;
        }

        .booking-col-12 { grid-column: span 12; }
        .booking-col-8 { grid-column: span 8; }
        .booking-col-7 { grid-column: span 7; }
        .booking-col-6 { grid-column: span 6; }
        .booking-col-5 { grid-column: span 5; }
        .booking-col-4 { grid-column: span 4; }
        .booking-col-3 { grid-column: span 3; }
        .booking-col-2 { grid-column: span 2; }

        .booking-field {
            display: grid;
            gap: 8px;
        }

        .booking-field label {
            color: #0f172a;
            font-size: 0.92rem;
            font-weight: 700;
        }

        .booking-input,
        .booking-select,
        .booking-textarea {
            width: 100%;
            min-height: 52px;
            padding: 0 16px;
            border-radius: 18px;
            border: 1px solid rgba(148, 163, 184, 0.2);
            background: #f8fffc;
            color: #052e2b;
            outline: none;
            transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
        }

        .booking-textarea {
            min-height: 120px;
            padding: 14px 16px;
            resize: vertical;
        }

        .booking-input:focus,
        .booking-select:focus,
        .booking-textarea:focus {
            border-color: rgba(16, 185, 129, 0.42);
            box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
            transform: translateY(-1px);
        }

        .booking-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            min-height: 48px;
            padding: 0 18px;
            border-radius: 999px;
            border: 1px solid transparent;
            font-weight: 700;
            transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
        }

        .booking-button:hover {
            transform: translateY(-1px);
        }

        .booking-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .booking-button--primary {
            background: linear-gradient(135deg, #059669, #10b981);
            color: #ecfdf5;
            box-shadow: 0 18px 30px rgba(16, 185, 129, 0.2);
        }

        .booking-button--secondary {
            background: rgba(255, 255, 255, 0.08);
            color: #ecfdf5;
            border-color: rgba(167, 243, 208, 0.18);
        }

        .booking-button--ghost {
            background: #ffffff;
            color: #065f46;
            border-color: rgba(16, 185, 129, 0.16);
        }

        .booking-button--light {
            background: #f8fafc;
            color: #0f172a;
            border-color: rgba(148, 163, 184, 0.2);
        }

        .booking-alert {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 14px;
            padding: 16px 18px;
            border-radius: 20px;
            border: 1px solid transparent;
            margin-bottom: 18px;
        }

        .booking-alert p {
            margin: 0;
            line-height: 1.65;
        }

        .booking-alert--success {
            background: rgba(16, 185, 129, 0.12);
            border-color: rgba(16, 185, 129, 0.16);
            color: #065f46;
        }

        .booking-alert--warning {
            background: rgba(245, 158, 11, 0.12);
            border-color: rgba(245, 158, 11, 0.22);
            color: #92400e;
        }

        .booking-alert--danger {
            background: rgba(244, 63, 94, 0.1);
            border-color: rgba(244, 63, 94, 0.16);
            color: #be123c;
        }

        .booking-pill {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 36px;
            padding: 0 14px;
            border-radius: 999px;
            background: rgba(16, 185, 129, 0.12);
            color: #047857;
            font-weight: 800;
            font-size: 0.84rem;
        }

        .booking-seat-grid {
            display: grid;
            grid-template-columns: repeat(6, minmax(0, 1fr));
            gap: 14px;
        }

        .booking-seat-card {
            display: grid;
            gap: 6px;
            padding: 16px 12px;
            border-radius: 20px;
            border: 1px solid rgba(148, 163, 184, 0.2);
            background: #ffffff;
            color: #0f172a;
            text-align: center;
            transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease, background 0.18s ease;
        }

        .booking-seat-card:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 18px 30px rgba(15, 23, 42, 0.08);
        }

        .booking-seat-card span:first-child {
            color: #94a3b8;
            font-size: 0.74rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }

        .booking-seat-card strong {
            font-size: 1.24rem;
            font-family: 'JetBrains Mono', monospace;
        }

        .booking-seat-card small {
            color: #64748b;
        }

        .booking-seat-card.is-selected {
            background: linear-gradient(135deg, #047857, #10b981);
            border-color: rgba(5, 150, 105, 0.8);
            color: #ecfdf5;
        }

        .booking-seat-card.is-selected span:first-child,
        .booking-seat-card.is-selected small {
            color: rgba(236, 253, 245, 0.82);
        }

        .booking-seat-card.is-booked {
            background: rgba(248, 113, 113, 0.1);
            border-color: rgba(248, 113, 113, 0.24);
            color: #991b1b;
            cursor: not-allowed;
        }

        .booking-seat-card.is-booked span:first-child,
        .booking-seat-card.is-booked small {
            color: #b91c1c;
        }

        .booking-seat-legend {
            display: flex;
            align-items: center;
            gap: 14px;
            flex-wrap: wrap;
            margin-top: 16px;
            color: #64748b;
            font-size: 0.88rem;
        }

        .booking-seat-legend-item {
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .booking-seat-legend-swatch {
            width: 14px;
            height: 14px;
            border-radius: 999px;
            border: 1px solid rgba(148, 163, 184, 0.2);
            background: #ffffff;
        }

        .booking-seat-legend-swatch.is-selected {
            background: #059669;
            border-color: #059669;
        }

        .booking-seat-legend-swatch.is-booked {
            background: rgba(248, 113, 113, 0.22);
            border-color: rgba(248, 113, 113, 0.32);
        }

        .booking-quote-card,
        .booking-summary-card,
        .booking-info-card,
        .booking-passenger-card {
            display: grid;
            gap: 16px;
            padding: 20px;
            border-radius: 24px;
            background: linear-gradient(180deg, #ffffff, #f8fffc);
            border: 1px solid rgba(16, 185, 129, 0.12);
        }

        .booking-summary-card {
            position: sticky;
            top: 24px;
        }

        .booking-stat-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
        }

        .booking-stat-card {
            padding: 16px;
            border-radius: 20px;
            background: #ffffff;
            border: 1px solid rgba(148, 163, 184, 0.16);
        }

        .booking-stat-card span {
            display: block;
            margin-bottom: 6px;
            color: #64748b;
            font-size: 0.84rem;
        }

        .booking-stat-card strong {
            color: #052e2b;
            font-size: 1.05rem;
            font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .booking-summary-list,
        .booking-detail-list {
            display: grid;
            gap: 14px;
        }

        .booking-summary-row,
        .booking-detail-item,
        .booking-passenger-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
        }

        .booking-summary-row span,
        .booking-detail-item span {
            color: #64748b;
        }

        .booking-summary-row strong,
        .booking-detail-item strong,
        .booking-money {
            color: #052e2b;
            font-family: 'Plus Jakarta Sans', sans-serif;
            font-weight: 800;
        }

        .booking-money {
            color: #047857;
        }

        .booking-divider {
            height: 1px;
            background: rgba(148, 163, 184, 0.18);
        }

        .booking-passenger-stack {
            display: grid;
            gap: 16px;
        }

        .booking-passenger-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
        }

        .booking-table-wrap {
            overflow-x: auto;
        }

        .booking-table {
            width: 100%;
            min-width: 680px;
            border-collapse: collapse;
        }

        .booking-table thead tr {
            background: rgba(248, 250, 252, 0.96);
        }

        .booking-table th,
        .booking-table td {
            padding: 14px 16px;
            text-align: left;
            border-top: 1px solid rgba(148, 163, 184, 0.16);
            color: #0f172a;
        }

        .booking-table th {
            color: #64748b;
            font-size: 0.8rem;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }

        .booking-table tbody tr:hover {
            background: rgba(248, 250, 252, 0.72);
        }

        .booking-actions {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            flex-wrap: wrap;
        }

        .booking-note {
            padding: 16px 18px;
            border-radius: 20px;
            background: rgba(245, 158, 11, 0.1);
            border: 1px solid rgba(245, 158, 11, 0.18);
            color: #92400e;
            line-height: 1.7;
            white-space: pre-line;
        }

        .booking-empty {
            padding: 16px 18px;
            border-radius: 20px;
            background: #f8fafc;
            color: #64748b;
            border: 1px dashed rgba(148, 163, 184, 0.28);
        }

        @media (max-width: 1080px) {
            .booking-grid {
                grid-template-columns: 1fr;
            }

            .booking-col-8,
            .booking-col-7,
            .booking-col-6,
            .booking-col-5,
            .booking-col-4,
            .booking-col-3,
            .booking-col-2 {
                grid-column: span 1;
            }

            .booking-summary-card {
                position: static;
            }
        }

        @media (max-width: 860px) {
            .booking-banner {
                flex-direction: column;
                align-items: flex-start;
            }

            .booking-seat-grid,
            .booking-stat-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media (max-width: 640px) {
            .booking-shell {
                padding: 18px 12px 28px;
            }

            .booking-banner,
            .booking-card-body {
                padding: 20px;
            }

            .booking-banner-actions,
            .booking-actions {
                width: 100%;
            }

            .booking-button,
            .booking-banner-actions .booking-button {
                width: 100%;
            }

            .booking-seat-grid,
            .booking-stat-grid {
                grid-template-columns: 1fr;
            }

            .booking-card-header,
            .booking-passenger-header,
            .booking-passenger-row,
            .booking-summary-row,
            .booking-detail-item {
                flex-direction: column;
                align-items: flex-start;
            }
        }
    </style>

    @stack('scripts')
@endsection
