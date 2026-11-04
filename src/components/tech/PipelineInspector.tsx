import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  CheckCircle2,
  ArrowUpRight,
  ShieldAlert,
  Lock,
  Terminal,
  Activity
} from 'lucide-react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFlutter,
  SiLaravel,
  SiNodedotjs,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiFirebase,
  SiPrisma,
  SiDocker,
  SiLinux,
  SiGit,
  SiVercel
} from '@icons-pack/react-simple-icons';
import type { TechItem, TechLayer } from '../../types/portfolio';
import { projectsData } from '../../data/portfolioData';
import type { FlowDomainId } from './PipelineFlowPresets';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

const iconMap: Record<string, React.FC<{ size?: number; color?: string; className?: string }>> = {
  react: SiReact,
  nextdotjs: SiNextdotjs,
  typescript: SiTypescript,
  javascript: SiJavascript,
  tailwindcss: SiTailwindcss,
  flutter: SiFlutter,
  laravel: SiLaravel,
  nodejs: SiNodedotjs,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  supabase: SiSupabase,
  firebase: SiFirebase,
  prisma: SiPrisma,
  docker: SiDocker,
  linux: SiLinux,
  git: SiGit,
  vercel: SiVercel
};

interface PipelineInspectorProps {
  selectedTech: TechItem | null;
  selectedLayer: TechLayer;
  activeDomain: FlowDomainId;
  onClearTechSelection: () => void;
  onSelectProject: (projectId: string) => void;
}

const layerDetailsMap: Record<
  TechLayer,
  {
    title: string;
    subtitle: string;
    role: string;
    description: string;
    guarantees: string[];
  }
> = {
  client: {
    title: 'Client / Frontend Tier',
    subtitle: 'User Interface & Interaction Layer',
    role: 'Frontend Engineering',
    description:
      'Tier antarmuka pengguna berfokus pada responsivitas tinggi, arsitektur komponen modular (React & Next.js), styling modern berbasis Tailwind CSS, serta aplikasi mobile native-performance dengan Flutter.',
    guarantees: [
      'Render SSR & Hybrid CSR',
      'Desain Responsif Mobile-First',
      'Aksesibilitas & Kecepatan LCP'
    ]
  },
  backend: {
    title: 'Backend Services Tier',
    subtitle: 'Application & Business Logic Layer',
    role: 'Server & API Engineering',
    description:
      'Tier logika bisnis mengelola RESTful API yang aman dan terstruktur dengan Express (Node.js) dan Laravel (PHP). Menangani alur data, validasi payload, enkripsi sandi, dan integrasi payment gateway.',
    guarantees: [
      'Otentikasi JWT & Role-Based Access',
      'Validasi Input & Sanitasi Data',
      'Arsitektur Controller & Service Terpisah'
    ]
  },
  database: {
    title: 'Data & Persistence Tier',
    subtitle: 'Storage, Querying & Cache Layer',
    role: 'Database Management',
    description:
      'Tier penyimpanan data mengandalkan database relasional teruji (PostgreSQL & MySQL) dengan query teroptimasi, skema relasional ternormalisasi, ORM Prisma, serta backend-as-a-service Supabase dan Firebase.',
    guarantees: [
      'Integritas Relasi ACID & Migrasi Data',
      'Optimasi Query Indexing',
      'Realtime Sync & Automated Backup'
    ]
  },
  devops: {
    title: 'DevOps & Infrastructure Tier',
    subtitle: 'Deployment, OS & Operations Layer',
    role: 'Systems & Reliability',
    description:
      'Tier operasional mencakup containerization aplikasi dengan Docker, deployment otomatisasi CI/CD, konfigurasi reverse proxy Nginx, serta pengelolaan lingkungan server berbasis Linux OS.',
    guarantees: [
      'Isolasi Lingkungan dengan Docker',
      'Konfigurasi Nginx & SSL/TLS',
      'Automated Git Workflow CI/CD'
    ]
  }
};

