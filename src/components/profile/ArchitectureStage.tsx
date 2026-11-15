import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Smartphone, Globe, CheckCircle2, Cpu, Database, Network } from 'lucide-react';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface ArchitectureStageProps {
  viewMode?: 'overview' | 'blueprint';
}

export const ArchitectureStage: React.FC<ArchitectureStageProps> = ({ viewMode = 'overview' }) => {
  const [activePillar, setActivePillar] = useState<number>(0);
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  const pillars = [
    {
      id: 'fullstack',
      badge: 'SISTEM PRODUKSI LIVE',
      title: 'Full-Stack Web Architecture',
      tagline: 'Platform E-Commerce Skala Produksi dengan Transaksi Finansial Aman',
      icon: <Globe className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      subIcon: <Network className="w-4 h-4 text-emerald-500" />,
      description:
        'Merancang platform e-commerce omnichannel & backend terdistribusi skala produksi: storefront reaktif Next.js SSR, RESTful API modular terdokumentasi Swagger, sistem dompet digital in-app (HolyPay), pembayaran Midtrans otomatis, dan integrasi kurir real-time.',
      keyProof: 'Zero Race Conditions pada checkout diskon bertingkat & mutasi wallet.'
    },
    {
      id: 'mobile',
      badge: 'FLUTTER CLEAN ARCHITECTURE',
      title: 'High-Performance Mobile Systems',
      tagline: 'Aplikasi Mobile 60fps Native Performance Berbasis Clean Architecture',
      icon: <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      subIcon: <Cpu className="w-4 h-4 text-emerald-400" />,
      description:
        'Membangun aplikasi mobile customer performa tinggi dengan arsitektur bersih yang memisahkan dependensi bisnis dari UI: render 60fps konstan, offline-first secure caching, interseptor token auto-refresh, dan push notification tertarget FCM.',
      keyProof: '100% testable domain entities terpisah dari UI presentation layer.'
    },
    {
      id: 'infra',
      badge: 'DOCKER PRODUCTION VPS',
      title: 'DevOps & Cloud Infrastructure',
      tagline: 'Infrastruktur Linux VPS & Orkestrasi Kontainer Docker Terisolasi',
      icon: <Server className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      subIcon: <Database className="w-4 h-4 text-teal-500" />,
      description:
        'Mengelola infrastruktur VPS Linux produksi berbasis 100% Docker container: otomatisasi sertifikat SSL zero-config Caddy, isolasi jaringan container terfragmentasi (zero blast radius), backup snapshot terjadwal, dan database connection pooling.',
      keyProof: 'Uptime stabil dengan automated failover & container health check.'
    }
  ];

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Tab Switcher */}
      <div className={`grid grid-cols-3 gap-2 p-1.5 rounded-2xl border transition-colors ${
        isNight ? 'bg-[#111a14] border-emerald-500/20' : 'bg-[#f4f1ea] border-[#e4ded5]'
      }`}>
        {pillars.map((pillar, idx) => {
          const isActive = activePillar === idx;
          return (
            <button
              key={pillar.id}
              type="button"
              onClick={() => setActivePillar(idx)}
              className={`relative flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-center transition-all cursor-pointer ${
                isActive
                  ? isNight
                    ? 'bg-emerald-950/80 text-white shadow-sm border border-emerald-500/30'
                    : 'bg-white text-[#151e17] shadow-sm border border-[#e4ded5]'
                  : isNight
                  ? 'text-stone-400 hover:text-stone-200'
                  : 'text-[#48564c] hover:text-[#151e17]'
              }`}
            >
              <span className={`text-[10px] font-mono font-bold ${
                isActive ? (isNight ? 'text-emerald-400' : 'text-[#1b4332]') : 'opacity-60'
              }`}>
                0{idx + 1}
              </span>
              <span className="text-xs font-bold tracking-tight mt-0.5 truncate max-w-full">
                {pillar.id === 'fullstack' ? 'Full-Stack Web' : pillar.id === 'mobile' ? 'Mobile Flutter' : 'Cloud & DevOps'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Spec Plaque */}
      <div className={`rounded-3xl border p-6 sm:p-8 transition-colors ${
        isNight
          ? 'bg-[#111a14] border-emerald-500/20 shadow-2xl shadow-black/40'
          : 'bg-white border-[#e4ded5] shadow-lg shadow-stone-900/4'
      }`}>
        <AnimatePresence mode="wait">
          {viewMode === 'overview' ? (
            <motion.div
              key={`overview-${activePillar}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-6"
            >
              {/* Plaque Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${
                    isNight ? 'bg-[#17231c] border-emerald-500/20' : 'bg-[#f4f1ea] border-[#e4ded5]'
                  }`}>
                    {pillars[activePillar].icon}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                      {pillars[activePillar].title}
                    </h3>
                    <p className={`text-xs font-mono mt-0.5 ${
                      isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'
                    }`}>
                      {pillars[activePillar].tagline}
                    </p>
                  </div>
                </div>

                <span className={`self-start sm:self-auto text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                  isNight
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-[#ebf2ec] border-emerald-200 text-[#1b4332]'
                }`}>
                  {pillars[activePillar].badge}
                </span>
              </div>

              {/* Narrative Description */}
              <p className={`text-xs sm:text-sm leading-relaxed ${
                isNight ? 'text-[#95a499]' : 'text-[#48564c]'
              }`}>
                {pillars[activePillar].description}
              </p>

              {/* Verified Key Proof */}
              <div className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-mono ${
                isNight ? 'bg-[#152119] border-emerald-500/20 text-emerald-200' : 'bg-[#f8faf7] border-emerald-100 text-[#1b4332]'
              }`}>
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
                <span className="font-semibold">{pillars[activePillar].keyProof}</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="blueprint-mode"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-xs space-y-4"
            >
              <div className={`p-4 rounded-xl border ${
                isNight ? 'bg-[#090f0c] border-emerald-500/20 text-emerald-300' : 'bg-[#151e17] text-emerald-400'
              }`}>
                <div className="text-[10px] uppercase opacity-70 tracking-widest mb-2 font-bold text-[#80ed99]">
                  // Production Omnichannel & E-Commerce Data Flow
                </div>
                <pre className="text-[11px] leading-relaxed overflow-x-auto whitespace-pre">
{`[Client: Next.js SSR / Flutter Mobile]
        │
        ▼ (HTTPS REST / Dio Interceptor)
[Caddy Ingress Proxy :443 (Auto-SSL)]
        │
        ▼ (Internal Docker Network)
[Node.js / NestJS Core Engine]
   ├── [Prisma ORM] ──► [PostgreSQL Relational DB]
   ├── [BullMQ Queue] ──► [Redis 7 In-Memory Cache]
   └── [Webhook Listener] ◄── [Midtrans Payment Gateway]`}
                </pre>
              </div>
              <p className={`text-xs ${isNight ? 'text-[#95a499]' : 'text-[#48564c]'}`}>
                Seluruh arsitektur berjalan terisolasi di bawah Linux VPS Ubuntu 24.04 LTS via Docker Compose dengan isolasi internal network bridge.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
