import React from 'react';
import { motion } from 'framer-motion';

interface ProfileDuneBackgroundProps {
  isFlooded: boolean;
}

export const ProfileDuneBackground: React.FC<ProfileDuneBackgroundProps> = ({ isFlooded }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Terraced Contour Gradients */}
      <div className="absolute inset-0 w-full h-full">
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full opacity-70"
        >
          <path
            d="M-100,80 Q420,220 880,100 T1540,180 L1540,900 L-100,900 Z"
            fill="#e9efe6"
          />
          <path
            d="M-100,280 Q520,420 1020,260 T1540,380 L1540,900 L-100,900 Z"
            fill={isFlooded ? '#a7c4a0' : '#d8dfd5'}
            opacity="0.85"
          />
          <path
            d="M-100,520 Q360,660 920,480 T1540,620 L1540,900 L-100,900 Z"
            fill={isFlooded ? '#74a872' : '#c2d6be'}
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Topographic Contour Ridges */}
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full opacity-40"
      >
        <path
          d="M0,140 Q460,250 940,160 T1440,240"
          stroke="#a7c4a0"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        <path
          d="M0,340 Q560,460 1040,320 T1440,420"
          stroke="#85a37f"
          strokeWidth="1.5"
          strokeDasharray="8 10"
        />
        <path
          d="M0,580 Q400,680 960,540 T1440,640"
          stroke="#52796f"
          strokeWidth="1.5"
        />
      </svg>

      {/* Irrigated Streams on Flood/Watering */}
      {isFlooded && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 pointer-events-none"
        >
          <svg viewBox="0 0 1440 900" fill="none" className="w-full h-full">
            <g stroke="#2d6a4f" strokeWidth="2.5" strokeLinecap="round" opacity="0.65">
              <path d="M120,680 Q180,695 240,670 T320,710" />
              <path d="M720,720 Q800,750 880,715 T960,760" />
              <path d="M450,780 Q520,810 590,790" />
            </g>

            {/* Fresh Water Pools */}
            <ellipse cx="380" cy="540" rx="160" ry="40" fill="#52b788" opacity="0.35" />
            <ellipse cx="960" cy="610" rx="210" ry="45" fill="#2d6a4f" opacity="0.3" />
            <ellipse cx="200" cy="730" rx="125" ry="30" fill="#52b788" opacity="0.4" />
            <ellipse cx="720" cy="780" rx="140" ry="32" fill="#2d6a4f" opacity="0.25" />
          </svg>
        </motion.div>
      )}
    </div>
  );
};
