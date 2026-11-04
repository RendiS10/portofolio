import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GithubHeatmapGridProps {
  contributions: ContributionDay[];
  loading?: boolean;
}

const getHeatmapColor = (level: number, isNight: boolean): string => {
  switch (level) {
    case 1:
      return 'bg-[#86efac] border-[#4ade80] hover:bg-[#4ade80]';
    case 2:
      return 'bg-[#4ade80] border-[#22c55e] hover:bg-[#22c55e]';
    case 3:
      return 'bg-[#22c55e] border-[#16a34a] hover:bg-[#16a34a]';
    case 4:
      return 'bg-[#15803d] border-[#14532d] hover:bg-[#14532d]';
    case 0:
    default:
      return isNight ? 'bg-[#122016] border-[#1d3525] hover:border-emerald-400' : 'bg-[#e2eadc] border-[#cad8c5] hover:border-[#cbd5e1]';
  }
};

const formatIndonesianDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const GithubHeatmapGrid: React.FC<GithubHeatmapGridProps> = ({
  contributions,
  loading = false
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
    posX: number;
    posY: number;
  } | null>(null);

  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  if (loading) {
    return (
      <div className={`w-full p-4 sm:p-6 rounded-2xl border transition-colors duration-500 ${
        isNight ? 'bg-[#1a2a20] border-emerald-500/30' : 'bg-[#edf2eb] border-[#0f172a]'
      }`}>
        <div className="animate-pulse space-y-3">
          <div className="h-4 w-40 bg-emerald-500/20 rounded-md mb-2" />
          <div className="grid grid-flow-col grid-rows-7 gap-1 sm:gap-1.5 overflow-hidden">
            {Array.from({ length: 364 }).map((_, idx) => (
              <div key={idx} className={`w-3.5 h-3.5 rounded-[3px] ${isNight ? 'bg-[#142118]' : 'bg-[#faeed1]'}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // group contributions by week (columns)
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  contributions.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === contributions.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // extract month labels
  const monthLabels: { label: string; weekIndex: number }[] = [];
  const indonesianMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  let lastMonth = -1;

  weeks.forEach((week, wIndex) => {
    const firstDayOfWeek = week[0];
    if (firstDayOfWeek) {
      const date = new Date(firstDayOfWeek.date);
      const month = date.getMonth();
      if (month !== lastMonth && wIndex < weeks.length - 2) {
        monthLabels.push({
          label: indonesianMonths[month],
          weekIndex: wIndex
        });
        lastMonth = month;
      }
    }
  });

  const handleCellHover = (e: React.MouseEvent<HTMLDivElement>, day: ContributionDay) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const cellRect = e.currentTarget.getBoundingClientRect();

    setHoveredCell({
      date: day.date,
      count: day.count,
      posX: cellRect.left - containerRect.left + cellRect.width / 2,
      posY: cellRect.top - containerRect.top
    });
  };

  return (
    <div ref={containerRef} className={`relative w-full rounded-2xl border p-3.5 sm:p-6 transition-colors duration-500 ${
      isNight ? 'bg-[#1a2a20] border-emerald-500/35 shadow-[3px_3px_0px_#040906]' : 'bg-[#edf2eb]/80 border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a]'
    }`}>
      <AnimatePresence>
        {hoveredCell && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.12 }}
            style={{
              left: `${hoveredCell.posX}px`,
              top: `${hoveredCell.posY - 44}px`,
              transform: 'translateX(-50%)'
            }}
            className="pointer-events-none absolute z-50 px-3 py-1.5 rounded-xl bg-[#0f172a] text-white text-[11px] font-mono shadow-2xl border border-[#52b788]/40 whitespace-nowrap"
          >
            <span className="font-bold text-[#4ade80]">
              {hoveredCell.count === 0 ? 'Tidak ada kontribusi' : `${hoveredCell.count} kontribusi`}
            </span>
            <span className="text-[#64748b] mx-1.5">•</span>
            <span className="text-[#cbd5e1]">{formatIndonesianDate(hoveredCell.date)}</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-[6px] border-t-[#0f172a]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-x-auto no-scrollbar pb-1">
        <div className="min-w-[700px] sm:min-w-0">
          {/* month labels */}
          <div className="flex text-[10px] sm:text-[11px] font-mono font-bold text-[#64748b] mb-1.5 pl-6 relative h-4">
            {monthLabels.map((m, idx) => (
              <span
                key={idx}
                style={{
                  position: 'absolute',
                  left: `${m.weekIndex * 13.5 + 24}px`
                }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className="flex gap-1.5">
            {/* day of week indicators */}
            <div className="grid grid-rows-7 gap-[3px] text-[9px] font-mono font-bold text-[#64748b] pr-1 select-none">
              <span className="h-3 leading-3">Sen</span>
              <span className="h-3 leading-3 opacity-0">Sel</span>
              <span className="h-3 leading-3">Rab</span>
              <span className="h-3 leading-3 opacity-0">Kam</span>
              <span className="h-3 leading-3">Jum</span>
              <span className="h-3 leading-3 opacity-0">Sab</span>
              <span className="h-3 leading-3 opacity-0">Min</span>
            </div>

            {/* heatmap grid */}
            <div className="grid grid-flow-col grid-rows-7 gap-[3px] flex-1">
              {weeks.map((week, wIdx) =>
                week.map((day, dIdx) => (
                  <div
                    key={`${wIdx}-${dIdx}`}
                    onMouseEnter={(e) => handleCellHover(e, day)}
                    onMouseLeave={() => setHoveredCell(null)}
                    className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-[2.5px] border cursor-pointer transition-transform hover:scale-135 hover:z-20 ${getHeatmapColor(
                      day.level,
                      isNight
                    )}`}
                  />
                ))
              )}
            </div>
          </div>

          {/* heatmap legend */}
          <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-[#0f172a]/10 text-[10px] sm:text-[11px] font-mono font-bold text-[#64748b]">
            <span className="flex items-center gap-1.5">
              <span>Aktivitas Kode Otentik</span>
            </span>

            <div className="flex items-center gap-1.5">
              <span>Kurang</span>
              {[0, 1, 2, 3, 4].map((lvl) => (
                <div
                  key={lvl}
                  className={`w-3 h-3 rounded-[2.5px] border ${getHeatmapColor(lvl, isNight)}`}
                />
              ))}
              <span>Banyak</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
