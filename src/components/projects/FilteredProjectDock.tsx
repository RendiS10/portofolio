import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import type { Project, ProjectCategory } from '../../types/portfolio';
import { ProjectPreviewPlaceholder } from './ProjectPreviewPlaceholder';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface FilteredProjectDockProps {
  projects: Project[];
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  onSelectProject: (project: Project) => void;
}

export const FilteredProjectDock: React.FC<FilteredProjectDockProps> = ({
  projects,
  selectedCategory,
  onSelectCategory,
  onSelectProject
}) => {
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0]?.id || 'holycat');
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  const categories: { id: ProjectCategory; label: string; count: number }[] = [
    { id: 'all', label: 'Semua Proyek', count: projects.length },
    {
      id: 'fullstack',
      label: 'Full-Stack Web',
      count: projects.filter((p) => p.category === 'fullstack').length
    },
    {
      id: 'mobile',
      label: 'Mobile Flutter',
      count: projects.filter((p) => p.category === 'mobile').length
    }
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const activeProject =
    filteredProjects.find((p) => p.id === activeProjectId) || filteredProjects[0] || projects[0];

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Category Filter Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span
            className={`text-[11px] font-mono font-bold uppercase tracking-wider block mb-1 ${
              isNight ? 'text-amber-400' : 'text-[#1b4332]'
            }`}
          >
            03 // KATALOG EKSPLORASI TEKNOLOGI
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            Indeks Portofolio &amp; Eksplorasi Kode
          </h3>
        </div>

        {/* Category Selection Tabs */}
        <div
          className={`p-1.5 rounded-2xl border flex items-center gap-1.5 transition-colors self-start sm:self-auto ${
            isNight ? 'bg-[#111a14] border-emerald-500/20' : 'bg-[#f4f1ea] border-[#e4ded5]'
          }`}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  onSelectCategory(cat.id);
                  const nextFiltered =
                    cat.id === 'all' ? projects : projects.filter((p) => p.category === cat.id);
                  if (nextFiltered[0]) setActiveProjectId(nextFiltered[0].id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  isActive
                    ? isNight
                      ? 'bg-emerald-500/20 text-emerald-300 shadow-sm border border-emerald-500/30'
                      : 'bg-white text-[#151e17] shadow-sm border border-[#e4ded5]'
                    : isNight
                    ? 'text-stone-400 hover:text-stone-200'
                    : 'text-[#48564c] hover:text-[#151e17]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? isNight
                        ? 'bg-emerald-400/20 text-emerald-300'
                        : 'bg-[#ebf2ec] text-[#1b4332]'
                      : 'opacity-60'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Horizontal Project Chips */}
      <div className="flex lg:hidden items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full">
        {filteredProjects.map((project, idx) => {
          const isSelected = activeProject.id === project.id;
          return (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveProjectId(project.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? isNight
                    ? 'bg-emerald-950/80 text-white border-emerald-500/35 shadow-sm'
                    : 'bg-white text-[#151e17] border-[#1b4332] shadow-sm font-bold'
                  : isNight
                  ? 'bg-[#152119] text-stone-300 border-emerald-500/15'
                  : 'bg-[#fcfbf8] text-[#48564c] border-[#e4ded5]'
              }`}
            >
              <span className="text-[10px] opacity-60">0{idx + 1}</span>
              <span>{project.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Master-Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Project Selector List (Desktop) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col gap-2.5 max-h-[500px] overflow-y-auto no-scrollbar pr-1">
          {filteredProjects.map((project, idx) => {
            const isSelected = activeProject.id === project.id;

            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setActiveProjectId(project.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? isNight
                      ? 'bg-emerald-950/70 border-emerald-500/35 shadow-md text-white'
                      : 'bg-white border-[#1b4332] shadow-md text-[#151e17]'
                    : isNight
                    ? 'bg-[#111a14] border-emerald-500/15 text-stone-300 hover:bg-[#17231c]'
                    : 'bg-[#fcfbf8] border-[#e4ded5] text-[#48564c] hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg border shrink-0 ${
                      isSelected
                        ? isNight
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-[#ebf2ec] text-[#1b4332] border-emerald-200'
                        : 'opacity-60 border-transparent'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <div className="truncate">
                    <div className="text-xs sm:text-sm font-bold truncate">
                      {project.title}
                    </div>
                    <div
                      className={`text-[11px] font-mono truncate mt-0.5 ${
                        isSelected
                          ? isNight
                            ? 'text-amber-400'
                            : 'text-[#1b4332]'
                          : 'opacity-70'
                      }`}
                    >
                      {project.role}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {project.isPrivateRepo ? (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                        isNight
                          ? 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                          : 'bg-rose-50 border-rose-200 text-rose-800'
                      }`}
                    >
                      <Lock className="w-2.5 h-2.5" />
                      <span>Private</span>
                    </span>
                  ) : (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                        isNight
                          ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                          : 'bg-emerald-50 border-emerald-200 text-[#1b4332]'
                      }`}
                    >
                      <ExternalLink className="w-2.5 h-2.5" />
                      <span>Live</span>
                    </span>
                  )}

                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? 'translate-x-0.5 text-emerald-400' : 'opacity-40'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Project Inspector Detail Card (Desktop + Mobile) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className={`p-6 sm:p-8 rounded-3xl border flex flex-col gap-5 transition-colors ${
                isNight
                  ? 'bg-[#111a14] border-emerald-500/20 shadow-2xl shadow-black/40'
                  : 'bg-white border-[#e4ded5] shadow-lg shadow-stone-900/4'
              }`}
            >
              {/* Device Preview Frame */}
              <ProjectPreviewPlaceholder
                project={activeProject}
                isMobileFrame={activeProject.category === 'mobile'}
                className="w-full"
              />

              {/* Title & Role Info */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-xl font-bold tracking-tight">
                    {activeProject.title}
                  </h4>
                  <span
                    className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                      isNight
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-[#ebf2ec] border-emerald-200 text-[#1b4332]'
                    }`}
                  >
                    {activeProject.role}
                  </span>
                </div>
                <p
                  className={`text-xs font-mono font-semibold ${
                    isNight ? 'text-amber-400' : 'text-[#1b4332]'
                  }`}
                >
                  {activeProject.subtitle}
                </p>
              </div>

              {/* Narrative Summary */}
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isNight ? 'text-[#95a499]' : 'text-[#48564c]'
                }`}
              >
                {activeProject.summary}
              </p>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border ${
                      isNight
                        ? 'bg-[#152119] border-emerald-500/15 text-[#f5f7f4]'
                        : 'bg-[#f4f1ea] border-[#e4ded5] text-[#151e17]'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Actions Row */}
              <div
                className={`pt-3 flex flex-wrap items-center gap-3 border-t ${
                  isNight ? 'border-emerald-500/15' : 'border-[#e4ded5]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectProject(activeProject)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-sm active:scale-95 ${
                    isNight
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-[#090f0c]'
                      : 'bg-[#1b4332] hover:bg-[#143427] text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Studi Kasus Lengkap</span>
                </button>

                {activeProject.demoUrl && (
                  <a
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold border transition-all ${
                      isNight
                        ? 'bg-[#152119] border-emerald-500/25 text-emerald-300 hover:bg-[#1a2a20]'
                        : 'bg-[#fcfbf8] border-[#e4ded5] text-[#151e17] hover:bg-white'
                    }`}
                  >
                    <span>Buka Demo</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
