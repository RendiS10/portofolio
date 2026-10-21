import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const EGRET_DIALOGUES = [
  'Menatap terasering sawah keemasan dari atas langit sore ~',
  'Semilir angin senja pegunungan sejuk dan damai banget!',
  'Hamparan sawah berkilau disinari cahaya matahari sore!',
  'Burung kuntul meluncur santai di atas perbukitan senja ~',
  'Pemandangan desa asri terlihat begitu hangat dari ketinggian!',
  'Arus angin lembah sore enak banget buat meluncur!',
  'Portofolio Rendi terlihat kokoh dan elegan di bawah sinar senja!'
];

const createShuffledDeck = (items: string[], lastItem?: string): string[] => {
  const deck = [...items];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  if (lastItem && deck[0] === lastItem && deck.length > 1) {
    [deck[0], deck[deck.length - 1]] = [deck[deck.length - 1], deck[0]];
  }
  return deck;
};

const ALTITUDE_ZONES = [
  { min: 10, max: 20 },
  { min: 24, max: 32 },
  { min: 45, max: 55 }
];

export const PaddyFieldEgret: React.FC = () => {
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [altitudePercent, setAltitudePercent] = useState<number>(14);
  const [currentQuip, setCurrentQuip] = useState<string | null>(null);

  const x = useMotionValue(-160);
  const egretRef = useRef<HTMLDivElement | null>(null);

  const deckRef = useRef<string[]>(createShuffledDeck(EGRET_DIALOGUES));
  const lastQuipRef = useRef<string>('');

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    let isVisible = true;

    const flightLoop = (currentTime: number) => {
      if (!isVisible) return;
      const delta = Math.min(0.05, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      const currX = x.get();
      const flightSpeed = 68;
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1400;

      if (direction === 'ltr') {
        const nextX = currX + flightSpeed * delta;
        if (nextX > screenWidth + 160) {
          const nextDir = Math.random() > 0.5 ? 'rtl' : 'ltr';
          const randomZone = ALTITUDE_ZONES[Math.floor(Math.random() * ALTITUDE_ZONES.length)];
          const nextAlt = randomZone.min + Math.random() * (randomZone.max - randomZone.min);

          setDirection(nextDir);
          setAltitudePercent(nextAlt);
          x.set(nextDir === 'rtl' ? screenWidth + 160 : -160);
        } else {
          x.set(nextX);
        }
      } else {
        const nextX = currX - flightSpeed * delta;
        if (nextX < -160) {
          const nextDir = Math.random() > 0.5 ? 'ltr' : 'rtl';
          const randomZone = ALTITUDE_ZONES[Math.floor(Math.random() * ALTITUDE_ZONES.length)];
          const nextAlt = randomZone.min + Math.random() * (randomZone.max - randomZone.min);

          setDirection(nextDir);
          setAltitudePercent(nextAlt);
          x.set(nextDir === 'ltr' ? -160 : screenWidth + 160);
        } else {
          x.set(nextX);
        }
      }

      animId = requestAnimationFrame(flightLoop);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isVisible) {
              isVisible = true;
              lastTime = performance.now();
              animId = requestAnimationFrame(flightLoop);
            }
          } else {
            isVisible = false;
            cancelAnimationFrame(animId);
          }
        });
      },
      { threshold: 0.01 }
    );

    const targetElem = egretRef.current?.parentElement || egretRef.current;
    if (targetElem) {
      observer.observe(targetElem);
    }

    animId = requestAnimationFrame(flightLoop);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [direction, x]);

  useEffect(() => {
    const quipInterval = setInterval(() => {
      if (egretRef.current) {
        const rect = egretRef.current.getBoundingClientRect();
        if (rect.right > 100 && rect.left < window.innerWidth - 100) {
          if (deckRef.current.length === 0) {
            deckRef.current = createShuffledDeck(EGRET_DIALOGUES, lastQuipRef.current);
          }

          const nextQuip = deckRef.current.pop() || EGRET_DIALOGUES[0];
          lastQuipRef.current = nextQuip;
          setCurrentQuip(nextQuip);

          setTimeout(() => {
            setCurrentQuip(null);
          }, 3200);
        }
      }
    }, 8500);

    return () => clearInterval(quipInterval);
  }, []);

  return (
    <motion.div
      ref={egretRef}
      style={{
        x,
        top: `${altitudePercent}%`,
        position: 'absolute',
        pointerEvents: 'none'
      }}
      className="z-20 select-none"
    >
      <div className={`relative ${direction === 'rtl' ? '-scale-x-100' : 'scale-x-100'}`}>
        <motion.div
          animate={{
            y: [0, -10, 3, -8, 0],
            rotate: direction === 'ltr' ? [-1, 2, -1, -2, -1] : [1, -2, 1, 2, 1]
          }}
          transition={{
            repeat: Infinity,
            duration: 2.6,
            ease: 'easeInOut'
          }}
          className="relative"
        >
          {/* Soft Ground Shadow on Lower Ridges */}
          <div className="absolute top-28 left-6 w-14 h-2 bg-[#132a20]/20 rounded-full blur-[3px]" />

          {/* Authentic White Paddy Egret SVG (Bangau Putih Sawah) */}
          <svg
            width="78"
            height="52"
            viewBox="0 0 78 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md"
          >
            {/* Trailing Slender Legs */}
            <path
              d="M18 28 L4 34 M18 29 L2 38"
              stroke="#0f172a"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Yellow Feet Tips */}
            <circle cx="3" cy="35" r="1.2" fill="#FBBF24" />
            <circle cx="1.5" cy="39" r="1.2" fill="#FBBF24" />

            {/* Graceful Aerodynamic Tail Feathers */}
            <path
              d="M16 26 C12 28, 8 30, 6 29 C10 26, 14 25, 18 25 Z"
              fill="#E2E8F0"
              stroke="#CBD5E1"
              strokeWidth="1"
            />

            {/* Slender Body */}
            <path
              d="M18 26 C26 23, 38 23, 46 25 C52 27, 54 25, 56 22 C60 18, 64 16, 68 14 C70 14, 72 16, 68 18 C62 22, 58 26, 52 30 C42 34, 28 34, 18 26 Z"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="1.4"
            />

            {/* Elegant S-Curve Neck & Head */}
            <path
              d="M52 26 C56 20, 60 14, 65 13 C68 12, 70 14, 68 16 C65 19, 61 24, 55 28 Z"
              fill="#FFFFFF"
            />
            <circle cx="66" cy="14" r="3.2" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />

            {/* Long Slender Yellow Beak */}
            <path
              d="M68 13 L78 15 L68 16.5 Z"
              fill="#F59E0B"
              stroke="#D97706"
              strokeWidth="0.8"
            />

            {/* Dark Eye with Warm Yellow Ring */}
            <circle cx="65.5" cy="13.5" r="1.4" fill="#FDE047" />
            <circle cx="65.5" cy="13.5" r="0.9" fill="#0F172A" />

            {/* Flapping Graceful White Wings */}
            <motion.path
              animate={{
                d: [
                  'M32 24 C36 4, 48 -2, 58 2 C48 12, 42 19, 32 24 Z',
                  'M32 24 C36 12, 48 9, 58 12 C48 18, 42 22, 32 24 Z',
                  'M32 24 C36 32, 48 40, 58 37 C48 30, 42 26, 32 24 Z',
                  'M32 24 C36 4, 48 -2, 58 2 C48 12, 42 19, 32 24 Z'
                ]
              }}
              transition={{
                repeat: Infinity,
                duration: 0.75,
                ease: 'easeInOut'
              }}
              fill="#FFFFFF"
              stroke="#CBD5E1"
              strokeWidth="1.4"
            />

            {/* Wing Feather Highlights */}
            <path
              d="M50 4 L58 2 L54 8 Z"
              fill="#F1F5F9"
            />
          </svg>

          {/* Speech Bubble */}
          {currentQuip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.75, y: 6 }}
              className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-2xl bg-[#fffdf5]/95 text-[#2d6a4f] text-xs font-bold shadow-xl border-2 border-[#52b788] whitespace-nowrap backdrop-blur-md flex items-center gap-1.5 ${
                direction === 'rtl' ? '-scale-x-100' : 'scale-x-100'
              }`}
            >
              <span className="drop-shadow-xs">{currentQuip}</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
