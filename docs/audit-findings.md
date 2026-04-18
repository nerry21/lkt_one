# Audit Findings — LKT One Codebase

Dokumen ini merangkum semua temuan audit yang dilakukan dari dua sumber:
1. **Audit awal** oleh Claude (via website/chat) saat inspect ZIP code
2. **Audit tambahan** oleh Claude Code CLI saat kalibrasi dan task analysis

---

## Metodologi Audit

**Audit awal (oleh Claude website):**
- Inspect struktur folder: 55 controllers, 16 models, 25 services, 44 migrations
- Review kualitas kode di file-file inti (Booking model, services utama, routes)
- Check git config, composer.json, dependencies
- Scan ZIP untuk credentials leak
- Tidak ada eksekusi code — hanya static analysis

**Audit tambahan (oleh Claude Code CLI):**
- Baca 6 file booking service + controller
- Grep pattern race condition, locking, validation
- Analisis alur data per jenis booking (Regular, Dropping, Rental, Paket)
- Runtime verification via `php artisan route:list`, `php artisan test`

---

## 🔴 BUG KRITIS

### 1. Credentials Leak di ZIP Upload (SUDAH DI-HANDLE)

**Ditemukan saat:** Claude audit ZIP pertama kali

**Detail:**
- File `.env` dengan `OPENAI_API_KEY`, `WHATSAPP_ACCESS_TOKEN`, `HUBSPOT_ACCESS_TOKEN` ikut di-zip
- File `firebase-service-account.json` dengan private key juga ikut

**Risiko:** Siapapun yang pernah terima ZIP ini bisa pakai kredensial aktif untuk kirim WhatsApp atas nama bisnis, akses HubSpot CRM, pakai kuota OpenAI, push notifikasi Firebase.

**Action required user:**
- [x] Rotasi semua kredensial: OpenAI, WhatsApp Access Token, HubSpot, Firebase service account
- [ ] Tambah `.env`, `firebase-service-account.json` ke `.gitignore`
- [ ] Pindahkan `firebase-service-account.json` ke `storage/app/` (di luar git)

---

### 2. Race Condition Seat Booking

**Ditemukan saat:** Audit awal, dikonfirmasi oleh Claude Code CLI dengan level detail yang lebih dalam

**Lokasi:**
- `app/Services/BookingManagementService.php` — `persistBooking()` (baris 362-507)
- `app/Services/RegularBookingPersistenceService.php` — `persistDraft()` (baris 32-125)
- `app/Services/DroppingBookingPersistenceService.php` — `persistDraft()` (baris 29-121)
- `app/Services/RentalBookingPersistenceService.php` — `persistDraft()` (baris 29-122)
- `app/Services/PackageBookingPersistenceService.php` — `persistDraft()` (baris 23-87)
- `app/Http/Controllers/Api/BookingController.php` — `quickPackageStore()` (baris 280-353)

**Detail:**
- Tidak ada satupun `lockForUpdate()` atau `sharedLock()` di seluruh codebase
- `DB::transaction` ada, tapi hanya memastikan atomicity, bukan mencegah concurrent read-write
- `selected_seats` disimpan sebagai JSON array di tabel bookings — tidak ada UNIQUE constraint

**Skenario race:**
1. User A book seat 1A pada Pekanbaru-Pasirpengaraian 2026-04-20 05:00
2. User B book seat 1A (trip sama) 0.1 detik kemudian
3. Hasilnya: **kedua booking sukses**, 2 row di DB dengan `selected_seats=["1A"]`
4. Baru ketahuan hari-H saat mobil berangkat — customer conflict

**Fix target di Fase 1A:**
- Bikin tabel `booking_seats` relasional
- UNIQUE constraint di `(trip_date, trip_time, from_city, to_city, armada_index, seat_number)`
- Soft/hard lock mechanism
- Exception handling MySQL 1062 → `SeatConflictException` HTTP 409

**Status:** 🟡 PARTIAL — Fondasi locking DONE, consumer integration 2/6 DONE.

