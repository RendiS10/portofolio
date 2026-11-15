import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Globe, ShoppingBag, FolderGit2 } from 'lucide-react';
import type { Project, ProjectCategory } from '../../types/portfolio';
import { projectsData } from '../../data/portfolioData';
import { FlagshipSlideCard } from './FlagshipProjectParallax';
import { FilteredProjectDock } from './FilteredProjectDock';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface ProjectShowcaseProps {
  onOpenProject?: (project: Project) => void;
}

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 220, damping: 24 }
  }
};

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onOpenProject }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [localActiveProject, setLocalActiveProject] = useState<Project | null>(null);

  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  const handleSelect = onOpenProject || setLocalActiveProject;
  const activeProject = onOpenProject ? null : localActiveProject;

  // Featured flagship projects: shop.holycatlabs.com & Abby & Gail E-Commerce
  const flagshipProjects = projectsData.filter((p) => p.featured);
  // All other projects: HolyCat Mobile Flutter, MPS Barcode, Contract E-Sign, SCRM, JKT48, etc.
  const catalogProjects = projectsData.filter((p) => !p.featured);

  const tabs = [
    {
      id: 'abbygail',
      num: '01',
      title: 'Abby & Gail Skincare',
      subtitle: 'abbyandgail.com',
      badge: 'KOMERSIAL LIVE',
      tone: 'amber',
      icon: <ShoppingBag className="w-3.5 h-3.5" />
    },
    {
      id: 'holycat',
      num: '02',
      title: 'HolyCat Storefront',
      subtitle: 'shop.holycatlabs.com',
      badge: 'LIVE PRODUKSI',
      tone: 'emerald',
      icon: <Globe className="w-3.5 h-3.5" />
    },
    {
      id: 'catalog',
      num: '03',
      title: 'Katalog Proyek Rekayasa',
      subtitle: 'Mobile Flutter & Internal Systems',
      badge: `${catalogProjects.length} PROYEK`,
      tone: 'stone',
      icon: <FolderGit2 className="w-3.5 h-3.5" />
    }
  ];

  return (
    <section
      id="projects"
      className={`relative pt-16 pb-20 sm:pt-24 sm:pb-28 transition-colors duration-500 ${
        isNight ? 'bg-[#090f0c] text-[#f5f7f4]' : 'bg-[#fbfaf6] text-[#151e17]'
      }`}
    >
      {/* Background Subtle Watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] dark:opacity-[0.04]">
        <svg viewBox="0 0 1440 900" fill="none" className="w-full h-full" preserveAspectRatio="none">
          <path d="M-100,160 Q400,280 900,140 T1600,220" stroke="currentColor" strokeWidth="1.5" />
          <path d="M-100,420 Q500,560 1000,360 T1600,480" stroke="currentColor" strokeWidth="1.5" />
          <path d="M-100,700 Q350,860 950,680 T1600,800" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10"
      >
        {/* Section Header */}
        <motion.div
          variants={itemVariants}
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 sm:pb-10 border-b transition-colors duration-500 ${
            isNight ? 'border-emerald-500/15' : 'border-[#e4ded5]'
          }`}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2.5">
              <span
                className={`text-[11px] font-mono font-bold tracking-[0.28em] uppercase ${
                  isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'
                }`}
              >
                02 // REKAM JEJAK PROYEK &amp; KARYA UNGGULAN
              </span>
              <span className={`w-1.5 h-1.5 rounded-full ${isNight ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.08] font-sans">
              Studi Kasus Rekayasa Skala Produksi
            </h2>
          </div>

          <p
            className={`max-w-md text-xs sm:text-sm leading-relaxed ${
              isNight ? 'text-[#95a499]' : 'text-[#48564c]'
            }`}
          >
            Studi kasus platform e-commerce skala produksi komersial, aplikasi mobile Flutter, dan sistem otomasi operasional internal.
          </p>
        </motion.div>

        {/* Compact Workspace Project Switcher Tabs */}
        <motion.div variants={itemVariants} className="mt-8 sm:mt-10">
          <div
            className={`grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-2xl border transition-all duration-300 ${
              isNight
                ? 'bg-[#111a14] border-stone-800'
                : 'bg-[#f4f1ea] border-[#e4ded5]'
            }`}
          >
            {tabs.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`group relative flex flex-col p-3.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? isNight
                        ? 'bg-[#18261e] text-white shadow-sm border border-emerald-500/30'
                        : 'bg-white text-[#151e17] shadow-sm shadow-stone-900/5 border border-stone-300/80'
                      : isNight
                      ? 'text-stone-400 hover:text-stone-200 hover:bg-[#152119]/60 border border-transparent'
                      : 'text-[#48564c] hover:text-[#151e17] hover:bg-white/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <span
                      className={`text-[11px] font-mono font-bold flex items-center gap-1.5 transition-colors ${
                        isActive
                          ? isNight
                            ? 'text-emerald-400'
                            : 'text-[#1b4332]'
                          : 'opacity-50 group-hover:opacity-80'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.num}</span>
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 text-[9px] font-mono font-semibold px-2 py-0.5 rounded border transition-all ${
                        isActive
                          ? isNight
                            ? 'bg-[#203327] text-emerald-300 border-emerald-500/30'
                            : 'bg-[#ebf2ec] text-[#1b4332] border-[#1b4332]/25'
                          : isNight
                          ? 'bg-transparent text-stone-500 border-stone-800'
                          : 'bg-transparent text-stone-500 border-stone-300/60'
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f] dark:bg-[#52b788]" />
                      )}
                      <span>{tab.badge}</span>
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm font-bold tracking-tight truncate font-sans">
                    {tab.title}
                  </div>
                  <div
                    className={`text-[11px] font-mono truncate mt-0.5 transition-colors ${
                      isActive
                        ? isNight
                          ? 'text-stone-300'
                          : 'text-[#48564c]'
                        : isNight
                        ? 'text-stone-500'
                        : 'text-stone-500'
                    }`}
                  >
                    {tab.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Active Stage Dossier (Unified Single-Height Stage) */}
        <div className="mt-6 sm:mt-8">
          <AnimatePresence mode="wait">
            {activeTab < flagshipProjects.length && flagshipProjects[activeTab] ? (
              <motion.div
                key={flagshipProjects[activeTab].id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <FlagshipSlideCard
                  project={flagshipProjects[activeTab]}
                  index={activeTab}
                  onSelectProject={handleSelect}
                />
              </motion.div>
            ) : (
              <motion.div
                key="catalog-view"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                <FilteredProjectDock
                  projects={catalogProjects}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  onSelectProject={handleSelect}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Case Study Detailed Modal */}
      {activeProject && (
        <ProjectCaseStudyModal
          project={activeProject}
          isOpen={Boolean(activeProject)}
          onClose={() => setLocalActiveProject(null)}
        />
      )}
    </section>
  );
};
