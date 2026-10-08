import { ReactNode } from 'react';
import { SkillItem, StrengthItem, ProjectItem, ExperienceItem, Certification, PublicationItem, Education } from './types';

import image0 from "../assets/image.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import lockertracker from "../assets/locker-tracker.png";
import lockertracker1 from "../assets/locker-tracker1.png";

export const PERSONAL_INFO = {
  name: 'Moh. Heri Susanto',
  nickname: 'Heri',
  title: 'AI Engineer & Web Developer',
  location: 'Indonesia',
  email: 'heribangkal21@gmail.com',
  bio: 'Lulusan Teknik Informatika dengan semangat besar di bidang Kecerdasan Buatan dan Pengembangan Web. Saya fokus membangun solusi aplikasi yang tidak hanya cerdas, namun juga efisien dan mudah digunakan secara modern.',
  stats: [
    { label: 'Tahun', value: '3+' },
    { label: 'Proyek', value: '7+' },
    { label: 'Sertifikat', value: '6+' }
  ],
  socials: {
    github: 'https://github.com/MheriS',
    linkedin: 'https://www.linkedin.com/in/harmonyman/',
    instagram: 'https://www.instagram.com/harmonyman21/'
  },
  resumeUrl: 'https://drive.google.com/file/d/1wO-2LAXUyPFdbrMUwdoL5f_Ns5v96Gbe/view?usp=sharing'
};

export const STRENGTHS: StrengthItem[] = [
  {
    id: 's1',
    title: 'Menulis Kode Berkualitas',
    description: 'Menstrukturkan kode dengan arsitektur terbaik, terdokumentasi dengan baik, serta mengutamakan aspek modularitas agar mudah dipelihara dan dikembangkan.',
    iconName: 'Codexml'
  },
  {
    id: 's2',
    title: 'Pemecahan Masalah (Problem-Solving)',
    description: 'Kemampuan menganalisis masalah kompleks, mengidentifikasi akar penyebab secara sistematis, dan mengimplementasikan solusi teknis yang akurat.',
    iconName: 'Lightbulb'
  },
  {
    id: 's3',
    title: 'Pembelajaran Berkelanjutan',
    description: 'Selalu mengikuti perkembangan teknologi terbaru di bidang AI dan Web, mulai dari model bahasa kustom hingga framework arsitektur frontend terbaru.',
    iconName: 'Bookmark'
  },
  {
    id: 's4',
    title: 'Perhatian pada Detail',
    description: 'Sangat teliti terhadap performa aplikasi, keamanan sistem, kenyamanan pengalaman pengguna (UX), serta akurasi fungsional terkecil.',
    iconName: 'Target'
  }
];

