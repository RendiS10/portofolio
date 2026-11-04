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

  // Restore stored preferences on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAtmosphere = localStorage.getItem('rs-village-atmosphere') as VillageAtmosphere;
      if (storedAtmosphere === 'sunset' || storedAtmosphere === 'night') {
        setAtmosphere(storedAtmosphere);
      }
      const isMuted = villageAudio.getMutedState();
      setIsSoundEnabled(!isMuted);
    }
  }, []);

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
