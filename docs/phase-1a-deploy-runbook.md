# Fase 1A Production Deploy Runbook

**Target environment:** Hostinger shared hosting  
**Production DB:** `u957356351_lkt_database`  
**Production baseline:** `2026_03_19_090912_add_return_trip_time_to_bookings` (batch 19)  
**Deploy delta:** 3 migrations (batch 20)  
**Deploy window:** Weeknight 21:00-23:00 WIB, Senin-Rabu (off-peak, buffer sampai pagi)  
**Estimated duration:** 20-40 menit total  
**Rollback capability:** 2/3 migrations full reversible, 1 (bug #35) no-op down  
**Test baseline pre-deploy:** 119 passed / 0 failed (596 assertions) — clean

---

## Pre-Deploy Prerequisites Checklist

Sebelum deploy dimulai, verify semua ini sudah siap:

- [ ] SQL backup manual sudah dilakukan via phpMyAdmin Export (file `.sql` tersimpan di komputer Nerry)
- [ ] Hostinger automated backup schedule + retention confirmed (fallback safety)
- [ ] Stakeholder notice sudah dikirim kalau diperlukan (lihat `docs/phase-1a-stakeholder-summary.md`)
- [ ] Deploy window scheduled: Weeknight 21:00-23:00 WIB, weekday (Senin/Selasa/Rabu)
- [ ] Main branch sudah merged dari `feat/phase-1a-seat-locking` (post-merge state)
- [ ] Local test suite baseline 119 passed / 0 failed confirmed
- [ ] Hostinger cPanel access confirmed (login works)
- [ ] FTP credentials ready (host, user, password untuk file upload)

## Deploy Sequence (10 Steps)

### Step 1 — Pre-Deploy Backup (5 min)

**Via phpMyAdmin:**
1. Login Hostinger cPanel → phpMyAdmin
2. Pilih DB `u957356351_lkt_database` (sidebar kiri)
3. Tab **Export** → Method: **Quick**, Format: **SQL**
4. Klik **Go** → browser download file `.sql`
5. Rename: `lkt_production_backup_YYYY-MM-DD_pre-fase-1a.sql`
6. Simpan di folder aman lokal (e.g., `~/Documents/lkt-backups/`)

**Verify backup:** File size > 500 KB, file opens in text editor, contains `CREATE TABLE bookings`.

**Safety net:** Kalau deploy gagal parah, restore file ini via phpMyAdmin Import.

### Step 2 — Duplicate Row Audit (Bug #13 Pre-Migrate Check) (5 min)

Via phpMyAdmin SQL tab, run 3 queries untuk verify UNIQUE constraint eligibility:

- `SELECT invoice_number, COUNT(*) AS cnt FROM bookings WHERE invoice_number IS NOT NULL AND invoice_number != '' GROUP BY invoice_number HAVING cnt > 1;`
- `SELECT ticket_number, COUNT(*) AS cnt FROM bookings WHERE ticket_number IS NOT NULL AND ticket_number != '' GROUP BY ticket_number HAVING cnt > 1;`
- `SELECT qr_token, COUNT(*) AS cnt FROM bookings WHERE qr_token IS NOT NULL AND qr_token != '' GROUP BY qr_token HAVING cnt > 1;`

**Expected:** Zero rows. UNIQUE migration eligible.

**Kalau ada duplicates:** STOP deploy. Dedupe manual via UPDATE before proceeding. Re-run audit queries sampai zero.

### Step 3 — Existing 'Lunas' Rows Preview (Bug #35 Data Migration) (2 min)

- `SELECT COUNT(*) AS lunas_count FROM bookings WHERE payment_status = 'Lunas';`
- `SELECT COUNT(*) AS dibayar_count FROM bookings WHERE payment_status = 'Dibayar';`

**Expected:** N 'Lunas' rows (kemungkinan > 0 — legacy admin transfers). Migration akan convert semuanya ke 'Dibayar'.

Note count untuk post-deploy verification.

### Step 4 — Code Deploy via FTP/cPanel File Manager (10 min)

1. Pastikan local `main` sudah merged dari `feat/phase-1a-seat-locking`
2. Identify target path di Hostinger (typically `public_html/` atau `public_html/lkt_one/`)
3. Upload files yang berubah:
   - `app/` directory (controllers, services, models, exceptions)
   - `database/migrations/` (3 new migration files)
   - `resources/views/` (blade changes)
   - `docs/` (optional)

**Quick approach:** Zip entire project local, upload via cPanel File Manager, extract. **JANGAN overwrite `.env` production** (berisi DB credentials).

**Verify post-upload:** Timestamps match, `.env` intact, `vendor/` folder present.

### Step 5 — Run Migrations (5 min)

**Opsi A — SSH:** `ssh user@domain.hostinger.com`, `cd path/to/lkt_one`, `php artisan migrate --force`

**Opsi B — cPanel Terminal:** cPanel → Advanced → Terminal, navigate ke project path, `php artisan migrate --force`

**Opsi C — Last resort:** Manual SQL via phpMyAdmin. NOT RECOMMENDED (de-syncs Laravel migration state).

**Expected:** 3 migrations run in order, all batch 20:
- create_booking_seats_table
- migrate_lunas_payment_status_to_dibayar
- add_unique_to_booking_identifiers

Kalau error, STOP + investigate.

### Step 6 — Verify Migration State (2 min)

- `php artisan migrate:status | tail -10` — expect 3 migrations ran, batch 20
- Alternative via phpMyAdmin: `SELECT migration, batch FROM migrations ORDER BY id DESC LIMIT 5;`

### Step 7 — Clear Laravel Cache (1 min)

Run sequence:
- `php artisan config:clear`
- `php artisan cache:clear`
- `php artisan view:clear`
- `php artisan route:clear`

Atau `php artisan optimize:clear` (single comprehensive).

Atau manual: delete `bootstrap/cache/*.php` via cPanel File Manager.

### Step 8 — Smoke Test Production (10 min)

**Critical user flows:**

1. Admin login → akses dashboard. Expect: no 500 error.
2. Admin booking management page (`/dashboard/bookings`) → browse list. Expect: 117 bookings visible.
3. Booking detail page → pilih 1 booking random. Expect: badge render termasuk 'Dibayar'.
4. Wizard regular booking create flow → new booking end-to-end. Expect: seat soft-lock fires, dropdown tidak lagi tampilkan 'Lunas'.
5. Admin validatePayment action='lunas' → pilih booking 'Menunggu Verifikasi'. Expect: payment_status → 'Dibayar' (BUKAN 'Lunas'), seats promote hard.
6. Dashboard paid count (dropping/rental) → verify count increased post-migration.

**Verification SQL queries:**
- `SELECT COUNT(*) FROM bookings WHERE payment_status = 'Lunas';` — expect 0
- `SHOW INDEX FROM bookings WHERE Column_name IN ('invoice_number', 'ticket_number', 'qr_token') AND Non_unique = 0;` — expect 3 rows
- `SHOW TABLES LIKE 'booking_seats';` — expect 1 row
- `SHOW CREATE TABLE booking_seats;` — expect active_slot_key PERSISTENT generated column

### Step 9 — Monitor First-Hour Post-Deploy (passive, ~1 hour)

- Cek `storage/logs/laravel.log` untuk exception unusual
- WhatsApp chatbot status (shared DB — monitor degradation)
- Bu Bos / Admin Zizi awareness kalau ada komplain customer

### Step 10 — Post-Deploy Documentation Update

Update `docs/audit-findings.md`:
- Deploy date + time actual
- Row count transitions (Lunas → Dibayar count observed)
- Issue encountered
- Sign-off: "Fase 1A deployed to production on YYYY-MM-DD HH:MM WIB"

---

## Rollback Plan

### Skenario 1: Migration fails mid-sequence

1. Laravel migrator STOP di migration yang fail
2. Previous migrations tetap applied
3. Fix: dedupe manual, then `php artisan migrate --force` resume
4. Fatal: `php artisan migrate:rollback --step=N`

### Skenario 2: 500 error site-wide post-code-deploy

1. Quick rollback: restore previous version files via FTP
2. `php artisan migrate:rollback --step=3` untuk undo 3 migrations
3. **Caveat bug #35 no-op down:** 'Lunas' rows yang sudah converted ke 'Dibayar' tidak auto-revert
4. Lebih aman: restore full DB dari SQL backup Step 1

### Skenario 3: Fatal data corruption

1. STOP production traffic (maintenance mode)
2. Restore full DB dari `lkt_production_backup_YYYY-MM-DD_pre-fase-1a.sql`
3. Revert code via FTP
4. Verify restoration, resume traffic
5. Post-mortem

### Skenario 4: Minor issue (most common)

- Cache clear sequence (Step 7)
- `php artisan optimize:clear` comprehensive
- Restart PHP-FPM kalau akses (unlikely shared hosting)

---

## Production Coordination

- **Primary deployer:** Nerry
- **Super admin:** Nerry, Bu Nos
- **Primary admin:** Bu Bos
- **Secondary admin:** Admin Zizi
- **Hostinger support:** cPanel → Help / Live Chat

## Appendix: Commands Reference

- `php artisan migrate:status`
- `php artisan migrate --force`
- `php artisan migrate:rollback --force`
- `php artisan migrate:rollback --step=3 --force`
- `php artisan optimize:clear`
- `tail -f storage/logs/laravel.log`

---

## Sign-off Template

Deploy executed: YYYY-MM-DD HH:MM WIB
Deployed by: Nerry
Pre-deploy bookings count: 117
Post-deploy bookings count: [fill-in]
Lunas → Dibayar conversion: [N rows]
Issues encountered: [list or "none"]
Rollback invoked: [YES/NO]
Final status: [SUCCESS / PARTIAL / FAILED]
