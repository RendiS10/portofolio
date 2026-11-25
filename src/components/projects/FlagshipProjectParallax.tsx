import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Lock, Smartphone } from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { ProjectPreviewPlaceholder } from './ProjectPreviewPlaceholder';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface FlagshipProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

export const FlagshipSlideCard: React.FC<FlagshipProjectCardProps> = ({
  project,
  onSelectProject
}) => {
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';
  const reduceMotion = useReducedMotion();

  const chip = isNight
    ? 'bg-[#17231c] border-[#1f2d24] text-[#95a499]'
    : 'bg-[#f4f1ea] border-[#e4ded5] text-[#48564c]';
  const secondaryAction = isNight
    ? 'bg-[#17231c] border-[#1f2d24] text-[#f5f7f4] hover:bg-[#1c2b22]'
    : 'bg-[#fcfbf8] border-[#e4ded5] text-[#151e17] hover:bg-white';

  return (
    <motion.article
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full rounded-3xl border p-6 sm:p-10 transition-colors duration-300 ${
        isNight
          ? 'bg-[#111a14] border-[#1f2d24] shadow-2xl shadow-black/50'
          : 'bg-white border-[#e4ded5] shadow-xl shadow-black/5'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="space-y-5 lg:col-span-7">
          <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-mono border ${chip}`}>
            {project.role}
          </span>

          <div className="space-y-1.5">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
              {project.title}
            </h3>
            <p className={`text-xs sm:text-sm font-mono ${isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'}`}>
              {project.subtitle}
            </p>
          </div>

          <p className={`text-sm leading-relaxed ${isNight ? 'text-[#95a499]' : 'text-[#48564c]'}`}>
            {project.summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className={`p-3 rounded-2xl border ${
                  isNight ? 'bg-[#152119] border-[#1f2d24]' : 'bg-[#fcfbf8] border-[#e4ded5]'
                }`}
              >
                <div className={`text-[11px] font-mono ${isNight ? 'text-[#95a499]' : 'text-[#48564c]'}`}>
                  {m.label}
                </div>
                <div className="text-xs sm:text-sm font-bold tracking-tight mt-0.5 leading-snug">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border ${
                  isNight
                    ? 'bg-[#152119] border-[#1f2d24] text-[#f5f7f4]'
                    : 'bg-[#f4f1ea] border-[#e4ded5] text-[#151e17]'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          <div
            className={`pt-4 flex flex-wrap items-center gap-3 border-t ${
              isNight ? 'border-[#1f2d24]' : 'border-[#e4ded5]'
            }`}
          >
            <button
              type="button"
              onClick={() => onSelectProject(project)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-colors cursor-pointer shadow-sm focus:outline-none focus-visible:ring-2 ${
                isNight
                  ? 'bg-[#80ed99] hover:bg-[#6fdc88] text-[#090f0c] focus-visible:ring-[#80ed99]'
                  : 'bg-[#1b4332] hover:bg-[#143427] text-white focus-visible:ring-[#1b4332]'
              }`}
            >
              <span>Lihat Studi Kasus</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {project.isMobileApp ? (
              <div className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono border ${chip}`}>
                <Smartphone className="w-3.5 h-3.5" />
                <span>{project.demoStatusLabel ?? 'Aplikasi mobile'}</span>
              </div>
            ) : project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold border transition-colors ${secondaryAction}`}
              >
                <span>Buka Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            ) : (
              <div className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono border ${chip}`}>
                <Lock className="w-3.5 h-3.5" />
                <span>Sistem internal</span>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 flex items-center justify-center">
          <ProjectPreviewPlaceholder project={project} className="w-full max-w-lg lg:max-w-none" />
        </div>
      </div>
    </motion.article>
  );
};
