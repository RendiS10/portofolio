import type { ProfileData, Project, TechItem, ExperienceItem, CertificateItem } from '../types/portfolio';

export const profileData: ProfileData = {
  name: 'Rendi Sutendi',
  tagline: 'Full Stack Developer',
  education: 'S1 Teknik Informatika (IPK 3.70) • STMIK Mardira Indonesia',
  status: 'Terbuka untuk Peluang Kerja (Full-Stack / Mobile / Backend)',
  bio: 'Sarjana Teknik Informatika (IPK 3.70) berpengalaman merancang arsitektur e-commerce & retail, mobile app Flutter Clean Architecture (Riverpod), backend Node.js & NestJS modular, antrean terdistribusi Redis BullMQ, integrasi ERP Accurate Online, serta manajemen infrastruktur VPS Linux berbasis Docker.',
  experienceStart: '2 Tahun Pengalaman (sejak Okt 2024)',
  avatarUrl: '/rendi.jpg',
  interests: [
    'Full-Stack Web Systems',
    'Mobile Systems (Flutter Clean Architecture)',
    'Distributed Queues (Redis & BullMQ)',
    'Relational Database Modeling & Prisma',
    'Linux VPS & Docker Infrastructure'
  ],
  contact: {
    email: 'rendisutendi21@gmail.com',
    github: 'https://github.com/RendiS10',
    linkedin: 'https://linkedin.com/in/rendi-sutendi-813a90270',
    location: 'Bandung, Indonesia',
    whatsapp: 'https://wa.me/6285721451615'
  }
};

export const techStackData: TechItem[] = [
  // client interface layer
  {
    name: 'TypeScript',
    category: 'frontend',
    layer: 'client',
    iconKey: 'typescript',
    color: '#3178C6',
    roleTag: 'Type Contracts',
    usageContext: 'Kontrak type-safe di seluruh lapisan aplikasi Next.js dan Adonis.js',
    projectLinks: ['holycat', 'abbygail']
  },
  {
    name: 'React',
    category: 'frontend',
    layer: 'client',
    iconKey: 'react',
    color: '#0284c7',
    roleTag: 'Component UI',
    usageContext: 'Komponen UI modular, custom hooks, dan state management reaktif',
    projectLinks: ['holycat', 'holycat-holydis', 'holycat-webprofile', 'jkt48', 'green-sustainify']
  },
  {
    name: 'Next.js',
    category: 'frontend',
    layer: 'client',
    iconKey: 'nextdotjs',
    color: '#0f172a',
    roleTag: 'App Framework',
    usageContext: 'App Router dan frontend e-commerce',
    projectLinks: ['holycat', 'holycat-posyancing', 'abbygail']
  },
  {
    name: 'Flutter',
    category: 'mobile',
    layer: 'client',
    iconKey: 'flutter',
    color: '#0284c7',
    roleTag: 'Native Mobile',
    usageContext: 'Aplikasi mobile Android dengan Clean Architecture, Riverpod, dan Dio',
    projectLinks: ['holycat-mobile']
  },
  {
    name: 'Dart',
    category: 'mobile',
    layer: 'client',
    iconKey: 'dart',
    color: '#0175C2',
    roleTag: 'Mobile Core Engine',
    usageContext: 'Bahasa pemrograman yang dipakai Flutter',
    projectLinks: ['holycat-mobile']
  },
  {
    name: 'PWA (Progressive Web Apps)',
    category: 'frontend',
    layer: 'client',
    iconKey: 'pwa',
    color: '#5A0FC8',
    roleTag: 'Offline Web App',
    usageContext: 'Aplikasi web PWA dengan service worker dan manifest',
    projectLinks: ['holycat-mps']
  },
  {
    name: 'Tailwind CSS v4',
    category: 'frontend',
    layer: 'client',
    iconKey: 'tailwindcss',
    color: '#06b6d4',
    roleTag: 'Design Tokens',
    usageContext: 'Utility styling modern, fluid responsive layout, dan tema antarmuka terstruktur',
    projectLinks: ['holycat', 'abbygail', 'jkt48']
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    layer: 'client',
    iconKey: 'javascript',
    color: '#eab308',
    roleTag: 'Scripting Core',
    usageContext: 'DOM scripting modern, ESNext features, dan penanganan asynchronous event loop',
    projectLinks: ['holycat', 'jkt48', 'green-sustainify']
  },

  // backend engine layer
  {
    name: 'NestJS',
    category: 'backend',
    layer: 'backend',
    iconKey: 'nestjs',
    color: '#E0234E',
    roleTag: 'Enterprise Backend',
    usageContext: 'Arsitektur modular backend TypeScript, REST API dengan Swagger dan dependency injection',
    projectLinks: ['holycat', 'holycat-posyancing', 'holycat-mps', 'holycat-scrm']
  },
  {
    name: 'Node.js',
    category: 'backend',
    layer: 'backend',
    iconKey: 'nodejs',
    color: '#22c55e',
    roleTag: 'Server Runtime',
    usageContext: 'REST API dengan Express dan dokumentasi Swagger',
    projectLinks: ['holycat', 'jkt48']
  },
  {
    name: 'Adonis.js',
    category: 'backend',
    layer: 'backend',
    iconKey: 'adonisjs',
    color: '#5A45FF',
    roleTag: 'Node.js MVC Framework',
    usageContext: 'Backend REST API modular dengan TypeScript, Lucid ORM, validasi VineJS, dan integrasi Midtrans',
    projectLinks: ['abbygail']
  },
  {
    name: 'Redis & BullMQ',
    category: 'backend',
    layer: 'backend',
    iconKey: 'redis',
    color: '#DC382D',
    roleTag: 'Distributed Queue & Cache',
    usageContext: 'Antrean asinkron order timeout, background job cart expiration, dan caching performa tinggi',
    projectLinks: ['holycat', 'abbygail']
  },
  {
    name: 'Laravel',
    category: 'backend',
    layer: 'backend',
    iconKey: 'laravel',
    color: '#ef4444',
    roleTag: 'MVC & REST Engine',
    usageContext: 'REST API, Sanctum token authentication, dan sistem tracking logistik Holydis',
    projectLinks: ['holycat-holydis']
  },

  // database and cloud persistence layer
  {
    name: 'PostgreSQL',
    category: 'backend',
    layer: 'database',
    iconKey: 'postgresql',
    color: '#2563eb',
    roleTag: 'Relational Core',
    usageContext: 'Pemodelan data relasional kompleks, indeks teroptimasi, dan transaksi database terisolasi',
    projectLinks: ['holycat', 'holycat-holydis', 'abbygail']
  },
  {
    name: 'Prisma ORM',
    category: 'backend',
    layer: 'database',
    iconKey: 'prisma',
    color: '#6366f1',
    roleTag: 'Type-Safe ORM',
    usageContext: 'Database migrations type-safe, schema declarative, dan queries teroptimasi',
    projectLinks: ['holycat', 'holycat-posyancing']
  },
  {
    name: 'MySQL',
    category: 'backend',
    layer: 'database',
    iconKey: 'mysql',
    color: '#0284c7',
    roleTag: 'Transactional DB',
    usageContext: 'Relational database schemas, normalized tables, dan query optimization',
    projectLinks: ['jkt48', 'sik-ma']
  },
  {
    name: 'Supabase',
    category: 'backend',
    layer: 'database',
    iconKey: 'supabase',
    color: '#10b981',
    roleTag: 'Cloud Postgres & Auth',
    usageContext: 'Managed Postgres backend, Row Level Security, dan real-time event streaming',
    projectLinks: ['holycat']
  },
  {
    name: 'Firebase',
    category: 'backend',
    layer: 'database',
    iconKey: 'firebase',
    color: '#f59e0b',
    roleTag: 'NoSQL & Real-Time Sync',
    usageContext: 'Cloud Firestore database, FCM push notifications, dan client auth',
    projectLinks: ['holycat-mobile']
  },

  // infrastructure and devops layer
  {
    name: 'Linux',
    category: 'tools',
    layer: 'devops',
    iconKey: 'linux',
    color: '#eab308',
    roleTag: 'System OS',
    usageContext: 'Lingkungan server Ubuntu/Debian, shell scripting, manajemen service, dan security',
    projectLinks: ['holycat', 'abbygail']
  },
  {
    name: 'Docker',
    category: 'tools',
    layer: 'devops',
    iconKey: 'docker',
    color: '#0284c7',
    roleTag: 'Containerization',
    usageContext: 'Container deployment, multi-stage Dockerfile, dan konsistensi staging environment',
    projectLinks: ['holycat']
  },
  {
    name: 'Caddy Ingress',
    category: 'tools',
    layer: 'devops',
    iconKey: 'caddy',
    color: '#1F88C0',
    roleTag: 'Reverse Proxy & Ingress',
    usageContext: 'Reverse proxy server Linux VPS dengan TLS otomatis dan routing container Docker',
    projectLinks: ['holycat']
  },
  {
    name: 'Git',
    category: 'tools',
    layer: 'devops',
    iconKey: 'git',
    color: '#f97316',
    roleTag: 'Version Control',
    usageContext: 'Git flow branching, code review, collaborative tracking, dan automation',
    projectLinks: ['holycat', 'holycat-mobile', 'abbygail', 'jkt48']
  },
  {
    name: 'Vercel',
    category: 'tools',
    layer: 'devops',
    iconKey: 'vercel',
    color: '#0f172a',
    roleTag: 'Edge Deployment',
    usageContext: 'Edge deployment Next.js, automated preview branches, dan CDN global terakselerasi',
    projectLinks: ['holycat', 'abbygail']
  }
];

