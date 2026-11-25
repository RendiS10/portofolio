import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface HeadingAccentProps {
  className?: string;
}

const DRAW_DURATION_S = 0.6;

// Lebar tetap 56px, yang dianimasikan scaleX agar tetap hanya transform.
export const HeadingAccent: React.FC<HeadingAccentProps> = ({ className = 'mt-3' }) => {
  const { atmosphere } = useVillageAtmosphere();
  const reduceMotion = useReducedMotion();
  const color = atmosphere === 'night' ? 'bg-[#80ed99]' : 'bg-[#1b4332]';

  return (
    <motion.span
      aria-hidden="true"
      initial={reduceMotion ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: reduceMotion ? 0 : DRAW_DURATION_S, ease: 'easeOut' }}
      style={{ transformOrigin: 'left center' }}
      className={`block h-[3px] w-14 rounded-full ${color} ${className}`}
    />
  );
};
