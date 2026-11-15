import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
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
    transition: { staggerChildren: 0.12, delayChildren: 0.08 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 24 }
  }
};

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ onOpenProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [localActiveProject, setLocalActiveProject] = useState<Project | null>(null);

  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  const handleSelect = onOpenProject || setLocalActiveProject;
  const activeProject = onOpenProject ? null : localActiveProject;

  // Featured flagship projects (HolyCat Web, HolyCat Mobile, Abby & Gail)
  const flagshipProjects = projectsData.filter((p) => p.featured);

  return (
    <section
      id="projects"
      className={`relative pt-20 pb-24 sm:pt-28 sm:pb-36 transition-colors duration-500 ${
        isNight ? 'bg-[#090f0c] text-[#f5f7f4]' : 'bg-[#fbfaf6] text-[#151e17]'
      }`}
    >
      {/* Background Topographic Watermark */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] dark:opacity-[0.04]">
        <svg viewBox="0 0 1440 1200" fill="none" className="w-full h-full" preserveAspectRatio="none">
          <path d="M-100,200 Q400,350 900,180 T1600,280" stroke="currentColor" strokeWidth="1.5" />
          <path d="M-100,500 Q500,650 1000,420 T1600,580" stroke="currentColor" strokeWidth="1.5" />
          <path d="M-100,800 Q350,980 950,780 T1600,920" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10"
      >
        {/* Section Header */}
        <motion.div
          variants={itemVariants}
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 sm:pb-14 border-b transition-colors duration-500 ${
            isNight ? 'border-emerald-500/15' : 'border-[#e4ded5]'
          }`}
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
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
            Membuktikan keandalan sistem melalui implementasi nyata: ekosistem omnichannel e-commerce HolyCat (3.000+ pengguna), aplikasi mobile Flutter Clean Architecture, dan platform ritel komersial.
          </p>
        </motion.div>

        {/* Flagship Showcases (Natural Vertical Scroll) */}
        <div className="mt-12 sm:mt-16 flex flex-col gap-10 sm:gap-14">
          {flagshipProjects.map((project, idx) => (
            <FlagshipSlideCard
              key={project.id}
              project={project}
              index={idx}
              onSelectProject={handleSelect}
            />
          ))}
        </div>

        {/* Catalog of Other Projects (Integrated Dock) */}
        <div className="mt-20 sm:mt-28 pt-12 sm:pt-16 border-t border-emerald-500/15">
          <FilteredProjectDock
            projects={projectsData}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectProject={handleSelect}
          />
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
