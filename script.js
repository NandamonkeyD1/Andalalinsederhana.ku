// Portal Andalalin - Dishub Kab. Semarang

// ===== NAVBAR TOGGLE =====
function toggleNav() {
  var menu = document.getElementById('navMenu');
  if (menu) menu.classList.toggle('open');
}

// ===== SWITCH FORM TAB (pengajuan.html) =====
function switchForm(name) {
  document.querySelectorAll('.form-panel').forEach(function(p) { p.classList.remove('active'); });
  document.querySelectorAll('.ftab').forEach(function(t) { t.classList.remove('active'); });
  var panel = document.getElementById('form-' + name);
  var tab   = document.getElementById('tab-' + name);
  if (panel) panel.classList.add('active');
  if (tab)   tab.classList.add('active');
}

// ===== SWITCH KRITERIA TAB =====
function switchKriteria(btn, panelId) {
  document.querySelectorAll('.ktab').forEach(function(t) { t.classList.remove('active'); });
  document.querySelectorAll('.kriteria-panel').forEach(function(p) { p.classList.remove('active'); });
  btn.classList.add('active');
  var panel = document.getElementById(panelId);
  if (panel) panel.classList.add('active');
}

// ===== DATA CEK KATEGORI BANGKITAN =====
// Struktur: kategori1 -> array sub-jenis
// Setiap sub-jenis punya array ukuran (label tampil di dropdown, kategori bangkitan)
var dataCek = {
  pusat_kegiatan: [
    {
      value: 'perdagangan',
      label: 'a. Kegiatan perdagangan dan perbelanjaan',
      ukuran: [
        { label: 'Di atas 3.000 m² luas lantai bangunan',          kategori: 'tinggi' },
        { label: '1.001 m² s.d. 3.000 m² luas lantai bangunan',    kategori: 'sedang' },
        { label: '500 m² s.d. 1.000 m² luas lantai bangunan',      kategori: 'rendah' },
        { label: 'Di bawah 500 m² luas lantai bangunan',           kategori: 'tidakwajib' }
      ]
    },
    {
      value: 'perkantoran',
      label: 'b. Kegiatan perkantoran',
      ukuran: [
        { label: 'Di atas 10.000 m² luas lantai bangunan',         kategori: 'tinggi' },
        { label: '4.001 m² s.d. 10.000 m² luas lantai bangunan',   kategori: 'sedang' },
        { label: '1.000 m² s.d. 4.000 m² luas lantai bangunan',    kategori: 'rendah' },
        { label: 'Di bawah 1.000 m² luas lantai bangunan',         kategori: 'tidakwajib' }
      ]
    },
    {
      value: 'industri',
      label: 'c. Kegiatan Industri dan Pergudangan',
      ukuran: [] // sub-sub, ditangani khusus
    },
    {
      value: 'industri_industri',
      label: 'c.1) Industri',
      ukuran: [
        { label: 'Di atas 10.000 m² luas lantai bangunan',         kategori: 'tinggi' },
        { label: '5.001 m² s.d. 10.000 m² luas lantai bangunan',   kategori: 'sedang' },
        { label: '2.500 m² s.d. 5.000 m² luas lantai bangunan',    kategori: 'rendah' },
        { label: 'Di bawah 2.500 m² luas lantai bangunan',         kategori: 'tidakwajib' }
      ]
    },
    {
      value: 'industri_gudang',
      label: 'c.2) Pergudangan',
      ukuran: [
        { label: 'Di atas 500.000 m² luas lantai bangunan',                    kategori: 'tinggi' },
        { label: '170.001 m² s.d. 500.000 m² luas lantai bangunan',            kategori: 'sedang' },
        { label: '40.000 m² s.d. 170.000 m² luas lantai bangunan',             kategori: 'rendah' },
        { label: 'Di bawah 40.000 m² luas lantai bangunan',                    kategori: 'tidakwajib' }
      ]
    },
    {
      value: 'pariwisata_kawasan',
      label: 'd. Kawasan Pariwisata',
      ukuran: [
        { label: 'Wajib (semua skala)',   kategori: 'tinggi' }
      ]
    },
    {
      value: 'pariwisata_tempat',
      label: 'd. Tempat Wisata',
      ukuran: [
        { label: 'Di atas 10,0 hektar luas lahan',      kategori: 'tinggi' },
        { label: '5,0 s.d. 10,0 hektar luas lahan',     kategori: 'sedang' },
        { label: '1,0 s.d. 5,0 hektar luas lahan',      kategori: 'rendah' },
        { label: 'Di bawah 1,0 hektar luas lahan',      kategori: 'tidakwajib' }
      ]
    }
  ],
  permukiman: [
    {
      value: 'perumahan',
      label: 'a. Perumahan dan permukiman',
      ukuran: [
        { label: 'Di atas 500 unit',      kategori: 'tinggi' },
        { label: '100 s.d. 500 unit',     kategori: 'sedang' },
        { label: '50 s.d. 100 unit',      kategori: 'rendah' },
        { label: 'Di bawah 50 unit',      kategori: 'tidakwajib' }
      ]
    },
    {
      value: 'apartemen',
      label: 'b. Apartemen / Rumah Susun',
      ukuran: [
        { label: 'Di atas 500 unit',      kategori: 'tinggi' },
        { label: '100 s.d. 500 unit',     kategori: 'sedang' },
        { label: '50 s.d. 100 unit',      kategori: 'rendah' },
        { label: 'Di bawah 50 unit',      kategori: 'tidakwajib' }
      ]
    }
  ],
  infrastruktur: [
    {
      value: 'terminal',
      label: 'a. Terminal',
      ukuran: [
        { label: 'Di atas 500 penumpang/jam',      kategori: 'tinggi' },
        { label: '100 s.d. 500 penumpang/jam',     kategori: 'sedang' },
        { label: '50 s.d. 100 penumpang/jam',      kategori: 'rendah' },
        { label: 'Di bawah 50 penumpang/jam',      kategori: 'tidakwajib' }
      ]
    },
    {
      value: 'stasiun',
      label: 'b. Stasiun Kereta Api',
      ukuran: [
        { label: 'Di atas 500 penumpang/jam',      kategori: 'tinggi' },
        { label: '100 s.d. 500 penumpang/jam',     kategori: 'sedang' },
        { label: '50 s.d. 100 penumpang/jam',      kategori: 'rendah' },
        { label: 'Di bawah 50 penumpang/jam',      kategori: 'tidakwajib' }
      ]
    },
    {
      value: 'spbu',
      label: 'c. SPBU / SPBG',
      ukuran: [
        { label: 'Di atas 8 nozzle',      kategori: 'tinggi' },
        { label: '4 s.d. 8 nozzle',       kategori: 'sedang' },
        { label: '1 s.d. 4 nozzle',       kategori: 'rendah' },
        { label: 'Tidak ada / 0 nozzle',  kategori: 'tidakwajib' }
      ]
    }
  ],
  pendidikan: [
    {
      value: 'sekolah',
      label: 'Sekolah / Universitas',
      ukuran: [
        { label: 'Di atas 1.500 siswa',      kategori: 'tinggi' },
        { label: '500 s.d. 1.500 siswa',     kategori: 'sedang' },
        { label: '100 s.d. 500 siswa',       kategori: 'rendah' },
        { label: 'Di bawah 100 siswa',       kategori: 'tidakwajib' }
      ]
    }
  ]
};

