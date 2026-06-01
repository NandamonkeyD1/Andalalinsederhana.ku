// Generate Surat PDF - Portal Andalalin Kab. Semarang

function onJenisSuratChange() {
  var jenis = document.getElementById('jenis-surat').value;
  var form = document.getElementById('form-surat');
  var fieldKonsultan = document.getElementById('field-konsultan');

  if (!jenis) {
    form.style.display = 'none';
    return;
  }

  form.style.display = 'block';
  fieldKonsultan.style.display = (jenis === 'rekomendasi') ? 'block' : 'none';
}

function generatePDF() {
  var jenis = document.getElementById('jenis-surat').value;
  if (!jenis) { alert('Pilih jenis surat terlebih dahulu.'); return; }

  var perusahaan = document.getElementById('s-perusahaan').value.trim();
  var pemohon    = document.getElementById('s-pemohon').value.trim();
  var jabatan    = document.getElementById('s-jabatan').value.trim();
  var alamat     = document.getElementById('s-alamat').value.trim();
  var objek      = document.getElementById('s-objek').value.trim();
  var lokasi     = document.getElementById('s-lokasi').value.trim();
  var nomor      = document.getElementById('s-nomor').value.trim();
  var tanggal    = document.getElementById('s-tanggal').value.trim();
  var konsultan  = document.getElementById('s-konsultan') ? document.getElementById('s-konsultan').value.trim() : '';

  // Validasi wajib
  if (!perusahaan || !pemohon || !objek || !lokasi) {
    alert('Harap isi minimal: Nama Perusahaan, Nama Pemohon, Nama Objek, dan Lokasi Pembangunan.');
    return;
  }

  if (!tanggal) tanggal = 'Semarang, ................';
  if (!nomor) nomor = '......./......./......./........';
  if (!jabatan) jabatan = '(Jabatan)';

  // Generate PDF
  var { jsPDF } = window.jspdf;
  var doc = new jsPDF('p', 'mm', 'a4');
  var marginL = 25;
  var marginR = 25;
  var pageW = 210 - marginL - marginR;
  var y = 20;
  var lineH = 6;

  // Helper functions
  function addLine(text, fontSize, bold, indent) {
    if (fontSize) doc.setFontSize(fontSize);
    if (bold) doc.setFont('helvetica', 'bold');
    else doc.setFont('helvetica', 'normal');
    var x = marginL + (indent || 0);
    var lines = doc.splitTextToSize(text, pageW - (indent || 0));
    lines.forEach(function(line) {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(line, x, y);
      y += lineH;
    });
  }

  function addSpace(n) { y += (n || 4); }

  // === HEADER ===
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('KOP SURAT', 105, y, { align: 'center' });
  y += 12;

  // === NOMOR, LAMPIRAN, PERIHAL ===
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Nomor', marginL, y); doc.text(': ' + nomor, marginL + 30, y);
  doc.text(tanggal, 210 - marginR, y, { align: 'right' });
  y += lineH;
  doc.text('Lampiran', marginL, y); doc.text(': 1 (satu) bendel', marginL + 30, y);
  y += lineH;

  var perihal = '';
  if (jenis === 'rekomendasi') perihal = 'Permohonan Rekomendasi Teknis Penanganan Dampak Lalu Lintas';
  else if (jenis === 'standar') perihal = 'Permohonan Standar Teknis Penanganan Dampak Lalu Lintas';
  else if (jenis === 'tidakwajib') perihal = 'Permohonan Keterangan Tidak Wajib Andalalin';
  else if (jenis === 'kesanggupan') perihal = 'Surat Kesanggupan Melaksanakan Rekomendasi Andalalin';

  doc.text('Perihal', marginL, y); doc.text(': ' + perihal, marginL + 30, y);
  y += lineH * 2;

  // === KEPADA ===
  addLine('Kepada', 10, false);
  addLine('Yth. Bupati Semarang', 10, false, 10);
  addLine('Cq. Kepala Dinas Perhubungan Kabupaten Semarang', 10, false, 10);
  addLine('di - TEMPAT', 10, false, 10);
  addSpace(8);

  if (jenis === 'kesanggupan') {
    // SURAT KESANGGUPAN
    addLine('Yang bertanda tangan di bawah ini:', 10, false);
    addSpace(4);
    doc.text('Nama', marginL + 10, y); doc.text(': ' + pemohon, marginL + 45, y); y += lineH;
    doc.text('Jabatan', marginL + 10, y); doc.text(': ' + jabatan, marginL + 45, y); y += lineH;
    doc.text('Instansi', marginL + 10, y); doc.text(': ' + perusahaan, marginL + 45, y); y += lineH;
    doc.text('Alamat', marginL + 10, y); doc.text(': ' + alamat, marginL + 45, y); y += lineH;
    addSpace(6);
    addLine('Dengan ini menyatakan kesanggupan untuk melaksanakan seluruh rekomendasi yang diberikan oleh Dinas Perhubungan Kabupaten Semarang terkait penanganan dampak lalu lintas pada pembangunan/pengembangan ' + objek + ' yang berlokasi di ' + lokasi + '.', 10, false);
    addSpace(4);
    addLine('Apabila di kemudian hari kami tidak melaksanakan rekomendasi tersebut, maka kami bersedia menerima sanksi sesuai dengan peraturan perundang-undangan yang berlaku.', 10, false);
    addSpace(4);
    addLine('Demikian surat kesanggupan ini dibuat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya.', 10, false);
  } else {
    // SURAT PERMOHONAN (rekomendasi / standar / tidakwajib)
    var jenisPermohonan = '';
    if (jenis === 'rekomendasi') jenisPermohonan = 'Rekomendasi Teknis Penanganan Dampak Lalu Lintas';
    else if (jenis === 'standar') jenisPermohonan = 'Standar Teknis Penanganan Dampak Lalu Lintas';
    else jenisPermohonan = 'keterangan tidak wajib Andalalin';

    // Paragraf 1
    addLine('1. Sebagaimana dalam Undang-Undang Nomor 22 Tahun 2009 tentang Lalu Lintas dan Angkutan Jalan dan Peraturan Pemerintah Nomor 30 Tahun 2021 tentang Peraturan Pelaksanaan Undang-undang Nomor 6 Tahun 2023 tentang Penetapan Peraturan Pemerintah Pengganti Undang-undang Nomor 2 Tahun 2022 tentang Cipta Kerja menjadi Undang-Undang tentang Cipta Kerja untuk Lalu Lintas dan Angkutan Jalan, disebutkan bahwa untuk memperoleh persetujuan hasil analisis dampak lalu lintas, maka Pengembang atau Pembangun harus menyampaikan hasil analisis dampak lalu lintas kepada Bupati Semarang cq. Kepala Dinas Perhubungan Kabupaten Semarang yang bertanggung jawab di bidang sarana dan prasarana lalu lintas dan angkutan jalan sesuai dengan kewenangannya.', 10, false);
    addSpace(4);

    // Paragraf 2
    addLine('2. Menunjuk angka 1 (satu) di atas, disampaikan bahwa kami selaku pengembang/pembangun yaitu ' + perusahaan + ' berencana akan mengembangkan/membangun ' + objek + ' yang terletak di ' + lokasi + ' yang merupakan jalan kabupaten.', 10, false);
    addSpace(4);

    // Paragraf 3
    if (jenis === 'tidakwajib') {
      addLine('3. Sehubungan dengan angka 1 (satu) dan 2 (dua) di atas dan untuk kelancaran investasi, bersama ini kami mengajukan permohonan keterangan tidak wajib Andalalin pengembangan/pembangunan ' + objek + '. Sesuai dengan Peraturan Menteri Perhubungan Nomor 17 Tahun 2021 tentang Penyelenggaraan Analisis Dampak Lalu Lintas bahwa klasifikasi ' + objek + ' tidak ada dalam peraturan.', 10, false);
    } else {
      addLine('3. Sehubungan dengan angka 1 (satu) dan 2 (dua) di atas dan untuk kelancaran investasi, bersama ini kami mengajukan permohonan ' + jenisPermohonan + ' pengembangan/pembangunan ' + objek + '.', 10, false);
    }
    addSpace(4);

    // Paragraf 4 - Persyaratan
    addLine('4. Sebagai kelengkapan administrasi, terlampir kami sampaikan berkas persyaratan sebagai berikut:', 10, false);
    addSpace(2);

    var persyaratan = [];
    if (jenis === 'rekomendasi') {
      persyaratan = [
        'Permohonan Rekomendasi Teknis Penanganan Dampak Lalu Lintas',
        'Bukti Kepemilikan atau Penguasaan Lahan',
        'Bukti Kesesuaian Tata Ruang dan/atau izin Pemanfaatan Ruang',
        'Gambar Tata Letak Bangunan (Site Plan) dan DED Bangunan yang Diusulkan',
        'Foto Kondisi Lokasi Pembangunan Baru atau Pengembangan',
        'Dokumen Rekomendasi Teknis Penanganan Dampak Lalu Lintas ' + objek + ' yang dikerjakan oleh Konsultan ' + (konsultan || '..................')
      ];
    } else if (jenis === 'standar') {
      persyaratan = [
        'Permohonan Standar Teknis Penanganan Dampak Lalu Lintas',
        'FC KTP atau surat kuasa (jika dikuasakan)',
        'Bukti Kepemilikan atau Penguasaan Lahan',
        'Bukti Akte Pendirian Badan',
        'Bukti Kesesuaian Tata Ruang dan/atau izin Pemanfaatan Ruang',
        'Bukti Nomor Induk Berusaha (NIB)',
        'Bukti SPPL/PKKPR',
        'Gambar Tata Letak Bangunan (Site Plan) dan DED Bangunan yang Diusulkan',
        'Foto Kondisi Lokasi Pembangunan Baru atau Pengembangan',
        'Bukti surat arahan dari Dinas Lingkungan Hidup/Amdalnet',
        'Surat kesanggupan melaksanakan rekomendasi Andalalin (bermaterai)'
      ];
    } else {
      persyaratan = [
        'Surat permohonan tidak wajib Andalalin',
        'FC KTP atau surat kuasa (jika dikuasakan)',
        'Bukti kepemilikan atau penguasaan lahan',
        'Bukti akte pendirian badan',
        'Bukti kesesuaian tata ruang (ITR)',
        'Bukti Nomor Induk Berusaha (NIB)',
        'Bukti SPPL/PKKPR',
        'Gambar tata letak bangunan (Site Plan) dan DED bangunan yang diusulkan',
        'Foto kondisi lokasi pembangunan baru atau pengembangan',
        'MoU apabila ada perjanjian lahan (untuk sewa/kerja sama)',
        'Gambar sirkulasi (kendaraan, pejalan kaki, emergency, limbah), titik APAR, titik rambu lalu lintas, titik penerangan jalan umum dan titik CCTV',
        'Amdalnet/Bukti surat arahan dari Dinas Lingkungan Hidup',
        'Surat kesanggupan melaksanakan rekomendasi Andalalin (bermaterai)'
      ];
    }

    var huruf = 'abcdefghijklmnopqrstuvwxyz';
    persyaratan.forEach(function(item, idx) {
      addLine(huruf[idx] + '. ' + item + ';', 10, false, 8);
    });
    addSpace(4);

    // Paragraf 5
    addLine('5. Demikian permohonan ini kami sampaikan, atas perhatian dan kerjasamanya, kami ucapkan terima kasih.', 10, false);
  }

  // === TANDA TANGAN ===
  addSpace(14);
  doc.text('Pemohon', 140, y); y += lineH * 5;
  doc.setFont('helvetica', 'bold');
  doc.text(pemohon, 140, y); y += lineH;
  doc.setFont('helvetica', 'normal');
  if (jabatan && jabatan !== '(Jabatan)') {
    doc.text('(' + jabatan + ')', 140, y); y += lineH;
  }

  // === TEMBUSAN ===
  addSpace(10);
  addLine('Tembusan Yth. :', 9, false);
  addLine('1. Bupati Semarang;', 9, false, 4);
  addLine('2. Kepala Dinas Perhubungan Kabupaten Semarang;', 9, false, 4);
  addLine('3. Arsip.', 9, false, 4);

  // === SAVE ===
  var filename = 'Surat_' + jenis.charAt(0).toUpperCase() + jenis.slice(1) + '_' + perusahaan.replace(/[^a-zA-Z0-9]/g, '_') + '.pdf';
  doc.save(filename);

  alert('Surat berhasil di-generate! File PDF telah diunduh.');
}
