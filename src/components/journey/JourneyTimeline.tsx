import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  GraduationCap,
  Layers,
  Rocket,
  Landmark,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { experienceData } from '../../data/portfolioData';
import type { ExperienceItem } from '../../types/portfolio';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

const categoryConfig: Record<
  string,
  {
    icon: React.FC<{ className?: string }>;
    nodeBg: string;
    nodeText: string;
    tagBg: string;
    tagText: string;
    tagBorder: string;
  }
> = {
  education: {
    icon: GraduationCap,
    nodeBg: 'bg-[#ebf2ec] dark:bg-[#142118]',
    nodeText: 'text-[#1b4332] dark:text-[#80ed99]',
    tagBg: 'bg-[#f4f7f4] dark:bg-[#101b13]',
    tagText: 'text-[#1b4332] dark:text-[#a3b899]',
    tagBorder: 'border-[#bed8cb] dark:border-emerald-500/20'
  },
  government: {
    icon: Landmark,
    nodeBg: 'bg-[#e2ede7] dark:bg-[#13241b]',
    nodeText: 'text-[#164e33] dark:text-[#6ee7b7]',
    tagBg: 'bg-[#eef5f1] dark:bg-[#0f1d16]',
    tagText: 'text-[#164e33] dark:text-[#6ee7b7]',
    tagBorder: 'border-[#bed8cb] dark:border-emerald-500/25'
  },
  project: {
    icon: Rocket,
    nodeBg: 'bg-[#d8eedf] dark:bg-[#152a1e]',
    nodeText: 'text-[#1b4332] dark:text-[#34d399]',
    tagBg: 'bg-[#edf7f1] dark:bg-[#102017]',
    tagText: 'text-[#1b4332] dark:text-[#34d399]',
    tagBorder: 'border-[#b5dec5] dark:border-emerald-500/30'
  },
  bootcamp: {
    icon: Layers,
    nodeBg: 'bg-[#e2ede7] dark:bg-[#13241b]',
    nodeText: 'text-[#164e33] dark:text-[#6ee7b7]',
    tagBg: 'bg-[#eef5f1] dark:bg-[#0f1d16]',
    tagText: 'text-[#164e33] dark:text-[#6ee7b7]',
    tagBorder: 'border-[#bed8cb] dark:border-emerald-500/25'
  },
  security: {
    icon: Landmark,
    nodeBg: 'bg-[#e2ede7] dark:bg-[#13241b]',
    nodeText: 'text-[#164e33] dark:text-[#6ee7b7]',
    tagBg: 'bg-[#eef5f1] dark:bg-[#0f1d16]',
    tagText: 'text-[#164e33] dark:text-[#6ee7b7]',
    tagBorder: 'border-[#bed8cb] dark:border-emerald-500/25'
  }
};

