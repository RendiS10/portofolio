# CV / Portofolio — Rendi Sutendi

Website CV personal (single-page) berbasis **HTML, CSS, dan JavaScript murni** — tanpa framework atau dependency, langsung jalan di browser. Gaya visual sengaja dibuat kalem dan editorial (bukan tampilan generik).

> Catatan: konten dari folder lama `portofolio/` (section Project & seluruh sertifikat) sudah dipindahkan ke sini. Folder `portofolio/` aman untuk dihapus.

## Fitur
- Hero dengan foto asli + ringkasan dan info singkat
- Dark / light mode (tersimpan di `localStorage`, mengikuti preferensi sistem)
- Navigasi sticky + active link highlight, menu hamburger di mobile
- Pengalaman kerja, tech stack, pendidikan & organisasi
- **Section Project** (HolyCat sebagai unggulan + project lain) dengan tautan GitHub
- **Galeri sertifikat lengkap** (±32) dengan **filter kategori** (Kelas, Webinar, Penghargaan, Organisasi) + lightbox (klik untuk memperbesar, tutup dengan Esc / klik luar)
- Animasi reveal halus saat scroll (otomatis nonaktif jika user memilih *reduced motion*)
- Responsif penuh (desktop, tablet, mobile)
- Tombol unduh CV (.docx)

## Struktur
```
cv-rendi-sutendi/
├── index.html      # struktur halaman
├── styles.css      # styling & tema (aksen hijau, palet kertas hangat)
├── script.js       # interaksi (tema, menu, reveal, lightbox)
├── CV_Rendi_Sutendi_Indonesia.docx   # file CV untuk diunduh
└── assets/
    ├── rendi.jpg                 # foto profil
    ├── projects/                 # gambar project (holycat, jkt48, dll)
    └── certificates/             # gambar sertifikat (dicoding/, luarsekolah/, csa/, revou/, dll)
```

Data sertifikat (judul, kategori, gambar) dikelola dalam array `certs` di `script.js`, lalu dirender otomatis ke grid + filter.

## Cara pakai
1. Buka `index.html` langsung di browser, **atau**
2. Jalankan server statis lokal:
   ```bash
   npx serve cv-rendi-sutendi      # Node
   python -m http.server 5500       # Python
   ```

## Deploy
Folder statis — bisa langsung di-deploy ke **GitHub Pages**, **Netlify**, **Vercel**, atau **Cloudflare Pages** tanpa build step.

## Kustomisasi
- **Foto profil:** ganti `assets/rendi.jpg`. Atur framing wajah lewat `object-position` pada `.hero-photo img` di `styles.css`.
- **Sertifikat:** tambah/ganti gambar di `assets/certificates/`, lalu tambahkan blok `<figure class="cert" data-full="...">` di section `#certs`.
- **Warna:** semua warna diatur lewat CSS variables di bagian atas `styles.css` (`--green`, `--paper`, dst.).
