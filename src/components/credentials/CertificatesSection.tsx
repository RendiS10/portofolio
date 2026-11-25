import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { certificatesData } from '../../data/portfolioData';
import type { CertificateCategory } from '../../types/portfolio';
import { Reveal } from '../common/Reveal';
import { HeadingAccent } from '../common/HeadingAccent';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

const INITIAL_VISIBLE = 8;
const MAX_STAGGER_STEPS = 7;
const STAGGER_STEP_S = 0.04;

// Sertifikat paling relevan untuk peran Full Stack tampil lebih dulu; sisanya mengikuti urutan data.
const PRIORITY_IDS = [
  'cert-msib',
  'cert-fe-expert',
  'cert-web-react',
  'cert-fund-react',
  'cert-backend-pemula',
  'cert-git-github',
  'cert-aws-cloud',
  'cert-belajar-bekerja'
];

const priorityOf = (id: string): number => {
  const index = PRIORITY_IDS.indexOf(id);
  return index === -1 ? PRIORITY_IDS.length : index;
};

const CATEGORIES: { id: CertificateCategory; label: string }[] = [
  { id: 'all', label: 'Semua' },
  { id: 'penghargaan', label: 'Penghargaan & Magang' },
  { id: 'kelas', label: 'Kelas & Spesialisasi' },
  { id: 'webinar', label: 'Webinar & Event' },
  { id: 'organisasi', label: 'Organisasi & Mentor' }
];

