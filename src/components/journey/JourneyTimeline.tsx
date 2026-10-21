import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  GraduationCap,
  Layers,
  Rocket,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { experienceData } from '../../data/portfolioData';
import type { ExperienceItem } from '../../types/portfolio';
import { JourneyOceanCanvas } from './JourneyOceanCanvas';

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
    nodeBg: 'bg-[#fde047]',
    nodeText: 'text-[#0f172a]',
    tagBg: 'bg-[#fde047]',
    tagText: 'text-[#0f172a]',
    tagBorder: 'border-[#0f172a]'
  },
  bootcamp: {
    icon: Layers,
    nodeBg: 'bg-[#52b788]',
    nodeText: 'text-[#0f172a]',
    tagBg: 'bg-[#d8f3dc]',
    tagText: 'text-[#1b4332]',
    tagBorder: 'border-[#0f172a]'
  },
  project: {
    icon: Rocket,
    nodeBg: 'bg-[#4ade80]',
    nodeText: 'text-[#0f172a]',
    tagBg: 'bg-[#dcfce7]',
    tagText: 'text-[#15803d]',
    tagBorder: 'border-[#0f172a]'
  },
  security: {
    icon: ShieldCheck,
    nodeBg: 'bg-[#fb7185]',
    nodeText: 'text-[#0f172a]',
    tagBg: 'bg-[#fee2e2]',
    tagText: 'text-[#dc2626]',
    tagBorder: 'border-[#0f172a]'
  }
};

export const JourneyTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

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
    <section id="journey" ref={containerRef} className="relative z-20 -mt-1 w-full select-none py-28 overflow-hidden text-[#0f172a]">
      {/* animated hillside terrace canvas */}
      <JourneyOceanCanvas />

      

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-12 space-y-8 sm:space-y-12">
        {/* header dock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-4 sm:p-8 rounded-2xl sm:rounded-[32px] bg-[#fffdf5] border-2 sm:border-3 border-[#0f172a] shadow-[4px_4px_0px_#0f172a] sm:shadow-[6px_6px_0px_#0f172a] space-y-2.5 sm:space-y-3"
        >
          <div className="flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-xl bg-[#fde047] text-[#0f172a] text-xs font-mono font-black border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a] w-fit">
            <Compass className="w-3.5 h-3.5" />
            <span>MILESTONE</span>
          </div>

          <div className="space-y-1 sm:space-y-1.5">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.08]">
              Milestone
            </h2>
            <p className="text-xs sm:text-base font-medium text-[#475569] max-w-2xl leading-relaxed">
              Pendidikan sarjana informatika, program bootcamp intensif, inisiatif mandiri, dan eksplorasi keamanan siber.
            </p>
          </div>
        </motion.div>

        {/* timeline track */}
        <div className="relative pl-11 sm:pl-20 space-y-7 sm:space-y-12">
          {/* background track */}
          <div className="absolute top-5 sm:top-6 bottom-5 sm:bottom-6 left-4 sm:left-7 -translate-x-1/2 w-2.5 sm:w-3.5 bg-black/30 rounded-full overflow-hidden border-2 border-white/50 shadow-inner z-0">
            {/* vertical progress */}
            <motion.div
              style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
              className="w-full h-full bg-gradient-to-b from-[#fde047] via-[#52b788] via-[#2d6a4f] to-[#c2410c] rounded-full shadow-[0_0_16px_rgba(82,183,136,0.8)]"
            />
          </div>

          {experienceData.map((item: ExperienceItem, idx: number) => {
            const config = categoryConfig[item.category || 'education'] || categoryConfig.education;
            const Icon = config.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -25, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.12,
                  type: 'spring',
                  stiffness: 240,
                  damping: 22
                }}
                className="relative group"
              >
                {/* timeline node icon */}
                <div
                  className={`absolute left-[-28px] sm:left-[-52px] -translate-x-1/2 top-4 sm:top-6 w-9 h-9 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl border-2 border-[#0f172a] ${config.nodeBg} ${config.nodeText} flex items-center justify-center shadow-[2px_2px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a] group-hover:scale-110 transition-transform z-10`}
                >
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>

                {/* milestone card */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                  className="p-4 sm:p-8 rounded-2xl sm:rounded-[32px] bg-[#fffdf5] border-2 sm:border-3 border-[#0f172a] shadow-[4px_4px_0px_#0f172a] sm:shadow-[6px_6px_0px_#0f172a] hover:shadow-[3px_3px_0px_#0f172a] hover:translate-x-1 hover:translate-y-1 transition-all duration-300 space-y-3 sm:space-y-4 cursor-default"
                >
                  {/* card top badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 pb-3 sm:pb-4 border-b-2 border-[#0f172a]/10">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-[10px] sm:text-xs font-mono font-black uppercase px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg sm:rounded-xl border-2 ${config.tagBg} ${config.tagBorder} ${config.tagText} shadow-[1.5px_1.5px_0px_#0f172a] sm:shadow-[2px_2px_0px_#0f172a]`}
                      >
                        {item.badge || item.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg sm:rounded-xl bg-[#edf2eb] border-2 border-[#0f172a] text-[10px] sm:text-xs font-mono font-black text-[#0f172a] shadow-[1.5px_1.5px_0px_#0f172a] sm:shadow-[2px_2px_0px_#0f172a]">
                      <Calendar className="w-3.5 h-3.5 text-[#2d6a4f]" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* role and organization */}
                  <div>
                    <h3 className="text-lg sm:text-2xl font-black text-[#0f172a] tracking-tight group-hover:text-[#2d6a4f] transition-colors">
                      {item.role}
                    </h3>
                    <div className="text-xs sm:text-sm font-mono font-bold text-[#2d6a4f] mt-0.5 sm:mt-1">
                      {item.organization}
                    </div>
                  </div>

                  {/* narrative description */}
                  <p className="text-xs sm:text-base font-medium text-[#334155] leading-relaxed">
                    {item.description}
                  </p>

                  {/* key highlights */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#edf2eb]/80 border border-[#0f172a]/20 sm:border-2 sm:border-[#0f172a]/15 space-y-1.5 sm:space-y-2">
                      <div className="text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider text-[#475569]">
                        Poin Kunci &amp; Spesialisasi
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                        {item.highlights.map((hl, hIdx) => (
                          <div
                            key={hIdx}
                            className="flex items-start gap-1.5 sm:gap-2 text-xs font-bold text-[#1e293b] leading-tight"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16a34a] shrink-0 mt-0.5" />
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
                        className="text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg sm:rounded-xl bg-[#edf2eb] hover:bg-[#fde047] text-[#0f172a] border border-[#0f172a] transition-colors"
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