export const SKILLS: SkillItem[] = [
  // Core Languages
  { name: 'HTML5', category: 'core', iconName: 'Html5' },
  { name: 'CSS3', category: 'core', iconName: 'Css3' },
  { name: 'JavaScript', category: 'core', iconName: 'Js' },
  { name: 'TypeScript', category: 'core', iconName: 'Ts' },
  { name: 'Python', category: 'core', iconName: 'Py' },

  // Frameworks & Libraries
  { name: 'React', category: 'framework', iconName: 'React' },
  { name: 'Vue.js', category: 'framework', iconName: 'Vue' },
  { name: 'Laravel', category: 'framework', iconName: 'Laravel' },
  { name: 'Flask', category: 'framework', iconName: 'Flask' },
  { name: 'Tailwind CSS', category: 'framework', iconName: 'Tailwind' },
  { name: 'Bootstrap', category: 'framework', iconName: 'Bootstrap' },
  { name: 'Node.js', category: 'framework', iconName: 'Node' },

  // Databases
  { name: 'MySQL', category: 'db', iconName: 'Mysql' },
  { name: 'PostgreSQL', category: 'db', iconName: 'Postgres' },

  // Tools & Cloud
  { name: 'Git', category: 'tool', iconName: 'Git' },
  { name: 'VS Code', category: 'tool', iconName: 'Vscode' },
  { name: 'Postman', category: 'tool', iconName: 'Postman' },
  { name: 'Laragon', category: 'tool', iconName: 'Laragon' },
  { name: 'Vercel', category: 'tool', iconName: 'Vercel' },
  { name: 'Figma', category: 'tool', iconName: 'Figma' },
  { name: 'Vite', category: 'tool', iconName: 'Vite' }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "p1",
    title: "Rice Doctor AI",
    description: "Aplikasi web AI untuk klasifikasi penyakit tanaman padi. Frontend dibangun dengan React + Tailwind, backend menggunakan Flask yang dijalankan dari Jupyter Notebook, serta model CNN kustom yang dibuat secara manual tanpa menggunakan library CNN pada umumnya dan disimpan dalam format Pickle.",
    image: "https://img.youtube.com/vi/rY8eM0eybCY/hqdefault.jpg",
    tech: ["React", "Tailwind", "Flask", "Python", "CNN", "Jupyter", "SQLite"],
    demo: "https://www.youtube.com/watch?v=rY8eM0eybCY",
    github: [
      { label: "Frontend", url: "https://github.com/MheriS/RiceDoctorAI_Fe" },
      { label: "Backend", url: "https://github.com/MheriS/RiceDoctorAI_Be" }
    ],
    type: "AI & Web Project",
    isSuccessful: true,
  },
  {
    id: "p2",
    title: "Klasifikasi Citra Keris (KNN & HOG)",
    description: "Sistem klasifikasi untuk mengidentifikasi jenis (dapur) keris berdasarkan citra. Proses ini menggunakan ekstraksi fitur Histogram of Oriented Gradients (HOG) dan algoritma K-Nearest Neighbors (KNN) yang diimplementasikan sepenuhnya secara manual (from scratch) di Jupyter Notebook. Antarmuka pengguna (GUI) sederhana dibangun menggunakan Tkinter untuk proses unggah gambar.",
    image: "https://img.youtube.com/vi/GNdiLdMfAyQ/hqdefault.jpg",
    tech: ["Python", "Jupyter", "Tkinter", "KNN", "HOG", "NumPy"],
    demo: "https://www.youtube.com/watch?v=GNdiLdMfAyQ",
    github: [
      { label: "Code", url: "https://github.com/MheriS/IdentifikasiJenisAsalKeris" }
    ],
    type: "AI Project",
    isSuccessful: true,
  },
  {
    id: "p3",
    title: "Chatbot Asisten Rumah Sakit (versi sementara) - Part 1",
    description: "Untuk proyek chatbot ini, saya membangun model NLU menggunakan arsitektur LSTM. Untuk mendapatkan pemahaman semantik Bahasa Indonesia yang mendalam, saya memanfaatkan model word embedding pre-trained dari fastText (cc.id.300.vec), yang secara signifikan meningkatkan akurasi deteksi intent pada dataset yang terbatas.",
    image: "https://vt.tiktok.com/ZSDy853vT/.jpg",
    tech: ["Python", "TensorFlow", "LSTM", "fastText", "Pandas", "Gradio"],
    demo: "https://www.tiktok.com/@harmonyman21/video/7551594853172366604",
    github: [
      { label: "Code Belum Tersedia", url: "-" }
    ],
    type: "AI & Web Project",
    isSuccessful: true,
  },
  {
    id: "p4",
    title: "Chatbot Asisten Rumah Sakit (versi sementara) - Part 2",
    description: "Perbaikan Frontend dengan menggunakan React dan Backend Laravel",
    image: "https://img.youtube.com/vi/ZQomX_277fw/hqdefault.jpg",
    tech: ["Python", "TensorFlow", "LSTM", "fastText", "Pandas", "Gradio", "Laravel", "React", "Tailwind CSS", "Bootstrap", "Radix UI"],
    demo: "https://youtu.be/ZQomX_277fw",
    github: [
      { label: "-", url: "-" }
    ],
    type: "AI & Web Project",
    isSuccessful: true,
  },
  {
    id: "p5",
    title: "Perbaikan Tampilan Website Profil Instansi (Joomla)",
    description: "Perbaikan tampilan website berbasis Joomla yang meliputi pengaturan navbar, struktur menu, dan konsistensi layout pada beberapa halaman agar lebih rapi, informatif, dan mudah diakses.",
    images: [image0, image1, image2, image3, image4],
    tech: ["Joomla", "CSS"],
    demo: "https://lpnpamekasan.kemenkumham.go.id/",
    github: [{ label: "-", url: "-" }],
    type: "Frontend Web Project",
    isSuccessful: true,
  },
  {
    id: "p6",
    title: "Loker Tracker",
    description: "Digunakan untuk melakukan pendataan loker yang telah saya daftarkan atau belum saya daftarkan dan digunakan agar tidak lupa loker yang telah saya daftarkan",
    images: [lockertracker, lockertracker1],
    tech: ["Vue", "Vite", "Vercel", "Firebase"],
    demo: "https://loker-tracker.vercel.app/",
    github: [{ label: "Code", url: "https://github.com/MheriS/LokerTracker" }],
    type: "Web Project",
    isSuccessful: true,
  },
  {
    id: "p7",
    title: "PAS Assistant",
    description: "PAS Assistant adalah aplikasi sistem informasi dan layanan mandiri yang dirancang untuk mempermudah akses pelayanan publik (khususnya lingkup Pemasyarakatan). Sistem ini dilengkapi dengan fiur rekapitulasi pada Dashboard, manajemen Daftar Kunjungan, Pengecekan Status, panel Informasi, hingga integrasi Chatbot untuk layanan tanya-jawab secara interaktif.",
    image: "https://img.youtube.com/vi/_OvkTLiWxWI/hqdefault.jpg",
    tech: ["React", "Tailwind", "Laravel", "Python", "pgAdmin"],
    demo: "https://youtu.be/_OvkTLiWxWI", // wait let's use the actual URL provided: https://youtu.be/_OvkTLiWxWI
    github: [
      { label: "Frontend", url: "https://github.com/MheriS/PAS-Assistant-FrontEnd" },
      { label: "Backend", url: "https://github.com/MheriS/PAS-Assistant-BackEnd" }
    ],
    type: "AI & Web Project",
    isSuccessful: true,
  },
  {
    id: "p8",
    title: "Si-Aris",
    description: "Si-Aris adalah platform manajemen arisan dharma wanita dengan fitur undian online dan cetak nama offline",
    image: "https://img.youtube.com/vi/nJK1lgXoH2Y/hqdefault.jpg",
    tech: ["React", "Tailwind", "Laravel", "sqlite"],
    demo: "https://youtu.be/nJK1lgXoH2Y", // wait let's use the actual URL provided: https://youtu.be/_OvkTLiWxWI
    github: [
      { label: "Frontend", url: "https://github.com/MheriS/siaris-frontend" },
      { label: "Backend", url: "https://github.com/MheriS/siaris-backend" }
    ],
    type: "Web Project",
    isSuccessful: true,
  }
];

