import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  CheckCircle2,
  ArrowUpRight,
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
  SiVercel,
  SiRedis,
  SiNestjs,
  SiCaddy,
  SiDart,
  SiPwa
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
  vercel: SiVercel,
  redis: SiRedis,
  nestjs: SiNestjs,
  caddy: SiCaddy,
  dart: SiDart,
  pwa: SiPwa
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
      'Integritas Relasi Database & Migrasi Data',
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
        className={`p-6 sm:p-8 rounded-3xl border space-y-6 select-none transition-colors duration-500 ${
          isNight
            ? 'bg-[#111a14] border-emerald-500/20 shadow-xl'
            : 'bg-white border-[#e4ded5] shadow-lg shadow-stone-900/5'
        }`}
      >
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b transition-colors duration-500 ${
          isNight ? 'border-emerald-500/20' : 'border-[#e4ded5]'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${
              isNight ? 'border-emerald-500/30 bg-emerald-950/20 text-emerald-400' : 'border-[#bed8cb] bg-[#eef5f1] text-[#164e33]'
            }`}>
              <Lock className="w-6 h-6" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xl sm:text-2xl font-bold tracking-tight ${isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]'}`}>
                  Cyber Security &amp; Systems
                </span>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                  isNight ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25' : 'bg-[#eef5f1] text-[#164e33] border-[#bed8cb]'
                }`}>
                  ROADMAP
                </span>
              </div>

              <div className={`text-xs font-mono font-medium mt-0.5 ${isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'}`}>
                Riset &amp; Eksplorasi Keamanan Siber Berkelanjutan
              </div>
            </div>
          </div>

          <div className={`px-3 py-1 rounded-full border text-xs font-mono font-medium self-start sm:self-auto flex items-center gap-1.5 ${
            isNight ? 'bg-[#17231c] border-emerald-500/20 text-[#95a499]' : 'bg-[#f4f1ea] border-[#e4ded5] text-[#48564c]'
          }`}>
            <Activity className="w-3.5 h-3.5" />
            <span>Tahap Studi Mandiri</span>
          </div>
        </div>

        {/* security exploration description */}
        <div className="space-y-2">
          <div className={`text-xs font-mono font-bold uppercase tracking-wider ${isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'}`}>
            Fokus Eksplorasi
          </div>
          <p className={`text-xs sm:text-sm font-normal leading-relaxed p-4 rounded-2xl border ${
            isNight ? 'bg-[#16221a] border-emerald-500/20 text-[#c2ceb9]' : 'bg-[#fcfbf9] border-[#e4ded5] text-[#38433b]'
          }`}>
            Bidang keamanan siber yang sedang dipelajari mencakup Web Application Security (OWASP Top 10), Network Traffic Analysis, Capture The Flag (CTF), dan Linux System Hardening.
          </p>
        </div>

        {/* security toolkit cards */}
        <div className="space-y-3 pt-1">
          <div className={`text-xs font-mono font-bold uppercase tracking-wider ${isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'}`}>
            Domain yang Dipersiapkan
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className={`p-4 rounded-2xl border space-y-1 ${
              isNight ? 'bg-[#16221a] border-emerald-500/20 text-[#f5f7f4]' : 'bg-[#fcfbf9] border-[#e4ded5] text-[#151e17]'
            }`}>
              <div className={`flex items-center gap-2 text-xs font-mono font-bold ${isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]'}`}>
                <Lock className="w-4 h-4 text-red-500" />
                <span>Web App Security</span>
              </div>
              <p className={`text-xs font-normal ${isNight ? 'text-[#95a499]' : 'text-[#64748b]'}`}>
                Vulnerability testing, pencegahan XSS/SQLi, dan audit otentikasi.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${
              isNight ? 'bg-[#16221a] border-emerald-500/20 text-[#f5f7f4]' : 'bg-[#fcfbf9] border-[#e4ded5] text-[#151e17]'
            }`}>
              <div className={`flex items-center gap-2 text-xs font-mono font-bold ${isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]'}`}>
                <Terminal className="w-4 h-4 text-emerald-500" />
                <span>Network Analysis</span>
              </div>
              <p className={`text-xs font-normal ${isNight ? 'text-[#95a499]' : 'text-[#64748b]'}`}>
                Port scanning, inspeksi paket jaringan, dan firewall.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${
              isNight ? 'bg-[#16221a] border-emerald-500/20 text-[#f5f7f4]' : 'bg-[#fcfbf9] border-[#e4ded5] text-[#151e17]'
            }`}>
              <div className={`flex items-center gap-2 text-xs font-mono font-bold ${isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]'}`}>
                <Activity className="w-4 h-4 text-emerald-500" />
                <span>Linux Security</span>
              </div>
              <p className={`text-xs font-normal ${isNight ? 'text-[#95a499]' : 'text-[#64748b]'}`}>
                Hardening izin sistem, manajemen SSH, dan isolasi proses Docker.
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
        className={`p-6 sm:p-8 rounded-3xl border space-y-6 select-none transition-colors duration-500 ${
          isNight
            ? 'bg-[#111a14] border-emerald-500/20 shadow-xl'
            : 'bg-white border-[#e4ded5] shadow-lg shadow-stone-900/5'
        }`}
      >
        {/* inspector header */}
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b transition-colors duration-500 ${
          isNight ? 'border-emerald-500/20' : 'border-[#e4ded5]'
        }`}>
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${
                isNight ? 'bg-[#17231c] border-emerald-500/30' : 'bg-[#ebf2ec] border-emerald-200'
              }`}
              style={{ color: selectedTech.color }}
            >
              {Icon ? (
                <Icon size={26} color={selectedTech.color} />
              ) : (
                <Code2 className="w-6 h-6 text-[#1b4332]" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xl sm:text-2xl font-bold tracking-tight ${isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]'}`}>
                  {selectedTech.name}
                </span>
                <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
                  isNight
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : 'bg-[#ebf2ec] text-[#1b4332] border-emerald-200'
                }`}>
                  {selectedTech.roleTag || selectedTech.category}
                </span>
              </div>

              <div className={`text-xs font-mono font-medium mt-0.5 ${isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'}`}>
                Kategori: {layerInfo.title}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClearTechSelection}
            className={`self-start sm:self-auto px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold border transition-colors cursor-pointer ${
              isNight
                ? 'bg-[#17231c] hover:bg-[#22382c] border-emerald-500/30 text-[#f5f7f4]'
                : 'bg-[#f4f1ea] hover:bg-[#ebf2ec] text-[#151e17] border-[#e4ded5]'
            }`}
          >
            &larr; Lihat Layer Kategori
          </button>
        </div>

        {/* usage context */}
        <div className="space-y-2">
          <div className={`text-xs font-mono font-bold uppercase tracking-wider ${isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'}`}>
            Konteks &amp; Penerapan Produksi
          </div>
          <p className={`text-xs sm:text-sm font-normal leading-relaxed p-4 rounded-2xl border ${
            isNight ? 'bg-[#16221a] border-emerald-500/20 text-[#c2ceb9]' : 'bg-[#fcfbf9] border-[#e4ded5] text-[#38433b]'
          }`}>
            {selectedTech.usageContext}
          </p>
        </div>

        {/* connected portfolio projects */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'}`}>
              Implementasi di Portofolio
            </span>
            <span className={`text-[11px] font-mono ${isNight ? 'text-[#95a499]' : 'text-[#64748b]'}`}>
              {relatedProjects.length} Proyek Terkait
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {relatedProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                  isNight
                    ? 'bg-[#16221a] hover:bg-[#1f3025] border-emerald-500/20 hover:border-emerald-500/40 shadow-sm'
                    : 'bg-white hover:bg-[#fcfbf9] border-[#e4ded5] hover:border-[#1b4332]/40 shadow-sm'
                }`}
              >
                <div>
                  <div className={`flex items-center justify-between text-[10px] font-mono font-semibold uppercase pb-1 ${
                    isNight ? 'text-[#95a499]' : 'text-[#64748b]'
                  }`}>
                    <span>{proj.category === 'fullstack' ? 'Web System' : 'Mobile App'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-current group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <h4 className={`text-sm font-bold tracking-tight transition-colors ${
                    isNight ? 'text-[#f5f7f4] group-hover:text-[#80ed99]' : 'text-[#151e17] group-hover:text-[#1b4332]'
                  }`}>
                    {proj.title}
                  </h4>
                  <p className={`text-xs line-clamp-2 mt-1 font-normal leading-relaxed ${
                    isNight ? 'text-[#95a499]' : 'text-[#48564c]'
                  }`}>
                    {proj.summary}
                  </p>
                </div>

                <div className={`mt-3 pt-2 border-t text-[11px] font-mono font-medium ${
                  isNight ? 'border-emerald-500/20 text-[#80ed99]' : 'border-[#e4ded5] text-[#1b4332]'
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
      className={`p-6 sm:p-8 rounded-3xl border space-y-6 select-none transition-colors duration-500 ${
        isNight
          ? 'bg-[#111a14] border-emerald-500/20 shadow-xl'
          : 'bg-white border-[#e4ded5] shadow-lg shadow-stone-900/5'
      }`}
    >
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b transition-colors duration-500 ${
        isNight ? 'border-emerald-500/20' : 'border-[#e4ded5]'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
              isNight
                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                : 'bg-[#ebf2ec] text-[#1b4332] border-emerald-200'
            }`}>
              DETAIL LAYER
            </span>
            <span className={`text-xs font-mono font-medium uppercase ${isNight ? 'text-[#95a499]' : 'text-[#64748b]'}`}>
              {layerInfo.role}
            </span>
          </div>
          <h3 className={`text-xl sm:text-2xl font-bold tracking-tight mt-1.5 ${isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]'}`}>
            {layerInfo.title}
          </h3>
        </div>

        <div className={`px-3 py-1 rounded-full border text-xs font-mono font-medium self-start sm:self-auto ${
          isNight ? 'bg-[#17231c] border-emerald-500/20 text-[#80ed99]' : 'bg-[#f4f1ea] border-[#e4ded5] text-[#48564c]'
        }`}>
          {layerInfo.subtitle}
        </div>
      </div>

      <p className={`text-xs sm:text-sm font-normal leading-relaxed ${isNight ? 'text-[#c2ceb9]' : 'text-[#38433b]'}`}>
        {layerInfo.description}
      </p>

      {/* engineering focus */}
      <div className="space-y-2.5 pt-1">
        <div className={`text-xs font-mono font-bold uppercase tracking-wider ${isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'}`}>
          Standar &amp; Fokus Rekayasa
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {layerInfo.guarantees.map((guarantee, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border flex items-center gap-2.5 text-xs font-mono font-medium ${
                isNight
                  ? 'bg-[#16221a] border-emerald-500/20 text-[#f5f7f4]'
                  : 'bg-[#fcfbf9] border-[#e4ded5] text-[#151e17]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{guarantee}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
