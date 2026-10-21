import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrandLogo } from '../common/BrandLogo';
import { profileData } from '../../data/portfolioData';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

// Fireflies (Kunang-kunang sawah) that softly float and pulse in the warm sunset breeze
const FIREFLIES = [
  { id: 1, x: '12%', y: '25%', size: 4, dur: 3.2, delay: 0.1 },
  { id: 2, x: '28%', y: '65%', size: 6, dur: 2.8, delay: 0.3 },
  { id: 3, x: '42%', y: '18%', size: 5, dur: 3.6, delay: 0.5 },
  { id: 4, x: '68%', y: '32%', size: 4, dur: 3.0, delay: 0.2 },
  { id: 5, x: '82%', y: '70%', size: 6, dur: 3.4, delay: 0.4 },
  { id: 6, x: '88%', y: '22%', size: 5, dur: 2.6, delay: 0.6 },
  { id: 7, x: '20%', y: '45%', size: 4, dur: 3.8, delay: 0.7 },
  { id: 8, x: '75%', y: '55%', size: 5, dur: 2.9, delay: 0.3 },
  { id: 9, x: '55%', y: '78%', size: 4, dur: 3.1, delay: 0.8 },
  { id: 10, x: '35%', y: '85%', size: 5, dur: 3.5, delay: 0.5 },
  { id: 11, x: '62%', y: '15%', size: 4, dur: 2.7, delay: 0.2 },
  { id: 12, x: '15%', y: '78%', size: 6, dur: 3.3, delay: 0.9 },
];

// Floating leaves drifting in the sunset breeze
const FLOATING_LEAVES = [
  { id: 1, startX: '8%', endX: '18%', startY: '95vh', endY: '-15vh', rot: 140, dur: 2.8, delay: 0.1, size: 22 },
  { id: 2, startX: '24%', endX: '36%', startY: '100vh', endY: '-10vh', rot: -180, dur: 3.2, delay: 0.3, size: 26 },
  { id: 3, startX: '48%', endX: '58%', startY: '98vh', endY: '-20vh', rot: 210, dur: 2.9, delay: 0.2, size: 20 },
  { id: 4, startX: '72%', endX: '84%', startY: '96vh', endY: '-15vh', rot: -160, dur: 3.1, delay: 0.4, size: 24 },
  { id: 5, startX: '88%', endX: '95%', startY: '100vh', endY: '-10vh', rot: 190, dur: 3.4, delay: 0.5, size: 22 },
  { id: 6, startX: '38%', endX: '46%', startY: '95vh', endY: '-18vh', rot: -220, dur: 2.7, delay: 0.6, size: 28 },
];

