# Mona · Money Navigator

Website untuk aplikasi Mona, pencatat uang dengan asisten Lisa. Dibuat oleh Rakit Lab.

Seluruh situs ada di satu file, `index.html`. Tidak ada build, tidak ada dependensi.

## Isi halaman

Halaman berupa tumpukan map bertab. Tiap map punya `id` yang dipakai menu navigasi.

| No | id | Isi |
| -- | -- | -- |
| 01 | `sampul` | Animasi sebelum dan sesudah, ajakan ikut uji coba |
| 02 | `buku` | Kalender September 2026 yang bisa dijelajahi |
| 03 | `catat` | Lisa mini: suara, ketik, foto struk, notifikasi bank |
| 04 | `arsip` | Tumpukan map arsip, lama lawan Mona |
| 05 | `bersama` | Space bersama; empat peran dengan avatar, izin per peran bisa dipilih |
| 06 | `cocok` | Enam situasi: pilih satu di daftar, panel kanan berganti (jalan otomatis, berhenti saat disentuh) |
| 07 | `cerita` | Buku cerita yang dibuka halaman demi halaman: Mona Lisa, Mona, Lisa, papan inspirasi UI, penutup |
| 08 | `harga` | Perbandingan paket Gratis dan Pro |
| 09 | `tanya` | Enam janji privasi dan FAQ akordeon; jawaban diketik di layar Lisa |
| 10 | `gabung` | Pendaftaran uji coba tertutup |

Kalau menambah atau memindah map, perbarui tiga tempat: nomor di `.tab`, daftar di `#nsel` (menu desktop), dan daftar di `#nsheet` (menu HP).

## Menjalankan di komputer

Buka `index.html` langsung di browser, atau:

```sh
npx serve .
```

Font (Inter Tight, IBM Plex Mono, DotGothic16) dimuat dari Google Fonts, jadi perlu koneksi internet agar tampilannya persis.

## Deploy

Situs statis, cocok untuk Vercel:

1. Import repo ini di Vercel.
2. Framework preset: **Other**. Kosongkan build command dan output directory.
3. Deploy. `vercel.json` hanya menambah header keamanan dan `cleanUrls`.

## Catatan desain

- Warna, garis, dan sudut mengikuti aplikasi Mona: kertas, tinta, label mono, layar LCD fosfor.
- Semua warna ada sebagai variabel CSS di `:root`. Halaman memakai satu tema terang.
- Ikon digambar sebagai `<symbol>` SVG di bagian atas file (grid 24, garis 1,6).
- Wajah Lisa digambar dari 16 × 8 titik oleh JavaScript di bagian bawah file.
- Skala huruf mengikuti aplikasi: isi 15px, tombol 14px, judul `clamp(28px, 3.5vw, 48px)`, label mono kecil huruf kapital, garis rambut 0,8px.
- Avatar peran di Space (`av-1` sampai `av-4`) adalah `<symbol>` SVG buatan sendiri, dipakai di panel peran dan di peta anggota.
- Buku di map 07 memakai `data-bk` pada tombol untuk melompat ke bab. Di layar sempit (860px ke bawah) buku jadi satu halaman per layar. Bisa digeser, dan panah kiri/kanan di keyboard juga jalan.
- Animasi mengikuti `prefers-reduced-motion`: ketikan dan balik halaman langsung selesai.
