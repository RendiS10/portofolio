import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Code2,
  SlidersHorizontal,
  Compass
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
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0]?.id || 'holycat-mobile');
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  const listContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Dynamic scroll state indicators
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(false);

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

  const activeIndex = filteredProjects.findIndex((p) => p.id === activeProject.id);

  // Monitor scroll overflow & positions
  const checkScrollState = useCallback(() => {
    const el = listContainerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    setCanScrollUp(scrollTop > 12);
    setCanScrollDown(scrollTop + clientHeight < scrollHeight - 12);
  }, []);

  useEffect(() => {
    checkScrollState();
    window.addEventListener('resize', checkScrollState);
    return () => window.removeEventListener('resize', checkScrollState);
  }, [filteredProjects, checkScrollState]);

  // Smoothly keep active item visible in scroll container
  useEffect(() => {
    if (activeProject?.id && itemRefs.current.has(activeProject.id)) {
      const buttonEl = itemRefs.current.get(activeProject.id);
      buttonEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeProject?.id]);

  // Keyboard navigation through project items (Arrow Up / Down)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredProjects.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (activeIndex + 1) % filteredProjects.length;
      setActiveProjectId(filteredProjects[nextIdx].id);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (activeIndex - 1 + filteredProjects.length) % filteredProjects.length;
      setActiveProjectId(filteredProjects[prevIdx].id);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Category Filter Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Proyek Lainnya</h3>
        </div>

        {/* Category Selection Tabs */}
        <div
          className={`p-1.5 rounded-2xl border flex items-center gap-1.5 transition-colors self-start sm:self-auto ${
            isNight ? 'bg-[#111a14] border-[#1f2d24]' : 'bg-[#f4f1ea] border-[#e4ded5]'
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
                      ? 'bg-[#17231c] text-[#80ed99] shadow-sm border border-[#1f2d24]'
                      : 'bg-white text-[#151e17] shadow-sm border border-[#e4ded5]'
                    : isNight
                    ? 'text-[#95a499] hover:text-[#f5f7f4]'
                    : 'text-[#48564c] hover:text-[#151e17]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? isNight
                        ? 'bg-[#17231c] text-[#80ed99]'
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
                    ? 'bg-[#17231c] text-white border-[#80ed99]/50 shadow-sm'
                    : 'bg-white text-[#151e17] border-[#1b4332] shadow-sm font-bold'
                  : isNight
                  ? 'bg-[#152119] text-[#95a499] border-[#1f2d24]'
                  : 'bg-[#fcfbf8] text-[#48564c] border-[#e4ded5]'
              }`}
            >
              <span className="text-[10px] opacity-60">{String(idx + 1).padStart(2, '0')}</span>
              <span>{project.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Master-Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Project Selector List (Desktop) with Tactical Affordance & Clean Scrollbar */}
        <div className="hidden lg:flex lg:col-span-5 flex-col gap-3">
          {/* List Status Affordance Header */}
          <div className="flex items-center justify-between text-[11px] font-mono px-1">
            <span
              className={`flex items-center gap-1.5 font-bold ${
                isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>
                Proyek {String(activeIndex + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
              </span>
            </span>

            <span
              className={`text-[10px] flex items-center gap-1 ${
                isNight ? 'text-[#95a499]' : 'text-[#48564c]'
              }`}
            >
              <SlidersHorizontal className="w-3 h-3 opacity-60" />
              <span>Gunakan scroll atau [↑ / ↓]</span>
            </span>
          </div>

          {/* Scrollable Container with Relative Fade Overlays */}
          <div className="relative">
            {/* Top Fade Gradient Indicator (when scrolled down) */}
            <div
              className={`absolute top-0 inset-x-0 h-6 pointer-events-none z-10 transition-opacity duration-300 rounded-t-2xl ${
                canScrollUp ? 'opacity-100' : 'opacity-0'
              } ${
                isNight
                  ? 'bg-gradient-to-b from-[#090f0c] to-transparent'
                  : 'bg-gradient-to-b from-[#fbfaf6] to-transparent'
              }`}
            />

            {/* List Element: Max-height 690px, Custom Editorial Scrollbar, Breathing Room */}
            <div
              ref={listContainerRef}
              onScroll={checkScrollState}
              className="flex flex-col gap-2.5 max-h-[690px] overflow-y-auto editorial-scrollbar pr-2 py-0.5"
            >
              {filteredProjects.map((project, idx) => {
                const isSelected = activeProject.id === project.id;

                return (
                  <button
                    key={project.id}
                    ref={(el) => {
                      if (el) itemRefs.current.set(project.id, el);
                      else itemRefs.current.delete(project.id);
                    }}
                    type="button"
                    onClick={() => setActiveProjectId(project.id)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 group ${
                      isSelected
                        ? isNight
                          ? 'bg-[#17231c] border-[#80ed99]/50 shadow-md text-white ring-1 ring-[#80ed99]/30'
                          : 'bg-white border-[#1b4332] shadow-md text-[#151e17] ring-1 ring-[#1b4332]/20'
                        : isNight
                        ? 'bg-[#111a14] border-[#1f2d24] text-[#95a499] hover:bg-[#17231c] hover:border-[#80ed99]/40'
                        : 'bg-[#fcfbf8] border-[#e4ded5] text-[#48564c] hover:bg-white hover:border-[#1b4332]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg border shrink-0 transition-colors ${
                          isSelected
                            ? isNight
                              ? 'bg-[#17231c] text-[#80ed99] border-[#1f2d24]'
                              : 'bg-[#ebf2ec] text-[#1b4332] border-[#e4ded5]'
                            : 'opacity-60 border-[#e4ded5]'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="truncate">
                        <div className="text-xs sm:text-sm font-bold truncate">
                          {project.title}
                        </div>
                        <div
                          className={`text-[11px] font-mono truncate mt-0.5 ${
                            isSelected
                              ? isNight
                                ? 'text-[#80ed99]'
                                : 'text-[#1b4332]'
                              : 'opacity-70'
                          }`}
                        >
                          {project.role}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {project.demoUrl ? (
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                            isNight
                              ? 'bg-[#152119] border-[#1f2d24] text-[#80ed99]'
                              : 'bg-[#ebf2ec] border-[#e4ded5] text-[#1b4332]'
                          }`}
                        >
                          <ExternalLink className="w-2.5 h-2.5" />
                          <span>Live Demo</span>
                        </span>
                      ) : project.isPrivateRepo ? (
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                            isNight
                              ? 'bg-[#16221a] border-[#1f2d24] text-[#95a499]'
                              : 'bg-[#f4f1ea] border-[#e4ded5] text-[#48564c]'
                          }`}
                        >
                          <Lock className="w-2.5 h-2.5 opacity-70" />
                          <span>Repo privat</span>
                        </span>
                      ) : project.githubUrl ? (
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                            isNight
                              ? 'bg-[#152119] border-[#1f2d24] text-[#80ed99]'
                              : 'bg-[#ebf2ec]/80 border-[#e4ded5] text-[#1b4332]'
                          }`}
                        >
                          <Code2 className="w-2.5 h-2.5" />
                          <span>Open Source</span>
                        </span>
                      ) : (
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                            isNight
                              ? 'bg-[#16221a] border-[#1f2d24] text-[#95a499]'
                              : 'bg-[#f4f1ea] border-[#e4ded5] text-[#48564c]'
                          }`}
                        >
                          <span>Studi Kasus</span>
                        </span>
                      )}

                      <ChevronRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isSelected
                            ? 'translate-x-0.5'
                            : 'opacity-40 group-hover:translate-x-0.5 group-hover:opacity-80'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Fade Gradient Indicator & Subtle Scroll Hint (when more items below) */}
            <div
              className={`absolute bottom-0 inset-x-0 h-10 pointer-events-none z-10 transition-opacity duration-300 rounded-b-2xl flex items-end justify-center pb-1 ${
                canScrollDown ? 'opacity-100' : 'opacity-0'
              } ${
                isNight
                  ? 'bg-gradient-to-t from-[#090f0c] via-[#090f0c]/80 to-transparent'
                  : 'bg-gradient-to-t from-[#fbfaf6] via-[#fbfaf6]/80 to-transparent'
              }`}
            >
              <div
                className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border shadow-sm flex items-center gap-1 animate-pulse pointer-events-auto cursor-pointer ${
                  isNight
                    ? 'bg-[#152119] border-[#1f2d24] text-[#80ed99]'
                    : 'bg-white border-[#e4ded5] text-[#1b4332]'
                }`}
                onClick={() => {
                  listContainerRef.current?.scrollBy({ top: 160, behavior: 'smooth' });
                }}
              >
                <span>Gulir untuk {filteredProjects.length - activeIndex - 1 > 0 ? `${filteredProjects.length - activeIndex - 1} proyek lainnya` : 'lainnya'}</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>
          </div>
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
                  ? 'bg-[#111a14] border-[#1f2d24] shadow-2xl shadow-black/40'
                  : 'bg-white border-[#e4ded5] shadow-lg shadow-black/5'
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
                        ? 'bg-[#17231c] border-[#1f2d24] text-[#80ed99]'
                        : 'bg-[#ebf2ec] border-[#e4ded5] text-[#1b4332]'
                    }`}
                  >
                    {activeProject.role}
                  </span>
                </div>
                <p
                  className={`text-xs font-mono font-semibold ${
                    isNight ? 'text-[#80ed99]' : 'text-[#2d6a4f]'
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
                        ? 'bg-[#152119] border-[#1f2d24] text-[#f5f7f4]'
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
                  isNight ? 'border-[#1f2d24]' : 'border-[#e4ded5]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelectProject(activeProject)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-sm active:scale-95 ${
                    isNight
                      ? 'bg-[#80ed99] hover:bg-[#6fdc88] text-[#090f0c]'
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
                        ? 'bg-[#152119] border-[#1f2d24] text-[#80ed99] hover:bg-[#1a2a20]'
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
