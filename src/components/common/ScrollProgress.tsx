import React from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

const SPRING_STIFFNESS = 120;
const SPRING_DAMPING = 26;

export const ScrollProgress: React.FC = () => {
  const { atmosphere } = useVillageAtmosphere();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: SPRING_STIFFNESS, damping: SPRING_DAMPING });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: reduceMotion ? scrollYProgress : smooth, transformOrigin: '0% 50%' }}
      // z-[45]: di atas navbar (z-40), di bawah modal (z-50).
      className={`fixed top-0 left-0 right-0 z-[45] h-[3px] pointer-events-none ${
        atmosphere === 'night' ? 'bg-[#80ed99]' : 'bg-[#1b4332]'
      }`}
    />
  );
};