export const WelcomeAnimation: React.FC<WelcomeAnimationProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'rise' | 'bloom' | 'fade' | 'done'>('rise');

  useEffect(() => {
    const t1 = setTimeout(() => {
      setPhase('bloom');
    }, 1000);

    const t2 = setTimeout(() => {
      setPhase('fade');
    }, 2200);

    const t3 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 2850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === 'fade' ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 overflow-hidden pointer-events-auto select-none bg-[#1c1917]"
      >
        {/* Sunset Terrace Layer 1 (Warm Terracotta & Dusk) */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gradient-to-t from-[#29170e] via-[#451e10] to-[#782d11]"
        >
          <div className="absolute -top-24 inset-x-0 h-24">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0 60 C340 10, 680 90, 1020 30 C1220 70, 1360 20, 1440 50 L1440 120 L0 120 Z"
                fill="#782d11"
              />
            </svg>
          </div>
        </motion.div>

        {/* Sunset Terrace Layer 2 (Golden Amber & Olive Terrace) */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 1.1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gradient-to-t from-[#361d0f] via-[#782d11] to-[#b45309]"
        >
          <div className="absolute -top-28 inset-x-0 h-28">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              {/* Rice Terrace Silhouette */}
              <path
                d="M0 45 C320 85, 640 15, 960 65 C1180 15, 1340 55, 1440 35 L1440 120 L0 120 Z"
                fill="#b45309"
              />
              {/* Golden Sunset Ridge Line */}
              <path
                d="M0 45 C320 85, 640 15, 960 65 C1180 15, 1340 55, 1440 35"
                stroke="#fbbf24"
                strokeWidth="2.5"
                strokeOpacity="0.85"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* Sunset Terrace Layer 3 (Sun-kissed Golden Horizon) */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 1.25, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 bg-gradient-to-b from-[#1c1917]/95 via-[#381c12]/90 to-[#b45309]/80"
        >
          <div className="absolute -top-32 inset-x-0 h-32">
            <svg
              viewBox="0 0 1440 140"
              fill="none"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0 60 C380 15, 760 95, 1140 35 C1280 65, 1380 25, 1440 50 L1440 140 L0 140 Z"
                fill="#1c1917"
              />
              <path
                d="M0 60 C380 15, 760 95, 1140 35 C1280 65, 1380 25, 1440 50"
                stroke="#f59e0b"
                strokeWidth="2.2"
                strokeOpacity="0.75"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </motion.div>

        {/* Atmosphere: Warm Golden Sunset Sunbeam & Evening Mist */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,158,11,0.28),_transparent_70%)]" />
          <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#d97706]/15 via-transparent to-transparent" />
        </div>

        {/* Golden Fireflies (Kunang-Kunang Senja) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {FIREFLIES.map((f) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{
                opacity: [0.2, 0.95, 0.4, 1, 0.3],
                scale: [0.8, 1.3, 0.9, 1.35, 0.8],
                x: [0, 14, -10, 8, 0],
                y: [0, -12, -22, -8, 0],
              }}
              transition={{
                duration: f.dur,
                delay: f.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                left: f.x,
                top: f.y,
                width: f.size,
                height: f.size,
              }}
              className="absolute rounded-full bg-[#fde047] shadow-[0_0_12px_#fde047,0_0_24px_rgba(253,224,71,0.7)]"
            />
          ))}
        </div>

        {/* Floating Leaves in the Golden Sunset Wind */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {FLOATING_LEAVES.map((leaf) => (
            <motion.div
              key={leaf.id}
              initial={{
                x: leaf.startX,
                y: leaf.startY,
                opacity: 0,
                rotate: 0,
              }}
              animate={{
                x: leaf.endX,
                y: leaf.endY,
                opacity: [0, 0.8, 0.9, 0],
                rotate: leaf.rot,
              }}
              transition={{
                duration: leaf.dur,
                delay: leaf.delay,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className="absolute select-none pointer-events-none"
            >
              <svg
                width={leaf.size}
                height={leaf.size}
                viewBox="0 0 24 24"
                fill="none"
                className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)] opacity-80"
              >
                <path
                  d="M17 3C16.5 4.5 15.5 6.5 17 8C8 10 5 16 5 21C10 21 16 18 18 9C18.5 6.5 17.5 4 17 3Z"
                  fill="url(#sunsetLeafGrad)"
                />
                <path
                  d="M7 19C10 16 13 13 17 9"
                  stroke="#78350f"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="sunsetLeafGrad" x1="5" y1="3" x2="18" y2="21">
                    <stop offset="0%" stopColor="#fde047" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Center Content: Monogram Logo, Title & Progress Bar */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{
              opacity: phase === 'bloom' ? 1 : phase === 'fade' ? 0 : 0,
              scale: phase === 'bloom' ? 1 : phase === 'fade' ? 1.08 : 0.85,
              y: phase === 'bloom' ? 0 : phase === 'fade' ? -20 : 20,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* The Brand Monogram Logo with Gentle Hover-Levitation */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
              className="mb-6 drop-shadow-[0_8px_30px_rgba(245,158,11,0.35)]"
            >
              <BrandLogo size="xl" />
            </motion.div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-widest uppercase drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
              {profileData.name.toUpperCase()}
            </h1>

            <div className="mt-3.5 flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest text-[#fef3c7] uppercase drop-shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fde047] shadow-[0_0_8px_#fde047]" />
              <span>Menyusuri Senja di Lanskap Portofolio</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#fde047] shadow-[0_0_8px_#fde047]" />
            </div>

            {/* Organic Progress Track (Golden Sunset Ray) */}
            <div className="mt-7 w-52 sm:w-64 h-1.5 rounded-full bg-white/15 overflow-hidden border border-white/20 backdrop-blur-sm shadow-inner">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: phase === 'bloom' || phase === 'fade' ? '100%' : '0%' }}
                transition={{ duration: 1.25, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#fef08a] rounded-full shadow-[0_0_12px_#f59e0b]"
              />
            </div>
          </motion.div>
        </div>

        {/* Skip button with elegant warm glass styling */}
        <button
          type="button"
          onClick={onComplete}
          className="absolute top-6 right-6 z-20 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/25 text-xs text-white/90 font-medium transition-colors backdrop-blur-md cursor-pointer hover:border-[#f59e0b]/60"
        >
          Lewati
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
