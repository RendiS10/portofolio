import React from 'react';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

// Satu periode lekuk 1200 unit; ujung kiri dan kanan sama tinggi supaya sambungan loop tidak terlihat.
const BACK_RIDGE = 'M0 44 C150 18 300 18 450 40 S750 66 900 38 S1100 22 1200 44';
const FRONT_RIDGE = 'M0 58 C200 40 380 40 560 56 S900 76 1200 50';
const VIEW_HEIGHT = 84;

export const SectionDivider: React.FC = () => {
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  const surface = isNight ? '#090f0c' : '#fbfaf6';
  const sage = isNight ? '#16241c' : '#dfe9df';
  const edge = isNight ? '#80ed99' : '#1b4332';

  return (
    <div
      aria-hidden="true"
      style={{ backgroundColor: surface }}
      className="relative z-20 w-full h-14 sm:h-[84px] overflow-hidden pointer-events-none select-none"
    >
      <svg
        viewBox={`0 0 2400 ${VIEW_HEIGHT}`}
        preserveAspectRatio="none"
        className="rs-drift absolute inset-y-0 left-0 block h-full w-[200%]"
      >
        <g fill={sage}>
          <path d={`${BACK_RIDGE} L1200 ${VIEW_HEIGHT} L0 ${VIEW_HEIGHT} Z`} />
          <path
            transform="translate(1200 0)"
            d={`${BACK_RIDGE} L1200 ${VIEW_HEIGHT} L0 ${VIEW_HEIGHT} Z`}
          />
        </g>
      </svg>

      <svg
        viewBox={`0 0 1200 ${VIEW_HEIGHT}`}
        preserveAspectRatio="none"
        className="absolute inset-0 block h-full w-full"
      >
        <path d={`${FRONT_RIDGE} L1200 ${VIEW_HEIGHT} L0 ${VIEW_HEIGHT} Z`} fill={surface} />
        <path
          d={FRONT_RIDGE}
          fill="none"
          stroke={edge}
          strokeOpacity="0.25"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};
