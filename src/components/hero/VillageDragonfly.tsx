import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export const VillageDragonfly: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(200);
  const y = useMotionValue(180);

  useEffect(() => {
    let animId: number;
    let time = 0;
    let isVisible = true;

    const flyLoop = () => {
      if (!isVisible) return;
      time += 0.018;

      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1400;
      const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

      // Lissajous figure-8 wandering flight path across upper hero
      const targetX = (screenWidth * 0.45) + Math.sin(time * 0.8) * (screenWidth * 0.38) + Math.sin(time * 2.1) * 35;
      const targetY = (screenHeight * 0.32) + Math.cos(time * 1.1) * (screenHeight * 0.18) + Math.sin(time * 3.2) * 20;

      x.set(targetX);
      y.set(targetY);

      animId = requestAnimationFrame(flyLoop);
    };

    // Pause animation when parent / hero is scrolled out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isVisible) {
              isVisible = true;
              animId = requestAnimationFrame(flyLoop);
            }
          } else {
            isVisible = false;
            cancelAnimationFrame(animId);
          }
        });
      },
      { threshold: 0.01 }
    );

    const targetElem = containerRef.current?.parentElement || containerRef.current;
    if (targetElem) {
      observer.observe(targetElem);
    }

    animId = requestAnimationFrame(flyLoop);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [x, y]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        x,
        y,
        position: 'absolute',
        pointerEvents: 'none'
      }}
      className="z-25 select-none"
    >
      <motion.div
        animate={{
          rotate: [-12, 16, -8, 12, -12]
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: 'easeInOut'
        }}
        className="relative"
      >
        {/* Authentic Indonesian Paddy Dragonfly SVG (Capung Sawah Hijau-Emas) */}
        <svg
          width="48"
          height="42"
          viewBox="0 0 52 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm filter"
        >
          {/* Rapid Fluttering Forewings */}
          <motion.path
            animate={{
              scaleY: [1, 0.25, 1],
              opacity: [0.85, 0.45, 0.85]
            }}
            transition={{
              repeat: Infinity,
              duration: 0.11,
              ease: 'easeInOut'
            }}
            d="M26 18 C14 6, 2 8, 2 13 C2 16, 12 18, 26 18 Z"
            fill="rgba(167, 243, 208, 0.65)"
            stroke="#059669"
            strokeWidth="0.8"
          />
          <motion.path
            animate={{
              scaleY: [1, 0.25, 1],
              opacity: [0.85, 0.45, 0.85]
            }}
            transition={{
              repeat: Infinity,
              duration: 0.11,
              ease: 'easeInOut'
            }}
            d="M26 18 C38 6, 50 8, 50 13 C50 16, 40 18, 26 18 Z"
            fill="rgba(167, 243, 208, 0.65)"
            stroke="#059669"
            strokeWidth="0.8"
          />

          {/* Rapid Fluttering Hindwings */}
          <motion.path
            animate={{
              scaleY: [0.3, 1, 0.3],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              repeat: Infinity,
              duration: 0.11,
              ease: 'easeInOut'
            }}
            d="M26 21 C16 12, 4 16, 4 21 C4 24, 14 23, 26 21 Z"
            fill="rgba(167, 243, 208, 0.55)"
            stroke="#10B981"
            strokeWidth="0.8"
          />
          <motion.path
            animate={{
              scaleY: [0.3, 1, 0.3],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              repeat: Infinity,
              duration: 0.11,
              ease: 'easeInOut'
            }}
            d="M26 21 C36 12, 48 16, 48 21 C48 24, 38 23, 26 21 Z"
            fill="rgba(167, 243, 208, 0.55)"
            stroke="#10B981"
            strokeWidth="0.8"
          />

          {/* Slender Segmented Abdomen Tail */}
          <line x1="26" y1="20" x2="26" y2="44" stroke="#047857" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="26" y1="24" x2="26" y2="42" stroke="#34D399" strokeWidth="1.2" strokeLinecap="round" />

          {/* Thorax */}
          <ellipse cx="26" cy="18" rx="2.8" ry="4.2" fill="#065F46" stroke="#022C22" strokeWidth="0.8" />

          {/* Large Golden Eyes */}
          <circle cx="24" cy="14" r="2.2" fill="#FBBF24" stroke="#B45309" strokeWidth="0.6" />
          <circle cx="28" cy="14" r="2.2" fill="#FBBF24" stroke="#B45309" strokeWidth="0.6" />
        </svg>
      </motion.div>
    </motion.div>
  );
};
