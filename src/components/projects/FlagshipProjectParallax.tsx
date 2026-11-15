import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Lock, Smartphone } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { ProjectPreviewPlaceholder } from './ProjectPreviewPlaceholder';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface FlagshipProjectCardProps {
  project: Project;
  index: number;
  onSelectProject: (project: Project) => void;
}

export const FlagshipSlideCard: React.FC<FlagshipProjectCardProps> = ({
  project,
  index,
  onSelectProject
}) => {
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  const categoryLabel =
    project.category === 'fullstack'
      ? 'FULL-STACK WEB & BACKEND'
      : project.category === 'mobile'
      ? 'MOBILE FLUTTER CLEAN ARCH'
      : 'ENGINEERING CASE STUDY';

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full rounded-3xl sm:rounded-[36px] border p-6 sm:p-10 lg:p-12 transition-all duration-300 ${
        isNight
          ? 'bg-[#111a14] border-emerald-500/20 shadow-2xl shadow-black/50 hover:border-emerald-500/35'
          : 'bg-white border-[#e4ded5] shadow-xl shadow-stone-900/5 hover:border-[#1b4332]/30'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Text & Narrative Content Column */}
        <div className="space-y-5 lg:col-span-7">
          {/* Header Metadata Pill Row */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold border tracking-wide ${
                isNight
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-[#ebf2ec] border-emerald-200 text-[#1b4332]'
              }`}
            >
              0{index + 1} // {categoryLabel}
            </span>

            <span
              className={`px-3 py-1 rounded-full text-[11px] font-mono border ${
                isNight
                  ? 'bg-[#17231c] border-emerald-500/20 text-[#95a499]'
                  : 'bg-[#f4f1ea] border-[#e4ded5] text-[#48564c]'
              }`}
            >
              {project.role}
            </span>
          </div>

          {/* Title & Subtitle */}
          <div className="space-y-1.5">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              {project.title}
            </h3>
            <p
              className={`text-xs sm:text-sm font-mono font-medium ${
                isNight ? 'text-[#80ed99]' : 'text-[#2d6a4f]'
              }`}
            >
              {project.subtitle}
            </p>
          </div>

          {/* Narrative Summary */}
          <p
            className={`text-xs sm:text-sm leading-relaxed ${
              isNight ? 'text-[#95a499]' : 'text-[#48564c]'
            }`}
          >
            {project.summary}
          </p>

          {/* Technical Specifications Grid (No Truncation) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-2xl border transition-colors ${
                  isNight
                    ? 'bg-[#152119] border-emerald-500/15'
                    : 'bg-[#fcfbf8] border-[#e4ded5]'
                }`}
              >
                <div
                  className={`text-[10px] font-mono font-medium uppercase tracking-wider ${
                    isNight ? 'text-stone-400' : 'text-[#556358]'
                  }`}
                >
                  {m.label}
                </div>
                <div className="text-xs sm:text-sm font-bold tracking-tight mt-0.5 leading-snug">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium border transition-colors ${
                  isNight
                    ? 'bg-[#152119] border-emerald-500/20 text-[#f5f7f4]'
                    : 'bg-[#f4f1ea] border-[#e4ded5] text-[#151e17]'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div
            className={`pt-3 flex flex-wrap items-center gap-3 border-t ${
              isNight ? 'border-emerald-500/15' : 'border-[#e4ded5]'
            }`}
          >
            <button
              type="button"
              onClick={() => onSelectProject(project)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer active:scale-95 shadow-sm ${
                isNight
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-[#090f0c]'
                  : 'bg-[#1b4332] hover:bg-[#143427] text-white'
              }`}
            >
              <span>Bedah Arsitektur &amp; Studi Kasus</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {project.isMobileApp ? (
              <div
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold border ${
                  isNight
                    ? 'bg-[#17231c] border-emerald-500/20 text-emerald-300'
                    : 'bg-[#f4f1ea] border-[#e4ded5] text-[#1b4332]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                <span>Mobile Native 60fps</span>
              </div>
            ) : project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold border transition-all hover:translate-y-[-1px] ${
                  isNight
                    ? 'bg-[#152119] border-emerald-500/25 text-emerald-300 hover:bg-[#1a2a20]'
                    : 'bg-[#fcfbf8] border-[#e4ded5] text-[#151e17] hover:bg-white'
                }`}
              >
                <span>Buka Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            ) : (
              <div
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono border ${
                  isNight
                    ? 'bg-[#152119] border-emerald-500/15 text-stone-400'
                    : 'bg-[#f4f1ea] border-[#e4ded5] text-[#48564c]'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Internal Enterprise</span>
              </div>
            )}
          </div>
        </div>

        {/* Visual Mockup Stage Column */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <ProjectPreviewPlaceholder
            project={project}
            className="w-full max-w-lg lg:max-w-none"
          />
        </div>
      </div>
    </motion.article>
  );
};
