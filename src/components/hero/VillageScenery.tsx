import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const VillageScenery: React.FC = () => {
  const [hutQuip, setHutQuip] = useState<string | null>(null);

  const handleHutClick = () => {
    if (hutQuip) return;
    setHutQuip('Saung bambu peneduh di tepi pematang sawah ~ 🎋');
    setTimeout(() => {
      setHutQuip(null);
    }, 2800);
  };

  return (
    <div className="absolute inset-x-0 bottom-0 pointer-events-none z-10 overflow-hidden select-none">
      <div className="relative w-full max-w-7xl mx-auto h-[260px] sm:h-[320px] md:h-[360px] flex items-end justify-between px-3 sm:px-8">
        
        {/* =========================================
            LEFT SCENERY: POHON KELAPA & RUMPUN BAMBU
            ========================================= */}
        <div className="relative flex items-end -ml-4 sm:ml-0 bottom-8 sm:bottom-12 md:bottom-14">
          
          {/* Bamboo Grove (Rumpun Bambu Pedesaan) */}
          <motion.div
            animate={{ rotate: [-0.8, 1.2, -0.8] }}
            transition={{ repeat: Infinity, duration: 6.2, ease: 'easeInOut' }}
            className="hidden sm:block absolute left-8 bottom-0 origin-bottom"
          >
            <svg width="110" height="210" viewBox="0 0 110 210" fill="none" className="drop-shadow-md">
              {/* Bamboo Stalk 1 */}
              <path d="M 35 210 L 42 120 L 46 40 L 48 0" stroke="#2d5a44" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 33 160 H 42 M 36 110 H 45 M 40 60 H 48 M 43 20 H 50" stroke="#f59e0b" strokeWidth="2" strokeOpacity="0.7" />
              {/* Bamboo Stalk 2 */}
              <path d="M 60 210 L 62 130 L 68 50 L 72 10" stroke="#1e4836" strokeWidth="5.5" strokeLinecap="round" />
              <path d="M 58 170 H 67 M 60 120 H 69 M 64 70 H 73 M 67 30 H 75" stroke="#f59e0b" strokeWidth="2.2" strokeOpacity="0.7" />
              
              {/* Delicate Bamboo Leaves with Sunset Highlights */}
              <g fill="#52b788">
                <path d="M 46 40 C 30 35, 20 42, 12 50 C 25 48, 38 45, 46 40 Z" />
                <path d="M 48 20 C 35 12, 22 18, 14 26 C 28 24, 40 22, 48 20 Z" />
                <path d="M 48 0 C 40 -12, 28 -8, 20 -2 C 32 0, 42 0, 48 0 Z" fill="#80ed99" />
                <path d="M 68 50 C 82 45, 96 52, 104 62 C 90 58, 78 54, 68 50 Z" />
                <path d="M 70 30 C 85 24, 98 30, 106 38 C 92 35, 80 32, 70 30 Z" fill="#fde047" fillOpacity="0.85" />
                <path d="M 72 10 C 84 -2, 95 2, 102 10 C 90 8, 80 8, 72 10 Z" />
              </g>
            </svg>
          </motion.div>

          {/* Curved Tropical Coconut Palm (Pohon Kelapa Melengkung Senja) */}
          <div className="relative">
            <motion.div
              animate={{ rotate: [-1.2, 1.8, -1.2] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
              className="origin-bottom-left"
            >
              <svg
                width="190"
                height="280"
                viewBox="0 0 190 280"
                fill="none"
                className="w-[140px] h-[210px] sm:w-[170px] sm:h-[250px] md:w-[190px] md:h-[280px] drop-shadow-xl"
              >
                <defs>
                  {/* Palm Trunk Gradient */}
                  <linearGradient id="trunkGrad" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#2c180a" />
                    <stop offset="60%" stopColor="#451a03" />
                    <stop offset="100%" stopColor="#78350f" />
                  </linearGradient>

                  {/* Sunset Palm Fronds Gradient */}
                  <linearGradient id="frondGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#80ed99" />
                    <stop offset="40%" stopColor="#2d6a4f" />
                    <stop offset="100%" stopColor="#1b4332" />
                  </linearGradient>

                  {/* Golden Rim Highlight for Sunset Backlight */}
                  <linearGradient id="goldRim" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#fde047" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>

                {/* Gracefully Arched Coconut Trunk */}
                <path
                  d="M 28 280 C 35 210, 65 140, 95 85 C 105 70, 115 58, 125 50"
                  stroke="url(#trunkGrad)"
                  strokeWidth="15"
                  strokeLinecap="round"
                />
                {/* Trunk Bark Rings */}
                <path
                  d="M 24 250 Q 32 252 38 248 M 32 215 Q 42 217 48 212 M 45 180 Q 56 182 62 176 M 60 145 Q 72 147 80 141 M 80 110 Q 92 112 100 106 M 102 75 Q 114 77 122 72"
                  stroke="url(#goldRim)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeOpacity="0.8"
                />

                {/* Young Coconuts at Crown */}
                <circle cx="120" cy="56" r="6" fill="#65a30d" />
                <circle cx="128" cy="58" r="5.5" fill="#84cc16" />
                <circle cx="124" cy="64" r="5" fill="#4d7c0f" />

                {/* Palm Fronds (Daun-Daun Kelapa Mengayun Anggun) */}
                {/* Frond 1: Sweeping Left */}
                <path
                  d="M 125 50 C 95 30, 45 35, 15 65"
                  stroke="url(#frondGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M 125 50 C 95 30, 45 35, 15 65"
                  stroke="url(#goldRim)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  strokeOpacity="0.75"
                />

                {/* Frond 2: Arched Up-Left */}
                <path
                  d="M 125 50 C 105 15, 60 5, 25 22"
                  stroke="url(#frondGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Frond 3: Reaching High Center */}
                <path
                  d="M 125 50 C 120 15, 130 -5, 142 5"
                  stroke="url(#frondGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Frond 4: Sweeping Far Right */}
                <path
                  d="M 125 50 C 150 25, 175 35, 185 68"
                  stroke="url(#frondGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M 125 50 C 150 25, 175 35, 185 68"
                  stroke="url(#goldRim)"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  strokeOpacity="0.75"
                />

                {/* Frond 5: Hanging Droop Right */}
                <path
                  d="M 125 50 C 145 55, 168 75, 175 105"
                  stroke="url(#frondGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Frond 6: Hanging Droop Down-Left */}
                <path
                  d="M 125 50 C 95 65, 75 90, 65 115"
                  stroke="url(#frondGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* =========================================
            RIGHT SCENERY: SAUNG SAWAH & POHON PENEDUH
            ========================================= */}
        <div className="relative flex items-end -mr-2 sm:mr-0 bottom-8 sm:bottom-12 md:bottom-14">
          
          {/* Lush Village Shade Tree (Pohon Peneduh Desa) */}
          <div className="hidden md:block absolute right-32 bottom-2">
            <svg width="150" height="220" viewBox="0 0 150 220" fill="none" className="drop-shadow-lg opacity-90">
              {/* Tree Trunk */}
              <path d="M 75 220 L 73 140 Q 70 110 60 90 M 73 140 Q 80 115 95 95" stroke="#3d2110" strokeWidth="8" strokeLinecap="round" />
              {/* Canopy Layers with Sunset Backlight */}
              <circle cx="55" cy="75" r="38" fill="#1b4332" />
              <circle cx="95" cy="70" r="34" fill="#2d6a4f" />
              <circle cx="75" cy="45" r="40" fill="#386641" />
              <circle cx="82" cy="40" r="28" fill="#52b788" fillOpacity="0.7" />
              <circle cx="88" cy="35" r="16" fill="#fde047" fillOpacity="0.45" />
            </svg>
          </div>

          {/* Traditional Sundanese/Javanese Saung Sawah (Gubuk Bambu Pematang) */}
          <div className="relative pointer-events-auto">
            {/* Clickable Speech Bubble */}
            <AnimatePresence>
              {hutQuip && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className="absolute -top-12 sm:-top-14 right-2 sm:right-6 whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#fffdf5] border-2 border-[#78350f] text-[#451a03] font-bold text-xs shadow-lg shadow-[#78350f]/25 z-40"
                >
                  {hutQuip}
                  <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-[#fffdf5] border-b-2 border-r-2 border-[#78350f] rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleHutClick}
              className="cursor-pointer group select-none"
              title="Klik Saung Bambu"
            >
              <svg
                width="220"
                height="190"
                viewBox="0 0 220 190"
                fill="none"
                className="w-[155px] h-[135px] sm:w-[190px] sm:h-[165px] md:w-[220px] md:h-[190px] drop-shadow-2xl"
              >
                <defs>
                  {/* Thatched Roof Gradient */}
                  <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="35%" stopColor="#b45309" />
                    <stop offset="80%" stopColor="#78350f" />
                    <stop offset="100%" stopColor="#451a03" />
                  </linearGradient>

                  {/* Bamboo Poles Gradient */}
                  <linearGradient id="bambooStiltGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#a16207" />
                    <stop offset="50%" stopColor="#78350f" />
                    <stop offset="100%" stopColor="#451a03" />
                  </linearGradient>

                  {/* Golden Lantern Glow */}
                  <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
                    <stop offset="40%" stopColor="#fde047" stopOpacity="0.8" />
                    <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Foundation Stilts (Tiang Bambu Penyangga di Pematang) */}
                <path d="M 45 110 L 45 185" stroke="url(#bambooStiltGrad)" strokeWidth="6.5" strokeLinecap="round" />
                <path d="M 78 112 L 78 178" stroke="url(#bambooStiltGrad)" strokeWidth="5" strokeLinecap="round" />
                <path d="M 142 112 L 142 178" stroke="url(#bambooStiltGrad)" strokeWidth="5" strokeLinecap="round" />
                <path d="M 175 110 L 175 185" stroke="url(#bambooStiltGrad)" strokeWidth="6.5" strokeLinecap="round" />

                {/* Diagonal Bamboo Bracing */}
                <path d="M 45 155 L 78 125 M 78 155 L 45 125" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M 142 155 L 175 125 M 175 155 L 142 125" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />

                {/* Bamboo Floor Platform (Bale-Bale Bambu Panggung) */}
                <rect x="34" y="110" width="152" height="11" rx="4" fill="url(#bambooStiltGrad)" stroke="#2c180a" strokeWidth="1.5" />
                <path d="M 40 115 H 180" stroke="#f59e0b" strokeWidth="1.2" strokeOpacity="0.8" />

                {/* Bamboo Railings (Pagar Bambu Terbuka) */}
                <path d="M 45 92 H 175" stroke="url(#bambooStiltGrad)" strokeWidth="4" strokeLinecap="round" />
                <path d="M 60 92 V 110 M 80 92 V 110 M 140 92 V 110 M 160 92 V 110" stroke="#451a03" strokeWidth="2.5" />

                {/* Main Roof Support Pillars */}
                <path d="M 55 60 L 55 110" stroke="url(#bambooStiltGrad)" strokeWidth="5" strokeLinecap="round" />
                <path d="M 165 60 L 165 110" stroke="url(#bambooStiltGrad)" strokeWidth="5" strokeLinecap="round" />

                {/* Traditional Thatched Gable Roof (Atap Jerami / Ijuk Saung) */}
                {/* Roof Base Eaves */}
                <polygon
                  points="110,12 18,72 202,72"
                  fill="url(#roofGrad)"
                  stroke="#2c180a"
                  strokeWidth="2"
                />
                {/* Thatched Straw Texture Ridges */}
                <path d="M 35 60 L 110 22 L 185 60" stroke="#fef08a" strokeWidth="2" strokeOpacity="0.8" />
                <path d="M 45 66 L 110 28 L 175 66" stroke="#fbbf24" strokeWidth="2" strokeOpacity="0.75" />
                <path d="M 22 72 Q 110 77 198 72" stroke="#451a03" strokeWidth="4.5" strokeLinecap="round" />
                
                {/* Roof Crown Apex (Pucuk Atap Ijuk) */}
                <rect x="104" y="8" width="12" height="7" rx="2" fill="#2c180a" />
                <path d="M 98 12 Q 110 5 122 12" stroke="#fde047" strokeWidth="2" strokeLinecap="round" />

                {/* Hanging Evening Lantern (Lentera Cempor / Lampu Teplok Senja) */}
                <g className="origin-top">
                  {/* Cord */}
                  <line x1="110" y1="58" x2="110" y2="76" stroke="#2c180a" strokeWidth="1.5" />
                  
                  {/* Ambient Golden Lantern Glow */}
                  <circle cx="110" cy="85" r="28" fill="url(#lanternGlow)" className="animate-pulse" />
                  
                  {/* Lantern Frame & Glass */}
                  <rect x="105" y="76" width="10" height="15" rx="3" fill="#fde047" stroke="#78350f" strokeWidth="1.2" />
                  <circle cx="110" cy="83.5" r="2.5" fill="#ffffff" />
                  <rect x="104" y="90" width="12" height="3" rx="1" fill="#451a03" />
                  <rect x="106" y="74" width="8" height="2.5" rx="1" fill="#451a03" />
                </g>

                {/* Small Bamboo Steps / Ladder (Tangga Bambu) */}
                <path d="M 100 120 L 96 172 M 120 120 L 116 172" stroke="url(#bambooStiltGrad)" strokeWidth="3" strokeLinecap="round" />
                <path d="M 99 133 H 119 M 98 146 H 118 M 97 159 H 117" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
};
