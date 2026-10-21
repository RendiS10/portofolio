import React from 'react';
import { profileData } from '../../data/portfolioData';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  withText = false
}) => {
  const sizeMap = {
    sm: { box: 'w-8 h-8', text: 'text-xs', sub: 'text-[10px]' },
    md: { box: 'w-10 h-10', text: 'text-sm', sub: 'text-[11px]' },
    lg: { box: 'w-14 h-14', text: 'text-base', sub: 'text-xs' },
    xl: { box: 'w-24 h-24', text: 'text-lg', sub: 'text-sm' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* RS Monogram Logo Icon (Replacing avatar photo) */}
      <div
        className={`relative ${currentSize.box} rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 select-none shadow-[0_4px_16px_rgba(19,42,32,0.45)] group-hover:shadow-[0_0_20px_rgba(82,183,136,0.4)]`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <defs>
            {/* Background Gradient (Deep Highland Pine to Forest) */}
            <linearGradient id="rsBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1b4332" />
              <stop offset="50%" stopColor="#132a20" />
              <stop offset="100%" stopColor="#08140e" />
            </linearGradient>

            {/* Glowing Emerald Perimeter Border */}
            <linearGradient id="rsBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#80ed99" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#2d6a4f" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#52b788" stopOpacity="0.4" />
            </linearGradient>

            {/* RS Monogram Stroke Gradient */}
            <linearGradient id="rsStrokeGrad" x1="0%" y1="20%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#f0fdf4" />
              <stop offset="100%" stopColor="#80ed99" />
            </linearGradient>

            {/* Harvest Gold Accent Gradient for Sprout/Leaf */}
            <linearGradient id="rsGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fde047" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>

          {/* Squircle Badge Container */}
          <rect
            x="3"
            y="3"
            width="94"
            height="94"
            rx="24"
            fill="url(#rsBgGrad)"
            stroke="url(#rsBorderGrad)"
            strokeWidth="2.5"
          />

          {/* Subtle Inner Glass Sheen */}
          <rect
            x="5.5"
            y="5.5"
            width="89"
            height="42"
            rx="20"
            fill="white"
            fillOpacity="0.04"
          />

          {/* Terraced Contour Background Lines */}
          <path
            d="M 10 74 C 28 66, 52 72, 90 62"
            stroke="#52b788"
            strokeOpacity="0.18"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M 14 83 C 34 77, 60 80, 86 74"
            stroke="#52b788"
            strokeOpacity="0.12"
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Letter 'R' */}
          {/* Vertical Stem */}
          <path
            d="M 24 26 L 24 74"
            stroke="url(#rsStrokeGrad)"
            strokeWidth="7.5"
            strokeLinecap="round"
          />
          {/* Upper Bowl */}
          <path
            d="M 24 26 H 38.5 C 47 26, 49.5 32, 49.5 37 C 49.5 42, 47 48, 38.5 48 H 24"
            stroke="url(#rsStrokeGrad)"
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Diagonal Leg */}
          <path
            d="M 33 46.5 L 47 74"
            stroke="url(#rsStrokeGrad)"
            strokeWidth="7.5"
            strokeLinecap="round"
          />

          {/* Letter 'S' */}
          <path
            d="M 77 35 C 74.5 28, 66 26, 61 30 C 54 36, 57 44, 67 49 C 77 54, 79 63, 73 69 C 67 75, 56 74, 52 68"
            stroke="url(#rsStrokeGrad)"
            strokeWidth="7.5"
            strokeLinecap="round"
          />

          {/* Golden Rice/Leaf Sprout Emblem at Top Right */}
          <path
            d="M 76 22 C 80 16, 87 16, 89 20 C 89 25, 83 26, 76 22 Z"
            fill="url(#rsGoldGrad)"
          />
          <circle cx="88" cy="19.5" r="1.5" fill="#fde047" opacity="0.9" />
        </svg>
      </div>

      {withText && (
        <div className="flex flex-col text-left">
          <span className={`font-bold text-white tracking-wide leading-tight drop-shadow-sm ${currentSize.text}`}>
            {profileData.name}
          </span>
          <span className={`${currentSize.sub} text-[#fef08a] font-mono font-medium flex items-center gap-1 drop-shadow-xs truncate max-w-[140px] min-[400px]:max-w-[200px] sm:max-w-none`}>
            &gt;_ {profileData.tagline}
          </span>
        </div>
      )}
    </div>
  );
};
