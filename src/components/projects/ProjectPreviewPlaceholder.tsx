import React from 'react';
import { Globe, Smartphone, LayoutGrid, Sparkles } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface ProjectPreviewPlaceholderProps {
  project: Project;
  className?: string;
  isMobileFrame?: boolean;
}

export const ProjectPreviewPlaceholder: React.FC<ProjectPreviewPlaceholderProps> = ({
  project,
  className = '',
  isMobileFrame = false
}) => {
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';
  const isMobile = isMobileFrame || project.category === 'mobile' || Boolean(project.isMobileApp);

  if (isMobile) {
    return (
      <div className={`relative flex items-center justify-center p-2 sm:p-4 ${className}`}>
        {/* Smartphone Chassis Frame */}
        <div
          className={`relative w-full max-w-[260px] sm:max-w-[280px] aspect-[9/18.5] rounded-[38px] sm:rounded-[44px] p-2.5 sm:p-3 border-2 transition-all duration-300 ${
            isNight
              ? 'bg-[#152119] border-emerald-500/30 shadow-2xl shadow-black/80'
              : 'bg-[#f4f1ea] border-[#e4ded5] shadow-xl shadow-stone-900/10'
          }`}
        >
          {/* Hardware Buttons */}
          <div className="absolute -left-[3px] top-20 w-[3px] h-8 bg-stone-400/50 rounded-l" />
          <div className="absolute -left-[3px] top-32 w-[3px] h-8 bg-stone-400/50 rounded-l" />
          <div className="absolute -right-[3px] top-24 w-[3px] h-12 bg-stone-400/50 rounded-r" />

          {/* Inner Screen */}
          <div
            className={`relative w-full h-full rounded-[30px] sm:rounded-[36px] overflow-hidden flex flex-col border ${
              isNight ? 'bg-[#090f0c] border-emerald-500/20' : 'bg-white border-stone-200'
            }`}
          >
            {/* Dynamic Island */}
            <div className="absolute top-2.5 inset-x-0 z-20 flex justify-center pointer-events-none">
              <div className="w-20 h-4 bg-black rounded-full flex items-center justify-end pr-2 gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
              </div>
            </div>

            {/* Mobile App Wireframe Template Skeleton */}
            <div className="relative w-full h-full flex flex-col justify-between pt-9 pb-3 px-3.5 select-none">
              {/* App Bar Wireframe */}
              <div className="flex items-center justify-between pb-2 border-b border-dashed border-stone-300/60 dark:border-emerald-500/20">
                <div className="flex items-center gap-1.5">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center ${
                    isNight ? 'bg-emerald-500/20 text-emerald-300' : 'bg-[#ebf2ec] text-[#1b4332]'
                  }`}>
                    <Smartphone className="w-3 h-3" />
                  </div>
                  <span className="text-[10px] font-mono font-bold truncate max-w-[110px]">
                    {project.title.replace('HolyCat ', '')}
                  </span>
                </div>
                <span className={`text-[8px] font-mono px-1.5 py-0.2 rounded-full border ${
                  isNight ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-[#ebf2ec] border-emerald-200 text-[#1b4332]'
                }`}>
                  60 FPS
                </span>
              </div>

              {/* Wireframe Hero Banner */}
              <div className={`p-3 rounded-xl border flex flex-col gap-1.5 my-auto ${
                isNight
                  ? 'bg-[#111a14] border-emerald-500/25 text-[#f5f7f4]'
                  : 'bg-[#fcfbf8] border-[#e4ded5] text-[#151e17]'
              }`}>
                <div className="flex items-center gap-1 text-[9px] font-mono text-emerald-500 font-bold">
                  <Sparkles className="w-3 h-3" />
                  <span>Flutter Clean Architecture</span>
                </div>
                <div className="text-xs font-bold leading-tight">
                  {project.title}
                </div>
                <div className={`text-[10px] font-mono leading-relaxed ${
                  isNight ? 'text-[#95a499]' : 'text-[#48564c]'
                }`}>
                  Presentation • Domain • Data
                </div>

                {/* Skeleton UI blocks */}
                <div className="grid grid-cols-2 gap-1.5 pt-1.5">
                  <div className={`p-1.5 rounded-lg border text-center ${
                    isNight ? 'bg-[#152119] border-emerald-500/15' : 'bg-white border-[#e4ded5]'
                  }`}>
                    <div className="text-[8px] font-mono opacity-60">STATE</div>
                    <div className="text-[9px] font-bold">Riverpod</div>
                  </div>
                  <div className={`p-1.5 rounded-lg border text-center ${
                    isNight ? 'bg-[#152119] border-emerald-500/15' : 'bg-white border-[#e4ded5]'
                  }`}>
                    <div className="text-[8px] font-mono opacity-60">CLIENT</div>
                    <div className="text-[9px] font-bold">Dio HTTP</div>
                  </div>
                </div>
              </div>

              {/* Bottom Nav Wireframe */}
              <div className="pt-2 border-t border-dashed border-stone-300/60 dark:border-emerald-500/20 flex items-center justify-around text-[8px] font-mono opacity-70">
                <span className="font-bold text-emerald-500">Beranda</span>
                <span>Layanan</span>
                <span>Aktivitas</span>
                <span>Profil</span>
              </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1 inset-x-0 flex justify-center z-20 pointer-events-none">
              <div className={`w-24 h-1 rounded-full ${isNight ? 'bg-white/40' : 'bg-black/30'}`} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Web Platform Wireframe Template
  return (
    <div
      className={`relative w-full rounded-2xl sm:rounded-3xl border overflow-hidden transition-all duration-300 group/preview ${
        isNight
          ? 'bg-[#111a14] border-emerald-500/25 shadow-2xl shadow-black/60'
          : 'bg-white border-[#e4ded5] shadow-xl shadow-stone-900/5'
      } ${className}`}
    >
      {/* Minimalist Browser Chrome Bar */}
      <div
        className={`flex items-center justify-between px-4 py-2.5 border-b transition-colors ${
          isNight ? 'bg-[#152119] border-emerald-500/20' : 'bg-[#f4f1ea] border-[#e4ded5]'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />

          <div
            className={`ml-2 px-3 py-1 rounded-md text-[11px] font-mono truncate max-w-[180px] sm:max-w-[300px] flex items-center gap-1.5 border ${
              isNight
                ? 'bg-[#090f0c] border-emerald-500/20 text-emerald-300'
                : 'bg-white border-[#e4ded5] text-[#151e17]'
            }`}
          >
            <Globe className="w-3 h-3 shrink-0 opacity-60" />
            <span className="truncate">{project.demoUrl || `https://${project.id}.com`}</span>
          </div>
        </div>

        <div
          className={`flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
            isNight
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-[#ebf2ec] border-emerald-200 text-[#1b4332]'
          }`}
        >
          <span>PRODUCTION BLUEPRINT</span>
        </div>
      </div>

      {/* Screen Viewport: High-End Architectural Wireframe Template */}
      <div
        className={`relative w-full aspect-[16/10] overflow-hidden flex flex-col justify-between p-5 sm:p-7 select-none ${
          isNight ? 'bg-[#090f0c]' : 'bg-[#fcfbf8]'
        }`}
      >
        {/* Subtle Topographic Grid Watermark */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.05]">
          <svg viewBox="0 0 800 500" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <line x1="0" y1="100" x2="800" y2="100" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="250" x2="800" y2="250" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="400" x2="800" y2="400" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="200" y1="0" x2="200" y2="500" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="400" y1="0" x2="400" y2="500" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="600" y1="0" x2="600" y2="500" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Top Wireframe Navbar */}
        <div className="relative z-10 flex items-center justify-between pb-3 border-b border-dashed border-stone-300/70 dark:border-emerald-500/20">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg border ${
              isNight ? 'bg-[#152119] border-emerald-500/20 text-emerald-400' : 'bg-[#ebf2ec] border-emerald-200 text-[#1b4332]'
            }`}>
              <LayoutGrid className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight tracking-tight">{project.title}</div>
              <div className={`text-[10px] font-mono ${isNight ? 'text-amber-400' : 'text-[#1b4332]'}`}>
                {project.subtitle}
              </div>
            </div>
          </div>

          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
            isNight ? 'bg-[#152119] border-emerald-500/20 text-emerald-300' : 'bg-white border-[#e4ded5] text-[#1b4332]'
          }`}>
            Live SSR
          </span>
        </div>

        {/* Center Blueprint Diagram */}
        <div className="relative z-10 my-auto py-2">
          <div className={`p-4 rounded-2xl border ${
            isNight ? 'bg-[#111a14]/80 border-emerald-500/20' : 'bg-white/80 border-[#e4ded5]'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                isNight ? 'text-amber-400' : 'text-[#1b4332]'
              }`}>
                // Arsitektur Produksi Terverifikasi
              </span>
              <span className="text-[10px] font-mono opacity-60">Docker VPS Ingress</span>
            </div>

            {/* Mini Pipeline Schematic */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
              <div className={`p-2 rounded-xl border ${
                isNight ? 'bg-[#152119] border-emerald-500/20 text-emerald-200' : 'bg-[#fcfbf8] border-[#e4ded5] text-[#151e17]'
              }`}>
                <div className="opacity-60 text-[8px] uppercase">FRONTEND</div>
                <div className="font-bold mt-0.5">Next.js SSR</div>
              </div>
              <div className={`p-2 rounded-xl border ${
                isNight ? 'bg-[#152119] border-emerald-500/20 text-emerald-200' : 'bg-[#fcfbf8] border-[#e4ded5] text-[#151e17]'
              }`}>
                <div className="opacity-60 text-[8px] uppercase">BACKEND &amp; QUEUE</div>
                <div className="font-bold mt-0.5">NestJS / BullMQ</div>
              </div>
              <div className={`p-2 rounded-xl border ${
                isNight ? 'bg-[#152119] border-emerald-500/20 text-emerald-200' : 'bg-[#fcfbf8] border-[#e4ded5] text-[#151e17]'
              }`}>
                <div className="opacity-60 text-[8px] uppercase">STORAGE &amp; ACID</div>
                <div className="font-bold mt-0.5">PostgreSQL</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Ticker */}
        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-dashed border-stone-300/70 dark:border-emerald-500/20 text-[10px] font-mono">
          <div className="flex items-center gap-1.5 text-emerald-500 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>3.000+ Pengguna Aktif Terkoneksi</span>
          </div>
          <span className="opacity-60">Template Blueprint Wireframe</span>
        </div>
      </div>
    </div>
  );
};