Progress Fase 1A (per commit):
- ✅ Section A (commit 6edaeab): tabel booking_seats dengan generated column + UNIQUE
- ✅ Section B (commit 9785ebb): model BookingSeat dengan scope active/released/soft/hard
- ✅ Section C (commit 7aab2d1): SeatConflictException (HTTP 409)
- ✅ Section D (commit 63ce639+96d8d05+a2f58c4): SeatLockService 4 method
- ✅ Section E (commit 5a2bfa6): test coverage formal 16 test SeatLockServiceTest
- ✅ Section F (commit f8af602): BookingManagementService::persistBooking create path
- ✅ Section G (commit f0e66b0): RegularBookingPersistenceService::persistDraft create path
- ✅ Section H (commit b5465ff): DroppingBookingPersistenceService::persistDraft create path
- ✅ Section I (commit 2bfcbac): RentalBookingPersistenceService::persistDraft multi-day create path
- ✅ Section J (commit 529b96a): PackageBookingPersistenceService::persistDraft create path
- ✅ Section K1 (commit 36caded): BookingController::quickPackageStore integration + DB::transaction wrap (bug #6)
- ⏳ Section K2: occupiedSeats refactor pakai SeatLockService::getOccupiedSeats (pending)
- ⏳ Section K3: release endpoint baru pakai SeatLockService::releaseSeats (pending)
- ✅ Section M1 (commit 812a67d + 080f542 + 68eec79 + c127289): BookingManagementService updateBooking + deleteBooking seat lock integration (bug #21 + #29 RESOLVED)
- ✅ Section M2 (commit 9b2e551 + 2bd10af + f8a6b3a + 8304651 + d65c085): RegularBookingPersistenceService wizard re-invoke bypass (bug #22 RESOLVED) + WizardBackEditOnPaidBookingException infra + SeatConflictException dual-render
- ✅ Section M3 (commit 0818f42 + 969ab01 + 491b709): RentalBookingPersistenceService wizard back-edit bypass (bug #25 RESOLVED, multi-day Pattern A) + retroactive M2 fallback fix (bug #32 RESOLVED atomic)
- ⏳ Section M4: PackageBookingPersistenceService wizard back-edit bypass (bug #27) — **PREVENTIVE**: M4 Commit 1 WAJIB bundle `persistPaymentSelection` fallback fix bersama `persistDraft` signature change. Pattern verified post-M2/M3 di bug #32. Skip = introduce bug #33 same root cause.

Race condition di production create path tertutup total setelah Section K1 done
(F+G+H+I+J+K1 = 6 consumer integrated — 5 wizard service-layer + 1 API direct-confirmed).
Section K2 (occupiedSeats read-path refactor) + Section K3 (release endpoint baru) di-track
sebagai read-path + admin-ops coverage - bukan create-path race condition concern.
Update path protection di-track terpisah Section M (bug #21 admin API + #22 Regular
wizard + #25 Rental wizard + #27 Package wizard).
Section F+G+H+I+J+K1: create path API + Regular wizard + Dropping wizard + Rental wizard +
Package wizard service-layer + Package quickPackage API direct-confirmed closed.

---

### 3. Database Default Masih SQLite

**Ditemukan saat:** Audit awal + runtime error saat `php artisan migrate:fresh`

**Lokasi:** `config/database.php` baris `'default' => env('DB_CONNECTION', 'sqlite')`

**Dampak:**
- Kalau `.env` tidak set `DB_CONNECTION`, aplikasi jatuh ke SQLite
- Bug latent: banyak migration ditulis dengan asumsi SQLite (PRAGMA syntax)

**Fix yang sudah dilakukan (Fase 1A-Pre):**
- Archive 2 migration SQLite-only
- Fix 2 migration MariaDB strict mode (TIMESTAMP default)
- User update `.env` ke MariaDB XAMPP lokal

**Yang belum di-fix:**
- Config default masih `sqlite` — perlu ganti ke `mysql` di `config/database.php` (task minor untuk Fase 1A akhir)

---

### 4. JWT Custom dengan `hash_hmac` Manual

**Ditemukan saat:** Audit awal

**Lokasi:** `app/Services/JwtService.php`

**Detail:**
- Implementasi JWT manual menggunakan `hash_hmac('sha256', ...)`
- Pitfall:
  - Tidak timing-safe (rawan timing attack saat verifikasi signature)
  - Tidak ada validasi `nbf` (not before)
  - Tidak ada validasi `iss` (issuer)
  - Tidak ada validasi `aud` (audience)
  - Expiry hardcoded 24 jam
  - Tidak ada refresh token mechanism

**Fix yang disarankan:**
- Ganti ke `firebase/php-jwt` (library industry-standard)
- Waktu migrasi: 2-3 jam
- Target: fase akhir 1 (setelah Fase 1A/B/C beres)

---

### 5. Tidak Ada Validasi Seat Availability Sebelum Persist

**Ditemukan saat:** Audit awal, dikonfirmasi mendalam oleh Claude Code CLI

**Detail:**
- Tidak ada service yang query "seat X sudah dipakai?" sebelum insert booking
- Endpoint `BookingController::occupiedSeats()` (baris 77-113) ada, tapi hanya untuk render seat map di UI
- Bahkan kalau frontend jujur memanggilnya sebelum submit, hasilnya stale (TOCTOU — Time Of Check to Time Of Use)

**Fix target Fase 1A:** `SeatAvailabilityValidator` yang dipanggil di dalam `persistBooking()` dengan `lockForUpdate()`. Atau lebih baik: rely on UNIQUE constraint di tabel `booking_seats` + handle MySQL 1062 error.

**Status:** 🟡 PARTIAL — SeatLockService.lockSeats() sudah punya pre-check
lockForUpdate + UNIQUE constraint fallback (commit 63ce639). Consumer existing
(4 PersistenceService + BookingController::quickPackageStore) belum dipanggilkan
service ini — scheduled Section F-K.

Once Section F-K landed, status bisa jadi ✅ DONE.

---

### 6. quickPackageStore Tanpa DB::transaction

**Ditemukan saat:** Audit oleh Claude Code CLI (BARU, tidak ada di audit awal)

**Lokasi:** `app/Http/Controllers/Api/BookingController.php` — method `quickPackageStore()`

**Detail:**
- Berbeda dari booking lainnya yang punya `DB::transaction`, method ini langsung insert tanpa transaction
- Kalau error terjadi setelah `$booking->save()` (misal generate invoice gagal, generate QR gagal), booking tetap ter-persist tapi data tidak lengkap
- Double risk: tanpa transaction + tanpa locking

**Status:** ✅ RESOLVED di commit `36caded` (Section K1).

**Fix diterapkan:**
- Wrap `DB::transaction(function () use (...) { ... })` boundary: auth + pure compute di luar wrap, code generation + booking save + seat lock di dalam wrap
- Integrate `SeatLockService::lockSeats` conditional lockType (`$isPaid ? 'hard' : 'soft'`)
- `generateUniquePackageCode` (×2 untuk booking_code + invoice_number) include di dalam wrap karena DB-dependent SELECT loop
- Response building OUTSIDE wrap — pure compute dari committed booking instance

**Pattern reference:** Atomic bundle fix + integration — bug #6 fix target Fase 1A explicit "wrap + integrate dengan SeatLockService" match implementation 1:1. Single commit logical karena behavior-wise inseparable.

---

### 7. Authorization Inkonsistensi

**Ditemukan saat:** Audit oleh Claude Code CLI (BARU)

**Detail:**
Level auth di `/api/*` routes tidak konsisten:

| Resource | Middleware Saat Ini |
|---|---|
| drivers | `jwt.auth` saja (user biasa bisa CRUD) |
| mobil | `jwt.auth` saja |
| stock | `jwt.auth` saja |
| keberangkatan | `jwt.auth` saja |
| customers | `jwt.auth` + `admin.role:admin` |
| bookings | `jwt.auth` + `admin.role:admin` |
| admin-users | `jwt.auth` + `admin.role:admin` |

**Risiko:** Siapapun yang punya JWT token bisa delete data armada, driver, stock. Kalau token JWT tercuri atau ada user non-admin yang dibuat, mereka bisa merusak data operasional.

**Fix target:** Fase 1 akhir atau Fase 2. Standardize semua CRUD data operasional butuh admin role.

---

## 🟡 BUG PENTING

### 8. Model Booking God Object

**Ditemukan saat:** Audit awal

**Detail:**
- Model `Booking` punya 68 fillable fields
- Satu tabel menyimpan: customer info, trip details, pickup/dropoff, payment, driver assignment, ticket PDF, QR code, loyalty, armada info, rental end date, return trip time

**Dampak:**
- API payload raksasa untuk setiap request
- Query "cari seat A1 yang dibooking" tidak bisa pakai index karena `selected_seats` JSON
- Refactor sulit karena banyak consumer (Blade view, API, PDF service)

**Fix bertahap:**
- **Fase 1A**: minimal pecah `booking_seats` jadi tabel relasional (menyelesaikan race condition + seat query performance)
- **Fase berikutnya**: pecah `booking_payments`, `booking_tickets` (jangan sekarang, terlalu berisiko)

---

### 9. Definisi "Slot Sama" Tidak Konsisten

**Ditemukan saat:** Audit oleh Claude Code CLI (BARU)

**Detail:**
- `BookingController::occupiedSeats()` pakai kombinasi `(trip_date, trip_time LIKE 'HH:MM%', armada_index, from_city/to_city)`
- `BookingController::slotAssign()` pakai logic berbeda (`to_city == 'Pekanbaru' OR from_city == 'Pekanbaru'`)
- `trip_time` disimpan kadang `'05:00'`, kadang `'05:00:00'`

**Dampak:**
- 1 endpoint bisa bilang "seat kosong" tapi endpoint lain bilang "seat terpakai"
- Query slot yang sama bisa miss match karena format trip_time inkonsisten

**Fix target Fase 1A:**
- Definisi slot diseragamkan: `(trip_date, trip_time, from_city, to_city, armada_index)` eksak
- Normalisasi `trip_time` ke format `HH:MM:00`

---

### 10. Migration Chain Mencurigakan

**Ditemukan saat:** Audit awal

**Detail:** Ada migration dengan nama yang menunjukkan schema drift di masa lalu:
- `align_transport_source_schema`
- `align_runtime_transport_tables` (SUDAH DI-ARCHIVE)
- `force_rebuild_empty_transport_tables` (SUDAH DI-ARCHIVE)
- `sync_keberangkatan_passenger_amounts`

**Status:** 2 migration PRAGMA sudah di-archive di Fase 1A-Pre. Sisanya aman (tidak pakai PRAGMA).

**Rekomendasi jangka panjang:** Saat deploy ke VPS, buat clean migration baseline (squash semua migration jadi 1 file) supaya deploy pertama kali cepat.

---

### 11. Test Coverage Minim

**Ditemukan saat:** Audit awal, terkonfirmasi saat run `php artisan test`

**Detail:**
- Hanya 16 test file (setelah cleanup Fase 1A-Pre: 6 file)
- Kebanyakan adalah auth test default Laravel Breeze (sudah di-cleanup)
- Tidak ada test untuk: race condition, payment flow, customer deduplication, e-ticket generation, dashboard statistics

**Baseline saat ini:** 42 passed, 4 known Booking failures

**Fix target Fase 1A:**
- Bikin `tests/Feature/SeatLockingTest.php` dengan minimal 10 test cases
- Fix 4 test Booking yang gagal
- Target akhir Fase 1A: 50+ passed, 0 failed

---

### 12. File Storage Default `local`

**Ditemukan saat:** Audit awal

**Detail:**
- `config/filesystems.php` default `'local'`
- E-ticket PDF, QR code, bukti pembayaran semua di-simpan di `storage/app/`

**Dampak:**
- Saat pindah VPS, migrasi file rumit
- Tidak bisa scale ke multi-server (file di server A tidak terlihat server B)

**Fix target:** Fase 2 (deploy VPS). Ganti ke Cloudflare R2 (gratis sampai 10GB) atau MinIO self-hosted.

---

### 13. TOCTOU di `generateUniqueCode`

**Ditemukan saat:** Audit oleh Claude Code CLI (BARU)

**Detail:**
- Method `generateUniqueCode()` untuk `booking_code`, `ticket_number`, `invoice_number` pakai loop `do { ... } while (exists)`
- Ini TOCTOU (Time Of Check to Time Of Use) — tapi ruang 4-char random sehingga collision kecil

**Risiko:** Secara teknis 2 transaksi bersamaan bisa generate kode identik, karena `exists()` dibaca dari snapshot masing-masing transaction.

**Probabilitas nyata:** Rendah (4-char random = 14.7M kombinasi per prefix per day). Tapi seiring volume naik, akan terjadi.

**Update partial progress (Section K1 verifikasi + Verify 4, 2026-04-18):**

| Kolom | UNIQUE Constraint | Status |
|---|---|---|
| `booking_code` | ✅ UNIQUE | Race-protected sejak migration `2026_03_13_000001_create_bookings_table.php:13` (`->unique()`) |
| `invoice_number` | ❌ INDEX only | NO UNIQUE constraint. Migration `2026_03_14_000010_add_regular_booking_payment_progress_fields_to_bookings_table.php:12` declare nullable tanpa `->unique()`. Later migration `2026_03_14_000013_finalize_booking_schema_for_payment_ticket_and_loyalty.php:36` add INDEX untuk lookup perf, bukan UNIQUE. Race window pre-existing. |
| `ticket_number` | ❌ INDEX only | NO UNIQUE constraint. Same pattern dengan `invoice_number` — nullable declaration + INDEX only (migration `2026_03_14_000013:37`). Race window pre-existing. |

**K1 context:** Section K1 (commit `36caded`) verifikasi pre-commit reveal `invoice_number` gap. Verify 4 confirm `ticket_number` same gap pattern. K1 tidak introduce race (gap pre-existing sejak 2026_03_14), hanya surface via documentation process. K1 ship dengan acceptable risk scope:
- `quickPackageStore` generate `invoice_number` (race window 1) — duplicate PDF document, recoverable via manual fix
- `quickPackageStore` TIDAK generate `ticket_number` — K1 race boundary tidak expand ke ticket_number kolom
- Race seat booking (K1 fixes via bug #2 + #6) prioritas > invoice_number race

**Status:** 🔴 OPEN — partially addressed (1/3 kolom ✅ UNIQUE), scope sisa 2/3 kolom (`invoice_number` + `ticket_number`) belum resolved.

**Fix target:** Section L atau Fase 2. Migration sequence bundled 2 kolom:
1. Audit existing data — query `SELECT {col}, COUNT(*) FROM bookings GROUP BY {col} HAVING COUNT(*) > 1` untuk BOTH `invoice_number` + `ticket_number`
2. Deduplication kalau ada duplicate di production data (manual atau scripted)
3. Migration `add_unique_to_invoice_number_and_ticket_number_to_bookings_table` — bundle 2 kolom single migration
4. Test concurrent call scenario (Section L test gap registry): same-prefix random seed collision untuk kedua kolom

---

## 🟢 BUG MINOR

### 14. BookingController 458 Baris, CustomerController 357 Baris

**Ditemukan saat:** Audit awal

**Rekomendasi:** Refactor ke sub-service atau controller pecah per aksi. Prioritas rendah — kerjakan saat ada waktu luang antar fase.

---

### 15. Tidak Ada API Rate Limiting

**Ditemukan saat:** Audit awal

**Detail:** Routes di `/api/*` tidak pakai middleware `throttle`.

**Fix target:** Fase 2 atau Fase 5 (saat React mulai consume API). Pakai Laravel built-in `throttle:60,1` (60 request per menit).

---

### 16. Tidak Ada API Versioning

**Ditemukan saat:** Audit oleh Claude Code CLI

**Detail:** Routes `/api/bookings`, bukan `/api/v1/bookings`. Kalau mobile app atau Chatbot AI sudah consume, breaking change akan merusak user lama.

**Fix target:** Fase 4 (integrasi Chatbot AI). Bikin `/api/internal/v1/*` untuk consumer internal.

---

### 17. CORS Belum Dicek

**Ditemukan saat:** Audit awal

**Detail:** React akan jalan di domain berbeda (misal `app.jet.id`), LKT One di domain lain (misal `api.jet.id`). Perlu setup CORS yang benar.

**Fix target:** Fase 5 (React development).

---

### 18. Breeze Test yang Tidak Relevan (SUDAH DI-CLEANUP)

**Status:** Selesai di Fase 1A-Pre

---

## 🟡 BUG PENTING (Test Infrastructure)

### 19. Test Suite Pakai SQLite In-Memory vs MariaDB Production

**Ditemukan saat:** Section A Fase 1A — migrate fresh di test suite crash karena syntax MariaDB-only (`PERSISTENT` generated column, `CHARACTER SET ascii`) tidak dikenal SQLite.

**Detail:**
- `phpunit.xml` baris 26–27 hard-code `DB_CONNECTION=sqlite`, `DB_DATABASE=:memory:`
- Production dan dev lokal pakai MariaDB 10.4 XAMPP (per CLAUDE.md policy "MySQL 8 only, bukan SQLite")
- Test yang hijau di SQLite bisa jadi false positive karena SQLite lebih permisif:
  - FK tidak di-enforce secara default
  - Tidak ada strict mode (implicit data conversion)
  - Syntax subset dari MariaDB (no PERSISTENT, no CHARACTER SET per-column, no functional index)
  - Timezone/charset handling beda

**Dampak spesifik Fase 1A:**
- Migration `booking_seats` (Section A) pakai generated column PERSISTENT untuk "poor man's partial index" — feature inti locking. Tidak ada equivalent SQLite.
- Semua 46 test di test suite crash di setup phase karena `migrate:fresh` SQLite gagal parsing `DB::statement(...)`.

**Fix diterapkan Fase 1A:**
- Switch ke MariaDB via `.env.testing` (Laravel convention).
- Test DB: `hitungan_lkt_test` (terpisah dari `hitungan_lkt` dev).
- Remove hard-code SQLite di `phpunit.xml`.
- `.env.testing` di-gitignore, `.env.testing.example` safe template di-commit.

**Status:** ✅ DONE (Fase 1A, commit `chore(test): switch test DB from SQLite to MariaDB` — di branch `feat/phase-1a-seat-locking`)

**Bug laten yang baru ketangkap setelah switch ke MariaDB:**

9 bug terdeteksi di Fase 1A (5 RESOLVED, 4 OPEN):
- bug #20 (empty trip_date di regular booking flow) — ✅ RESOLVED di commit 43ccbe7
- bug #21 (BookingManagementService update path bypass seat locking) — 🔴 OPEN, scheduled Section M
- bug #22 (RegularBookingPersistenceService wizard re-invoke bypass seat locking) — 🔴 OPEN, scheduled Section M
- bug #23 (empty trip_date di dropping booking flow) — ✅ RESOLVED di commit 337899b
- bug #24 (empty rental_start_date/rental_end_date di rental booking flow) — ✅ RESOLVED di commit c0999b8
- bug #25 (RentalBookingPersistenceService wizard back-edit bypass seat locking) — 🔴 OPEN, scheduled Section M
- bug #26 (empty trip_date operator salah di package booking flow) — ✅ RESOLVED di commit 7c539ba
- bug #27 (PackageBookingPersistenceService wizard back-edit bypass seat locking) — 🔴 OPEN, scheduled Section M
- bug #28 (normalizeTripTime return empty string untuk empty input, pattern-wide 6 lokasi) — 🔴 OPEN, scheduled Fase 1B
Test yang affected: `RegularBookingPageTest::regular_booking_review_save_persists_booking_as_draft`.
Fix target: Section G (Fase 1A). Ini contoh bahwa SQLite-based testing memang masking bug —
bukan teoretis, sudah terbukti konkret.

Test lain (40 passed, 4 known failure lama) tetap sama behavior antara SQLite dan MariaDB —
tidak ada regression infrastructure.

---

### 20. Empty `trip_date` Propagates ke Booking Insert di Regular Booking Flow

**Ditemukan saat:** Fase 1A, step D test run setelah switch SQLite → MariaDB (bug #19 fix).

**Signature error:**
- Exception: `Illuminate\Database\QueryException`
- SQLSTATE: 22007 (Invalid datetime format)
- MySQL code: 1292 (Incorrect date value: '' for column `bookings`.`trip_date`)
- Trigger: POST `/dashboard/regular-bookings/review` dari test
  `RegularBookingPageTest::regular_booking_review_save_persists_booking_as_draft`

**Root cause hypothesis (belum verified):**
- `trip_date` tidak ter-forward dari session wizard ke Booking insert payload di
  `RegularBookingController::reviewSave()` atau persistence service
- Mungkin session key mismatch (e.g., `trip_date` vs `trip_date_input`), atau
  conditional yang skip set kalau input empty
- SQLite masking: DATE = string storage class, `''` insert OK (no type coercion)
- MariaDB strict_trans_tables: `''` untuk DATE → hard error 1292

**Lokasi investigasi:**
- `app/Http/Controllers/RegularBookingController.php` — method `reviewSave`
- `app/Services/RegularBookingPersistenceService.php::persistDraft()` — booking insert
- `app/Services/RegularBookingDraftService.php` — session state (kalau ada)
- Test: `tests/Feature/RegularBookingPageTest.php:396`

**Potensi dampak produksi:**
- Kalau session timeout atau cookie issue di mid-wizard → booking save gagal dengan error 500
- Kemungkinan user-facing issue yang sudah terjadi di production tapi:
  - Ter-swallow oleh error log tanpa alert, atau
  - Tertutup frontend validation yang mencegah trip_date kosong sampai ke server
- Butuh verify via production log (search error 1292 atau "trip_date" di log Hostinger)

**Fix target:** Fase 1A Section G — saat rewrite `RegularBookingPersistenceService::persistDraft`
untuk integrate `SeatLockService`, sekaligus fix root cause trip_date propagation.

**Status:** ✅ RESOLVED di commit `43ccbe7` (Section G Commit 1).

**Fix diterapkan:**
- `RegularBookingPersistenceService.php:60` null-coalesce `??` diganti dengan `filled()` check
  yang catch both null dan empty string.
- Fallback ke `now()->toDateString()` konsisten dengan buildFormState pattern.
- `Log::warning` trail saat fallback trigger — visibility ke production kalau frontend
  propagate empty trip_date consistently.
- Test `regular_booking_review_save_persists_booking_as_draft` move dari FAIL → PASS.
- Baseline pre-fix: 63/5. Post-fix: 64/4.

**Notes:**
- Test ini masked di SQLite pre-Fase 1A (pass trivially karena empty string DATE tolerated)
- Ini adalah bug laten yang **baru ketangkap karena test infra fixed** (bug #19) — contoh konkret
  kenapa bug #19 test infra issue punya dampak riil, bukan cosmetic. Fase 1A pipeline berhasil
  mengekspos + menyelesaikan bug ini.

---

### 21. Update Path BookingManagementService Bypass Seat Locking

**Ditemukan saat:** Section F Fase 1A plan review, RAGU F-1.

**Detail:**
- `BookingManagementService::persistBooking()` dipanggil baik dari `createBooking()`
  maupun `updateBooking()`
- Section F Fase 1A integrate `SeatLockService` **hanya untuk create path**
  (guarded via `$booking->wasRecentlyCreated`)
- Update path (`PUT /api/bookings/{id}`) masih update `selected_seats` JSON di Booking
  model, tapi tidak sync ke `booking_seats` table
- Dampak: booking_seats existing tetap lock seat lama; admin UI tampilkan seat baru
  (dari selected_seats JSON) tapi aktual seat lock di DB mungkin beda

**Root cause:**
- Hard delete booking_seats di update path akan break audit trail (desain Opsi 2 Section A)
- Proper update butuh: release seats lama dengan `lock_released_by` = admin user, re-lock
  seat baru. Tapi `persistBooking` tidak punya User context.

**Fix target:** Section M — admin endpoint dedicated untuk update booking dengan
protection: hard lock detection, refund workflow, audit trail.

**Status:** ✅ RESOLVED — Section M1 (commit 812a67d + 68eec79 + c127289).

**Resolusi Section M1:**
- `updateBooking()` signature ditambah `User $actor` parameter
- Pattern C hybrid: compare old vs new `slot_key + selected_seats` (normalized + sorted).
  Identical → no-op skip seat ops. Different → release+relock flow.
- Release flow: `releaseSeats($booking, $actor, 'admin_update_booking_{code}_by_user_{id}')`
  SEBELUM persistBooking — structured reason untuk audit traceability.
- Relock flow: `lockSeats($persisted, [$newSlotKey], $newSeats, $lockType)` SETELAH
  persistBooking save. `$lockType` conditional: `isPaid ? 'hard' : 'soft'` based on NEW
  payment_status (konsisten Section F).
- Hard lock guard: kalau booking punya hard lock existing dan seat/slot berubah,
  `releaseSeats()` throw `SeatLockReleaseNotAllowedException` → DB::transaction rollback →
  HTTP 403 bubble ke client. Admin forced ke refund flow.
- Controller wiring (commit 68eec79): `BookingController::update` pass
  `$this->actor($request)` ke service.
- Test coverage (commit c127289): 6 test smoke di
  `tests/Unit/Services/BookingManagementServiceTest.php` cover no-op, seat change,
  slot change, hard lock guard.
- Helpers baru: `buildSlotKey(Booking)`, `buildSlotKeyFromValidated(array)`,
  `normalizeSeatList(array)` — `normalizeTripTime()` dipanggil supaya "08:00" vs
  "08:00:00" tidak false-positive sebagai changed.

**Potensi dampak produksi (pre-resolusi):**
- Admin update booking -> seat lama masih "terlock" di booking_seats, seat baru tidak terlock
- Kalau ada customer lain booking seat yang "terlock tapi tidak visible di UI admin", konflik
  silent di hari-H
- Workaround sementara (pre-M1): admin jangan edit seat di booking yang sudah Paid

**Follow-up:** Frontend perlu handle HTTP 403 `lock_release_not_allowed` untuk PUT
`/api/bookings/{id}` — lihat DR-4.

**Dependency note (post-M2):** Hard lock guard implementation di M1 correct, tapi efektivitas
tergantung pada bug #31 (promoteToHard never called) fix. Sebelum bug #31 resolved, tidak ada
booking yang punya `lock_type='hard'` di production — hard lock guard tidak akan pernah fire.
Setelah bug #31 fix, hard lock guard akan protect proper untuk booking yang sudah terbayar.

---

### 22. Update Path RegularBookingPersistenceService Bypass Seat Locking

**Ditemukan saat:** Section G Fase 1A, parallel dengan bug #21 pattern.

**Detail:**
- `RegularBookingPersistenceService::persistDraft()` dipanggil dari wizard step "review save"
- Session state wizard include `persistedBookingId` — kalau user back-edit (misal: pilih
  kembali seat, lalu simpan review lagi), `persistDraft` di-invoke ulang dengan booking
  existing (bukan create baru)
- Section G Fase 1A integrate `SeatLockService` **hanya untuk create path** (guarded via
  `$booking->wasRecentlyCreated`)
- Update/re-edit path tetap update `selected_seats` JSON cache tapi tidak sync ke `booking_seats`
- Dampak: booking_seats dari first persistDraft call tetap lock seat lama; cache JSON
  tampilkan seat baru → divergence antara lock actual vs cache.

**Root cause:**
- Hard delete booking_seats di update path break audit trail (desain Opsi 2 Section A)
- Proper update butuh release seats lama dengan `lock_released_by` = admin user, re-lock
  seat baru. `persistDraft` tidak punya User context (method level).

**Fix target:** Section M — admin endpoint dedicated dengan protection: hard lock detection,
wizard "save + navigate back" semantic review, audit trail.

**Status:** ✅ RESOLVED — Section M2 (commit f8a6b3a + 8304651 + d65c085).

**Resolusi Section M2:**
- `persistDraft()` signature ditambah `User $actor` parameter (ke-5 positional).
- Pattern C hybrid: compare old vs new `slot_key + selected_seats` (normalized + sorted).
  Identical → no-op skip seat ops. Different → release+relock flow.
- Guard baru: kalau booking existing punya `payment_status IN ['Dibayar', 'Dibayar Tunai']`,
  throw `WizardBackEditOnPaidBookingException` → dual-render (JSON 409 API / redirect
  withErrors wizard UX). Prevent existing quirk payment_status overwrite `Dibayar → Belum
  Bayar` (di fill() hardcode).
- Release flow: `releaseSeats($existing, $actor, 'wizard_review_resubmit_regular_{code}_by_user_{id}')`
  SEBELUM fill() overwrite. Structured reason string untuk audit traceability (distinct dari
  M1 admin API format).
- Relock flow: `lockSeats($booking, [$newSlotKey], $newSeats, 'soft')` SETELAH save.
  Hard-coded `'soft'` karena persistDraft selalu `payment_status='Belum Bayar'`
  (promoteToHard future scope — lihat bug #31).
- 3 helpers baru di service (duplicate dari M1, defer trait refactor Fase 1B per bug #28):
  `buildSlotKey(Booking)`, `buildSlotKeyFromReviewState(array)`, `normalizeSeatList(array)`.
- Controller wiring (commit 8304651): `RegularBookingPageController::storeReview` pass
  `$request->user()` ke persistDraft + inline guard redirect login kalau null.
- Test coverage (commit d65c085): 6 test smoke di
  `tests/Unit/Services/RegularBookingPersistenceServiceTest.php` — create path regression +
  no-op + seat change + slot change + paid guard + reason format.
- Defensive comment di `$needsReLock` expression: `$existing` check LOAD-BEARING — kalau
  remove, create path (`wasRecentlyCreated=true`) akan trigger M2 branch DI SAMPING Section G
  branch → double lockSeats call. Future maintainer guard.

**Potensi dampak produksi (pre-resolusi):**
- User edit seat di wizard setelah review pertama → seat lama tetap lock
- Kalau customer lain booking seat yang "lock tapi tidak di UI", konflik silent di hari-H
- Workaround sementara (pre-M2): instruct user jangan back-edit wizard setelah review save

**Relationship dengan bug #21:**
- Bug #21 (BookingManagementService update via API) dan bug #22 (RegularBookingPersistenceService
  re-invoke via wizard back-edit) adalah 2 manifestasi dari gap arsitektur yang sama:
  `SeatLockService` butuh "release + re-lock" helper dengan User context untuk update flow.
- Fix pattern mirip: M1 admin API dedicated method + M2 wizard inline branching persistDraft
  (dengan Pattern C + paid guard + exception dual-render).

**Follow-up:** Frontend handling HTTP 409 `wizard_back_edit_paid_blocked` untuk
`/dashboard/regular-bookings/review` POST — lihat DR-4 (extended post-M2, covers both
admin API + wizard Blade flows).

---

### 23. Empty `trip_date` Propagates ke Booking Insert di Dropping Flow

**Ditemukan saat:** Section H Fase 1A investigation (findings phase), parallel pattern dengan bug #20 Regular.

**Detail:**
- `DroppingBookingPersistenceService::persistDraft()` line 57 pakai null-coalesce `??` untuk trip_date fallback
- `DroppingBookingDraftService::normalizeDraft()` line 195 `trim()` produces empty string `''` saat trip_date missing, bukan null
- Null-coalesce tidak catch empty string → booking tersave dengan `trip_date=''`
- MariaDB `strict_trans_tables` reject `''` untuk DATE column (analog bug #20)

**Note:** Bug ini silent karena tidak ada test coverage untuk Dropping flow (konsisten dengan bug #6 "Test coverage minim"). Identified via pattern parallel inspection saat Section H investigation — tidak ada test yang exercise empty trip_date di Dropping, jadi tidak ter-surface seperti bug #20 yang ketangkap test suite.

**Status:** ✅ RESOLVED di commit `337899b` (Section H Commit 1).

**Fix diterapkan:**
- `DroppingBookingPersistenceService.php` area null-coalesce diganti dengan `filled()` check yang catch both null dan empty string
- Fallback ke `now()->toDateString()` konsisten dengan pattern Regular Section G (commit 43ccbe7)
- `Log::warning` trail saat fallback trigger — visibility ke production

**Pattern reference:** Identical dengan bug #20 fix approach di Regular (commit 43ccbe7). Bug ditemukan + di-fix atomic dalam sesi Section H sama.

**Catatan:** Dropping tidak punya admin update endpoint (tidak seperti Regular yang punya bug #22 update-path bypass). Section H hanya perlu register 1 bug (bug #23) — tidak ada bug #22-equivalent untuk Dropping.

---

### 24. Empty `rental_start_date` / `rental_end_date` Propagates ke Booking Insert di Rental Flow

**Ditemukan saat:** Section I Fase 1A investigation (findings phase), parallel pattern dengan bug #20 Regular dan bug #23 Dropping. Rental lebih parah karena 2 field at risk (bukan 1).

**Detail:**
- `RentalBookingPersistenceService::persistDraft()` lines 57-58 pakai direct reference tanpa fallback:
  - `'trip_date' => $reviewState['rental_start_date']`
  - `'rental_end_date' => $reviewState['rental_end_date']`
- `RentalBookingDraftService::normalizeDraft()` lines 202-203 `trim()` produces empty string `''` saat field missing, bukan null
- Tidak ada null-coalesce atau fallback expression sama sekali
- MariaDB `strict_trans_tables` reject `''` untuk DATE column (analog bug #20/#23)
- Bug lebih parah dari #20/#23 karena interaksi dengan CarbonPeriod expansion di Section I — kalau end < start, CarbonPeriod return empty iteration → **seat locking silently skipped** (race condition fix bypass)

**Note:** Bug ini silent karena tidak ada test coverage untuk Rental flow (konsisten bug #6). Identified via pattern parallel inspection saat Section I investigation.

**Status:** ✅ RESOLVED di commit `c0999b8` (Section I Commit 1).

**Fix diterapkan:**
- `RentalBookingPersistenceService.php` area direct reference diganti dengan `filled()` check untuk kedua field
- Fallback `rental_start_date` → `now()->toDateString()` (pattern identik bug #20/#23)
- Fallback `rental_end_date` → `$tripDate` (POST-fallback, bukan `now()` ke-2) agar invariant `end >= start` tetap terjaga tanpa enforce manual
- `Log::warning` trail per field saat fallback trigger
- Cleanup `notes` field line 80 untuk pakai `$tripDate`/`$endDate` post-fallback (bukan empty string raw propagation)

**Pattern reference:** Identical approach dengan bug #20/#23. Fallback end → start adalah adaptasi khas Rental untuk preserve range invariant.

**Catatan:** Rental tidak punya admin update endpoint (seperti Dropping), jadi tidak ada bug #22-equivalent dari sisi API. Tapi wizard back-edit tetap bypass seat locking — tracked terpisah sebagai bug #25.

---

### 25. Rental Wizard Back-Edit Bypass Seat Locking

**Ditemukan saat:** Section I Fase 1A review (RAGU I-3), parallel pattern dengan bug #22 Regular wizard re-invoke bypass.

**Detail:**
- Customer wizard Rental di step review bisa klik "Back" edit range/tanggal, maju lagi
- `persistDraft` dipanggil ulang dengan `persistedBookingId` session existing
- `Booking::query()->find($persistedBookingId)` → existing booking loaded
- `wasRecentlyCreated = false` → guard Section I skip `lockSeats()` call
- Kalau customer stretch range (3 hari jadi 5 hari), hari 4-5 tidak ter-lock → race window reopen
- Kalau customer ubah tanggal (20-22 jadi 25-27), lock lama tetap di tanggal 20-22 (orphan), lock baru tidak dibuat untuk 25-27

**Scope:** Update path protection — butuh re-sync `booking_seats` saat range berubah. Design pilihan: (a) release+re-lock eksplisit via `SeatLockService` di update path, atau (b) pattern conditional re-lock berdasarkan range-change detection.

**Status:** ✅ RESOLVED — Section M3 (commit 0818f42 + 969ab01 + 491b709).

**Resolusi Section M3:**
- `persistDraft()` signature ditambah `User $actor` parameter (ke-5 positional)
- `persistPaymentSelection()` signature ditambah `User $actor` parameter (ke-7 positional)
  + propagate `$actor` ke fallback `$this->persistDraft(...)` call (bug #32 pattern)
- Pattern A multi-day: compare 5-field range tuple (rental_start_date, rental_end_date,
  from_city, to_city, armada_index) + normalized seat set. Identical → no-op. Different
  → full release all N×6 rows + full lock new N'×6 rows via `releaseSeats($booking, $actor, $reason)`
  + `lockSeats($booking, $slots, $seats, 'soft')`.
- Trade-off: wasteful untuk partial range change (extend/shrink 1 day) tapi reuses
  SeatLockService tanpa mod — partial-efficient variant (Pendekatan B) defer ke future
  section kalau profiling justify.
- Guard paid booking via `WizardBackEditOnPaidBookingException` dengan `category='Rental'`
  (reuse M2 generic exception — validates M2 architecture decision payoff).
- Release reason format `wizard_review_resubmit_rental_{code}_by_user_{id}` — distinct
  dari M2 Regular format (wizard_review_resubmit_regular_{...}) untuk audit traceability.
- 4 helpers baru di `RentalBookingPersistenceService`:
  - `buildSlotKey(Booking)` — range tuple shape (BEDA dari M1/M2 single-slot key,
    documented docblock NOTE). Multi-day rental needs DATE RANGE dimension.
  - `buildSlotKeyFromReviewState(array)` — shape identical untuk compare
  - `normalizeSeatList(array)` — duplicate dari M1/M2 (trait refactor defer Fase 1B
    per bug #28)
  - `expandRangeToSlots(start, end, from, to, armada)` — refactor inline CarbonPeriod
    loop dari Section I commit 2bfcbac ke helper. Behavior identical (regression
    guard via Test 1 di `RentalBookingPersistenceServiceTest`).
- Defensive comment `$existing` LOAD-BEARING di `$needsReLock` expression (analog
  M1 M2 pattern) — prevent future inline-removal yang bisa trigger double lockSeats
  call di create path.
- Controller wiring (commit 969ab01): `RentalBookingPageController::storeReview` +
  `::storePayment` pass `$actor` ke service call + inline User null guard (redirect
  login kalau session expired). `RegularBookingPageController::storePayment` juga
  di-wire retroactive (bug #32 controller layer).
- Test coverage (commit 491b709): 7 test smoke di
  `tests/Unit/Services/RentalBookingPersistenceServiceTest.php` (create regression +
  no-op + range extend/shift/shrink edge cases + paid guard + reason format) + 1 test
  extension di `RegularBookingPersistenceServiceTest` untuk bug #32 fallback regression.

**Catatan:** Rental tidak punya admin update endpoint (confirmed Section I investigation), jadi satu-satunya update path adalah wizard back-edit ini. Scope M3 hanya wire wizard path (`storeReview` + `storePayment`) — no `BookingController` API endpoint wiring.

**Dependency note (post-M3):** Hard lock guard implementation correct, tapi efektivitas
tergantung pada bug #31 (promoteToHard never called) fix. Pre-bug-#31: tidak ada booking
Rental yang punya `lock_type='hard'` di production — paid guard tetap fire via
`payment_status='Dibayar'` check (ini orthogonal dari hard lock). Post-bug-#31: guard
akan protect proper dengan dual-check (payment_status + hard lock).

---

### 26. Empty `trip_date` Operator Miss di Package Booking Flow

**Ditemukan saat:** Section J Fase 1A investigation, pattern parallel dengan bug #20/#23 tapi framing beda.

**Detail (framing akurat — bukan copy-paste bug #20/#24):**
- `PackageBookingPersistenceService::persistDraft()` line 54 **sudah punya defensive fallback**:
  `'trip_date' => $reviewState['trip_date'] ?? now()->toDateString()`
- Tapi operator `??` hanya catch `null`, **tidak catch empty string** `''`
- `PackageBookingDraftService::normalizeDraft()` line 223 `trim((string) ($draft['trip_date'] ?? ''))` emit `''` saat field missing di payload (bukan null)
- Hasilnya `??` tidak trigger → `''` propagate ke `$booking->fill()` → MariaDB `strict_trans_tables` reject DATE column

**Framing berbeda dari:**
- Bug #20 (Regular) dan Bug #24 (Rental): **sama sekali tidak ada fallback**
- Bug #23 (Dropping): juga null-coalesce saja, tapi tanpa pre-existing "defensive attempt" comment — fallback sudah ada tapi tidak marked defensive
- Bug #26 (Package): **sudah ada fallback, operator yang salah** — developer aware akan risk (pakai `??`), tapi operator yang dipilih tidak sufficient untuk defeat empty-string edge case

**Upstream guard:** `hasCompleteInformation` line 194 `$normalizedDraft['trip_date'] !== ''` block normal flow. Defensive fix tetap applicable per precedent F-I.

**Status:** ✅ RESOLVED di commit `7c539ba` (Section J Commit 1).

**Fix diterapkan:**
- Operator `??` diganti dengan `filled()` check yang catch both null dan `''`
- Fallback `trip_date` → `now()->toDateString()` (sama dengan behavior original null case)
- `Log::warning` trail saat fallback trigger — pattern uniform dengan #20/#23/#24

**Pattern reference:** Identical fix approach dengan bug #20/#23/#24. Framing commit message accurate: "operator salah miss empty string", bukan "no fallback".

---

### 27. Package Wizard Back-Edit Bypass Seat Locking

**Ditemukan saat:** Section J Fase 1A review, parallel pattern dengan bug #22 (Regular) dan bug #25 (Rental).

**Detail:**
- Customer wizard Package di step review bisa klik "Back" edit seat selection (misal ubah dari 5A ke 4B), maju lagi
- `persistDraft` dipanggil ulang dengan `persistedBookingId` session existing
- `Booking::query()->find($persistedBookingId)` → existing booking loaded
- `wasRecentlyCreated = false` → guard Section J skip `lockSeats()` call
- Kalau customer ubah seat selection (5A → 4B), lock lama di 5A tetap di `booking_seats` (orphan), lock baru untuk 4B tidak dibuat → race window reopen untuk 4B
- Khusus Package: edge case kalau customer ubah `package_size` dari Besar (requires_seat) ke Kecil (tidak requires_seat), lock lama 5A orphan permanen

**Scope:** Update path protection — butuh re-sync `booking_seats` saat seat selection berubah. Design pilihan: (a) release+re-lock eksplisit, atau (b) conditional re-lock berdasarkan seat-change detection.

**Status:** 🔴 OPEN, scheduled Section M (bersama bug #21 admin API + bug #22 Regular + bug #25 Rental).

**Catatan:** Package tidak punya admin update endpoint khusus (`quickPackageStore` di BookingController adalah create path, bukan update). Satu-satunya update path adalah wizard back-edit ini. Scope fix Section M untuk Package hanya perlu cover wizard path.

---

### 28. `normalizeTripTime` Return Empty String untuk Empty Input (Pattern-Wide 6 Lokasi)

**Ditemukan saat:** Section J Fase 1A investigation (side-quest flag), scope discipline — tidak di-fix di Section J.

**Detail:**
- `PackageBookingPersistenceService::normalizeTripTime()` line 168: kalau input empty string `''`, `strlen('') === 5` evaluate false → return `''` (bukan fallback ke `'00:00:00'`)
- Line 55 pass langsung ke `$booking->fill()` untuk kolom `trip_time`
- Kolom `trip_time` tipe VARCHAR → MariaDB terima `''` tanpa reject (beda dari DATE di bug #26)
- Integrity issue: `booking_seats` slot key matching gagal karena `trip_time` kosong → dua booking Package dengan `trip_time=''` di slot key "sama" masih UNIQUE-trigger (semantik correct defensive), tapi slot key undefined secara bisnis
- Upstream guard `hasCompleteInformation:193` via `in_array(departure_time, ...)` block normal flow — silent di production saat guard jalan

**Audit pattern-wide update (Section K1 investigation verified, 2026-04-18):**

6 implementations total ditemukan di codebase:

| # | Location | `trim()` variant? |
|---|---|---|
| 1 | `BookingManagementService:574` | ✅ trim first |
| 2 | `SeatLockService:310` | ✅ trim first |
| 3 | `PackageBookingPersistenceService:228` | ❌ no trim |
| 4 | `DroppingBookingPersistenceService:338` | ❌ no trim |
| 5 | `RegularBookingPersistenceService:289` | ❌ no trim |
| 6 | `BookingController:421` (quickPackageStore) | ❌ no trim |

**Behavior convergence untuk empty input:** Semua 6 return `''` untuk input `''` (bug #28 pattern confirmed di semua lokasi).

**Variance minor:** 4 non-trim vs 2 trim-first. Edge case `" 08:00 "` (padded input) → trim-ing variant normalize ke `'08:00:00'`, non-trimming variant return `" 08:00 "` unchanged → slot key mismatch lintas tabel.

**Scope fix Fase 1B:**
- (a) Konsolidasi ke 1 helper canonical (trait, BaseService, atau dedicated utility class)
- (b) Decide canonical behavior: trim-first atau no-trim?
- (c) Migrate 6 callsite ke canonical
- (d) Defensive fallback `'00:00:00'` untuk empty input

**Status:** 🔴 OPEN, scheduled Fase 1B. Audit scope expand berdasarkan Section K1 verifikasi — bukan lagi "kemungkinan ada di service lain", tapi **confirmed 6 lokasi dengan variance**.

**Catatan:** Tidak di-bundle di Section J atau K1 Commit 1 karena scope discipline — bug #26 fokus hanya `trip_date`, K1 fokus wrap transaction + lockSeats integration. Expand scope ke `trip_time` = scope creep. Pattern-wide fix butuh canonical decision + migration 6 callsite = scope sendiri di Fase 1B.

---

### 29. `BookingManagementService::deleteBooking` Orphan booking_seats

**Ditemukan saat:** Section M1 investigasi bug #21 (side-quest finding).

**Lokasi:** `app/Services/BookingManagementService.php::deleteBooking()`

**Detail:**
- Sebelum M1, `deleteBooking()` hanya delete `passengers` + booking row
- `booking_seats` rows untuk booking ini tidak di-release sebelum parent delete
- FK `booking_seats.booking_id` punya `cascadeOnDelete()` → baris ikut terhapus saat
  booking delete, **tapi tanpa audit fields (`lock_released_at`, `lock_released_by`,
  `lock_release_reason`) di-set terlebih dahulu**
- Tidak ada hard lock guard — admin bisa langsung delete booking yang sudah terbayar
  penuh (hard locked), bypass aturan bisnis "paid booking harus via refund flow"

**Root cause:** Missing `releaseSeats()` call sebelum `$booking->delete()`. Sister
pattern dengan bug #21 — sama-sama mutation path di BookingManagementService yang
bypass SeatLockService integration.

**Fix:** Section M1 (commit 080f542 + 68eec79 + c127289).

**Resolusi:**
- `deleteBooking()` signature ditambah `User $actor` parameter
- Pre-check `$hasActiveSeats` via `BookingSeat::where('booking_id')->active()->exists()`
  — kalau ada, panggil `releaseSeats()` dengan structured reason
  `'admin_delete_booking_{code}_by_user_{id}'`
- Hard lock case: `releaseSeats()` throw `SeatLockReleaseNotAllowedException` → DB
  transaction rollback → booking + booking_seats tetap utuh → HTTP 403 ke client.
  Admin tidak bisa hapus booking yang sudah terbayar.
- Soft lock case: audit fields di-set di booking_seats rows, lalu `$booking->delete()`
  trigger FK cascade → rows terhapus. Audit trail di booking_seats lost by design
  (Option A decision M1 — tracking "who deleted booking when" adalah separate concern,
  bukan booking_seats purpose).
- Controller wiring (commit 68eec79): `BookingController::destroy` pass actor ke service.
- Test coverage (commit c127289): 2 test (soft cascade delete + hard lock guard throws).

**Status:** ✅ RESOLVED Section M1.

**Dependency note (post-M2):** Hard lock guard di `deleteBooking` correct, tapi efektivitas
tergantung pada bug #31 (promoteToHard never called) fix. Sebelum bug #31 resolved, tidak ada
booking yang punya `lock_type='hard'` di production — hard lock guard tidak akan pernah fire,
admin bisa delete booking yang sudah terbayar tanpa refund flow block. Setelah bug #31 fix,
guard akan enforce proper.

---

### 30. BookingManagementService Booking-Level Race Condition (Admin-Admin Concurrent Edit)

**Ditemukan saat:** Section M1 investigasi bug #21 (Q4 analysis, defer decision).

**Lokasi:** `app/Services/BookingManagementService.php::updateBooking()` + controller
`BookingController::update` + `::destroy`.

**Detail:**
- 2 admin edit booking yang sama bersamaan
- Seat-level race sudah dihandle Section D SeatLockService (`lockForUpdate` di
  booking_seats + UNIQUE constraint fallback via SQLSTATE 23000 catch)
- **Tapi booking row-level race tidak dihandle**: `payment_status`, `driver_name`,
  `notes`, `booking_status`, dll race bebas
- Last-write-wins untuk non-seat fields → silent data loss (satu admin menang, satu
  kehilangan perubahan tanpa notifikasi)

**Skenario race:**
1. Admin A open edit form booking XYZ, ubah `driver_name='Pak Budi'`
2. Admin B open edit form booking XYZ (simultaneous), ubah `payment_status='Dibayar'`
3. Admin A submit → DB update `driver_name='Pak Budi'`, payment_status masih awal
4. Admin B submit 0.5 detik kemudian → DB update `payment_status='Dibayar'`, tapi
   kirim payload dengan `driver_name=<old value>` dari form dia
5. Hasil: `driver_name` revert, hanya `payment_status` yang ter-update. Admin A loses
   changes silent.

**Root cause:** Tidak ada optimistic locking (version column check-and-set) atau
`SELECT ... FOR UPDATE` pada booking row di update path.

**Fix target:** Future section — opsi:
- (a) Add `version` column `bookings` + optimistic lock check di service
- (b) `SELECT FOR UPDATE` di controller `findBooking()` sebelum masuk service

**Status:** 🟡 OPEN — scheduled future section. Low priority untuk Fase 1A karena
workflow admin biasanya sequential (tidak common 2 admin edit booking sama
bersamaan dalam window sub-detik). Race ini tidak affect data integrity seat-level
(sudah dihandle SeatLockService), hanya affect non-seat fields.

**Di-defer dari Section M1 karena:** Scope creep — M1 fokus seat lock bypass fix
(#21 + #29), booking-level race adalah separate bug class yang butuh migration
(add version column) atau controller-level refactor.

---

### 31. `persistPaymentSelection` Never Promotes Soft Lock → Hard After Payment Confirmed (Pattern-Wide)

**Ditemukan saat:** Section M2 investigasi bug #22 (sister bug finding Q3).

**Pattern-wide di 3 service:**
- `app/Services/RegularBookingPersistenceService.php::persistPaymentSelection()` (line 169)
- `app/Services/DroppingBookingPersistenceService.php::persistPaymentSelection()` (per comment line 114)
- `app/Services/RentalBookingPersistenceService.php::persistPaymentSelection()` (per comment line 142)

**Detail:**
- `SeatLockService::promoteToHard()` di-define di Section D (commit 63ce639) dengan intent
  dipanggil saat payment confirmed (soft → hard transition)
- Verified via grep: method hanya disebut di comment 3 service (placeholder "dipanggil saat
  payment confirmation") + self-reference di SeatLockService
- **Zero production call sites** — tidak pernah dipanggil di manapun di codebase
- Result: setiap booking_seats row tetap `lock_type='soft'` sepanjang lifecycle, termasuk
  setelah customer bayar lunas

**Dampak:**
- **Hard lock guard yang sudah di-implement di M1 (bug #21 + #29) + M2 (bug #22) tidak
  akan pernah fire di production.**
- Admin bisa edit/delete booking yang sudah terbayar tanpa warning 403 (seharusnya block
  dengan `SeatLockReleaseNotAllowedException`)
- Customer bisa booking seat yang sudah terbayar customer lain — karena seat `soft` tetap
  bisa di-release oleh admin/customer lain via wizard re-invoke atau admin API update
- Refund flow yang didesain Section A + Section D jadi non-enforceable (hard lock = contract
  "jangan release tanpa refund" — tapi kalau never hard, contract tidak pernah active)

**Root cause:** Section D implement promoteToHard lengkap tapi consumer integration
(persistPaymentSelection) tidak pernah add call. Gap di scope Section K (payment
validation) yang scheduled tapi belum implemented di Fase 1A.

**Fix target:** Section terpisah (post-M4 atau standalone bug #31 fix). Scope:
- Add `$this->seatLockService->promoteToHard($booking)` di persistPaymentSelection
  setelah payment_status transition ke paid (`'Dibayar'`, `'Dibayar Tunai'`)
- Pattern-wide 3 service (Regular + Dropping + Rental)
- Package via `BookingController::quickPackageStore` (Section K1) sudah handle soft/hard
  langsung via `$isPaid` branch (commit 36caded) — **tidak affected bug #31**
- Test: verify booking_seats `lock_type='hard'` setelah payment confirmed

**Status:** 🔴 OPEN — scheduled future section (blocker untuk efektivitas M1 + M2 + M3 + M4
hard lock guards).

**Sementara (workaround):** Admin harus disiplin manual — tidak edit/delete booking yang
sudah terbayar. Hard lock guard ter-implement tapi tidak enforceable sampai #31 fix.

---

### 32. `persistPaymentSelection` Fallback Missing `$actor` After M2 `persistDraft` Signature Change

**Ditemukan saat:** Section M3 investigasi (retroactive analysis post-M2 signature change).

**Honest framing:** M2 introduced, M3 catch + atomic fix. Bug ini adalah side-effect
latent dari M2 commit f8a6b3a yang mengubah `persistDraft` signature (add `User $actor`
required positional) tanpa update internal fallback call site di `persistPaymentSelection`.
M3 investigation catch pattern ini saat audit `persistPaymentSelection` di Rental, lalu
fix atomic bersama bug #25 (sama root cause pattern: signature change propagation).

**Root cause:**
`RegularBookingPersistenceService::persistPaymentSelection` line 233-234 (post-M2, pre-M3):

```php
$booking = $this->currentDraftBooking($session, $drafts)
    ?? $this->persistDraft($session, $draft, $service, $drafts);  // ← missing 5th arg
```

M2 commit f8a6b3a menambah `User $actor` sebagai 5th required positional parameter ke
`persistDraft()`, tapi internal fallback call **tidak di-update** — runtime `TypeError:
Too few arguments to persistDraft` trigger kalau fallback branch fires.

**Trigger condition (edge case reachable di production):**
1. User submit review → `storeReview` → `persistDraft` creates booking + session store persistedBookingId
2. Session expire / user clear cookies / direct-navigate ke `/regular-bookings/payment`
3. `storePayment` → `persistPaymentSelection`
4. `currentDraftBooking` returns null (session has no persistedBookingId)
5. Fallback `?? $this->persistDraft(...)` fires tanpa `$actor` argument
6. **`TypeError: Too few arguments` → HTTP 500 page** (bukan graceful redirect)

**Verified reachable:** Regular `storePayment` 3 pre-flight guards (info + seat + passenger)
tidak check persistedBookingId — draft steps populated tapi session key cleared → guards
pass → fallback fires → TypeError. Bukan teoretical edge case.

**Scope verified (M3 investigation grep):**
- `RegularBookingPersistenceService:234` — **broken post-M2** ✅ fixed di M3 Commit 1
  (commit 0818f42) bundle dengan bug #25
- `RentalBookingPersistenceService:216` — **would break post-M3** signature change
  kalau tidak preventive fix ✅ atomic di M3 Commit 1 same commit (0818f42)
- `DroppingBookingPersistenceService:178` — **safe saat ini** (persistDraft belum
  signature-change, tidak ada M section modify service ini di Fase 1A)
- `PackageBookingPersistenceService:160` — **safe saat ini** (persistDraft belum
  signature-change, akan kena di M4 — lihat PREVENTIVE NOTE bug #2 progress)

**Why existing tests tidak catch:**
M2 `RegularBookingPersistenceServiceTest` (commit d65c085) test `persistDraft` directly
dengan actor; none exercise `persistPaymentSelection` fallback edge case (session lost
between review + payment). M3 Commit 3 (commit 491b709) tambah Test 8 regression guard:
`test_persistPaymentSelection_fallback_to_persistDraft_passes_actor_when_session_lost`.

**Fix:** M3 Commit 1 (commit 0818f42). Propagate `User $actor` ke `persistPaymentSelection`
signature (7th positional arg) → pass ke fallback `persistDraft` call. Controller wiring
retroactive (commit 969ab01): `RegularBookingPageController::storePayment` pass `$actor`.

**Status:** ✅ RESOLVED Section M3 atomic dengan bug #25 (commit 0818f42 + 969ab01 + 491b709).

**Preventive note untuk M4 (Package wizard):** Saat M4 modify
`PackageBookingPersistenceService::persistDraft` signature (add `User $actor`), WAJIB
bundle `persistPaymentSelection` fallback fix di commit yang sama. Pattern verified
post-M2/M3. Skip = introduce bug #33 same root cause di Package.

**Dropping (bug #34 candidate future):** DroppingBookingPersistenceService belum
signature-change, tapi kalau suatu saat ada Section yang modify `persistDraft` Dropping
(misal untuk consistency refactor), same pattern fix WAJIB applied preventively.

---

## Design Review Items (Non-Bug, Require Business Confirmation)

### DR-2. Service-Layer Refactor quickPackageStore

**Ditemukan saat:** Section K1 Fase 1A investigation (Q2 Opsi (b) defer).

**Evidence:**
- `quickPackageStore` di `BookingController:280-353` build Booking direct (74 line method pre-K1, ~85 line post-K1)
- `PackageBookingPersistenceService::persistDraft` handle wizard flow via service-layer (Section J)
- Parallel functionality tapi split antara service-layer (wizard) dan controller-layer (API direct-confirmed) — code duplication risk

**Proposed refactor (FUTURE, tidak di Section K1):**
- Extract `quickPackageStore` method body ke `PackageBookingPersistenceService::quickStore(array $validated, ...): Booking`
- Controller jadi thin (~10 line) — validate + call service + return response
- Business logic sentralisasi di service layer, consistent dengan F-J pattern

**Rationale defer:** Scope discipline — K1 fokus integration race condition fix (bug #2 + #6). Refactor = scope creep. Require:
- Design decision: quickStore method signature parameters (full validated array vs strongly-typed DTO)
- Test coverage service method baru
- Controller response mapping (service return Booking, controller format JSON)

**Status:** 🟡 DESIGN REVIEW — scheduled Fase 2 atau Fase berikutnya. Follow-up item, bukan bug.

**Impact kalau defer permanen:** 2 code path untuk Package create (service wizard vs controller API) tetap diverge. Maintenance overhead (fix bug sekali di 2 tempat). Risk inconsistency saat business logic evolve (misal tarif calculation beda antara wizard vs API).

---

### DR-3. Frontend 409 Handling Coordination untuk quickPackage API

**Ditemukan saat:** Section K1 Fase 1A review (Concern 4 implication).

**Evidence:**
- Post-Section K1, `quickPackageStore` dapat throw `SeatConflictException` (HTTP 409) kalau seat collision (Package Besar + seat_code yang sudah ter-lock di slot kombinasi sama oleh Regular/Dropping/Rental/Package lain)
- Behavior baru: admin tool yang call `/api/bookings/quick-package` akan dapat 409 response saat collision (pre-K1: silent success + data inconsistency)
- `SeatConflictException::render()` return JSON structured: `{error: 'seat_conflict', message: '...', conflicts: [{date, time, seat, booking_id}, ...]}` dengan status 409
- Frontend admin tool current behavior terhadap 409 response: **belum diverify**

**Risk kalau frontend tidak handle 409:**
- (a) Unhandled JS exception, UI crash
- (b) Generic error message ("Something went wrong") — admin tidak tahu seat sudah di-book
- (c) Retry loop — admin kira network glitch, retry POST → sama 409 → frustration

**Recommended coordination:**
- Frontend admin tool (`/dashboard/bookings/quick-package` blade atau JS) perlu handle 409 response dengan:
  - Friendly message: "Seat {seat_code} sudah dibook untuk keberangkatan {date time route}"
  - Highlight conflict detail dari response body (`conflicts` array contain per-seat detail)
  - Suggest admin pilih seat lain atau cancel booking

**Status:** 🟡 DESIGN REVIEW — coordination dengan frontend team. Bukan blocker Section K1 (race condition fix behavior justru *expected* dari kontrak bug #2 resolution).

**Impact kalau defer permanen:** UX admin degraded saat collision — tapi **data integrity preserved** (ini objektif utama K1). DR-3 adalah UX polish, bukan functional gap.

**Context Section M reference:** DR-3 parallel dengan Section M Rental/Regular/Package wizard UX guard concern — kalau wizard back-edit bypass (bug #22/#25/#27) resolved via release+re-lock pattern, frontend juga butuh handle release operation status response. DR-3 scope terpisah tapi overlap architectural.

**Section M2 update (commit 2bd10af):** `SeatConflictException::render()` sekarang dual-mode:
- `wantsJson()` true (API consumer via Accept header): JSON 409 response unchanged (K1
  quickPackage frontend via `apiRequest` helper di `resources/js/services/http.js:45` set
  Accept: application/json automatic → behavior preserved, zero regression)
- `wantsJson()` false (Blade wizard form POST): redirect()->back()->withErrors flash key
  `wizard_seat_conflict` dengan pesan Bahasa Indonesia

DR-3 scope expanded: frontend React admin tool tetap consume JSON 409 unchanged. Blade
wizard (M2/M3/M4 future) automatic dapat UX-friendly redirect + session errors — tidak
perlu JS handling. Flash key `wizard_seat_conflict` generic untuk cross-category reuse.

---

### DR-1. Package Booking Tidak Link Customer Record

**Ditemukan saat:** Section J Fase 1A investigation (Concern 5 finding).

**Evidence:**
- `PackageBookingPersistenceService::persistDraft()` tidak resolve Customer record (no `CustomerResolverService` inject, no `customer_id` setter)
- Package bookings simpan sender/recipient sebagai raw string di `passenger_name`/`passenger_phone` + JSON notes
- `CustomerLoyaltyService` tidak ada reference ke category `'Paket'`/'Package'
- Regular + Dropping + Rental semua link ke `Customer` + trigger `CustomerLoyaltyService::recalculateForCustomer`

**Interpretasi kandidat:**
- **(a) INTENTIONAL**: Parcel service product beda dari passenger loyalty — sender/recipient bukan "customer" dalam makna loyalty JET. Default interpretasi berdasarkan pattern-wide evidence (3 consumer passenger link, 1 consumer parcel tidak link).
- (b) NEW-FEATURE GAP: Seharusnya link tapi belum implemented — Package sender punya chance jadi customer passenger nantinya.
- (c) ACCIDENTAL BUG: Design spec require link tapi kode tidak implement.

**Status:** 🟡 DESIGN REVIEW — default interpretasi (a) INTENTIONAL sampai Bu Bos confirm. Follow-up item, bukan bug. Tidak di-register dengan nomor bug.

**Impact kalau ternyata (b) atau (c):**
- Sender Package yang juga customer Passenger (Regular/Dropping/Rental) = 2 profile terpisah di data, tidak ter-merge
- Loyalty count skip kontribusi Package — customer yang sering kirim paket tidak ter-reward
- Reporting: "Customer X punya berapa transaksi?" → hanya count passenger, miss parcel

---

### DR-4. Frontend 403 Handling untuk Update/Delete Booking API (`lock_release_not_allowed`)

**Ditemukan saat:** Section M1 (bug #21 + #29 resolution).

**Scope:** Frontend (React / Blade admin UI)

**Trigger:**
- `PUT /api/bookings/{id}` (admin update booking)
- `DELETE /api/bookings/{id}` (admin delete booking)

Return HTTP **403 Forbidden** dengan body:

```json
{
  "error": "lock_release_not_allowed",
  "message": "Kursi sudah terbayar (hard lock) — butuh proses refund untuk release",
  "booking_id": <int>,
  "hard_locked_seats": ["1A", "2B"]
}
```

**Kapan trigger:** Kalau booking yang di-update/delete punya minimal 1 row `booking_seats`
dengan `lock_type='hard'` (sudah terbayar penuh), dan operasi akan mengubah seat
selection (update path) atau delete booking (delete path).

**Required handling frontend:**
- Detect `error === 'lock_release_not_allowed'` di response body
- Show modal dengan pesan: "Booking sudah terbayar. Silakan gunakan proses refund
  terlebih dahulu."
- List seat yang hard-locked (dari `hard_locked_seats` array) — supaya admin tahu seat
  mana yang block action
- Link ke refund flow (belum di-implement Fase 1A — DR-4 placeholder untuk coordination
  saat refund flow dikerjakan nanti)
- Button alternatif: "Refund Dulu" (disabled sementara) + "Batalkan"

**Related DR:**
- DR-1: Package Booking tidak link Customer Record
- DR-3: Frontend 409 Handling untuk quickPackage API (`seat_conflict`) — **berbeda**:
  endpoint quickPackage + HTTP 409 + error code `seat_conflict`. DR-4 = endpoint
  update/delete + HTTP 403 + error code `lock_release_not_allowed`.

**Source backend:**
- Exception: `App\Exceptions\SeatLockReleaseNotAllowedException`
- Render: `render(Request)` method → `JsonResponse` 403 (file
  `app/Exceptions/SeatLockReleaseNotAllowedException.php:44-52`)
- Originator: `App\Services\SeatLockService::releaseSeats()` — throw saat detect
  hard lock di booking yang di-request
- Consumer (post-M1): `BookingManagementService::updateBooking()` +
  `BookingManagementService::deleteBooking()` (sebelum M1 hanya endpoint release-seats
  dedicated)

**Status:** 🟡 OPEN — scheduled frontend work paralel Fase 1B. Tidak block backend
M1 merge karena API contract stabil.

**Section M2 extension (commit 9b2e551):** Pattern DR-4 diperluas dengan exception baru
`WizardBackEditOnPaidBookingException` — trigger saat wizard review re-submit pada booking
terbayar. Dual-render:
- API (`wantsJson()` true): HTTP 409 JSON
  ```json
  {
    "error": "wizard_back_edit_paid_blocked",
    "message": "Booking sudah terbayar, tidak bisa edit di wizard review",
    "booking_id": <int>,
    "booking_code": "<string>",
    "category": "Regular" | "Rental" | "Package"
  }
  ```
- Blade wizard (`wantsJson()` false): redirect()->back()->withErrors flash key
  `wizard_back_edit_blocked`

Generic exception untuk M2/M3/M4 wizard pattern. Frontend React SPA perlu handle `error =
'wizard_back_edit_paid_blocked'` analog `lock_release_not_allowed`. Blade wizard automatic
dapat UX redirect — no JS handling required.

---

## Prioritas Perbaikan

### Immediate (Fase 1A — hari ini)
- [x] Race condition seat booking (#2)
- [x] Validasi seat availability (#5)
- [x] quickPackageStore tanpa transaction (#6)
- [x] Definisi slot yang konsisten (#9)
- [x] `trip_time` normalisasi format
- [ ] Pecah `booking_seats` dari Booking god object (#8 — parsial)

### Fase 1 Akhir
- [ ] JWT migration ke `firebase/php-jwt` (#4)
- [ ] Config database default ganti (#3)
- [ ] Authorization standardization (#7)

### Fase 2 (VPS Deploy)
- [ ] File storage S3-compatible (#12)
- [ ] API rate limiting (#15)

### Fase Berikutnya
- [ ] Refactor god object Booking (#8 — full)
- [ ] Refactor BookingController/CustomerController (#14)
- [ ] API versioning (#16)
- [ ] CORS config (#17)
- [ ] `generateUniqueCode` UNIQUE constraint (#13)

---

## Catatan untuk Sesi Lanjutan

Semua bug di atas sudah diketahui dan masuk ke roadmap. Tidak perlu re-audit di awal Fase 1A proper. Focus langsung ke eksekusi plan seat locking yang sudah disusun.

Kalau saat Fase 1A Claude Code menemukan bug baru yang tidak ada di dokumen ini, **tambahkan ke sini** sebagai update.
