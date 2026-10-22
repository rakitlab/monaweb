/* ---------- BAHASA: Inggris (bawaan) dan Indonesia ----------
   Mesin penerjemah yang sama persis dengan yang ada di index.html, dipindah
   ke berkas sendiri supaya halaman legal memakainya tanpa menyalin ulang.
   Sumber teks halaman ditulis dalam bahasa Indonesia; kamus menerjemahkan
   teks utuh (bukan potongan) ke bahasa Inggris saat dijalankan. Halaman
   menaruh kamusnya sendiri di window.I18N_PAGE sebelum memuat berkas ini;
   kamus bersama di bawah berisi teks bilah atas dan kaki halaman. */
(function(){
var I18N={
  /* bilah atas */
  "Mona, kembali ke beranda": "Mona, back to home",
  "Language": "Bahasa",
  "Beranda": "Home",
  "Isi halaman": "On this page",
  /* kaki halaman */
  "Money Navigator dengan asisten Lisa.": "Money Navigator with Lisa, your assistant.",
  "Dibuat oleh Rakit Lab.": "Made by Rakit Lab.",
  "Produk": "Product",
  "Buku": "Ledger",
  "Arsip": "Archive",
  "Space bersama": "Shared Space",
  "Cocok untuk": "Made for",
  "Cerita": "Story",
  "Harga": "Pricing",
  "Legal": "Legal",
  "Kebijakan privasi": "Privacy policy",
  "Syarat penggunaan": "Terms of use",
  "Hapus akun": "Delete account",
  "Kontak": "Contact",
  "© 2026 Rakit Lab · M-01 Money Navigator": "© 2026 Rakit Lab · M-01 Money Navigator",
  /* dipakai di beberapa halaman legal */
  "Berlaku sejak": "Effective from",
  "22 Oktober 2026": "22 October 2026",
  "Versi 1.0": "Version 1.0",
  "Penerbit": "Published by",
  "Rakit Lab": "Rakit Lab",
  "Pertanyaan soal halaman ini": "Questions about this page",
  "Kembali ke beranda Mona": "Back to the Mona home page"
};
var P=window.I18N_PAGE||{},HAS=Object.prototype.hasOwnProperty,k0;
for(k0 in P)if(HAS.call(P,k0))I18N[k0]=P[k0];

var LANG=(function(){var q=(location.search.match(/[?&]lang=(en|id)\b/)||[])[1];if(q)return q;try{var v=localStorage.getItem('mona-lang');if(v==='en'||v==='id')return v}catch(e){}return 'en'})();
var LANGH=[],REV={};
for(k0 in I18N)if(HAS.call(I18N,k0)&&!HAS.call(REV,I18N[k0]))REV[I18N[k0]]=k0;
var TA=['aria-label','title','placeholder','alt','data-n','data-a','data-t','data-idle','data-k'];

/* ---------- POLES TIPOGRAFI ----------
   Dijalankan tepat setelah penerjemah menaruh teks, jadi berlaku untuk
   kedua bahasa tanpa perlu menulis spasi mati di dalam HTML — kalau
   ditulis di HTML, kunci I18N jadi tidak cocok lagi. poli() harus kekal:
   poli(poli(s)) === poli(s), karena hasil tulisnya memicu pengamat
   perubahan yang memanggil trText sekali lagi. */
var NB=' ',NH='‑';
var UNIT=/(\d)\s(hari|orang|detik|menit|jam|bulan|tahun|gram|kali|days?|people|persons?|seconds?|minutes?|hours?|months?|years?|grams?)\b/g;
var HYP=/(^|[\s( ])([0-9A-Za-zÀ-ÿ]{1,12})-([0-9A-Za-zÀ-ÿ]{1,12})(?=$|[\s.,;:!?)])/g;
function poli(s){
  if(s.indexOf(' ')<0&&s.indexOf('-')<0)return s;
  s=s.replace(/ ([·•+&×]) /g,NB+'$1 ');
  s=s.replace(UNIT,'$1'+NB+'$2');
  s=s.replace(HYP,function(m,a,b,c){return (b+c).length>18?m:a+b+NH+c});
  return s}
function unpoli(s){return s.replace(/ /g,' ').replace(/‑/g,'-')}
function tr(cur,src){/* kembalikan [teks baru, sumber Indonesia] atau null */
  cur=unpoli(cur);
  if(LANG==='en'){if(HAS.call(I18N,cur)&&I18N[cur]!==cur)return [I18N[cur],cur];return null}
  if(src!=null&&I18N[src]===cur)return [src,null];
  if(HAS.call(REV,cur)&&REV[cur]!==cur)return [REV[cur],null];return null}
function trText(n){var v=n.nodeValue,t=v.trim();if(!t)return;
  var x=tr(t,n.__id),s=poli(x?x[0]:t);
  if(x)n.__id=x[1];
  if(s!==t)n.nodeValue=v.replace(t,s)}
function trAttr(el,a){var v=el.getAttribute(a);if(!v)return;var m=el.__ida||(el.__ida={}),x=tr(v.trim(),m[a]);if(!x)return;m[a]=x[1];el.setAttribute(a,x[0])}
function walk(root){if(!root)return;
  if(root.nodeType===3){trText(root);return}
  if(root.nodeType!==1||/^(SCRIPT|STYLE)$/.test(root.nodeName))return;
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){return /^(SCRIPT|STYLE)$/.test(n.parentNode.nodeName)?2:1}}),n;
  while(n=w.nextNode())trText(n);
  var sel=TA.map(function(a){return '['+a+']'}).join(',');
  TA.forEach(function(a){if(root.hasAttribute&&root.hasAttribute(a))trAttr(root,a)});
  root.querySelectorAll(sel).forEach(function(el){TA.forEach(function(a){if(el.hasAttribute(a))trAttr(el,a)})})}
function metaLang(){var h=document.documentElement;h.lang=LANG;
  var ttl=document.querySelector('title');if(ttl)trText(ttl.firstChild);
  var md=document.querySelector('meta[name="description"]');if(md){var m=md.__ida||(md.__ida={}),x=tr(md.content,m.c);if(x){m.c=x[1];md.content=x[0]}}
  document.querySelectorAll('[data-lang]').forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-lang')===LANG?'true':'false')})}
walk(document.body);metaLang();
var LOB=new MutationObserver(function(rs){
  rs.forEach(function(r){
    if(r.type==='childList')r.addedNodes.forEach(walk);
    else if(r.type==='characterData')trText(r.target);
    else if(r.type==='attributes'&&TA.indexOf(r.attributeName)>-1)trAttr(r.target,r.attributeName)});
  LOB.takeRecords()});
LOB.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:TA});
function setLang(l){if(l===LANG)return;LANG=l;try{localStorage.setItem('mona-lang',l)}catch(e){}
  walk(document.body);LOB.takeRecords();metaLang();LANGH.forEach(function(f){try{f()}catch(e){}})}
document.querySelectorAll('[data-lang]').forEach(function(b){b.addEventListener('click',function(){setLang(b.getAttribute('data-lang'))})});
document.documentElement.classList.remove('i18n-wait');
})();
