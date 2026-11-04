import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useCardTilt } from '../../hooks/useCardTilt';
import { profileData } from '../../data/portfolioData';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface ProfilePhotoCardProps {
  isFlooded: boolean;
}

export const ProfilePhotoCard: React.FC<ProfilePhotoCardProps> = ({ isFlooded }) => {
  const { tiltProps } = useCardTilt(6);
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  return (
    <motion.div
      animate={
        isFlooded
          ? {
              rotate: -8,
              y: 22,
              scale: 0.96,
              transition: { duration: 0.8, ease: 'easeOut' }
            }
          : {
              rotate: 0,
              y: 0,
              scale: 1,
              transition: { type: 'spring', stiffness: 260, damping: 18 }
            }
      }
      className="relative w-full flex flex-col items-center lg:items-start gap-6 transition-colors duration-500"
    >
      <div
        {...tiltProps}
        className={`relative w-full max-w-sm rounded-[32px] p-3.5 border shadow-2xl transition-colors duration-500 group cursor-pointer ${
          isNight
            ? 'bg-[#142118] border-emerald-500/30 shadow-emerald-950/40'
            : 'bg-[#fffdf5] border-[#d8dfd5] shadow-[#2d6a4f]/8'
        }`}
      >
        <div className={`relative aspect-[3/4] w-full rounded-[24px] overflow-hidden border flex items-center justify-center transition-colors duration-500 ${
          isNight ? 'bg-[#1a2a20] border-emerald-500/20' : 'bg-[#edf2eb] border-[#d8dfd5]'
        }`}>
          <img
            src={profileData.avatarUrl || '/rendi.jpg'}
            alt={profileData.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/rendi.jpg';
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/75 via-transparent to-transparent opacity-65 pointer-events-none" />

          <div className={`absolute bottom-4 left-4 right-4 p-3 rounded-xl border backdrop-blur-md shadow-sm transition-colors duration-500 ${
            isNight
              ? 'bg-[#142118]/90 border-emerald-500/30 text-[#f8fafc]'
              : 'bg-[#fffdf5]/90 border-[#d8dfd5] text-[#0f172a]'
          }`}>
            <div className={`text-sm font-bold ${isNight ? 'text-[#f8fafc]' : 'text-[#0f172a]'}`}>
              {profileData.name}
            </div>
            <div className={`text-xs font-mono mt-0.5 ${isNight ? 'text-amber-300' : 'text-[#2d6a4f]'}`}>
              {profileData.education}
            </div>
          </div>
        </div>

        <div className={`mt-3 px-2 flex items-center justify-between text-[11px] font-mono transition-colors duration-500 ${
          isNight ? 'text-amber-400' : 'text-[#2d6a4f]'
        }`}>
          <span>FOTO PROFIL</span>
          <span>ID // {profileData.name.toUpperCase()}</span>
        </div>
      </div>

      {/* Location & Operating Environment */}
      <motion.div
        animate={isFlooded ? { rotate: 12, x: 24, y: 30 } : { rotate: 0, x: 0, y: 0 }}
        className={`w-full max-w-sm p-4 rounded-2xl border flex items-center justify-between text-xs font-mono shadow-sm transition-colors duration-500 ${
          isNight
            ? 'bg-[#142118] border-emerald-500/30 text-[#f8fafc]'
            : 'bg-[#fffdf5] border-[#d8dfd5] text-[#0f172a]'
        }`}
      >
        <div className="flex items-center gap-2">
          <MapPin className={`w-4 h-4 ${isNight ? 'text-amber-400' : 'text-[#2d6a4f]'}`} />
          <span>Indonesia</span>
        </div>
        <span className={`font-bold ${isNight ? 'text-emerald-400' : 'text-[#2d6a4f]'}`}>Linux Enthusiasts</span>
      </motion.div>
    </motion.div>
  );
};
