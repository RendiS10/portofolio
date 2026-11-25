import React from 'react';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface Particle {
  left: number;
  top: number;
  duration: number;
  delay: number;
  size: number;
  tint: number;
}

// Konstanta tetap (bukan Math.random) agar posisi stabil antar render.
const LEAVES: readonly Particle[] = [
  { left: 8, top: 0, duration: 24, delay: 0, size: 14, tint: 0 },
  { left: 24, top: 0, duration: 30, delay: -11, size: 12, tint: 1 },
  { left: 41, top: 0, duration: 20, delay: -5, size: 16, tint: 0 },
  { left: 58, top: 0, duration: 27, delay: -17, size: 13, tint: 1 },
  { left: 74, top: 0, duration: 22, delay: -8, size: 15, tint: 1 },
  { left: 91, top: 0, duration: 18, delay: -14, size: 12, tint: 0 }
];

const FIREFLIES: readonly Particle[] = [
  { left: 10, top: 22, duration: 9, delay: 0, size: 3, tint: 0 },
  { left: 27, top: 64, duration: 12, delay: -4, size: 4, tint: 0 },
  { left: 39, top: 38, duration: 10, delay: -7, size: 3, tint: 0 },
  { left: 52, top: 80, duration: 13, delay: -2, size: 4, tint: 0 },
  { left: 63, top: 18, duration: 11, delay: -9, size: 3, tint: 0 },
  { left: 76, top: 56, duration: 9.5, delay: -5, size: 4, tint: 0 },
  { left: 86, top: 34, duration: 12.5, delay: -11, size: 3, tint: 0 },
  { left: 94, top: 72, duration: 10.5, delay: -1, size: 4, tint: 0 }
];

const LEAF_COLORS = ['#6fa57c', '#8fbf9f'] as const;
const FIREFLY_COLOR = '#fde047';
const FIREFLY_GLOW_PX = 6;

// Elemen genap disembunyikan di HP supaya jumlah partikel separuh.
const visibilityClass = (index: number): string => (index % 2 === 1 ? 'hidden sm:block' : '');

export const AmbientParticles: React.FC = () => {
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  return (
    <div
      aria-hidden="true"
      // z-[30]: di atas section (z-20), di bawah navbar (z-40).
      className="rs-particles fixed inset-0 z-[30] pointer-events-none overflow-hidden opacity-50"
    >
      {isNight
        ? FIREFLIES.map((f, i) => (
            <span
              key={`firefly-${f.left}`}
              className={`rs-firefly absolute rounded-full ${visibilityClass(i)}`}
              style={{
                left: `${f.left}%`,
                top: `${f.top}%`,
                width: f.size,
                height: f.size,
                backgroundColor: FIREFLY_COLOR,
                boxShadow: `0 0 ${FIREFLY_GLOW_PX}px ${FIREFLY_COLOR}`,
                animationDuration: `${f.duration}s`,
                animationDelay: `${f.delay}s`
              }}
            />
          ))
        : LEAVES.map((leaf, i) => (
            <svg
              key={`leaf-${leaf.left}`}
              viewBox="0 0 16 16"
              width={leaf.size}
              height={leaf.size}
              className={`rs-leaf-fall absolute ${visibilityClass(i)}`}
              style={{
                left: `${leaf.left}%`,
                top: `${leaf.top}%`,
                animationDuration: `${leaf.duration}s`,
                animationDelay: `${leaf.delay}s`
              }}
            >
              <path d="M2 14 C2 6 7 2 14 2 C14 9 10 14 2 14 Z" fill={LEAF_COLORS[leaf.tint]} />
              <path d="M2 14 L11 5" stroke="#1b4332" strokeOpacity="0.35" strokeWidth="0.8" fill="none" />
            </svg>
          ))}
    </div>
  );
};