export const portfolioData = {
  careerStartYear: 2023,
  projects: PROJECTS
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'e1',
    role: 'Information Technology (IT) Intern',
    company: 'Lembaga Pemasyarakatan Narkotika IIA',
    period: 'Nov 2025 – Mei 2026',
    description: [
      'Mengembangkan dan memelihara aplikasi berbasis web sesuai kebutuhan instansi.',
      'Menangani troubleshooting dan menyelesaikan kendala pada website, aplikasi, serta sistem informasi internal.',
      'Melakukan pemeliharaan preventif dan perbaikan perangkat komputer, printer, serta jaringan',
      'Memberikan dukungan teknis kepada pengguna untuk memastikan kelancaran operasional sistem dan infrastruktur TI.',
    ],
    type: 'work',
    badge: 'Magang'
  },
  {
    id: 'e2',
    role: 'Natural Language Processing',
    company: 'PT. Arion Indonesia',
    period: 'Jun 2023 – Agu 2023',
    description: [
      'Berhasil mengumpulkan data teks terkait Cak Nun dari platform media sosial dan berita online menggunakan API.',
      'Melakukan pra-pemrosesan data teks (text preprocessing) untuk persiapan analisis sentimen.',
      'Membangun dan melatih model klasifikasi untuk sentimen (positif, negatif, netral).',
      'Melakukan pengujian dan evaluasi performa model menggunakan data uji.',
      'Melakukan koreksi dan pelabelan manual untuk meningkatkan akurasi data hasil prediksi.',
      'Menyusun laporan akhir yang merangkum hasil dan temuan dari analisis sentimen.',
    ],
    type: 'work',
    badge: 'Magang'
  },
  {
    id: 'e3',
    role: 'Agricultural Data Analyst',
    company: 'PT. Arion Indonesia',
    period: 'Jun 2023 – Agu 2023',
    description: [
      'Menyelesaikan pemetaan udara pada 2 area proyek menggunakan drone, meliputi area depan kantor dan area persawahan di sekitar kawasan perumahan.',
      'Mengolah citra hasil pemotretan menjadi model dan peta 3D untuk kebutuhan analisis lahan.',
      'Melakukan analisis kondisi dan tingkat kesuburan lahan menggunakan platform GIS perusahaan berdasarkan visualisasi warna pada peta.'
    ],
    type: 'work',
    badge: 'Magang'
  },
];

