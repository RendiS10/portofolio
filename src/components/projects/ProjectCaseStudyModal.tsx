import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Code2,
  Smartphone,
  ShieldCheck
} from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { ProjectPreviewPlaceholder } from './ProjectPreviewPlaceholder';
import { stopLenisScroll, startLenisScroll } from '../../hooks/useLenisSmoothScroll';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface ProjectCaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  isOpen,
  onClose
}) => {
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      stopLenisScroll();
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      startLenisScroll();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Atelier Dossier Window */}
        <motion.div
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ type: 'spring', damping: 26, stiffness: 280 }}
          className={`relative w-full max-w-4xl rounded-3xl border p-6 sm:p-10 space-y-6 z-10 my-4 sm:my-8 max-h-[90vh] overflow-y-auto transition-colors duration-300 ${
            isNight
              ? 'bg-[#111a14] border-emerald-500/25 shadow-2xl shadow-black/80 text-[#f5f7f4]'
              : 'bg-white border-[#e4ded5] shadow-2xl shadow-stone-900/10 text-[#151e17]'
          }`}
        >
          {/* Modal Header */}
          <div
            className={`flex items-start justify-between gap-4 border-b pb-4 ${
              isNight ? 'border-emerald-500/15' : 'border-[#e4ded5]'
            }`}
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span
                  className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    isNight
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-[#ebf2ec] border-emerald-200 text-[#1b4332]'
                  }`}
                >
                  {project.category === 'fullstack' ? 'FULL-STACK WEB & BACKEND' : 'MOBILE FLUTTER SYSTEM'}
                </span>
                <span
                  className={`text-xs font-mono font-bold ${
                    isNight ? 'text-amber-400' : 'text-[#1b4332]'
                  }`}
                >
                  // {project.role}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                {project.title}
              </h3>
              <p
                className={`text-xs sm:text-sm font-mono font-semibold mt-1 ${
                  isNight ? 'text-[#95a499]' : 'text-[#48564c]'
                }`}
              >
                {project.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className={`p-2.5 rounded-full border transition-all cursor-pointer shrink-0 ${
                isNight
                  ? 'bg-[#152119] hover:bg-rose-950/40 border-emerald-500/20 text-stone-300 hover:text-rose-300'
                  : 'bg-[#f4f1ea] hover:bg-rose-50 border-[#e4ded5] text-[#48564c] hover:text-rose-700'
              }`}
              aria-label="Tutup studi kasus"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Interactive Preview Frame */}
          <ProjectPreviewPlaceholder
            project={project}
            isMobileFrame={project.category === 'mobile' || Boolean(project.isMobileApp)}
            className="w-full"
          />

          {/* Performance Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.metrics.map((m, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border text-center flex flex-col justify-center ${
                  isNight
                    ? 'bg-[#152119] border-emerald-500/15'
                    : 'bg-[#fcfbf8] border-[#e4ded5]'
                }`}
              >
                <div
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                    isNight ? 'text-amber-400/90' : 'text-[#1b4332]'
                  }`}
                >
                  {m.label}
                </div>
                <div className="text-sm sm:text-base font-bold tracking-tight mt-0.5">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {/* Project Mandate & Context */}
          <div className="space-y-2">
            <h4
              className={`text-xs font-mono uppercase font-bold flex items-center gap-2 ${
                isNight ? 'text-amber-400' : 'text-[#1b4332]'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-500" />
              <span>Latar Belakang &amp; Mandat Rekayasa</span>
            </h4>
            <p
              className={`text-xs sm:text-sm leading-relaxed p-4 rounded-2xl border ${
                isNight
                  ? 'bg-[#152119] border-emerald-500/15 text-[#95a499]'
                  : 'bg-[#f8faf7] border-[#e4ded5] text-[#48564c]'
              }`}
            >
              {project.description}
            </p>
          </div>

          {/* Architecture & Engineering Implementation */}
          <div className="space-y-3">
            <h4
              className={`text-xs font-mono uppercase font-bold flex items-center gap-2 ${
                isNight ? 'text-amber-400' : 'text-[#1b4332]'
              }`}
            >
              <Code2 className="w-4 h-4 text-emerald-500" />
              <span>Arsitektur Sistem &amp; Eksekusi Teknis</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.architecture.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                    isNight
                      ? 'bg-[#152119] border-emerald-500/15 text-[#f5f7f4]'
                      : 'bg-[#fcfbf8] border-[#e4ded5] text-[#151e17]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Engineering Challenge & Resolution */}
          <div className="space-y-2.5">
            <h4
              className={`text-xs font-mono uppercase font-bold flex items-center gap-2 ${
                isNight ? 'text-amber-400' : 'text-[#92400e]'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Tantangan Utama Rekayasa &amp; Resolusi</span>
            </h4>
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                isNight
                  ? 'bg-amber-950/20 border-amber-500/25 text-amber-200'
                  : 'bg-amber-50/70 border-amber-200 text-[#78350f]'
              }`}
            >
              <p className="font-bold mb-1">Tantangan yang Dihadapi:</p>
              <p>{project.challenges}</p>
            </div>
          </div>

          {/* Technology Stack Tags */}
          <div className="space-y-2">
            <h4
              className={`text-xs font-mono uppercase font-bold ${
                isNight ? 'text-[#95a499]' : 'text-[#48564c]'
              }`}
            >
              Stack Teknologi &amp; Protokol
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className={`text-xs font-mono font-medium px-3 py-1.5 rounded-lg border ${
                    isNight
                      ? 'bg-[#152119] border-emerald-500/20 text-[#f5f7f4]'
                      : 'bg-[#f4f1ea] border-[#e4ded5] text-[#151e17]'
                  }`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div
            className={`pt-5 border-t flex flex-wrap items-center justify-between gap-4 ${
              isNight ? 'border-emerald-500/15' : 'border-[#e4ded5]'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-mono opacity-60">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Teruji di Lingkungan Produksi</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {project.isMobileApp ? (
                <div
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-semibold border ${
                    isNight
                      ? 'bg-[#152119] border-emerald-500/25 text-emerald-300'
                      : 'bg-[#ebf2ec] border-emerald-200 text-[#1b4332]'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-emerald-500" />
                  <span>Aplikasi Mobile Native (Demo/APK on request)</span>
                </div>
              ) : project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shadow-sm ${
                    isNight
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-[#090f0c]'
                      : 'bg-[#1b4332] hover:bg-[#143427] text-white'
                  }`}
                >
                  <span>Buka Live Production</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : null}

              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2.5 rounded-xl text-xs font-mono font-semibold border transition-all cursor-pointer ${
                  isNight
                    ? 'bg-[#152119] border-emerald-500/20 text-stone-300 hover:bg-[#1a2a20]'
                    : 'bg-[#f4f1ea] border-[#e4ded5] text-[#151e17] hover:bg-white'
                }`}
              >
                Tutup Dossier
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
