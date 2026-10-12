// Indonesian translations
export const id = {
  // Navigation
  nav: {
    overview: 'OVERVIEW',
    overviewSub: 'Ringkasan Sistem',
    projects: 'MODULES',
    projectsSub: 'Koleksi Karya',
    resume: 'DOSSIER',
    resumeSub: 'Kualifikasi & Edu',
    contact: 'COMMS',
    contactSub: 'Saluran Kontak',
    channel: 'CHANNEL',
  },

  // Header
  header: {
    brand: 'MHS.INSTRUMENT // ARCHITECTURE v2.6',
    brandSub: 'AI SYSTEMS & FULL-STACK ENGINE',
    status: 'SYS_ONLINE: SIAP DEPLOY',
    homeTitle: 'Unit Home',
    waTitle: 'Direct WhatsApp',
    emailTitle: 'Direct Email',
  },

  // Language Switcher
  lang: {
    id: 'ID',
    en: 'EN',
    switchTo: 'Ganti Bahasa',
    ariaLabel: 'Pilih Bahasa / Language Selector',
  },

  // Overview Tab
  overview: {
    headerLabel: 'UNIT CONSOLE // CORE ARCHITECTURE',
    serial: 'SERIAL: MHS-2026-ENG',
    operationalLabel: 'OPERATIONAL // SPESIALIS REKAYASA AI & WEB',
    headline: 'Sistem Cerdas, Arsitektur Bersih, dan Komputasi Efisien.',
    modulesLabel: 'MODUL TERPASANG:',
    modules: ['VISION: CNN MANUAL', 'NLP: LSTM + FASTTEXT', 'FULLSTACK: REACT + LARAVEL/FLASK', 'STORAGE: POSTGRES & SQLITE'],
    strengthsHeader: 'PILAR KOMPETENSI REKAYASA',
    strengthsCount: '4 COPROCESSOR UNITS',
    skillsHeader: 'MATRIKS TEKNOLOGI & PERANGKAT',
    skillsCount: '21 VERIFIED TOOLS',
    skillsItemCount: 'ITEMS',
    categoryLabels: {
      core: 'BAY 01 // BAHASA PEMROGRAMAN & CORE',
      framework: 'BAY 02 // FRAMEWORK & WEB RUNTIMES',
      db: 'BAY 03 // BASIS DATA & RELATIONAL STORAGE',
      tool: 'BAY 04 // INSTRUMEN PENGEMBANGAN & CLOUD',
    },
    unitLabel: 'UNIT_0',
  },

  // Strengths (Indonesian versions)
  strengths: {
    s1: {
      title: 'Menulis Kode Berkualitas',
      description: 'Menstrukturkan kode dengan arsitektur terbaik, terdokumentasi dengan baik, serta mengutamakan aspek modularitas agar mudah dipelihara dan dikembangkan.',
    },
    s2: {
      title: 'Pemecahan Masalah (Problem-Solving)',
      description: 'Kemampuan menganalisis masalah kompleks, mengidentifikasi akar penyebab secara sistematis, dan mengimplementasikan solusi teknis yang akurat.',
    },
    s3: {
      title: 'Pembelajaran Berkelanjutan',
      description: 'Selalu mengikuti perkembangan teknologi terbaru di bidang AI dan Web, mulai dari model bahasa kustom hingga framework arsitektur frontend terbaru.',
    },
    s4: {
      title: 'Perhatian pada Detail',
      description: 'Sangat teliti terhadap performa aplikasi, keamanan sistem, kenyamanan pengalaman pengguna (UX), serta akurasi fungsional terkecil.',
    },
  },

  // Projects Tab
  projects: {
    header: 'RAK MODUL PRODUK & RISET',
    total: 'TOTAL',
    modul: 'MODUL',
    filterLabel: 'FILTER:',
    categories: ['Semua', 'AI Project', 'AI & Web Project', 'Web Project', 'Frontend Web Project'],
    allLabel: 'Semua',
    verified: 'VERIFIED',
    noFeed: 'NO_OPTICAL_FEED',
    prevFrame: 'Sebelumnya',
    nextFrame: 'Selanjutnya',
    frame: 'FRAME',
    playVideo: 'PUTAR DEMO VIDEO',
    likeLabel: 'SUKA',
    logLabel: 'LOG',
    commentPlaceholder: 'Tulis komentar transmisi...',
    namePlaceholder: 'NAMA PENGIRIM (OPSIONAL)',
    sendButton: 'KIRIM',
    noComments: 'Belum ada transmisi log.',
    demoButton: 'LIHAT DEMO WEB',
    playButton: 'PUTAR DEMO',
    closePlayer: 'TUTUP PLAYER',
    // Project descriptions
    p1: {
      title: 'Rice Doctor AI',
      description: 'Aplikasi web AI untuk klasifikasi penyakit tanaman padi. Frontend dibangun dengan React + Tailwind, backend menggunakan Flask yang dijalankan dari Jupyter Notebook, serta model CNN kustom yang dibuat secara manual tanpa menggunakan library CNN pada umumnya dan disimpan dalam format Pickle.',
    },
    p2: {
      title: 'Klasifikasi Citra Keris (KNN & HOG)',
      description: 'Sistem klasifikasi untuk mengidentifikasi jenis (dapur) keris berdasarkan citra. Proses ini menggunakan ekstraksi fitur Histogram of Oriented Gradients (HOG) dan algoritma K-Nearest Neighbors (KNN) yang diimplementasikan sepenuhnya secara manual (from scratch) di Jupyter Notebook. Antarmuka pengguna (GUI) sederhana dibangun menggunakan Tkinter untuk proses unggah gambar.',
    },
    p3: {
      title: 'Chatbot Asisten Rumah Sakit - Part 1',
      description: 'Untuk proyek chatbot ini, saya membangun model NLU menggunakan arsitektur LSTM. Untuk mendapatkan pemahaman semantik Bahasa Indonesia yang mendalam, saya memanfaatkan model word embedding pre-trained dari fastText (cc.id.300.vec), yang secara signifikan meningkatkan akurasi deteksi intent pada dataset yang terbatas.',
    },
    p4: {
      title: 'Chatbot Asisten Rumah Sakit - Part 2',
      description: 'Perbaikan Frontend dengan menggunakan React dan Backend Laravel.',
    },
    p5: {
      title: 'Perbaikan Tampilan Website Profil Instansi (Joomla)',
      description: 'Perbaikan tampilan website berbasis Joomla yang meliputi pengaturan navbar, struktur menu, dan konsistensi layout pada beberapa halaman agar lebih rapi, informatif, dan mudah diakses.',
    },
    p6: {
      title: 'Loker Tracker',
      description: 'Digunakan untuk melakukan pendataan loker yang telah saya daftarkan atau belum saya daftarkan dan digunakan agar tidak lupa loker yang telah saya daftarkan.',
    },
    p7: {
      title: 'PAS Assistant',
      description: 'PAS Assistant adalah aplikasi sistem informasi dan layanan mandiri yang dirancang untuk mempermudah akses pelayanan publik (khususnya lingkup Pemasyarakatan). Sistem ini dilengkapi dengan fitur rekapitulasi pada Dashboard, manajemen Daftar Kunjungan, Pengecekan Status, panel Informasi, hingga integrasi Chatbot untuk layanan tanya-jawab secara interaktif.',
    },
    p8: {
      title: 'Si-Aris',
      description: 'Si-Aris adalah platform manajemen arisan dharma wanita dengan fitur undian online dan cetak nama offline.',
    },
  },

  // Resume Tab
  resume: {
    header: 'LOGBOOK KUALIFIKASI & RIWAYAT KERJA',
    status: 'STATUS: VERIFIED CADRE',
    educationTrack: 'TRACK 01 // PENDIDIKAN AKADEMIK',
    educationLevel: 'STRATA 1',
    workTrack: 'TRACK 02 // PENGALAMAN INDUSTRI & MAGANG',
    workLevel: 'PROFESSIONAL',
    period: 'PERIODE:',
    certHeader: 'SERTIFIKASI KOMPETENSI RESMI',
    pubHeader: 'PUBLIKASI RISET & JURNAL',
    issuer: 'PENERBIT:',
    level: 'LEVEL:',
    release: 'RILIS:',
    validUntil: 'BERLAKU:',
    author: 'PENULIS:',
    published: 'DITERBITKAN:',
    verify: 'VERIFIKASI',
    openJournal: 'BUKA JURNAL',
    gpaLabel: 'IPK',
  },

  // Contact Tab
  contact: {
    header: 'TERMINAL TRANSMISI & KOMUNIKASI',
    status: 'STATUS: DUPLEX CHANNEL READY',
    primaryChannelLabel: 'SALURAN ELEKTRONIK UTAMA:',
    copyEmail: 'SALIN ALAMAT EMAIL',
    emailCopied: 'SALINAN BERHASIL DISIMPAN',
    whatsappLabel: 'FAST CHANNEL // WHATSAPP:',
    whatsappButton: 'HUBUNGI VIA WA',
    responseTime: 'WAKTU RESPON:',
    responseValue: '< 24 JAM KERJA',
    timezone: 'ZONA WAKTU:',
    timezoneValue: 'INDONESIA (WIB // GMT+7)',
    protocolStatus: 'STATUS PROTOKOL:',
    protocolValue: 'AKTIF & TERBUKA',
    consoleTitle: 'DISPATCH CONSOLE // TRANSMIT MESSAGE',
    consolePort: 'INPUT PORT 80',
    nameLabel: 'NAMA LENGKAP *',
    namePlaceholder: 'Mis. Bambang',
    emailLabel: 'ALAMAT EMAIL *',
    subjectLabel: 'SUBJEK PESAN',
    subjectPlaceholder: 'Penawaran Proyek / Diskusi AI',
    messageLabel: 'ISI TRANSMISI PESAN *',
    messagePlaceholder: 'Jelaskan kebutuhan proyek, target waktu, atau pertanyaan teknis...',
    submitButton: 'KIRIMKAN TRANSMISI SEKARANG',
    submittingButton: 'MENGIRIMKAN TRANSMISI...',
    successTitle: '[TRANSMISI SUKSES DITERIMA]',
    successMessage: 'Terima kasih. Pesan Anda telah masuk ke antrean kotak masuk saya.',
    errorPrefix: '[ERROR]',
    validationError: 'Mohon lengkapi semua kolom bertanda *',
    emailError: 'Format alamat email kurang valid',
    networkError: 'Koneksi internet bermasalah. Coba kembali.',
    serverError: 'Koneksi server gagal.',
    genericError: 'Gagal mengirim transmisi. Coba kembali.',
  },

  // Sidebar
  sidebar: {
    unitStamp: 'UNIT_MHS // MOD-01',
    systemOnline: 'SYS_ONLINE',
    biometricRaw: 'BIOMETRIC RAW',
    changePhoto: 'GANTI FOTO',
    syncCloud: 'SYNC CLOUD...',
    ccdSpec: 'CCD_360PX',
    calibrated: 'CALIBRATED',
    location: 'GMT+7',
    downloadCV: 'UNDUH DOKUMEN CV',
    statusReady: 'STATUS: SIAP PROYEK & KONTRAK',
    externalPorts: 'PORT KOMUNIKASI EKSTERNAL:',
    cloudError: '[SYS_WARN] Izin cloud database terbatas. Foto aktif di cache lokal.',
    viewfinderCorners: ['┌', '┐', '└', '┘'],
  },

  // Floating Transceiver
  transceiver: {
    title: 'TRANSCEIVER // PESAN CEPAT',
    openTitle: 'Buka Transceiver Cepat',
    nameLabel: 'NAMA *',
    namePlaceholder: 'Nama Anda',
    emailLabel: 'EMAIL *',
    messagePlaceholder: 'Ketik pesan cepat...',
    messageLabel: 'PESAN *',
    sendButton: 'TRANSMIT PING',
    sending: 'MENGIRIM...',
    successTitle: '[TRANSMISI DITERIMA]',
    successMessage: 'Terima kasih. Pesan instan telah masuk ke sistem.',
    validationError: 'Mohon isi semua kolom bertanda *',
    sendError: 'Gagal mengirim transmisi.',
    subjectPrefix: 'Pesan Transceiver Cepat',
  },

  // Passcode Modal
  modal: {
    authTitle: 'OTENTIKASI AKSES ADMIN',
    authDesc: 'Masukkan passcode pemilik unit untuk mengunggah foto profil.',
    passcodePlaceholder: 'PASSCODE',
    cancel: 'BATAL',
    verify: 'VERIFIKASI',
    forgotPassword: 'Lupa kata sandi? Kirim link reset ke email',
    wrongPasscode: 'Kunci otentikasi salah.',
    resetTitle: 'RESET KATA SANDI',
    resetDesc: 'Link reset akan dikirimkan ke email admin:',
    resetNote: 'Perubahan kata sandi memerlukan persetujuan melalui email.',
    back: 'KEMBALI',
    sendEmail: 'KIRIM EMAIL',
    sending: 'MENGIRIM...',
    emailSentTitle: 'EMAIL TERKIRIM',
    emailSentDesc: 'Link reset kata sandi telah dikirim ke:',
    emailSentNote: 'Periksa inbox atau folder spam. Link berlaku 1 jam.',
    close: 'TUTUP',
    emailConfigError: 'EmailJS belum dikonfigurasi. Lihat panduan setup di konsol.',
    emailSendError: 'Gagal mengirim email. Periksa konfigurasi EmailJS.',
  },

  // Personal Info (bilingual)
  personal: {
    bio: 'Lulusan Teknik Informatika dengan semangat besar di bidang Kecerdasan Buatan dan Pengembangan Web. Saya fokus membangun solusi aplikasi yang tidak hanya cerdas, namun juga efisien dan mudah digunakan secara modern.',
    stats: {
      year: 'Tahun',
      project: 'Proyek',
      cert: 'Sertifikat',
    },
  },

  // Background
  background: {
    coords: '+ LAT: -07.1523° // LON: 112.7521°',
    calibration: 'SYS_CALIBRATION // STABLE',
    clock: 'CLK: 3.20 GHz // SAMPLING: 96kHz',
    brand: '+ TE-INSTRUMENTATION CHASSIS',
  },
};

export type Translations = typeof id;
