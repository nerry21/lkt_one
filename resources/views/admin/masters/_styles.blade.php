<style>
    .admin-master-page {
        display: grid;
        gap: 24px;
    }

    .admin-master-header,
    .admin-master-form-actions,
    .admin-master-actions {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
    }

    .admin-master-header,
    .admin-master-form-actions {
        justify-content: space-between;
    }

    .admin-master-page h1,
    .admin-master-page h2,
    .admin-master-page h3 {
        margin: 0;
        color: #0f172a;
        font-family: 'Plus Jakarta Sans', sans-serif;
        letter-spacing: -0.03em;
    }

    .admin-master-page p,
    .admin-master-muted {
        margin: 0;
        color: #64748b;
        line-height: 1.65;
    }

    .admin-master-panel {
        border-radius: 28px;
        border: 1px solid rgba(148, 163, 184, 0.16);
        background: rgba(255, 255, 255, 0.96);
        box-shadow: 0 24px 60px rgba(148, 163, 184, 0.14);
    }

    .admin-master-panel-body {
        padding: 24px;
    }

    .admin-master-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 46px;
        padding: 0 16px;
        border-radius: 999px;
        border: 1px solid transparent;
        background: #fff;
        color: #0f172a;
        font-weight: 700;
        transition: transform 0.18s ease, box-shadow 0.18s ease;
    }

    .admin-master-button:hover {
        transform: translateY(-1px);
    }

    .admin-master-button--primary {
        background: linear-gradient(135deg, #0f766e, #14b8a6);
        color: #ecfeff;
    }

    .admin-master-button--danger {
        border-color: rgba(244, 63, 94, 0.2);
        color: #be123c;
    }

    .admin-master-button--light {
        border-color: rgba(148, 163, 184, 0.2);
    }

    .admin-master-alert {
        padding: 16px 18px;
        border-radius: 20px;
        font-weight: 600;
    }

    .admin-master-alert--success {
        background: rgba(16, 185, 129, 0.12);
        border: 1px solid rgba(16, 185, 129, 0.16);
        color: #047857;
    }

    .admin-master-alert--error {
        background: rgba(244, 63, 94, 0.1);
        border: 1px solid rgba(244, 63, 94, 0.16);
        color: #be123c;
    }

    .admin-master-table-wrap {
        overflow-x: auto;
    }

    .admin-master-table {
        width: 100%;
        min-width: 760px;
        border-collapse: collapse;
    }

    .admin-master-table thead tr {
        background: #f8fafc;
    }

    .admin-master-table th,
    .admin-master-table td {
        padding: 16px 18px;
        text-align: left;
        border-top: 1px solid rgba(226, 232, 240, 0.92);
        vertical-align: middle;
    }

    .admin-master-table th {
        color: #64748b;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
    }

    .admin-master-empty {
        color: #64748b;
        text-align: center;
    }

    .admin-master-grid {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        gap: 18px;
    }

    .admin-master-col-12 { grid-column: span 12; }
    .admin-master-col-6 { grid-column: span 6; }

    .admin-master-field {
        display: grid;
        gap: 8px;
    }

    .admin-master-field label {
        color: #334155;
        font-size: 0.92rem;
        font-weight: 700;
    }

    .admin-master-input,
    .admin-master-select {
        width: 100%;
        min-height: 52px;
        padding: 0 16px;
        border-radius: 18px;
        border: 1px solid rgba(148, 163, 184, 0.2);
        background: #f8fafc;
        color: #0f172a;
        outline: none;
    }

    .admin-master-input:focus,
    .admin-master-select:focus {
        border-color: rgba(20, 184, 166, 0.45);
        box-shadow: 0 0 0 4px rgba(20, 184, 166, 0.1);
    }

    .admin-master-pill {
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

    @media (max-width: 960px) {
        .admin-master-grid {
            grid-template-columns: 1fr;
        }

        .admin-master-col-12,
        .admin-master-col-6 {
            grid-column: span 1;
        }
    }

    @media (max-width: 720px) {
        .admin-master-panel-body {
            padding: 20px;
        }

        .admin-master-header,
        .admin-master-actions,
        .admin-master-form-actions {
            align-items: stretch;
        }

        .admin-master-button {
            width: 100%;
        }
    }
</style>
