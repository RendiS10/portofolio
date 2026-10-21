import React from 'react';

export const TechBeachDecorations: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Highland Terraced Contours */}
      <div className="absolute inset-0 w-full h-full">
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M-50,0 C320,110 580,30 920,120 C1240,210 1380,80 1500,140 L1500,900 L-50,900 Z"
            fill="#edf2eb"
            opacity="0.85"
          />

          <path
            d="M-50,220 C280,350 640,190 980,320 C1260,420 1420,280 1500,340 L1500,900 L-50,900 Z"
            fill="#e5ede3"
            opacity="0.8"
          />

          <path
            d="M-50,480 C360,390 740,560 1080,440 C1320,360 1440,500 1500,470 L1500,900 L-50,900 Z"
            fill="#d8dfd5"
            opacity="0.75"
          />
        </svg>
      </div>

      {/* Topographic Contour Lines */}
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full opacity-45"
      >
        <path
          d="M0,80 C360,160 620,80 960,170 C1260,250 1380,140 1440,190"
          stroke="#a7c4a0"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        <path
          d="M0,280 C320,400 680,240 1020,370 C1300,470 1400,330 1440,390"
          stroke="#85a37f"
          strokeWidth="1.5"
          strokeDasharray="8 10"
        />
        <path
          d="M0,540 C400,450 780,620 1120,500 C1360,420 1400,540 1440,510"
          stroke="#52796f"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};
