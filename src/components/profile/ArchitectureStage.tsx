import React, { useRef, useState } from 'react';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface Area {
  id: string;
  title: string;
  summary: string;
  evidence: string[];
}

const AREAS: Area[] = [
  {
    id: 'fullstack',
    title: 'Full-Stack Web',
    summary: 'Membangun aplikasi web end-to-end, dari API dan database sampai antarmuka, untuk e-commerce, sistem gudang, CRM penjualan, dan dashboard internal.',
    evidence: [
      'Backend REST API dengan Node.js (Express, NestJS) dan Laravel, database PostgreSQL dengan Prisma, dokumentasi API dengan Swagger',
      'Frontend Next.js dan React dengan TypeScript dan Zustand',
      'Autentikasi dan otorisasi: JWT HttpOnly cookie, CSRF, RBAC, Row-Level Security, rate limiting, dan verifikasi signature webhook',
      'Konsistensi data: database transaction, row locking, Transactional Outbox, dan penanganan request ganda',
      'Antrean BullMQ, notifikasi real-time Socket.IO, dan cron job',
      'Integrasi Midtrans, Accurate Online ERP, dan sinkronisasi data dari Notion',
      'Pengujian dengan Cypress, Vitest, PHPUnit, dan Playwright'
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile Flutter',
    summary: 'Membangun aplikasi mobile Android dengan Flutter untuk pelanggan dan tim sales.',
    evidence: [
      'Clean Architecture dengan Riverpod untuk state dan Dio untuk jaringan',
      'Autentikasi OTP dan pembayaran lewat Midtrans',
      'Antrean offline dan refresh token otomatis untuk penggunaan di lapangan',
      'Distribusi lewat closed testing Google Play'
    ]
  },
  {
    id: 'infra',
    title: 'Server & Deployment',
    summary: 'Menyiapkan dan mengelola sendiri server serta alur rilis untuk sekitar 11 aplikasi.',
    evidence: [
      'VPS Ubuntu 24.04 dengan Docker Compose per aplikasi',
      'Caddy dengan TLS otomatis, firewall UFW, dan akses SSH berbasis kunci',
      'CI/CD GitHub Actions dengan deploy via SSH user non-root, rilis dibatalkan otomatis bila migrasi gagal',
      'Backup harian ke Cloudflare R2',
      'Admin repositori GitHub dan pengelola tim developer: merge PR, deploy, dan pembagian pekerjaan'
    ]
  }
];

export const ArchitectureStage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';
  const muted = isNight ? 'text-[#95a499]' : 'text-[#48564c]';
  const divider = isNight ? 'border-[#1f2d24]' : 'border-[#e4ded5]';
  const area = AREAS[activeIndex];

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (index + step + AREAS.length) % AREAS.length;
    setActiveIndex(next);
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
    <div className="w-full flex flex-col gap-8">
      <div
        role="tablist"
        aria-label="Area keahlian"
        className={`grid grid-cols-3 gap-2 p-1.5 rounded-2xl border ${
          isNight ? 'bg-[#111a14] border-[#1f2d24]' : 'bg-[#f4f1ea] border-[#e4ded5]'
        }`}
      >
        {AREAS.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            id={`area-tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-controls={`area-panel-${item.id}`}
            tabIndex={index === activeIndex ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={tabClass(index === activeIndex)}
          >
            <span className={`text-[10px] font-mono font-bold ${
              index === activeIndex ? '' : 'opacity-60'
            }`}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="mt-0.5 text-xs sm:text-sm font-bold tracking-tight leading-tight max-w-full">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`area-panel-${area.id}`}
        aria-labelledby={`area-tab-${area.id}`}
        className={`pt-5 border-t ${divider}`}
      >
        <p className={`text-sm leading-relaxed ${muted}`}>{area.summary}</p>
        <ul className={`mt-3 space-y-1.5 text-sm leading-relaxed list-disc pl-5 ${
          isNight ? 'marker:text-[#80ed99]' : 'marker:text-[#1b4332]'
        }`}>
          {area.evidence.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
