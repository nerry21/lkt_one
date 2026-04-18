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
- ✅ Section M4 (commit 02f27ff + c058085 + c3ce9ab): PackageBookingPersistenceService wizard back-edit bypass (bug #27 RESOLVED, Pattern A 6-field tuple + 3-transition handling parcel-aware) + bug #32 PREVENTIVE bundle confirmed atomic (Pattern PREVENTIVE work as designed — no bug #33 introduced)
- ✅ Section M5 (commit 1f400ab + 8986599 + 9f799e6): DroppingBookingPersistenceService wizard back-edit bypass (bug #34 REGISTERED + RESOLVED atomic, Pattern A 5-field tuple analog M2 Regular) + bug #32 PREVENTIVE bundle 3rd successful application (no bug #35 introduced)

**M-series complete (M1+M2+M3+M4+M5 all RESOLVED).** Wizard back-edit + admin update/delete path protection lengkap untuk 5 consumer (BookingManagement admin + Regular wizard + Rental wizard + Package wizard + Dropping wizard). Next: bug #31 cross-cutting fix (promoteToHard gap) untuk enforce hard lock guards efektif di production — scope sekarang 5 wizard+admin service post-M5.

Race condition di production create path tertutup total setelah Section K1 done
(F+G+H+I+J+K1 = 6 consumer integrated — 5 wizard service-layer + 1 API direct-confirmed).
Section K2 (occupiedSeats read-path refactor) + Section K3 (release endpoint baru) di-track
sebagai read-path + admin-ops coverage - bukan create-path race condition concern.
Update path protection di-track terpisah Section M (bug #21 admin API + #22 Regular
wizard + #25 Rental wizard + #27 Package wizard + #34 Dropping wizard).
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
- bug #27 (PackageBookingPersistenceService wizard back-edit bypass seat locking) — ✅ RESOLVED di commit 02f27ff + c058085 + c3ce9ab (Section M4, Pattern A 6-field tuple + 3-transition parcel-aware)
- bug #28 (normalizeTripTime return empty string untuk empty input, pattern-wide 6 lokasi) — 🔴 OPEN, scheduled Fase 1B
- bug #31 (persistPaymentSelection never promotes soft → hard pattern-wide) — ✅ RESOLVED post-M5 (5-insertion cross-cutting fix: 4 wizard `persistPaymentSelection` conditional + `BookingController::validatePayment action='lunas'` unconditional)
- bug #34 (DroppingBookingPersistenceService wizard back-edit bypass seat locking) — ✅ RESOLVED di commit 1f400ab + 8986599 + 9f799e6 (Section M5, Pattern A 5-field tuple analog M2 Regular)
- bug #35 (payment_status semantic mismatch 'Lunas' admin vs 'Dibayar'/'Dibayar Tunai' wizard — M-series wizard back-edit guard tidak match 'Lunas') — 🔴 OPEN, discovered Phase 0 bug #31 session, defer ke follow-up
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

**Status:** ✅ RESOLVED Section M4 (commit 02f27ff + c058085 + c3ce9ab).

**Resolusi:**
- Pattern A (tuple compare + full replace) dengan **6-field tuple** `(trip_date, trip_time, from_city, to_city, armada_index, package_size)` — **BEDA dari M2 Regular 5-field** (no package_size), **BEDA dari M3 Rental** (no date range, package_size dimension distinct). `package_size` dimension distinct di docblock NOTE — penting supaya mode transition Besar↔Kecil/Sedang ter-capture sebagai "tuple changed".
- **3-transition handling** (parcel-aware): T1 seat change Besar→Besar beda seat (release old + lock new), T2 mode downgrade Besar→Kecil/Sedang (release only, no relock karena Kecil/Sedang no seat), T3 mode upgrade Kecil/Sedang→Besar (lock fresh, no release karena Kecil/Sedang had no seat), T4 identical (no-op).
- **Helper inventory baru di service** (duplicate dari M1/M2/M3, defer trait refactor Fase 1B per bug #28):
  - `buildSlotKey(Booking)` — extract tuple dari Booking existing (mapping `booking_for → package_size`)
  - `buildSlotKeyFromReviewState(array)` — extract tuple dari wizard reviewState (mapping `pickup_city → from_city`, `destination_city → to_city`, `departure_time_value → trip_time` normalized)
  - `normalizeSeatList(array)` — sort + unique untuk seat compare
  - **NO `expandRangeToSlots`** — Package single trip_date, tidak multi-day seperti Rental
- **Paid guard** inline via `WizardBackEditOnPaidBookingException(category: 'Paket')` — throw saat `$existing->payment_status IN ['Dibayar', 'Dibayar Tunai']`. Infrastructure exception reuse dari M2 commit 9b2e551 (dual-render: HTTP 409 JSON untuk API, redirect+flash untuk Blade wizard).
- **Reason format:** `wizard_review_resubmit_package_{code}_by_user_{id}` (parallel dengan M2 Regular + M3 Rental format).
- **Bug #32 PREVENTIVE bundle confirmed atomic** di Commit 1: `persistPaymentSelection` signature add `$actor` 7th arg + propagate ke fallback `$this->persistDraft(...)` call (pre-fix locus line 159-160 → post-fix pass `$actor` konsisten). Pattern PREVENTIVE work as designed — no bug #33 introduced di Package layer.
- **Defensive comment `$existing` LOAD-BEARING** di `$needsRelease` + `$needsRelock` checks (analog M1/M2/M3 pattern) — kalau remove, create path (`wasRecentlyCreated=true`) akan TRIGGER M4 branch di samping create-path block → double lockSeats call → race condition.
- **Controller wiring** (commit c058085): `PackageBookingPageController::storeReview` + `::storePayment` pass `$actor` + inline 403 guard via try/catch `WizardBackEditOnPaidBookingException` + `User` null guard (redirect login kalau session expire). Pattern reuse dari M2 8304651 + M3 969ab01.
- **Test coverage** (commit c3ce9ab): 9 smoke test di `PackageBookingPersistenceServiceTest` — create path regression guard Besar, T4 identical no-op Besar + Kecil, T1/T2/T3 transition verification, paid guard `category='Paket'`, bug #32 fallback pass actor regression, reason format verify.

**Catatan:** Package tidak punya admin update endpoint khusus (`quickPackageStore` di BookingController adalah create path, bukan update). Satu-satunya update path adalah wizard back-edit ini — M4 scope cover sepenuhnya.

**Dependency note (post-M2/M3):** Hard lock guard di M4 `persistDraft` (via `WizardBackEditOnPaidBookingException` pre-check + downstream `SeatLockReleaseNotAllowedException` di releaseSeats) correct, tapi efektivitas tergantung pada bug #31 (promoteToHard never called) fix. Pre-bug-#31: tidak ada booking yang punya `lock_type='hard'` di production — hard lock guard tidak akan pernah fire. `payment_status`-based guard di M4 fire independen bug #31 (membandingkan status string, bukan lock_type), jadi M4 paid guard **efektif even pre-bug-#31**.

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

**Pattern-wide di 4 wizard service (updated post-M5, 5 service incl. admin):**
- `app/Services/RegularBookingPersistenceService.php::persistPaymentSelection()` (line 225 post-M2/M3)
- `app/Services/DroppingBookingPersistenceService.php::persistPaymentSelection()` (line 234 post-M5) — **confirmed affected post-M5**: Dropping wizard flow via persistPaymentSelection juga tidak call promoteToHard. Sekarang explicitly listed pattern-wide (bukan lagi "per comment line 114" placeholder).
- `app/Services/RentalBookingPersistenceService.php::persistPaymentSelection()` (per comment line 142)
- `app/Services/PackageBookingPersistenceService.php::persistPaymentSelection()` (line 201 post-M4) — **added by M4 investigation**: Package wizard flow via persistPaymentSelection juga tidak call promoteToHard. Note: `BookingController::quickPackageStore` (API direct-confirmed di Section K1) adalah jalur terpisah yang sudah handle soft/hard langsung via `$isPaid` branch — affected pattern bug #31 hanya wizard jalur.

**Cross-cutting scope post-M5 complete:** 5 wizard+admin service integrated (Regular + Dropping + Rental + Package + BookingManagement admin path yang konsume hard lock via SeatLockService::releaseSeats guard). Bug #31 fix akan expand hard lock guard effectiveness di semua 5.

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
- Pattern-wide 4 wizard service (Regular + Dropping + Rental + Package)
- Package via `BookingController::quickPackageStore` (Section K1) sudah handle soft/hard
  langsung via `$isPaid` branch (commit 36caded) — **tidak affected bug #31** (jalur API
  direct-confirmed terpisah dari wizard)
- Test: verify booking_seats `lock_type='hard'` setelah payment confirmed

**Status:** ✅ RESOLVED via 5-insertion-point cross-cutting fix (post-M5 session).

**Resolusi:**
- **4 wizard services (conditional promote via `$marksAsPaid = $payments->marksPaymentAsPaid($paymentMethod)`):**
  - `RegularBookingPersistenceService::persistPaymentSelection` — promote setelah `$booking->save()`, sebelum `recalculateCustomerLoyalty`
  - `DroppingBookingPersistenceService::persistPaymentSelection` — same pattern
  - `RentalBookingPersistenceService::persistPaymentSelection` — same pattern
  - `PackageBookingPersistenceService::persistPaymentSelection` — same pattern (no `recalculateCustomerLoyalty` per DR-1 M4)
  - Logic: `if ($marksAsPaid) { $this->seatLockService->promoteToHard($booking); }` — qris/cash promote immediate, transfer defer
- **1 admin path (unconditional):**
  - `BookingController::validatePayment` `action='lunas'` branch — SeatLockService di-inject via method param (mirror `quickPackageStore` pattern line 286), promoteToHard di-call sebelum customer loyalty try/catch. Admin `action='lunas'` = explicit commitment to paid state regardless of payment_method.
- **Method `promoteToHard` idempotent** (per Section D commit 63ce639 contract) — aman kalau booking sudah hard, jadi no-op.

**Transfer defer rationale:** Wizard transfer submit hanya commitment to payment (status `'Menunggu Verifikasi'`), bukan confirmed paid. Admin verify manual via `validatePayment action='lunas'` yang trigger promote. Align dengan bisnis flow: transfer refund-able sebelum admin konfirmasi, hard lock reserved untuk post-admin-verification.

**Test coverage:** +8 smoke test (2 per wizard service):
- `test_persistPaymentSelection_cash_promotes_seats_to_hard` — assert `lock_type='hard'` post-cash
- `test_persistPaymentSelection_transfer_keeps_seats_soft` — assert `lock_type='soft'` post-transfer
- Regular/Dropping/Rental/Package × 2 test = 8 test total
- Admin path (`BookingController::validatePayment`) test **DEFERRED** — `tests/Feature/Api/BookingControllerTest.php` tidak exist, scaffolding baru butuh session terpisah. Tracked di follow-up section.

**Known-gap post-fix:**
- **Admin test coverage:** `BookingController::validatePayment` promoteToHard integration tidak di-test. Feature test scaffolding baru butuh auth + route testing infrastructure. Defer ke follow-up section.
- **Semantic mismatch 'Lunas' vs 'Dibayar':** Admin `validatePayment action='lunas'` set `payment_status='Lunas'`, sedangkan M2-M5 wizard back-edit paid guard (`WizardBackEditOnPaidBookingException`) check list `['Dibayar', 'Dibayar Tunai']` — tidak match 'Lunas'. Tracked sebagai **bug #35** di bug tracker list di bawah (separate scope, separate session).

**Production behavior post-fix:**
- qris/cash wizard: booking langsung `lock_type='hard'` → M1 + M2-M5 paid guards efektif enforce (admin update/delete 403, wizard back-edit 409)
- Transfer wizard: booking tetap soft sampai admin verify lunas → admin path trigger promote → transition ke hard enforcement
- Admin `validatePayment action='belum_lunas'`/`'ditolak'`: no promote, booking tetap soft state lama
- Refund flow contract active: hard locks require explicit release via refund workflow (future scope)

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

**Scope verified (M3 investigation grep, M4 post-closure update):**
- `RegularBookingPersistenceService:234` — **broken post-M2** ✅ fixed di M3 Commit 1
  (commit 0818f42) bundle dengan bug #25
- `RentalBookingPersistenceService:216` — **would break post-M3** signature change
  kalau tidak preventive fix ✅ atomic di M3 Commit 1 same commit (0818f42)
- `DroppingBookingPersistenceService:178` (pre-M5) → `:185` (post-M5) — **would break
  post-M5** signature change kalau tidak preventive fix ✅ atomic di M5 Commit 1
  (commit 1f400ab) bundle dengan bug #34. Pattern PREVENTIVE work as designed — no
  bug #35 introduced (3rd successful application after M3 + M4).
- `PackageBookingPersistenceService:160` (pre-M4) → `:159` (post-M4) — **would break
  post-M4** signature change kalau tidak preventive fix ✅ atomic di M4 Commit 1
  (commit 02f27ff) bundle dengan bug #27. Pattern PREVENTIVE work as designed — no
  bug #33 introduced.

**Why existing tests tidak catch:**
M2 `RegularBookingPersistenceServiceTest` (commit d65c085) test `persistDraft` directly
dengan actor; none exercise `persistPaymentSelection` fallback edge case (session lost
between review + payment). M3 Commit 3 (commit 491b709) tambah Test 8 regression guard:
`test_persistPaymentSelection_fallback_to_persistDraft_passes_actor_when_session_lost`.

**Fix:** M3 Commit 1 (commit 0818f42). Propagate `User $actor` ke `persistPaymentSelection`
signature (7th positional arg) → pass ke fallback `persistDraft` call. Controller wiring
retroactive (commit 969ab01): `RegularBookingPageController::storePayment` pass `$actor`.

**Status:** ✅ RESOLVED Section M3 atomic dengan bug #25 (commit 0818f42 + 969ab01 + 491b709) + **M4 Package preventive bundle confirmed** atomic dengan bug #27 (commit 02f27ff) + **M5 Dropping preventive bundle confirmed** atomic dengan bug #34 (commit 1f400ab).

**Package preventive bundle confirmation (M4):** M4 catch fallback gap pre-implementation — `PackageBookingPersistenceService:159-160` fallback `?? $this->persistDraft(...)` pre-M4 tidak pass `$actor`, identik dengan Regular pre-M3 state. Fix atomic bersama bug #27 di M4 Commit 1 (commit 02f27ff). Pattern PREVENTIVE work as designed — no bug #33 introduced.

**Dropping preventive bundle confirmation (M5, 3rd successful application):** M5 catch fallback gap pre-implementation — `DroppingBookingPersistenceService:178` fallback `?? $this->persistDraft(...)` pre-M5 tidak pass `$actor`, identik dengan Regular pre-M3 state + Package pre-M4 state. Fix atomic bersama bug #34 di M5 Commit 1 (commit 1f400ab). **Pattern PREVENTIVE work as designed — 3rd successful application (M3 Rental + M4 Package + M5 Dropping), sistematik skip bug #33/#35 same root cause introduction.**

**Scope verification table (post-M5, M-series complete):**

| Service | persistDraft signature | Fallback status | Resolution |
|---|---|---|---|
| Regular | M2 f8a6b3a add $actor | Fixed di M3 | ✅ commit 0818f42 |
| Rental | M3 0818f42 add $actor | Fixed atomic dgn #25 | ✅ commit 0818f42 |
| Package | M4 02f27ff add $actor | Fixed atomic dgn #27 | ✅ commit 02f27ff |
| Dropping | M5 1f400ab add $actor | Fixed atomic dgn #34 | ✅ commit 1f400ab |

Semua 4 wizard persistence service sekarang signature-change applied + preventive fallback fixed. M-series complete untuk bug #32 pattern.

---

### 34. Dropping Wizard Back-Edit Bypass Seat Locking

**Ditemukan saat:** Section M5 investigation post-M4 (Dropping investigation session, parallel pattern dengan bug #22 Regular / bug #25 Rental / bug #27 Package).

**Severity:** HIGH — production-reachable via wizard back-edit flow, orphan lock risk di slot lama saat customer ubah trip_date/trip_time/pickup/dropoff.

**Detail:**
- Customer wizard Dropping di step review bisa klik "Back" edit booking info (ubah trip_date, trip_time, from_city, to_city, atau armada_index), maju lagi
- `persistDraft` dipanggil ulang dengan `persistedBookingId` session existing
- `Booking::query()->find($persistedBookingId)` → existing booking loaded
- `wasRecentlyCreated = false` → guard Section H skip `lockSeats()` call
- Kalau customer ubah slot dimension, lock lama di slot original tetap di `booking_seats` (orphan 6 rows), lock baru untuk slot baru tidak dibuat → race window reopen untuk 6 seat di slot baru
- Scope narrower dari Package (M4) karena Dropping **seat hardcoded 6 full armada** (`1A, 2A, 2B, 3A, 4A, 5A`) — tidak ada seat change scenario, hanya slot change

**Scope:** Update path protection — butuh re-sync `booking_seats` saat slot dimension berubah. Design pilihan: (a) release+re-lock eksplisit, (b) conditional re-lock berdasarkan slot-change detection. **Dipilih (a) — mirror M2/M3/M4 Pattern A.**

**Status:** ✅ RESOLVED Section M5 (commit 1f400ab + 8986599 + 9f799e6).

**Resolusi:**
- Pattern A (tuple compare + full replace) dengan **5-field tuple** `(trip_date, trip_time, from_city, to_city, armada_index)` — **analog M2 Regular tuple shape**, **BEDA dari M4 Package 6-field** (no `package_size` dimension karena Dropping single-variant passenger group service dengan hardcoded 6-seat reservation).
- **Slot change only scenario:** T1/T2/T3 variants M4 TIDAK APPLICABLE — Dropping tidak punya mode transition, seat hardcoded 6. `$seatsChanged` defensive check retained future-proof kalau variant diperkenalkan.
- **Helper inventory baru di service** (duplicate dari M1/M2/M3/M4, defer trait refactor Fase 1B per bug #28):
  - `buildSlotKey(Booking)` — extract 5-field tuple dari Booking existing
  - `buildSlotKeyFromReviewState(array)` — extract 5-field tuple dari wizard reviewState (mapping `pickup_location → from_city`, `destination_location → to_city`, `departure_time_value → trip_time` normalized)
  - `normalizeSeatList(array)` — sort + unique untuk seat compare (defensive retained)
  - **NO `expandRangeToSlots`** — Dropping single-day, tidak multi-day seperti Rental
  - **NO `package_size` dimension** — Dropping single-variant, tidak perlu Package M4 6th field
- **Paid guard** inline via `WizardBackEditOnPaidBookingException(category: 'Dropping')` — throw saat `$existing->payment_status IN ['Dibayar', 'Dibayar Tunai']`. Infrastructure exception reuse dari M2 commit 9b2e551 (dual-render: HTTP 409 JSON untuk API, redirect+flash untuk Blade wizard). **4 categories wired post-M5:** Regular, Rental, Paket, Dropping.
- **Reason format:** `wizard_review_resubmit_dropping_{code}_by_user_{id}` (parallel dengan M2 Regular + M3 Rental + M4 Package format).
- **Bug #32 PREVENTIVE bundle confirmed atomic** di Commit 1 (3rd successful application): `persistPaymentSelection` signature add `$actor` 7th arg + propagate ke fallback `$this->persistDraft(...)` call. Pattern PREVENTIVE work as designed — no bug #35 introduced di Dropping layer.
- **Defensive comment `$existing` LOAD-BEARING** di `$needsRelease` + `$needsRelock` checks (analog M1/M2/M3/M4 pattern) — kalau remove, create path (`wasRecentlyCreated=true`) akan TRIGGER M5 branch di samping create-path block → double lockSeats call → race condition.
- **Controller wiring** (commit 8986599): `DroppingBookingPageController::storeReview` + `::storePayment` pass `$actor` + inline 403 guard via try/catch `WizardBackEditOnPaidBookingException` + `User` null guard (redirect login kalau session expire). Pattern reuse dari M2 8304651 + M3 969ab01 + M4 c058085.
- **Test coverage** (commit 9f799e6): 6 smoke test di `DroppingBookingPersistenceServiceTest` — create path regression guard (6 seat active), slot identical no-op, slot change release+relock (trip_date), paid guard `category='Dropping'`, bug #32 fallback pass actor regression, reason format verify.

**Register+resolve di section yang sama:** Mirror M1-M4 pattern (bug #21+#29 di M1, bug #22 di M2, bug #25+#32 di M3, bug #27 di M4). Bug #34 di-register sebagai bug baru di M5 Commit 1 commit message body, lalu RESOLVED atomic dengan fix di same section. Full bug entry documented di M5.4 closure (current commit).

**Catatan:** Dropping tidak punya admin update endpoint khusus (per existing Dropping analysis). Satu-satunya update path adalah wizard back-edit ini — M5 scope cover sepenuhnya.

**Dependency note (post-M2/M3/M4):** Hard lock guard di M5 `persistDraft` (via `WizardBackEditOnPaidBookingException` pre-check + downstream `SeatLockReleaseNotAllowedException` di releaseSeats) correct, tapi efektivitas tergantung pada bug #31 (promoteToHard never called) fix. Pre-bug-#31: tidak ada booking yang punya `lock_type='hard'` di production — hard lock guard tidak akan pernah fire. `payment_status`-based guard di M5 fire independen bug #31 (membandingkan status string, bukan lock_type), jadi M5 paid guard **efektif even pre-bug-#31**. Identical behavior dengan M1-M4 paid guards.

---

### 35. Semantic Mismatch `payment_status='Lunas'` (Admin) vs `'Dibayar'`/`'Dibayar Tunai'` (Wizard) di M-Series Paid Guard

**Ditemukan saat:** Phase 0 investigation bug #31 fix session (post-M5), orthogonal finding saat audit `BookingController::validatePayment action='lunas'` branch.

**Severity:** MEDIUM — bukan data-integrity bug, tapi business logic inconsistency yang bypass M2-M5 wizard back-edit paid guard untuk booking transfer yang admin-confirmed.

**Detail:**
- `BookingController::validatePayment` action='lunas' set `$record->payment_status = 'Lunas'` (line 131 post-fix) — admin verification path untuk transfer
- Wizard `persistPaymentSelection` via `RegularBookingPaymentService::paymentStatusForMethod`:
  - `'qris'` → `'Dibayar'` (line 119 `paidPaymentStatus()`)
  - `'cash'` → `'Dibayar Tunai'` (line 123 `cashPaymentStatus()`)
  - `'transfer'` → `'Menunggu Verifikasi'` (line 114 `waitingVerificationPaymentStatus()`)
- M2-M5 wizard back-edit paid guard di 4 `persistDraft` service check list `['Dibayar', 'Dibayar Tunai']` untuk trigger `WizardBackEditOnPaidBookingException`:
  - `RegularBookingPersistenceService:57`
  - `DroppingBookingPersistenceService:53`
  - `RentalBookingPersistenceService:53`
  - `PackageBookingPersistenceService:50`
- **`'Lunas'` tidak ada di list** — booking transfer yang admin-confirmed tetap bisa wizard back-edit (guard tidak fire)

**Skenario konkret:**
1. Customer transfer booking, wizard → `payment_status='Menunggu Verifikasi'`, seats soft
2. Admin verify lunas via API `validatePayment action='lunas'` → `payment_status='Lunas'`, seats promoted hard (post-bug-#31)
3. Customer somehow reach wizard review lagi (session preserved atau back button sebelum cookie expire)
4. Customer submit review → `persistDraft` → paid guard check `in_array('Lunas', ['Dibayar', 'Dibayar Tunai'])` = **false** → guard tidak fire → proceed release+relock
5. Release attempt → `SeatLockService::releaseSeats` → detect hard locks → throw `SeatLockReleaseNotAllowedException` → HTTP 403
6. **Result:** UX confusing — customer dapat 403 generic (seat lock), bukan 409 paid guard yang lebih specific message

**Impact:**
- Post-bug-#31: hard lock guard akan catch scenario ini via 403 (defense-in-depth, no data loss)
- Pre-bug-#31: bisa silent bypass (booking stuck soft, release+relock succeed, payment_status overwrite ke 'Belum Bayar')
- **Post bug #31 fix applied (current state):** 403 hard-lock guard fires as safety net, tapi UX message mismatch (generic 403 "kursi sudah terbayar" vs specific 409 "booking sudah terbayar, tidak bisa edit")

**Root cause:**
- Historical convention mismatch: admin UI menggunakan istilah 'Lunas' (legacy), wizard menggunakan 'Dibayar'/'Dibayar Tunai' (Fase 1A Section C+ convention)
- `BookingManagementService` dropdown (line 82) list both 'Lunas' dan 'Dibayar' sebagai valid `payment_status` — coexistence intentional atau legacy drift

**Fix candidates (pick di follow-up):**
- **(a) Align admin 'Lunas' → 'Dibayar':** Rewrite `validatePayment action='lunas'` set `payment_status='Dibayar'` (bukan 'Lunas'). Risk: break existing dashboard filter kalau hardcode 'Lunas'.
- **(b) Extend guard list:** Tambah `'Lunas'` ke 4 paid guard array. Trivial fix, minimal risk.
- **(c) Unify via helper constant:** Create `Booking::PAID_STATUSES = ['Dibayar', 'Dibayar Tunai', 'Lunas']` atau similar, refactor 4 guard + downstream queries. Scope lebih besar tapi canonical.

**Scope:** Defer ke follow-up session — bukan bug #31 scope, bukan M-series scope. Butuh grep pattern-wide untuk identify `'Lunas'` usage + business decision canonical naming.

**Status:** 🔴 OPEN — scheduled follow-up. Low priority karena bug #31 fix already provides defense-in-depth (hard lock guard fires as safety net, data integrity preserved).

**Workaround pre-fix:** Admin disiplin — tidak delete/ubah booking yang sudah `payment_status='Lunas'` (seats hard-locked via bug #31 fix akan block admin operation otomatis).

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

**Investigation summary (M4 session Q5 grep diff):**
- `PackageBookingPersistenceService.php`: **0 match** untuk `customerResolver|Customer|customer_id|loyaltyService|LoyaltyService` — Package service entirely skip Customer integration (no imports, no constructor deps, no `->resolve()` call, no `customer_id` assignment)
- `RegularBookingPersistenceService.php`: **15 match** — full Customer resolver + loyalty wiring (`use App\Models\Customer`, constructor deps `CustomerResolverService + CustomerLoyaltyService`, resolve call primary + passengers, `recalculateCustomerLoyalty()`)
- Diff pattern-wide: Package constructor = 1 dep (SeatLockService), Regular constructor = 3 deps (CustomerResolver + CustomerLoyalty + SeatLock)

**Business rationale (per business owner clarification M4 session):**
- Package = parcel delivery service (barang/goods shipping), **bukan passenger booking**. Sender ≠ passenger loyalty target.
- Loyalty program JET traditionally untuk passenger frequency (5 trip → 50% discount), bukan parcel sender frequency.
- Field mapping literal: `passenger_name` stores sender_name, `pickup_location` stores sender_address, `dropoff_location` stores recipient_address, `notes` JSON stores `recipient_name`/`recipient_phone`/`item_name`/`item_qty` — Package use Booking generic fields with parcel semantic.
- Skip Customer-link untuk Package adalah **ACCEPTED design**, bukan gap atau bug.

**Status:** ✅ ACCEPTED Section M4. Default interpretasi (a) INTENTIONAL confirmed via business owner clarification. Tidak perlu add Customer integration ke Package — constructor `PackageBookingPersistenceService` correctly omit `CustomerResolverService + CustomerLoyaltyService` dependencies.

**Decision:**
- Package service design: PRESERVE as-is (no-Customer-link intentional)
- M4 plan implication (confirmed): Safe mirror M2/M3 core pattern (release+relock+paid guard+atomic fallback+User actor wiring) **tanpa** adapt Customer handling. M4 scope = pure locking/guard concerns, scope lebih sempit dari M2 Regular.

**Future re-evaluation trigger:**
- Kalau Bu Bos introduce "Customer Parcel Loyalty" program (discount untuk sender Package yang sering kirim), DR-1 decision reversal butuh: (a) add `CustomerResolverService + CustomerLoyaltyService` deps ke Package constructor, (b) resolve sender phone+name + assign `customer_id`, (c) extend `CustomerLoyaltyService` untuk count Paket trips. Scope = new feature, bukan bug fix. Register sebagai tracked enhancement waktu request fit.

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

## Future Investigation — Discovery Notes

### Dropping Parcel Delivery Support (M4 Session Discovery)

**Ditemukan saat:** Section M4 investigation (Q-EXTRA clarification session dengan business owner, 2026-04-18).

**Context:**
Per business owner clarification M4 session, **Dropping service mendukung pengiriman barang** dengan pattern serupa Package Besar (lock seat untuk parcel). Sebelumnya audit assume Dropping = passenger service only (drop-off di tengah jalan), tapi ternyata ada use-case Dropping + parcel hybrid yang belum ter-cover di audit.

**Potential bugs analog:**
- **bug #27 analog** (Dropping wizard back-edit bypass) — kalau wizard Dropping ada step re-invoke yang tidak release+relock pada seat/slot change
- **bug #32 analog** (Dropping persistPaymentSelection fallback missing `$actor`) — akan trigger kalau Dropping persistDraft di-signature-change future

**Investigation scope (post-M4 schedule):**
- Confirm Dropping flow support parcel (grep `DroppingBookingDraftService` + controller wizard routes)
- Compare `DroppingBookingPersistenceService::persistDraft` behavior vs Package: ada `package_size`-analog dimension? Ada seat lock untuk parcel slot?
- Check `persistPaymentSelection` fallback state (pre-M4 verified `:178` safe saat ini, tapi perlu re-verify post-M4 landing)
- Kalau confirmed bug analog, register sebagai **bug #34** dengan scope Dropping wizard back-edit + bug #32 PREVENTIVE bundle (mirror M4 atomic approach)

**Schedule:**
- Post-M4 close (sekarang M-series complete)
- **Sebelum atau bersama bug #31 cross-cutting fix** (next session) — kalau bug #34 terbukti analog, mungkin lebih efisien bundle dengan bug #31 karena sama-sama cross-cutting pattern-wide
- Alternatively: standalone Section M5 kalau Dropping scope cukup besar

**Status:** 🔍 INVESTIGATION SCHEDULED — not yet bug, candidate discovery from M4 business owner clarification.

> **⚠️ CORRECTION (M5 investigation, Section M5 commits 1f400ab + 8986599 + 9f799e6 + this closure commit, 2026-04-18):**
>
> Investigation M5 Phase 1-3 verify code current state: Dropping service **TIDAK support parcel delivery**. Claim di M4 discovery note di atas adalah **future business intent**, BUKAN current code state. Evidence:
> - Zero parcel keywords (parcel/cargo/sender/recipient/barang/paket) di `DroppingBookingPersistenceService` + `DroppingBookingDraftService`
> - `category='Dropping'` hardcoded single value (no variant)
> - `passenger_count=6` hardcoded + `selected_seats=['1A','2A','2B','3A','4A','5A']` full-armada passenger group
> - UI wizard step `passengers.blade.php` (passenger semantic, bukan `package.blade.php`)
> - Customer integration ada (Regular-like, bukan Package-like no-Customer)
> - FormRequest `StoreDroppingBookingPassengersRequest` — passenger data only, zero parcel fields
>
> **Current state post-M5 (bug #34 RESOLVED):** Dropping = passenger group drop-off service dengan whole-armada reservation (6 seat). Bug #27 analog DID apply untuk wizard back-edit bypass **slot change** scenario (narrower scope dari Package karena hardcoded seats + single-variant). Bug tracked sebagai bug #34 di bug list di atas — ✅ RESOLVED Section M5.
>
> **Future parcel Dropping support:** Tracked sebagai feature request di **Future Features (Out-of-Scope Fase 1A)** section di bawah — bukan bug, out-of-scope Fase 1A.
>
> **Schedule revisi:** "Sebelum atau bersama bug #31" scenario obsolete — M5 sudah resolved bug analog (bug #34) standalone section. Bug #31 cross-cutting fix sekarang tetap next session per sequential ordering, scope 4 wizard+admin service pattern-wide.

---

## Future Features (Out-of-Scope Fase 1A)

### Parcel Dropping Support

**Origin:** Business owner clarification M4 session (initially framed as current-state discovery di M4 Discovery note above, corrected via M5 investigation — Dropping service current state adalah passenger-only).

**Desired behavior:** Extend Dropping service untuk support parcel delivery analog Package Besar:
- Sender/recipient fields (nama, HP, alamat)
- Size variant Besar/Kecil/Sedang dengan requires_seat flag
- Seat allocation untuk parcel Besar mode (1 seat)
- Parcel-only slot (tidak full 6-seat armada reservation — beda use-case dari passenger group drop-off existing)

**Current state (post-M5):** Not implemented. `DroppingBookingPersistenceService` hardcoded passenger-only semantics:
- `category='Dropping'` single value (no variant)
- `passenger_count=6` hardcoded, `selected_seats=['1A','2A','2B','3A','4A','5A']`
- Customer integration passenger-based (resolve primary + per-passenger)
- UI wizard step: `passengers.blade.php` (no parcel form fields)
- FormRequest `StoreDroppingBookingPassengersRequest` — passenger data only

**Scope estimate kalau di-implement:**
- **Schema decision:** Add `parcel_type` enum column OR split service jadi `Dropping` (passenger) + `ParcelDropping` (goods) — design decision butuh business owner input
- **Service adaptation:** Mirror Package M4 pattern (tuple dengan `parcel_size` dimension, 3-transition handling untuk variant Besar↔Kecil/Sedang)
- **UI extension:** Extend wizard blade dengan step "jenis layanan" (passenger group vs parcel) + form fields sender/recipient per parcel
- **Integration decision:** Share `booking_seats` pool dengan Package OR separate pool (UNIQUE constraint consideration — Package Besar 5A di slot X kontra Dropping parcel 5A di slot X = SeatConflict atau independent?)
- **Test coverage:** Smoke set mirror M4 Package (9-ish test) + cross-service conflict scenarios

**Dependency:** Business decision kapan feature ini needed. Priority Q2-Q3 2026? Timing depends on business priority list.

**Status:** 📋 FEATURE REQUEST — not scheduled, awaiting business prioritization. Out-of-scope Fase 1A.

---

## M-Series Complete Summary

Post-M5 milestone — wizard back-edit + admin update/delete path protection lengkap untuk 4 consumer wizard service + 1 admin API service (5 total).

### Recap per Section

**M1 (Section) — BookingManagementService admin path (commit 812a67d + 080f542 + 68eec79 + c127289):**
- Bug #21 RESOLVED: `updateBooking` bypass seat locking → add release+relock + paid guard via `SeatLockReleaseNotAllowedException`
- Bug #29 RESOLVED: `deleteBooking` orphan `booking_seats` → pre-release audit fields + hard lock guard
- Dual-render `SeatLockReleaseNotAllowedException` (HTTP 403 JSON untuk API, exception propagate untuk non-JSON)
- Scope: Admin API path

**M2 (Section) — Regular wizard path (commit 9b2e551 + 2bd10af + f8a6b3a + 8304651 + d65c085):**
- Bug #22 RESOLVED: `RegularBookingPersistenceService.persistDraft` wizard re-invoke bypass → Pattern A 5-field tuple compare + release+relock + paid guard via `WizardBackEditOnPaidBookingException`
- Bug #32 REGISTER (discovery): fallback `persistPaymentSelection ?? persistDraft` missing `$actor` post-signature-change → tracked, fix di M3
- Bug #31 REGISTER (sister bug): `persistPaymentSelection` never calls `promoteToHard` pattern-wide → tracked, scheduled post-M-series
- Infrastructure: `WizardBackEditOnPaidBookingException` (new exception) + dual-render (HTTP 409 JSON + Blade wizard redirect+flash), `SeatConflictException` dual-render extension
- Scope: Regular wizard path

**M3 (Section) — Rental wizard path + retroactive M2 fallback fix (commit 0818f42 + 969ab01 + 491b709):**
- Bug #25 RESOLVED: `RentalBookingPersistenceService.persistDraft` wizard back-edit bypass → Pattern A multi-day range tuple compare + `expandRangeToSlots` helper + release+relock + paid guard (category `'Rental'`)
- Bug #32 RESOLVED atomic: retroactive fix Regular fallback (commit 0818f42 bundle) + preventive fix Rental fallback same commit (pattern PREVENTIVE introduced)
- Scope: Rental wizard path + Regular retroactive + Rental preventive

**M4 (Section) — Package wizard path + bug #32 PREVENTIVE bundle confirmed (commit 02f27ff + c058085 + c3ce9ab):**
- Bug #27 RESOLVED: `PackageBookingPersistenceService.persistDraft` wizard back-edit bypass → Pattern A **6-field tuple** (parcel-aware, `package_size` dimension distinct) + **3-transition handling** (T1 seat change, T2 mode downgrade release-only, T3 mode upgrade lock-fresh, T4 identical no-op) + paid guard (category `'Paket'`)
- Bug #32 PREVENTIVE bundle confirmed atomic: Package fallback fix bundled dengan bug #27 di M4 Commit 1 (pattern PREVENTIVE work as designed — no bug #33 introduced)
- DR-1 ACCEPTED: Package no-Customer-link design (parcel sender ≠ passenger loyalty target, business owner clarification)
- Discovery: Dropping parcel delivery support (M4 business owner clarification — corrected M5 investigation, reclassified sebagai future feature)
- Scope: Package wizard path

**M5 (Section) — Dropping wizard path + bug #34 register+resolve atomic + bug #32 PREVENTIVE 3rd application (commit 1f400ab + 8986599 + 9f799e6):**
- Bug #34 REGISTERED + RESOLVED atomic: `DroppingBookingPersistenceService.persistDraft` wizard back-edit bypass → Pattern A **5-field tuple** (analog M2 Regular, NO `package_size` dimension karena Dropping single-variant passenger group) + slot change only scenario (seat change N/A, hardcoded 6-seat full armada) + paid guard (category `'Dropping'`)
- Bug #32 PREVENTIVE bundle 3rd successful application: Dropping fallback fix bundled atomic dengan bug #34 di M5 Commit 1 (no bug #35 introduced, Pattern PREVENTIVE work as designed 3× now — M3 + M4 + M5)
- M4 Discovery Correction: Dropping parcel delivery support claim corrected — current code passenger-only, parcel future feature tracked di Future Features section
- Scope: Dropping wizard path + M4 discovery correction

### Total Deliverables (M1+M2+M3+M4+M5)

**Bugs RESOLVED via M-series (9 total):**
- bug #21 (M1) — BookingManagementService.updateBooking bypass
- bug #29 (M1) — BookingManagementService.deleteBooking orphan seats
- bug #22 (M2) — RegularBookingPersistenceService wizard re-invoke bypass
- bug #25 (M3) — RentalBookingPersistenceService wizard back-edit bypass
- bug #27 (M4) — PackageBookingPersistenceService wizard back-edit bypass
- bug #34 (M5) — DroppingBookingPersistenceService wizard back-edit bypass
- bug #32 (M3 + M4 + M5) — persistPaymentSelection fallback missing `$actor` (Regular retroactive + Rental preventive + Package preventive + Dropping preventive)
- bug #31 REGISTERED (M2 discovery, not yet resolved) — `promoteToHard` never called pattern-wide, scope expanded post-M5
- bug #32 DISCOVERED (M2 discovery, resolved M3+M4+M5) — same entry, bundled resolution

**Services hardened (4 wizard + 1 admin):**
1. BookingManagementService (M1) — admin API update/delete
2. RegularBookingPersistenceService (M2) — passenger wizard
3. RentalBookingPersistenceService (M3) — multi-day rental wizard
4. PackageBookingPersistenceService (M4) — parcel wizard
5. DroppingBookingPersistenceService (M5) — passenger group drop-off wizard

**Exception infrastructure:**
- `WizardBackEditOnPaidBookingException` (M2) — dual-render HTTP 409 / Blade redirect, category-aware (`Regular`|`Rental`|`Package`|`Dropping`, 4 categories wired post-M5), reuse lintas 4 wizard service
- `SeatLockReleaseNotAllowedException` (M1, pre-existing extended) — dual-render HTTP 403 JSON
- `SeatConflictException` (pre-existing, M2 dual-render extension) — HTTP 409 JSON + Blade redirect+flash `wizard_seat_conflict`

**Test coverage (29 smoke test total):**
- M2 Regular (`RegularBookingPersistenceServiceTest`): 7 smoke (create guard, Pattern C no-op, seat change, slot change, paid guard, reason format, bug #32 fallback regression) — commit d65c085 + extension di M3
- M3 Rental (`RentalBookingPersistenceServiceTest`): 7 smoke (create guard, Pattern A no-op, range extend/shift/shrink, paid guard, reason format) — commit 491b709
- M4 Package (`PackageBookingPersistenceServiceTest`): 9 smoke (create guard Besar, T4 identical no-op Besar + Kecil, T1/T2/T3 transitions, paid guard, bug #32 fallback, reason format) — commit c3ce9ab
- M5 Dropping (`DroppingBookingPersistenceServiceTest`): 6 smoke (create guard 6-seat, slot identical no-op, slot change, paid guard, bug #32 fallback, reason format) — commit 9f799e6
- **Total: 7 + 7 + 9 + 6 = 29 smoke test.**

### Next Session — Bug #31 Cross-Cutting Fix

Per sequential ordering decision: **bug #31 (promoteToHard never called pattern-wide)** adalah natural next step post-M-series complete. Rationale:
- M-series hard lock guards di M1 + M2 + M3 + M4 + M5 tidak efektif pre-bug-#31 fix (no booking punya `lock_type='hard'` di production)
- Payment_status-based guards (e.g., M4/M5 `WizardBackEditOnPaidBookingException` pre-check) independen bug #31, jadi M-series tetap partially effective
- Bug #31 scope post-M5 = **4 wizard service** add `$this->seatLockService->promoteToHard($booking)` di `persistPaymentSelection` setelah paid transition (Regular + Rental + Package + Dropping), plus downstream efek di BookingManagement admin guards
- Pattern cross-cutting — bisa dibundle single commit atau sequential 4 commit mirror M-series approach

**Alternative ordering candidate (DONE):** Dropping parcel delivery investigation (M5 completed) — bug #34 register+resolved atomic, M4 discovery corrected. No remaining M-series open items.

**Decision:** Architect decide di session berikutnya (sekarang M5 + M-series closure).

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
