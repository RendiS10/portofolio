import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, type Variants } from 'framer-motion';
import { ProfilePhotoCard } from './ProfilePhotoCard';
import { ArchitectureStage } from './ArchitectureStage';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';
import { Terminal, Layers } from 'lucide-react';

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 24 }
  }
};

export const EditorialProfile: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'blueprint'>('overview');
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001
  });

  const subtleParallaxLeft = useTransform(smoothProgress, [0, 1], [-10, 10]);
  const subtleParallaxRight = useTransform(smoothProgress, [0, 1], [10, -10]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`relative pt-20 pb-24 sm:pt-28 sm:pb-32 overflow-hidden transition-colors duration-500 ${
        isNight ? 'bg-[#090f0c] text-[#f5f7f4]' : 'bg-[#fbfaf6] text-[#151e17]'
      }`}
    >
      {/* Subtle Highland Contour Watermark (Editorial Topographic Lines) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.035] dark:opacity-[0.05]">
        <svg viewBox="0 0 1440 900" fill="none" className="w-full h-full" preserveAspectRatio="none">
          <path d="M-100,120 Q380,240 840,140 T1540,200" stroke="currentColor" strokeWidth="1.5" />
          <path d="M-100,320 Q480,440 980,280 T1540,360" stroke="currentColor" strokeWidth="1.5" />
          <path d="M-100,560 Q340,680 920,500 T1540,620" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10"
      >
        {/* Editorial Section Header */}
        <motion.div
          variants={itemVariants}
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 sm:pb-12 border-b transition-colors duration-500 ${
            isNight ? 'border-emerald-500/15' : 'border-[#e4ded5]'
          }`}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[11px] font-mono font-bold tracking-[0.28em] uppercase ${
                isNight ? 'text-amber-400' : 'text-[#1b4332]'
              }`}>
                01 // REKAM JEJAK REKAYASA &amp; SPESIFIKASI
              </span>
              <span className={`w-1.5 h-1.5 rounded-full ${isNight ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.08] font-sans">
              Full-Stack &amp; Mobile Engineer
            </h2>
          </div>

          {/* Telemetry Switcher & Executive Summary */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className={`p-1 rounded-xl border flex items-center gap-1 ${
              isNight ? 'bg-[#111a14] border-emerald-500/20' : 'bg-[#f4f1ea] border-[#e4ded5]'
            }`}>
              <button
                type="button"
                onClick={() => setViewMode('overview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'overview'
                    ? isNight ? 'bg-emerald-500/20 text-emerald-300 shadow-sm' : 'bg-white text-[#151e17] shadow-sm'
                    : isNight ? 'text-stone-400 hover:text-stone-200' : 'text-[#48564c] hover:text-[#151e17]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Pilar Utama</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('blueprint')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'blueprint'
                    ? isNight ? 'bg-emerald-500/20 text-emerald-300 shadow-sm' : 'bg-white text-[#151e17] shadow-sm'
                    : isNight ? 'text-stone-400 hover:text-stone-200' : 'text-[#48564c] hover:text-[#151e17]'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Blueprint Data Flow</span>
              </button>
            </div>

            <p className={`max-w-xs text-xs leading-relaxed ${
              isNight ? 'text-[#95a499]' : 'text-[#48564c]'
            }`}>
              Merancang sistem e-commerce omnichannel skala produksi HolyCat (3.000+ pengguna), mobile app Flutter Clean Architecture, integrasi ERP, dan 100% Docker VPS.
            </p>
          </div>
        </motion.div>

        {/* 12-Column Responsive Atelier Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <motion.div
            variants={itemVariants}
            style={{ y: subtleParallaxLeft }}
            className="lg:col-span-5 relative"
          >
            <ProfilePhotoCard />
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{ y: subtleParallaxRight }}
            className="lg:col-span-7 relative"
          >
            <ArchitectureStage viewMode={viewMode} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
