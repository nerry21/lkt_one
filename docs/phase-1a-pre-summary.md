# Fase 1A-Pre — Summary (2026-04-17)

Fase persiapan sebelum Fase 1A race condition fix. Fokus: memastikan migration chain hijau di MariaDB lokal dan membersihkan test suite dari Breeze default yang tidak relevan.

## Yang Dikerjakan

### 1. Fix migration compatibility MariaDB/MySQL strict mode

2 kolom TIMESTAMP NOT NULL tanpa default menyebabkan "Invalid default value" saat `CREATE TABLE` di MariaDB 10.4 XAMPP.

| File | Kolom | Perubahan |
|---|---|---|
| `database/migrations/2026_03_17_100006_create_ticket_backups_table.php` | `backed_up_at` (baris 80) | Tambah `->useCurrent()` |
| `database/migrations/2026_03_17_100005_create_customer_merges_table.php` | `merged_at` (baris 52) | Tambah `->useCurrent()` (preemptive untuk MySQL 8 VPS) |

Pilihan `useCurrent()` (bukan `nullable()`) karena semantik bisnis kedua kolom adalah "timestamp kejadian yang selalu terisi saat insert" — aplikasi tetap supply nilai eksplisit via `now()` / `$mergedAt` di service layer, `useCurrent()` hanya safety net di DB layer. Zero behavioral change di runtime.

### 2. Cleanup test suite dari Breeze default

Codebase pakai JWT custom (lihat `JwtService` + route `/api/auth/login`), sementara test Breeze default assume route session-based (`POST /login`, `/profile`, `/password.*`) yang sudah di-override. Semua test Breeze failed dengan `RouteNotFoundException` / 404.

9 file dihapus:
- `tests/Feature/Auth/AuthenticationTest.php`
- `tests/Feature/Auth/EmailVerificationTest.php`
- `tests/Feature/Auth/PasswordConfirmationTest.php`
- `tests/Feature/Auth/PasswordResetTest.php`
- `tests/Feature/Auth/PasswordUpdateTest.php`
- `tests/Feature/Auth/RegistrationTest.php`
- `tests/Feature/ProfileTest.php`
- `tests/Feature/ExampleTest.php`
- `tests/Unit/ExampleTest.php`

File JWT custom yang sengaja dipertahankan:
- `tests/Feature/Auth/ApiAuthenticationSessionTest.php` — satu-satunya test yang verify bridge antara `/api/auth/login` JWT ke web session dashboard. Kritis, jangan sentuh.

## Commit Trail (3 commit)

```
a8afd35 chore(tests): remove irrelevant Breeze test suite - using JWT custom auth
9763164 fix(migration): compatibility MariaDB strict mode - customer_merges.merged_at
d851ad5 fix(migration): compatibility MariaDB strict mode - ticket_backups.backed_up_at
```

## Metrics Before / After

### Migration

