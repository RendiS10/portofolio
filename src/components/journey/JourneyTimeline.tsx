import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { experienceData } from '../../data/portfolioData';
import type { ExperienceItem } from '../../types/portfolio';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';
import { HeadingAccent } from '../common/HeadingAccent';

// Pekerjaan terbaru di atas, lalu pendidikan dan kegiatan lain. Data tidak diurutkan
// berdasarkan tanggal karena periode ditulis sebagai teks bebas ("2023 - 2024").
const DISPLAY_ORDER = [
  'exp-holycat',
  'exp-abbygail',
  'exp-ciptabintar',
  'edu-stmik',
  'exp-msib',
  'exp-csa-mentor',
  'exp-matlaulanwar'
];

const orderIndex = (id: string): number => {
  const index = DISPLAY_ORDER.indexOf(id);
  return index === -1 ? DISPLAY_ORDER.length : index;
};

export const JourneyTimeline: React.FC = () => {
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLOListElement | null>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  const entries: ExperienceItem[] = [...experienceData].sort((a, b) => orderIndex(a.id) - orderIndex(b.id));

  const muted = isNight ? 'text-[#95a499]' : 'text-[#48564c]';
  const accent = isNight ? 'text-[#80ed99]' : 'text-[#1b4332]';
  const divider = isNight ? 'border-[#1f2d24]' : 'border-[#e4ded5]';
  const lineTrack = isNight ? 'bg-[#1f2d24]' : 'bg-[#e4ded5]';
  const lineFill = isNight ? 'bg-[#80ed99]' : 'bg-[#1b4332]';
  const dotRing = isNight ? 'border-[#80ed99] bg-[#090f0c]' : 'border-[#1b4332] bg-[#fbfaf6]';

  return (
    <section
      id="journey"
      className={`relative z-20 w-full select-none py-20 sm:py-28 transition-colors duration-500 ${
        isNight ? 'bg-[#090f0c] text-[#f5f7f4]' : 'bg-[#fbfaf6] text-[#151e17]'
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-10">
        <div className={`pb-8 sm:pb-10 border-b ${divider}`}>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.08]">
            Pengalaman &amp; Pendidikan
          </h2>
          <HeadingAccent />
          <p className={`mt-3 text-sm sm:text-base leading-relaxed max-w-2xl ${muted}`}>
            Pengalaman kerja, magang, dan pendidikan formal saya.
          </p>
        </div>

        <ol ref={listRef} className="relative mt-8 sm:mt-10">
          <span aria-hidden="true" className={`absolute left-[4px] top-0 bottom-0 w-[2px] ${lineTrack}`} />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: reduceMotion ? 1 : lineProgress, transformOrigin: 'top' }}
            className={`absolute left-[4px] top-0 bottom-0 w-[2px] ${lineFill}`}
          />
          {entries.map((item, idx) => (
            <motion.li
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: Math.min(idx, 3) * 0.05 }}
              className={`relative pl-7 sm:pl-9 py-7 sm:py-9 ${idx > 0 ? `border-t ${divider}` : ''}`}
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-[2.3rem] sm:top-[2.9rem] block h-[10px] w-[10px] rounded-full border-2 ${dotRing}`}
              >
                <motion.span
                  initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className={`absolute inset-0 rounded-full ${lineFill}`}
                />
              </span>

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6">
                <h3 className="text-lg sm:text-2xl font-bold tracking-tight">{item.role}</h3>
                <span className={`text-sm font-medium shrink-0 ${muted}`}>{item.period}</span>
              </div>

              <p className={`mt-1 text-sm sm:text-base font-semibold ${accent}`}>
                {item.organization}
                {item.badge && <span className={`font-normal ${muted}`}> · {item.badge}</span>}
              </p>

              <p className={`mt-3 text-sm leading-relaxed max-w-3xl ${muted}`}>{item.description}</p>

              {item.highlights && item.highlights.length > 0 && (
                <ul
                  className={`mt-3 space-y-1.5 text-sm leading-relaxed list-disc pl-5 max-w-3xl ${
                    isNight ? 'marker:text-[#80ed99]' : 'marker:text-[#1b4332]'
                  }`}
                >
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              )}

              {item.tech.length > 0 && (
                <p className={`mt-4 text-xs sm:text-sm ${muted}`}>{item.tech.join(' · ')}</p>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};
