import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ExternalLink,
  Lock,
  Layers,
  Smartphone
} from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { ProjectPreviewPlaceholder } from './ProjectPreviewPlaceholder';
import { AnimatedOceanSlideBackground } from './AnimatedOceanSlideBackground';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface FlagshipSlideCardProps {
  project: Project;
  index: number;
  yMotion?: any;
  opacityMotion?: any;
  depthLevel?: 1 | 2 | 3;
  onSelectProject: (project: Project) => void;
}

export const FlagshipSlideCard: React.FC<FlagshipSlideCardProps> = ({
  project,
  index,
  yMotion = '0%',
  opacityMotion = 1,
  depthLevel = (index + 1) as 1 | 2 | 3,
  onSelectProject
}) => {
  const zIndex = index === 0 ? 10 : index === 1 ? 20 : 30;
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  return (
    <motion.div
      style={{ y: yMotion, opacity: opacityMotion, zIndex }}
      className={`absolute inset-0 w-full h-full flex flex-col justify-between overflow-hidden select-none transition-colors duration-500 ${
        isNight ? 'bg-[#08120b]' : 'bg-[#132a20]'
      } shadow-[0_-8px_24px_rgba(15,23,42,0.35)]`}
    >
      {/* background terrace ocean slide */}
      <AnimatedOceanSlideBackground depthLevel={depthLevel} />

      {/* slide metadata */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-20 sm:pt-24 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#fde047] text-[#0f172a] text-xs font-mono font-black border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a]">
            <span>0{index + 1} // {project.category === 'fullstack' ? 'FULL-STACK WEB' : 'MOBILE FLUTTER'}</span>
          </div>

          <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg border hidden sm:inline-block transition-colors duration-500 ${
            isNight ? 'bg-[#142118]/90 text-[#f8fafc] border-emerald-500/30' : 'bg-[#fffdf5]/90 text-[#0f172a] border-[#0f172a]/30'
          }`}>
            {project.role}
          </span>
        </div>

        <div className={`hidden sm:block text-xs font-mono font-black px-3.5 py-1.5 rounded-xl border transition-colors duration-500 ${
          isNight
            ? 'bg-[#142118] text-[#f8fafc] border-emerald-500/35 shadow-[3px_3px_0px_#040906]'
            : 'bg-[#fffdf5] text-[#0f172a] border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a]'
        }`}>
          FLAGSHIP {index + 1} / 3
        </div>
      </div>

      {/* project presentation content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-12 my-auto py-2 sm:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-12 items-center">
          {/* project details card */}
          <div className={`lg:col-span-6 p-4 sm:p-7 sm:p-9 rounded-2xl sm:rounded-[32px] border transition-colors duration-500 space-y-3 sm:space-y-5 ${
            isNight
              ? 'bg-[#142118] border-emerald-500/35 shadow-[5px_5px_0px_#040906] sm:shadow-[8px_8px_0px_#040906]'
              : 'bg-[#fffdf5] border-2 border-[#0f172a] shadow-[5px_5px_0px_#0f172a] sm:shadow-[8px_8px_0px_#0f172a]'
          }`}>
            {/* title and subtitle */}
            <div className="space-y-1">
              <h3 className={`text-xl sm:text-3xl lg:text-5xl font-black tracking-tight leading-[1.08] transition-colors duration-500 ${
                isNight ? 'text-[#f8fafc]' : 'text-[#0f172a]'
              }`}>
                {project.title}
              </h3>

              <p className={`text-[11px] sm:text-sm font-mono font-bold leading-relaxed transition-colors duration-500 ${
                isNight ? 'text-amber-300' : 'text-[#2d6a4f]'
              }`}>
                {project.subtitle}
              </p>
            </div>

            {/* summary */}
            <p className={`text-[11px] sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none font-medium transition-colors duration-500 ${
              isNight ? 'text-stone-300' : 'text-[#334155]'
            }`}>
              {project.summary}
            </p>

            {/* key performance metrics */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
              {project.metrics.map((m, idx) => {
                const stickerBg = isNight
                  ? 'bg-[#1a2a20] border-emerald-500/30 text-emerald-300'
                  : idx === 0
                  ? 'bg-[#e0f2fe] border-[#2d6a4f]'
                  : idx === 1
                  ? 'bg-[#fef9c3] border-[#ca8a04]'
                  : 'bg-[#dcfce7] border-[#16a34a]';

                const labelColor = isNight
                  ? 'text-amber-400'
                  : idx === 0
                  ? 'text-[#1b4332]'
                  : idx === 1
                  ? 'text-[#854d0e]'
                  : 'text-[#15803d]';

                return (
                  <div
                    key={idx}
                    className={`p-1.5 sm:p-3 rounded-xl sm:rounded-2xl ${stickerBg} border text-center flex flex-col justify-center min-h-[44px] sm:min-h-[58px] transition-colors duration-500 ${
                      isNight ? 'shadow-[2px_2px_0px_#040906]' : 'border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a]'
                    }`}>
                    <div className={`text-[9px] sm:text-[11px] font-mono font-bold uppercase ${labelColor} leading-tight`}>
                      {m.label}
                    </div>
                    <div className={`text-[11px] sm:text-sm font-black mt-0.5 leading-tight ${
                      isNight ? 'text-[#f8fafc]' : 'text-[#0f172a]'
                    }`}>
                      {m.value}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* tech stack tags */}
            <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5 sm:pt-1">
              {project.stack.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-[11px] font-mono font-bold border transition-colors duration-500 ${
                    isNight
                      ? 'bg-[#1a2a20] text-[#f8fafc] border-emerald-500/30'
                      : 'bg-[#edf2eb] text-[#0f172a] border border-[#0f172a]/50'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* action buttons */}
            <div className={`pt-2 flex flex-wrap items-center gap-2 sm:gap-3 border-t transition-colors duration-500 ${
              isNight ? 'border-emerald-500/20' : 'border-[#d8dfd5]'
            }`}>
              {/* case study modal trigger */}
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-[11px] sm:text-xs font-mono font-black border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              >
                <span>Studi Kasus</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* demo or app status */}
              {project.isMobileApp ? (
                <div
                  className="flex items-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#d8f3dc] text-[#1b4332] text-[11px] sm:text-xs font-mono font-bold border-2 border-[#2d6a4f]/50 cursor-not-allowed opacity-90"
                  title={project.demoStatusLabel || 'Aplikasi Mobile Native'}
                >
                  <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2d6a4f]" />
                  <span>Mobile Native</span>
                </div>
              ) : project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#fde047] hover:bg-[#facc15] text-[#0f172a] text-[11px] sm:text-xs font-mono font-black border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all"
                >
                  <span>Buka Live Demo</span>
                  <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </a>
              ) : (
                <div className="flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-[#edf2eb] text-[#475569] text-[11px] sm:text-xs font-mono font-bold border border-[#0f172a]/30">
                  <Lock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Internal Enterprise</span>
                </div>
              )}
            </div>
          </div>

          {/* project interactive preview stage */}
          <div className="lg:col-span-6 flex justify-center">
            <ProjectPreviewPlaceholder
              project={project}
              className="w-full max-w-lg lg:max-w-none"
            />
          </div>
        </div>
      </div>

      {/* bottom indicator row */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pb-8 px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#80ed99]" />
          <span className="text-xs font-mono font-medium text-[#edf2eb]">
            Slide {index + 1} of 3 // Scroll ke bawah untuk menjelajah
          </span>
        </div>
      </div>
    </motion.div>
  );
};
