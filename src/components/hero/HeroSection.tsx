import React, { useRef } from 'react';
import { ArrowDown, Download, ExternalLink } from 'lucide-react';
import { OceanHeroCanvas } from './OceanHeroCanvas';
import type { OceanHeroHandle } from './OceanHeroCanvas';
import { HeroPhysicsStage } from './HeroPhysicsStage';
import type { HeroPhysicsStageHandle } from './HeroPhysicsStage';
import { PaddyFieldEgret } from './PaddyFieldEgret';
import { VillageRooster } from './VillageRooster';
import type { VillageRoosterHandle } from './VillageRooster';
import { VillageDragonfly } from './VillageDragonfly';
import { VillageScenery } from './VillageScenery';
import { VillageFireflyCanvas } from './VillageFireflyCanvas';
import { TactileButton } from '../ui/TactileButton';
import { profileData } from '../../data/portfolioData';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

export const HeroSection: React.FC = () => {
  const oceanRef = useRef<OceanHeroHandle | null>(null);
  const stageRef = useRef<HeroPhysicsStageHandle | null>(null);
  const roosterRef = useRef<VillageRoosterHandle | null>(null);

  const { atmosphere, playBambooTone } = useVillageAtmosphere();

  const handleSplash = (clientX: number, clientY: number, intensity: number) => {
    playBambooTone(Math.min(920, 480 + intensity * 140));

    if (oceanRef.current) {
      oceanRef.current.triggerSplash(clientX, clientY, intensity);
    }
    // Interactive reaction: letter drops near the rooster startles him!
    if (roosterRef.current && intensity > 1.2) {
      const rect = roosterRef.current.getRoosterRect();
      if (rect) {
        const dist = Math.hypot(
          clientX - (rect.left + rect.width / 2),
          clientY - (rect.top + rect.height / 2)
        );
        if (dist < 180) {
          roosterRef.current.triggerCrow();
        }
      }
    }
  };

  const handleRipple = (clientX: number, clientY: number, size?: number) => {
    if (oceanRef.current) {
      oceanRef.current.triggerRipple(clientX, clientY, size);
    }
  };

  const handleScrollToProjects = () => {
    playBambooTone(520);
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isNight = atmosphere === 'night';

  return (
    <section className="relative w-full h-screen min-h-[700px] flex flex-col justify-between pt-16 pb-10 overflow-hidden select-none">
      {/* Background Terrace & Breeze Canvas (Dynamic Fresh Day vs Starry Night) */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <OceanHeroCanvas ref={oceanRef} isNight={isNight} />
      </div>

      {/* Night Atmosphere Dark Filter & Glow Overlay */}
      {isNight && (
        <div className="absolute inset-0 z-5 pointer-events-none bg-[#09140e]/40 backdrop-brightness-90 transition-all duration-700" />
      )}

      {/* Bioluminescent Fireflies at Night */}
      {isNight && <VillageFireflyCanvas />}

      {/* Authentic Countryside Landscape: Saung Sawah & Coconut Palms */}
      <VillageScenery isNight={isNight} />

      {/* Village Wildlife Animations */}
      {!isNight && <PaddyFieldEgret />}
      {!isNight && <VillageDragonfly />}
      <VillageRooster ref={roosterRef} />

      {/* Main Hero Content & Physics Stage */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col items-center justify-center -translate-y-4 sm:-translate-y-8">
        <div className="w-full flex flex-col items-center text-center">
          <HeroPhysicsStage
            ref={stageRef}
            onSplash={handleSplash}
            onRipple={handleRipple}
          />

          <p
            className={`mt-3 sm:mt-5 max-w-xl text-center text-xs sm:text-base font-medium leading-relaxed px-2 transition-colors duration-300 ${
              isNight
                ? 'text-[#fef9c3] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]'
                : 'text-[#0f172a] drop-shadow-[0_1px_8px_rgba(255,255,255,0.9)] font-semibold'
            }`}
          >
            Full-Stack &amp; Mobile Developer. Membangun platform web skalabel, aplikasi mobile Flutter, dan arsitektur Linux yang efisien.
          </p>

          <div className="mt-5 sm:mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 px-2">
            <TactileButton
              variant="primary"
              onClick={handleScrollToProjects}
              icon={<ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#fde047]" />}
            >
              Lihat Proyek
            </TactileButton>

            <a
              href="/CV_Rendi_Sutendi.docx"
              download="CV_Rendi_Sutendi.docx"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playBambooTone(640)}
              className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all select-none cursor-pointer hover:-translate-y-0.5 shadow-md backdrop-blur-md ${
                isNight
                  ? 'bg-[#1a261f]/90 hover:bg-[#23352b] text-[#f8fafc] border border-emerald-500/35 hover:border-emerald-400'
                  : 'bg-white/90 hover:bg-white text-[#0f172a] border border-[#0f172a]/20 hover:border-[#0f172a]'
              }`}
            >
              <Download className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isNight ? 'text-[#fde047]' : 'text-[#16a34a]'}`} />
              <span>Download CV</span>
            </a>

            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playBambooTone(700)}
              className={`inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all select-none cursor-pointer hover:-translate-y-0.5 shadow-md backdrop-blur-md ${
                isNight
                  ? 'bg-[#1a261f]/90 hover:bg-[#23352b] text-[#f8fafc] border border-emerald-500/35 hover:border-emerald-400'
                  : 'bg-white/90 hover:bg-white text-[#0f172a] border border-[#0f172a]/20 hover:border-[#0f172a]'
              }`}
            >
              <span>GitHub</span>
              <ExternalLink className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isNight ? 'text-[#fde047]' : 'text-[#16a34a]'}`} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
