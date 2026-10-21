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
import { TactileButton } from '../ui/TactileButton';
import { profileData } from '../../data/portfolioData';

export const HeroSection: React.FC = () => {
  const oceanRef = useRef<OceanHeroHandle | null>(null);
  const stageRef = useRef<HeroPhysicsStageHandle | null>(null);
  const roosterRef = useRef<VillageRoosterHandle | null>(null);

  const handleSplash = (clientX: number, clientY: number, intensity: number) => {
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
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[700px] flex flex-col justify-between pt-16 pb-10 overflow-hidden select-none">
      {/* Background Terrace & Breeze Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <OceanHeroCanvas ref={oceanRef} />
      </div>

      {/* Authentic Countryside Landscape: Saung Sawah & Coconut Palms */}
      <VillageScenery />

      {/* Village Wildlife Animations */}
      <PaddyFieldEgret />
      <VillageDragonfly />
      <VillageRooster ref={roosterRef} />

      {/* Main Hero Content & Physics Stage */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex-1 flex flex-col items-center justify-center -translate-y-4 sm:-translate-y-8">
        <div className="w-full flex flex-col items-center text-center">
          <HeroPhysicsStage
            ref={stageRef}
            onSplash={handleSplash}
            onRipple={handleRipple}
          />

          <p className="mt-3 sm:mt-5 max-w-xl text-center text-xs sm:text-base text-[#fef9c3] font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] px-2">
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
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#1f1a14]/90 hover:bg-[#2b2219] text-[#f8fafc] border border-[#f59e0b]/35 hover:border-[#f59e0b]/80 font-medium text-xs sm:text-sm transition-all select-none cursor-pointer hover:-translate-y-0.5 shadow-md backdrop-blur-xs shadow-[#78350f]/20"
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f59e0b]" />
              <span>Download CV</span>
            </a>

            <a
              href={profileData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#1f1a14]/90 hover:bg-[#2b2219] text-[#f8fafc] border border-[#f59e0b]/35 hover:border-[#f59e0b]/80 font-medium text-xs sm:text-sm transition-all select-none cursor-pointer hover:-translate-y-0.5 shadow-md backdrop-blur-xs shadow-[#78350f]/20"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#fbbf24]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
