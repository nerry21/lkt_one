# Fase 1A — Seat Locking Architecture Summary

**Branch:** `feat/phase-1a-seat-locking`
**Status:** ✅ COMPLETE (post-Section L)
**Total commits:** 56
**Date span:** 2026-03 → 2026-04-18

## Overview

Fase 1A introduced comprehensive seat reservation locking layer untuk LKT One untuk solve race conditions pada concurrent booking scenarios. Foundation: `booking_seats` table with soft/hard lock states, `SeatLockService` orchestration, exception infrastructure (`SeatConflictException`, `SeatLockReleaseNotAllowedException`, `WizardBackEditOnPaidBookingException`), dan integration across all 4 booking categories (Regular, Rental, Package, Dropping).

## Commit Registry

### Foundation (Sections A-E)
- Migration `booking_seats` table + `active_slot_key` PERSISTENT column
- `BookingSeat` model dengan scopes (active, softLocks, hardLocks)
- `SeatLockService` (lockSeats, promoteToHard, releaseSeats, getOccupiedSeats)
- Exception hierarchy (SeatConflictException 409, SeatLockReleaseNotAllowedException 403)
- `BookingSeatSeeder` — seeder skipped (inline test pattern adopted)

### Create Path (Sections F-J)
- 4 persistence services (Regular/Rental/Package/Dropping) `persistDraft` + `lockSeats` soft integration
- Multi-day cartesian seat expansion (RentalBookingPersistenceService)
- Parcel-aware seat logic (PackageBookingPersistenceService)

### Admin + Controller (Section K)
- `36caded` K1: BookingController::quickPackageStore API direct-confirmed hard lock

