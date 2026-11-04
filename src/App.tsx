import { useState } from 'react';
import type { Project } from './types/portfolio';
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll';
import { VillageAtmosphereProvider, useVillageAtmosphere } from './context/VillageAtmosphereContext';
import { NavigationBar } from './components/navigation/NavigationBar';
import { HeroSection } from './components/hero/HeroSection';
import { WelcomeAnimation } from './components/hero/WelcomeAnimation';
import { EditorialProfile } from './components/profile/EditorialProfile';
import { ProjectShowcase } from './components/projects/ProjectShowcase';
import { TechGrid } from './components/tech/TechGrid';
import { GithubActivitySection } from './components/activity/GithubActivitySection';
import { JourneyTimeline } from './components/journey/JourneyTimeline';
import { CertificatesSection } from './components/credentials/CertificatesSection';
import { ContactSection } from './components/contact/ContactSection';
import { ProjectCaseStudyModal } from './components/projects/ProjectCaseStudyModal';

function PortfolioMain() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const { atmosphere } = useVillageAtmosphere();

  useLenisSmoothScroll();

  return (
    <div
      data-theme={atmosphere}
      className={`min-h-screen transition-colors duration-500 selection:bg-amber-500 selection:text-black ${
        atmosphere === 'night' ? 'bg-[#0c1510] text-[#f8fafc]' : 'bg-[#f5f3ec] text-[#0f172a]'
      }`}
    >
      {showWelcome && (
        <WelcomeAnimation onComplete={() => setShowWelcome(false)} />
      )}

      <NavigationBar />

      <main className="relative">
        <HeroSection />
        <EditorialProfile />
        <ProjectShowcase onOpenProject={setActiveModalProject} />
        <TechGrid onOpenProject={setActiveModalProject} />
        <GithubActivitySection />
        <JourneyTimeline />
        <CertificatesSection />
        <ContactSection />
      </main>

      <ProjectCaseStudyModal
        project={activeModalProject}
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
}

export function App() {
  return (
    <VillageAtmosphereProvider>
      <PortfolioMain />
    </VillageAtmosphereProvider>
  );
}

export default App;