// Label kategori bangkitan
var labelKat = {
  tinggi:     'Bangkitan Tinggi (Dokumen Andalalin)',
  sedang:     'Bangkitan Sedang (Rekomendasi Teknis)',
  rendah:     'Bangkitan Rendah (Standar Teknis)',
  tidakwajib: 'Tidak Wajib Andalalin'
};

// ===== DROPDOWN 1 CHANGE =====
function onKat1Change() {
  var kat1 = document.getElementById('sim-kat1').value;
  var row2 = document.getElementById('sim-row2');
  var row3 = document.getElementById('sim-row3');
  var tabel = document.getElementById('sim-tabel-result');
  var sel2  = document.getElementById('sim-kat2');

  // Reset bawah
  if (row3)  row3.style.display  = 'none';
  if (tabel) tabel.style.display = 'none';

  if (!kat1 || !dataCek[kat1]) {
    if (row2) row2.style.display = 'none';
    return;
  }

  // Isi dropdown 2
  sel2.innerHTML = '<option value="">Jenis Rencana Pembangunan</option>';
  dataCek[kat1].forEach(function(item) {
    if (item.ukuran.length === 0) return; // skip header grup
    var opt = document.createElement('option');
    opt.value = item.value;
    opt.textContent = item.label;
    sel2.appendChild(opt);
  });

  row2.style.display = 'block';
}

// ===== DROPDOWN 2 CHANGE =====
function onKat2Change() {
  var kat1  = document.getElementById('sim-kat1').value;
  var jenis = document.getElementById('sim-kat2').value;
  var row3  = document.getElementById('sim-row3');
  var tabel = document.getElementById('sim-tabel-result');
  var sel3  = document.getElementById('sim-ukuran-select');

  if (tabel) tabel.style.display = 'none';

  if (!jenis) {
    if (row3) row3.style.display = 'none';
    return;
  }

  // Cari data sub-jenis
  var items = dataCek[kat1] || [];
  var found = null;
  for (var i = 0; i < items.length; i++) {
    if (items[i].value === jenis) { found = items[i]; break; }
  }
  if (!found || found.ukuran.length === 0) {
    if (row3) row3.style.display = 'none';
    return;
  }

  // Isi dropdown 3
  sel3.innerHTML = '<option value="">Ukuran Minimal</option>';
  found.ukuran.forEach(function(u, idx) {
    var opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = u.label;
    sel3.appendChild(opt);
  });

  row3.style.display = 'block';
}