| Metric | Before | After |
|---|---|---|
| Migration aktif (non-archived) | 41 (tapi fail di #006 `ticket_backups`) | 41 (semua hijau) |
| Migration archived (oleh user sebelum sesi) | 2 (`align_runtime_transport_tables`, `force_rebuild_empty_transport_tables`) | 2 (tidak berubah) |
| `php artisan migrate:fresh` | ❌ Error "Invalid default value" | ✅ Sukses 41/41 |

### Test Suite

| Metric | Before | After |
|---|---|---|
| Total test files | 14 + TestCase | 5 + TestCase |
| Passed | 45 | 42 |
| Failed | 26 | 4 |
| Duration | 48.7s | 2.81s |

Passed turun 45 → 42 **bukan regresi**:
- 2 test di `AuthenticationTest.php` yang passed secara teknis (lolos karena route 404 → `assertGuest()` trivially true, bukan karena auth bekerja) — false-positive, baik dihapus
- 1 test `assertTrue(true)` trivial di `tests/Unit/ExampleTest.php`

4 failed yang tersisa sengaja tidak disentuh (untuk Fase 1A):
- `BookingManagementPageTest::booking_management_page_shows_admin_table_structure`
- `BookingManagementPageTest::non_admin_cannot_access_booking_management_api`
- `RegularBookingPageTest::regular_booking_information_is_saved_to_session_and_redirects_to_seat_step`
- `RegularBookingPageTest::regular_booking_ticket_page_shows_recorded_ticket_summary`

### Database

| Metric | Before | After |
|---|---|---|
| Database `hitungan_lkt` | empty (migration fail di tengah) | 23 tabel, clean baseline |

## Catatan untuk Sesi Berikutnya (Fase 1A Proper)

### Yang akan dikerjakan

Mulai eksekusi plan Fase 1A (fondasi seat locking dengan race condition fix) yang sudah di-approve sebelumnya. Plan tersedia di transcript sebelum sesi ini, poin A–P.

**Checkpoint 1 (tahap pertama)**: Migration + Model + Exception + SeatLockService.
- 2 migration baru: `create_booking_seats_table` (dengan generated column NULL-trick untuk UNIQUE partial), `add_cancellation_fields_to_bookings_table`
- Model `BookingSeat` + update `Booking` untuk relasi `hasMany(BookingSeat)`
- 2 exception: `SeatConflictException` (HTTP 409), `SeatLockReleaseNotAllowedException` (HTTP 403)
- Render handler di `bootstrap/app.php` (Laravel 12 pattern — bukan `app/Exceptions/Handler.php`)
- `app/Services/SeatLockService.php` dengan method: `lockSeats`, `lockSeatsForRange`, `promoteToHardLock`, `releaseSoftLock`, `getOccupiedSeats`

Setelah Checkpoint 1 → stop untuk review user sebelum lanjut.

### Prerequisite yang belum dijawab user

Q1–Q8 klarifikasi dari plan Fase 1A sebelumnya masih perlu jawaban sebelum eksekusi Checkpoint 1. Yang paling kritis:

- **Q1**: Skip migration DROP eksplisit, pakai `migrate:fresh` saja? (Rekomendasi saya: ya)
- **Q2**: Method signature — 2 method terpisah (`lockSeats` + `lockSeatsForRange`) atau 1 method dengan optional `$endDate`? (Rekomendasi saya: 2 terpisah)
- **Q3**: Behavior payment `ditolak` di `validatePayment` — auto release soft lock, atau hanya ubah status? (Perlu keputusan bisnis)
- **Q4**: Scope `quickPackageStore` — patch minimal in-place atau proper refactor ke service? (Rekomendasi saya: minimal sekarang)
- **Q5**: Test DB strategy — MySQL only (sesuai CLAUDE.md) atau kompatibel SQLite? (Rekomendasi saya: MySQL only)
- **Q6**: Filter default `booking_status='Dibatalkan'` di `/api/bookings` list?
- **Q7**: Max rental duration guard?
- **Q8**: Kolom `booking_category` di `booking_seats` — denormalisasi (rekomendasi saya) atau JOIN?

### State yang perlu dibawa ke sesi berikutnya

- Branch: `main` (3 commit ahead of origin — belum di-push)
- Working tree punya 2 perubahan user pre-existing (tidak saya sentuh):
  - 2 migration sudah di-delete dari working tree tapi belum staged: `2026_03_12_000008_align_runtime_transport_tables.php`, `2026_03_12_000009_force_rebuild_empty_transport_tables.php` (ada duplikat di `_archived/` — user perlu putuskan commit strategy-nya sendiri)
  - `.env.backup-before-phase-1a` di untracked (jangan commit, security rule)
- Database lokal `hitungan_lkt` sudah clean dan siap menerima migration baru `booking_seats`
- MCP: tidak ada

### Risiko yang di-flag untuk Fase 1A

- Strategi UNIQUE generated column bergantung MySQL 8 / MariaDB 10.x — SQLite test env akan break (terkait Q5)
- 4 Booking test yang sekarang failed mungkin lebih rumit dari kelihatan: root cause belum diinvestigate (bisa missing factory, missing seed, atau test assumption yang out-of-date)
