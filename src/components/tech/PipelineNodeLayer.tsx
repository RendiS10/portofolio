import React from 'react';
import { motion } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFlutter,
  SiLaravel,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiFirebase,
  SiPrisma,
  SiDocker,
  SiLinux,
  SiGit,
  SiVercel
} from '@icons-pack/react-simple-icons';
import type { TechItem, TechLayer } from '../../types/portfolio';
import type { FlowDomainId } from './PipelineFlowPresets';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

const iconMap: Record<string, React.FC<{ size?: number; color?: string; className?: string }>> = {
  react: SiReact,
  nextdotjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwindcss: SiTailwindcss,
  flutter: SiFlutter,
  laravel: SiLaravel,
  nodejs: SiNodedotjs,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  supabase: SiSupabase,
  firebase: SiFirebase,
  prisma: SiPrisma,
  docker: SiDocker,
  linux: SiLinux,
  git: SiGit,
  vercel: SiVercel
};

interface PipelineNodeLayerProps {
  layerId: TechLayer;
  stepNumber: string;
  title: string;
  subtitle: string;
  roleDescription: string;
  techItems: TechItem[];
  activeDomain: FlowDomainId;
  selectedTech: TechItem | null;
  onSelectTech: (tech: TechItem) => void;
  onSelectLayer: (layerId: TechLayer) => void;
  isLayerSelected: boolean;
}

