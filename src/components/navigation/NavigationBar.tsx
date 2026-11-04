import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Menu, X, Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useClipboard } from '../../hooks/useClipboard';
import { profileData } from '../../data/portfolioData';
import { BrandLogo } from '../common/BrandLogo';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

export const NavigationBar: React.FC = () => {
  const { isScrolled, scrollToSection } = useScrollPosition();
  const { copied, copy } = useClipboard();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  const {
    atmosphere,
    toggleAtmosphere,
    isSoundEnabled,
    toggleSound,
    playBambooTone
  } = useVillageAtmosphere();

  const navItems = [
    { label: 'Profil', id: 'about' },
    { label: 'Studi Kasus', id: 'projects' },
    { label: 'Tech Stack', id: 'stack' },
    { label: 'Aktivitas', id: 'activity' },
    { label: 'Milestone', id: 'journey' },
    { label: 'Sertifikasi', id: 'certificates' },
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

  const handleNavClick = (id: string, index = 0) => {
    isManualClickRef.current = true;
    setActiveSection(id);
    updatePill(id);
    scrollToSection(id);
    setMobileMenuOpen(false);

    // Pentatonic chime note on every click (Da-Mi-Na-Ti-La scale)
    const pitches = [440, 495, 550, 660, 770, 880, 990];
    playBambooTone(pitches[index % pitches.length] || 520);

    if (manualClickTimerRef.current) clearTimeout(manualClickTimerRef.current);
    manualClickTimerRef.current = setTimeout(() => {
      isManualClickRef.current = false;
    }, 850);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#151210]/92 backdrop-blur-2xl border-b border-amber-500/20 py-2.5 sm:py-3 shadow-[0_10px_35px_rgba(0,0,0,0.55)]'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => {
            playBambooTone(660);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-left group cursor-pointer shrink-0"
        >
          <BrandLogo size="md" withText />
        </button>

        {/* Center Nav Menu: Warm Obsidian & Amber Glass Pill */}
        <nav className="hidden lg:flex items-center relative bg-[#1c1815]/85 hover:bg-[#1c1815]/95 border border-amber-500/25 p-1 rounded-full backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-all">
          {pillStyle.width > 0 && (
            <div
              className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-amber-500/25 via-amber-400/20 to-amber-500/25 border border-amber-400/40 shadow-[0_0_16px_rgba(245,158,11,0.25)] pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                left: `${pillStyle.left}px`,
                width: `${pillStyle.width}px`
              }}
            />
          )}

          {navItems.map((item, idx) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[item.id] = el;
                }}
                type="button"
                onClick={() => handleNavClick(item.id, idx)}
                className={`relative z-10 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? 'text-amber-100 font-semibold drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]'
                    : 'text-stone-300 hover:text-amber-200'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls Dock (Atmosphere, Audio, Email) */}
        <div className="hidden md:flex items-center gap-1.5 bg-[#1c1815]/85 border border-amber-500/25 p-1 rounded-full backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.35)] shrink-0">
          {/* Atmosphere Toggle: Sunset vs Starry Night */}
          <button
            type="button"
            onClick={toggleAtmosphere}
            className="p-2 rounded-full text-stone-300 hover:text-amber-300 hover:bg-amber-500/15 transition-all cursor-pointer group active:scale-95"
            title={atmosphere === 'sunset' ? 'Beralih ke Suasana Malam Berkunang-kunang' : 'Beralih ke Suasana Senja Sawah'}
            aria-label="Toggle Atmosphere"
          >
            {atmosphere === 'sunset' ? (
              <Moon className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform" />
            )}
          </button>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className={`p-2 rounded-full transition-all cursor-pointer active:scale-95 ${
              isSoundEnabled
                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
            }`}
            title={isSoundEnabled ? 'Matikan Suara Alam Pedesaan' : 'Aktifkan Suara Alam Pedesaan & Denting Angklung'}
            aria-label="Toggle Sound"
          >
            {isSoundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          <div className="w-[1px] h-4 bg-amber-500/20 mx-0.5" />

          {/* Email Copy Pill */}
          <button
            type="button"
            onClick={() => {
              playBambooTone(600);
              copy(profileData.contact.email);
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs text-amber-100 transition-all cursor-pointer active:scale-95"
            title="Salin alamat email"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 font-semibold">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-6 transition-transform" />
                <span className="font-medium tracking-tight">{profileData.contact.email}</span>
              </>
            )}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-1.5 bg-[#1c1815]/85 border border-amber-500/25 p-1 rounded-full backdrop-blur-xl shadow-md">
          {/* Atmosphere Toggle Mobile */}
          <button
            type="button"
            onClick={toggleAtmosphere}
            className="p-2 rounded-full text-stone-300 hover:text-amber-300 hover:bg-amber-500/15 active:scale-95 transition-all"
            aria-label="Toggle Atmosphere"
            title={atmosphere === 'sunset' ? 'Mode Malam Berkunang-kunang' : 'Mode Senja'}
          >
            {atmosphere === 'sunset' ? (
              <Moon className="w-4 h-4 text-amber-200" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Sound Toggle Mobile */}
          <button
            type="button"
            onClick={toggleSound}
            className={`p-2 rounded-full active:scale-95 transition-all ${
              isSoundEnabled
                ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40'
                : 'text-stone-400 hover:text-stone-200'
            }`}
            aria-label="Toggle Sound"
            title={isSoundEnabled ? 'Matikan Suara' : 'Aktifkan Suara Alam'}
          >
            {isSoundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Copy Email Mobile */}
          <button
            type="button"
            onClick={() => {
              playBambooTone(600);
              copy(profileData.contact.email);
            }}
            className="p-2 rounded-full text-stone-300 hover:text-amber-300 hover:bg-amber-500/15 active:scale-95 transition-all"
            aria-label="Salin email"
            title="Salin email"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Copy className="w-4 h-4 text-amber-300" />
            )}
          </button>

          <div className="w-[1px] h-4 bg-amber-500/20 mx-0.5" />

          {/* Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => {
              playBambooTone(480);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-full text-stone-200 hover:text-amber-200 hover:bg-amber-500/15 active:scale-95 transition-all"
            aria-label="Buka menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#181411]/98 backdrop-blur-2xl border-b border-amber-500/25 px-5 py-4 mt-2 shadow-[0_12px_32px_rgba(0,0,0,0.65)]"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id, idx)}
                    className={`w-full text-left py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-200 font-bold border-l-2 border-amber-400'
                        : 'text-stone-300 hover:text-amber-200 hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
