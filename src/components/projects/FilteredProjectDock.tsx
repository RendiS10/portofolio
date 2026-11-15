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
import { AnimatedOceanSlideBackground } from './AnimatedOceanSlideBackground';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface FilteredProjectDockProps {
  projects: Project[];
  selectedCategory: ProjectCategory;
  isActive?: boolean;
  onSelectCategory: (category: ProjectCategory) => void;
  onSelectProject: (project: Project) => void;
}

export const FilteredProjectDock: React.FC<FilteredProjectDockProps> = ({
  projects,
  selectedCategory,
  isActive = true,
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
    <div className={`absolute inset-0 w-full h-full flex flex-col justify-start sm:justify-between overflow-hidden select-none transition-colors duration-500 ${
      isNight ? 'bg-[#08120b]' : 'bg-[#132a20]'
    }`}>
      {/* ocean background */}
      <AnimatedOceanSlideBackground depthLevel={4} isActive={isActive} />

      {/* category and project filter navigation */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-20 sm:pt-24 px-4 sm:px-12 flex flex-col gap-2 sm:gap-3 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
          <div>
            <span className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider text-[#0f172a] bg-[#fde047] px-2 py-0.5 sm:px-3 sm:py-0.5 rounded-lg border-2 border-[#0f172a] shadow-[2px_2px_0px_#0f172a] inline-block mb-1">
              04 // INDEKS PORTOFOLIO
            </span>
            <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              Eksplorasi Proyek &amp; Hasil Rekayasa
            </h3>
          </div>

          {/* category selection */}
          <div className="grid grid-cols-3 sm:flex sm:items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
            {categories.map((cat) => {
              const shortLabel =
                cat.id === 'all' ? 'Semua' : cat.id === 'fullstack' ? 'Web' : 'Mobile';

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
                  className={`flex items-center justify-center gap-1.5 px-2 py-2 sm:px-3.5 sm:py-1.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-mono font-black transition-all cursor-pointer border w-full sm:w-auto shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-[#2d6a4f] text-white shadow-[2px_2px_0px_#040906] border-emerald-500/40 -translate-y-0.5'
                      : isNight
                      ? 'bg-[#142118] text-[#f8fafc] border-emerald-500/30 hover:bg-[#1a2a20]'
                      : 'bg-[#fffdf5] hover:bg-[#edf2eb] text-[#0f172a] border-[#0f172a] shadow-[1.5px_1.5px_0px_#0f172a]'
                  }`}
                >
                  <span className="sm:hidden">{shortLabel}</span>
                  <span className="hidden sm:inline">{cat.label}</span>
                  <span
                    className={`text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      selectedCategory === cat.id
                        ? 'bg-white/30 text-white'
                        : isNight
                        ? 'bg-[#1a2a20] text-amber-300 border border-emerald-500/30'
                        : 'bg-[#edf2eb] text-[#0f172a] border border-[#0f172a]/40'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex lg:hidden items-center gap-2 overflow-x-auto no-scrollbar py-0.5 w-full shrink-0">
          {filteredProjects.map((project, idx) => {
            const isSelected = activeProject.id === project.id;
            return (
              <button
                key={project.id}
                type="button"
                onClick={() => setActiveProjectId(project.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-[#fde047] text-[#0f172a] shadow-[2.5px_2.5px_0px_#040906] font-black -translate-y-0.5 border-[#0f172a]'
                    : isNight
                    ? 'bg-[#142118] text-[#f8fafc] border-emerald-500/30 font-bold'
                    : 'bg-[#fffdf5]/95 hover:bg-[#edf2eb] text-[#0f172a] border-[#0f172a] shadow-[1.5px_1.5px_0px_#0f172a] font-bold'
                }`}
              >
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-black/10">
                  0{idx + 1}
                </span>
                <span>{project.title}</span>
                {project.isPrivateRepo ? (
                  <Lock className="w-3 h-3 text-[#f87171]" />
                ) : (
                  <ExternalLink className="w-3 h-3 text-[#4ade80]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* master/detail project showcase stage */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-12 my-auto py-1 sm:py-2 flex-1 min-h-0 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-8 items-center h-full">
          {/* project selector catalog column (desktop) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-2 max-h-[460px] overflow-y-auto no-scrollbar pr-1">
            {filteredProjects.map((project, idx) => {
              const isSelected = activeProject.id === project.id;

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => setActiveProjectId(project.id)}
                  className={`w-full text-left p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#fde047] border-[#0f172a] shadow-[4px_4px_0px_#0f172a] -translate-y-0.5'
                      : isNight
                      ? 'bg-[#142118] border-emerald-500/30 text-[#f8fafc] hover:bg-[#1a2a20]'
                      : 'bg-[#fffdf5]/95 border-[#0f172a] hover:bg-[#edf2eb] shadow-[2px_2px_0px_#0f172a]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded-md border ${
                      isSelected ? 'bg-[#fffdf5] text-[#0f172a] border-[#0f172a]' : isNight ? 'bg-[#1a2a20] text-amber-300 border-emerald-500/30' : 'bg-[#fffdf5] text-[#0f172a] border-[#0f172a]'
                    }`}>
                      0{idx + 1}
                    </span>
                    <div className="truncate">
                      <div className={`text-xs font-black truncate ${isSelected ? 'text-[#0f172a]' : isNight ? 'text-[#f8fafc]' : 'text-[#0f172a]'}`}>
                        {project.title}
                      </div>
                      <div className={`text-[10px] font-mono truncate ${isSelected ? 'text-[#78350f]' : isNight ? 'text-amber-300/80' : 'text-[#2d6a4f]'}`}>
                        {project.role}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {project.isPrivateRepo ? (
                      <span className="text-[9px] font-mono font-bold text-[#b91c1c] bg-[#fee2e2] px-1.5 py-0.5 rounded-md border border-[#b91c1c]/40 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        <span className="hidden xl:inline">Private</span>
                      </span>
                    ) : (
                      <span className="text-[9px] font-mono font-bold text-[#15803d] bg-[#dcfce7] px-1.5 py-0.5 rounded-md border border-[#16a34a]/40 flex items-center gap-1">
                        <ExternalLink className="w-2.5 h-2.5" />
                        <span className="hidden xl:inline">Live</span>
                      </span>
                    )}

                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'rotate-90 text-[#0f172a]' : isNight ? 'text-stone-400' : 'text-[#0f172a]'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* project inspector showcase card (desktop + mobile) */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                className={`p-3.5 sm:p-5 rounded-2xl sm:rounded-[24px] border flex flex-col justify-between space-y-2.5 sm:space-y-3 transition-colors duration-500 ${
                  isNight
                    ? 'bg-[#142118] border-emerald-500/35 shadow-[4px_4px_0px_#040906] sm:shadow-[6px_6px_0px_#040906]'
                    : 'bg-[#fffdf5] border-2 border-[#0f172a] shadow-[4px_4px_0px_#0f172a] sm:shadow-[6px_6px_0px_#0f172a]'
                }`}
              >
                {/* project preview frame */}
                <div className="space-y-2 sm:space-y-2">
                  <ProjectPreviewPlaceholder
                    project={activeProject}
                    isMobileFrame={activeProject.category === 'mobile'}
                    className="h-[210px] min-[400px]:h-[235px] sm:h-auto sm:aspect-[16/9] sm:max-h-[220px] lg:max-h-none w-full"
                  />

                  {/* project titles */}
                  <div className="pt-2 sm:pt-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-base sm:text-xl font-black ${isNight ? 'text-[#f8fafc]' : 'text-[#0f172a]'}`}>
                        {activeProject.title}
                      </h4>
                      <span className={`text-[10px] sm:text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg border shrink-0 ${
                        isNight ? 'bg-[#1a2a20] text-amber-300 border-emerald-500/30' : 'text-[#2d6a4f] bg-[#d8f3dc] border-[#2d6a4f]/40'
                      }`}>
                        {activeProject.role}
                      </span>
                    </div>
                    <p className={`text-[10px] sm:text-[11px] font-mono font-bold mt-0.5 line-clamp-1 ${
                      isNight ? 'text-amber-400' : 'text-[#2d6a4f]'
                    }`}>
                      {activeProject.subtitle}
                    </p>
                  </div>

                  <p className={`text-[11px] sm:text-xs leading-relaxed font-medium line-clamp-2 ${
                    isNight ? 'text-stone-300' : 'text-[#334155]'
                  }`}>
                    {activeProject.summary}
                  </p>
                </div>

                {/* performance (desktop) */}
                <div className="hidden sm:grid grid-cols-3 gap-1.5 sm:gap-2">
                  {activeProject.metrics.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className={`p-1 sm:p-2 rounded-lg sm:rounded-xl border text-center transition-colors duration-500 ${
                        isNight
                          ? 'bg-[#1a2a20] border-emerald-500/25 shadow-[1.5px_1.5px_0px_#040906]'
                          : 'bg-[#edf2eb] border border-[#0f172a]/50 shadow-[1.5px_1.5px_0px_#0f172a] sm:shadow-[2px_2px_0px_#0f172a]'
                      }`}
                    >
                      <div className={`text-[8px] sm:text-[9px] font-mono font-bold uppercase leading-tight ${
                        isNight ? 'text-amber-400' : 'text-[#2d6a4f]'
                      }`}>
                        {m.label}
                      </div>
                      <div className={`text-[10px] sm:text-xs font-black mt-0.5 ${
                        isNight ? 'text-[#f8fafc]' : 'text-[#0f172a]'
                      }`}>
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* project stack & interactive launch buttons */}
                <div className={`flex flex-wrap items-center justify-between gap-2 pt-2 border-t transition-colors duration-500 ${
                  isNight ? 'border-emerald-500/20' : 'border-[#d8dfd5]'
                }`}>
                  <div className="flex flex-wrap items-center gap-1">
                    {activeProject.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${
                          isNight
                            ? 'bg-[#1a2a20] text-[#f8fafc] border-emerald-500/30'
                            : 'bg-[#fffdf5] text-[#0f172a] border border-[#0f172a]/40'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProject(activeProject)}
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-[11px] sm:text-xs font-mono font-black border-2 border-[#0f172a] shadow-[2.5px_2.5px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a] cursor-pointer transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Studi Kasus Lengkap</span>
                    </button>

                    {activeProject.demoUrl && (
                      <a
                        href={activeProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-2 sm:py-1.5 rounded-xl bg-[#fde047] hover:bg-[#facc15] text-[#0f172a] text-[11px] sm:text-xs font-mono font-black border-2 border-[#0f172a] shadow-[2.5px_2.5px_0px_#0f172a] sm:shadow-[3px_3px_0px_#0f172a] transition-all hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
