# Mona · Money Navigator

Website untuk aplikasi Mona, pencatat uang dengan asisten Lisa. Dibuat oleh Rakit Lab.

Seluruh situs ada di satu file, `index.html`, ditambah foto lukisan di `assets/mona-lisa.jpg`. Tidak ada build, tidak ada dependensi.

## Isi halaman

Halaman berupa tumpukan map bertab. Tiap map punya `id` yang dipakai menu navigasi.

| No | id | Isi |
| -- | -- | -- |
| 01 | `sampul` | Animasi sebelum dan sesudah, ajakan ikut uji coba |
| 02 | `buku` | Kalender September 2026 yang bisa dijelajahi |
| 03 | `catat` | Lisa mini: suara, ketik, foto struk, notifikasi bank |
| 04 | `arsip` | Spreadsheet lama lawan empat map Mona (Dompet, Investasi, Kewajiban, Neraca) |
| 05 | `bersama` | Space bersama di atas lukisan asli; empat peran dengan inisial, izin per peran |
| 06 | `cocok` | Enam situasi: pilih satu di daftar, panel kanan berisi tiga angka dan contoh catatan |
| 07 | `cerita` | Buku cerita yang dibuka halaman demi halaman: Mona Lisa, Mona, Lisa, papan inspirasi UI, penutup |
| 08 | `harga` | Dua kartu paket (Gratis, Pro) dan tabel 18 fitur per kelompok |
| 09 | `tanya` | Enam janji privasi dan FAQ akordeon; jawaban diketik di layar Lisa |
| 10 | `gabung` | Pendaftaran uji coba tertutup |

Kalau menambah atau memindah map, perbarui tiga tempat: nomor di `.tab`, daftar di `#nsel` (menu desktop), dan daftar di `#nsheet` (menu HP).

## Menjalankan di komputer

Buka `index.html` langsung di browser, atau:

```sh
npx serve .
```

Font (Inter Tight, IBM Plex Mono) dimuat dari Google Fonts, jadi perlu koneksi internet agar tampilannya persis.

## Deploy

Situs statis, cocok untuk Vercel:

1. Import repo ini di Vercel.
2. Framework preset: **Other**. Kosongkan build command dan output directory.
3. Deploy. `vercel.json` hanya menambah header keamanan dan `cleanUrls`.

## Bahasa

Bawaan bahasa Inggris, tombol EN / ID di menu atas. Pilihan disimpan di `localStorage` (`mona-lang`), dan `?lang=id` atau `?lang=en` di URL ikut dihormati.

Teks sumber di HTML dan JS tetap bahasa Indonesia. Kamus `I18N` di awal skrip memetakan teks utuh Indonesia ke Inggris, lalu penerjemah kecil menukar teks dan atribut (`aria-label`, `title`, `placeholder`, `data-a`, `data-t`, `data-n`, `data-k`, `data-idle`) saat halaman dimuat dan setiap kali isi berubah. Teks yang diketik huruf demi huruf, teks di kanvas, dan contoh kalimat Lisa memakai `__('…')` supaya langsung muncul dalam bahasa yang benar.

Menambah teks baru: tulis dalam bahasa Indonesia seperti biasa, lalu tambahkan pasangan `"teks Indonesia":"English text"` ke `I18N`. Kunci harus sama persis dengan isi teks (tanpa spasi di ujung).

## Catatan desain

- Mengikuti aplikasi Mona: sudut 0, sel bergaris rambut 1px yang saling menempel (tanpa celah dan bayangan), tab map miring, label mono, angka dengan ribuan terakhir abu-abu. Catatan Lisa memakai pita sage (`--sage`), layar LCD hitam hanya untuk wajah Lisa.
- Lapisan `RIGID v3` di akhir `<style>` menimpa gaya lama; ubah di sana dulu.
- Jarak: map memakai `--sp` (atas/bawah) dan `--px` (samping); judul bagian selalu berjarak 40px ke isi.
- Semua warna ada sebagai variabel CSS di `:root`. Halaman memakai satu tema terang.
- Ikon digambar sebagai `<symbol>` SVG di bagian atas file (grid 24, garis 1,6).
- Wajah Lisa digambar dari 16 × 8 titik oleh JavaScript. Sengaja hanya muncul di logo, Lisa mini, kartu notifikasi, dan dua halaman buku tentang Lisa.
- Skala huruf mengikuti aplikasi: isi 15px, tombol 14px, judul `clamp(28px, 3.5vw, 48px)`, label mono kecil huruf kapital, garis rambut 0,8px.
- Avatar peran di Space berupa inisial di kotak warna (`.av`, warna per `data-r`).
- Buku di map 07 memakai `data-bk` pada tombol untuk melompat ke bab. Di layar sempit (860px ke bawah) buku jadi satu halaman per layar. Bisa digeser, dan panah kiri/kanan di keyboard juga jalan.
- Animasi mengikuti `prefers-reduced-motion`: ketikan dan balik halaman langsung selesai.