export const certifications: Certification[] = [
  {
    name: "AI Engineer For Milenial",
    issuer: "Pusat Pengembangan Literasi Digital",
    date: "12 September 2025",
    validUntil: "Tidak ada masa berlaku",
    credentialId: "22910029850-9167/MS/BLSDM.Komdigi/2025",
    status: "active",
    level: "Associate",
    category: "Kecerdasan Artifisial",
    logo: "-",
    skills: ["Dasar-Dasar Rekayasa Prompt (Prompt Engineering Fundamentals)", "Peningkatan Produktivitas dengan AI", "Optimisasi Prompt (Prompt Optimization)"],
    verifyUrl: "https://digitalent.komdigi.go.id/cek-sertifikat#"
  },
  {
    name: "Menerapkan rekayasa prompt dengan Azure OpenAI Service",
    issuer: "DTS Kominfo & ElevAlte",
    date: "9 September 2025",
    validUntil: "Tidak ada masa berlaku",
    credentialId: "2299753990-5372/MS/BLSDM.Komdigi/2025",
    status: "active",
    level: "Associate",
    category: "Generative AI",
    logo: "-",
    skills: ["Rekayasa Prompt (Prompt Engineering)", "Desain & Optimisasi Prompt (Prompt Design & Optimization)", "Azure OpenAI Service", "Teknik Prompt Lanjutan (Instruction & Contextual Prompting)"],
    verifyUrl: "https://digitalent.komdigi.go.id/cek-sertifikat#"
  },
  {
    name: "Linear Models in Machine Learning: Fundamentals",
    issuer: "DTS Kominfo & Yandex (Fresh Graduate Academy)",
    date: "20 Mei 2025",
    validUntil: "Tidak ada masa berlaku",
    credentialId: "19510211840-729/FGA/BLSDM.Komdigi/2025",
    status: "active",
    level: "Associate",
    category: "Machine Learning",
    logo: "-",
    skills: ["Konsep Dasar Machine Learning",
      "Data Preprocessing (Missing Data, Outlier)",
      "Data Splitting & Scaling",
      "Linear Regression & Gradient Descent",
      "Regularization (L1 & L2)",
      "Scikit-learn & Modeling Pipelines",
      "Evaluasi Model (R² & MSE)"],
    verifyUrl: "https://digitalent.komdigi.go.id/cek-sertifikat#"
  },
  {
    name: "Pengenalan Data Science dan Pemanfaatannya di Berbagai Sektor",
    issuer: "DTS Kominfo",
    date: "14 Mei 2025",
    validUntil: "Tidak ada masa berlaku",
    credentialId: "2299818850-5546/MS/BLSDM.Komdigi/2025",
    status: "active",
    level: "Associate",
    category: "Data Analis",
    logo: "-",
    skills: ["Konsep Dasar Data Science (Data Science Fundamentals)", "Aplikasi Data Science (Studi Kasus Lintas Sektor)"],
    verifyUrl: "https://digitalent.komdigi.go.id/cek-sertifikat#"
  },
  {
    name: "Wawasan Karir dalam Bidang Data Analytics",
    issuer: "DTS Kominfo",
    date: "14 Mei 2025",
    validUntil: "Tidak ada masa berlaku",
    credentialId: "2299746850-5508/MS/BLSDM.Komdigi/2025",
    status: "active",
    level: "Associate",
    category: "Data Analis",
    logo: "-",
    skills: ["Dasar-Dasar Data Analytics", "Alur Kerja Analitika Data", "Visualisasi & Interpretasi Data"],
    verifyUrl: "https://digitalent.komdigi.go.id/cek-sertifikat#"
  },
  {
    name: "Dasar-dasar Keamanan AI",
    issuer: "DTS Kominfo & ElevAlte",
    date: "10 Mei 2025",
    validUntil: "Tidak ada masa berlaku",
    credentialId: "2299752990-10276/MS/BLSDM.Komdigi/2025",
    status: "active",
    level: "Associate",
    category: "AI Security",
    logo: "-",
    skills: ["Konsep Keamanan AI (AI Security Concepts)", "Analisis Ancaman & Serangan AI (AI Threat & Attack Analysis)", "Manajemen Risiko AI", "Analisis Arsitektur Keamanan AI"],
    verifyUrl: "https://digitalent.komdigi.go.id/cek-sertifikat#"
  },
  {
    name: "Seberapa Penting Menjaga Data Pribadi dan Pelindungannya",
    issuer: "DTS Kominfo",
    date: "7 Mei 2025",
    validUntil: "Tidak ada masa berlaku",
    credentialId: "2299751990-5509/MS/BLSDM.Komdigi/2025",
    status: "active",
    level: "Associate",
    category: "Sistem Manajemen Keamanan Informasi",
    logo: "-",
    skills: ["Pelindungan Data Pribadi", "Teori dan Regulasi Kebijakan PDP", "Prinsip Pelindungan Data Pribadi", "Studi Kasus: Implementasi Pelindungan Data Pribadi"],
    verifyUrl: "https://digitalent.komdigi.go.id/cek-sertifikat#"
  },
  {
    name: "Dasar-Dasar Implementasi Kecerdasan Artifisial",
    issuer: "DTS Kominfo",
    date: "7 Mei 2025",
    validUntil: "Tidak ada masa berlaku",
    credentialId: "2299748850-6335/MS/BLSDM.Komdigi/2025",
    status: "active",
    level: "Associate",
    category: "Artificial Intelligence",
    logo: "-",
    skills: ["Pengenalan Teknologi AI",
      "Penerapan Perlindungan Data Pribadi",
      "Etika dalam Penggunaan AI"],
    verifyUrl: "https://digitalent.komdigi.go.id/cek-sertifikat#"
  },
  {
    name: "Alibaba Cloud: Big Data Fundamentals",
    issuer: "DTS Kominfo (Pusbang Proserti) & Alibaba Cloud",
    date: "27 Desember 2023",
    validUntil: "Tidak ada masa berlaku",
    credentialId: "1987047840-234/PROA/BLSDM.Kominfo/2023",
    status: "active",
    level: "Professional",
    category: "Cloud Computing",
    logo: "-",
    skills: ["Dasar-Dasar Big Data (Big Data Fundamentals)",
      "Data Warehousing & Pemrosesan Data",
      "Tools Pemrosesan Data Lanjutan (Advanced Data Processing Tools)",
      "Visualisasi Data, Machine Learning, & AI"],
    verifyUrl: "https://digitalent.komdigi.go.id/cek-sertifikat#"
  }
];

