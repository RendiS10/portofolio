import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, MapPin } from 'lucide-react';
import { OceanHeroCanvas } from './OceanHeroCanvas';
import type { OceanHeroHandle } from './OceanHeroCanvas';
import { VillageScenery } from './VillageScenery';
import { VillageFireflyCanvas } from './VillageFireflyCanvas';
import { PaddyFieldEgret } from './PaddyFieldEgret';
import { VillageDragonfly } from './VillageDragonfly';
import { TactileButton } from '../ui/TactileButton';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

export const HeroSection: React.FC = () => {
  const oceanRef = useRef<OceanHeroHandle | null>(null);
  const { atmosphere, playBambooTone } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  const handleScrollToProjects = () => {
    playBambooTone(520);
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] sm:min-h-screen flex flex-col justify-between pt-24 pb-16 sm:pt-28 sm:pb-20 overflow-hidden select-none">
      {/* Background Terrace & Breeze Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <OceanHeroCanvas ref={oceanRef} isNight={isNight} />
      </div>

      {/* Night Atmosphere Filter */}
      {isNight && (
        <div className="absolute inset-0 z-[5] pointer-events-none bg-[#09140e]/60 backdrop-brightness-90 transition-all duration-700" />
      )}

      {/* Bioluminescent Fireflies at Night */}
      {isNight && <VillageFireflyCanvas />}

      {/* Authentic Countryside Landscape: Saung Sawah & Coconut Palms */}
      <VillageScenery isNight={isNight} />

      {/* Serene Wildlife Atmosphere (Quiet natural flight, zero text bubbles) */}
      {!isNight && <PaddyFieldEgret />}
      {!isNight && <VillageDragonfly />}

      {/* Main Authoritative Editorial Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 w-full flex-1 flex flex-col items-center justify-center my-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center text-center space-y-6 sm:space-y-8"
        >
          {/* Availability Status Badge - Minimal & Crisp */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono font-medium backdrop-blur-md transition-colors ${
              isNight
                ? 'bg-[#142118]/85 border-emerald-500/30 text-emerald-300'
                : 'bg-white/90 border-[#e4ded5] text-[#1b4332] shadow-sm'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Siap Berkolaborasi</span>
            <span className="opacity-40">•</span>
            <span className="inline-flex items-center gap-1 opacity-80">
              <MapPin className="w-3 h-3 text-emerald-500" /> Bandung &amp; Remote
            </span>
          </div>

          {/* Crisp Authoritative Typography for Rendi Sutendi */}
          <div className="space-y-3 sm:space-y-4">
            <h1
              className={`text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.02] transition-colors duration-500 font-sans ${
                isNight
                  ? 'text-[#f5f7f4] drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]'
                  : 'text-[#151e17] drop-shadow-[0_2px_12px_rgba(255,255,255,0.7)]'
              }`}
            >
              Rendi Sutendi
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-0.5">
              <span
                className={`text-xs sm:text-sm font-mono font-bold tracking-wider uppercase px-3 py-1 rounded-full border ${
                  isNight
                    ? 'bg-emerald-500/15 border-emerald-500/30 text-[#80ed99]'
                    : 'bg-[#ebf2ec] border-emerald-200 text-[#1b4332]'
                }`}
              >
                Software Engineer
              </span>
              <span
                className={`text-xs sm:text-sm font-mono font-medium ${
                  isNight ? 'text-[#a3b899]' : 'text-[#48564c]'
                }`}
              >
                — Full-Stack Web, Mobile &amp; Cloud Infrastructure
              </span>
            </div>
          </div>

          {/* Clear, Grounded Technical Value Proposition (No Clutter, 1 Punchy Paragraph) */}
          <p
            className={`max-w-2xl text-center text-sm sm:text-base leading-relaxed px-2 transition-colors duration-300 font-normal ${
              isNight
                ? 'text-[#c2ceb9] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]'
                : 'text-[#2d3a30]'
            }`}
          >
            Merancang ekosistem omnichannel skala produksi, aplikasi mobile Flutter 60fps dengan Clean Architecture, serta infrastruktur Linux VPS berbasis 100% Docker.
          </p>

          {/* Clean Dual CTAs: Exploratory & Professional Resume */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4 px-2">
            <TactileButton
              variant="primary"
              onClick={handleScrollToProjects}
              icon={<ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-200" />}
            >
              Eksplorasi Proyek
            </TactileButton>

            <a
              href="/CV_Rendi_Sutendi.docx"
              download="CV_Rendi_Sutendi.docx"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playBambooTone(640)}
              className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all select-none cursor-pointer hover:-translate-y-0.5 shadow-sm backdrop-blur-md border ${
                isNight
                  ? 'bg-[#17231c]/90 hover:bg-[#203227] text-[#f5f7f4] border-emerald-500/30 hover:border-emerald-400'
                  : 'bg-white hover:bg-stone-50 text-[#151e17] border-[#e4ded5] hover:border-[#1b4332]'
              }`}
            >
              <Download className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'}`} />
              <span>Unduh Resume (CV)</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
