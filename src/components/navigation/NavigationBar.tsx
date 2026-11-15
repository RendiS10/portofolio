import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Menu, X, Volume2, VolumeX, Moon, Sun, ArrowUpRight, MessageCircle } from 'lucide-react';
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

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

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
    const handleResize = () => {
      updatePill(activeSection);
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (isManualClickRef.current) return;
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        const scrollPosition = window.scrollY + 240;
        const isAtBottom =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;

        if (isAtBottom) {
          setActiveSection((prev) => (prev !== 'contact' ? 'contact' : prev));
          return;
        }

        for (let i = navItems.length - 1; i >= 0; i--) {
          const item = navItems[i];
          const el = document.getElementById(item.id);
          if (el) {
            const top = el.offsetTop;
            if (scrollPosition >= top) {
              setActiveSection((prev) => (prev !== item.id ? item.id : prev));
              break;
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
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

  const isNight = atmosphere === 'night';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? isNight
              ? 'bg-[#14110f]/90 backdrop-blur-2xl border-b border-amber-500/20 py-2.5 sm:py-3 shadow-[0_10px_35px_rgba(0,0,0,0.55)]'
              : 'bg-[#fffdf5]/92 backdrop-blur-2xl border-b border-stone-300/80 py-2.5 sm:py-3 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
            : 'bg-transparent py-3 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">
          {/* Brand Logo - Responsive with smooth scale */}
          <button
            type="button"
            onClick={() => {
              playBambooTone(660);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 text-left group cursor-pointer shrink-0 min-w-0"
            aria-label="Kembali ke atas"
          >
            <BrandLogo size="md" withText />
          </button>

          {/* Desktop Nav Pill (Only visible on >= 1024px) */}
          <nav
            aria-label="Navigasi Utama"
            className={`hidden lg:flex items-center relative p-1 rounded-full backdrop-blur-xl transition-all ${
              isNight
                ? 'bg-[#1c1815]/85 hover:bg-[#1c1815]/95 border border-amber-500/25 shadow-[0_4px_24px_rgba(0,0,0,0.35)]'
                : 'bg-[#fffdf5]/90 hover:bg-[#fffdf5] border border-stone-300/80 shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
            }`}
          >
            {pillStyle.width > 0 && (
              <div
                className={`absolute top-1 bottom-1 rounded-full pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isNight
                    ? 'bg-emerald-500/20 border border-emerald-400/40 shadow-[0_0_12px_rgba(52,211,153,0.2)]'
                    : 'bg-[#ebf2ec] border border-emerald-300/80 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                }`}
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
                      ? isNight
                        ? 'text-amber-100 font-semibold drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]'
                        : 'text-[#14532d] font-bold'
                      : isNight
                      ? 'text-stone-300 hover:text-amber-200'
                      : 'text-stone-600 hover:text-[#16a34a]'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Desktop Action Controls Dock (Only visible on >= 1024px to prevent duplicate docks on tablet) */}
          <div
            className={`hidden lg:flex items-center gap-1.5 p-1 rounded-full backdrop-blur-xl shrink-0 transition-all ${
              isNight
                ? 'bg-[#1c1815]/85 border border-amber-500/25 shadow-[0_4px_20px_rgba(0,0,0,0.35)]'
                : 'bg-[#fffdf5]/90 border border-stone-300/80 shadow-md'
            }`}
          >
            {/* Atmosphere Toggle */}
            <button
              type="button"
              onClick={toggleAtmosphere}
              className={`p-2 rounded-full transition-all cursor-pointer group active:scale-95 ${
                isNight
                  ? 'text-stone-300 hover:text-amber-300 hover:bg-amber-500/15'
                  : 'text-stone-700 hover:text-amber-600 hover:bg-amber-50'
              }`}
              title={atmosphere === 'sunset' ? 'Beralih ke Malam Berkunang-kunang' : 'Beralih ke Pagi Sawah Cerah'}
              aria-label="Toggle Atmosphere"
            >
              {atmosphere === 'sunset' ? (
                <Sun className="w-4 h-4 text-amber-500 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
              )}
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className={`p-2 rounded-full transition-all cursor-pointer active:scale-95 ${
                isSoundEnabled
                  ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.25)]'
                  : isNight
                  ? 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
                  : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
              }`}
              title={isSoundEnabled ? 'Matikan Suara Pedesaan' : 'Aktifkan Suara Alam Pedesaan'}
              aria-label="Toggle Sound"
            >
              {isSoundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            <div className={`w-[1px] h-4 mx-0.5 ${isNight ? 'bg-amber-500/20' : 'bg-stone-300'}`} />

            {/* Email Copy Pill */}
            <button
              type="button"
              onClick={() => {
                playBambooTone(600);
                copy(profileData.contact.email);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 min-w-[135px] justify-center rounded-full border text-xs transition-all cursor-pointer active:scale-95 ${
                isNight
                  ? 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30 text-emerald-200'
                  : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-[#14532d]'
              }`}
              title="Salin alamat email"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-semibold">Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className={`w-3.5 h-3.5 transition-transform group-hover:rotate-6 ${isNight ? 'text-amber-400' : 'text-emerald-700'}`} />
                  <span className="font-medium tracking-tight">{profileData.contact.email}</span>
                </>
              )}
            </button>
          </div>

          {/* Clean Mobile & Tablet Controls: Standard 44x44px Touch Targets */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            {/* Atmosphere Toggle - 44x44px Target */}
            <button
              type="button"
              onClick={toggleAtmosphere}
              className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all active:scale-95 cursor-pointer ${
                isNight
                  ? 'bg-[#1c1815]/90 border-amber-500/30 text-amber-300 shadow-[0_2px_12px_rgba(0,0,0,0.4)]'
                  : 'bg-[#fffdf5]/95 border-stone-300/90 text-amber-600 shadow-[0_2px_10px_rgba(0,0,0,0.06)]'
              }`}
              aria-label={atmosphere === 'sunset' ? 'Beralih ke Suasana Malam' : 'Beralih ke Suasana Pagi'}
              title={atmosphere === 'sunset' ? 'Mode Malam' : 'Mode Pagi'}
            >
              {atmosphere === 'sunset' ? (
                <Sun className="w-5 h-5 transition-transform" />
              ) : (
                <Moon className="w-5 h-5 transition-transform" />
              )}
            </button>

            {/* Clean Hamburger Menu Toggle - 44x44px Target */}
            <button
              type="button"
              onClick={() => {
                playBambooTone(480);
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all active:scale-95 cursor-pointer ${
                mobileMenuOpen
                  ? isNight
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                    : 'bg-emerald-100 border-emerald-500 text-emerald-800'
                  : isNight
                  ? 'bg-[#1c1815]/90 border-amber-500/30 text-stone-200 shadow-[0_2px_12px_rgba(0,0,0,0.4)]'
                  : 'bg-[#fffdf5]/95 border-stone-300/90 text-stone-800 shadow-[0_2px_10px_rgba(0,0,0,0.06)]'
              }`}
              aria-label={mobileMenuOpen ? 'Tutup navigasi' : 'Buka navigasi'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Expanded Mobile & Tablet Drawer Modal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Scrim with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Drawer Sheet Container */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={`lg:hidden fixed top-[68px] sm:top-[76px] left-3 right-3 sm:left-6 sm:right-6 max-h-[calc(100vh-84px)] overflow-y-auto z-40 rounded-3xl p-5 shadow-2xl border backdrop-blur-2xl transition-all ${
                isNight
                  ? 'bg-[#151210]/98 border-amber-500/30 text-stone-200 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
                  : 'bg-[#fffdf5]/98 border-stone-300 text-stone-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)]'
              }`}
            >
              {/* Primary Navigation Links */}
              <div className="flex flex-col gap-1">
                <span className={`text-[10px] uppercase font-mono font-bold tracking-widest px-3 mb-1.5 ${
                  isNight ? 'text-amber-400/80' : 'text-emerald-700/80'
                }`}>
                  Navigasi Utama
                </span>

                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavClick(item.id, idx)}
                      className={`w-full min-h-[46px] text-left px-4 rounded-xl text-sm font-semibold transition-all flex items-center justify-between active:scale-[0.99] cursor-pointer ${
                        isActive
                          ? isNight
                            ? 'bg-amber-500/15 text-amber-200 font-bold border-l-4 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                            : 'bg-emerald-50 text-emerald-900 font-bold border-l-4 border-emerald-600'
                          : isNight
                          ? 'text-stone-300 hover:text-amber-200 hover:bg-white/5'
                          : 'text-stone-700 hover:text-emerald-800 hover:bg-stone-100/80'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {item.label}
                      </span>
                      {isActive && (
                        <span className={`w-2 h-2 rounded-full ${
                          isNight ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]' : 'bg-emerald-600'
                        }`} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Cultural Utilities & Secondary Actions Section */}
              <div className={`mt-5 pt-4 border-t flex flex-col gap-3 ${
                isNight ? 'border-amber-500/20' : 'border-stone-200'
              }`}>
                <span className={`text-[10px] uppercase font-mono font-bold tracking-widest px-3 ${
                  isNight ? 'text-amber-400/80' : 'text-emerald-700/80'
                }`}>
                  Suasana & Kontak Langsung
                </span>

                {/* Pedesaan Audio Soundscape Toggle Card */}
                <button
                  type="button"
                  onClick={() => {
                    playBambooTone(isSoundEnabled ? 350 : 600);
                    toggleSound();
                  }}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all active:scale-[0.98] cursor-pointer ${
                    isSoundEnabled
                      ? isNight
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                        : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : isNight
                      ? 'bg-stone-900/60 border-stone-800 text-stone-400'
                      : 'bg-stone-100/70 border-stone-200 text-stone-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSoundEnabled
                        ? isNight ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-600 text-white'
                        : isNight ? 'bg-stone-800 text-stone-500' : 'bg-stone-200 text-stone-500'
                    }`}>
                      {isSoundEnabled ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                        <span>Suara Alam Pedesaan</span>
                        {isSoundEnabled && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                            Aktif
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] opacity-75 font-normal mt-0.5">
                        Denting angklung, serangga & angin
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-medium underline opacity-80">
                    {isSoundEnabled ? 'Matikan' : 'Bunyikan'}
                  </span>
                </button>

                {/* Email Direct Quick Copy Card */}
                <button
                  type="button"
                  onClick={() => {
                    playBambooTone(600);
                    copy(profileData.contact.email);
                  }}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all active:scale-[0.98] cursor-pointer ${
                    isNight
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-100 hover:bg-amber-500/15'
                      : 'bg-emerald-50/70 border-emerald-200 text-emerald-950 hover:bg-emerald-100/70'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isNight ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-600 text-white'
                    }`}>
                      {copied ? <Check className="w-5 h-5 text-emerald-300" /> : <Copy className="w-5 h-5" />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] opacity-75 font-normal">
                        {copied ? 'Berhasil Disalin!' : 'Surel / Email'}
                      </div>
                      <div className="text-xs font-mono font-semibold truncate">
                        {profileData.contact.email}
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${
                    copied
                      ? 'bg-emerald-500/20 text-emerald-400 font-bold'
                      : isNight
                      ? 'bg-amber-500/20 text-amber-200'
                      : 'bg-emerald-200/60 text-emerald-800'
                  }`}>
                    {copied ? 'Tersalin' : 'Salin'}
                  </span>
                </button>

                {/* WhatsApp Quick Connect Button */}
                <a
                  href={profileData.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all active:scale-[0.98] ${
                    isNight
                      ? 'bg-stone-900 border-amber-500/20 text-stone-200 hover:bg-stone-800'
                      : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                  <span>Diskusi via WhatsApp</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
