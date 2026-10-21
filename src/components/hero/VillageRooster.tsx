import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';

export interface VillageRoosterHandle {
  triggerCrow: () => void;
  getRoosterRect: () => DOMRect | null;
}

const ROOSTER_DIALOGUES = [
  'Kukuruyuk! Senja yang indah di pematang sawah ~',
  'Matahari sore menyinari bulir-bulir padi keemasan!',
  'Ayam jago penjaga sawah menikmati semilir angin sore ~',
  'Petok petok! Udara senja pedesaan emang paling menenangkan ~',
  'Kodingan Rendi rapi banget, bersih dari cacing & bug!',
  'Langkah santai menyusuri pematang sawah bermandikan cahaya senja!',
  'Siap berkokok menyambut peluang proyek baru!'
];

const createShuffledDeck = (items: string[], lastItem?: string): string[] => {
  const deck = [...items];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  if (lastItem && deck[0] === lastItem && deck.length > 1) {
    [deck[0], deck[deck.length - 1]] = [deck[deck.length - 1], deck[0]];
  }
  return deck;
};

export const VillageRooster = forwardRef<VillageRoosterHandle>((_props, ref) => {
  const screenInitialWidth = typeof window !== 'undefined' ? window.innerWidth + 80 : 1500;
  const x = useMotionValue(screenInitialWidth);
  const [currentQuip, setCurrentQuip] = useState<string | null>(null);
  const [isCrowing, setIsCrowing] = useState<boolean>(false);
  const [isPecking, setIsPecking] = useState<boolean>(false);
  const roosterRef = useRef<HTMLDivElement | null>(null);

  const deckRef = useRef<string[]>(createShuffledDeck(ROOSTER_DIALOGUES));
  const lastQuipRef = useRef<string>('');

  const triggerCrow = () => {
    if (isCrowing) return;
    setIsCrowing(true);
    setCurrentQuip('KUKURUYUK! 🐓✨');

    setTimeout(() => {
      setIsCrowing(false);
      setTimeout(() => {
        setCurrentQuip(null);
      }, 1500);
    }, 1800);
  };

  useImperativeHandle(ref, () => ({
    triggerCrow,
    getRoosterRect: () => {
      return roosterRef.current ? roosterRef.current.getBoundingClientRect() : null;
    }
  }));

  // Periodic pecking behavior
  useEffect(() => {
    const peckInterval = setInterval(() => {
      if (!isCrowing && Math.random() < 0.45) {
        setIsPecking(true);
        setTimeout(() => {
          setIsPecking(false);
        }, 1200);
      }
    }, 4500);

    return () => clearInterval(peckInterval);
  }, [isCrowing]);

  // Walking loop across the bottom terrace
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const walkLoop = (currentTime: number) => {
      const delta = Math.min(0.05, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      // Only walk when not pecking or crowing
      if (!isCrowing && !isPecking) {
        const currX = x.get();
        const walkSpeed = 38;
        let nextX = currX - walkSpeed * delta;
        const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1400;

        if (nextX < -140) {
          nextX = screenWidth + 140;
        }

        x.set(nextX);
      }

      animId = requestAnimationFrame(walkLoop);
    };

    animId = requestAnimationFrame(walkLoop);
    return () => cancelAnimationFrame(animId);
  }, [isCrowing, isPecking, x]);

  // Dialogue bubble loop
  useEffect(() => {
    const quipInterval = setInterval(() => {
      if (roosterRef.current && !isCrowing) {
        const rect = roosterRef.current.getBoundingClientRect();
        if (rect.right > 120 && rect.left < window.innerWidth - 120) {
          if (deckRef.current.length === 0) {
            deckRef.current = createShuffledDeck(ROOSTER_DIALOGUES, lastQuipRef.current);
          }

          const nextQuip = deckRef.current.pop() || ROOSTER_DIALOGUES[0];
          lastQuipRef.current = nextQuip;
          setCurrentQuip(nextQuip);

          setTimeout(() => {
            if (!isCrowing) setCurrentQuip(null);
          }, 3200);
        }
      }
    }, 9000);

    return () => clearInterval(quipInterval);
  }, [isCrowing]);

  return (
    <motion.div
      ref={roosterRef}
      style={{
        x,
        position: 'absolute',
        pointerEvents: 'auto'
      }}
      onClick={triggerCrow}
      className="z-30 select-none bottom-14 sm:bottom-20 md:bottom-24 scale-[0.78] sm:scale-[0.92] md:scale-100 origin-bottom cursor-pointer group"
      title="Klik untuk membuat Ayam Jago berkokok!"
    >
      <motion.div
        animate={{
          y: isCrowing
            ? [-4, -12, -4]
            : isPecking
            ? [0, 10, 0, 8, 0]
            : [0, -3, 0, -3, 0],
          rotate: isCrowing
            ? [-4, 6, -4]
            : isPecking
            ? [14, 22, 14]
            : [-1.5, 1.5, -1.5]
        }}
        transition={{
          y: { repeat: isCrowing ? 2 : Infinity, duration: isCrowing ? 0.45 : isPecking ? 0.35 : 0.65, ease: 'easeInOut' },
          rotate: { repeat: isCrowing ? 2 : Infinity, duration: isCrowing ? 0.45 : isPecking ? 0.35 : 0.65, ease: 'easeInOut' }
        }}
        className="relative"
      >
        {/* Soft Terrace Ground Shadow */}
        <div className="absolute -bottom-1 left-3 w-16 h-3 bg-[#132a20]/30 rounded-full blur-[2px]" />

        {/* Authentic Indonesian Village Rooster SVG (Ayam Jago Kampung) */}
        <svg
          width="82"
          height="72"
          viewBox="0 0 82 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          {/* Sturdy Yellow Chicken Feet */}
          <g stroke="#D97706" strokeWidth="2.4" strokeLinecap="round">
            {/* Back Leg */}
            <line x1="36" y1="52" x2="34" y2="64" />
            <line x1="34" y1="64" x2="28" y2="67" />
            <line x1="34" y1="64" x2="33" y2="68" />
            <line x1="34" y1="64" x2="40" y2="67" />

            {/* Front Leg */}
            <motion.g
              animate={!isCrowing && !isPecking ? { rotate: [-14, 14, -14] } : { rotate: 0 }}
              transition={{ repeat: Infinity, duration: 0.65, ease: 'easeInOut' }}
              style={{ transformOrigin: '46px 52px' }}
            >
              <line x1="46" y1="52" x2="44" y2="64" />
              <line x1="44" y1="64" x2="38" y2="67" />
              <line x1="44" y1="64" x2="44" y2="68" />
              <line x1="44" y1="64" x2="50" y2="66" />
            </motion.g>
          </g>

          {/* Sweeping Sickle Tail Feathers (Ekor Melengkung Gagah) */}
          <motion.g
            animate={isCrowing ? { rotate: [-8, 8, -8] } : { rotate: [-2, 3, -2] }}
            transition={{ repeat: Infinity, duration: isCrowing ? 0.35 : 1.2, ease: 'easeInOut' }}
            style={{ transformOrigin: '55px 38px' }}
          >
            {/* Dark green-black arching primary sickle */}
            <path
              d="M52 38 C64 30, 78 12, 74 2 C68 0, 60 18, 50 32 Z"
              fill="#064E3B"
              stroke="#022C22"
              strokeWidth="1.2"
            />
            {/* Secondary iridescent teal-green sickle */}
            <path
              d="M53 40 C68 36, 82 22, 80 12 C74 12, 64 26, 52 36 Z"
              fill="#047857"
              stroke="#064E3B"
              strokeWidth="1.2"
            />
            {/* Tertiary warm copper-brown lower tail coverts */}
            <path
              d="M52 42 C66 42, 76 34, 78 26 C72 28, 64 38, 50 42 Z"
              fill="#9A3412"
              stroke="#7C2D12"
              strokeWidth="1.2"
            />
          </motion.g>

          {/* Plump Rooster Body (Badan Cokelat & Hijau Gelap) */}
          <path
            d="M26 38 C24 46, 32 54, 44 54 C56 54, 60 46, 58 38 C56 30, 48 26, 38 28 C30 30, 26 34, 26 38 Z"
            fill="#78350F"
            stroke="#451A03"
            strokeWidth="1.8"
          />

          {/* Wing Covert (Sayap Bernuansa Cokelat-Merah & Tembaga) */}
          <motion.path
            animate={isCrowing ? { rotate: [-20, 20, -20], scaleY: [1, 1.25, 1] } : { rotate: 0 }}
            transition={{ repeat: isCrowing ? Infinity : 0, duration: 0.28, ease: 'easeInOut' }}
            style={{ transformOrigin: '38px 34px' }}
            d="M32 34 C32 44, 46 48, 52 42 C54 36, 48 30, 38 30 Z"
            fill="#B45309"
            stroke="#78350F"
            strokeWidth="1.5"
          />
          <path d="M38 38 C42 42, 48 44, 52 42" stroke="#92400E" strokeWidth="1.2" />

          {/* Golden-Orange Neck Hackles (Bulu Leher Keemasan Khas Ayam Kampung) */}
          <path
            d="M22 28 C26 36, 36 34, 38 26 C40 18, 34 12, 28 14 C24 16, 20 22, 22 28 Z"
            fill="#D97706"
            stroke="#92400E"
            strokeWidth="1.4"
          />
          <path d="M25 22 L27 30 M29 20 L32 30 M33 18 L36 28" stroke="#B45309" strokeWidth="1.2" strokeLinecap="round" />

          {/* Head */}
          <circle cx="24" cy="14" r="7" fill="#D97706" stroke="#92400E" strokeWidth="1.2" />

          {/* Bright Red Comb (Jengger Ayam Merah Merekah Khas Jago) */}
          <path
            d="M18 10 C18 4, 22 2, 23 6 C24 3, 27 3, 28 7 C29 4, 32 6, 31 10 Z"
            fill="#DC2626"
            stroke="#991B1B"
            strokeWidth="1.2"
          />

          {/* Red Wattle (Gelambir Merah di Bawah Paruh) */}
          <path
            d="M19 18 C17 22, 21 24, 22 20 Z"
            fill="#DC2626"
            stroke="#991B1B"
            strokeWidth="1"
          />

          {/* Sharp Yellow Beak */}
          <path
            d="M18 14 L11 16 L18 18 Z"
            fill="#F59E0B"
            stroke="#D97706"
            strokeWidth="1"
          />

          {/* Eye with White Pupil Spark */}
          <circle cx="22" cy="13" r="2.2" fill="#FEF08A" />
          <circle cx="21.5" cy="13" r="1.3" fill="#0F172A" />
          <circle cx="21" cy="12.5" r="0.5" fill="#FFFFFF" />
        </svg>

        {/* Speech / Crow Bubble */}
        {currentQuip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.75, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.75, y: 6 }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-2xl bg-[#fffdf5]/95 text-[#c2410c] text-xs font-mono font-black shadow-xl border-2 border-[#ea580c] whitespace-nowrap backdrop-blur-md flex items-center gap-1.5"
          >
            <span className="drop-shadow-xs">{currentQuip}</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
});

VillageRooster.displayName = 'VillageRooster';