export const projectsData: Project[] = [
  {
    id: 'abbygail',
    title: 'Abby & Gail Skincare E-Commerce',
    subtitle: 'abbyandgail.com — Retail Skincare Modern Next.js SSR & Adonis.js',
    category: 'fullstack',
    summary: 'Platform retail e-commerce produk kecantikan & fashion untuk brand Abby n Bev (SJA Textile) dengan Next.js 15, Adonis.js v6, CMS Ant Design, dan payment gateway Midtrans.',
    description: 'Sistem e-commerce ritel skala komersial terintegrasi yang mencakup storefront performa tinggi berbasis Next.js 15 App Router (SSR), Content Management System (CMS) admin dengan Ant Design & Vite, modul pembayaran Midtrans, serta backend REST API berbasis Adonis.js v6 dan PostgreSQL.',
    architecture: [
      'Frontend storefront customer modern dengan Next.js 15 App Router, React 19, Tailwind CSS v4, dan Radix UI',
      'Backend REST API berarsitektur MVC dengan Adonis.js v6 TypeScript, Lucid ORM, dan validasi VineJS',
      'CMS admin internal responsif dengan React 18, Vite, Ant Design (antd 5), Tiptap WYSIWYG, dan Zustand',
      'Integrasi payment gateway Midtrans otomatis dengan penanganan webhook status transaksi asinkron',
      'Perancangan skema relasional 30+ tabel database PostgreSQL dengan indexing efisien dan Redis caching'
    ],
    stack: [
      'Next.js 15',
      'Adonis.js v6',
      'TypeScript',
      'PostgreSQL',
      'Lucid ORM',
      'Midtrans',
      'Tailwind CSS v4',
      'Ant Design',
      'Redis',
      'Vite'
    ],
    highlights: [
      'Ekosistem e-commerce terintegrasi: Web Storefront Next.js 15, CMS Admin Ant Design, dan API Adonis.js v6',
      'Transaksi pembayaran digital real-time via Midtrans Payment Gateway',
      'Arsitektur 30+ tabel relasional PostgreSQL teroptimasi dengan Lucid ORM'
    ],
    challenges: 'Mengoptimalkan waktu respons database pada kueri katalog produk multi-varian dan transaksi diskon bertingkat.',
    role: 'Fullstack Web Developer',
    demoUrl: 'https://abbyandgail.com/',
    isPrivateRepo: true,
    privateRepoReason: 'Repository privat komersial perusahaan (SJA Textile)',
    imageUrl: '',
    imageFit: 'cover',
    featured: true,
    metrics: [
      { label: 'Status Sistem', value: 'Live Komersial' },
      { label: 'Framework & Engine', value: 'Next.js 15 & Adonis.js v6' },
      { label: 'Database & ORM', value: '30+ Tabel PostgreSQL & Lucid' }
    ]
  },
  {
    id: 'holycat',
    title: 'HolyCat E-Commerce Storefront',
    subtitle: 'shop.holycatlabs.com — Storefront dan Backend E-Commerce Pet-Care',
    category: 'fullstack',
    summary: 'Storefront dan backend e-commerce pet-care: REST API Node.js dengan Express 5, Prisma, dan PostgreSQL, storefront Next.js dan React 19, pembayaran Midtrans, serta dompet digital HolyPay.',
    description: 'Sistem e-commerce untuk brand pet-care HolyCat yang saya bangun dari backend sampai storefront. Mencakup katalog dan pesanan, pembayaran Midtrans, dompet digital internal HolyPay, antrean job, dan notifikasi real-time.',
    architecture: [
      'Backend REST API Node.js dengan Express 5, Prisma, dan PostgreSQL (36 model, 78 migrasi), dokumentasi Swagger',
      'Keamanan: JWT HttpOnly cookie, CSRF, RBAC, rate limiting, dan verifikasi signature webhook Midtrans',
      'Dompet digital HolyPay dengan database transaction dan row lock',
      'Antrean BullMQ (Redis) dan notifikasi real-time Socket.IO',
      'Storefront Next.js dan React 19 dengan Zustand, diuji dengan Cypress',
      'Deployment dengan Docker'
    ],
    stack: [
      'Next.js',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Prisma',
      'Midtrans',
      'BullMQ',
      'Redis',
      'Socket.IO',
      'Zustand',
      'Cypress',
      'Docker'
    ],
    highlights: [
      'Live di produksi dengan pembayaran Midtrans',
      'REST API terdokumentasi Swagger dengan 36 model dan 78 migrasi PostgreSQL',
      'Dompet digital HolyPay memakai database transaction dan row lock'
    ],
    challenges: 'Menjaga konsistensi saldo dompet digital dan status pesanan ketika webhook pembayaran, antrean job, dan mutasi saldo berjalan bersamaan.',
    role: 'Full Stack Developer',
    demoUrl: 'https://shop.holycatlabs.com/',
    githubUrl: 'https://github.com/RendiS10/holycat-ecommerce-frontend',
    imageUrl: '/projects/holycat.jpg',
    imageFit: 'cover',
    featured: true,
    metrics: [
      { label: 'Status', value: 'Live' },
      { label: 'Model', value: 'PostgreSQL 36 model, 78 migrasi' },
      { label: 'Antrean', value: 'BullMQ + Midtrans Webhook' }
    ]
  },
  {
    id: 'holycat-mobile',
    title: 'HolyCat Mobile Customer App',
    subtitle: 'Aplikasi Android Pelanggan HolyCat dengan Flutter Clean Architecture',
    category: 'mobile',
    summary: 'Aplikasi Android pelanggan HolyCat berbasis Flutter dengan Clean Architecture, Riverpod, Dio, autentikasi OTP, dan pembayaran event Posyancing via Midtrans.',
    description: 'Aplikasi Android untuk pelanggan HolyCat yang terhubung ke backend HolyCat. Mencakup masuk dengan OTP dan pembayaran event Posyancing via Midtrans. Saat ini berada di tahap closed testing Google Play.',
    architecture: [
      'Arsitektur berlapis Flutter Clean Architecture (Presentation, Domain, Data) dengan struktur feature-first',
      'State management dengan Riverpod',
      'Jaringan HTTP dengan Dio',
      'Autentikasi OTP',
      'Pembayaran event Posyancing via Midtrans',
      'Distribusi lewat closed testing Google Play'
    ],
    stack: [
      'Flutter',
      'Dart',
      'Riverpod',
      'Dio',
      'Clean Architecture',
      'REST API',
      'Midtrans'
    ],
    highlights: [
      'Clean Architecture memisahkan logika bisnis dari UI',
      'Terhubung ke backend Node.js dan PostgreSQL HolyCat',
      'Sedang closed testing di Google Play'
    ],
    challenges: 'Menerapkan Clean Architecture Flutter dengan pemisahan dependensi yang ketat agar fitur baru mudah ditambahkan.',
    role: 'Mobile Application Engineer',
    githubUrl: 'https://github.com/RendiS10',
    isMobileApp: true,
    demoStatusLabel: 'Aplikasi Android (closed testing Google Play)',
    imageUrl: '/projects/holycat.jpg',
    imageFit: 'cover',
    featured: false,
    metrics: [
      { label: 'Platform', value: 'Android' },
      { label: 'Framework', value: 'Flutter & Dart' },
      { label: 'State', value: 'Riverpod' }
    ]
  },
  {
    id: 'jkt48',
    title: 'JKT48 Fan Merchandise (Concept Study)',
    subtitle: 'Studi Kasus Konsep E-Commerce & Micro-Storefront Fanbase JKT48',
    category: 'fullstack',
    summary: 'Studi kasus eksplorasi arsitektur e-commerce bertema merchandise fanbase JKT48: keranjang belanja reaktif, katalog produk multi-varian, dan REST API Express.js.',
    description: 'Proyek eksperimental berbasis studi kasus independen untuk merancang micro-storefront merchandise fanbase idol culture dengan React.js, Express.js, dan MySQL (bukan sistem resmi internal JKT48).',
    architecture: [
      'Frontend interaktif dengan React.js dan Tailwind CSS',
      'Backend REST API dengan Express.js dan Node.js runtime',
      'Manajemen state keranjang belanja reaktif dan flow checkout'
    ],
    stack: [
      'React',
      'Node.js',
      'Express.js',
      'Tailwind CSS',
      'MySQL'
    ],
    highlights: [
      'Studi kasus konsep arsitektur e-commerce bertema merchandise fanbase',
      'Integrasi keranjang belanja reaktif real-time dan katalog produk',
      'Desain UI modern terinspirasi estetika idol culture'
    ],
    challenges: 'Mendesain struktur database relasional yang fleksibel untuk variasi ukuran, edisi, dan bundling item merchandise.',
    role: 'Full-Stack Developer (Personal Concept)',
    githubUrl: 'https://github.com/RendiS10/e-commerce-jkt48',
    imageUrl: '/projects/jkt48.jpg',
    imageFit: 'cover',
    featured: false,
    metrics: [
      { label: 'Status Proyek', value: 'Konsep Fanbase' },
      { label: 'Frontend', value: 'React & Tailwind' },
      { label: 'Backend Engine', value: 'Express & MySQL' }
    ]
  },
  {
    id: 'green-sustainify',
    title: 'Green Sustainify',
    subtitle: 'Platform Web Edukasi & Aksi Ekonomi Hijau (Capstone Project)',
    category: 'fullstack',
    summary: 'Platform web edukasi interaktif untuk mendorong aksi nyata ekonomi hijau dan pelestarian lingkungan bagi generasi muda.',
    description: 'Capstone Project yang dikembangkan secara kolaboratif untuk menghadirkan sarana edukasi ramah lingkungan dengan kalkulator jejak karbon sederhana dan artikel interaktif.',
    architecture: [
      'Single Page Application (SPA) dibangun dengan React.js',
      'Modul bundling dan aset pipeline menggunakan Webpack',
      'Desain responsif ramah perangkat mobile dan desktop'
    ],
    stack: [
      'React',
      'Webpack',
      'JavaScript',
      'CSS3'
    ],
    highlights: [
      'Terpilih sebagai salah satu Capstone Project terbaik',
      'Edukasi interaktif seputar gaya hidup berkelanjutan'
    ],
    challenges: 'Merancang arsitektur komponen React yang modular dengan konfigurasi build Webpack kustom dari nol.',
    role: 'Frontend Developer & Project Lead',
    githubUrl: 'https://github.com/RendiS10/capstone-greenEconomy',
    imageUrl: '/projects/green-sustainify.png',
    imageFit: 'cover',
    featured: false,
    metrics: [
      { label: 'Framework', value: 'React.js' },
      { label: 'Bundler', value: 'Webpack' },
      { label: 'Topic', value: 'Green Economy' }
    ]
  },
  {
    id: 'sik-ma',
    title: "SIK MA Mathla'ul Anwar",
    subtitle: 'Sistem Informasi Pengumuman Kelulusan Siswa Berbasis Web',
    category: 'fullstack',
    summary: 'Aplikasi pengumuman kelulusan berbasis web responsif untuk memudahkan ratusan siswa mengecek hasil kelulusan secara online serentak.',
    description: 'Sistem informasi yang dibangun untuk institusi sekolah guna menggantikan pengumuman manual dengan sistem digital terpusat yang aman.',
    architecture: [
      'Backend web dinamis berbasis PHP',
      'Database relasional MySQL untuk menyimpan rekam nilai dan NISN',
      'Antarmuka responsif dengan Bootstrap'
    ],
    stack: [
      'PHP',
      'Bootstrap',
      'MySQL'
    ],
    highlights: [
      'Diimplementasikan langsung pada pengumuman kelulusan resmi sekolah',
      'Mampu melayani lonjakan akses serentak pada jam pengumuman'
    ],
    challenges: 'Memastikan integritas data nomor ujian dan keamanan agar pengumuman tidak bocor sebelum waktu yang ditentukan.',
    role: 'Web Developer',
    githubUrl: 'https://github.com/RendiS10/sik_sma_mathala-ul_anwar',
    imageUrl: '/projects/sik-ma.jpg',
    imageFit: 'cover',
    featured: false,
    metrics: [
      { label: 'Stack', value: 'PHP & MySQL' },
      { label: 'Adoption', value: 'School Institution' }
    ]
  },
  {
    id: 'holycat-mps',
    title: 'HolyCat Marketplace Picker System (MPS)',
    subtitle: 'Sistem Barcode Scanner & Manifest Checker Gudang Multi-Marketplace',
    category: 'fullstack',
    summary: 'Sistem barcode scanner gudang multi-marketplace untuk verifikasi picking list, manifest ekspedisi, dan monitoring fulfillment untuk mengurangi packing mismatch.',
    description: 'Aplikasi scanner barcode berbasis web untuk tim gudang HolyCat yang mengotomatisasi verifikasi packing barang, mencetak resi termal, dan memvalidasi shipping manifest secara real-time.',
    architecture: [
      'Aplikasi scanner barcode berbasis web responsif untuk staf operasional gudang HolyCat',
      'Validasi real-time manifest shipping ekspedisi (Shopee, Tokopedia, TikTok Shop, Direct Store)',
      'Integrasi printer thermal otomatis untuk label resi dan surat jalan logistik',
      'Pencegahan salah packing barang dengan validasi manifest sebelum barang dikirim'
    ],
    stack: [
      'Next.js',
      'Node.js',
      'NestJS',
      'PostgreSQL',
      'Tailwind CSS',
      'Zustand'
    ],
    highlights: [
      'Verifikasi manifest dan picking list sebelum barang dikirim untuk mengurangi packing mismatch'
    ],
    challenges: 'Menangani pemindaian barcode berkecepatan tinggi dengan respons yang cukup cepat di jaringan gudang.',
    role: 'Full-Stack Developer',
    isPrivateRepo: true,
    privateRepoReason: 'Sistem operasional internal pergudangan HolyCat',
    imageUrl: '',
    imageFit: 'contain',
    featured: false,
    metrics: [
      { label: 'Fulfillment', value: 'Verifikasi Manifest' },
      { label: 'System', value: 'Barcode Scanner' },
      { label: 'Ops Domain', value: 'Warehouse & MPS' }
    ]
  },
  {
    id: 'holycat-contract',
    title: 'Sistem Tanda Tangan Digital & Kontrak',
    subtitle: 'Platform Legalitas B2B & E-Signature Terenkripsi Dokumen Kemitraan',
    category: 'fullstack',
    summary: 'Platform e-signature dan manajemen siklus kontrak B2B terenkripsi dengan audit trail tamper-proof dan integrasi Supabase Storage.',
    description: 'Sistem legalitas digital kemitraan B2B HolyCat yang menggantikan dokumen fisik dengan e-kontrak sah, verifikasi hash SHA-256, dan workflow persetujuan multi-pihak.',
    architecture: [
      'Workflow persetujuan kontrak digital multi-pihak dengan status lifecycle otomatis',
      'Penyimpanan dokumen PDF terenkripsi dan verifikasi keaslian tanda tangan digital',
      'Integrasi database PostgreSQL via Prisma ORM dan Supabase Storage',
      'Audit trail logging lengkap untuk kepatuhan hukum dan riwayat revisi perjanjian'
    ],
    stack: [
      'Next.js',
      'Prisma ORM',
      'Supabase',
      'PostgreSQL',
      'Tailwind CSS',
      'TypeScript'
    ],
    highlights: [
      'Mempercepat proses legal onboarding merchant dan mitra dari hitungan hari ke menit',
      'Enkripsi dokumen digital dan log audit terverifikasi'
    ],
    challenges: 'Memastikan integritas hash dokumen PDF tidak berubah setelah proses pembubuhan tanda tangan digital.',
    role: 'Full-Stack Developer',
    isPrivateRepo: true,
    privateRepoReason: 'Sistem legal dan manajemen dokumen internal kemitraan HolyCat',
    imageUrl: '',
    imageFit: 'contain',
    featured: false,
    metrics: [
      { label: 'Security', value: 'Encrypted Audit' },
      { label: 'Data Layer', value: 'Prisma & Supabase' },
      { label: 'Domain', value: 'Legal B2B' }
    ]
  },
  {
    id: 'holycat-scrm',
    title: 'HolyCat Sales CRM (SCRM)',
    subtitle: 'CRM Tim Sales: Prospek, Kunjungan, dan Integrasi Accurate Online',
    category: 'fullstack',
    summary: 'CRM untuk tim sales HolyCat: backend NestJS dengan 35 modul domain, frontend PWA Next.js, aplikasi mobile sales Flutter, dan integrasi Accurate Online. Live di scrm.holycat.id sejak 5 November 2026.',
    description: 'Sistem CRM internal untuk tim sales lapangan HolyCat, mencakup backend, frontend PWA, dan aplikasi mobile sales. Berjalan live di scrm.holycat.id sejak 5 November 2026. Integrasi Accurate Online masih dalam mode uji.',
    architecture: [
      'Backend NestJS dengan Prisma dan PostgreSQL, 35 modul domain',
      'Otorisasi RBAC dan Row-Level Security, serta penanganan request ganda',
      'Integrasi Accurate Online dengan pola outbox dan adapter (masih mode uji)',
      'Frontend PWA Next.js dengan TypeScript',
      'Aplikasi mobile sales Flutter dengan antrean offline dan refresh token otomatis',
      'Lebih dari 170 file test API dengan Vitest, termasuk e2e'
    ],
    stack: [
      'NestJS',
      'Prisma',
      'PostgreSQL',
      'Next.js',
      'TypeScript',
      'Flutter',
      'Vitest'
    ],
    highlights: [
      'Live di scrm.holycat.id sejak 5 November 2026',
      '35 modul domain dengan RBAC dan Row-Level Security',
      'Aplikasi mobile sales Flutter dengan antrean offline'
    ],
    challenges: 'Menjaga data aktivitas sales tetap konsisten ketika aplikasi mobile bekerja offline lalu menyinkronkan antrean ke server, tanpa menggandakan request.',
    role: 'Full-Stack Developer',
    isPrivateRepo: true,
    privateRepoReason: 'Sistem internal manajemen sales HolyCat',
    imageUrl: '',
    imageFit: 'contain',
    featured: true,
    metrics: [
      { label: 'Status', value: 'Live sejak 5 November 2026' },
      { label: 'Backend', value: 'NestJS, 35 modul domain' },
      { label: 'Integrasi', value: 'Accurate Online (mode uji)' }
    ]
  },
  {
    id: 'holycat-holydis',
    title: 'Holydis Merchant Logistics & Ekspedisi',
    subtitle: 'Sistem Tracking Pengiriman, Purchase Order & Surat Jalan Merchant',
    category: 'fullstack',
    summary: 'Platform pelacakan ekspedisi dan logistik merchant B2B HolyCat: manajemen purchase order, pembuatan surat jalan PDF otomatis, dan kelola status pengiriman armada.',
    description: 'Sistem distribusi dan logistik merchant (Holydis) yang mengintegrasikan backend REST API Laravel 13 dengan frontend dashboard React Vite, otentikasi Sanctum, dan modul export dokumen DomPDF.',
    architecture: [
      'Backend RESTful API dengan Laravel 13, PHP 8.3, dan Sanctum token authentication',
      'Dashboard internal merchant & admin dengan React, Vite, dan Tailwind CSS',
      'Otomasi penerbitan dokumen Purchase Order dan Surat Jalan berbasis PDF via DomPDF',
      'Notifikasi transaksional status pengiriman via email service Resend'
    ],
    stack: ['Laravel 13', 'PHP 8.3', 'PostgreSQL', 'React', 'Vite', 'Tailwind CSS', 'Sanctum', 'DomPDF'],
    highlights: [
      'Otomasi penerbitan surat jalan dan purchase order PDF resmi',
      'Backend modular teruji dengan arsitektur RESTful Laravel 13 & PostgreSQL',
      'Dashboard logistik merchant responsif untuk monitoring status armada'
    ],
    challenges: 'Mengelola siklus status pengiriman multi-tahap (PO dibuat, diproses, dikirim, diterima) dengan validasi surat jalan yang ketat.',
    role: 'Backend & Full-Stack Developer',
    isPrivateRepo: true,
    privateRepoReason: 'Sistem operasional internal logistik dan distribusi HolyCat Labs',
    imageUrl: '',
    imageFit: 'contain',
    featured: false,
    metrics: [
      { label: 'Backend API', value: 'Laravel 13' },
      { label: 'Dokumen Logistik', value: 'PDF Surat Jalan' },
      { label: 'Database', value: 'PostgreSQL' }
    ]
  },
  {
    id: 'holycat-posyancing',
    title: 'Posyancing — Rekam Medis & KTP Kucing',
    subtitle: 'Sistem Manajemen Kesehatan Hewan, Monitoring Pertumbuhan & Kartu Identitas Digital',
    category: 'fullstack',
    summary: 'Platform rekam medis posyandu pet-care terintegrasi: riwayat vaksinasi dan sterilisasi, grafik monitoring tumbuh kembang, booking grooming, dan pencetakan KTP Kucing digital.',
    description: 'Sistem kesehatan hewan komprehensif yang memadukan backend NestJS modular dengan frontend Next.js Ant Design, integrasi storage AWS S3 untuk foto hewan, payment gateway Midtrans, serta visualisasi grafik berat badan Chart.js.',
    architecture: [
      'Backend enterprise modular dengan NestJS, TypeScript, Swagger docs, dan Prisma ORM',
      'Dashboard web operasional klinik dengan Next.js, React, Ant Design (antd), dan Recharts/Chart.js',
      'Penyimpanan foto profil hewan dan dokumen medis terenkripsi di AWS S3',
      'Generator kartu digital KTP Kucing dengan QR Code scanner interaktif dan export PDF via jsPDF'
    ],
    stack: ['NestJS', 'Next.js', 'Prisma ORM', 'Ant Design', 'TypeScript', 'AWS S3', 'Chart.js', 'Midtrans'],
    highlights: [
      'Penerbitan kartu identitas KTP Kucing digital ber-QR code unik',
      'Visualisasi analitik grafik tumbuh kembang hewan (berat, nutrisi, vaksinasi)',
      'Backend API terstruktur rapi dengan NestJS, Swagger, dan Prisma'
    ],
    challenges: 'Merancang generator kartu digital KTP Kucing dengan rendering HTML-to-Canvas beresolusi tinggi tanpa penurunan kualitas cetak.',
    role: 'Full-Stack Developer & System Architect',
    isPrivateRepo: true,
    privateRepoReason: 'Sistem internal rekam medis dan klinik HolyCat Labs',
    imageUrl: '',
    imageFit: 'contain',
    featured: false,
    metrics: [
      { label: 'Backend Core', value: 'NestJS Modular' },
      { label: 'Dashboard UI', value: 'Ant Design & Next.js' },
      { label: 'Fitur Unggulan', value: 'KTP Kucing QR' }
    ]
  },
  {
    id: 'holycat-webprofile',
    title: 'HolyCat Labs Corporate Landing Page',
    subtitle: 'Platform Profil Korporat & Peta Cabang Klinik Interaktif GIS',
    category: 'fullstack',
    summary: 'Website profil perusahaan resmi HolyCat Labs dengan showcase ekosistem layanan, katalog produk, dan peta interaktif lokasi cabang klinik & pet shop.',
    description: 'Landing page korporat modern berbasis React dan Vite dengan performa tinggi, animasi halus Tailwind CSS, dan integrasi peta geolokasi cabang Leaflet GIS.',
    architecture: [
      'Frontend Single Page Application berkinerja tinggi dengan React dan Vite',
      'Integrasi peta interaktif lokasi cabang pet shop & klinik hewan dengan Leaflet GIS',
      'Desain modern responsif dengan Tailwind CSS dan notifikasi interaktif Sonner'
    ],
    stack: ['React', 'Vite', 'Tailwind CSS', 'Leaflet GIS', 'TypeScript'],
    highlights: [
      'Peta interaktif cabang klinik dan pet shop HolyCat di berbagai kota',
      'Antarmuka modern ramah mobile dengan waktu muat instan Vite'
    ],
    challenges: 'Mengoptimalkan rendering marker peta multi-lokasi klinik dengan clustering interaktif Leaflet.',
    role: 'Frontend Web Developer',
    isPrivateRepo: true,
    privateRepoReason: 'Website profil korporat resmi HolyCat Labs',
    imageUrl: '',
    imageFit: 'contain',
    featured: false,
    metrics: [
      { label: 'Frontend Engine', value: 'React & Vite' },
      { label: 'Geo Location', value: 'Leaflet GIS' },
      { label: 'Desain', value: 'Tailwind CSS' }
    ]
  },
  {
    id: 'web-wisuda',
    title: 'Web Pengajuan Wisuda',
    subtitle: 'Sistem Informasi Pengajuan & Verifikasi Berkas Wisuda Mahasiswa Kampus',
    category: 'fullstack',
    summary: 'Aplikasi pengajuan berkas wisuda berbasis web dengan alur verifikasi dokumen bertahap per-role admin fakultas dan rektorat.',
    description: 'Sistem informasi akademik berbasis web yang dibangun untuk mendigitalkan proses pendaftaran wisuda, upload berkas persyaratan (skripsi, bebas perpus, SPP), serta verifikasi dokumen bertingkat antar departemen kampus.',
    architecture: [
      'Arsitektur MVC berbasis framework CodeIgniter dengan routing modular',
      'Database relasional MySQL dengan relasi data mahasiswa, berkas, dan status verifikasi',
      'Autentikasi role-based access control (RBAC) untuk mahasiswa, admin jurusan, dan superadmin'
    ],
    stack: ['CodeIgniter', 'PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    highlights: [
      'Alur verifikasi berkas berjenjang multi-role (mahasiswa, prodi, akademik)',
      'Otomatisasi validasi kelayakan wisuda dan cetak bukti pendaftaran',
      'Repositori publik aktif terdokumentasi di GitHub'
    ],
    challenges: 'Merancang alur validasi dokumen multi-tahap agar mahasiswa dapat melacak status revisi berkas secara transparan.',
    role: 'Full-Stack Developer',
    githubUrl: 'https://github.com/RendiS10/web-wisuda',
    imageUrl: '/projects/wisuda.jpg',
    imageFit: 'cover',
    featured: false,
    metrics: [
      { label: 'Framework', value: 'CodeIgniter' },
      { label: 'Database', value: 'MySQL' },
      { label: 'Domain', value: 'Akademik Kampus' }
    ]
  },
  {
    id: 'siakad-app',
    title: 'Siakad App (Sistem Informasi Akademik)',
    subtitle: 'Platform Pengelolaan Nilai, KRS, dan Data Mahasiswa Kampus',
    category: 'fullstack',
    summary: 'Sistem Informasi Akademik (Siakad) berbasis web untuk manajemen data mahasiswa, input kartu rencana studi (KRS), transkrip nilai, dan status tagihan perkuliahan.',
    description: 'Aplikasi web komprehensif untuk tata kelola administrasi akademik perguruan tinggi, mencakup portal mahasiswa untuk pengisian KRS dan melihat KHS, serta portal dosen untuk penilaian mahasiswa.',
    architecture: [
      'Backend PHP native terstruktur dengan konsep object-oriented & MVC',
      'Skema relasional MySQL multi-tabel (mahasiswa, dosen, mata kuliah, jadwal, nilai)',
      'Antarmuka responsif ramah desktop dan tablet'
    ],
    stack: ['PHP', 'MySQL', 'Bootstrap', 'JavaScript', 'HTML5/CSS3'],
    highlights: [
      'Manajemen portal ganda (Portal Mahasiswa & Portal Dosen)',
      'Kalkulasi otomatis IP/IPK semester dan cetak Kartu Hasil Studi',
      'Tersedia di repositori publik GitHub'
    ],
    challenges: 'Menjaga akurasi kalkulasi indeks prestasi dan aturan prasyarat pengambilan SKS mata kuliah.',
    role: 'Backend & Full-Stack Developer',
    githubUrl: 'https://github.com/RendiS10/siakad',
    imageUrl: '/projects/siakad.jpg',
    imageFit: 'cover',
    featured: false,
    metrics: [
      { label: 'Domain', value: 'Sistem Akademik' },
      { label: 'Engine', value: 'PHP & MySQL' },
      { label: 'Fitur', value: 'KRS & Nilai' }
    ]
  },
  {
    id: 'java-crud',
    title: 'Java Desktop CRUD (SIAKAD Desktop)',
    subtitle: 'Aplikasi GUI Desktop Pengelolaan Data Mahasiswa & Nilai',
    category: 'fullstack',
    summary: 'Aplikasi desktop berbasis Java GUI Swing dan NetBeans untuk pengelolaan data master mahasiswa, pencatatan nilai, dan pelaporan database MySQL.',
    description: 'Sistem desktop mandiri yang dibangun dengan Java Swing untuk mengelola data operasional mahasiswa secara cepat melalui koneksi JDBC ke database MySQL.',
    architecture: [
      'Arsitektur Java Swing Desktop dengan komponen JFrame kustom',
      'Konektivitas database terisolasi menggunakan Java Database Connectivity (JDBC)',
      'Validasi input form dan penanganan error interaktif'
    ],
    stack: ['Java', 'Swing GUI', 'MySQL', 'JDBC', 'NetBeans'],
    highlights: [
      'Aplikasi desktop responsif dengan antarmuka GUI intuitif',
      'Operasi CRUD lengkap terhubung langsung ke database MySQL',
      'Tersedia di repositori publik GitHub'
    ],
    challenges: 'Mengelola penanganan event listener UI Swing dan kestabilan pooling koneksi JDBC saat transaksi data intensif.',
    role: 'Desktop Application Developer',
    githubUrl: 'https://github.com/RendiS10/java-smt4a',
    imageUrl: '/projects/java-crud.jpg',
    imageFit: 'cover',
    featured: false,
    metrics: [
      { label: 'Platform', value: 'Java Desktop' },
      { label: 'GUI Framework', value: 'Swing' },
      { label: 'Database', value: 'MySQL (JDBC)' }
    ]
  },
  {
    id: 'dicoding-web',
    title: 'Dicoding Web Fundamental Showcase',
    subtitle: 'Website Showcase Responsif & Standar Semantik Web Modern',
    category: 'fullstack',
    summary: 'Website interaktif standar industri yang dibangun dengan semantic HTML5, CSS Grid/Flexbox fluid, dan manipulasi DOM JavaScript native.',
    description: 'Proyek submisi akhir kelas Dasar Pemrograman Web Dicoding Indonesia yang berhasil lulus dengan nilai sempurna, menerapkan prinsip semantik web aksesibel dan tata letak responsif.',
    architecture: [
      'Struktur dokumen semantik HTML5 murni',
      'Tata letak responsif menggunakan CSS Grid dan Flexbox modern',
      'Interaktivitas dinamis dengan JavaScript ES6 DOM manipulation'
    ],
    stack: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'DOM API'],
    highlights: [
      'Lulus dengan predikat sempurna pada kurikulum resmi Dicoding',
      'Responsif di berbagai ukuran layar tanpa framework tambahan',
      'Tersedia di repositori publik GitHub'
    ],
    challenges: 'Membangun antarmuka modern dan interaktif tanpa dependensi library/framework eksternal.',
    role: 'Frontend Developer',
    githubUrl: 'https://github.com/RendiS10/MyLearningProgress_Dicoding',
    imageUrl: '/projects/dicoding-web.jpg',
    imageFit: 'cover',
    featured: false,
    metrics: [
      { label: 'Kurikulum', value: 'Dicoding Indonesia' },
      { label: 'Core', value: 'Vanilla Web' },
      { label: 'Standar', value: 'W3C Semantic' }
    ]
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-holycat',
    period: 'Sep 2025 - Sekarang',
    role: 'Full Stack Developer & Mobile Developer',
    organization: 'Holycatlabs',
    badge: 'Freelance → Full-time',
    category: 'project',
    description:
      'Membangun e-commerce, sistem gudang dan fulfillment, CRM penjualan, serta aplikasi mobile Flutter untuk Holycatlabs, sekaligus mengelola server dan tim developer.',
    highlights: [
      'Backend REST API HolyCat (Node.js, Express 5, Prisma, PostgreSQL) dengan antrean BullMQ dan notifikasi real-time Socket.IO',
      'Aplikasi mobile Android dengan Flutter (Riverpod, Dio), closed testing Google Play',
      'SCRM (NestJS, Next.js PWA, Flutter) yang live sejak 5 November 2026, dengan integrasi Accurate Online dalam mode uji',
      'Manifest Checker dan Marketplace Picker System untuk verifikasi resi dan packing gudang',
      'Holydis (Laravel) untuk tracking Purchase Order dan Surat Jalan, serta Teken.ID untuk tanda tangan digital',
      'VPS Ubuntu 24.04 dengan Docker Compose, Caddy, dan CI/CD GitHub Actions; admin repositori dan pengelola tim developer'
    ],
    tech: ['Node.js', 'Express', 'NestJS', 'Next.js', 'Flutter', 'PostgreSQL', 'Prisma', 'BullMQ', 'Docker', 'Laravel']
  },
  {
    id: 'exp-abbygail',
    period: 'Jan 2026 - Apr 2026',
    role: 'Fullstack Web Developer',
    organization: 'Abby n Bev (SJA Textile) — Bandung',
    badge: 'Kontrak Komersial',
    category: 'project',
    description:
      'Membangun platform ritel fashion & skincare komersial terpadu: storefront Next.js 15, dashboard admin Ant Design v5, payment gateway Midtrans, dan backend Adonis.js v6 dengan 30+ tabel PostgreSQL.',
    highlights: [
      'Storefront customer-facing modern Next.js 15 App Router, React 19, dan Tailwind CSS v4',
      'CMS admin dashboard operasional: React, Vite, Ant Design (antd 5), Tiptap WYSIWYG, dan Zustand',
      'Backend REST API arsitektur MVC Adonis.js v6 TypeScript, validasi VineJS, dan integrasi Midtrans',
      'Perancangan skema relasional 30+ tabel PostgreSQL teroptimasi dengan Lucid ORM dan Redis caching'
    ],
    tech: ['Next.js 15', 'Adonis.js v6', 'React 19', 'TypeScript', 'PostgreSQL', 'Lucid ORM', 'Tailwind CSS v4', 'Ant Design', 'Midtrans', 'Redis', 'Vite', 'Zod']
  },
  {
    id: 'exp-ciptabintar',
    period: 'Okt 2024 - Jan 2025',
    role: 'Backend Developer & IT Operations Intern',
    organization: 'Dinas Cipta Bintar — Pemerintah Kota Bandung',
    badge: 'Magang Kedinasan',
    category: 'government',
    description:
      'Mengembangkan REST API dengan NestJS & TypeScript untuk sistem integrasi pelayanan masyarakat, serta mengelola dan mengoptimasi performa query database MySQL di lingkungan kedinasan.',
    highlights: [
      'Pengembangan modul REST API berbasis NestJS & TypeScript',
      'Optimasi query database MySQL untuk efisiensi akses data publik',
      'Dukungan teknis infrastruktur sistem informasi internal dinas'
    ],
    tech: ['NestJS', 'TypeScript', 'MySQL', 'REST API', 'Linux']
  },
  {
    id: 'exp-msib',
    period: 'Feb 2024 - Jun 2024',
    role: 'Front-End & Back-End Web Developer',
    organization: 'Dicoding × Kampus Merdeka Kemendikbudristek',
    badge: 'Studi Independen Kemendikbud',
    category: 'education',
    description:
      'Program akselerasi pengembangan web modern standar industri: Single Page Application (SPA), RESTful API, arsitektur frontend modular, dan capstone project Green Economy.',
    highlights: [
      'Lulusan program Studi Independen Bersertifikat (SIB) Cycle 6',
      'Pengembangan REST API dan Single Page Application modular',
      'Capstone project pengembangan web bertema Green Economy'
    ],
    tech: ['React', 'Node.js', 'Express', 'JavaScript', 'REST API', 'Webpack']
  },
  {
    id: 'edu-stmik',
    period: 'Agt 2021 - Des 2025',
    role: 'S1 Teknik Informatika (IPK 3.70)',
    organization: 'STMIK Mardira Indonesia',
    badge: 'Pendidikan Formal',
    category: 'education',
    description:
      'Lulus sarjana Teknik Informatika dengan predikat Sangat Memuaskan (IPK 3.70 / 4.00). Fokus studi pada perancangan sistem informasi, arsitektur basis data relasional, pemodelan proses bisnis, dan integrasi sistem digital.',
    highlights: [
      'IPK Akhir: 3.70 / 4.00 (Predikat Sangat Memuaskan)',
      'Fokus Perancangan Sistem Informasi & Analisis Bisnis',
      'Arsitektur Basis Data Relasional & Integrasi Sistem'
    ],
    tech: ['Sistem Informasi', 'Database Design', 'System Analysis', 'Business Process', 'Data Modeling']
  },
  {
    id: 'exp-csa-mentor',
    period: '2023 - 2024',
    role: 'Academic Mentor & Divisi Pemrograman',
    organization: 'Creative Student Association (CSA) — STMIK Mardira',
    badge: 'Organisasi & Mentorship',
    category: 'education',
    description:
      'Memimpin dan memfasilitasi program bimbingan belajar (Study Club) divisi pemrograman bagi 30+ mahasiswa junior, mencakup logika algoritma dasar, struktur data, dan pengembangan web full-stack.',
    highlights: [
      'Membimbing 30+ mahasiswa junior dalam algoritma & dasar web development',
      'Mengorganisasi kurikulum praktikum mingguan dan sesi peer-programming',
      'Menerima sertifikat penghargaan resmi sebagai Mentor Study Club CSA'
    ],
    tech: ['Algoritma', 'Data Structures', 'Web Development', 'PHP', 'JavaScript', 'Mentorship']
  },
  {
    id: 'exp-matlaulanwar',
    period: '2024',
    role: 'Project Manager & Web Developer',
    organization: "SMA Mathla'ul Anwar",
    badge: 'Proyek Implementasi',
    category: 'project',
    description:
      'Memimpin perancangan dan implementasi Sistem Informasi Kelulusan (SIK) berbasis web responsif untuk mengotomatisasi pengumuman hasil kelulusan ratusan siswa secara aman dan terpusat.',
    highlights: [
      'Memimpin seluruh siklus hidup proyek (analisis kebutuhan, desain DB, hingga deploy)',
      'Menjamin ketersediaan sistem saat lonjakan akses serentak pada hari pengumuman',
      'Mendapatkan Sertifikat Apresiasi resmi dari Kepala Sekolah'
    ],
    tech: ['PHP', 'MySQL', 'Bootstrap', 'Project Management', 'Database Security']
  }
];


