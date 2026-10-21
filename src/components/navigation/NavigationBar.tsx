import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Menu, X } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useClipboard } from '../../hooks/useClipboard';
import { profileData } from '../../data/portfolioData';
import { BrandLogo } from '../common/BrandLogo';

export const NavigationBar: React.FC = () => {
  const { isScrolled, scrollToSection } = useScrollPosition();
  const { copied, copy } = useClipboard();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  const navItems = [
    { label: 'Profil', id: 'about' },
    { label: 'Studi Kasus', id: 'projects' },
    { label: 'Tech Stack', id: 'stack' },
    { label: 'Aktivitas', id: 'activity' },
    { label: 'Milestone', id: 'journey' },
    { label: 'Kontak', id: 'contact' },
  ];

  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number }>({ left: 0, width: 0 });
  const isManualClickRef = useRef<boolean>(false);
  const manualClickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePill = (sectionId: string) => {
    const el = tabRefs.current[sectionId];
    if (el) {
      setPillStyle({
        left: el.offsetLeft,
        width: el.offsetWidth
      });
    }
  };

  useEffect(() => {
    updatePill(activeSection);
  }, [activeSection]);

  useEffect(() => {
    const handleResize = () => updatePill(activeSection);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      if (isManualClickRef.current) return;

      const scrollPosition = window.scrollY + 240;
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;

      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    isManualClickRef.current = true;
    setActiveSection(id);
    updatePill(id);
    scrollToSection(id);
    setMobileMenuOpen(false);

    if (manualClickTimerRef.current) clearTimeout(manualClickTimerRef.current);
    manualClickTimerRef.current = setTimeout(() => {
      isManualClickRef.current = false;
    }, 850);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#171412]/92 backdrop-blur-xl border-b border-[#f59e0b]/30 py-3 shadow-[0_8px_32px_rgba(23,20,18,0.55)]'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 text-left group cursor-pointer"
        >
          <BrandLogo size="md" withText />
        </button>

        <nav className="hidden md:flex items-center relative bg-white/15 hover:bg-white/20 border border-white/30 p-1.5 rounded-full backdrop-blur-xl shadow-[0_4px_24px_rgba(180,83,9,0.25)] transition-all">
          {pillStyle.width > 0 && (
            <div
              className="absolute top-1.5 bottom-1.5 rounded-full bg-white/25 border border-white/40 shadow-inner pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                left: `${pillStyle.left}px`,
                width: `${pillStyle.width}px`
              }}
            >
              <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]" />
            </div>
          )}

          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[item.id] = el;
                }}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="relative z-10 px-4 py-1.5 rounded-full text-sm font-semibold transition-colors cursor-pointer group select-none"
              >
                <span
                  className={`block wave-text-half ${
                    isActive ? 'is-active' : ''
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={() => copy(profileData.contact.email)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 hover:border-[#f59e0b] text-xs font-mono text-white shadow-md transition-all backdrop-blur-xl cursor-pointer group active:scale-95"
            title="Salin email"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#fde047]" />
                <span className="text-[#fde047] font-bold">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#fbbf24] group-hover:rotate-6 transition-transform" />
                <span className="text-white font-medium">{profileData.contact.email}</span>
              </>
            )}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={() => copy(profileData.contact.email)}
            className="p-2.5 rounded-xl bg-white/15 border border-white/30 text-white active:scale-95 transition-transform backdrop-blur-md shadow-sm"
            aria-label="Salin email"
          >
            {copied ? <Check className="w-4 h-4 text-[#fde047]" /> : <Copy className="w-4 h-4 text-[#fde047]" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-white/15 border border-white/30 text-white active:scale-95 transition-transform backdrop-blur-md shadow-sm"
            aria-label="Buka menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1c1815]/98 backdrop-blur-2xl border-b border-[#f59e0b]/30 px-5 py-4 mt-2 shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${activeSection === item.id ? 'bg-[#f59e0b]/20 text-[#fde047] font-bold border-l-2 border-[#fde047]' : 'text-stone-200 hover:text-[#fde047] hover:bg-white/10'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