### Update Path Protection (Section M — Wizard Back-Edit + Hard Lock Guards)
- `812a67d` `080f542` `68eec79` `c127289` M1: BookingManagement admin update/delete hard-lock guard (bug #21 + #29)
- `9b2e551` `2bd10af` `f8a6b3a` `8304651` `d65c085` `9f388e8` M2: Regular wizard back-edit + WizardBackEditOnPaidBookingException infra (bug #22, register #31 + #32)
- `0818f42` `969ab01` `491b709` `5fcd4ef` M3: Rental wizard multi-day + bug #32 retroactive fix (bug #25)
- `02f27ff` `c058085` `c3ce9ab` `6ad8a2a` M4: Package wizard parcel-aware + bug #32 PREVENTIVE 2nd (bug #27)
- `1f400ab` `8986599` `9f799e6` `d7c45eb` M5: Dropping wizard + bug #32 PREVENTIVE 3rd + M4 correction (bug #34)

### Post-M Follow-Up Bugs
- `803ee61` Bug #31: Cross-cutting hard lock activation (4 wizard persistPaymentSelection + BookingController::validatePayment)
- `458eca5` Bug #35: Semantic unification 'Lunas' → 'Dibayar' (admin path aligned to canonical wizard convention)

### Section L (Closeout)
- `f2d230a` Bug #13: UNIQUE constraint migration (invoice_number, ticket_number, qr_token) + 3 regression tests
- Fase 1A summary doc (this file)

## Architecture

### booking_seats Schema Pattern
- `lock_type` enum: 'soft' | 'hard'
- Partial-index strategy via `active_slot_key` PERSISTENT column (Opsi 2 — preserve audit trail, no hard delete)
- CASE WHEN generated column ensures only active locks occupy slot key space

### Exception Hierarchy
- **SeatConflictException (409)** — soft/hard lock collision pada create path
- **SeatLockReleaseNotAllowedException (403)** — attempt release hard-locked seats
- **WizardBackEditOnPaidBookingException (409)** — wizard back-edit on paid booking (4 categories: Regular/Rental/Paket/Dropping)

### Payment Status Convention (Post-Bug-#35)
Canonical Fase 1A convention:
- `Menunggu Pembayaran` — awaiting payment initiation
- `Menunggu Verifikasi` — transfer pending admin verify
- `Dibayar` — paid via transfer (admin-verified) or QRIS
- `Dibayar Tunai` — paid via cash
- `Ditolak` — transfer rejected
- `Belum Bayar` — unpaid, booking draft

Legacy `'Lunas'` retired via bug #35 (admin path aligned ke `'Dibayar'`).

## Test Coverage

Baseline post-merge: **119 passed / 0 failed / 596 assertions**. The 4 pre-existing failing tests (Blade rendering quirks di `BookingManagementPageTest` + `RegularBookingPageTest`, orthogonal ke seat locking) were resolved in commit `527998b` as part of pre-deploy cleanup.

Key test files:
- `SeatLockServiceTest.php` — 16 unit tests foundation
- M-series wizard smoke tests per category:
  - `RegularBookingPersistenceServiceTest.php` — 9 smoke (7 M2 + 2 bug #31)
  - `RentalBookingPersistenceServiceTest.php` — 9 smoke (7 M3 + 2 bug #31)
  - `PackageBookingPersistenceServiceTest.php` — 11 smoke (9 M4 + 2 bug #31)
  - `DroppingBookingPersistenceServiceTest.php` — 8 smoke (6 M5 + 2 bug #31)
- `BookingManagementPageTest.php` — admin-oriented feature tests (+bug #35 regression)
- `BookingUniqueConstraintTest.php` — bug #13 regression (3 tests, Section L)

## Deploy Results

Fase 1A deployed to production on **Saturday 18 April 2026 ~20:15 WIB**. Deploy executed following the 10-step SOP in `phase-1a-deploy-runbook.md`. Zero data loss, zero regression, zero downtime beyond the planned maintenance window (~3-5 minutes).

### Environment

| Layer | Local Dev | Production |
|---|---|---|
| OS | Windows 11 + XAMPP | Hostinger shared hosting (Linux) |
| PHP | 8.2 (CLI) | 8.2 CLI / 8.3 Web (split) |
| DB | MariaDB 10.4 | MariaDB 11.8.6 |
| Database | `hitungan_lkt` | `u957356351_lkt_database` |
| Laravel root | `~/hitungan_lkt` | `~/domains/lkt.company/public_html/lkt_one` |
| Deploy modality | — | `git pull origin main` |

### Timeline

| Time (WIB) | Phase | Detail |
|---|---|---|
| ~18:45 | Phase 0 start | 5-area verification begins |
| ~19:20 | V5 `.env` check | **Found:** `APP_DEBUG=true` (security risk) — fixed to `false`, CRLF→LF normalized |
| ~19:40 | V2 migration | Batch 19 confirmed, 3 pending Fase 1A migrations ready |
| ~19:50 | V3 data audit | 0 duplicates across 3 identifiers (invoice/ticket/qr_token) |
| ~19:55 | V3 side finding | `'Dibayar Tunai'` status found (20 rows) — investigated, legitimate cash-payment status |
| ~20:00 | V4 backup | mysqldump dry-run successful (167K) |
| ~20:15 | D1 | Maintenance mode on (HTTP 503) |
| ~20:16 | D2 | Fresh pre-deploy backup: `predeploy-20260418-131552.sql` |
| ~20:17 | D3 | `git pull`: `0a52544..c2c1b64` fast-forward |
| ~20:20 | D4 | 3 migrations executed, batch 19→20 |
| ~20:22 | D4.3 | Verified: `booking_seats` table present, 5 rows `Lunas`→`Dibayar`, 3 UNIQUE constraints active |
| ~20:23 | D5 | Cache clear (app, config, route, view) |
| ~20:25 | D6 | Maintenance off, site online |
| ~20:26 | D7 | Post-deploy verification: HTTP 302 normal, data intact (117 bookings preserved) |
| ~20:35 | D7.3 | Browser verification: 3 flows successful |

### Migrations Applied (Batch 19 → 20)

1. `2026_04_17_000001_create_booking_seats_table` — creates `booking_seats` with generated `active_slot_key` column
2. `2026_04_18_073028_migrate_lunas_payment_status_to_dibayar` — 5 rows semantically unified
3. `2026_04_18_080009_add_unique_to_booking_identifiers` — 3 UNIQUE constraints (invoice_number, ticket_number, qr_token)

### Incidents (Lessons Learned)

Three minor incidents occurred during deploy, all without data impact:

1. **`APP_DEBUG=true` found at Phase 0** — production was running with debug mode exposed to users. Discovered during verification, fixed to `false` and cache-regenerated before proceeding to D1. **Lesson:** always audit production `.env` in Phase 0.

2. **Accidental `php artisan up` after D1** — operator copied command from a non-actionable "reference/rollback" section of the runbook. Site was briefly un-maintenance. Maintenance mode re-enabled within seconds. **Lesson:** runbook must clearly separate "commands to execute" from "reference examples" to prevent copy-paste errors.

3. **Accidental `mysql < backup.sql` after D2** — operator ran the backup *restore* command on freshly-backed-up data (no-op in effect, same data in/out). Zero harm but risky in principle. **Lesson:** after this, switched to Indonesian language and strict one-command-at-a-time protocol for all remaining steps.

### Post-Deploy Verification Results (18 April 2026 ~23:00 WIB)

Subsequent Phase 0 recon confirmed clean production state:

- `APP_DEBUG=false` at both `.env` and runtime cached config ✅
- `APP_KEY` present ✅
- Log pipeline healthy (stack → single → `storage/logs/laravel.log`, writable, probe confirmed) ✅
- **Zero error log entries between deploy (~20:15) and next-day recon** ✅
- Local test baseline: **119 passed / 0 failed / 596 assertions** ✅
- Git: `main @ c2c1b64`, working tree clean, local and production in sync ✅

### Data Observations (Non-Blocking, Follow-up Required)

- **`bookings.id=1`** — legacy test data (passenger name "doni", pickup "gregergerg", keyboard-mash pattern). Safe-to-delete pending stakeholder confirmation. No identifiers (invoice/ticket/qr_token empty), does not conflict with UNIQUE constraint.
- **`bookings.id=53`** — abandoned Dropping booking by real customer (nofrizal, 085375522611, The Zuri Hotel Pekanbaru). ETK generated but never paid. Retention decision requires stakeholder input.
- **Pricing anomaly in id=53:** `total_amount = 900,000` for 6 passengers × 900k/seat. Either flat-rate pricing model for Dropping category or latent calculation bug. Defer to future investigation.

### Artifacts Retained

- `~/backups/lkt-deploy/predeploy-20260418-131552.sql` (167K) — retain 1-2 weeks for emergency rollback
- `.env.bak.20260418-115426` (in Laravel root) — backup before APP_DEBUG fix
- Feature branch `feat/phase-1a-seat-locking` — kept for audit retention (2-4 weeks)

### Status

**LIVE in production.** Monitoring window active 24-48 hours post-deploy. Expected log events (signs that Fase 1A is working):

- `SeatConflictException` (HTTP 409) — concurrent seat booking collision
- `WizardBackEditOnPaidBookingException` (HTTP 409) — user attempting to back-edit paid booking
- `SeatLockReleaseNotAllowedException` (HTTP 403) — non-owner attempting to release lock
- `SQLSTATE[23000]` — UNIQUE constraint enforcement (rare)

## Known Gaps (Post-Fase-1A)

### Open Bugs
- **bug #28** — `normalizeTripTime` pattern-wide 6 locations (Fase 1B scheduled, trait refactor candidate)
- **bug #30** — booking-level race admin concurrent edit (future, requires optimistic locking or row-level lock strategy)
- **bug #36** — TOCTOU retry handling post-UNIQUE di `generateInvoiceNumber` / `generateTicketNumber` / `generateQrToken` (registered post-bug-#13, low priority — rely on keyspace statistical safety)

### Design Review
- Trait refactor candidate: `GeneratesUniqueBookingCodes` (4-service `generateInvoice`/`generateTicket`/`generateQrToken` duplication + retry logic bundle bug #36)
- Keberangkatan `STATUS_LUNAS` constant (orthogonal to Booking payment_status, out-of-scope bug #35)
- DR-1 ACCEPTED: Package no-Customer-link design (parcel sender ≠ passenger loyalty)
- DR-3 open: Frontend 409 handling untuk quickPackage API
- DR-4 open: Frontend 403 handling untuk update/delete booking API

## Stakeholder Handoff

**Primary admins:** Bu Bos (primary), Admin Zizi (secondary)
**Development:** Nerry (branch owner, manual push gatekeeper)
**Production deploy prerequisite (completed 18 April 2026):**
1. ☑ Duplicate audit SQL executed before `php artisan migrate` — 0 duplicates found across invoice_number / ticket_number / qr_token (see bug #13 migration comment at `database/migrations/2026_04_18_080009_add_unique_to_booking_identifiers.php`)
2. ☑ Dedupe step not required — audit returned clean
3. ☑ Migration `2026_04_18_073028` (bug #35 'Lunas' → 'Dibayar' data migration) executed before bug #13 UNIQUE migration — 5 rows migrated

See **Deploy Results** section for full deploy narrative.

## Next Phase

**Fase 1B candidates:**
- Bug #28 normalizeTripTime trait refactor
- Bug #36 TOCTOU retry trait refactor (bundle with bug #28 via `GeneratesUniqueBookingCodes` trait)
- Remaining design review items (DR-3, DR-4 frontend handling)
- Bug #30 booking-level optimistic locking kalau prioritized

**Merge status:** Merged to `main` at `c2c1b64` on 18 April 2026, deployed to production ~20:15 WIB same day. Feature branch `feat/phase-1a-seat-locking` retained for audit (2-4 weeks).
