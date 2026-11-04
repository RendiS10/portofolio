import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ChevronLeft, ChevronRight, X, ExternalLink, ZoomIn, CheckCircle2 } from 'lucide-react';
import type { CertificateCategory } from '../../types/portfolio';
import { certificatesData } from '../../data/portfolioData';

export const CertificatesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CertificateCategory>('all');
  const [activeCertIndex, setActiveCertIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const categories: { id: CertificateCategory; label: string; count: number }[] = [
    { id: 'all', label: 'Semua', count: certificatesData.length },
    {
      id: 'penghargaan',
      label: 'Penghargaan & Magang',
      count: certificatesData.filter((c) => c.category === 'penghargaan').length
    },
    {
      id: 'kelas',
      label: 'Kelas & Spesialisasi',
      count: certificatesData.filter((c) => c.category === 'kelas').length
    },
    {
      id: 'webinar',
      label: 'Webinar & Event',
      count: certificatesData.filter((c) => c.category === 'webinar').length
    },
    {
      id: 'organisasi',
      label: 'Organisasi & Mentor',
      count: certificatesData.filter((c) => c.category === 'organisasi').length
    }
  ];

  const filteredCerts =
    selectedCategory === 'all'
      ? certificatesData
      : certificatesData.filter((c) => c.category === selectedCategory);

  const visibleCerts = filteredCerts.slice(0, visibleCount);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeCertIndex === null) return;
      if (e.key === 'Escape') setActiveCertIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveCertIndex((prev) => (prev !== null ? (prev + 1) % filteredCerts.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setActiveCertIndex((prev) =>
          prev !== null ? (prev - 1 + filteredCerts.length) % filteredCerts.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCertIndex, filteredCerts.length]);

  // Lock body scroll when Lightbox open
  useEffect(() => {
    if (activeCertIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeCertIndex]);

  const activeCert = activeCertIndex !== null ? filteredCerts[activeCertIndex] : null;

  return (
    <section id="certificates" className="relative z-20 w-full bg-[#f5f3ec] select-none py-20 sm:py-28 overflow-hidden text-[#0f172a]">
      {/* Decorative Warm Terraced Background Shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 right-10 w-96 h-96 rounded-full bg-[radial-gradient(ellipse_at_center,_#fde047_0%,_transparent_70%)] blur-2xl" />
        <div className="absolute -bottom-32 left-10 w-96 h-96 rounded-full bg-[radial-gradient(ellipse_at_center,_#52b788_0%,_transparent_70%)] blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className="space-y-4 pb-6 sm:pb-8 border-b-2 border-[#0f172a]/15">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#fde047] text-[#0f172a] text-xs font-mono font-black border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] w-fit">
            <Award className="w-3.5 h-3.5" />
            <span>05 // KREDENSIAL &amp; SERTIFIKASI</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.08]">
                Sertifikasi &amp; Lisensi Resmi
              </h2>
              <p className="text-sm sm:text-base font-medium text-[#475569] mt-2 max-w-2xl leading-relaxed">
                32 sertifikat terverifikasi dari Dicoding (Kampus Merdeka Kemendikbudristek), Luarsekolah, RevoU, Kementerian, dan Kedinasan.
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#fffdf5] border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a] shrink-0 self-start lg:self-auto">
              <CheckCircle2 className="w-4 h-4 text-[#15803d]" />
              <span className="text-xs font-mono font-bold text-[#0f172a]">
                {certificatesData.length} Sertifikat Terdaftar
              </span>
            </div>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedCategory(cat.id);
                setVisibleCount(8);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold border-2 border-[#0f172a] transition-all shrink-0 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#2d6a4f] text-white shadow-[3px_3px_0px_#0f172a] -translate-y-0.5'
                  : 'bg-[#fffdf5] hover:bg-[#edf2eb] text-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedCategory === cat.id
                    ? 'bg-white/30 text-white'
                    : 'bg-[#edf2eb] text-[#0f172a] border border-[#0f172a]/30'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {visibleCerts.map((cert, idx) => (
            <motion.div
              key={cert.id}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              onClick={() => setActiveCertIndex(idx)}
              className="group cursor-pointer rounded-2xl bg-[#fffdf5] border-2 border-[#0f172a] shadow-[4px_4px_0px_#0f172a] hover:shadow-[6px_6px_0px_#0f172a] overflow-hidden flex flex-col justify-between transition-all"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[4/3] w-full bg-[#edf2eb] border-b-2 border-[#0f172a] overflow-hidden">
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#0f172a]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                  <div className="px-3 py-1.5 rounded-xl bg-[#fde047] border-2 border-[#0f172a] text-[#0f172a] text-xs font-mono font-bold shadow-[2px_2px_0px_#0f172a] flex items-center gap-1.5">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Perbesar</span>
                  </div>
                </div>

                {/* Badge Category */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-md bg-[#fffdf5]/95 text-[#0f172a] border border-[#0f172a] shadow-[1.5px_1.5px_0px_#0f172a]">
                    {cert.category}
                  </span>
                </div>

                {cert.year && (
                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-md bg-[#fde047] text-[#0f172a] border border-[#0f172a] shadow-[1.5px_1.5px_0px_#0f172a]">
                      {cert.year}
                    </span>
                  </div>
                )}
              </div>

              {/* Caption & Metadata */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="text-sm font-black text-[#0f172a] leading-snug line-clamp-2 group-hover:text-[#2d6a4f] transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-xs font-mono font-bold text-[#2d6a4f] mt-1 line-clamp-1">
                    {cert.issuer}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#d8dfd5] flex items-center justify-between text-[11px] font-mono text-[#475569]">
                  <span>Terverifikasi</span>
                  <ExternalLink className="w-3 h-3 text-[#2d6a4f] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expand / Collapse Button */}
        {filteredCerts.length > 8 && (
          <div className="flex justify-center pt-4">
            <button
              type="button"
              onClick={() => {
                if (visibleCount >= filteredCerts.length) {
                  setVisibleCount(8);
                } else {
                  setVisibleCount(filteredCerts.length);
                }
              }}
              className="px-6 py-3 rounded-2xl bg-[#fffdf5] hover:bg-[#edf2eb] border-2 border-[#0f172a] text-xs font-mono font-black text-[#0f172a] shadow-[4px_4px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              {visibleCount >= filteredCerts.length
                ? 'Tampilkan Lebih Sedikit'
                : `Lihat Semua (${filteredCerts.length} Sertifikat)`}
            </button>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeCert && activeCertIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCertIndex(null)}
            className="fixed inset-0 z-50 bg-[#0f172a]/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#fffdf5] border-3 border-[#0f172a] rounded-[28px] sm:rounded-[36px] shadow-[12px_12px_0px_#0f172a] overflow-hidden flex flex-col max-h-[92vh]"
            >
              {/* Lightbox Header Bar */}
              <div className="px-5 py-3.5 bg-[#edf2eb] border-b-2 border-[#0f172a] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#f87171] border border-[#0f172a]" />
                  <span className="w-3 h-3 rounded-full bg-[#fde047] border border-[#0f172a]" />
                  <span className="w-3 h-3 rounded-full bg-[#4ade80] border border-[#0f172a]" />
                  <span className="ml-2 text-xs font-mono font-black text-[#0f172a]">
                    SERTIFIKAT {activeCertIndex + 1} / {filteredCerts.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveCertIndex(null)}
                  className="p-1.5 rounded-xl bg-[#fffdf5] hover:bg-[#fee2e2] text-[#0f172a] border border-[#0f172a] transition-colors cursor-pointer"
                  aria-label="Tutup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Lightbox Body with Image */}
              <div className="relative flex-1 min-h-[300px] sm:min-h-[460px] bg-[#1a1715] flex items-center justify-center p-3 sm:p-6 overflow-hidden">
                <img
                  src={activeCert.imageUrl}
                  alt={activeCert.title}
                  className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-2xl"
                />

                {/* Left / Prev Arrow */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCertIndex((prev) =>
                      prev !== null ? (prev - 1 + filteredCerts.length) % filteredCerts.length : 0
                    );
                  }}
                  className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-2xl bg-[#fffdf5] border-2 border-[#0f172a] text-[#0f172a] shadow-[3px_3px_0px_#0f172a] hover:bg-[#fde047] transition-all cursor-pointer active:translate-y-0"
                  aria-label="Sertifikat sebelumnya"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right / Next Arrow */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCertIndex((prev) =>
                      prev !== null ? (prev + 1) % filteredCerts.length : 0
                    );
                  }}
                  className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-2xl bg-[#fffdf5] border-2 border-[#0f172a] text-[#0f172a] shadow-[3px_3px_0px_#0f172a] hover:bg-[#fde047] transition-all cursor-pointer active:translate-y-0"
                  aria-label="Sertifikat selanjutnya"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Footer Caption */}
              <div className="p-4 sm:p-6 bg-[#fffdf5] border-t-2 border-[#0f172a] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#0f172a]">
                    {activeCert.title}
                  </h3>
                  <p className="text-xs font-mono font-bold text-[#2d6a4f] mt-0.5">
                    {activeCert.issuer} {activeCert.year ? `• Tahun ${activeCert.year}` : ''}
                  </p>
                </div>

                <a
                  href={activeCert.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#fde047] hover:bg-[#facc15] text-[#0f172a] text-xs font-mono font-black border-2 border-[#0f172a] shadow-[2.5px_2.5px_0px_#0f172a] cursor-pointer"
                >
                  <span>Buka File Asli</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
