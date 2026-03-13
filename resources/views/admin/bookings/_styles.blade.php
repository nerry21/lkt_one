<style>
    .admin-booking-page {
        display: grid;
        gap: 24px;
    }

    .admin-booking-header,
    .admin-booking-header-actions,
    .admin-booking-filter-row,
    .admin-booking-table-meta,
    .admin-booking-summary-row,
    .admin-booking-detail-row,
    .admin-booking-action-row,
    .admin-booking-ticket-row {
        display: flex;
        align-items: center;
    }

    .admin-booking-header,
    .admin-booking-ticket-row {
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
    }

    .admin-booking-page h1,
    .admin-booking-page h2,
    .admin-booking-page h3,
    .admin-booking-page h4 {
        margin: 0;
        color: #0f172a;
        font-family: 'Plus Jakarta Sans', sans-serif;
        letter-spacing: -0.03em;
    }

    .admin-booking-header p,
    .admin-booking-muted,
    .admin-booking-empty,
    .admin-booking-proof-note {
        margin: 0;
        color: #64748b;
        line-height: 1.65;
    }

    .admin-booking-panel {
        border-radius: 28px;
        border: 1px solid rgba(148, 163, 184, 0.16);
        background: rgba(255, 255, 255, 0.96);
        box-shadow: 0 24px 60px rgba(148, 163, 184, 0.14);
    }

    .admin-booking-panel-body {
        padding: 24px;
    }

    .admin-booking-filter-row,
    .admin-booking-header-actions,
    .admin-booking-action-row {
        gap: 12px;
        flex-wrap: wrap;
    }

    .admin-booking-chip,
    .admin-booking-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 44px;
        padding: 0 16px;
        border-radius: 999px;
        border: 1px solid transparent;
        font-weight: 700;
        transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.18s ease;
    }

    .admin-booking-chip:hover,
    .admin-booking-button:hover {
        transform: translateY(-1px);
    }

    .admin-booking-chip {
        background: #ffffff;
        color: #0f172a;
        border-color: rgba(148, 163, 184, 0.2);
    }

    .admin-booking-chip.is-active {
        background: linear-gradient(135deg, #0f766e, #14b8a6);
        color: #ecfeff;
        box-shadow: 0 18px 30px rgba(20, 184, 166, 0.18);
    }

    .admin-booking-button--primary {
        background: linear-gradient(135deg, #0f766e, #14b8a6);
        color: #ecfeff;
    }

    .admin-booking-button--success {
        background: linear-gradient(135deg, #047857, #10b981);
        color: #ecfdf5;
    }

    .admin-booking-button--danger {
        background: linear-gradient(135deg, #be123c, #f43f5e);
        color: #fff1f2;
    }

    .admin-booking-button--light {
        background: #ffffff;
        color: #0f172a;
        border-color: rgba(148, 163, 184, 0.2);
    }

    .admin-booking-grid {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        gap: 18px;
    }

    .admin-booking-col-8 { grid-column: span 8; }
    .admin-booking-col-6 { grid-column: span 6; }
    .admin-booking-col-4 { grid-column: span 4; }
    .admin-booking-col-3 { grid-column: span 3; }
    .admin-booking-col-12 { grid-column: span 12; }

    .admin-booking-card {
        padding: 18px;
        border-radius: 22px;
        background: #f8fafc;
        border: 1px solid rgba(148, 163, 184, 0.18);
    }

    .admin-booking-card span {
        display: block;
        margin-bottom: 8px;
        color: #64748b;
        font-size: 0.82rem;
    }

    .admin-booking-card strong,
    .admin-booking-summary-row strong,
    .admin-booking-detail-row strong {
        color: #0f172a;
        font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .admin-booking-table-wrap {
        overflow-x: auto;
    }

    .admin-booking-table {
        width: 100%;
        min-width: 920px;
        border-collapse: collapse;
    }

    .admin-booking-table thead tr {
        background: #f8fafc;
    }

    .admin-booking-table th,
    .admin-booking-table td {
        padding: 16px 18px;
        text-align: left;
        border-top: 1px solid rgba(226, 232, 240, 0.92);
        vertical-align: middle;
    }

    .admin-booking-table th {
        color: #64748b;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
    }

    .admin-booking-table tbody tr:hover {
        background: rgba(248, 250, 252, 0.72);
    }

    .admin-booking-pill {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 34px;
        padding: 0 12px;
        border-radius: 999px;
        font-size: 0.82rem;
        font-weight: 800;
    }

    .admin-booking-pill--pending {
        background: rgba(245, 158, 11, 0.14);
        color: #b45309;
    }

    .admin-booking-pill--success {
        background: rgba(16, 185, 129, 0.14);
        color: #047857;
    }

    .admin-booking-pill--danger {
        background: rgba(244, 63, 94, 0.12);
        color: #be123c;
    }

    .admin-booking-pill--neutral {
        background: rgba(148, 163, 184, 0.16);
        color: #475569;
    }

    .admin-booking-summary {
        display: grid;
        gap: 14px;
    }

    .admin-booking-summary-row,
    .admin-booking-detail-row {
        justify-content: space-between;
        gap: 12px;
    }

    .admin-booking-form {
        display: grid;
        gap: 12px;
    }

    .admin-booking-form textarea {
        width: 100%;
        min-height: 136px;
        padding: 14px 16px;
        border-radius: 18px;
        border: 1px solid rgba(148, 163, 184, 0.18);
        background: #ffffff;
        color: #0f172a;
        resize: vertical;
        outline: none;
    }

    .admin-booking-form textarea:focus {
        border-color: rgba(20, 184, 166, 0.45);
        box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.1);
    }

    .admin-booking-proof-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 42px;
        padding: 0 16px;
        border-radius: 999px;
        border: 1px solid rgba(20, 184, 166, 0.18);
        background: rgba(20, 184, 166, 0.08);
        color: #0f766e;
        font-weight: 700;
    }

    .admin-booking-note {
        margin: 0;
        padding: 16px;
        border-radius: 18px;
        background: #f8fafc;
        border: 1px solid rgba(148, 163, 184, 0.16);
        color: #334155;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.88rem;
        line-height: 1.75;
        white-space: pre-wrap;
    }

    .admin-booking-alert {
        padding: 16px 18px;
        border-radius: 20px;
        font-weight: 600;
    }

    .admin-booking-alert--success {
        background: rgba(16, 185, 129, 0.12);
        border: 1px solid rgba(16, 185, 129, 0.16);
        color: #047857;
    }

    .admin-booking-alert--error {
        background: rgba(244, 63, 94, 0.1);
        border: 1px solid rgba(244, 63, 94, 0.16);
        color: #be123c;
    }

    @media (max-width: 1100px) {
        .admin-booking-grid {
            grid-template-columns: 1fr;
        }

        .admin-booking-col-8,
        .admin-booking-col-6,
        .admin-booking-col-4,
        .admin-booking-col-3,
        .admin-booking-col-12 {
            grid-column: span 1;
        }
    }

    @media (max-width: 720px) {
        .admin-booking-panel-body {
            padding: 20px;
        }

        .admin-booking-header,
        .admin-booking-summary-row,
        .admin-booking-detail-row,
        .admin-booking-ticket-row {
            flex-direction: column;
            align-items: flex-start;
        }

        .admin-booking-chip,
        .admin-booking-button {
            width: 100%;
        }
    }
</style>