export const PipelineNodeLayer: React.FC<PipelineNodeLayerProps> = ({
  layerId,
  stepNumber,
  title,
  subtitle,
  roleDescription,
  techItems,
  activeDomain,
  selectedTech,
  onSelectTech,
  onSelectLayer,
  isLayerSelected
}) => {
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  const isLayerActiveInDomain =
    activeDomain === 'all' ||
    (activeDomain === 'web' && layerId === 'client') ||
    (activeDomain === 'mobile' && layerId === 'client') ||
    (activeDomain === 'backend' && (layerId === 'backend' || layerId === 'database')) ||
    (activeDomain === 'devops' && layerId === 'devops');

  const handleInspectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLayerActiveInDomain) return;
    onSelectLayer(layerId);
    const inspectorEl = document.getElementById('pipeline-inspector');
    if (inspectorEl) {
      inspectorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <motion.div
      whileHover={isLayerActiveInDomain ? { y: -3 } : undefined}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onClick={() => {
        if (isLayerActiveInDomain) {
          onSelectLayer(layerId);
        }
      }}
      className={`p-6 sm:p-7 rounded-[28px] border-2 transition-all duration-300 relative flex flex-col justify-between ${
        !isLayerActiveInDomain
          ? 'bg-[#f1f5f9]/70 border-dashed border-[#94a3b8] opacity-35 grayscale pointer-events-none cursor-not-allowed select-none shadow-none'
          : isLayerSelected
          ? isNight
            ? 'bg-[#16271c] border-emerald-400 shadow-[8px_8px_0px_#040906] ring-2 ring-emerald-400 cursor-pointer'
            : 'bg-[#fffdf5] border-[#0f172a] shadow-[8px_8px_0px_#0f172a] ring-3 ring-[#2d6a4f] cursor-pointer'
          : isNight
          ? 'bg-[#142118] border-emerald-500/35 shadow-[6px_6px_0px_#040906] cursor-pointer hover:border-emerald-400'
          : 'bg-[#fffdf5] border-[#0f172a] shadow-[6px_6px_0px_#0f172a] cursor-pointer hover:border-[#2d6a4f]'
      }`}
    >
      <div>
        {/* layer header */}
        <div className={`flex items-center justify-between gap-2 pb-3 border-b-2 transition-colors duration-500 ${
          isNight ? 'border-emerald-500/20' : 'border-[#0f172a]/10'
        }`}>
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-1 rounded-xl text-xs font-mono font-black border ${
                isLayerActiveInDomain
                  ? isNight
                    ? 'bg-amber-400 text-stone-900 border-[#040906] shadow-[2px_2px_0px_#040906]'
                    : 'bg-[#fde047] text-[#0f172a] border-[#0f172a] shadow-[2px_2px_0px_#0f172a]'
                  : 'bg-[#e2e8f0] text-[#94a3b8] border-[#cbd5e1]'
              }`}
            >
              {stepNumber}
            </span>
            <span
              className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                isLayerActiveInDomain ? (isNight ? 'text-amber-400' : 'text-[#2d6a4f]') : 'text-[#94a3b8]'
              }`}
            >
              {subtitle}
            </span>
          </div>

          <div
            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg border ${
              !isLayerActiveInDomain
                ? 'bg-[#e2e8f0] text-[#94a3b8] border-[#cbd5e1]'
                : isLayerSelected
                ? 'bg-[#fde047] text-[#0f172a] border-[#0f172a]'
                : isNight
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                : 'bg-[#dcfce7] text-[#15803d] border-[#16a34a]'
            }`}
          >
            {!isLayerActiveInDomain
              ? 'NONAKTIF'
              : isLayerSelected
              ? 'DIPILIH'
              : 'AKTIF'}
          </div>
        </div>

        {/* layer description */}
        <div className="mt-3.5 space-y-1">
          <h3
            className={`text-xl sm:text-2xl font-black tracking-tight ${
              isLayerActiveInDomain ? (isNight ? 'text-[#f8fafc]' : 'text-[#0f172a]') : 'text-[#64748b]'
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-xs font-medium leading-relaxed ${
              isLayerActiveInDomain ? (isNight ? 'text-stone-300' : 'text-[#475569]') : 'text-[#94a3b8]'
            }`}
          >
            {roleDescription}
          </p>
        </div>

        {/* tools list */}
        <div className="mt-5 flex flex-wrap gap-2">
          {techItems.map((tech) => {
            const Icon = iconMap[tech.iconKey];
            const isToolActive =
              activeDomain === 'all' ||
              (activeDomain === 'web' && tech.category === 'frontend') ||
              (activeDomain === 'mobile' && tech.category === 'mobile') ||
              (activeDomain === 'backend' && tech.category === 'backend') ||
              (activeDomain === 'devops' && tech.category === 'tools');

            const isToolSelected = isLayerActiveInDomain && selectedTech?.name === tech.name;

            return (
              <button
                key={tech.name}
                type="button"
                disabled={!isLayerActiveInDomain || !isToolActive}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isLayerActiveInDomain || !isToolActive) return;
                  onSelectTech(tech);
                  const inspectorEl = document.getElementById('pipeline-inspector');
                  if (inspectorEl) {
                    inspectorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                  }
                }}
                className={`group flex items-center gap-2 px-3 py-2 rounded-xl border-2 transition-all duration-200 ${
                  !isLayerActiveInDomain || !isToolActive
                    ? 'bg-[#f1f5f9] border-[#cbd5e1] text-[#94a3b8] opacity-50 cursor-not-allowed shadow-none'
                    : isToolSelected
                    ? isNight
                      ? 'bg-amber-400 border-amber-300 text-stone-900 shadow-[3px_3px_0px_#040906] scale-105 cursor-pointer font-bold'
                      : 'bg-[#fde047] border-[#0f172a] shadow-[3px_3px_0px_#0f172a] scale-105 cursor-pointer'
                    : isNight
                    ? 'bg-[#1a2a20] hover:bg-[#23382c] border-emerald-500/30 text-[#f8fafc] shadow-[2px_2px_0px_#040906] hover:scale-105 cursor-pointer'
                    : 'bg-[#edf2eb] hover:bg-[#d8dfd5] border-[#0f172a] shadow-[2px_2px_0px_#0f172a] hover:scale-105 cursor-pointer'
                }`}
              >
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ color: isToolActive && isLayerActiveInDomain ? tech.color : '#94a3b8' }}
                >
                  {Icon ? (
                    <Icon size={16} color={isToolActive && isLayerActiveInDomain ? tech.color : '#94a3b8'} />
                  ) : (
                    <span className="text-[10px] font-bold font-mono">
                      {tech.name.slice(0, 2)}
                    </span>
                  )}
                </div>

                <div className="text-left">
                  <div
                    className={`text-xs font-bold leading-tight ${
                      isToolSelected && isNight
                        ? 'text-stone-950 font-black'
                        : isToolActive && isLayerActiveInDomain
                        ? isNight
                          ? 'text-[#f8fafc]'
                          : 'text-[#0f172a]'
                        : 'text-[#94a3b8]'
                    }`}
                  >
                    {tech.name}
                  </div>
                  {tech.roleTag && (
                    <div
                      className={`text-[9px] font-mono font-medium leading-tight ${
                        isToolSelected && isNight
                          ? 'text-stone-800'
                          : isToolActive && isLayerActiveInDomain
                          ? isNight
                            ? 'text-stone-300'
                            : 'text-[#475569]'
                          : 'text-[#cbd5e1]'
                      }`}
                    >
                      {tech.roleTag}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* inspect CTA bar */}
      <div className={`mt-6 pt-3 border-t flex items-center justify-between text-[11px] font-mono transition-colors duration-500 ${
        isNight ? 'border-emerald-500/20' : 'border-[#0f172a]/10'
      }`}>
        <span className={isNight ? 'text-amber-400 font-bold' : 'text-[#2d6a4f] font-bold'}>
          {techItems.length} Tools
        </span>
        <button
          type="button"
          onClick={handleInspectClick}
          className={`font-black underline transition-colors cursor-pointer ${
            isNight ? 'text-stone-200 hover:text-amber-400' : 'text-[#0f172a] hover:text-[#2d6a4f]'
          }`}
        >
          Inspeksi Detail &rarr;
        </button>
      </div>
    </motion.div>
  );
};
