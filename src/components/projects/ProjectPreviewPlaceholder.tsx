import React from 'react';
import type { Project } from '../../types/portfolio';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface ProjectPreviewPlaceholderProps {
  project: Project;
  className?: string;
  isMobileFrame?: boolean;
}

interface Tone {
  frame: string;
  chrome: string;
  screen: string;
  block: string;
  card: string;
  accent: string;
  label: string;
}

const getTone = (isNight: boolean): Tone =>
  isNight
    ? {
        frame: 'bg-[#111a14] border-[#1f2d24] shadow-xl shadow-black/50',
        chrome: 'bg-[#141f18] border-[#1f2d24]',
        screen: 'bg-[#090f0c]',
        block: 'bg-[#1f2d24]',
        card: 'bg-[#111a14] border-[#1f2d24]',
        accent: 'bg-[#80ed99]/70',
        label: 'bg-[#17231c] border-[#1f2d24] text-[#95a499]'
      }
    : {
        frame: 'bg-white border-[#e4ded5] shadow-lg shadow-black/5',
        chrome: 'bg-[#f4f1ea] border-[#e4ded5]',
        screen: 'bg-[#fcfbf8]',
        block: 'bg-[#e4ded5]',
        card: 'bg-white border-[#e4ded5]',
        accent: 'bg-[#1b4332]/70',
        label: 'bg-white border-[#e4ded5] text-[#48564c]'
      };

const IllustrationLabel: React.FC<{ tone: Tone }> = ({ tone }) => (
  <span
    className={`absolute top-2 right-2 z-20 px-2 py-0.5 rounded-md border text-[10px] font-mono ${tone.label}`}
  >
    Ilustrasi
  </span>
);

const SkeletonCard: React.FC<{ tone: Tone }> = ({ tone }) => (
  <div className={`p-3 rounded-2xl border flex flex-col gap-2 ${tone.card}`}>
    <div className={`h-14 sm:h-16 rounded-xl ${tone.block} opacity-60`} />
    <div className={`h-2 w-3/4 rounded ${tone.block}`} />
    <div className={`h-2 w-1/2 rounded ${tone.block} opacity-70`} />
    <div className={`mt-1 h-5 w-16 rounded-md ${tone.accent}`} />
  </div>
);

const WebFrame: React.FC<{ project: Project; tone: Tone; className: string }> = ({
  project,
  tone,
  className
}) => {
  const host = project.demoUrl ? new URL(project.demoUrl).host : null;
  return (
    <div
      className={`relative w-full rounded-2xl sm:rounded-3xl border overflow-hidden ${tone.frame} ${className}`}
      role="img"
      aria-label={`Ilustrasi tampilan ${project.title}`}
    >
      <IllustrationLabel tone={tone} />
      <div className={`flex items-center gap-2 px-4 py-2.5 border-b ${tone.chrome}`}>
        <span className={`w-2.5 h-2.5 rounded-full ${tone.block}`} />
        <span className={`w-2.5 h-2.5 rounded-full ${tone.block}`} />
        <span className={`w-2.5 h-2.5 rounded-full ${tone.block}`} />
        <div
          className={`ml-2 px-3 py-1 rounded-md border text-[11px] font-mono truncate max-w-[180px] sm:max-w-[240px] ${tone.card} ${
            host ? '' : 'text-transparent select-none'
          }`}
        >
          {host ?? 'internal'}
        </div>
      </div>

      <div className={`aspect-[16/11] p-4 sm:p-6 flex flex-col gap-4 select-none ${tone.screen}`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-lg ${tone.accent}`} />
          <div className="flex flex-col gap-1.5">
            <div className={`h-2 w-24 rounded ${tone.block}`} />
            <div className={`h-1.5 w-16 rounded ${tone.block} opacity-60`} />
          </div>
        </div>
        <div className={`h-14 rounded-xl ${tone.block} opacity-40`} />
        <div className="grid grid-cols-2 gap-3">
          <SkeletonCard tone={tone} />
          <SkeletonCard tone={tone} />
        </div>
      </div>
    </div>
  );
};

const MobileFrame: React.FC<{ project: Project; tone: Tone; className: string }> = ({
  project,
  tone,
  className
}) => (
  <div className={`flex items-center justify-center p-2 sm:p-4 ${className}`}>
    <div
      className={`relative w-full max-w-[270px] sm:max-w-[290px] aspect-[9/18.5] rounded-[36px] p-2.5 sm:p-3 border ${tone.frame}`}
      role="img"
      aria-label={`Ilustrasi tampilan ${project.title}`}
    >
      <IllustrationLabel tone={tone} />
      <div className={`relative w-full h-full rounded-[28px] overflow-hidden flex flex-col gap-3 pt-8 pb-4 px-3 select-none ${tone.screen}`}>
        <span className={`absolute top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full ${tone.block}`} />
        <div className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded-md ${tone.accent}`} />
          <div className={`h-2 w-20 rounded ${tone.block}`} />
        </div>
        <div className={`h-20 rounded-xl ${tone.block} opacity-40`} />
        <div className="grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-12 rounded-lg border ${tone.card}`} />
          ))}
        </div>
        <div className={`h-2 w-3/4 rounded ${tone.block}`} />
        <div className={`h-2 w-1/2 rounded ${tone.block} opacity-70`} />
        <div className={`mt-auto h-1 w-20 mx-auto rounded-full ${tone.block}`} />
      </div>
    </div>
  </div>
);

export const ProjectPreviewPlaceholder: React.FC<ProjectPreviewPlaceholderProps> = ({
  project,
  className = '',
  isMobileFrame = false
}) => {
  const { atmosphere } = useVillageAtmosphere();
  const tone = getTone(atmosphere === 'night');
  const isMobile = isMobileFrame || project.category === 'mobile' || Boolean(project.isMobileApp);

  return isMobile ? (
    <MobileFrame project={project} tone={tone} className={className} />
  ) : (
    <WebFrame project={project} tone={tone} className={className} />
  );
};
