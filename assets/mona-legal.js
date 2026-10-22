/* ---------- HALAMAN LEGAL: bagian yang bisa dibuka-tutup ----------
   Buka-tutupnya sendiri dikerjakan <details>/<summary> tanpa skrip ini.
   Yang ditambahkan di sini hanya kenyamanan: tombol buka/tutup semua,
   membuka bagian yang dituju tautan #anchor, dan membuka semuanya
   sebelum halaman dicetak lalu mengembalikannya seperti semula.
   Teks tombol ditulis dalam bahasa Indonesia; mesin I18N yang
   menerjemahkannya, sama seperti teks lain di halaman. */
(function(){
var ds=[].slice.call(document.querySelectorAll('details.fold'));
if(!ds.length)return;
var btn=document.getElementById('lglall');

function semua(){for(var i=0;i<ds.length;i++)if(!ds[i].open)return false;return true}
function label(){if(btn)btn.firstChild.nodeValue=semua()?'Tutup semua':'Buka semua'}
function setAll(v){for(var i=0;i<ds.length;i++)ds[i].open=v}

if(btn){
  btn.hidden=false;
  label();
  btn.addEventListener('click',function(){setAll(!semua());label()});
  ds.forEach(function(d){d.addEventListener('toggle',label)});
}

function dariHash(){
  var id=location.hash.slice(1);if(!id)return;
  var el=document.getElementById(id);
  if(el&&el.tagName==='DETAILS'&&!el.open){el.open=true;label();el.scrollIntoView()}
}
dariHash();
window.addEventListener('hashchange',dariHash);

var simpan=[];
window.addEventListener('beforeprint',function(){
  simpan=ds.map(function(d){return d.open});setAll(true)});
window.addEventListener('afterprint',function(){
  if(simpan.length)ds.forEach(function(d,i){d.open=simpan[i]});label()});
})();
