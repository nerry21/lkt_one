# LKT One — Backend Booking Travel JET

## Ringkasan Bisnis
Aplikasi web internal untuk operasi harian JET Travel — perusahaan travel mobil di Riau dengan rute utama Pekanbaru ↔ Pasirpengaraian dan sekitarnya. Menangani booking regular, dropping, rental, paket, stock snack/air mineral, dashboard admin, dan e-ticket.

Admin utama: Bu Bos. Admin sekunder: Admin Zizi.

## Stack Teknis
- **Framework**: Laravel 12
- **PHP**: 8.2+
- **Database**: MySQL 8 (BUKAN SQLite — jangan pernah asumsikan SQLite)
- **Frontend saat ini**: Blade + Tailwind CSS
- **Frontend target**: React (fase berikutnya, belum dikerjakan)
- **PDF**: barryvdh/laravel-dompdf
- **QR**: simplesoftwareio/simple-qrcode
- **Auth**: JWT custom (sedang migrasi ke firebase/php-jwt)
- **Hosting saat ini**: Hostinger shared (akan migrasi ke VPS)
- **OS development**: Windows 11 + VS Code + MINGW64 terminal

## Struktur Project

```
app/
├── Http/Controllers/      # Page & API controllers
│   ├── Api/              # REST API untuk Flutter/React
│   └── [domain]/         # Page controllers per fitur
├── Http/Requests/        # Form Request validation per domain
├── Http/Middleware/      # Custom middleware (JWT, role)
├── Models/               # Eloquent models
└── Services/             # Business logic (WAJIB pakai service pattern)

database/migrations/      # 44 migration files
resources/views/          # 98 Blade templates
routes/
├── web.php              # Page routes
├── api.php              # API routes
└── auth.php             # Auth routes
```

## Domain Models Utama
- **Booking**: god object dengan 68 fillable fields (perlu refactor, tapi belum sekarang)
- **BookingPassenger**: penumpang per booking
- **BookingArmadaExtra**: armada tambahan untuk booking
- **Customer / CustomerAlias / CustomerMerge / CustomerNameAlias**: sistem deduplication customer
- **CustomerSurvey**: survey kepuasan
- **Departure**: keberangkatan aktual
- **Driver**: data driver
- **Keberangkatan**: jadwal keberangkatan
- **Mobil**: armada
- **Stock**: stock snack & air mineral per keberangkatan
- **TicketBackup**: backup e-ticket PDF
- **PaymentAccount**: rekening pembayaran

## Services Utama (25 total)
- `BookingManagementService` — orchestrator booking
- `RegularBookingService` / `DroppingBookingService` / `RentalBookingService` / `PackageBookingService` — per jenis booking
- `*PersistenceService` — save logic per jenis booking (DB transaction di sini)
- `*DraftService` — draft/wizard state
- `CustomerResolverService` / `CustomerMatchingService` / `CustomerMergeService` — dedup logic
- `ETicketPdfService` — generate PDF tiket
- `DashboardStatisticsService` — agregasi laporan
- `JwtService` — JWT custom (target refactor)
- `StockAllocationService` — alokasi stock per trip
- `TransportCalculationService` — kalkulasi pendapatan transport

## Bug Kritis Diketahui (Prioritas Fix)

### 🔴 KRITIS
1. **Race condition seat booking**: Tidak ada `lockForUpdate()` atau `sharedLock()` di seluruh codebase. Kalau 2 customer booking seat yang sama bersamaan, keduanya bisa sukses. Fix di `BookingManagementService::persistBooking()` dan semua `*PersistenceService`.

2. **Database default masih SQLite**: `config/database.php` baris `'default' => env('DB_CONNECTION', 'sqlite')`. Harus ganti default ke `mysql`. Migration `2026_03_12_000009_force_rebuild_empty_transport_tables.php` pakai `PRAGMA foreign_keys = OFF` (SQLite-only syntax) — harus direfactor untuk MySQL.

3. **JWT custom pakai hash_hmac manual**: `app/Services/JwtService.php`. Tidak timing-safe, tidak ada `nbf`/`iss`/`aud` validation, tidak ada refresh token. Ganti ke `firebase/php-jwt` library.

4. **Tidak ada validasi seat availability sebelum persist**: Tidak ada service yang cek "seat kosong?" sebelum insert. Kombinasikan dengan poin #1 = high risk double booking.

### 🟡 PENTING
5. **Model Booking god object**: 68 fillable fields. Refactor bertahap — minimal pecah `booking_seats` jadi tabel relasional dengan `UNIQUE(departure_id, seat_number)` constraint.

6. **Test coverage minim**: Hanya 16 test file, kebanyakan Breeze default. Butuh test untuk booking flow, race condition, payment transition.

7. **Migration chain mencurigakan**: Ada migration `align_transport_source_schema`, `align_runtime_transport_tables`, `force_rebuild_empty_transport_tables` — mengindikasikan schema drift di masa lalu. Perlu clean baseline untuk deploy VPS baru.

8. **File storage default `local`**: E-ticket, QR, bukti pembayaran di `storage/app/`. Perlu migrasi ke S3-compatible (Cloudflare R2 / MinIO) sebelum scale ke multi-server.

### 🟢 MINOR
9. `BookingController` 458 baris, `CustomerController` 357 baris — refactor ke sub-service
10. Tidak ada rate limiting di API routes
11. Tidak ada API versioning (`/api/bookings` vs `/api/v1/bookings`)
12. CORS config belum dicek untuk React frontend

## Preferensi Coding Saya

