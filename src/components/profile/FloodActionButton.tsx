import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Waves, Wrench, RefreshCw } from 'lucide-react';

interface FloodActionButtonProps {
  floodState: 'pristine' | 'flooding' | 'flooded' | 'rebuilding';
  rebuildProgress: number;
  onTriggerFlood: () => void;
  onTriggerRebuild: () => void;
}

export const FloodActionButton: React.FC<FloodActionButtonProps> = ({
  floodState,
  rebuildProgress,
  onTriggerFlood,
  onTriggerRebuild
}) => {
  return (
    <div className="flex items-center gap-3 min-h-[42px]">
      <AnimatePresence mode="wait" initial={false}>
        {floodState === 'pristine' && (
          <motion.button
            key="btn-flood-action"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            type="button"
            onClick={onTriggerFlood}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white text-xs font-mono font-bold shadow-lg shadow-[#2d6a4f]/25 transition-all cursor-pointer hover:scale-105 active:scale-95 group"
            title="Alirkan air segar ke lahan sawah"
          >
            <Waves className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Irigasi Lahan</span>
          </motion.button>
        )}

        {(floodState === 'flooding' || floodState === 'flooded') && (
          <motion.button
            key="btn-rebuild-action"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            type="button"
            disabled={floodState === 'flooding'}
            onClick={onTriggerRebuild}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#c2410c] hover:bg-[#9a3412] text-white text-xs font-mono font-bold shadow-lg shadow-[#c2410c]/25 transition-all cursor-pointer hover:scale-105 active:scale-95 ${
              floodState === 'flooding' ? 'opacity-85 cursor-wait' : ''
            }`}
            title="Tata kembali tanah dan pematang sawah"
          >
            <Wrench className="w-4 h-4" />
            <span>Tata Lahan</span>
          </motion.button>
        )}

        {floodState === 'rebuilding' && (
          <motion.div
            key="btn-rebuilding-hud"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#fffdf5] border border-[#e8dbc0] shadow-md"
          >
            <RefreshCw className="w-4 h-4 text-[#c2410c] animate-spin" />
            <div className="text-xs font-mono font-bold text-[#0f172a]">
              Merawat Lahan {rebuildProgress}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
