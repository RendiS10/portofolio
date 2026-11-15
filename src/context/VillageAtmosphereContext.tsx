import React, { createContext, useContext, useState, useEffect } from 'react';
import { villageAudio } from '../utils/villageAudio';

export type VillageAtmosphere = 'sunset' | 'night';

interface VillageAtmosphereContextType {
  atmosphere: VillageAtmosphere;
  toggleAtmosphere: () => void;
  isSoundEnabled: boolean;
  toggleSound: () => void;
  playBambooTone: (freq?: number) => void;
  playRoosterSound: () => void;
}

const VillageAtmosphereContext = createContext<VillageAtmosphereContextType>({
  atmosphere: 'sunset',
  toggleAtmosphere: () => {},
  isSoundEnabled: false,
  toggleSound: () => {},
  playBambooTone: () => {},
  playRoosterSound: () => {}
});

export const VillageAtmosphereProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [atmosphere, setAtmosphere] = useState<VillageAtmosphere>('sunset');
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(false);

  // Always default to Light Mode (Pagi Cerah) on first load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAtmosphere = localStorage.getItem('rs-village-atmosphere') as VillageAtmosphere;
      if (storedAtmosphere === 'night') {
        setAtmosphere('night');
      } else {
        setAtmosphere('sunset');
      }
      const isMuted = villageAudio.getMutedState();
      setIsSoundEnabled(!isMuted);
    }
  }, []);

  // Sync document root data-theme and dark class with atmosphere
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.setAttribute('data-theme', atmosphere);
      if (atmosphere === 'night') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [atmosphere]);

  const toggleAtmosphere = () => {
    const next = atmosphere === 'sunset' ? 'night' : 'sunset';
    setAtmosphere(next);
    villageAudio.playBambooNote(next === 'night' ? 390 : 580);
    if (typeof window !== 'undefined') {
      localStorage.setItem('rs-village-atmosphere', next);
    }
  };

  const toggleSound = () => {
    const nextState = !isSoundEnabled;
    setIsSoundEnabled(nextState);
    villageAudio.setMuted(!nextState);
  };

  const playBambooTone = (freq?: number) => {
    villageAudio.playBambooNote(freq);
  };

  const playRoosterSound = () => {
    villageAudio.playRoosterCrow();
  };

  return (
    <VillageAtmosphereContext.Provider
      value={{
        atmosphere,
        toggleAtmosphere,
        isSoundEnabled,
        toggleSound,
        playBambooTone,
        playRoosterSound
      }}
    >
      {children}
    </VillageAtmosphereContext.Provider>
  );
};

export const useVillageAtmosphere = () => useContext(VillageAtmosphereContext);
