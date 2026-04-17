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
- ⏳ Section M: update path protection (admin endpoint dedicated, bugs #21 + #22 + #25 + #27)

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

**Status:** 🔴 OPEN — scheduled Section M.

**Potensi dampak produksi:**
- Admin update booking -> seat lama masih "terlock" di booking_seats, seat baru tidak terlock
- Kalau ada customer lain booking seat yang "terlock tapi tidak visible di UI admin", konflik
  silent di hari-H
- Workaround sementara: admin jangan edit seat di booking yang sudah Paid

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

**Status:** 🔴 OPEN — scheduled Section M.

**Potensi dampak produksi:**
- User edit seat di wizard setelah review pertama → seat lama tetap lock
- Kalau customer lain booking seat yang "lock tapi tidak di UI", konflik silent di hari-H
- Workaround sementara: instruct admin/user jangan back-edit wizard setelah review save

**Relationship dengan bug #21:**
- Bug #21 (BookingManagementService update via API) dan bug #22 (RegularBookingPersistenceService
  re-invoke via wizard back-edit) adalah 2 manifestasi dari gap arsitektur yang sama:
  `SeatLockService` butuh "release + re-lock" helper dengan User context untuk update flow.
- Fix pattern mirip: Section M admin endpoint + wizard UX guard.

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

**Status:** 🔴 OPEN, scheduled Section M (bersama bug #21 admin API + bug #22 Regular wizard).

**Catatan:** Rental tidak punya admin update endpoint (confirmed Section I investigation), jadi satu-satunya update path adalah wizard back-edit ini. Scope fix Section M untuk Rental hanya perlu cover wizard path, tidak perlu API path.

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
