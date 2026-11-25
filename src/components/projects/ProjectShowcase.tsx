import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { Project, ProjectCategory } from '../../types/portfolio';
import { projectsData } from '../../data/portfolioData';
import { FlagshipSlideCard } from './FlagshipProjectParallax';
import { FilteredProjectDock } from './FilteredProjectDock';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';
import { ProjectTabs, type ProjectTabItem } from './ProjectTabs';
import { HeadingAccent } from '../common/HeadingAccent';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface ProjectShowcaseProps {
  onOpenProject?: (project: Project) => void;
}

// Urutan tab ditetapkan eksplisit agar tidak bergantung pada urutan array data.
const FLAGSHIP_ORDER = ['abbygail', 'holycat', 'holycat-scrm'];

// Judul tab lebih ringkas daripada judul proyek di data.
const TAB_TITLES: Record<string, string> = {
  abbygail: 'Abby & Gail Skincare',
  holycat: 'HolyCat Storefront',
  'holycat-scrm': 'HolyCat Sales CRM (SCRM)'
};

const CATALOG_TAB_ID = 'catalog';

const getHost = (url?: string) => (url ? new URL(url).host : undefined);

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onOpenProject }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [localActiveProject, setLocalActiveProject] = useState<Project | null>(null);

  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';
  const reduceMotion = useReducedMotion();
  const offsetY = reduceMotion ? 0 : 12;

  const handleSelect = onOpenProject || setLocalActiveProject;
  const activeProject = onOpenProject ? null : localActiveProject;

  const rank = (id: string) => {
    const idx = FLAGSHIP_ORDER.indexOf(id);
    return idx === -1 ? FLAGSHIP_ORDER.length : idx;
  };
  const flagshipProjects = projectsData
    .filter((p) => p.featured)
    .sort((a, b) => rank(a.id) - rank(b.id));
  const catalogProjects = projectsData.filter((p) => !p.featured);

  const tabs: ProjectTabItem[] = [
    ...flagshipProjects.map((p) => ({
      id: p.id,
      title: TAB_TITLES[p.id] ?? p.title,
      subtitle: getHost(p.demoUrl) ?? p.role
    })),
    {
      id: CATALOG_TAB_ID,
      title: 'Proyek Lainnya',
      subtitle: `${catalogProjects.length} proyek`
    }
  ];

  const isFlagshipTab = activeTab < flagshipProjects.length;
  const activeTabId = tabs[activeTab].id;
  const flagship = isFlagshipTab ? flagshipProjects[activeTab] : null;

  return (
    <section
      id="projects"
      className={`relative pt-16 pb-20 sm:pt-24 sm:pb-28 transition-colors duration-500 ${
        isNight ? 'bg-[#090f0c] text-[#f5f7f4]' : 'bg-[#fbfaf6] text-[#151e17]'
      }`}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <header className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            Proyek Unggulan
          </h2>
          <HeadingAccent />
          <p className={`mt-3 text-base leading-relaxed ${isNight ? 'text-[#95a499]' : 'text-[#48564c]'}`}>
            Sistem yang saya bangun di Holycatlabs dan proyek komersial lainnya: e-commerce, CRM penjualan, dan aplikasi mobile.
          </p>
        </header>

        <div className="mt-8 sm:mt-10">
          <ProjectTabs tabs={tabs} activeIndex={activeTab} onChange={setActiveTab} isNight={isNight} />
        </div>

        <div
          role="tabpanel"
          id={`project-panel-${activeTabId}`}
          aria-labelledby={`project-tab-${activeTabId}`}
          className="mt-6 sm:mt-8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTabId}
              initial={{ opacity: 0, y: offsetY }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -offsetY }}
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}
            >
              {flagship ? (
                <FlagshipSlideCard project={flagship} onSelectProject={handleSelect} />
              ) : (
                <FilteredProjectDock
                  projects={catalogProjects}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  onSelectProject={handleSelect}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

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
