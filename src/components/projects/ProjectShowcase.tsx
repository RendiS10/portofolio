import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Globe, Smartphone, ShoppingBag, FolderGit2 } from 'lucide-react';
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

  // Featured flagship projects (HolyCat Web, HolyCat Mobile, Abby & Gail)
  const flagshipProjects = projectsData.filter((p) => p.featured);

  const tabs = [
    {
      id: 'holycat',
      num: '01',
      title: 'HolyCat Omnichannel',
      subtitle: 'Next.js & NestJS API',
      badge: '3.000+ USER',
      icon: <Globe className="w-3.5 h-3.5" />
    },
    {
      id: 'holycat-mobile',
      num: '02',
      title: 'HolyCat Mobile App',
      subtitle: 'Flutter Clean Arch',
      badge: '60FPS NATIVE',
      icon: <Smartphone className="w-3.5 h-3.5" />
    },
    {
      id: 'abbygail',
      num: '03',
      title: 'Abby & Gail Retail',
      subtitle: 'Next.js & PostgreSQL',
      badge: '2.000+ USER',
      icon: <ShoppingBag className="w-3.5 h-3.5" />
    },
    {
      id: 'catalog',
      num: '04',
      title: 'Katalog Proyek Lain',
      subtitle: 'Eksplorasi Kode',
      badge: '6 PROYEK',
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
                  isNight ? 'text-amber-400' : 'text-[#1b4332]'
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
            Pilih studi kasus di bawah untuk membedah arsitektur e-commerce omnichannel HolyCat (3.000+ pengguna), aplikasi mobile Flutter Clean Architecture, dan platform ritel komersial.
          </p>
        </motion.div>

        {/* Compact Workspace Project Switcher Tabs */}
        <motion.div variants={itemVariants} className="mt-8 sm:mt-10">
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-2.5 p-2 rounded-2xl border transition-colors ${
              isNight ? 'bg-[#111a14] border-emerald-500/20' : 'bg-[#f4f1ea] border-[#e4ded5]'
            }`}
          >
            {tabs.map((tab, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`relative flex flex-col p-3 rounded-xl text-left transition-all cursor-pointer ${
                    isActive
                      ? isNight
                        ? 'bg-emerald-950/80 text-white shadow-sm border border-emerald-500/35'
                        : 'bg-white text-[#151e17] shadow-sm border border-[#1b4332]/40'
                      : isNight
                      ? 'text-stone-400 hover:text-stone-200 hover:bg-[#152119]'
                      : 'text-[#48564c] hover:text-[#151e17] hover:bg-white/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <span
                      className={`text-[10px] font-mono font-bold flex items-center gap-1 ${
                        isActive
                          ? isNight
                            ? 'text-emerald-400'
                            : 'text-[#1b4332]'
                          : 'opacity-60'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.num}</span>
                    </span>

                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full border ${
                        isActive
                          ? isNight
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                            : 'bg-[#ebf2ec] text-[#1b4332] border-emerald-200'
                          : 'opacity-50 border-transparent'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm font-bold tracking-tight truncate">
                    {tab.title}
                  </div>
                  <div className="text-[11px] font-mono opacity-70 truncate mt-0.5">
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
            {activeTab < 3 && flagshipProjects[activeTab] ? (
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
                  projects={projectsData}
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
