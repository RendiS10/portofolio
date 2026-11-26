import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Menu, X, Volume2, VolumeX, Moon, Sun, ArrowUpRight, MessageCircle, ArrowRight } from 'lucide-react';
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
    { label: 'Profil', fullLabel: 'Profil & Rekayasa', id: 'about', index: '01' },
    { label: 'Proyek', fullLabel: 'Proyek Unggulan', id: 'projects', index: '02' },
    { label: 'Tech Stack', fullLabel: 'Arsitektur & Stack', id: 'stack', index: '03' },
    { label: 'Aktivitas', fullLabel: 'Kalender Kontribusi', id: 'activity', index: '04' },
    { label: 'Milestone', fullLabel: 'Rekam Jejak Milestone', id: 'journey', index: '05' },
    { label: 'Sertifikasi', fullLabel: 'Kredensial & Sertifikasi', id: 'certificates', index: '06' },
    { label: 'Kontak', fullLabel: 'Ruang Diskusi & Kontak', id: 'contact', index: '07' },
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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? isNight
            ? 'bg-[#090f0c]/90 backdrop-blur-2xl border-b border-emerald-950/60 py-2.5 sm:py-3 shadow-lg shadow-black/40'
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
            className={`hidden lg:flex items-center relative p-1 rounded-full backdrop-blur-xl transition-all ${isNight
              ? 'bg-[#0f1713]/85 hover:bg-[#132019]/90 border border-emerald-950/50 shadow-md'
              : 'bg-[#fffdf5]/90 hover:bg-[#fffdf5] border border-stone-300/80 shadow-[0_4px_20px_rgba(0,0,0,0.08)]'
              }`}
          >
            {pillStyle.width > 0 && (
              <div
                className={`absolute top-1 bottom-1 rounded-full pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isNight
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
                  className={`relative z-10 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer select-none ${isActive
                    ? isNight
                      ? 'text-[#80ed99] font-bold'
                      : 'text-[#14532d] font-bold'
                    : isNight
                      ? 'text-stone-400 hover:text-stone-200'
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
            className={`hidden lg:flex items-center gap-1.5 p-1 rounded-full backdrop-blur-xl shrink-0 transition-all ${isNight
              ? 'bg-[#0f1713]/85 border border-emerald-950/50 shadow-md'
              : 'bg-[#fffdf5]/90 border border-stone-300/80 shadow-md'
              }`}
          >
            {/* Atmosphere Toggle */}
            <button
              type="button"
              onClick={toggleAtmosphere}
              className={`p-2 rounded-full transition-all cursor-pointer group active:scale-95 ${isNight
                ? 'text-stone-300 hover:text-[#80ed99] hover:bg-emerald-500/10'
                : 'text-stone-700 hover:text-emerald-700 hover:bg-emerald-50'
                }`}
              title={atmosphere === 'sunset' ? 'Beralih ke Malam Berkunang-kunang' : 'Beralih ke Pagi Sawah Cerah'}
              aria-label="Toggle Atmosphere"
            >
              {atmosphere === 'sunset' ? (
                <Sun className="w-4 h-4 text-emerald-500 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-[#80ed99] group-hover:rotate-12 transition-transform" />
              )}
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className={`p-2 rounded-full transition-all cursor-pointer active:scale-95 ${isSoundEnabled
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

            <div className={`w-[1px] h-4 mx-0.5 ${isNight ? 'bg-emerald-950/60' : 'bg-stone-300'}`} />

            {/* Email Copy Pill */}
            <button
              type="button"
              onClick={() => {
                playBambooTone(600);
                copy(profileData.contact.email);
              }}
              className={`flex items-center gap-2 px-3 py-1.5 min-w-[135px] justify-center rounded-full border text-xs transition-all cursor-pointer active:scale-95 ${isNight
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
                  <Copy className={`w-3.5 h-3.5 transition-transform group-hover:rotate-6 ${isNight ? 'text-[#80ed99]' : 'text-emerald-700'}`} />
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
              className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all active:scale-95 cursor-pointer ${isNight
                ? 'bg-[#0f1713]/90 border-emerald-950/60 text-emerald-400 shadow-sm'
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
              className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all active:scale-95 cursor-pointer ${mobileMenuOpen
                ? isNight
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                  : 'bg-emerald-100 border-emerald-500 text-emerald-800'
                : isNight
                  ? 'bg-[#0f1713]/90 border-emerald-950/60 text-stone-200 shadow-sm'
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

      {/* Fullscreen Architectural Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:hidden fixed top-[60px] sm:top-[68px] inset-x-0 bottom-0 z-40 flex flex-col justify-between overflow-y-auto backdrop-blur-2xl transition-colors duration-300 ${isNight
              ? 'bg-[#090f0c]/98 text-stone-200 border-t border-emerald-950/60'
              : 'bg-[#fffdf5]/98 text-stone-900 border-t border-stone-200'
              }`}
          >
            {/* Navigation Links Area */}
            <div className="max-w-lg w-full mx-auto px-6 pt-6 pb-4 flex flex-col">
              {/* Header Kicker */}
              <div className="flex items-center justify-between pb-4 mb-2 border-b border-emerald-950/30 dark:border-emerald-950/50">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className={`text-[10px] font-mono font-bold tracking-[0.25em] uppercase ${isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'
                    }`}>
                    DIREKTORI // RENDI SUTENDI
                  </span>
                </div>
                <span className={`text-[10px] font-mono ${isNight ? 'text-stone-500' : 'text-stone-400'}`}>
                  7 BAGIAN
                </span>
              </div>

              {/* Menu items */}
              <nav className="flex flex-col divide-y divide-stone-200/50 dark:divide-emerald-950/30">
                {navItems.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.025 + 0.04, duration: 0.18 }}
                      type="button"
                      onClick={() => handleNavClick(item.id, idx)}
                      className={`w-full py-3.5 flex items-center justify-between text-left group transition-all duration-200 cursor-pointer ${isActive
                        ? isNight
                          ? 'text-[#80ed99]'
                          : 'text-[#1b4332]'
                        : isNight
                          ? 'text-stone-300 hover:text-white'
                          : 'text-stone-700 hover:text-stone-950'
                        }`}
                    >
                      <div className="flex items-baseline gap-3.5 min-w-0">
                        <span className={`text-xs font-mono font-semibold tracking-wider shrink-0 transition-colors ${isActive
                          ? isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'
                          : isNight ? 'text-stone-500 group-hover:text-stone-300' : 'text-stone-400 group-hover:text-stone-600'
                          }`}>
                          {item.index}
                        </span>
                        <span className={`text-lg sm:text-xl tracking-tight transition-all truncate ${isActive ? 'font-bold' : 'font-medium group-hover:translate-x-1'
                          }`}>
                          {item.fullLabel}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isActive ? (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${isNight
                            ? 'bg-emerald-500/15 border-emerald-500/30 text-[#80ed99]'
                            : 'bg-[#ebf2ec] border-emerald-200 text-[#1b4332]'
                            }`}>
                            Aktif
                          </span>
                        ) : (
                          <ArrowRight className={`w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0 transition-all ${isNight ? 'text-stone-400' : 'text-stone-500'
                            }`} />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Utilities Footer */}
            <div className={`mt-auto border-t transition-colors duration-300 ${isNight ? 'border-emerald-950/60 bg-[#060a08]/80' : 'border-stone-200 bg-[#f7f5ed]/80'
              }`}>
              <div className="max-w-lg w-full mx-auto p-5 sm:p-6 space-y-3.5">
                {/* Atmosphere & Sound in 1 sleek row */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      playBambooTone(isSoundEnabled ? 350 : 600);
                      toggleSound();
                    }}
                    className={`px-3 py-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-mono font-medium transition-all active:scale-[0.98] cursor-pointer ${isSoundEnabled
                      ? isNight
                        ? 'bg-emerald-500/15 border-emerald-500/30 text-[#80ed99]'
                        : 'bg-[#ebf2ec] border-emerald-200 text-[#1b4332]'
                      : isNight
                        ? 'bg-[#0f1713] border-emerald-950/50 text-stone-400 hover:text-stone-200'
                        : 'bg-white border-stone-200 text-stone-600 hover:text-stone-800'
                      }`}
                  >
                    {isSoundEnabled ? (
                      <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5 opacity-60" />
                    )}
                    <span>{isSoundEnabled ? 'Suara: On' : 'Suara: Off'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={toggleAtmosphere}
                    className={`px-3 py-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-mono font-medium transition-all active:scale-[0.98] cursor-pointer ${isNight
                      ? 'bg-[#0f1713] border-emerald-950/50 text-stone-300 hover:text-white'
                      : 'bg-white border-stone-200 text-stone-700 hover:text-stone-900'
                      }`}
                  >
                    {atmosphere === 'sunset' ? (
                      <>
                        <Sun className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Mode Pagi</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5 text-[#80ed99]" />
                        <span>Mode Malam</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Direct Action Row: Email & WhatsApp */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      playBambooTone(600);
                      copy(profileData.contact.email);
                    }}
                    className={`px-3 py-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-mono font-medium transition-all active:scale-[0.98] cursor-pointer ${copied
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-[#80ed99]'
                      : isNight
                        ? 'bg-[#0f1713] border-emerald-950/50 text-stone-300 hover:text-white'
                        : 'bg-white border-stone-200 text-stone-700 hover:text-stone-900'
                      }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Salin Email</span>
                      </>
                    )}
                  </button>

                  <a
                    href={profileData.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`px-3 py-2.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-mono font-medium transition-all active:scale-[0.98] ${isNight
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-[#80ed99] hover:bg-emerald-500/20'
                      : 'bg-[#1b4332] border-[#1b4332] text-white hover:bg-[#2d6a4f]'
                      }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                </div>

                {/* Metadata status footer */}
                <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-stone-500 dark:text-stone-400">
                  <span>Bandung, ID (WIB)</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Open for Roles</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
