# Pekanbaru Transit Management System - PRD

## Original Problem Statement
Sistem manajemen transportasi untuk pengelolaan armada Pekanbaru dengan fitur:
- Halaman login premium dengan email dan password
- Dashboard dengan statistik keberangkatan, Uang PC, dan Pendapatan Mobil
- Sidebar: Dashboard, Data Keberangkatan Pekanbaru, Data Driver, Data Mobil
- Data Keberangkatan: Hari, Tanggal, Tahun, Kode Mobil, Driver, Jumlah Penumpang, Tarif Penumpang, Jumlah Paket, Uang Paket, Uang PC, Uang Bersih, Trip Ke
- Data Driver: Nama Driver, Lokasi Tempat Tinggal
- Data Mobil: Kode Mobil, Jenis Mobil (Reborn/Hiace)
- Perhitungan: Uang PC = 15% dari (Uang Penumpang + Uang Paket), Uang Bersih = 85%

## User Choices
- Autentikasi: JWT-based custom auth
- Bahasa: Indonesia
- Tema: Hijau dengan gradasi
- Data: Dummy data
- Fitur tambahan: Export CSV, Charts, Filter, Search, Pagination

## User Personas
1. **Admin/Manager** - Mengelola semua data armada, driver, dan keberangkatan
2. **Operator** - Input data keberangkatan harian

## Core Requirements
- [x] Login/Register dengan JWT
- [x] Dashboard dengan statistik real-time
- [x] CRUD Data Keberangkatan dengan perhitungan otomatis
- [x] CRUD Data Driver
- [x] CRUD Data Mobil
- [x] Charts (Line & Bar)
- [x] Export CSV
- [x] Search & Filter
- [x] Pagination

## What's Been Implemented (January 2026)

### Backend (FastAPI + MongoDB)
- JWT Authentication (login/register)
- Full CRUD APIs for Keberangkatan, Driver, Mobil
- Statistics endpoint for dashboard
- Export CSV endpoints
- Automatic calculation of Uang PC (15%) and Uang Bersih (85%)
- Seed dummy data endpoint

### Frontend (React + Tailwind + Shadcn UI)
- Premium login page dengan split-screen design
- Dashboard dengan statistik cards dan charts (Recharts)
- Data Keberangkatan page dengan full CRUD, calendar picker
- Data Driver page dengan CRUD
- Data Mobil page dengan CRUD dan filter jenis
- Responsive sidebar navigation
- Green gradient theme (Emerald Prestige)
- Indonesian language interface
- Toast notifications (Sonner)

## Prioritized Backlog

### P0 (Critical) - DONE
- [x] Authentication flow
- [x] Dashboard statistics
- [x] CRUD operations

### P1 (High) - Potential Enhancements
- [ ] PDF Export (currently CSV only)
- [ ] Date range filter for keberangkatan
- [ ] Dashboard period selector (daily/weekly/monthly)

### P2 (Medium) - Nice to Have
- [ ] Role-based access control
- [ ] Print functionality
- [ ] Email reports

## Next Tasks
1. Implement PDF export functionality
2. Add date range filter for data keberangkatan
3. Add period selector on dashboard (daily/weekly/monthly)
4. Consider adding user management for multiple operators