export const certificatesData: CertificateItem[] = [
  {
    id: 'cert-msib',
    title: 'Studi Independen Bersertifikat (SIB Dicoding Cycle 6)',
    issuer: 'Dicoding × Kampus Merdeka Kemendikbudristek',
    category: 'penghargaan',
    imageUrl: '/certificates/dicoding/msib.jpg',
    year: '2024'
  },
  {
    id: 'cert-belajar-bekerja',
    title: 'Belajar Bekerja Bootcamp: Web Developer (Nilai Akhir A)',
    issuer: 'Luarsekolah',
    category: 'penghargaan',
    imageUrl: '/certificates/luarsekolah/belajarbekerjaluarsekolah.jpg',
    year: '2026'
  },
  {
    id: 'cert-ciptabintar',
    title: 'Surat Keterangan Magang IT & Backend',
    issuer: 'Dinas Cipta Bintar Kota Bandung',
    category: 'penghargaan',
    imageUrl: '/certificates/ciptabintar.jpg',
    year: '2025'
  },
  {
    id: 'cert-matlaulanwar',
    title: 'Implementasi Sistem Informasi Kelulusan (SIK)',
    issuer: 'SMA Mathla\'ul Anwar',
    category: 'penghargaan',
    imageUrl: '/certificates/matlaulanwar.jpg',
    year: '2024'
  },
  {
    id: 'cert-fe-expert',
    title: 'Menjadi Front-End Web Developer Expert',
    issuer: 'Dicoding Indonesia',
    category: 'kelas',
    imageUrl: '/certificates/dicoding/front-end-expert.jpg',
    year: '2024'
  },
  {
    id: 'cert-fund-react',
    title: 'Belajar Fundamental Aplikasi Web dengan React',
    issuer: 'Dicoding Indonesia',
    category: 'kelas',
    imageUrl: '/certificates/dicoding/fundamental-react.jpg',
    year: '2024'
  },
  {
    id: 'cert-web-react',
    title: 'Belajar Membuat Aplikasi Web dengan React',
    issuer: 'Dicoding Indonesia',
    category: 'kelas',
    imageUrl: '/certificates/dicoding/web-react.jpg',
    year: '2024'
  },
  {
    id: 'cert-fund-fe',
    title: 'Belajar Fundamental Front-End Web',
    issuer: 'Dicoding Indonesia',
    category: 'kelas',
    imageUrl: '/certificates/dicoding/fundamental-frontend.jpg',
    year: '2024'
  },
  {
    id: 'cert-backend-pemula',
    title: 'Belajar Membuat Aplikasi Back-End untuk Pemula',
    issuer: 'Dicoding Indonesia',
    category: 'kelas',
    imageUrl: '/certificates/dicoding/backend-pemula.jpg',
    year: '2024'
  },
  {
    id: 'cert-fe-pemula',
    title: 'Belajar Front-End Web untuk Pemula',
    issuer: 'Dicoding Indonesia',
    category: 'kelas',
    imageUrl: '/certificates/dicoding/front-end-pemula.jpg',
    year: '2024'
  },
  {
    id: 'cert-dasar-web',
    title: 'Belajar Dasar Pemrograman Web',
    issuer: 'Dicoding Indonesia',
    category: 'kelas',
    imageUrl: '/certificates/dicoding/dasar-web.jpg',
    year: '2024'
  },
  {
    id: 'cert-dasar-js',
    title: 'Belajar Dasar Pemrograman JavaScript',
    issuer: 'Dicoding Indonesia',
    category: 'kelas',
    imageUrl: '/certificates/dicoding/dasar-js.jpg',
    year: '2024'
  },
  {
    id: 'cert-logika-dicoding',
    title: 'Belajar Dasar Logika Pemrograman',
    issuer: 'Dicoding Indonesia',
    category: 'kelas',
    imageUrl: '/certificates/dicoding/logika-pemrograman.jpg',
    year: '2024'
  },
  {
    id: 'cert-git-github',
    title: 'Belajar Dasar Git dengan GitHub',
    issuer: 'Dicoding Indonesia',
    category: 'kelas',
    imageUrl: '/certificates/dicoding/git-github.jpg',
    year: '2024'
  },
  {
    id: 'cert-dasar-ai',
    title: 'Belajar Dasar AI (Artificial Intelligence)',
    issuer: 'Dicoding Indonesia',
    category: 'kelas',
    imageUrl: '/certificates/dicoding/dasar-ai.jpg',
    year: '2024'
  },
  {
    id: 'cert-aws-cloud',
    title: 'Belajar Dasar AWS Cloud Computing',
    issuer: 'Dicoding Indonesia × AWS',
    category: 'kelas',
    imageUrl: '/certificates/dicoding/aws-cloud.jpg',
    year: '2024'
  },
  {
    id: 'cert-memulai-dasar',
    title: 'Memulai Dasar Pemrograman untuk Software Developer',
    issuer: 'Dicoding Indonesia',
    category: 'kelas',
    imageUrl: '/certificates/dicoding/memulai-dasar.jpg',
    year: '2024'
  },
  {
    id: 'cert-meniti-karir',
    title: 'Meniti Karier sebagai Software Developer',
    issuer: 'Dicoding Indonesia',
    category: 'kelas',
    imageUrl: '/certificates/dicoding/meniti-karir.jpg',
    year: '2024'
  },
  {
    id: 'cert-ml-pemula',
    title: 'Belajar Machine Learning untuk Pemula',
    issuer: 'Dicoding Indonesia',
    category: 'kelas',
    imageUrl: '/certificates/dicoding/BelajarMachineLearninguntukPemula.png',
    year: '2026'
  },
  {
    id: 'cert-python-pemula',
    title: 'Memulai Pemrograman dengan Python',
    issuer: 'Dicoding Indonesia',
    category: 'kelas',
    imageUrl: '/certificates/dicoding/Memulai Pemrograman dengan Python.png',
    year: '2026'
  },
  {
    id: 'cert-prompt-eng',
    title: 'Prompt Engineering untuk Software Developer',
    issuer: 'Dicoding Indonesia',
    category: 'kelas',
    imageUrl: '/certificates/dicoding/Prompt Engineering untuk Software Developer.png',
    year: '2026'
  },
  {
    id: 'cert-pengembangan-diri',
    title: 'Belajar Strategi Pengembangan Diri',
    issuer: 'Dicoding Indonesia',
    category: 'kelas',
    imageUrl: '/certificates/dicoding/Belajar Strategi Pengembangan Diri.png',
    year: '2026'
  },
  {
    id: 'cert-js-mastery',
    title: 'JavaScript Mastery',
    issuer: 'Luarsekolah',
    category: 'kelas',
    imageUrl: '/certificates/luarsekolah/js-mastery.jpg',
    year: '2024'
  },
  {
    id: 'cert-php-native',
    title: 'Belajar PHP Native & Web Development',
    issuer: 'Luarsekolah',
    category: 'kelas',
    imageUrl: '/certificates/luarsekolah/php-native.jpg',
    year: '2023'
  },
  {
    id: 'cert-logika-ls',
    title: 'Belajar Logika Pemrograman',
    issuer: 'Luarsekolah',
    category: 'kelas',
    imageUrl: '/certificates/luarsekolah/logika-pemrograman.jpg',
    year: '2023'
  },
  {
    id: 'cert-css-ls',
    title: 'Belajar CSS Modern & Desain Web',
    issuer: 'Luarsekolah',
    category: 'kelas',
    imageUrl: '/certificates/luarsekolah/css.jpg',
    year: '2023'
  },
  {
    id: 'cert-bdd-2025',
    title: 'Baparekraf Developer Day (BDD) 2025',
    issuer: 'Kemenparekraf × Dicoding',
    category: 'webinar',
    imageUrl: '/certificates/dicoding/bdd.jpg',
    year: '2025'
  },
  {
    id: 'cert-bdd-2024',
    title: 'Baparekraf Developer Day (BDD) 2024',
    issuer: 'Kemenparekraf × Dicoding',
    category: 'webinar',
    imageUrl: '/certificates/dicoding/bdd1.jpg',
    year: '2024'
  },
  {
    id: 'cert-webinar-css',
    title: 'Webinar CSS Pre-processor',
    issuer: 'Dicoding Indonesia',
    category: 'webinar',
    imageUrl: '/certificates/dicoding/webinar-css.jpg',
    year: '2024'
  },
  {
    id: 'cert-revou-da',
    title: 'Introduction to Data Analyst',
    issuer: 'RevoU Tech Academy',
    category: 'webinar',
    imageUrl: '/certificates/revou/data-analyst.jpg',
    year: '2024'
  },
  {
    id: 'cert-revou-se',
    title: 'Introduction to Software Engineering',
    issuer: 'RevoU Tech Academy',
    category: 'webinar',
    imageUrl: '/certificates/revou/software-developer.jpg',
    year: '2024'
  },
  {
    id: 'cert-webinar-stmik',
    title: 'Webinar Mengenal Karier Bidang Teknologi',
    issuer: 'STMIK Mardira Indonesia',
    category: 'webinar',
    imageUrl: '/certificates/webinar-stmik.jpg',
    year: '2023'
  },
  {
    id: 'cert-csa-anggota',
    title: 'Anggota Creative Student Association (CSA) & Kelulusan Sidang',
    issuer: 'Creative Student Association (CSA)',
    category: 'organisasi',
    imageUrl: '/certificates/csa/anggotacsa.jpg',
    year: '2023'
  },
  {
    id: 'cert-csa-mentor',
    title: 'Mentor Study Club CSA — Divisi Pemrograman',
    issuer: 'Creative Student Association (CSA)',
    category: 'organisasi',
    imageUrl: '/certificates/csa/mentor.jpg',
    year: '2024'
  },
  {
    id: 'cert-csa-panitia',
    title: 'Panitia Pelaksana Webinar Teknologi CSA',
    issuer: 'Creative Student Association (CSA)',
    category: 'organisasi',
    imageUrl: '/certificates/csa/panitia.jpg',
    year: '2024'
  },
  {
    id: 'cert-csa-logistik',
    title: 'Panitia Divisi Logistik Webinar CSA',
    issuer: 'Creative Student Association (CSA)',
    category: 'organisasi',
    imageUrl: '/certificates/csa/panitia-logistik.jpg',
    year: '2023'
  }
];
