import { useCallback, useState } from 'react';
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
import { SectionDivider } from './components/common/SectionDivider';
import { ScrollProgress } from './components/common/ScrollProgress';
import { AmbientParticles } from './components/common/AmbientParticles';
import { ProjectCaseStudyModal } from './components/projects/ProjectCaseStudyModal';

const WELCOME_SEEN_KEY = 'welcome-seen';

function PortfolioMain() {
  const [showWelcome, setShowWelcome] = useState(() => {
    try {
      return sessionStorage.getItem(WELCOME_SEEN_KEY) !== '1';
    } catch {
      return true;
    }
  });
  const handleWelcomeComplete = useCallback(() => {
    try {
      sessionStorage.setItem(WELCOME_SEEN_KEY, '1');
    } catch {
      // Storage diblokir: layar sambutan tampil lagi di kunjungan berikutnya, tidak fatal.
    }
    setShowWelcome(false);
  }, []);
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const { atmosphere } = useVillageAtmosphere();

  useLenisSmoothScroll();

  return (
    <div
      data-theme={atmosphere}
      className={`min-h-screen transition-colors duration-500 selection:bg-[#1b4332] selection:text-[#fbfaf6] dark:selection:bg-[#80ed99] dark:selection:text-[#090f0c] ${
        atmosphere === 'night' ? 'bg-[#0c1510] text-[#f8fafc]' : 'bg-[#f5f3ec] text-[#0f172a]'
      }`}
    >
      {showWelcome && (
        <WelcomeAnimation onComplete={handleWelcomeComplete} />
      )}

      <ScrollProgress />
      <AmbientParticles />
      <NavigationBar />

      <main className="relative">
        <HeroSection />
        <EditorialProfile />
        <SectionDivider />
        <ProjectShowcase onOpenProject={setActiveModalProject} />
        <SectionDivider />
        <TechGrid onOpenProject={setActiveModalProject} />
        <SectionDivider />
        <GithubActivitySection />
        <SectionDivider />
        <JourneyTimeline />
        <SectionDivider />
        <CertificatesSection />
        <SectionDivider />
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
