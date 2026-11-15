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
  SiVercel,
  SiRedis,
  SiNestjs,
  SiCaddy,
  SiDart,
  SiPwa
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
  vercel: SiVercel,
  redis: SiRedis,
  nestjs: SiNestjs,
  caddy: SiCaddy,
  dart: SiDart,
  pwa: SiPwa
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
      whileHover={isLayerActiveInDomain ? { y: -2 } : undefined}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onClick={() => {
        if (isLayerActiveInDomain) {
          onSelectLayer(layerId);
        }
      }}
      className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-300 relative flex flex-col justify-between ${
        !isLayerActiveInDomain
          ? 'bg-[#f8fafc]/50 border-dashed border-[#cbd5e1] opacity-35 grayscale pointer-events-none cursor-not-allowed select-none shadow-none'
          : isLayerSelected
          ? isNight
            ? 'bg-[#152119] border-emerald-400 shadow-md ring-1 ring-emerald-400 cursor-pointer'
            : 'bg-white border-[#1b4332] shadow-md ring-1 ring-[#1b4332] cursor-pointer'
          : isNight
          ? 'bg-[#111a14] border-emerald-500/20 shadow-sm cursor-pointer hover:border-emerald-500/40 hover:bg-[#142118]'
          : 'bg-white border-[#e4ded5] shadow-sm cursor-pointer hover:border-[#1b4332]/40 hover:bg-[#fcfbf9]'
      }`}
    >
      <div>
        {/* layer header */}
        <div className={`flex items-center justify-between gap-2 pb-3 border-b transition-colors duration-500 ${
          isNight ? 'border-emerald-500/20' : 'border-[#e4ded5]'
        }`}>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded-lg text-xs font-mono font-bold border ${
                isLayerActiveInDomain
                  ? isNight
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-[#ebf2ec] text-[#1b4332] border-emerald-200'
                  : 'bg-[#f1f5f9] text-[#94a3b8] border-[#e2e8f0]'
              }`}
            >
              {stepNumber}
            </span>
            <span
              className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                isLayerActiveInDomain ? (isNight ? 'text-amber-400' : 'text-[#1b4332]') : 'text-[#94a3b8]'
              }`}
            >
              {subtitle}
            </span>
          </div>

          <div
            className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md border ${
              !isLayerActiveInDomain
                ? 'bg-[#f1f5f9] text-[#94a3b8] border-[#e2e8f0]'
                : isLayerSelected
                ? isNight
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400'
                  : 'bg-[#ebf2ec] text-[#1b4332] border-emerald-300'
                : isNight
                ? 'bg-[#17231c] text-[#95a499] border-emerald-500/20'
                : 'bg-[#f4f1ea] text-[#48564c] border-[#e4ded5]'
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
        <div className="mt-3 space-y-1">
          <h3
            className={`text-lg sm:text-xl font-bold tracking-tight ${
              isLayerActiveInDomain ? (isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]') : 'text-[#64748b]'
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-xs font-normal leading-relaxed ${
              isLayerActiveInDomain ? (isNight ? 'text-[#95a499]' : 'text-[#48564c]') : 'text-[#94a3b8]'
            }`}
          >
            {roleDescription}
          </p>
        </div>

        {/* tools list */}
        <div className="mt-4 flex flex-wrap gap-2">
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
                className={`group flex items-center gap-2 px-2.5 py-1.5 rounded-xl border text-xs transition-all duration-200 ${
                  !isLayerActiveInDomain || !isToolActive
                    ? 'bg-[#f8fafc] border-[#e2e8f0] text-[#94a3b8] opacity-40 cursor-not-allowed shadow-none'
                    : isToolSelected
                    ? isNight
                      ? 'bg-emerald-600 border-emerald-400 text-white shadow-sm scale-102 cursor-pointer font-bold'
                      : 'bg-[#1b4332] border-[#1b4332] text-white shadow-sm scale-102 cursor-pointer font-bold'
                    : isNight
                    ? 'bg-[#17231c] hover:bg-[#1f3025] border-emerald-500/20 text-[#f5f7f4] cursor-pointer hover:border-emerald-500/40'
                    : 'bg-[#fbfaf8] hover:bg-white border-[#e4ded5] text-[#151e17] cursor-pointer hover:border-[#1b4332]/40'
                }`}
              >
                <div
                  className="w-4 h-4 rounded-md flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{
                    color:
                      isToolSelected
                        ? '#ffffff'
                        : isToolActive && isLayerActiveInDomain
                        ? tech.color
                        : '#94a3b8'
                  }}
                >
                  {Icon ? (
                    <Icon size={14} color={isToolSelected ? '#ffffff' : isToolActive && isLayerActiveInDomain ? tech.color : '#94a3b8'} />
                  ) : (
                    <span className="text-[9px] font-bold font-mono">
                      {tech.name.slice(0, 2)}
                    </span>
                  )}
                </div>

                <div className="text-left">
                  <div
                    className={`text-[11px] font-bold leading-tight ${
                      isToolSelected
                        ? 'text-white'
                        : isToolActive && isLayerActiveInDomain
                        ? isNight
                          ? 'text-[#f5f7f4]'
                          : 'text-[#151e17]'
                        : 'text-[#94a3b8]'
                    }`}
                  >
                    {tech.name}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* inspect CTA bar */}
      <div className={`mt-5 pt-3 border-t flex items-center justify-between text-[11px] font-mono transition-colors duration-500 ${
        isNight ? 'border-emerald-500/20' : 'border-[#e4ded5]'
      }`}>
        <span className={isNight ? 'text-amber-400 font-semibold' : 'text-[#1b4332] font-semibold'}>
          {techItems.length} Tools Teruji
        </span>
        <button
          type="button"
          onClick={handleInspectClick}
          className={`font-semibold hover:underline transition-colors cursor-pointer ${
            isNight ? 'text-[#95a499] hover:text-amber-400' : 'text-[#48564c] hover:text-[#1b4332]'
          }`}
        >
          Detail &rarr;
        </button>
      </div>
    </motion.div>
  );
};