export const JourneyTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  // scroll progress tracker
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 80%']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001
  });

  return (
    <section
      id="journey"
      ref={containerRef}
      className={`relative z-20 -mt-1 w-full select-none py-24 sm:py-28 overflow-hidden transition-colors duration-500 ${
        isNight ? 'bg-[#090f0c] text-[#f5f7f4]' : 'bg-[#fbfaf6] text-[#151e17]'
      }`}
    >
      {/* subtle background pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.04]">
        <svg viewBox="0 0 1440 900" fill="none" className="w-full h-full" preserveAspectRatio="none">
          <path d="M-100,200 Q400,340 900,180 T1600,260" stroke="currentColor" strokeWidth="1.5" />
          <path d="M-100,500 Q500,640 1000,420 T1600,540" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-10 space-y-8 sm:space-y-12">
        {/* header dock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={`p-6 sm:p-8 rounded-3xl border transition-colors duration-500 space-y-3 ${
            isNight
              ? 'bg-[#111a14] border-emerald-500/20 shadow-xl'
              : 'bg-white border-[#e4ded5] shadow-lg shadow-stone-900/5'
          }`}
        >
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-mono font-bold tracking-[0.28em] uppercase ${
                isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'
              }`}
            >
              04 // REKAM JEJAK &amp; PENGALAMAN KERJA
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${isNight ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
          </div>

          <div className="space-y-1.5">
            <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] ${isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]'}`}>
              Milestone Karier &amp; Pendidikan
            </h2>
            <p className={`text-xs sm:text-base font-normal max-w-2xl leading-relaxed ${isNight ? 'text-[#95a499]' : 'text-[#48564c]'}`}>
              Pendidikan formal Sarjana Komputer (IPK 3.70), perancangan sistem e-commerce produksi, digitalisasi instansi pemerintah, dan spesialisasi full-stack web serta mobile Flutter.
            </p>
          </div>
        </motion.div>

        {/* timeline track */}
        <div className="relative pl-10 sm:pl-20 space-y-7 sm:space-y-10">
          {/* background track */}
          <div className="absolute top-5 sm:top-6 bottom-5 sm:bottom-6 left-3.5 sm:left-7 -translate-x-1/2 w-1.5 sm:w-2 bg-[#e4ded5] dark:bg-emerald-950/60 rounded-full overflow-hidden z-0">
            {/* vertical progress */}
            <motion.div
              style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
              className="w-full h-full bg-gradient-to-b from-[#1b4332] via-[#2d6a4f] to-[#52b788] dark:from-[#2d6a4f] dark:via-[#52b788] dark:to-[#80ed99] rounded-full"
            />
          </div>

          {experienceData.map((item: ExperienceItem, idx: number) => {
            const config = categoryConfig[item.category || 'education'] || categoryConfig.education;
            const Icon = config.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.08,
                  type: 'spring',
                  stiffness: 260,
                  damping: 24
                }}
                className="relative group"
              >
                {/* timeline node icon */}
                <div
                  className={`absolute left-[-26px] sm:left-[-52px] -translate-x-1/2 top-4 sm:top-6 w-8 h-8 sm:w-11 sm:h-11 rounded-full border ${config.nodeBg} ${config.nodeText} border-[#d5ded8] dark:border-emerald-500/30 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform z-10`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* milestone card */}
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className={`p-5 sm:p-8 rounded-2xl sm:rounded-3xl border transition-all duration-300 space-y-3 sm:space-y-4 cursor-default ${
                    isNight
                      ? 'bg-[#111a14] border-emerald-500/20 shadow-xl text-[#f5f7f4] hover:border-emerald-500/35'
                      : 'bg-white border-[#e4ded5] shadow-lg shadow-stone-900/5 text-[#151e17] hover:border-[#1b4332]/30'
                  }`}
                >
                  {/* card top badges */}
                  <div className={`flex flex-wrap items-center justify-between gap-2 sm:gap-3 pb-3 border-b ${
                    isNight ? 'border-emerald-500/20' : 'border-[#e4ded5]'
                  }`}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[10px] sm:text-xs font-mono font-bold uppercase px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border ${config.tagBg} ${config.tagBorder} ${config.tagText}`}
                      >
                        {item.badge || item.category}
                      </span>
                    </div>

                    <div className={`flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border text-[10px] sm:text-xs font-mono font-semibold ${
                      isNight
                        ? 'bg-[#142018] border-emerald-500/20 text-[#c5d5c8]'
                        : 'bg-[#f6f4ee] border-[#e4ded5] text-[#2d4033]'
                    }`}>
                      <Calendar className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isNight ? 'text-[#80ed99]' : 'text-[#2d6a4f]'}`} />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* role and organization */}
                  <div>
                    <h3 className={`text-lg sm:text-2xl font-bold tracking-tight transition-colors ${
                      isNight ? 'text-[#f5f7f4] group-hover:text-[#80ed99]' : 'text-[#151e17] group-hover:text-[#1b4332]'
                    }`}>
                      {item.role}
                    </h3>
                    <div className={`text-xs sm:text-sm font-mono font-semibold mt-0.5 sm:mt-1 ${
                      isNight ? 'text-[#80ed99]' : 'text-[#2d6a4f]'
                    }`}>
                      {item.organization}
                    </div>
                  </div>

                  {/* narrative description */}
                  <p className={`text-xs sm:text-sm font-normal leading-relaxed ${
                    isNight ? 'text-[#95a499]' : 'text-[#48564c]'
                  }`}>
                    {item.description}
                  </p>

                  {/* key highlights */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border space-y-1.5 sm:space-y-2 ${
                      isNight ? 'bg-[#16221a] border-emerald-500/20' : 'bg-[#fcfbf9] border-[#e4ded5]'
                    }`}>
                      <div className={`text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider ${
                        isNight ? 'text-[#a3b899]' : 'text-[#1b4332]'
                      }`}>
                        Poin Kunci &amp; Bukti Kerja
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                        {item.highlights.map((hl, hIdx) => (
                          <div
                            key={hIdx}
                            className={`flex items-start gap-1.5 sm:gap-2 text-xs font-medium leading-tight ${
                              isNight ? 'text-[#c2ceb9]' : 'text-[#151e17]'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* skills and tech tags */}
                  <div className="pt-1 sm:pt-2 flex flex-wrap gap-1.5 sm:gap-2">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className={`text-[10px] sm:text-xs font-mono font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg border transition-colors ${
                          isNight
                            ? 'bg-[#17231c] text-[#f5f7f4] border-emerald-500/20'
                            : 'bg-[#f4f1ea] text-[#151e17] border-[#e4ded5]'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
