import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ZoomIn, X, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { certificatesData } from '../../data/portfolioData';
import type { CertificateCategory } from '../../types/portfolio';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

export const CertificatesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CertificateCategory>('all');
  const [activeCertIndex, setActiveCertIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

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

  // Close lightbox on Escape key & Arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeCertIndex === null) return;

      if (e.key === 'Escape') {
        setActiveCertIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveCertIndex((prev) => (prev !== null && prev < filteredCerts.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft') {
        setActiveCertIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredCerts.length - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCertIndex, filteredCerts.length]);

  // Prevent body scroll when lightbox is open
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
    <section
      id="certificates"
      className={`relative z-20 w-full select-none py-20 sm:py-28 overflow-hidden transition-colors duration-500 ${
        isNight ? 'bg-[#090f0c] text-[#f5f7f4]' : 'bg-[#fbfaf6] text-[#151e17]'
      }`}
    >
      {/* Decorative Warm Terraced Background Shapes */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className={`absolute -top-32 right-10 w-96 h-96 rounded-full blur-2xl ${
          isNight
            ? 'bg-[radial-gradient(ellipse_at_center,_rgba(45,106,79,0.18)_0%,_transparent_70%)]'
            : 'bg-[radial-gradient(ellipse_at_center,_rgba(226,238,221,0.6)_0%,_transparent_70%)]'
        }`} />
        <div className={`absolute -bottom-32 left-10 w-96 h-96 rounded-full blur-2xl ${
          isNight
            ? 'bg-[radial-gradient(ellipse_at_center,_rgba(22,56,40,0.15)_0%,_transparent_70%)]'
            : 'bg-[radial-gradient(ellipse_at_center,_rgba(235,242,236,0.7)_0%,_transparent_70%)]'
        }`} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 space-y-8 sm:space-y-12">
        {/* Section Header */}
        <div className={`space-y-4 pb-6 sm:pb-8 border-b transition-colors duration-500 ${
          isNight ? 'border-emerald-500/20' : 'border-[#e4ded5]'
        }`}>
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-mono font-bold tracking-[0.28em] uppercase ${
                isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'
              }`}
            >
              05 // KREDENSIAL &amp; LISENSI RESMI
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${isNight ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] ${isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]'}`}>
                Sertifikasi &amp; Lisensi Resmi
              </h2>
              <p className={`text-sm sm:text-base font-normal mt-2 max-w-2xl leading-relaxed ${isNight ? 'text-[#95a499]' : 'text-[#48564c]'}`}>
                32 sertifikat terverifikasi dari Dicoding (Kampus Merdeka Kemendikbudristek), Luarsekolah, RevoU, Kementerian, dan Kedinasan Pemerintah.
              </p>
            </div>

            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-colors duration-500 shrink-0 self-start lg:self-auto ${
              isNight
                ? 'bg-[#142118] border-emerald-500/30 text-[#f5f7f4] shadow-sm'
                : 'bg-white border-[#e4ded5] text-[#151e17] shadow-sm'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span className={`text-xs font-mono font-semibold ${isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]'}`}>
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
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer border shrink-0 ${
                selectedCategory === cat.id
                  ? isNight
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                    : 'bg-[#1b4332] text-white border-[#1b4332] shadow-sm'
                  : isNight
                  ? 'bg-[#142118] text-[#95a499] border-emerald-500/20 hover:border-emerald-500/40 hover:text-white'
                  : 'bg-white text-[#151e17] border-[#e4ded5] hover:border-[#1b4332]/40 hover:bg-[#fcfbf9]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  selectedCategory === cat.id
                    ? 'bg-white/20 text-white'
                    : isNight
                    ? 'bg-[#1a2a20] text-[#80ed99] border border-emerald-500/25'
                    : 'bg-[#ebf2ec] text-[#1b4332] border border-emerald-200'
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
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              onClick={() => setActiveCertIndex(idx)}
              className={`group cursor-pointer rounded-2xl border overflow-hidden flex flex-col justify-between transition-all ${
                isNight
                  ? 'bg-[#111a14] border-emerald-500/20 shadow-sm hover:shadow-md hover:border-emerald-500/40'
                  : 'bg-white border-[#e4ded5] shadow-sm hover:shadow-md hover:border-[#1b4332]/40'
              }`}
            >
              {/* Image Preview Container */}
              <div className={`relative aspect-[4/3] w-full border-b overflow-hidden ${
                isNight ? 'bg-[#16221a] border-emerald-500/20' : 'bg-[#f4f1ea] border-[#e4ded5]'
              }`}>
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#0f172a]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                  <div className="px-3 py-1.5 rounded-full bg-white/90 text-[#151e17] text-xs font-mono font-semibold shadow-sm flex items-center gap-1.5">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Perbesar</span>
                  </div>
                </div>

                {/* Badge Category */}
                <div className="absolute top-2.5 left-2.5">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border shadow-xs backdrop-blur-sm ${
                    isNight
                      ? 'bg-[#142118]/90 text-[#80ed99] border-emerald-500/20'
                      : 'bg-white/90 text-[#1b4332] border-[#e4ded5]'
                  }`}>
                    {cert.category}
                  </span>
                </div>

                {cert.year && (
                  <div className="absolute top-2.5 right-2.5">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shadow-xs backdrop-blur-sm ${
                      isNight
                        ? 'bg-[#142118]/90 text-[#80ed99] border-emerald-500/20'
                        : 'bg-white/90 text-[#151e17] border-[#e4ded5]'
                    }`}>
                      {cert.year}
                    </span>
                  </div>
                )}
              </div>

              {/* Caption & Metadata */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className={`text-sm font-bold leading-snug line-clamp-2 transition-colors ${
                    isNight ? 'text-[#f5f7f4] group-hover:text-[#80ed99]' : 'text-[#151e17] group-hover:text-[#1b4332]'
                  }`}>
                    {cert.title}
                  </h4>
                  <p className={`text-xs font-mono font-medium mt-1 line-clamp-1 ${
                    isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'
                  }`}>
                    {cert.issuer}
                  </p>
                </div>

                <div className={`pt-2 border-t flex items-center justify-between text-[11px] font-mono ${
                  isNight ? 'border-emerald-500/20 text-[#95a499]' : 'border-[#e4ded5] text-[#64748b]'
                }`}>
                  <span>Terverifikasi</span>
                  <ExternalLink className={`w-3 h-3 ${isNight ? 'text-emerald-400' : 'text-[#1b4332]'}`} />
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
              className={`px-6 py-3 rounded-xl border text-xs font-mono font-semibold transition-all cursor-pointer shadow-sm hover:-translate-y-0.5 active:translate-y-0 ${
                isNight
                  ? 'bg-[#142118] hover:bg-[#192b1f] border-emerald-500/30 text-[#f5f7f4] hover:border-emerald-400/50'
                  : 'bg-white hover:bg-[#f4f1ea] border-[#e4ded5] text-[#151e17] hover:border-[#1b4332]/40'
              }`}
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
            className="fixed inset-0 z-50 bg-[#08120b]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-4xl w-full rounded-[24px] sm:rounded-[32px] border overflow-hidden shadow-2xl flex flex-col ${
                isNight ? 'bg-[#142118] border-emerald-500/40 text-[#f8fafc]' : 'bg-white border border-[#e4ded5] text-[#151e17]'
              }`}
            >
              {/* Modal Header */}
              <div className={`p-4 sm:p-5 flex items-center justify-between border-b ${
                isNight ? 'border-emerald-500/20' : 'border-[#e4ded5]'
              }`}>
                <div>
                  <h3 className={`text-base sm:text-lg font-black line-clamp-1 ${isNight ? 'text-[#f8fafc]' : 'text-[#151e17]'}`}>
                    {activeCert.title}
                  </h3>
                  <p className={`text-xs font-mono font-bold ${isNight ? 'text-[#80ed99]' : 'text-[#2d6a4f]'}`}>
                    {activeCert.issuer} {activeCert.year && `• ${activeCert.year}`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveCertIndex(null)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    isNight ? 'bg-[#1a2a20] border-emerald-500/30 text-stone-300 hover:text-white' : 'bg-[#f4f1ea] hover:bg-[#e4ded5] border-[#e4ded5] text-[#151e17]'
                  }`}
                  aria-label="Tutup pratinjau"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Large Image View */}
              <div className="relative bg-black/60 flex items-center justify-center max-h-[70vh] overflow-hidden p-2">
                <img
                  src={activeCert.imageUrl}
                  alt={activeCert.title}
                  className="max-h-[66vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
                />

                {/* Prev / Next Navigation Buttons */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCertIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredCerts.length - 1));
                  }}
                  className="absolute left-4 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all cursor-pointer"
                  aria-label="Sertifikat Sebelumnya"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCertIndex((prev) => (prev !== null && prev < filteredCerts.length - 1 ? prev + 1 : 0));
                  }}
                  className="absolute right-4 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all cursor-pointer"
                  aria-label="Sertifikat Selanjutnya"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Footer */}
              <div className={`p-4 flex items-center justify-between border-t text-xs font-mono ${
                isNight ? 'border-emerald-500/20 text-stone-300' : 'border-[#0f172a]/20 text-[#475569]'
              }`}>
                <span>
                  {activeCertIndex + 1} dari {filteredCerts.length}
                </span>

                <a
                  href={activeCert.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2d6a4f] text-white font-bold hover:bg-[#1b4332] transition-colors"
                >
                  <span>Buka Resolusi Penuh</span>
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
