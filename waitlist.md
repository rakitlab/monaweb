# Daftar tunggu — pasang backend-nya

Form "Join Waitlist" di bagian 10 mengirim satu alamat email ke Google Apps
Script, yang menyimpannya ke Google Sheet lalu mengirim pemberitahuan ke
`info.rakitdev@gmail.com`.

Selama `WAITLIST_URL` di `index.html` masih kosong, tombolnya jatuh balik ke
`mailto:` — jadi halaman ini tidak pernah diam saja, tapi pengunjung masih
harus menekan kirim sendiri. Lima menit di bawah ini menutup celah itu.

## 1. Buat Sheet-nya

1. Buka [sheets.new](https://sheets.new) dengan akun yang memegang
   `info.rakitdev@gmail.com`.
2. Beri nama, misalnya **Mona · Daftar Tunggu**. Tidak perlu bikin kolom —
   script-nya yang membuat tab `Waitlist` beserta judul kolomnya.

## 2. Tempel script-nya

1. Di Sheet itu: **Extensions → Apps Script**.
2. Hapus isi `Code.gs`, lalu tempel seluruh isi [`waitlist.gs`](waitlist.gs).
3. Simpan (ikon disket atau `Ctrl/Cmd + S`).

## 3. Terapkan sebagai Web App

1. **Deploy → New deployment**.
2. Ikon gerigi di sebelah *Select type* → **Web app**.
3. Isi:
   - *Description*: `mona waitlist`
   - *Execute as*: **Me** — supaya script-nya boleh menulis ke Sheet dan
     mengirim email atas nama kamu.
   - *Who has access*: **Anyone** — ini wajib. Pengunjung situs tidak punya
     akun Google kamu; "Anyone with Google account" akan menolak mereka.
4. **Deploy** → **Authorize access** → pilih akunnya → di layar "Google hasn't
   verified this app" klik **Advanced** → **Go to … (unsafe)** → **Allow**.
   Peringatan itu muncul karena script-nya milik sendiri dan belum lewat
   peninjauan Google, bukan karena ada yang salah.
5. Salin **Web app URL**. Bentuknya:
   `https://script.google.com/macros/s/AKfycb…/exec`

## 4. Pasang di situs

Di `index.html`, cari baris:

```js
var WAITLIST_URL='';
```

Tempel URL `/exec` tadi di antara tanda kutipnya:

```js
var WAITLIST_URL='https://script.google.com/macros/s/AKfycb…/exec';
```

Simpan, commit, push. Vercel menerapkannya otomatis.

## 5. Cek

- Buka URL `/exec` tadi langsung di browser. Harusnya keluar
  `{"ok":true,"service":"mona-waitlist"}`.
- Buka situsnya, isi email sendiri, tekan **Join Waitlist**. Pesannya berubah
  jadi "Kamu masuk daftar tunggu", barisnya muncul di Sheet, dan
  pemberitahuannya masuk ke inbox.
- Kirim email yang sama dua kali: yang kedua dijawab "Email ini sudah ada di
  daftar tunggu" dan tidak menulis baris kembar.

## Yang perlu diingat

- **Kuota email**: akun Gmail biasa boleh mengirim 100 email per hari lewat
  Apps Script. Lewat dari itu, barisnya tetap masuk Sheet — hanya
  pemberitahuannya yang tertunda sampai besok.
- **Setiap kali `waitlist.gs` diubah**, URL lama tidak otomatis ikut berubah.
  Pakai **Deploy → Manage deployments → ikon pensil → Version: New version →
  Deploy** supaya URL-nya tetap sama.
- **Penangkap robot**: ada kolom centang tersembunyi (`.jhp`) di form. Kalau
  terisi, script-nya menjawab ok tapi tidak menyimpan apa-apa.
- **Mengganti tujuan pemberitahuan**: ubah `NOTIFY` di baris atas
  `waitlist.gs`, lalu terapkan ulang seperti di atas.
