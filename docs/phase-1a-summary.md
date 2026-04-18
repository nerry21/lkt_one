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

Baseline post-Section L: **115 passed / 4 failed** (4 pre-existing failures untouchable — Blade rendering quirks di `BookingManagementPageTest` + `RegularBookingPageTest`, orthogonal ke seat locking).

Key test files:
- `SeatLockServiceTest.php` — 16 unit tests foundation
- M-series wizard smoke tests per category:
  - `RegularBookingPersistenceServiceTest.php` — 9 smoke (7 M2 + 2 bug #31)
  - `RentalBookingPersistenceServiceTest.php` — 9 smoke (7 M3 + 2 bug #31)
  - `PackageBookingPersistenceServiceTest.php` — 11 smoke (9 M4 + 2 bug #31)
  - `DroppingBookingPersistenceServiceTest.php` — 8 smoke (6 M5 + 2 bug #31)
- `BookingManagementPageTest.php` — admin-oriented feature tests (+bug #35 regression)
- `BookingUniqueConstraintTest.php` — bug #13 regression (3 tests, Section L)

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
**Production deploy prerequisite:**
1. Run duplicate audit SQL before `php artisan migrate` (see bug #13 migration comment at `database/migrations/2026_04_18_080009_add_unique_to_booking_identifiers.php`)
2. Dedupe pre-migrate kalau duplicate found untuk invoice_number / ticket_number / qr_token
3. Run migration `2026_04_18_073028` (bug #35 'Lunas' → 'Dibayar' data migration) sebelum bug #13 UNIQUE migration

## Next Phase

**Fase 1B candidates:**
- Bug #28 normalizeTripTime trait refactor
- Bug #36 TOCTOU retry trait refactor (bundle with bug #28 via `GeneratesUniqueBookingCodes` trait)
- Remaining design review items (DR-3, DR-4 frontend handling)
- Bug #30 booking-level optimistic locking kalau prioritized

**Merge readiness:** Branch ready for merge ke `main` post-Section L validation + stakeholder review.
