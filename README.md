# Mona · Money Navigator

Website untuk aplikasi Mona, pencatat uang dengan asisten Lisa. Dibuat oleh Rakit Lab.

Seluruh situs ada di satu file, `index.html`, ditambah lima foto lukisan di `assets/`. Tidak ada build, tidak ada dependensi.

| Berkas | Dipakai di |
| -- | -- |
| `mona-lisa.jpg` | Animasi sampul (map 01), setelah catatan dibereskan |
| `mona-lisa-sad.jpg` | Animasi sampul (map 01), sebelum dibereskan — "Mona Lisa with soothing temple patches" |
| `last-supper.jpg` | Latar Space bersama (map 05), layar lebar |
| `last-supper-tall.jpg` | Latar Space bersama di layar ≤600px, potongan tegak |
| `creation-of-adam.jpg` | Latar map 10 |

## Isi halaman

Halaman berupa tumpukan map bertab. Tiap map punya `id` yang dipakai menu navigasi.

| No | id | Isi |
| -- | -- | -- |
| 01 | `sampul` | Animasi sebelum dan sesudah, ajakan ikut uji coba |
| 02 | `buku` | Kalender September 2026 yang bisa dijelajahi |
| 03 | `catat` | Lisa mini: suara, ketik, foto struk, notifikasi bank |
| 04 | `arsip` | Spreadsheet lama lawan empat map Mona (Dompet, Investasi, Kewajiban, Neraca) |
| 05 | `bersama` | Space bersama di atas Perjamuan Terakhir; empat peran dengan wajah piksel, izin per peran |
| 06 | `cocok` | Enam situasi: pilih satu di daftar, panel kanan berisi tiga angka dan contoh catatan |
| 07 | `cerita` | Buku cerita yang dibuka halaman demi halaman: Mona Lisa, Mona, Lisa, papan inspirasi UI, penutup |
| 08 | `harga` | Dua kartu paket (Gratis, Pro), lalu pemisah `.pt-sep` dan tabel 18 fitur per kelompok |
| 09 | `tanya` | Enam janji privasi dan FAQ akordeon; jawaban diketik di layar Lisa |
| 10 | `gabung` | Pendaftaran uji coba tertutup, di atas Penciptaan Adam; isi alamat, tombol kirim membuka email yang sudah terisi |

Kalau menambah atau memindah map, perbarui tiga tempat: nomor di `.tab`, daftar di `#nsel` (menu desktop), dan daftar di `#nsheet` (menu HP).

## Email undangan

Semua alamat di halaman memakai `info.rakitdev@gmail.com`, diambil dari satu tempat: isi `#addr` di map 10 (`MAILTO` di skrip).

Di map 10 pengunjung menulis alamat Google-nya, lalu menekan kirim. Tombolnya menyusun `mailto:` lengkap dengan judul dan badan surat yang sudah jadi — alamat yang tadi diketik ikut masuk ke dalamnya. Karena `mailto:` tidak selalu ada yang menangani (Gmail di browser, misalnya), ada dua jalan cadangan: **Buka di Gmail** yang memakai alamat compose Gmail web, dan **Salin isi emailnya** yang menyalin seluruh surat ke papan klip.

Judul dan badan suratnya ada di `tplSubject()` dan `tplBody()`, keduanya lewat `__()` jadi ikut bahasa yang sedang dipakai.

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
- Avatar peran di Space berupa wajah piksel 8 × 8, sekeluarga dengan arsip wajah di aplikasi. Mata, mulut, aksesori, warna piksel, dan latar diatur per peran di tabel `WAJAH`; warnanya dari `--ap` dan `--ab` per `data-r`.
- Buku di map 07 memakai `data-bk` pada tombol untuk melompat ke bab. Di layar sempit (860px ke bawah) buku jadi satu halaman per layar. Bisa digeser, dan panah kiri/kanan di keyboard juga jalan.
- Di map 01, sebelum catatan dibereskan yang tampil adalah `mona-lisa-sad.jpg`, lukisan versi murung dengan plester di pelipis. Potongan dan ukuran pikselnya dibuat sama persis dengan `mona-lisa.jpg`, jadi keduanya bisa dilarutkan satu ke yang lain di tempat yang sama tanpa bergeser. Larutannya berjalan antara detik 7,9 dan 9,3 (`SAD0`, `SAD1`); sesudah itu yang tersisa persis lukisan aslinya yang tersenyum. Dalam `prefers-reduced-motion` langsung yang tersenyum. Kalau menukar salah satu gambarnya, samakan dulu ukuran dan potongannya dengan yang lain.
- Kartu map di sampul (`drawFolders`) mengikuti kartu di aplikasi: sudut 0, tab miring dengan tepi kanan condong keluar ke bawah, lalu nomor mono kecil diikuti nama tebal. Label "Akhirnya senyum." otomatis turun ke bawah tumpukan kartu kalau posisinya bersinggungan.
- Tiap transaksi di map 02 punya satu lukisan kecil yang muncul di belakang isi selnya saat tanggalnya disorot. Gambarnya dibuat di dalam kode (`PLAK` di skrip, bahannya di `<defs>` awal halaman), bukan berkas gambar: satu dasar bercahaya dari kiri atas, satu set warna tanah, tepi dilembutkan, lalu retak vernis tipis. Menambah jenis baru cukup menambah satu entri di `PLAK` dengan nama yang sama dengan ikonnya, lalu memakai nama itu di kolom pertama `D`.
- Alur teks diatur dari CSS dan penerjemah, bukan dari spasi mati di HTML — kalau ditulis di HTML, kunci `I18N` jadi tidak cocok lagi. CSS memberi `text-wrap:pretty` untuk badan teks (baris terakhir tidak menyisakan satu kata) dan `text-wrap:balance` untuk judul dan label pendek. `poli()` di skrip merapikan teks tepat setelah diterjemahkan: pemisah `·` dan `+` tidak boleh memulai baris, angka tidak terpisah dari satuannya, dan tanda hubung di kata pendek (`m-Banking`, `bertanya-tanya`) tidak dijadikan tempat ganti baris. `poli()` harus kekal — hasilnya dibaca ulang oleh pengamat perubahan.
- Map 10 memakai tinta putih di atas jingga; garis tepi mapnya tetap hitam supaya tumpukan map tetap menyambung dengan bagian di atasnya.
- Lekukan tab map digambar dari dua segitiga border (`.tab::before` hitam, `.tab::after` warna map), bukan `clip-path` di atas latar hitam. Cara lama memakai lapisan `z-index` negatif dan di sebagian browser hitamnya bocor memenuhi lekukan.
- Judul dan subjudul tiap bagian disejajarkan per baris pertama (`align-items:baseline`), bukan rata bawah. `.fh.fh-one` membuat judulnya tetap satu baris di layar lebar.
- Animasi mengikuti `prefers-reduced-motion`: ketikan dan balik halaman langsung selesai. Dalam mode itu lukisan map 01 langsung tampil utuh dan tersenyum.
