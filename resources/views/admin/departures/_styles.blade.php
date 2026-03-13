<style>
    .admin-departure-page {
        display: grid;
        gap: 24px;
    }

    .admin-departure-header,
    .admin-departure-actions,
    .admin-departure-summary-row {
        display: flex;
        align-items: center;
    }

    .admin-departure-header,
    .admin-departure-summary-row {
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
    }

    .admin-departure-page h1,
    .admin-departure-page h2,
    .admin-departure-page h3,
    .admin-departure-page h4 {
        margin: 0;
        color: #0f172a;
        font-family: 'Plus Jakarta Sans', sans-serif;
        letter-spacing: -0.03em;
    }

    .admin-departure-page p,
    .admin-departure-muted {
        margin: 0;
        color: #64748b;
        line-height: 1.65;
    }

    .admin-departure-panel {
        border-radius: 28px;
        border: 1px solid rgba(148, 163, 184, 0.16);
        background: rgba(255, 255, 255, 0.96);
        box-shadow: 0 24px 60px rgba(148, 163, 184, 0.14);
    }

    .admin-departure-panel-body {
        padding: 24px;
    }

    .admin-departure-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 46px;
        padding: 0 16px;
        border-radius: 999px;
        border: 1px solid transparent;
        font-weight: 700;
        transition: transform 0.18s ease, box-shadow 0.18s ease;
    }

    .admin-departure-button:hover {
        transform: translateY(-1px);
    }

    .admin-departure-button--primary {
        background: linear-gradient(135deg, #0f766e, #14b8a6);
        color: #ecfeff;
    }

    .admin-departure-button--success {
        background: linear-gradient(135deg, #047857, #10b981);
        color: #ecfdf5;
    }

    .admin-departure-button--light {
        background: #ffffff;
        color: #0f172a;
        border-color: rgba(148, 163, 184, 0.2);
    }

    .admin-departure-button--danger {
        background: #ffffff;
        color: #be123c;
        border-color: rgba(244, 63, 94, 0.2);
    }

    .admin-departure-grid {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        gap: 18px;
    }

    .admin-departure-col-12 { grid-column: span 12; }
    .admin-departure-col-9 { grid-column: span 9; }
    .admin-departure-col-8 { grid-column: span 8; }
    .admin-departure-col-6 { grid-column: span 6; }
    .admin-departure-col-4 { grid-column: span 4; }
    .admin-departure-col-3 { grid-column: span 3; }

    .admin-departure-card {
        padding: 18px;
        border-radius: 22px;
        background: #f8fafc;
        border: 1px solid rgba(148, 163, 184, 0.18);
    }

    .admin-departure-card span {
        display: block;
        margin-bottom: 8px;
        color: #64748b;
        font-size: 0.82rem;
    }

    .admin-departure-card strong {
        color: #0f172a;
        font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .admin-departure-table-wrap {
        overflow-x: auto;
    }

    .admin-departure-table {
        width: 100%;
        min-width: 860px;
        border-collapse: collapse;
    }

    .admin-departure-table thead tr {
        background: #f8fafc;
    }

    .admin-departure-table th,
    .admin-departure-table td {
        padding: 16px 18px;
        text-align: left;
        border-top: 1px solid rgba(226, 232, 240, 0.92);
        vertical-align: middle;
    }

    .admin-departure-table th {
        color: #64748b;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
    }

    .admin-departure-form {
        display: grid;
        gap: 18px;
    }

    .admin-departure-field {
        display: grid;
        gap: 8px;
    }

    .admin-departure-field label {
        color: #334155;
        font-size: 0.92rem;
        font-weight: 700;
    }

    .admin-departure-input,
    .admin-departure-select,
    .admin-departure-textarea {
        width: 100%;
        min-height: 52px;
        padding: 0 16px;
        border-radius: 18px;
        border: 1px solid rgba(148, 163, 184, 0.2);
        background: #f8fafc;
        color: #0f172a;
        outline: none;
    }

    .admin-departure-textarea {
        min-height: 120px;
        padding: 14px 16px;
        resize: vertical;
    }

    .admin-departure-input:focus,
    .admin-departure-select:focus,
    .admin-departure-textarea:focus {
        border-color: rgba(20, 184, 166, 0.45);
        box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.1);
    }

    .admin-departure-alert {
        padding: 16px 18px;
        border-radius: 20px;
        font-weight: 600;
    }

    .admin-departure-alert--success {
        background: rgba(16, 185, 129, 0.12);
        border: 1px solid rgba(16, 185, 129, 0.16);
        color: #047857;
    }

    .admin-departure-alert--error {
        background: rgba(244, 63, 94, 0.1);
        border: 1px solid rgba(244, 63, 94, 0.16);
        color: #be123c;
    }

    .admin-departure-empty {
        color: #64748b;
        text-align: center;
    }

    .admin-departure-pill {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 34px;
        padding: 0 12px;
        border-radius: 999px;
        background: rgba(15, 118, 110, 0.1);
        color: #0f766e;
        font-size: 0.82rem;
        font-weight: 800;
    }

    @media (max-width: 1100px) {
        .admin-departure-grid {
            grid-template-columns: 1fr;
        }

        .admin-departure-col-9,
        .admin-departure-col-8,
        .admin-departure-col-6,
        .admin-departure-col-4,
        .admin-departure-col-3,
        .admin-departure-col-12 {
            grid-column: span 1;
        }
    }

    @media (max-width: 720px) {
        .admin-departure-panel-body {
            padding: 20px;
        }

        .admin-departure-header,
        .admin-departure-summary-row {
            flex-direction: column;
            align-items: flex-start;
        }

        .admin-departure-button {
            width: 100%;
        }
    }
</style>
