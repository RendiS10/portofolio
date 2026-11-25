import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const REVEAL_OFFSET_PX = 16;
const REVEAL_DURATION_S = 0.5;

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, className }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: REVEAL_OFFSET_PX }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: reduceMotion ? 0 : REVEAL_DURATION_S, delay: reduceMotion ? 0 : delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
