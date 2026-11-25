import React, { useRef } from 'react';

export interface ProjectTabItem {
  id: string;
  title: string;
  subtitle: string;
}

interface ProjectTabsProps {
  tabs: ProjectTabItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  isNight: boolean;
}

export const ProjectTabs: React.FC<ProjectTabsProps> = ({ tabs, activeIndex, onChange, isNight }) => {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + tabs.length) % tabs.length;
    onChange(next);
    tabRefs.current[next]?.focus();
  };

  const tabClass = (active: boolean) =>
    `flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border text-center transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 ${
      isNight ? 'focus-visible:ring-[#80ed99]' : 'focus-visible:ring-[#1b4332]'
    } ${
      active
        ? isNight
          ? 'bg-[#17231c] border-[#1f2d24] text-[#f5f7f4] shadow-sm'
          : 'bg-white border-[#e4ded5] text-[#151e17] shadow-sm'
        : isNight
        ? 'border-transparent text-[#95a499] hover:text-[#f5f7f4]'
        : 'border-transparent text-[#48564c] hover:text-[#151e17]'
    }`;

  return (
    <div
      role="tablist"
      aria-label="Proyek"
      className={`grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl border ${
        isNight ? 'bg-[#111a14] border-[#1f2d24]' : 'bg-[#f4f1ea] border-[#e4ded5]'
      }`}
    >
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            id={`project-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`project-panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={tabClass(isActive)}
          >
            <span className={`text-[10px] font-mono font-bold ${isActive ? '' : 'opacity-60'}`}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="mt-0.5 text-xs sm:text-sm font-bold tracking-tight leading-tight max-w-full">
              {tab.title}
            </span>
            <span className="mt-0.5 text-[11px] font-mono opacity-70 truncate max-w-full">
              {tab.subtitle}
            </span>
          </button>
        );
      })}
    </div>
  );
};
