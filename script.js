/* ============================================================
   Rendi Sutendi — CV / Portfolio interactions (vanilla JS)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Theme toggle (persisted) ---------- */
  const root = document.documentElement;
  const stored = localStorage.getItem("rs-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", stored || (prefersDark ? "dark" : "light"));
  document.getElementById("themeToggle")?.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("rs-theme", next);
  });

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const closeMenu = () => {
    navLinks?.classList.remove("open");
    menuToggle?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  };
  menuToggle?.addEventListener("click", function () {
    const open = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  /* ---------- Navbar border on scroll ---------- */
  const navbar = document.getElementById("navbar");
  const onScroll = () => navbar?.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Certificates: data + render ---------- */
  const C = "assets/certificates/";
  const certs = [
    { img: C + "dicoding/msib.jpg",                 title: "Sertifikat MSIB (SIB Dicoding Cycle 6)", cat: "penghargaan" },
    { img: C + "luarsekolah/pbi.jpg",               title: "Project Based Internship — Luarsekolah", cat: "penghargaan" },
    { img: C + "dicoding/backend-pemula.jpg",       title: "Belajar Membuat Aplikasi Back-End untuk Pemula", cat: "kelas" },
    { img: C + "luarsekolah/js-mastery.jpg",        title: "JavaScript Mastery", cat: "kelas" },
    { img: C + "dicoding/fundamental-react.jpg",    title: "Belajar Fundamental Aplikasi Web dengan React", cat: "kelas" },
    { img: C + "dicoding/front-end-expert.jpg",     title: "Menjadi Front-End Web Developer Expert", cat: "kelas" },
    { img: C + "dicoding/web-react.jpg",            title: "Belajar Membuat Aplikasi Web dengan React", cat: "kelas" },
    { img: C + "dicoding/fundamental-frontend.jpg", title: "Belajar Fundamental Front-End Web", cat: "kelas" },
    { img: C + "dicoding/front-end-pemula.jpg",     title: "Belajar Front-End Web untuk Pemula", cat: "kelas" },
    { img: C + "dicoding/dasar-web.jpg",            title: "Belajar Dasar Pemrograman Web", cat: "kelas" },
    { img: C + "dicoding/dasar-js.jpg",             title: "Belajar Dasar Pemrograman JavaScript", cat: "kelas" },
    { img: C + "dicoding/logika-pemrograman.jpg",   title: "Belajar Dasar Logika Pemrograman", cat: "kelas" },
    { img: C + "dicoding/git-github.jpg",           title: "Belajar Dasar Git dengan GitHub", cat: "kelas" },
    { img: C + "dicoding/dasar-ai.jpg",             title: "Belajar Dasar AI", cat: "kelas" },
    { img: C + "dicoding/aws-cloud.jpg",            title: "Belajar Dasar AWS Cloud", cat: "kelas" },
    { img: C + "dicoding/memulai-dasar.jpg",        title: "Memulai Dasar Pemrograman untuk Software Developer", cat: "kelas" },
    { img: C + "dicoding/meniti-karir.jpg",         title: "Meniti Karier sebagai Software Developer", cat: "kelas" },
    { img: C + "luarsekolah/css.jpg",               title: "Belajar CSS", cat: "kelas" },
    { img: C + "luarsekolah/logika-pemrograman.jpg",title: "Belajar Logika Pemrograman", cat: "kelas" },
    { img: C + "luarsekolah/php-native.jpg",        title: "Belajar PHP Native", cat: "kelas" },
    { img: C + "dicoding/bdd.jpg",                  title: "Event BDD 2025", cat: "webinar" },
    { img: C + "dicoding/bdd1.jpg",                 title: "Event BDD 2024", cat: "webinar" },
    { img: C + "dicoding/webinar-css.jpg",          title: "Webinar CSS Pre-processor", cat: "webinar" },
    { img: C + "revou/data-analyst.jpg",            title: "Belajar Data Analyst — RevoU", cat: "webinar" },
    { img: C + "revou/software-developer.jpg",      title: "Belajar Software Developer — RevoU", cat: "webinar" },
    { img: C + "webinar-stmik.jpg",                 title: "Webinar Mengenal Karier — STMIK", cat: "webinar" },
    { img: C + "ciptabintar.jpg",                   title: "Magang Dinas Cipta Bintar", cat: "penghargaan" },
    { img: C + "matlaulanwar.jpg",                  title: "Sistem Informasi Kelulusan — Mathla'ul Anwar", cat: "penghargaan" },
    { img: C + "csa/anggotacsa.jpg",                title: "Anggota CSA & Lulus Sidang", cat: "organisasi" },
    { img: C + "csa/mentor.jpg",                    title: "Mentor Study Club CSA — Divisi Pemrograman", cat: "organisasi" },
    { img: C + "csa/panitia.jpg",                   title: "Panitia Webinar CSA", cat: "organisasi" },
    { img: C + "csa/panitia-logistik.jpg",          title: "Panitia Webinar CSA (Logistik)", cat: "organisasi" }
  ];
  const catLabel = { kelas: "Kelas", webinar: "Webinar", penghargaan: "Penghargaan", organisasi: "Organisasi" };

  const certGrid = document.getElementById("certGrid");
  if (certGrid) {
    certGrid.innerHTML = certs.map((c) => `
      <figure class="cert" data-full="${c.img}" data-category="${c.cat}">
        <div class="cert-thumb"><img src="${c.img}" alt="${c.title}" loading="lazy" /></div>
        <figcaption>
          <h3>${c.title}</h3>
          <p>${catLabel[c.cat] || ""}</p>
        </figcaption>
      </figure>`).join("");
  }

  /* ---------- Certificate filter ---------- */
  const filterBar = document.getElementById("certFilters");
  filterBar?.addEventListener("click", (e) => {
    const btn = e.target.closest(".cert-filter");
    if (!btn) return;
    const filter = btn.getAttribute("data-filter");
    filterBar.querySelectorAll(".cert-filter").forEach((b) => b.classList.toggle("is-active", b === btn));
    certGrid?.querySelectorAll(".cert").forEach((card) => {
      const show = filter === "all" || card.getAttribute("data-category") === filter;
      card.classList.toggle("is-hidden", !show);
    });
  });

  /* ---------- Certificate lightbox ---------- */
  const lightbox = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const openLb = (src, alt) => {
    if (!lightbox || !lbImg) return;
    lbImg.src = src; lbImg.alt = alt || "Pratinjau sertifikat";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
  const closeLb = () => {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    lbImg.src = "";
  };
  certGrid?.addEventListener("click", (e) => {
    const fig = e.target.closest(".cert");
    if (!fig) return;
    openLb(fig.getAttribute("data-full"), fig.querySelector("img")?.alt);
  });
  document.getElementById("lbClose")?.addEventListener("click", closeLb);
  lightbox?.addEventListener("click", (e) => { if (e.target === lightbox) closeLb(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLb(); });

  /* ---------- Active nav link ---------- */
  const linkMap = {};
  document.querySelectorAll(".nav-link").forEach((l) => {
    const id = l.getAttribute("href")?.replace("#", "");
    if (id) linkMap[id] = l;
  });
  const navObserver = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        Object.values(linkMap).forEach((l) => l.classList.remove("active"));
        linkMap[e.target.id]?.classList.add("active");
      }
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  document.querySelectorAll("main section[id]").forEach((s) => navObserver.observe(s));

  /* ---------- Subtle reveal on scroll ---------- */
  const targets = document.querySelectorAll(
    ".section-head, .about-lead, .about-facts, .xp, .proj, .skill-block, .edu-item, .cert, .contact-intro, .contact-list, .hero-text, .hero-photo"
  );
  targets.forEach((el) => el.classList.add("reveal"));
  const revealObserver = new IntersectionObserver(
    (entries, obs) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    }),
    { threshold: 0.1 }
  );
  targets.forEach((el) => revealObserver.observe(el));

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