export const education: Education[] = [
  {
    degree: "S1 - Teknik Informatika",
    school: "UIN Maulana Malik Ibrahim Malang",
    location: "Malang, Indonesia",
    period: "2020 - 2025",
    gpa: "3.66/4.0",
    achievements: [
      "Lulus dengan predikat Cum Laude",
      <>
        Menerbitkan jurnal ilmiah tentang 'Klasifikasi Penyakit Padi Menggunakan Convolutional Neural Network (CNN) Berbasis Citra Daun' di{' '}
        <a
          href="https://jurnal.ugm.ac.id/v3/JNTETI/article/view/18791"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline hover:text-blue-300 transition-colors font-medium"
        >
          'Jurnal Nasional Teknik Elektro dan Teknologi Informasi (JNTETI) UGM'
        </a>
      </>
    ],
    status: "completed"
  }
];

export const PUBLICATIONS: PublicationItem[] = [
  {
    id: 'pub1',
    title: "Klasifikasi Penyakit Padi Menggunakan Convolutional Neural Network (CNN) Berbasis Citra Daun",
    journal: "Jurnal Nasional Teknik Elektro dan Teknologi Informasi (JNTETI) UGM",
    year: "2024",
    author: "Moh. Heri Susanto",
    url: "https://jurnal.ugm.ac.id/v3/JNTETI/article/view/18791",
    doi: "10.22146/jnteti.v13i2.8791"
  }
];
