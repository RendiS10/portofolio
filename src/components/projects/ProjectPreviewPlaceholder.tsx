import React, { useState } from 'react';
import { Globe, Smartphone, Image as ImageIcon } from 'lucide-react';
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
  const [imageError, setImageError] = useState(false);
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';
  const isMobile = isMobileFrame || project.category === 'mobile' || Boolean(project.isMobileApp);

  if (isMobile) {
    return (
      <div className={`relative flex items-center justify-center p-2 sm:p-4 ${className}`}>
        {/* Smartphone Chassis Frame */}
        <div
          className={`relative w-full max-w-[270px] sm:max-w-[290px] aspect-[9/18.5] rounded-[38px] sm:rounded-[44px] p-2.5 sm:p-3 border-2 transition-all duration-300 ${
            isNight
              ? 'bg-[#152119] border-emerald-500/30 shadow-2xl shadow-black/80'
              : 'bg-[#f4f1ea] border-[#e4ded5] shadow-xl shadow-stone-900/10'
          }`}
        >
          {/* Hardware Button Accents */}
          <div className="absolute -left-[3px] top-20 w-[3px] h-8 bg-stone-400/50 rounded-l" />
          <div className="absolute -left-[3px] top-32 w-[3px] h-8 bg-stone-400/50 rounded-l" />
          <div className="absolute -right-[3px] top-24 w-[3px] h-12 bg-stone-400/50 rounded-r" />

          {/* Inner Screen Glass */}
          <div
            className={`relative w-full h-full rounded-[30px] sm:rounded-[36px] overflow-hidden flex flex-col border ${
              isNight ? 'bg-[#090f0c] border-emerald-500/20' : 'bg-white border-stone-200'
            }`}
          >
            {/* Dynamic Island / Notch */}
            <div className="absolute top-2.5 inset-x-0 z-20 flex justify-center pointer-events-none">
              <div className="w-20 h-4 bg-black rounded-full flex items-center justify-end pr-2 gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
              </div>
            </div>

            {/* Screen Content */}
            <div className="relative w-full h-full overflow-hidden flex items-center justify-center pt-8">
              {!imageError && project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                  <div className={`p-4 rounded-2xl border ${
                    isNight ? 'bg-[#152119] border-emerald-500/20 text-emerald-400' : 'bg-[#ebf2ec] border-emerald-200 text-[#1b4332]'
                  }`}>
                    <Smartphone className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-sm font-bold tracking-tight">{project.title}</div>
                    <p className={`text-[11px] font-mono mt-1 ${isNight ? 'text-amber-400' : 'text-[#1b4332]'}`}>
                      Flutter 60fps Native UI
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="absolute bottom-1.5 inset-x-0 flex justify-center z-20 pointer-events-none">
              <div className={`w-28 h-1 rounded-full ${isNight ? 'bg-white/40' : 'bg-black/30'}`} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Web Platform Mockup
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
            className={`ml-2 px-3 py-1 rounded-md text-[11px] font-mono truncate max-w-[180px] sm:max-w-[280px] flex items-center gap-1.5 border ${
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
          <span>WEB PLATFORM</span>
        </div>
      </div>

      {/* Screen Viewport */}
      <div className={`relative w-full aspect-[16/10] overflow-hidden flex items-center justify-center ${
        isNight ? 'bg-[#090f0c]' : 'bg-[#fcfbf8]'
      }`}>
        {!imageError && project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/preview:scale-[1.02]"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
            <div className={`p-4 rounded-2xl border ${
              isNight ? 'bg-[#152119] border-emerald-500/20 text-emerald-400' : 'bg-[#ebf2ec] border-emerald-200 text-[#1b4332]'
            }`}>
              <ImageIcon className="w-8 h-8" />
            </div>
            <div>
              <div className="text-base font-bold tracking-tight">{project.title}</div>
              <p className={`text-xs font-mono mt-0.5 ${isNight ? 'text-amber-400' : 'text-[#1b4332]'}`}>
                {project.subtitle}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
