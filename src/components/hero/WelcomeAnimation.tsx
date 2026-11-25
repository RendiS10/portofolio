import React, { useCallback, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BrandLogo } from '../common/BrandLogo';
import { profileData } from '../../data/portfolioData';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

const SHOW_MS = 1600;
const FADE_MS = 400;
const REDUCED_MOTION_SHOW_MS = 500;

export const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ onComplete }) => {
  const [leaving, setLeaving] = useState(false);
  const reduceMotion = useReducedMotion();
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  // onComplete harus stabil (useCallback di parent), kalau tidak timer di bawah diulang tiap render.
  const finish = useCallback(() => {
    setLeaving(true);
    window.setTimeout(onComplete, reduceMotion ? 0 : FADE_MS);
  }, [onComplete, reduceMotion]);

  useEffect(() => {
    const timer = window.setTimeout(finish, reduceMotion ? REDUCED_MOTION_SHOW_MS : SHOW_MS);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKey);
    };
  }, [finish, reduceMotion]);

  const surface = isNight ? 'bg-[#0c1510] text-[#f8fafc]' : 'bg-[#f5f3ec] text-[#0f172a]';
  const muted = isNight ? 'text-[#f8fafc]/65' : 'text-[#0f172a]/65';
  const track = isNight ? 'bg-white/15' : 'bg-[#1b4332]/15';
  const fill = isNight ? 'bg-[#80ed99]' : 'bg-[#1b4332]';

  return (
    <div
      role="status"
      aria-label="Memuat portofolio"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center transition-opacity ease-out ${surface} ${
        leaving ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ transitionDuration: reduceMotion ? '0ms' : `${FADE_MS}ms` }}
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        <div className="mb-6">
          <BrandLogo size="xl" />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
          {profileData.name}
        </h1>

        <p className={`mt-3 text-sm sm:text-base ${muted}`}>
          Full-Stack &amp; Mobile Engineer · Bandung
        </p>

        <div className={`mt-8 h-0.5 w-48 sm:w-56 overflow-hidden rounded-full ${track}`}>
          <motion.div
            initial={{ width: reduceMotion ? '100%' : '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: SHOW_MS / 1000, ease: 'easeInOut' }}
            className={`h-full ${fill}`}
          />
        </div>
      </motion.div>

      <button
        type="button"
        onClick={finish}
        className={`absolute top-6 right-6 rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4332] dark:focus-visible:ring-[#80ed99] ${
          isNight
            ? 'border-white/25 text-[#f8fafc] hover:bg-white/10'
            : 'border-[#1b4332]/30 text-[#1b4332] hover:bg-[#1b4332]/10'
        }`}
      >
        Lewati
      </button>
    </div>
  );
};
