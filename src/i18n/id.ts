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

    // Project Admin Controls & CRUD
    addProjectBtn: '+ TAMBAH PROYEK',
    editProjectBtn: 'EDIT PROYEK',
    deleteProjectBtn: 'HAPUS',
    projectTitleLabel: 'JUDUL PROYEK:',
    projectCategoryLabel: 'KATEGORI PROYEK:',
    projectDescriptionLabel: 'DESKRIPSI PROYEK:',
    projectTechLabel: 'TECH STACK (PISAH DENGAN KOMA):',
    projectDemoLabel: 'DEMO / LIVE URL:',
    projectGithubLabel: 'GITHUB REPOSITORY URL:',
    projectImagesLabel: 'DOKUMENTASI FOTO / GAMBAR:',
    projectVideoLabel: 'URL DEMO VIDEO (YOUTUBE / TIKTOK / MP4):',
    projectSavedToast: 'Proyek berhasil disimpan!',
    projectDeletedToast: 'Proyek berhasil dihapus dari rack.',
    resetProjectsBtn: 'RESET PROYEK DEFAULT',
    resetProjectsPrompt: 'Kembalikan seluruh daftar proyek ke bawaan sistem?',
    authProjectsPrompt: 'Masukkan kata sandi admin untuk mengelola katalog proyek.',
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

    // Education & Qualification Actions & Modals
    addEduBtn: '+ TAMBAH PENDIDIKAN',
    editEduBtn: 'EDIT PENDIDIKAN',
    deleteEduBtn: 'HAPUS',
    addCertBtn: '+ TAMBAH KUALIFIKASI / SERTIFIKASI',
    editCertBtn: 'EDIT SERTIFIKASI',
    deleteCertBtn: 'HAPUS',
    resetDefaultBtn: 'RESET KE DATA AWAL',
    resetConfirmTitle: 'KEMBALIKAN DATA BAWAAN?',
    resetConfirmDesc: 'Seluruh riwayat pendidikan & sertifikasi akan dikembalikan ke data awal sistem.',
    viewDocBtn: 'LIHAT DOKUMEN / FOTO',
    viewCertDocBtn: 'LIHAT BUKTI DOKUMEN',
    noDocAttached: 'Belum ada dokumen lampiran',
    docPreviewTitle: 'INSPEKSI DOKUMEN // LAMPIRAN RESMI',
    downloadDoc: 'BUKA TAUTAN / FILE ASLI',
    closeModal: 'TUTUP',
    cancel: 'BATAL',
    saveEntry: 'SIMPAN ENTRY',
    saving: 'MENYIMPAN...',
    fieldOfStudy: 'BIDANG STUDI / JURUSAN:',
    degreeLabel: 'GELAR / JENJANG AKADEMIK:',
    schoolLabel: 'INSTITUSI / UNIVERSITAS / SEKOLAH:',
    locationLabel: 'LOKASI:',
    periodLabel: 'PERIODE (THN MULAI - SELESAI):',
    gpaFormLabel: 'NILAI / IPK (MISAL: 3.66/4.0):',
    statusLabel: 'STATUS KELULUSAN:',
    achievementsLabel: 'AKTIVITAS & PENCAPAIAN (PISAH DENGAN ENTER):',
    descriptionLabel: 'DESKRIPSI / RINGKASAN:',
    mediaSourceLabel: 'DOKUMEN ATAU FOTO PENDUKUNG (SERTIFIKAT / AKTIFITAS):',
    uploadMethodFile: 'UNGGAH GAMBAR (JPG, PNG, WEBP)',
    uploadMethodUrl: 'GUNAKAN TAUTAN URL DOKUMEN',
    dropOrClickToUpload: 'Klik atau tarik file dokumen ke sini',
    pasteDocUrlPlaceholder: 'https://...',
    docNameLabel: 'LABEL / NAMA DOKUMEN:',
    deleteConfirmTitle: 'KONFIRMASI HAPUS ENTRI',
    deleteConfirmPrompt: 'Apakah Anda yakin ingin menghapus entri ini dari sistem?',
    deleteConfirmBtn: 'YA, HAPUS PERMANEN',
    certNameLabel: 'NAMA KUALIFIKASI / SERTIFIKASI:',
    issuerLabel: 'LEMBAGA / ORGANISASI PENERBIT:',
    issueDateLabel: 'TANGGAL TERBIT (MISAL: 12 September 2025):',
    validUntilLabel: 'TANGGAL BERAKHIR / MASA BERLAKU:',
    noExpiration: 'Tidak ada masa berlaku',
    credentialIdLabel: 'ID KREDENSIAL / NO. SERTIFIKAT:',
    verifyUrlLabel: 'URL VERIFIKASI RESMI:',
    skillsLabel: 'KEAHLIAN TERKAIT (PISAH DENGAN KOMA):',
    categoryLabel: 'KATEGORI SPESIALISASI:',
    levelLabel: 'TINGKATAN / LEVEL:',
    filterCategoryAll: 'SEMUA KATEGORI',
    searchCertPlaceholder: 'Cari nama sertifikasi, penerbit, atau keahlian...',
    toastAdded: 'Entri berhasil ditambahkan ke logbook.',
    toastUpdated: 'Entri berhasil diperbarui.',
    toastDeleted: 'Entri berhasil dihapus.',
    toastReset: 'Data berhasil dikembalikan ke pengaturan awal.',

    // Section Filters / Navigation
    sectionAll: 'SEMUA LOGBOOK',
    sectionEdu: 'PENDIDIKAN',
    sectionWork: 'PENGALAMAN KERJA',
    sectionCerts: 'KUALIFIKASI & SERTIFIKASI',
    sectionPubs: 'PUBLIKASI RISET',

    // Modal Tabs (Compact Zero-Scroll Architecture)
    tabBasicInfo: '1. DATA UTAMA',
    tabDetailsMedia: '2. PENCAPAIAN & DOKUMEN',
    tabCertGeneral: '1. DATA SERTIFIKASI',
    tabCertCredentials: '2. KREDENSIAL & DOKUMEN',
    nextTab: 'LANJUT KE DOKUMEN >',
    prevTab: '< KEMBALI KE DATA UTAMA',

    // Security & Admin Passcode
    adminLocked: 'AKSES TERKUNCI',
    adminUnlocked: 'MODE ADMIN TERBUKA',
    adminAuthRequired: 'OTENTIKASI ADMIN DIPERLUKAN',
    adminAuthPrompt: 'Menambah, mengubah, atau menghapus entri logbook memerlukan verifikasi sandi pemilik portofolio.',
    adminLockBtn: 'KUNCI KEMBALI',
    adminUnlockBtn: 'BUKA AKSES ADMIN',
    enterPasscode: 'MASUKKAN KATA SANDI ADMIN',
    authSuccessToast: 'Otentikasi admin berhasil. Akses modifikasi aktif.',
    authFailedToast: 'Kata sandi salah. Akses ditolak.',
    adminStatusTitle: 'STATUS KEAMANAN LOGBOOK:',

    // Track 02 Work Experience CRUD
    addWorkBtn: '+ TAMBAH PENGALAMAN KERJA',
    editWorkBtn: 'EDIT PENGALAMAN',
    deleteWorkBtn: 'HAPUS',
    roleLabel: 'POSISI / PERAN JABATAN:',
    companyLabel: 'PERUSAHAAN / INSTANSI:',
    badgeLabel: 'TIPE / BADGE (MISAL: MAGANG / TETAP / KONTRAK):',
    responsibilitiesLabel: 'TANGGUNG JAWAB & CAPAIAN (PISAH DENGAN ENTER):',
    tabWorkGeneral: '1. DATA PEKERJAAN',
    tabWorkMedia: '2. TUGAS & FOTO DOKUMENTASI',

    // Multi-Photo Support
    multiPhotoNotice: 'PILIH 1 ATAU LEBIH FOTO (BISA MULTI-FOTO)',
    photosAttached: 'FOTO TERCATAT',
    noPhotosAttached: 'Belum ada foto/dokumen pendukung',
    viewPhotos: 'LIHAT DOKUMEN / FOTO',
    photoOf: 'DARI',
    prevPhoto: 'FOTO SEBELUMNYA',
    addMorePhotos: '+ Tambah Foto Lagi',

    // AI Translation & Multilingual Inputs
    aiTranslateBtn: '⚡ AI AUTO-TRANSLATE (ID ➔ EN)',
    aiTranslating: 'MENERJEMAHKAN VIA AI...',
    aiTranslateSuccess: 'Berhasil diterjemahkan otomatis ke Bahasa Inggris!',
    langTabId: '🇮🇩 INDONESIA',
    langTabEn: '🇬🇧 ENGLISH',
    enInputNotice: 'Teks Bahasa Inggris akan otomatis tampil saat pengunjung memilih bahasa EN.',

    // Publications CRUD
    addPubBtn: '+ TAMBAH PUBLIKASI',
    editPubBtn: 'EDIT PUBLIKASI',
    deletePubBtn: 'HAPUS',
    pubTitleLabel: 'JUDUL PENELITIAN / ARTIKEL ILMIAH:',
    journalLabel: 'NAMA JURNAL / PENERBIT RESMI:',
    pubYearLabel: 'TAHUN PUBLIKASI:',
    authorLabel: 'PENULIS / KONTRIBUTOR:',
    doiLabel: 'NOMOR DOI (OPSIONAL):',
    pubUrlLabel: 'URL TAUTAN JURNAL RESMI:',
    tabPubGeneral: '1. DATA PUBLIKASI',
    tabPubMedia: '2. LAMPIRAN DOKUMEN RISET',
  },

  // Localized Content for Logbook Data (ID)
  resumeData: {
    education: {
      'edu-uin-malang-s1': {
        degree: 'S1 - Teknik Informatika',
        school: 'UIN Maulana Malik Ibrahim Malang',
        location: 'Malang, Indonesia',
        achievements: [
          'Lulus dengan predikat Cum Laude',
          "Menerbitkan jurnal ilmiah tentang 'Klasifikasi Penyakit Padi Menggunakan Convolutional Neural Network (CNN) Berbasis Citra Daun' di 'Jurnal Nasional Teknik Elektro dan Teknologi Informasi (JNTETI) UGM'"
        ]
      }
    },
    experiences: {
      'e1': {
        role: 'Information Technology (IT) Intern',
        company: 'Lembaga Pemasyarakatan Narkotika IIA',
        badge: 'Magang',
        description: [
          'Mengembangkan dan memelihara aplikasi berbasis web sesuai kebutuhan instansi.',
          'Menangani troubleshooting dan menyelesaikan kendala pada website, aplikasi, serta sistem informasi internal.',
          'Melakukan pemeliharaan preventif dan perbaikan perangkat komputer, printer, serta jaringan.',
          'Memberikan dukungan teknis kepada pengguna untuk memastikan kelancaran operasional sistem dan infrastruktur TI.'
        ]
      },
      'e2': {
        role: 'Natural Language Processing',
        company: 'PT. Arion Indonesia',
        badge: 'Magang',
        description: [
          'Berhasil mengumpulkan data teks terkait Cak Nun dari platform media sosial dan berita online menggunakan API.',
          'Melakukan pra-pemrosesan data teks (text preprocessing) untuk persiapan analisis sentimen.',
          'Membangun dan melatih model klasifikasi untuk sentimen (positif, negatif, netral).',
          'Melakukan pengujian dan evaluasi performa model menggunakan data uji.',
          'Melakukan koreksi dan pelabelan manual untuk meningkatkan akurasi data hasil prediksi.',
          'Menyusun laporan akhir yang merangkum hasil dan temuan dari analisis sentimen.'
        ]
      },
      'e3': {
        role: 'Agricultural Data Analyst',
        company: 'PT. Arion Indonesia',
        badge: 'Magang',
        description: [
          'Menyelesaikan pemetaan udara pada 2 area proyek menggunakan drone, meliputi area depan kantor dan area persawahan di sekitar kawasan perumahan.',
          'Mengolah citra hasil pemotretan menjadi model dan peta 3D untuk kebutuhan analisis lahan.',
          'Melakukan analisis kondisi dan tingkat kesuburan lahan menggunakan platform GIS perusahaan berdasarkan visualisasi warna pada peta.'
        ]
      }
    },
    certifications: {
      'cert-ai-milenial-2025': {
        name: 'AI Engineer For Milenial',
        issuer: 'Pusat Pengembangan Literasi Digital',
        category: 'Kecerdasan Artifisial',
        validUntil: 'Tidak ada masa berlaku',
        skills: ['Dasar-Dasar Rekayasa Prompt (Prompt Engineering Fundamentals)', 'Peningkatan Produktivitas dengan AI', 'Optimisasi Prompt (Prompt Optimization)']
      },
      'cert-azure-prompt-2025': {
        name: 'Menerapkan rekayasa prompt dengan Azure OpenAI Service',
        issuer: 'DTS Kominfo & ElevAlte',
        category: 'Generative AI',
        validUntil: 'Tidak ada masa berlaku',
        skills: ['Rekayasa Prompt (Prompt Engineering)', 'Desain & Optimisasi Prompt (Prompt Design & Optimization)', 'Azure OpenAI Service', 'Teknik Prompt Lanjutan (Instruction & Contextual Prompting)']
      },
      'cert-linear-ml-2025': {
        name: 'Linear Models in Machine Learning: Fundamentals',
        issuer: 'DTS Kominfo & Yandex (Fresh Graduate Academy)',
        category: 'Machine Learning',
        validUntil: 'Tidak ada masa berlaku',
        skills: ['Konsep Dasar Machine Learning', 'Data Preprocessing (Missing Data, Outlier)', 'Data Splitting & Scaling', 'Linear Regression & Gradient Descent', 'Regularization (L1 & L2)', 'Scikit-learn & Modeling Pipelines', 'Evaluasi Model (R² & MSE)']
      },
      'cert-intro-datascience-2025': {
        name: 'Pengenalan Data Science dan Pemanfaatannya di Berbagai Sektor',
        issuer: 'DTS Kominfo',
        category: 'Data Analis',
        validUntil: 'Tidak ada masa berlaku',
        skills: ['Konsep Dasar Data Science (Data Science Fundamentals)', 'Aplikasi Data Science (Studi Kasus Lintas Sektor)']
      },
      'cert-career-data-analytics-2025': {
        name: 'Wawasan Karir dalam Bidang Data Analytics',
        issuer: 'DTS Kominfo',
        category: 'Data Analis',
        validUntil: 'Tidak ada masa berlaku',
        skills: ['Dasar-Dasar Data Analytics', 'Alur Kerja Analitika Data', 'Visualisasi & Interpretasi Data']
      },
      'cert-ai-security-2025': {
        name: 'Dasar-dasar Keamanan AI',
        issuer: 'DTS Kominfo & ElevAlte',
        category: 'Keamanan AI',
        validUntil: 'Tidak ada masa berlaku',
        skills: ['Konsep Keamanan AI (AI Security Concepts)', 'Analisis Ancaman & Serangan AI (AI Threat & Attack Analysis)', 'Manajemen Risiko AI', 'Analisis Arsitektur Keamanan AI']
      },
      'cert-pdp-privacy-2025': {
        name: 'Seberapa Penting Menjaga Data Pribadi dan Pelindungannya',
        issuer: 'DTS Kominfo',
        category: 'Sistem Manajemen Keamanan Informasi',
        validUntil: 'Tidak ada masa berlaku',
        skills: ['Pelindungan Data Pribadi', 'Teori dan Regulasi Kebijakan PDP', 'Prinsip Pelindungan Data Pribadi', 'Studi Kasus: Implementasi Pelindungan Data Pribadi']
      },
      'cert-ai-implementation-2025': {
        name: 'Dasar-Dasar Implementasi Kecerdasan Artifisial',
        issuer: 'DTS Kominfo',
        category: 'Kecerdasan Artifisial',
        validUntil: 'Tidak ada masa berlaku',
        skills: ['Pengenalan Teknologi AI', 'Penerapan Perlindungan Data Pribadi', 'Etika dalam Penggunaan AI']
      },
      'cert-alibaba-bigdata-2023': {
        name: 'Alibaba Cloud: Big Data Fundamentals',
        issuer: 'DTS Kominfo (Pusbang Proserti) & Alibaba Cloud',
        category: 'Cloud Computing',
        validUntil: 'Tidak ada masa berlaku',
        skills: ['Dasar-Dasar Big Data (Big Data Fundamentals)', 'Data Warehousing & Pemrosesan Data', 'Tools Pemrosesan Data Lanjutan', 'Visualisasi Data, Machine Learning, & AI']
      }
    },
    publications: {
      'pub1': {
        title: 'Klasifikasi Penyakit Padi Menggunakan Convolutional Neural Network (CNN) Berbasis Citra Daun',
        journal: 'Jurnal Nasional Teknik Elektro dan Teknologi Informasi (JNTETI) UGM',
        author: 'Moh. Heri Susanto'
      }
    }
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