export const PipelineInspector: React.FC<PipelineInspectorProps> = ({
  selectedTech,
  selectedLayer,
  activeDomain,
  onClearTechSelection,
  onSelectProject
}) => {
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';
  const layerInfo = layerDetailsMap[selectedLayer];

  // special view when cyber security filter is clicked
  if (activeDomain === 'cybersecurity') {
    return (
      <motion.div
        id="pipeline-inspector"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className={`p-7 sm:p-9 rounded-[32px] border space-y-6 select-none transition-colors duration-500 ${
          isNight
            ? 'bg-[#142118] border-emerald-500/35 shadow-[8px_8px_0px_#040906]'
            : 'bg-[#fffdf5] border-2 border-[#0f172a] shadow-[8px_8px_0px_#0f172a]'
        }`}
      >
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 transition-colors duration-500 ${
          isNight ? 'border-emerald-500/20' : 'border-[#0f172a]/10'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center ${
              isNight ? 'border-red-500/40 bg-red-950/40 text-red-400 shadow-[3px_3px_0px_#040906]' : 'border-[#0f172a] shadow-[3px_3px_0px_#0f172a] bg-[#fee2e2] text-[#dc2626]'
            }`}>
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`text-2xl sm:text-3xl font-black tracking-tight ${isNight ? 'text-[#f8fafc]' : 'text-[#0f172a]'}`}>
                  Cyber Security
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-[#fee2e2] text-[#dc2626] border border-[#dc2626]">
                  COMING SOON
                </span>
              </div>

              <div className={`text-xs font-mono font-bold mt-0.5 ${isNight ? 'text-amber-400' : 'text-[#2d6a4f]'}`}>
                Riset &amp; Eksplorasi Keamanan Siber
              </div>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-[#fee2e2] border border-[#dc2626] text-xs font-mono font-bold text-[#dc2626] self-start sm:self-auto flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>Tahap Persiapan</span>
          </div>
        </div>

        {/* security exploration description */}
        <div className="space-y-2">
          <div className={`text-xs font-mono font-bold uppercase tracking-wider ${isNight ? 'text-stone-400' : 'text-[#64748b]'}`}>
            Fokus Eksplorasi
          </div>
          <p className={`text-sm sm:text-base font-medium leading-relaxed p-4 rounded-2xl border ${
            isNight ? 'bg-[#1a2a20] border-emerald-500/25 text-stone-200' : 'bg-[#edf2eb]/60 border-[#0f172a]/20 text-[#1e293b]'
          }`}>
            Bidang keamanan siber yang sedang dipersiapkan mencakup Web Application Security (OWASP Top 10), Network Traffic Analysis, Capture The Flag (CTF), dan Linux System Security.
          </p>
        </div>

        {/* security toolkit cards */}
        <div className="space-y-3 pt-2">
          <div className={`text-xs font-mono font-bold uppercase tracking-wider ${isNight ? 'text-amber-400' : 'text-[#2d6a4f]'}`}>
            Domain yang Dipersiapkan
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className={`p-4 rounded-2xl border space-y-1 ${
              isNight ? 'bg-[#1a2a20] border-emerald-500/30 text-[#f8fafc] shadow-[3px_3px_0px_#040906]' : 'bg-[#edf2eb] border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a]'
            }`}>
              <div className={`flex items-center gap-2 text-xs font-mono font-black ${isNight ? 'text-[#f8fafc]' : 'text-[#0f172a]'}`}>
                <Lock className="w-4 h-4 text-[#dc2626]" />
                <span>Web App Security</span>
              </div>
              <p className={`text-xs font-medium ${isNight ? 'text-stone-300' : 'text-[#475569]'}`}>
                Vulnerability testing, pencegahan XSS/SQLi, dan audit otentikasi.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${
              isNight ? 'bg-[#1a2a20] border-emerald-500/30 text-[#f8fafc] shadow-[3px_3px_0px_#040906]' : 'bg-[#edf2eb] border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a]'
            }`}>
              <div className={`flex items-center gap-2 text-xs font-mono font-black ${isNight ? 'text-[#f8fafc]' : 'text-[#0f172a]'}`}>
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Network Analysis</span>
              </div>
              <p className={`text-xs font-medium ${isNight ? 'text-stone-300' : 'text-[#475569]'}`}>
                Port scanning, inspeksi paket jaringan, dan firewall.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${
              isNight ? 'bg-[#1a2a20] border-emerald-500/30 text-[#f8fafc] shadow-[3px_3px_0px_#040906]' : 'bg-[#edf2eb] border-2 border-[#0f172a] shadow-[3px_3px_0px_#0f172a]'
            }`}>
              <div className={`flex items-center gap-2 text-xs font-mono font-black ${isNight ? 'text-[#f8fafc]' : 'text-[#0f172a]'}`}>
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Linux Security</span>
              </div>
              <p className={`text-xs font-medium ${isNight ? 'text-stone-300' : 'text-[#475569]'}`}>
                Hardening izin sistem, manajemen SSH, dan isolasi proses.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // specific technology inspection view
  if (selectedTech) {
    const Icon = iconMap[selectedTech.iconKey];
    const relatedProjects = projectsData.filter((p) =>
      selectedTech.projectLinks?.includes(p.id)
    );

    return (
      <motion.div
        id="pipeline-inspector"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className={`p-7 sm:p-9 rounded-[32px] border space-y-6 select-none transition-colors duration-500 ${
          isNight
            ? 'bg-[#142118] border-emerald-500/35 shadow-[8px_8px_0px_#040906]'
            : 'bg-[#fffdf5] border-2 border-[#0f172a] shadow-[8px_8px_0px_#0f172a]'
        }`}
      >
        {/* inspector header */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 transition-colors duration-500 ${
          isNight ? 'border-emerald-500/20' : 'border-[#0f172a]/10'
        }`}>
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center ${
                isNight ? 'bg-[#1a2a20] border-emerald-500/30 shadow-[3px_3px_0px_#040906]' : 'bg-[#edf2eb] border-[#0f172a] shadow-[3px_3px_0px_#0f172a]'
              }`}
              style={{ color: selectedTech.color }}
            >
              {Icon ? (
                <Icon size={30} color={selectedTech.color} />
              ) : (
                <Code2 className="w-7 h-7 text-[#0f172a]" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`text-2xl sm:text-3xl font-black tracking-tight ${isNight ? 'text-[#f8fafc]' : 'text-[#0f172a]'}`}>
                  {selectedTech.name}
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-[#fde047] text-[#0f172a] border border-[#0f172a]">
                  {selectedTech.roleTag || selectedTech.category}
                </span>
              </div>

              <div className={`text-xs font-mono font-bold mt-0.5 ${isNight ? 'text-amber-400' : 'text-[#2d6a4f]'}`}>
                Kategori: {layerInfo.title}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClearTechSelection}
            className={`self-start sm:self-auto px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold border transition-colors cursor-pointer ${
              isNight
                ? 'bg-[#1a2a20] hover:bg-amber-400 hover:text-stone-900 border-emerald-500/30 text-stone-200'
                : 'bg-[#edf2eb] hover:bg-[#fde047] text-[#0f172a] border-[#0f172a]'
            }`}
          >
            &larr; Lihat Detail Kategori
          </button>
        </div>

        {/* usage context */}
        <div className="space-y-2">
          <div className={`text-xs font-mono font-bold uppercase tracking-wider ${isNight ? 'text-stone-400' : 'text-[#64748b]'}`}>
            Penggunaan
          </div>
          <p className={`text-sm sm:text-base font-medium leading-relaxed p-4 rounded-2xl border ${
            isNight ? 'bg-[#1a2a20] border-emerald-500/25 text-stone-200' : 'bg-[#edf2eb]/60 border-[#0f172a]/20 text-[#1e293b]'
          }`}>
            {selectedTech.usageContext}
          </p>
        </div>

        {/* connected portfolio projects */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isNight ? 'text-amber-400' : 'text-[#2d6a4f]'}`}>
              Digunakan di Proyek
            </span>
            <span className={`text-[11px] font-mono ${isNight ? 'text-stone-400' : 'text-[#64748b]'}`}>
              {relatedProjects.length} Proyek Terkait
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {relatedProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer group flex flex-col justify-between ${
                  isNight
                    ? 'bg-[#1a2a20] hover:bg-[#22382c] border-emerald-500/35 shadow-[3px_3px_0px_#040906] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_#040906]'
                    : 'bg-[#edf2eb] hover:bg-[#fde047] border-[#0f172a] shadow-[3px_3px_0px_#0f172a] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_#0f172a]'
                }`}
              >
                <div>
                  <div className={`flex items-center justify-between text-[10px] font-mono font-bold uppercase pb-1 ${
                    isNight ? 'text-stone-400' : 'text-[#64748b]'
                  }`}>
                    <span>{proj.category === 'fullstack' ? 'Web System' : 'Mobile App'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-current group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <h4 className={`text-sm font-black tracking-tight transition-colors ${
                    isNight ? 'text-[#f8fafc] group-hover:text-amber-300' : 'text-[#0f172a] group-hover:text-[#2d6a4f]'
                  }`}>
                    {proj.title}
                  </h4>
                  <p className={`text-xs line-clamp-2 mt-1 font-medium leading-tight ${
                    isNight ? 'text-stone-300' : 'text-[#334155]'
                  }`}>
                    {proj.summary}
                  </p>
                </div>

                <div className={`mt-3 pt-2 border-t text-[11px] font-mono font-bold ${
                  isNight ? 'border-emerald-500/20 text-amber-400' : 'border-[#0f172a]/15 text-[#2d6a4f]'
                }`}>
                  {proj.role.split('(')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  // default layer view
  return (
    <motion.div
      id="pipeline-inspector"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`p-7 sm:p-9 rounded-[32px] border space-y-6 select-none transition-colors duration-500 ${
        isNight
          ? 'bg-[#142118] border-emerald-500/35 shadow-[8px_8px_0px_#040906]'
          : 'bg-[#fffdf5] border-2 border-[#0f172a] shadow-[8px_8px_0px_#0f172a]'
      }`}
    >
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 transition-colors duration-500 ${
        isNight ? 'border-emerald-500/20' : 'border-[#0f172a]/10'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl bg-[#2d6a4f] text-white text-xs font-mono font-black border border-[#0f172a]">
              DETAIL KATEGORI
            </span>
            <span className={`text-xs font-mono font-bold uppercase ${isNight ? 'text-stone-400' : 'text-[#64748b]'}`}>
              {layerInfo.role}
            </span>
          </div>
          <h3 className={`text-2xl sm:text-3xl font-black tracking-tight mt-1.5 ${isNight ? 'text-[#f8fafc]' : 'text-[#0f172a]'}`}>
            {layerInfo.title}
          </h3>
        </div>

        <div className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold self-start sm:self-auto ${
          isNight ? 'bg-[#1a2a20] border-emerald-500/30 text-amber-300' : 'bg-[#edf2eb] border-[#0f172a] text-[#0f172a]'
        }`}>
          {layerInfo.subtitle}
        </div>
      </div>

      <p className={`text-sm sm:text-base font-medium leading-relaxed ${isNight ? 'text-stone-300' : 'text-[#334155]'}`}>
        {layerInfo.description}
      </p>

      {/* engineering focus */}
      <div className="space-y-2.5 pt-1">
        <div className={`text-xs font-mono font-bold uppercase tracking-wider ${isNight ? 'text-amber-400' : 'text-[#2d6a4f]'}`}>
          Fokus Utama
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {layerInfo.guarantees.map((guarantee, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border flex items-center gap-2.5 text-xs font-mono font-bold ${
                isNight
                  ? 'bg-[#1a2a20] border-emerald-500/30 text-[#f8fafc] shadow-[3px_3px_0px_#040906]'
                  : 'bg-[#edf2eb] border-2 border-[#0f172a] text-[#0f172a] shadow-[3px_3px_0px_#0f172a]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{guarantee}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
