# corner-uin

Starter project React + TypeScript + Vite untuk portal yang memiliki:
- Landing page
- Login
- Sunda Islam Corner
- Sunan Gunung Djati Corner
- Detail koleksi
- Koleksi tersimpan
- Request access
- Profil pengguna

## Menjalankan project

```bash
npm install
npm run dev
```

Lalu buka alamat localhost yang diberikan Vite.

## Alur kerja yang disarankan

Bangun halaman satu per satu:
1. LandingPage
2. LoginPage
3. SundaIslamPage
4. SGDPage
5. CollectionDetailPage
6. SavedCollectionsPage
7. AccessRequestPage
8. ProfilePage

Folder `public/images/` disiapkan untuk logo, foto perpustakaan, cover buku, dan aset visual lain.

Catatan: data saat ini hanya mock/demo. Belum ada backend/API/login sungguhan.


## Update Landing Page
LandingPage.tsx dan landing.css sudah dibuat berdasarkan mockup landing portal yang dipilih. Asset landing sementara ada di `public/images/landing/` dan dapat diganti kapan saja tanpa mengubah struktur komponen.
