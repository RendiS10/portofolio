import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Smartphone, Globe, Cpu, Database, Network } from 'lucide-react';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface ArchitectureStageProps {
  isFlooded: boolean;
}

export const ArchitectureStage: React.FC<ArchitectureStageProps> = ({ isFlooded }) => {
  const [activePillar, setActivePillar] = useState<number>(0);
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  const pillars = [
    {
      id: 'fullstack',
      title: 'Omnichannel & Full-Stack Web Engineering',
      tagline: 'Next.js, Node.js/NestJS, Prisma ORM, Redis BullMQ & Accurate ERP.',
      icon: <Globe className="w-5 h-5 text-emerald-600" />,
      subIcon: <Network className="w-4 h-4 text-emerald-500" />,
      metrics: [
        { label: 'Frontend', val: 'Next.js App Router / React / Tailwind' },
        { label: 'Backend', val: 'Node.js / NestJS / Laravel Filament' },
        { label: 'Data & Queue', val: 'PostgreSQL / Prisma / Redis BullMQ' }
      ],
      description:
        'Merancang ekosistem omnichannel skala produksi: Storefront Next.js reaktif, REST API backend Node.js & NestJS, integrasi ERP Accurate Online otomatis, antrean asinkron Redis BullMQ, serta transaksi database ACID untuk ribuan pengguna aktif.'
    },
    {
      id: 'mobile',
      title: 'Cross-Platform Mobile Architecture',
      tagline: 'Production Flutter Apps with Clean Architecture & Riverpod.',
      icon: <Smartphone className="w-5 h-5 text-amber-500" />,
      subIcon: <Cpu className="w-4 h-4 text-amber-400" />,
      metrics: [
        { label: 'Framework', val: 'Flutter 3.44+ & Dart' },
        { label: 'Architecture', val: 'Clean Architecture (Presentation, Domain, Data)' },
        { label: 'State & Network', val: 'Riverpod / GoRouter / Dio Client' }
      ],
      description:
        'Membangun aplikasi mobile Flutter performa tinggi (60fps) untuk Android & iOS dengan Clean Architecture: pemisahan layer ketat, integrasi payment gateway Midtrans, kalkulasi logistik kurir, serta offline secure caching.'
    },
    {
      id: 'infra',
      title: 'Production DevOps & Linux VPS Infrastructure',
      tagline: '100% Dockerized Services, Caddy Ingress Proxy & High-Availability.',
      icon: <Server className="w-5 h-5 text-teal-600" />,
      subIcon: <Database className="w-4 h-4 text-teal-500" />,
      metrics: [
        { label: 'Server OS', val: 'Ubuntu 24.04 LTS (8 vCPU / 23 GB RAM)' },
        { label: 'Container & Proxy', val: 'Docker Compose & Caddy / NGINX Ingress' },
        { label: 'Database & Cache', val: 'PostgreSQL Clusters & Redis 7 AOF' }
      ],
      description:
        'Mengelola infrastruktur server VPS Linux berbasis 100% Docker container di bawah /opt/: konfigurasi reverse proxy Caddy dengan auto-SSL, isolasi jaringan zero blast radius, pemantauan proses PM2, serta database pooling Supabase PostgreSQL.'
    }
  ];

  return (
    <div className="w-full flex flex-col gap-6 transition-colors duration-500">
      {/* Selector Tabs */}
      <div className={`grid grid-cols-3 gap-2.5 p-1.5 rounded-2xl border shadow-sm transition-colors duration-500 ${
        isNight ? 'bg-[#142118] border-emerald-500/30' : 'bg-[#fffdf5] border-[#d8dfd5]'
      }`}>
        {pillars.map((pillar, idx) => (
          <motion.button
            key={pillar.id}
            type="button"
            onClick={() => setActivePillar(idx)}
            animate={
              isFlooded
                ? {
                    rotate: idx === 0 ? -18 : idx === 1 ? 20 : -22,
                    y: idx === 0 ? 14 : idx === 1 ? -16 : 20,
                    x: idx === 0 ? -8 : idx === 1 ? 8 : 12
                  }
                : { rotate: 0, y: 0, x: 0 }
            }
            className={`flex flex-col items-center justify-center p-3 rounded-xl text-center transition-all cursor-pointer ${
              activePillar === idx
                ? 'bg-[#2d6a4f] text-white shadow-md'
                : isNight
                ? 'hover:bg-[#1a2a20] text-stone-300 hover:text-white'
                : 'hover:bg-[#edf2eb] text-[#475569] hover:text-[#0f172a]'
            }`}
          >
            <span
              className={`text-xs font-mono font-bold block ${
                activePillar === idx ? 'text-white' : isNight ? 'text-amber-400' : 'text-[#2d6a4f]'
              }`}
            >
              0{idx + 1}
            </span>
            <span className="text-xs font-bold leading-tight mt-0.5">
              {pillar.id.toUpperCase()}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Active Pillar */}
      <div className={`relative min-h-[305px] sm:min-h-[315px] rounded-[32px] border shadow-xl overflow-hidden transition-colors duration-500 ${
        isNight
          ? 'bg-[#142118] border-emerald-500/30 shadow-emerald-950/30'
          : 'bg-[#fffdf5] border-[#d8dfd5] shadow-[#2d6a4f]/6'
      }`}>
        <motion.div
          key={activePillar}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="p-7 sm:p-9 h-full flex flex-col justify-between space-y-5"
        >
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className={`p-3 rounded-2xl border shadow-sm shrink-0 transition-colors duration-500 ${
                  isNight ? 'bg-[#1a2a20] border-emerald-500/20' : 'bg-[#edf2eb] border-[#d8dfd5]'
                }`}>
                  {pillars[activePillar].icon}
                </div>
                <div>
                  <h3 className={`text-lg sm:text-2xl font-black tracking-tight leading-tight transition-colors duration-500 ${
                    isNight ? 'text-[#f8fafc]' : 'text-[#0f172a]'
                  }`}>
                    {pillars[activePillar].title}
                  </h3>
                  <p className={`text-xs font-mono mt-0.5 transition-colors duration-500 ${
                    isNight ? 'text-amber-300' : 'text-[#2d6a4f]'
                  }`}>
                    {pillars[activePillar].tagline}
                  </p>
                </div>
              </div>

              <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-mono transition-colors duration-500 ${
                isNight ? 'bg-[#1a2a20] border-emerald-500/30 text-amber-300' : 'bg-[#edf2eb] border-[#d8dfd5] text-[#2d6a4f]'
              }`}>
                {pillars[activePillar].subIcon}
                <span className="font-bold">VERIFIED</span>
              </div>
            </div>

            <p className={`mt-4 text-xs sm:text-sm leading-relaxed transition-colors duration-500 ${
              isNight ? 'text-stone-300' : 'text-[#475569]'
            }`}>
              {pillars[activePillar].description}
            </p>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-emerald-500/20">
            {pillars[activePillar].metrics.map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl border shadow-xs transition-colors duration-500 ${
                  isNight ? 'bg-[#1a2a20] border-emerald-500/20 text-[#f8fafc]' : 'bg-[#edf2eb] border-[#d8dfd5] text-[#0f172a]'
                }`}
              >
                <div className={`text-[10px] font-mono font-bold uppercase transition-colors duration-500 ${
                  isNight ? 'text-amber-400' : 'text-[#2d6a4f]'
                }`}>
                  {m.label}
                </div>
                <div className="text-xs font-bold tracking-tight mt-0.5 truncate">
                  {m.val}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
