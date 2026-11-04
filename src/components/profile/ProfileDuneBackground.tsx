import React from 'react';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface ProfileDuneBackgroundProps {
  isFlooded: boolean;
}

export const ProfileDuneBackground: React.FC<ProfileDuneBackgroundProps> = ({ isFlooded }) => {
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  const contourColor1 = isNight ? '#0f1c14' : '#e9efe6';
  const contourColor2 = isNight
    ? (isFlooded ? '#13281c' : '#14251b')
    : (isFlooded ? '#a7c4a0' : '#d8dfd5');
  const contourColor3 = isNight
    ? (isFlooded ? '#173021' : '#1a2e22')
    : (isFlooded ? '#74a872' : '#c2d6be');

  const strokeColor1 = isNight ? '#2d5a44' : '#a7c4a0';
  const strokeColor2 = isNight ? '#3a7256' : '#85a37f';
  const strokeColor3 = isNight ? '#4ade80' : '#52796f';

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden transition-colors duration-500">
      {/* Terraced Contour Gradients */}
      <div className="absolute inset-0 w-full h-full">
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full opacity-70 transition-all duration-500"
        >
          <path
            d="M-100,80 Q420,220 880,100 T1540,180 L1540,900 L-100,900 Z"
            fill={contourColor1}
          />
          <path
            d="M-100,280 Q520,420 1020,260 T1540,380 L1540,900 L-100,900 Z"
            fill={contourColor2}
            opacity="0.85"
          />
          <path
            d="M-100,520 Q360,660 920,480 T1540,620 L1540,900 L-100,900 Z"
            fill={contourColor3}
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
        className="absolute inset-0 w-full h-full opacity-40 transition-all duration-500"
      >
        <path
          d="M0,140 Q460,250 940,160 T1440,240"
          stroke={strokeColor1}
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        <path
          d="M0,340 Q560,460 1040,320 T1440,420"
          stroke={strokeColor2}
          strokeWidth="1.5"
          strokeDasharray="8 10"
        />
        <path
          d="M0,580 Q400,680 960,540 T1440,640"
          stroke={strokeColor3}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};
