import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { MapPin, GraduationCap } from 'lucide-react';
import { useCardTilt } from '../../hooks/useCardTilt';
import { profileData } from '../../data/portfolioData';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

export const ProfilePhotoCard: React.FC = () => {
  const { tiltProps } = useCardTilt(4);
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';
  const reduceMotion = useReducedMotion();
  // Pemicu dipasang di bingkai, bukan di gambar: gambar yang sudah terpotong habis tidak pernah dianggap terlihat.
  const frameRef = useRef<HTMLDivElement | null>(null);
  const frameInView = useInView(frameRef, { once: true, amount: 0.3 });

  return (
    <div className="relative w-full flex flex-col items-center lg:items-start gap-4">
      {/* Apung di pembungkus luar karena tilt memakai transform inline pada kartu di dalamnya */}
      <div className="rs-float relative w-full max-w-sm">
      {/* Bespoke Plaque Mount with Double Hairline Frame */}
      <div
        {...tiltProps}
        className={`relative w-full rounded-[28px] p-3 border transition-all duration-300 group ${
          isNight
            ? 'bg-[#111a14] border-[#1f2d24] shadow-2xl shadow-black/50'
            : 'bg-white border-[#e4ded5] shadow-xl shadow-stone-900/5'
        }`}
      >
        {/* Aspect Ratio 4:5 Portrait Frame */}
        <div ref={frameRef} className={`relative aspect-[4/5] w-full rounded-[22px] overflow-hidden border ${
          isNight ? 'bg-[#152119] border-[#1f2d24]' : 'bg-[#f4f1ea] border-[#e4ded5]'
        }`}>
          <motion.img
            initial={false}
            animate={{ clipPath: reduceMotion || frameInView ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }}
            transition={{ duration: reduceMotion ? 0 : 0.8, ease: 'easeOut' }}
            src={profileData.avatarUrl || '/rendi.jpg'}
            alt={profileData.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/rendi.jpg';
            }}
          />

          {/* Depth Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10 pointer-events-none" />

          {/* Active Availability Tag */}
          <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full backdrop-blur-md bg-black/50 border border-white/20 text-white text-[11px] font-mono flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#80ed99] animate-pulse" />
            <span>Aktif di Bandung, ID</span>
          </div>

          {/* Bottom Identity Plaque */}
          <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl backdrop-blur-md bg-black/65 border border-white/15 text-white shadow-md">
            <div className="text-base font-bold tracking-tight">
              {profileData.name}
            </div>
            <div className="text-[11px] font-mono text-[#80ed99] flex items-center gap-1.5 mt-0.5">
              <GraduationCap className="w-3.5 h-3.5 shrink-0" />
              <span>S1 Teknik Informatika (IPK 3.70)</span>
            </div>
          </div>
        </div>

        {/* Integrated Metadata Plaque - Clean & Editorial */}
        <div className={`mt-3 px-2.5 py-1 flex items-center justify-between text-xs font-mono ${
          isNight ? 'text-[#95a499]' : 'text-[#48564c]'
        }`}>
          <div className="flex items-center gap-1.5">
            <MapPin className={`w-3.5 h-3.5 ${isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'}`} />
            <span>Bandung, Jawa Barat</span>
          </div>
          <span className={`font-semibold ${isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'}`}>
            STMIK Mardira Indonesia
          </span>
        </div>
      </div>
      </div>
    </div>
  );
};
