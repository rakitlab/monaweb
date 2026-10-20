/**
 * Mona · daftar tunggu
 * ---------------------------------------------------------------------------
 * Web App yang menerima email dari form "Join Waitlist" di monaweb, menyimpan
 * barisnya ke Google Sheet, lalu mengirim pemberitahuan ke kotak masuk.
 *
 * Bisa dipasang dua cara: menempel di Sheet (Extensions → Apps Script) atau
 * berdiri sendiri lewat script.google.com dengan SHEET_ID diisi. Cara memasang
 * ada di waitlist.md. Setelah diterapkan sebagai Web App, salin URL yang
 * berakhiran /exec ke WAITLIST_URL di index.html.
 */

var NOTIFY = 'info.rakitdev@gmail.com';   // tujuan pemberitahuan
var SHEET  = 'Waitlist';                  // nama tab di dalam Sheet
var HEADER = ['Waktu', 'Email', 'Bahasa', 'Halaman', 'Rujukan'];

/* Biarkan kosong kalau script ini dibuat dari dalam Sheet (Extensions →
   Apps Script). Kalau dibuat berdiri sendiri lewat script.google.com, isi
   dengan id Sheet-nya — potongan panjang di antara /d/ dan /edit pada URL
   Sheet. Jalan kedua ini berguna kalau editor dari dalam Sheet tidak mau
   terbuka, yang biasanya terjadi saat login beberapa akun Google. */
var SHEET_ID = '';

/* Formulir mengirim JSON sebagai text/plain supaya tidak memicu preflight
   OPTIONS, yang memang tidak dilayani Apps Script. */
function doPost(e) {
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Umpan penangkap robot: kolom tersembunyi yang hanya diisi mesin.
    // Dijawab ok supaya pengirimnya tidak tahu bahwa isiannya dibuang.
    if (d.botcheck) return out({ ok: true });

    var email = String(d.email || '').trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return out({ ok: false, error: 'email' });
    }

    // Dua kiriman yang datang berbarengan tidak boleh menulis baris kembar.
    var lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      var sh = sheet();
      var dup = known(sh).indexOf(email.toLowerCase()) !== -1;
      if (!dup) {
        sh.appendRow([new Date(), email, d.bahasa || '', d.halaman || '', d.rujukan || '']);
        notify(email, sh.getLastRow() - 1);
      }
      return out({ ok: true, duplicate: dup });
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
}

/* Dibuka lewat browser: dipakai untuk memastikan Web App-nya hidup. */
function doGet() {
  return out({ ok: true, service: 'mona-waitlist' });
}

/* Satu-satunya tempat Sheet-nya dibuka, supaya kedua cara pasang —
   menempel di Sheet atau berdiri sendiri — dilayani kode yang sama. */
function book() {
  var ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID)
                    : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Sheet tidak ketemu. Isi SHEET_ID kalau script ini berdiri sendiri.');
  return ss;
}

function sheet() {
  var ss = book();
  var sh = ss.getSheetByName(SHEET);
  if (!sh) {
    sh = ss.insertSheet(SHEET);
    sh.appendRow(HEADER);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADER.length).setFontWeight('bold');
    sh.setColumnWidth(1, 160);
    sh.setColumnWidth(2, 260);
  }
  return sh;
}

function known(sh) {
  var n = sh.getLastRow() - 1;
  if (n < 1) return [];
  return sh.getRange(2, 2, n, 1).getValues().map(function (r) {
    return String(r[0]).trim().toLowerCase();
  });
}

function notify(email, total) {
  var url = book().getUrl();
  MailApp.sendEmail({
    to: NOTIFY,
    subject: 'Mona · daftar tunggu #' + total + ' · ' + email,
    body: email + '\n\nTotal pendaftar: ' + total + '\n\nDaftar lengkap: ' + url
  });
}

function out(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
