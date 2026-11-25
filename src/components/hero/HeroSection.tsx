import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { PaddyHeroCanvas } from './PaddyHeroCanvas';
import type { PaddyHeroHandle } from './PaddyHeroCanvas';
import { VillageScenery } from './VillageScenery';
import { VillageFireflyCanvas } from './VillageFireflyCanvas';
import { PaddyFieldEgret } from './PaddyFieldEgret';
import { VillageDragonfly } from './VillageDragonfly';
import { TactileButton } from '../ui/TactileButton';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

const SCENERY_SHIFT_PX = 40;
const CONTENT_SHIFT_PX = -24;
const CONTENT_MIN_OPACITY = 0.4;

export const HeroSection: React.FC = () => {
  const paddyRef = useRef<PaddyHeroHandle | null>(null);
  const { atmosphere, playBambooTone } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  // Kanvas latar sengaja tidak ikut bergeser agar tidak membuka celah di tepi hero.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const sceneryY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : SCENERY_SHIFT_PX]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : CONTENT_SHIFT_PX]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : CONTENT_MIN_OPACITY]);

  const handleScrollToProjects = () => {
    playBambooTone(520);
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full min-h-[90vh] sm:min-h-screen flex flex-col justify-between pt-24 pb-16 sm:pt-28 sm:pb-20 overflow-hidden select-none">
      {/* Background Terrace & Breeze Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <PaddyHeroCanvas ref={paddyRef} isNight={isNight} />
      </div>

      {/* Night Atmosphere Filter */}
      {isNight && (
        <div className="absolute inset-0 z-[5] pointer-events-none bg-[#09140e]/60 backdrop-brightness-90 transition-all duration-700" />
      )}

      {/* Bioluminescent Fireflies at Night */}
      {isNight && <VillageFireflyCanvas />}

      {/* Authentic Countryside Landscape: Saung Sawah & Coconut Palms */}
      <motion.div style={{ y: sceneryY }} className="absolute inset-0 z-10 pointer-events-none">
        <VillageScenery isNight={isNight} />
      </motion.div>

      {/* Serene Wildlife Atmosphere (Quiet natural flight, zero text bubbles) */}
      {!isNight && <PaddyFieldEgret />}
      {!isNight && <VillageDragonfly />}

      {/* Main Editorial Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 w-full flex-1 flex flex-col items-center justify-center my-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center text-center space-y-5 sm:space-y-7"
        >
          <p className={`text-xs sm:text-sm font-medium ${isNight ? 'text-[#a3b899]' : 'text-[#48564c]'}`}>
            <span className={`inline-block h-1.5 w-1.5 rounded-full mr-2 align-middle ${isNight ? 'bg-[#80ed99]' : 'bg-[#1b4332]'}`} />
            Terbuka untuk peluang Full-Stack / Mobile · Bandung &amp; Remote
          </p>

          <div className="space-y-2 sm:space-y-3">
            <h1
              className={`text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] transition-colors duration-500 font-sans ${
                isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]'
              }`}
            >
              Rendi Sutendi
            </h1>
            <p className={`text-base sm:text-xl font-medium ${isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'}`}>
              Full Stack Developer
            </p>
          </div>

          <p
            className={`max-w-2xl text-center text-sm sm:text-base leading-relaxed px-2 transition-colors duration-300 font-normal ${
              isNight ? 'text-[#c2ceb9]' : 'text-[#2d3a30]'
            }`}
          >
            Membangun e-commerce, sistem gudang, dan CRM penjualan dengan Node.js dan Next.js, serta aplikasi mobile Flutter. Server dan CI/CD saya siapkan sendiri di VPS.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-2">
            <TactileButton
              variant="primary"
              onClick={handleScrollToProjects}
              icon={<ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-200" />}
            >
              Eksplorasi Proyek
            </TactileButton>

            <div
              className={`inline-flex items-center p-1 rounded-xl border transition-colors ${
                isNight ? 'bg-[#17231c]/90 border-white/15' : 'bg-white/90 border-[#e4ded5]'
              }`}
            >
              <span className={`px-2.5 py-1.5 text-xs sm:text-sm font-medium flex items-center gap-1.5 ${
                isNight ? 'text-stone-300' : 'text-stone-700'
              }`}>
                <Download className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'}`} />
                <span className="font-semibold">Unduh CV</span>
              </span>

              <a
                href="/CV_Rendi_Sutendi_English%20(Full%20Stack%20v15%20EN).docx"
                download="CV_Rendi_Sutendi_English (Full Stack v15 EN).docx"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playBambooTone(640)}
                className={`px-3 py-1.5 rounded-lg font-semibold text-xs sm:text-sm transition-colors select-none cursor-pointer ${
                  isNight ? 'text-[#80ed99] hover:bg-white/10' : 'text-[#1b4332] hover:bg-[#1b4332]/10'
                }`}
                title="Download English CV (Word, ATS-friendly)"
              >
                EN
              </a>

              <span className={`text-xs select-none ${isNight ? 'text-white/30' : 'text-stone-300'}`}>•</span>

              <a
                href="/CV_Rendi_Sutendi_Indonesia%20(Full%20Stack%20v15).docx"
                download="CV_Rendi_Sutendi_Indonesia (Full Stack v15).docx"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playBambooTone(700)}
                className={`px-3 py-1.5 rounded-lg font-semibold text-xs sm:text-sm transition-colors select-none cursor-pointer ${
                  isNight ? 'text-[#80ed99] hover:bg-white/10' : 'text-[#1b4332] hover:bg-[#1b4332]/10'
                }`}
                title="Unduh CV Bahasa Indonesia (Word, ramah ATS)"
              >
                ID
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