export const CertificatesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CertificateCategory>('all');
  const [activeCertIndex, setActiveCertIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE);

  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  const sortedCerts = useMemo(
    () => [...certificatesData].sort((a, b) => priorityOf(a.id) - priorityOf(b.id)),
    []
  );

  const filteredCerts =
    selectedCategory === 'all' ? sortedCerts : sortedCerts.filter((c) => c.category === selectedCategory);

  const visibleCerts = filteredCerts.slice(0, visibleCount);

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

  useEffect(() => {
    document.body.style.overflow = activeCertIndex !== null ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeCertIndex]);

  const activeCert = activeCertIndex !== null ? filteredCerts[activeCertIndex] : null;

  const muted = isNight ? 'text-[#95a499]' : 'text-[#48564c]';
  const accent = isNight ? 'text-[#80ed99]' : 'text-[#1b4332]';
  const divider = isNight ? 'border-[#1f2d24]' : 'border-[#e4ded5]';

  return (
    <section
      id="certificates"
      className={`relative z-20 w-full select-none py-20 sm:py-28 transition-colors duration-500 ${
        isNight ? 'bg-[#090f0c] text-[#f5f7f4]' : 'bg-[#fbfaf6] text-[#151e17]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-8 sm:space-y-10">
        <Reveal className={`pb-6 sm:pb-8 border-b ${divider}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08]">
            Sertifikat &amp; Pelatihan
          </h2>
          <HeadingAccent />
          <p className={`mt-3 text-sm sm:text-base leading-relaxed max-w-2xl ${muted}`}>
            Sertifikat kursus dan pelatihan dari Dicoding, Luarsekolah, RevoU, dan penyelenggara lain.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1" role="group" aria-label="Filter kategori">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setVisibleCount(INITIAL_VISIBLE);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer border shrink-0 focus:outline-none focus-visible:ring-2 ${
                  isNight ? 'focus-visible:ring-[#80ed99]' : 'focus-visible:ring-[#1b4332]'
                } ${
                  active
                    ? isNight
                      ? 'bg-[#80ed99] border-[#80ed99] text-[#090f0c]'
                      : 'bg-[#1b4332] border-[#1b4332] text-[#fbfaf6]'
                    : isNight
                    ? 'border-[#1f2d24] text-[#95a499] hover:text-[#f5f7f4] hover:border-[#80ed99]/50'
                    : 'border-[#e4ded5] text-[#48564c] hover:text-[#151e17] hover:border-[#1b4332]/50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {visibleCerts.map((cert, idx) => (
            <Reveal key={cert.id} delay={Math.min(idx, MAX_STAGGER_STEPS) * STAGGER_STEP_S} className="grid">
            <button
              type="button"
              onClick={() => setActiveCertIndex(idx)}
              aria-label={`Perbesar sertifikat ${cert.title}`}
              className={`rs-lift rs-lift-shadow group text-left rounded-xl border overflow-hidden flex flex-col cursor-pointer focus:outline-none focus-visible:ring-2 ${
                isNight
                  ? 'bg-[#111a14] border-[#1f2d24] hover:border-[#80ed99]/50 focus-visible:ring-[#80ed99]'
                  : 'bg-white border-[#e4ded5] hover:border-[#1b4332]/60 focus-visible:ring-[#1b4332]'
              }`}
            >
              <div className={`aspect-[4/3] w-full border-b overflow-hidden ${
                isNight ? 'bg-[#16221a] border-[#1f2d24]' : 'bg-[#f4f1ea] border-[#e4ded5]'
              }`}>
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <div className="p-4 space-y-1">
                <h3 className="text-sm font-bold leading-snug line-clamp-2">{cert.title}</h3>
                <p className={`text-xs ${muted}`}>
                  {cert.issuer}
                  {cert.year && ` · ${cert.year}`}
                </p>
              </div>
            </button>
            </Reveal>
          ))}
        </div>

        {filteredCerts.length > INITIAL_VISIBLE && (
          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() =>
                setVisibleCount(visibleCount >= filteredCerts.length ? INITIAL_VISIBLE : filteredCerts.length)
              }
              className={`px-6 py-2.5 rounded-lg border text-sm font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 ${
                isNight
                  ? 'border-[#1f2d24] text-[#f5f7f4] hover:border-[#80ed99]/50 focus-visible:ring-[#80ed99]'
                  : 'border-[#e4ded5] text-[#151e17] hover:border-[#1b4332]/50 focus-visible:ring-[#1b4332]'
              }`}
            >
              {visibleCount >= filteredCerts.length
                ? 'Tampilkan lebih sedikit'
                : `Lihat semua (${filteredCerts.length})`}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {activeCert && activeCertIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={activeCert.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCertIndex(null)}
            className="fixed inset-0 z-50 bg-[#08120b]/90 flex items-center justify-center p-3 sm:p-6"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`relative max-w-4xl w-full rounded-2xl border overflow-hidden flex flex-col ${
                isNight ? 'bg-[#111a14] border-[#1f2d24] text-[#f5f7f4]' : 'bg-white border-[#e4ded5] text-[#151e17]'
              }`}
            >
              <div className={`p-4 sm:p-5 flex items-center justify-between gap-4 border-b ${divider}`}>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold line-clamp-1">{activeCert.title}</h3>
                  <p className={`text-xs sm:text-sm ${accent}`}>
                    {activeCert.issuer}
                    {activeCert.year && ` · ${activeCert.year}`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveCertIndex(null)}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer shrink-0 ${
                    isNight
                      ? 'border-[#1f2d24] text-[#f5f7f4] hover:bg-white/10'
                      : 'border-[#e4ded5] text-[#151e17] hover:bg-[#f4f1ea]'
                  }`}
                  aria-label="Tutup pratinjau"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative bg-black/60 flex items-center justify-center max-h-[70vh] overflow-hidden p-2">
                <img
                  src={activeCert.imageUrl}
                  alt={activeCert.title}
                  className="max-h-[66vh] w-auto max-w-full object-contain rounded-lg"
                />

                <button
                  type="button"
                  onClick={() =>
                    setActiveCertIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredCerts.length - 1))
                  }
                  className="absolute left-4 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
                  aria-label="Sertifikat sebelumnya"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveCertIndex((prev) => (prev !== null && prev < filteredCerts.length - 1 ? prev + 1 : 0))
                  }
                  className="absolute right-4 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors cursor-pointer"
                  aria-label="Sertifikat selanjutnya"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className={`p-4 flex items-center justify-between border-t text-sm ${divider} ${muted}`}>
                <span>
                  {activeCertIndex + 1} dari {filteredCerts.length}
                </span>

                <a
                  href={activeCert.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                    isNight
                      ? 'bg-[#80ed99] text-[#090f0c] hover:bg-[#9af2ae]'
                      : 'bg-[#1b4332] text-[#fbfaf6] hover:bg-[#153427]'
                  }`}
                >
                  <span>Buka resolusi penuh</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
