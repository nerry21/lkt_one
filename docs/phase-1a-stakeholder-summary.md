# Update Sistem LKT One — Fase 1A Seat Locking

**Tanggal kompilasi:** April 2026  
**Target deploy:** Weeknight (malam hari kerja, Senin-Rabu, 21:00-23:00 WIB)  
**Untuk:** Bu Bos, Bu Nos, Admin Zizi  
**Dari:** Nerry (developer)

---

## Ringkasan

Sistem booking LKT One akan mendapat update besar untuk mencegah konflik kursi (double-booking) dan memperbaiki beberapa celah terkait alur pembayaran dan status booking. Update ini sudah dikerjakan selama beberapa bulan terakhir dan siap diterapkan ke website produksi.

## Perubahan Utama

### 1. Pencegahan Double-Booking Kursi

**Masalah sebelumnya:** Kalau dua customer pesan kursi yang sama di waktu hampir bersamaan, bisa terjadi konflik — kursi terbooking dua kali.

**Setelah update:** Sistem akan otomatis mengunci kursi sementara saat customer pilih kursi di wizard (soft lock, 15-30 menit). Kalau pembayaran konfirmasi, kunci jadi permanen (hard lock). Kalau customer batal atau timeout, kunci dilepas otomatis.

**Dampak bagi admin:** Tidak ada perubahan workflow. Cuma kalau coba edit/hapus booking yang sudah terbayar, sistem akan tolak dengan pesan jelas ("kursi sudah terbayar, tidak bisa diubah").

### 2. Penyeragaman Status Pembayaran

**Masalah sebelumnya:** Status pembayaran ada 2 istilah yang sebenarnya sama — "Lunas" (dipakai admin saat konfirmasi transfer) dan "Dibayar" (dipakai wizard customer). Ini bikin laporan dashboard kadang tidak akurat.

**Setelah update:** Hanya pakai istilah "Dibayar" (transfer/QRIS) dan "Dibayar Tunai" (cash). Istilah "Lunas" dipensiunkan.

**Dampak bagi admin:**
- Dropdown status di halaman booking management tidak lagi menampilkan "Lunas" — ganti ke "Dibayar"
- Tombol konfirmasi pembayaran saat verify transfer masih berjudul "Konfirmasi Lunas" (istilah lokal), tapi status yang disimpan jadi "Dibayar"
- Semua booking lama yang tadinya "Lunas" otomatis diubah jadi "Dibayar" (tidak ada data yang hilang)
- Dashboard count pembayaran jadi lebih akurat (sebelumnya lewatkan baris dengan status "Lunas")

### 3. Pencegahan Nomor Invoice/Tiket Duplikat

**Masalah sebelumnya:** Sistem generate nomor invoice dan tiket secara random — ada risiko kecil (jarang) dua booking dapat nomor yang sama.

**Setelah update:** Database otomatis tolak nomor duplikat di level paling dasar. Kalau terjadi collision (langka sekali), customer akan dapat error dan bisa retry — tidak ada data corruption silent.

**Dampak bagi admin:** Tidak terlihat langsung. Peningkatan keandalan di background.

---

## Persiapan Sebelum Deploy

### Tindakan dari Nerry

1. Backup database produksi lengkap
2. Audit data duplikat nomor invoice/tiket
3. Koordinasi waktu deploy dengan Bu Bos / Admin Zizi
4. Deploy di malam hari kerja (sepi traffic)

### Tindakan dari Admin

**Saat deploy berlangsung (estimasi 20-40 menit):**
- Website bisa tidak accessible sebentar — customer lihat maintenance atau error sementara
- Admin jangan login/edit booking saat deploy
- Kalau customer komplain: info "website maintenance sebentar, coba lagi 30 menit"

**Setelah deploy:**
- Test login admin, akses halaman booking management — pastikan semua terlihat normal
- Test satu transaksi end-to-end kalau bisa
- Kalau ada anomali, langsung kontak Nerry

---

## Rollback (Kalau Deploy Bermasalah)

Sistem punya backup lengkap database + code versioning:
- Maksimum recovery time: 30 menit
- Data customer yang sudah ada tidak akan hilang
- Worst case: system roll back ke state sebelum update, deploy bisa retry

---

## Timeline

1. **Persiapan (selesai):** Code update, testing, dokumentasi — 4 bulan (Desember 2025 - April 2026)
2. **Merge ke main branch (sesi ini):** Finalisasi code untuk production
3. **Deploy ke production (target: weeknight minggu depan):** 20-40 menit execution
4. **Monitor post-deploy:** 1-2 hari observasi

---

## Pertanyaan / Feedback

Kalau Bu Bos / Bu Nos / Admin Zizi ada concern, silakan kontak Nerry langsung via WhatsApp.

**Approval untuk deploy:** Pending dari Bu Bos / Bu Nos — kontak informal kalau needed, atau Nerry execute di deploy window.

---

## Template Pesan WhatsApp (Optional)

Halo Bu Bos, mau kasih info:

Saya rencana deploy update sistem LKT One di [hari, tanggal] sekitar jam 21:00-22:00 malam. Update besar — ada peningkatan sistem booking supaya lebih aman dari double-booking dan penyeragaman istilah status pembayaran (detail di doc terpisah).

Saat deploy, website mungkin tidak accessible sekitar 20-40 menit. Kalau ada customer komplain, info aja "maintenance sebentar, coba lagi nanti".

Kalau ada issue, saya langsung respond. Kalau OK untuk jadwal ini, saya proceed.

Trims, Nerry
