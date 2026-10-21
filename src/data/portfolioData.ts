import type { ProfileData, Project, TechItem, ExperienceItem } from '../types/portfolio';

export const profileData: ProfileData = {
  name: 'Rendi Sutendi',
  tagline: 'Full-Stack & Mobile Software Engineer',
  education: 'S1 Teknik Informatika (IPK 3.70) • STMIK Mardira Indonesia',
  status: 'Terbuka untuk Peluang Kerja (Full-Stack / Mobile / Backend)',
  bio: 'Sarjana Teknik Informatika (IPK 3.70) berfokus pada arsitektur web modern, backend REST API, dan aplikasi mobile Flutter dengan pengalaman nyata melayani 3.000+ pengguna aktif, integrasi pembayaran digital Midtrans, dan antrian antarmuka teruji.',
  experienceStart: '3+ Tahun Pengalaman',
  avatarUrl: '/rendi.jpg',
  interests: [
    'Full-Stack Architecture',
    'Mobile Systems (Flutter)',
    'High-Throughput REST API',
    'Distributed Caching & Queues',
    'Relational Database Modeling'
  ],
  contact: {
    email: 'rendisutendi21@gmail.com',
    github: 'https://github.com/RendiS10',
    linkedin: 'https://linkedin.com/in/rendi-sutendi-813a90270',
    location: 'Bandung, Indonesia'
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
    projectLinks: ['holycat', 'jkt48', 'green-sustainify']
  },
  {
    name: 'Next.js',
    category: 'frontend',
    layer: 'client',
    iconKey: 'nextdotjs',
    color: '#0f172a',
    roleTag: 'App Framework',
    usageContext: 'Server-Side Rendering (SSR), App Router, dan performa tinggi e-commerce',
    projectLinks: ['holycat', 'abbygail']
  },
  {
    name: 'Flutter',
    category: 'mobile',
    layer: 'client',
    iconKey: 'flutter',
    color: '#0284c7',
    roleTag: 'Native Mobile',
    usageContext: 'Aplikasi mobile cross-platform Android & iOS dengan Clean Architecture dan 60fps UI',
    projectLinks: ['holycat-mobile']
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
    name: 'Node.js',
    category: 'backend',
    layer: 'backend',
    iconKey: 'nodejs',
    color: '#22c55e',
    roleTag: 'Server Runtime',
    usageContext: 'REST API berkinerja tinggi, Swagger documentation, dan microservices',
    projectLinks: ['holycat', 'jkt48']
  },
  {
    name: 'Laravel',
    category: 'backend',
    layer: 'backend',
    iconKey: 'laravel',
    color: '#ef4444',
    roleTag: 'MVC & REST Engine',
    usageContext: 'REST API, Sanctum token authentication, dan sistem tracking logistik Holydis',
    projectLinks: ['holycat']
  },

  // database and cloud persistence layer
  {
    name: 'PostgreSQL',
    category: 'backend',
    layer: 'database',
    iconKey: 'postgresql',
    color: '#2563eb',
    roleTag: 'Relational Core',
    usageContext: 'Pemodelan data relasional kompleks, indeks teroptimasi, dan ACID transactions',
    projectLinks: ['holycat', 'abbygail']
  },
  {
    name: 'Prisma ORM',
    category: 'backend',
    layer: 'database',
    iconKey: 'prisma',
    color: '#6366f1',
    roleTag: 'Type-Safe ORM',
    usageContext: 'Database migrations type-safe, schema declarative, dan queries teroptimasi',
    projectLinks: ['holycat']
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
    id: 'holycat',
    title: 'HolyCat Omnichannel Ecosystem',
    subtitle: 'Ekosistem E-Commerce & Pet-Care Terintegrasi Skala Produksi (3.000+ Pengguna)',
    category: 'fullstack',
    summary: 'Platform omnichannel pet-care end-to-end yang melayani 3.000+ pengguna aktif: RESTful API teruji, web storefront Next.js, sistem tracking merchant Holydis, payment gateway Midtrans, dan background job BullMQ + Redis.',
    description: 'Sistem produksi komprehensif yang dirancang dan diimplementasikan secara end-to-end untuk brand pet-care HolyCat. Mengintegrasikan web storefront customer, CMS admin dashboard, modul logistik ekspedisi, serta transaksi dompet digital HolyPay dengan jaminan ACID transaction.',
    architecture: [
      'Backend RESTful API dengan Node.js, Express, Prisma ORM, dan PostgreSQL (30+ model relasional: produk, order, voucher, wallet)',
      'Storefront responsif dan interaktif dibangun dengan Next.js, React, Tailwind CSS, TanStack Query, dan Zustand',
      'Payment gateway Midtrans otomatis dengan penanganan webhook asinkron dan verifikasi signature',
      'Background job processing dan message queue menggunakan BullMQ dan Redis Caching',
      'Integrasi Biteship API untuk kalkulasi ongkos kirim real-time dan pelacakan kurir ekspedisi',
      'Dompet digital in-app HolyPay (top-up, saldo, mutasi) dengan transaksi database terisolasi ACID',
      'Sistem tracking merchant Holydis (PO & Surat Jalan) dengan Laravel 13, Sanctum, dan React'
    ],
    stack: [
      'Next.js',
      'Node.js',
      'Flutter',
      'Laravel',
      'PostgreSQL',
      'Prisma',
      'Midtrans',
      'Redis',
      'BullMQ',
      'Docker'
    ],
    highlights: [
      'Melayani 3.000+ pengguna aktif terdaftar secara live di produksi',
      '50+ REST API endpoints terdokumentasi lengkap via Swagger UI',
      'Arsitektur transaksi finansial dompet digital HolyPay bergaransi ACID'
    ],
    challenges: 'Mengkoordinasikan sinkronisasi transaksi real-time antara webhook payment gateway, background queue BullMQ, mutasi dompet digital internal, dan kalkulasi logistik multi-ekspedisi tanpa race condition.',
    role: 'Lead Software Engineer (Full-Stack & Mobile)',
    demoUrl: 'https://shop.holycatlabs.com/',
    githubUrl: 'https://github.com/RendiS10/holycat-ecommerce-frontend',
    imageUrl: '/projects/holycat.jpg',
    imageFit: 'cover',
    featured: true,
    metrics: [
      { label: 'Active Users', value: '3.000+' },
      { label: 'API Endpoints', value: '50+ REST' },
      { label: 'Architecture', value: 'Omnichannel' }
    ]
  },
  {
    id: 'holycat-mobile',
    title: 'HolyCat Mobile Customer App',
    subtitle: 'Aplikasi Mobile Native Cross-Platform Pet-Care dengan Clean Architecture',
    category: 'mobile',
    summary: 'Aplikasi mobile customer HolyCat berbasis Flutter dengan Clean Architecture, Riverpod state management, integrasi Dio HTTP Client, dan push notification interaktif.',
    description: 'Aplikasi mobile pelanggan HolyCat yang menyajikan pengalaman belanja mulus di platform Android dan iOS. Menghubungkan pengguna langsung ke katalog produk, konsultasi perawatan, pelacakan pesanan real-time, dan pembayaran dompet digital.',
    architecture: [
      'Arsitektur berlapis Flutter Clean Architecture (Presentation, Domain, Data Layers)',
      'State management reaktif berkinerja tinggi menggunakan Riverpod',
      'Jaringan HTTP terisolasi dengan Dio, caching interceptor, dan token auto-refresh',
      'Navigasi deklaratif deep-linking menggunakan GoRouter'
    ],
    stack: [
      'Flutter',
      'Dart',
      'Riverpod',
      'Dio',
      'Clean Architecture',
      'REST API'
    ],
    highlights: [
      'Pengalaman pengguna 60fps responsif di platform Android dan iOS',
      'Arsitektur Clean Architecture memisahkan logika bisnis dari UI',
      'Integrasi sinkron dengan backend Node.js dan database PostgreSQL HolyCat'
    ],
    challenges: 'Menerapkan arsitektur Flutter yang skalabel dan mudah di-maintain dengan pemisahan dependensi ketat dan penanganan offline state caching.',
    role: 'Mobile Application Engineer',
    githubUrl: 'https://github.com/RendiS10',
    isMobileApp: true,
    demoStatusLabel: 'Aplikasi Mobile Native (Android & iOS)',
    imageUrl: '/projects/holycat.jpg',
    imageFit: 'cover',
    featured: true,
    metrics: [
      { label: 'Mobile Engine', value: 'Flutter & Dart' },
      { label: 'State Paradigm', value: 'Riverpod' },
      { label: 'Platform', value: 'Cross-Platform' }
    ]
  },
  {
    id: 'abbygail',
    title: 'Abby & Gail Skincare E-Commerce',
    subtitle: 'Platform E-Commerce Skincare Modern dengan Next.js SSR & Adonis.js (2.000+ Pengguna)',
    category: 'fullstack',
    summary: 'Platform retail e-commerce produk perawatan kulit untuk brand Abby & Gail (SJA Textile) yang melayani 2.000+ pengguna terdaftar dengan Next.js, Adonis.js TypeScript, dan PostgreSQL.',
    description: 'Sistem e-commerce ritel skala komersial yang mencakup storefront performa tinggi berbasis Server-Side Rendering (SSR) dan Content Management System (CMS) admin dengan kontrol otorisasi multi-role RBAC.',
    architecture: [
      'Frontend storefront modern dengan Next.js dan optimasi Server-Side Rendering (SSR)',
      'Backend 50+ REST API endpoints modular dengan Adonis.js MVC Architecture',
      'Perancangan skema relasional 30+ tabel database PostgreSQL dengan indexing efisien',
      'Kontrol otorisasi Role-Based Access Control (RBAC) untuk admin, staf, dan customer'
    ],
    stack: [
      'Next.js',
      'Adonis.js',
      'TypeScript',
      'PostgreSQL',
      'Tailwind CSS',
      'REST API'
    ],
    highlights: [
      'Melayani 2.000+ pengguna aktif terdaftar di produksi komersial',
      '50+ REST endpoints dengan validasi data skema ketat',
      'CMS admin interaktif untuk manajemen inventaris & pesanan'
    ],
    challenges: 'Mengoptimalkan waktu respons database pada kueri katalog produk multi-varian dan transaksi diskon bertingkat.',
    role: 'Fullstack Web Developer',
    demoUrl: 'https://abbyandgail.com/',
    isPrivateRepo: true,
    privateRepoReason: 'Repository privat komersial perusahaan (SJA Textile)',
    imageUrl: '/projects/green-sustainify.png',
    imageFit: 'cover',
    featured: true,
    metrics: [
      { label: 'Registered Users', value: '2.000+' },
      { label: 'REST Endpoints', value: '50+ APIs' },
      { label: 'DB Architecture', value: '30+ Tables' }
    ]
  },
  {
    id: 'jkt48',
    title: 'JKT48 Merchandise E-Commerce',
    subtitle: 'Prototype Platform Belanja Merchandise dengan Reaktif State & REST API',
    category: 'fullstack',
    summary: 'Platform e-commerce prototype merchandise bertema JKT48 dengan integrasi keranjang interaktif, katalog responsif, dan backend REST API.',
    description: 'Proyek web aplikasi e-commerce modern yang mengimplementasikan arsitektur micro-storefront dengan React.js, Express.js, dan MySQL.',
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
      'Integrasi keranjang belanja reaktif real-time',
      'Desain UI modern terinspirasi estetika idol culture'
    ],
    challenges: 'Mendesain struktur database relasional yang fleksibel untuk variasi ukuran, edisi, dan bundling item merchandise.',
    role: 'Full-Stack Developer',
    githubUrl: 'https://github.com/RendiS10/e-commerce-jkt48',
    imageUrl: '/projects/jkt48.jpg',
    imageFit: 'cover',
    featured: false,
    metrics: [
      { label: 'Frontend', value: 'React & Tailwind' },
      { label: 'Backend', value: 'Express.js' },
      { label: 'Database', value: 'MySQL' }
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
  }
];

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-holycat',
    period: '2025 - Sekarang',
    role: 'Software Engineer (Full-Stack & Mobile)',
    organization: 'Holycatlabs',
    badge: 'Produksi / Freelance',
    category: 'project',
    description:
      'Membangun ekosistem omnichannel pet-care HolyCat secara end-to-end: backend REST API (Node.js/Prisma/PostgreSQL), web storefront Next.js, aplikasi mobile Flutter (Clean Architecture), sistem logistik Holydis (Laravel), serta integrasi Midtrans dan antrian BullMQ + Redis — melayani 3.000+ pengguna terdaftar.',
    highlights: [
      'Arsitektur REST API dengan 50+ endpoints skala produksi dan 30+ model relasional',
      'Dompet digital in-app HolyPay bergaransi ACID transaction',
      'Aplikasi mobile Flutter cross-platform (Android & iOS) dengan Clean Architecture',
      'Integrasi payment gateway Midtrans dan kurir logistik Biteship'
    ],
    tech: ['Node.js', 'Next.js', 'Flutter', 'Laravel', 'PostgreSQL', 'Prisma', 'Midtrans', 'Redis', 'BullMQ', 'Docker']
  },
  {
    id: 'exp-abbygail',
    period: 'Jan 2026 - Apr 2026',
    role: 'Fullstack Web Developer',
    organization: 'Abby & Gail (SJA Textile) — Bandung',
    badge: 'Kontrak Komersial',
    category: 'project',
    description:
      'Mengembangkan platform ritel e-commerce produk perawatan kulit melayani 2.000+ pengguna terdaftar. Membangun 50+ REST endpoints dengan Adonis.js MVC, arsitektur skema relasional 30+ tabel PostgreSQL, dan storefront Next.js SSR.',
    highlights: [
      'Membangun 50+ REST API endpoints dengan Adonis.js modular service layer',
      'Merancang arsitektur 30+ tabel relasional PostgreSQL untuk inventaris dan pesanan',
      'CMS admin interaktif dengan kontrol otorisasi Role-Based Access Control (RBAC)'
    ],
    tech: ['Next.js', 'Adonis.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS']
  },
  {
    id: 'exp-ciptabintar',
    period: 'Okt 2024 - Jan 2025',
    role: 'Backend Developer & IT Operations Intern',
    organization: 'Dinas Cipta Bintar — Pemerintah Kota Bandung',
    badge: 'Magang Kedinasan',
    category: 'security',
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
    id: 'edu-stmik',
    period: 'Agt 2021 - Des 2025',
    role: 'S1 Teknik Informatika (IPK 3.70)',
    organization: 'STMIK Mardira Indonesia',
    badge: 'Pendidikan Formal',
    category: 'education',
    description:
      'Menyelesaikan studi sarjana Teknik Informatika dengan predikat sangat memuaskan (IPK 3.70 / 4.00). Mendalami rekayasa perangkat lunak, arsitektur sistem berbasis web & mobile, pemodelan basis data relasional, dan algoritma komputasi.',
    highlights: [
      'IPK Akhir: 3.70 / 4.00 (Predikat Sangat Memuaskan)',
      'Fokus Rekayasa Perangkat Lunak Web & Mobile',
      'Riset & Implementasi Sistem Informasi Terdistribusi'
    ],
    tech: ['Software Engineering', 'System Architecture', 'Database Design', 'Algorithms', 'Web Development']
  }
];
