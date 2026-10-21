import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface TactileButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'sand' | 'ghost';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const TactileButton: React.FC<TactileButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-colors select-none cursor-pointer';
  
  const variantStyles = {
    primary: 'bg-[#2d6a4f] hover:bg-[#1b4332] text-white border border-[#52b788] shadow-md shadow-[#2d6a4f]/25',
    secondary: 'bg-[#132a20] hover:bg-[#1a382b] text-[#f8fafc] border border-[#2d5a44] hover:border-[#74c69d]/60',
    sand: 'bg-[#c2410c] hover:bg-[#9a3412] text-white border border-[#ea580c] font-semibold',
    ghost: 'bg-transparent hover:bg-[#132a20] text-[#cbd5e1] hover:text-[#f8fafc] border border-transparent hover:border-[#2d5a44]'
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="w-4 h-4 flex items-center justify-center">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
