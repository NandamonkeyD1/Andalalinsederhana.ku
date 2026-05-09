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

// ===== SWITCH KRITERIA TAB (kriteria.html) =====
function switchKriteria(btn, panelId) {
  document.querySelectorAll('.ktab').forEach(function(t) { t.classList.remove('active'); });
  document.querySelectorAll('.kriteria-panel').forEach(function(p) { p.classList.remove('active'); });
  btn.classList.add('active');
  var panel = document.getElementById(panelId);
  if (panel) panel.classList.add('active');
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

// ===== CEK KATEGORI SIMULASI =====
function cekKategori() {
  var jenis  = document.getElementById('sim-jenis');
  var ukuran = document.getElementById('sim-ukuran');
  var result = document.getElementById('simulasi-result');

  if (!jenis || !ukuran || !result) return;

  var j = jenis.value;
  var u = parseFloat(ukuran.value);

  if (!j) { alert('Pilih jenis rencana pembangunan terlebih dahulu.'); return; }
  if (isNaN(u) || u <= 0) { alert('Masukkan ukuran / jumlah yang valid.'); return; }

  var kategori = '';
  var satuan   = '';

  // Tentukan kategori berdasarkan jenis dan ukuran
  if (j === 'mall') {
    satuan = 'm² luas lantai';
    if (u >= 10000) kategori = 'tinggi';
    else if (u >= 3000) kategori = 'sedang';
    else if (u >= 100) kategori = 'rendah';
    else kategori = 'tidakwajib';
  } else if (j === 'hotel') {
    satuan = 'kamar';
    if (u >= 200) kategori = 'tinggi';
    else if (u >= 50) kategori = 'sedang';
    else if (u >= 10) kategori = 'rendah';
    else kategori = 'tidakwajib';
  } else if (j === 'rs') {
    satuan = 'tempat tidur';
    if (u >= 200) kategori = 'tinggi';
    else if (u >= 50) kategori = 'sedang';
    else if (u >= 10) kategori = 'rendah';
    else kategori = 'tidakwajib';
  } else if (j === 'industri') {
    satuan = 'ha';
    if (u >= 100) kategori = 'tinggi';
    else if (u >= 10) kategori = 'sedang';
    else kategori = 'rendah';
  } else if (j === 'kampus') {
    satuan = 'mahasiswa';
    if (u >= 5000) kategori = 'tinggi';
    else if (u >= 1000) kategori = 'sedang';
    else kategori = 'rendah';
  } else if (j === 'terminal') {
    satuan = 'penumpang/jam';
    if (u >= 500) kategori = 'tinggi';
    else if (u >= 100) kategori = 'sedang';
    else kategori = 'rendah';
  } else if (j === 'kantor') {
    satuan = 'm² luas lantai';
    if (u >= 20000) kategori = 'tinggi';
    else if (u >= 5000) kategori = 'sedang';
    else if (u >= 500) kategori = 'rendah';
    else kategori = 'tidakwajib';
  } else if (j === 'apartemen') {
    satuan = 'unit';
    if (u >= 500) kategori = 'tinggi';
    else if (u >= 100) kategori = 'sedang';
    else if (u >= 50) kategori = 'rendah';
    else kategori = 'tidakwajib';
  } else if (j === 'sekolah') {
    satuan = 'siswa';
    if (u >= 5000) kategori = 'tinggi';
    else if (u >= 500) kategori = 'sedang';
    else if (u >= 100) kategori = 'rendah';
    else kategori = 'tidakwajib';
  } else if (j === 'minimarket') {
    satuan = 'm² luas lantai';
    if (u >= 3000) kategori = 'sedang';
    else if (u >= 500) kategori = 'sedang';
    else if (u >= 100) kategori = 'rendah';
    else kategori = 'tidakwajib';
  } else if (j === 'perumahan') {
    satuan = 'unit';
    if (u >= 500) kategori = 'tinggi';
    else if (u >= 100) kategori = 'sedang';
    else if (u >= 50) kategori = 'rendah';
    else kategori = 'tidakwajib';
  } else if (j === 'spbu') {
    satuan = 'nozzle';
    if (u >= 8) kategori = 'tinggi';
    else if (u >= 4) kategori = 'sedang';
    else if (u >= 1) kategori = 'rendah';
    else kategori = 'tidakwajib';
  } else if (j === 'klinik') {
    satuan = 'tempat tidur';
    if (u >= 50) kategori = 'sedang';
    else if (u >= 10) kategori = 'rendah';
    else kategori = 'tidakwajib';
  } else if (j === 'ibadah') {
    satuan = 'jemaah';
    if (u >= 2000) kategori = 'sedang';
    else if (u >= 500) kategori = 'rendah';
    else kategori = 'tidakwajib';
  } else if (j === 'bengkel') {
    satuan = 'm² luas lantai';
    if (u >= 2000) kategori = 'sedang';
    else if (u >= 500) kategori = 'rendah';
    else kategori = 'tidakwajib';
  } else if (j === 'restoran') {
    satuan = 'm² luas lantai';
    if (u >= 500) kategori = 'sedang';
    else if (u >= 100) kategori = 'rendah';
    else kategori = 'tidakwajib';
  } else if (j === 'warung') {
    satuan = 'm² luas lantai';
    if (u >= 500) kategori = 'sedang';
    else if (u >= 100) kategori = 'rendah';
    else kategori = 'tidakwajib';
  } else if (j === 'ruko') {
    satuan = 'm² luas lantai';
    if (u >= 3000) kategori = 'sedang';
    else if (u >= 500) kategori = 'sedang';
    else if (u >= 100) kategori = 'rendah';
    else kategori = 'tidakwajib';
  } else {
    kategori = 'tidakwajib';
  }

  // Data tampilan per kategori
  var data = {
    tinggi: {
      cls: 'result-tinggi',
      icon: 'fas fa-building',
      title: 'Bangkitan Tinggi — Wajib Andalalin',
      subtitle: 'Kegiatan Anda termasuk kategori Bangkitan Tinggi',
      desc: 'Kegiatan Anda dengan ' + u + ' ' + satuan + ' termasuk kategori <strong>Bangkitan Tinggi</strong>. Anda wajib menyusun dokumen Analisis Dampak Lalu Lintas (Andalalin) sebelum memperoleh izin pembangunan. Silakan ajukan melalui form atau Google Forms berikut.',
      link: 'https://forms.gle/dCrBg6v6KddAtRvJ7',
      linkLabel: 'Ajukan via Google Forms'
    },
    sedang: {
      cls: 'result-sedang',
      icon: 'fas fa-store',
      title: 'Bangkitan Sedang — Wajib Andalalin',
      subtitle: 'Kegiatan Anda termasuk kategori Bangkitan Sedang',
      desc: 'Kegiatan Anda dengan ' + u + ' ' + satuan + ' termasuk kategori <strong>Bangkitan Sedang</strong>. Anda wajib menyusun dokumen Andalalin sebelum memperoleh izin pembangunan. Silakan ajukan melalui form atau Google Forms berikut.',
      link: 'https://forms.gle/3qqe38qCsqhMbhhW7',
      linkLabel: 'Ajukan via Google Forms'
    },
    rendah: {
      cls: 'result-rendah',
      icon: 'fas fa-home',
      title: 'Bangkitan Rendah — Wajib Andalalin',
      subtitle: 'Kegiatan Anda termasuk kategori Bangkitan Rendah',
      desc: 'Kegiatan Anda dengan ' + u + ' ' + satuan + ' termasuk kategori <strong>Bangkitan Rendah</strong>. Anda wajib menyusun dokumen Andalalin. Silakan ajukan melalui form atau Google Forms berikut.',
      link: 'https://forms.gle/JbmsUfnGykwioJqx5',
      linkLabel: 'Ajukan via Google Forms'
    },
    tidakwajib: {
      cls: 'result-tidakwajib',
      icon: 'fas fa-circle-check',
      title: 'Tidak Wajib Andalalin',
      subtitle: 'Kegiatan Anda tidak memenuhi ambang batas wajib Andalalin',
      desc: 'Kegiatan Anda dengan ' + u + ' ' + satuan + ' <strong>tidak wajib</strong> menyusun dokumen Andalalin. Namun Anda dapat mengajukan <strong>Surat Keterangan Kriteria Wajib Andalalin</strong> kepada Kepala Dinas Perhubungan Kabupaten Semarang.',
      link: 'https://forms.gle/auFGN3j7fLzXFLAq8',
      linkLabel: 'Ajukan Surat Keterangan'
    }
  };

  var d = data[kategori];

  // Reset class
  result.className = 'simulasi-result show ' + d.cls;
  document.getElementById('res-icon').className = d.icon;
  document.getElementById('res-title').textContent = d.title;
  document.getElementById('res-subtitle').textContent = d.subtitle;
  document.getElementById('res-desc').innerHTML = d.desc;
  document.getElementById('res-actions').innerHTML =
    '<a href="' + d.link + '" target="_blank" class="btn-gform btn-gform-primary"><i class="fab fa-google"></i> ' + d.linkLabel + '</a>' +
    '<a href="pengajuan.html?form=' + kategori + '" class="btn-gform btn-gform-outline"><i class="fas fa-file-alt"></i> Isi Form Manual</a>';

  result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