// ===== DROPDOWN 3 CHANGE =====
function onUkuranChange() {
  var kat1   = document.getElementById('sim-kat1').value;
  var jenis  = document.getElementById('sim-kat2').value;
  var idxStr = document.getElementById('sim-ukuran-select').value;
  var tabel  = document.getElementById('sim-tabel-result');

  if (idxStr === '' || idxStr === null) {
    if (tabel) tabel.style.display = 'none';
    return;
  }

  var items = dataCek[kat1] || [];
  var found = null;
  for (var i = 0; i < items.length; i++) {
    if (items[i].value === jenis) { found = items[i]; break; }
  }
  if (!found) return;

  var idx = parseInt(idxStr);
  var ukuranItem = found.ukuran[idx];
  if (!ukuranItem) return;

  // Nama jenis bersih (tanpa prefix a. b. c. dll)
  var jenisLabel = found.label.replace(/^[a-z0-9]+[\.\)]\d*[\.\)]?\s*/i, '').replace(/^[a-z]\.\s*/i, '');

  // Warna kategori
  var warna = { tinggi: '#dc2626', sedang: '#d97706', rendah: '#059669', tidakwajib: '#7c3aed' };

  // Isi tabel
  document.getElementById('tbl-jenis').textContent    = found.label;
  document.getElementById('tbl-ukuran').textContent   = ukuranItem.label;

  var tdKat = document.getElementById('tbl-kategori');
  tdKat.textContent = labelKat[ukuranItem.kategori];
  tdKat.style.color = warna[ukuranItem.kategori] || '';
  tdKat.style.fontWeight = '700';

  tabel.style.display = 'block';
  tabel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== SHOW FILE NAME AFTER UPLOAD =====
function showFileName(input, targetId) {
  var el = document.getElementById(targetId);
  if (el && input.files && input.files[0]) {
    el.textContent = '\u2713 ' + input.files[0].name;
    var box = input.closest('.upload-item').querySelector('.upload-box');
    if (box) {
      box.style.borderColor = '#059669';
      box.style.background  = '#f0fdf4';
    }
  }
}

// ===== SUBMIT FORM =====
function submitForm(e) {
  e.preventDefault();
  var modal = document.getElementById('modal-sukses');
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

// ===== CLOSE MODAL =====
function closeModal() {
  var modal = document.getElementById('modal-sukses');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// ===== UNDUH ALERT =====
function alertUnduh() {
  alert('Dokumen sedang dipersiapkan. Silakan hubungi petugas melalui WhatsApp untuk mendapatkan dokumen terbaru.');
}

// ===== ON DOM READY =====
document.addEventListener('DOMContentLoaded', function () {

  // Auto-activate form from URL param ?form=tinggi etc.
  var params = new URLSearchParams(window.location.search);
  var formParam = params.get('form');
  if (formParam) {
    switchForm(formParam);
    var target = document.getElementById('form-' + formParam);
    if (target) {
      setTimeout(function () {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }

  // Close modal on ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });

  // Drag & drop support for upload boxes
  document.querySelectorAll('.upload-box').forEach(function (box) {
    box.addEventListener('dragover', function (e) {
      e.preventDefault();
      box.style.borderColor = '#1a56db';
      box.style.background  = '#eff6ff';
    });
    box.addEventListener('dragleave', function () {
      box.style.borderColor = '';
      box.style.background  = '';
    });
    box.addEventListener('drop', function (e) {
      e.preventDefault();
      box.style.borderColor = '';
      box.style.background  = '';
      var item  = box.closest('.upload-item');
      var input = item ? item.querySelector('input[type=file]') : null;
      var nameEl = box.querySelector('.upload-filename');
      if (input && e.dataTransfer.files.length) {
        try { input.files = e.dataTransfer.files; } catch(err) {}
        if (nameEl) nameEl.textContent = '\u2713 ' + e.dataTransfer.files[0].name;
        box.style.borderColor = '#059669';
        box.style.background  = '#f0fdf4';
      }
    });
  });

  // Sticky navbar shadow on scroll
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 4px 20px rgba(26,86,219,.5)';
      } else {
        navbar.style.boxShadow = '';
      }
    });
  }

  // Close mobile menu when a link is clicked
  document.querySelectorAll('.nav-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
      var menu = document.getElementById('navMenu');
      if (menu) menu.classList.remove('open');
    });
  });
});