### Gaya Kode
- Ikuti **PSR-12** dan Laravel convention
- **Service pattern wajib**: logika bisnis di `app/Services/`, JANGAN di Controller
- Controller hanya untuk: validasi (via Form Request), panggil service, return response
- DB transaction di Service, bukan di Controller
- Type hint dan return type selalu diisi (PHP 8.2+ features)
- Readonly properties untuk DTO/payload

### Naming
- Tabel & kolom: `snake_case` (contoh: `booking_seats`, `trip_date`)
- Class: `PascalCase`
- Method: `camelCase`
- Comment dalam Bahasa Indonesia boleh untuk konteks bisnis

### Output Format
- **Selalu tulis file lengkap**, bukan diff atau patch
- Kalau Anda (Claude Code) perlu edit banyak file, tunjukkan daftar file yang akan diubah dulu sebelum edit
- Jalankan `php artisan test` setelah fix kritis untuk verifikasi
- Commit pakai prefix: `fix:`, `feat:`, `refactor:`, `test:`, `chore:`

### Testing
- Test kritis WAJIB untuk setiap fix di bug merah
- Pakai Feature test untuk flow end-to-end, Unit test untuk service isolated
- Test race condition pakai parallel execution (2 proses bersamaan)
- Sebelum commit: `php artisan test` harus hijau semua

### Database
- MySQL 8 only (bukan SQLite)
- Setiap perubahan schema via migration baru (jangan modify migration lama yang sudah di production)
- Foreign key dan index wajib untuk kolom yang sering di-query
- `UNIQUE` constraint untuk data yang secara bisnis harus unik (contoh: seat per departure)

### Security
- JANGAN commit `.env`, `firebase-service-account.json`, atau file credentials apapun
- Rate limit API routes yang expose ke public
- Input validation WAJIB via Form Request (bukan di Controller)
- Pakai `$fillable` (whitelist), JANGAN `$guarded = []`
- SQL query pakai parameter binding atau Eloquent (jangan string concatenation)

## Environment & Deployment
- **Development**: Windows 11 laptop, VS Code, MINGW64
- **Current production**: Hostinger shared hosting (spesial.online) — akan decommissioned
- **Target production**: VPS (Biznet Gio / DigitalOcean SG / Hetzner) dengan Nginx + PHP-FPM + MySQL 8 + Redis + Supervisor
- **Queue**: saat ini `sync` (Hostinger tidak ada worker), target `redis` di VPS

## Admin Contacts & Multi-Admin Routing
- **Bu Bos**: primary admin — terima semua notifikasi booking
- **Admin Zizi**: secondary admin — terima notifikasi setelah Bu Bos
- Config: `config/chatbot.php` → `admin_phones` array dari `JET_ADMIN_PHONES` env

## Integrasi Masa Depan (Belum Dikerjakan)
- **Chatbot AI** (project terpisah): akan konsumsi endpoint `/api/internal/v1/*` di LKT One
- **Website React**: customer-facing booking, akan konsumsi API public
- **Mobile app Flutter/iOS**: customer booking + admin omnichannel (WhatsJet existing)
- **Payment gateway**: Midtrans (rencana fase 3)

## Prinsip Pengerjaan
1. **Fix bug kritis dulu** sebelum tambah fitur baru
2. **Test setiap perubahan** — jangan skip test untuk "cepat"
3. **Commit kecil, sering** — jangan 500 perubahan dalam 1 commit
4. **Backup database sebelum migrate** — selalu
5. **Stuck > 1 jam di 1 masalah** → pause, review approach, jangan brute force
6. **Jangan commit parallel dari VS Code/editor lain di tengah sesi Claude Code CLI** —
   - Kalau butuh save-point sementara: pakai `git stash`, bukan commit
   - Kalau memang perlu commit manual: bilang Claude Code di chat ("saya barusan commit X
     dengan message Y") supaya state sinkronisasi
   - Lebih baik: minta Claude Code yang commit dengan message convention yang proper
   - Dummy message (`asdfgh`, `test123`, `iuiujiujuj`, dll) harus di-reword sebelum branch
     di-push, atau langsung di-reword di commit berikutnya

## File yang SANGAT PENTING (Jangan Break)
- `app/Services/BookingManagementService.php` — inti logika booking
- `app/Services/ETicketPdfService.php` — generate e-tiket
- `app/Services/DashboardStatisticsService.php` — sumber data dashboard
- `app/Http/Controllers/Api/BookingController.php` — API utama (458 baris)
- `database/migrations/` — hati-hati saat modify, jangan edit migration lama yang sudah di production
- `config/chatbot.php` — admin routing
- `.env` — JANGAN PERNAH commit atau tampilkan isinya

## Kalau Ragu
- Tanya dulu sebelum bikin perubahan besar (>3 file)
- Kalau menyentuh `Booking` model atau migration kritis, konfirmasi dulu
- Kalau butuh install package baru, jelaskan alasannya dan dampaknya

## Progress Log

### 2026-04-17 — Fase 1A-Pre selesai
- Fix migration SQLite PRAGMA (2 archived oleh user sebelum sesi: `align_runtime_transport_tables`, `force_rebuild_empty_transport_tables`)
- Fix MariaDB strict mode (2 migration: `ticket_backups.backed_up_at` + `customer_merges.merged_at` → `->useCurrent()`)
- Cleanup test suite (9 file Breeze default dihapus — codebase pakai JWT custom)
- Test baseline: 42 passed, 4 known Booking failures (disengaja tidak disentuh untuk Fase 1A)
- Database `hitungan_lkt` clean dengan 23 tabel, `migrate:fresh` hijau
- Ringkasan detail: `docs/phase-1a-pre-summary.md`
- Fase selanjutnya: **Fase 1A proper** (seat locking + race condition fix) — plan sudah di-approve, Q1–Q8 klarifikasi perlu dijawab sebelum eksekusi Checkpoint 1
