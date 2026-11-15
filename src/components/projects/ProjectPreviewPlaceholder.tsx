import React from 'react';
import {
  Globe,
  Smartphone,
  Sparkles,
  ShoppingBag,
  ShoppingCart,
  ShieldCheck,
  Activity,
  Check,
  Layers
} from 'lucide-react';
import type { Project } from '../../types/portfolio';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface ProjectPreviewPlaceholderProps {
  project: Project;
  className?: string;
  isMobileFrame?: boolean;
}

export const ProjectPreviewPlaceholder: React.FC<ProjectPreviewPlaceholderProps> = ({
  project,
  className = '',
  isMobileFrame = false
}) => {
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';
  const isMobile = isMobileFrame || project.category === 'mobile' || Boolean(project.isMobileApp);

  // 1. Mobile Flutter App Frame (e.g. HolyCat Mobile)
  if (isMobile) {
    return (
      <div className={`relative flex items-center justify-center p-2 sm:p-4 ${className}`}>
        {/* Smartphone Chassis Frame */}
        <div
          className={`relative w-full max-w-[270px] sm:max-w-[290px] aspect-[9/18.5] rounded-[42px] p-2.5 sm:p-3 border transition-all duration-300 ${
            isNight
              ? 'bg-[#141e17] border-stone-800 shadow-xl shadow-black/60'
              : 'bg-[#f4f1ea] border-[#e4ded5] shadow-lg shadow-stone-900/5'
          }`}
        >
          {/* Hardware Buttons */}
          <div className="absolute -left-[2px] top-20 w-[2px] h-8 bg-stone-400/40 rounded-l" />
          <div className="absolute -left-[2px] top-32 w-[2px] h-8 bg-stone-400/40 rounded-l" />
          <div className="absolute -right-[2px] top-24 w-[2px] h-12 bg-stone-400/40 rounded-r" />

          {/* Inner Screen */}
          <div
            className={`relative w-full h-full rounded-[34px] overflow-hidden flex flex-col border ${
              isNight ? 'bg-[#090f0c] border-stone-800' : 'bg-white border-stone-200'
            }`}
          >
            {/* Dynamic Island */}
            <div className="absolute top-2 inset-x-0 z-30 flex justify-center pointer-events-none">
              <div className="w-20 h-4 bg-black rounded-full flex items-center justify-end pr-2 gap-1.5 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-stone-700/60" />
              </div>
            </div>

            {/* Mobile App UI Screen */}
            <div className="relative w-full h-full flex flex-col justify-between pt-8 pb-2.5 px-3 select-none">
              {/* App Status & Header */}
              <div className="flex items-center justify-between pb-2 border-b border-stone-200/70 dark:border-stone-800">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center ${
                      isNight ? 'bg-[#1b2b20] text-emerald-300' : 'bg-[#ebf2ec] text-[#1b4332]'
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                  </div>
                  <span className="text-[11px] font-bold font-sans tracking-tight">
                    HolyCat Mobile
                  </span>
                </div>
                <span
                  className={`text-[8px] font-mono font-medium px-1.5 py-0.5 rounded border ${
                    isNight
                      ? 'bg-[#16231a] border-stone-800 text-stone-300'
                      : 'bg-stone-100 border-stone-200 text-stone-700'
                  }`}
                >
                  60 FPS FLUTTER
                </span>
              </div>

              {/* Posyancing Banner */}
              <div
                className={`p-2.5 rounded-xl border flex flex-col gap-1 transition-colors ${
                  isNight
                    ? 'bg-[#121c15] border-stone-800'
                    : 'bg-[#fcfbf8] border-[#e4ded5]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[9px] font-mono font-medium flex items-center gap-1 ${
                      isNight ? 'text-emerald-400' : 'text-[#1b4332]'
                    }`}
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    Posyancing Digital
                  </span>
                  <span className="text-[8px] font-mono opacity-50">Clean Arch</span>
                </div>
                <div className="text-[11px] font-bold leading-tight">
                  Rekam Medis &amp; Booking
                </div>
                <div className="text-[9px] font-mono opacity-60">
                  Riwayat Vaksin, Steril &amp; KTP Kucing
                </div>
              </div>

              {/* 4 Quick Actions Grid */}
              <div className="grid grid-cols-2 gap-1.5 my-1">
                {[
                  { label: 'Konsultasi Dokter', tag: 'Chat Live' },
                  { label: 'Grooming Pasteur', tag: 'Booking' },
                  { label: 'KTP Kucing', tag: 'Microchip' },
                  { label: 'HolyPay Saldo', tag: 'Rp 250rb' }
                ].map((act, idx) => (
                  <div
                    key={idx}
                    className={`p-2 rounded-lg border text-left flex flex-col justify-between ${
                      isNight
                        ? 'bg-[#131d16] border-stone-800 text-[#f5f7f4]'
                        : 'bg-[#f8f7f4] border-[#e4ded5] text-[#151e17]'
                    }`}
                  >
                    <span className="text-[9px] font-bold tracking-tight leading-tight">
                      {act.label}
                    </span>
                    <span
                      className={`text-[8px] font-mono font-medium mt-1 ${
                        isNight ? 'text-emerald-400' : 'text-[#2d6a4f]'
                      }`}
                    >
                      {act.tag}
                    </span>
                  </div>
                ))}
              </div>

              {/* Active Booking Card */}
              <div
                className={`p-2 rounded-xl border flex items-center justify-between ${
                  isNight
                    ? 'bg-[#142219] border-stone-800 text-stone-200'
                    : 'bg-[#ebf2ec] border-stone-300/80 text-[#1b4332]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f] dark:bg-[#52b788]" />
                  <div>
                    <div className="text-[9px] font-bold">Vaksinasi F4 Rutin</div>
                    <div className="text-[8px] font-mono opacity-70">drh. Sarah K. • Terjadwal</div>
                  </div>
                </div>
                <Check className="w-3 h-3 text-[#2d6a4f] dark:text-[#52b788]" />
              </div>

              {/* Bottom Nav Bar */}
              <div className="pt-2 border-t border-stone-200/70 dark:border-stone-800 flex items-center justify-around text-[8px] font-mono">
                <span className={`font-bold ${isNight ? 'text-emerald-400' : 'text-[#1b4332]'}`}>
                  Beranda
                </span>
                <span className="opacity-50">Layanan</span>
                <span className="opacity-50">Aktivitas</span>
                <span className="opacity-50">Profil</span>
              </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1 inset-x-0 flex justify-center z-20 pointer-events-none">
              <div className={`w-20 h-1 rounded-full ${isNight ? 'bg-white/30' : 'bg-black/20'}`} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Desktop Web Platform: Abby & Gail Skincare E-Commerce
  if (project.id === 'abbygail') {
    return (
      <div
        className={`relative w-full rounded-2xl sm:rounded-3xl border overflow-hidden transition-all duration-300 group/preview ${
          isNight
            ? 'bg-[#111a14] border-stone-800 shadow-xl shadow-black/50'
            : 'bg-white border-[#e4ded5] shadow-lg shadow-stone-900/5'
        } ${className}`}
      >
        {/* Minimalist Browser Chrome Bar */}
        <div
          className={`flex items-center justify-between px-4 py-2.5 border-b transition-colors ${
            isNight ? 'bg-[#141f18] border-stone-800' : 'bg-[#f4f1ea] border-[#e4ded5]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />

            <div
              className={`ml-2 px-3 py-1 rounded-md text-[11px] font-mono truncate max-w-[200px] sm:max-w-[280px] flex items-center gap-1.5 border ${
                isNight
                  ? 'bg-[#090f0c] border-stone-800 text-stone-300'
                  : 'bg-white border-[#e4ded5] text-[#151e17]'
              }`}
            >
              <ShieldCheck className="w-3 h-3 shrink-0 text-[#2d6a4f] dark:text-[#52b788]" />
              <span className="truncate">https://abbyandgail.com</span>
            </div>
          </div>

          <div
            className={`flex items-center gap-1.5 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded border ${
              isNight
                ? 'bg-[#17231b] border-stone-800 text-stone-300'
                : 'bg-[#ebf2ec] border-stone-300/80 text-[#1b4332]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f] dark:bg-[#52b788]" />
            <span>KOMERSIAL LIVE</span>
          </div>
        </div>

        {/* Viewport: Live Skincare Storefront Studio + Telemetry HUD */}
        <div
          className={`relative w-full aspect-[16/11] overflow-hidden flex flex-col justify-between p-4 sm:p-6 select-none ${
            isNight ? 'bg-[#090f0c]' : 'bg-[#fcfbf8]'
          }`}
        >
          {/* Subtle Grid Watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.035]">
            <svg viewBox="0 0 800 500" fill="none" className="w-full h-full" preserveAspectRatio="none">
              <line x1="0" y1="120" x2="800" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="260" x2="800" y2="260" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="260" y1="0" x2="260" y2="500" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="540" y1="0" x2="540" y2="500" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Storefront Mini Header */}
          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-stone-200/70 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                  isNight ? 'bg-[#1c2c20] text-stone-200' : 'bg-[#1b4332] text-white'
                }`}
              >
                🌿
              </div>
              <div>
                <div className="text-xs font-black font-sans tracking-tight">Abby &amp; Gail Skincare</div>
                <div className="text-[10px] font-mono opacity-60">Botanical Derma-Care</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono border ${
                  isNight
                    ? 'bg-[#131d16] border-stone-800 text-stone-400'
                    : 'bg-white border-[#e4ded5] text-stone-600'
                }`}
              >
                <span>Serum • Sunscreen</span>
              </div>
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium border ${
                  isNight
                    ? 'bg-[#16241b] border-stone-800 text-stone-300'
                    : 'bg-stone-100 border-stone-200 text-stone-700'
                }`}
              >
                <ShoppingCart className="w-3 h-3" />
                <span>1 Item</span>
              </div>
            </div>
          </div>

          {/* Product Showcase Cards (2 Columns) */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto py-2">
            {/* Product Card 1 */}
            <div
              className={`p-3.5 rounded-2xl border flex flex-col justify-between transition-all ${
                isNight
                  ? 'bg-[#111a14] border-stone-800'
                  : 'bg-white border-[#e4ded5] shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[9px] font-mono font-medium px-2 py-0.5 rounded border ${
                      isNight
                        ? 'bg-[#18261e] border-stone-800 text-stone-300'
                        : 'bg-stone-100 border-stone-200 text-stone-700'
                    }`}
                  >
                    BARRIER REPAIR
                  </span>
                  <div className="text-[9px] font-mono text-stone-500 dark:text-stone-400">
                    ★ 4.9 (310)
                  </div>
                </div>

                <div className="text-xs font-bold leading-snug line-clamp-1">
                  Niacinamide + Centella Serum
                </div>
                <div className="text-[10px] font-mono opacity-60 mt-0.5">
                  30 ml • Soothing &amp; Hydration
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-stone-200/50 dark:border-stone-800">
                <span className="text-xs font-bold font-mono text-[#151e17] dark:text-[#f5f7f4]">
                  Rp 149.000
                </span>
                <span
                  className={`text-[9px] font-mono font-medium px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors ${
                    isNight
                      ? 'bg-[#1a281f] text-stone-200 border border-stone-700'
                      : 'bg-[#1b4332] text-white'
                  }`}
                >
                  <ShoppingBag className="w-2.5 h-2.5" />
                  + Beli Sekarang
                </span>
              </div>
            </div>

            {/* Product Card 2 */}
            <div
              className={`p-3.5 rounded-2xl border flex flex-col justify-between transition-all ${
                isNight
                  ? 'bg-[#111a14] border-stone-800'
                  : 'bg-white border-[#e4ded5] shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[9px] font-mono font-medium px-2 py-0.5 rounded border ${
                      isNight
                        ? 'bg-[#18261e] border-stone-800 text-stone-300'
                        : 'bg-stone-100 border-stone-200 text-stone-700'
                    }`}
                  >
                    UV PROTECTION
                  </span>
                  <div className="text-[9px] font-mono text-stone-500 dark:text-stone-400">
                    ★ 4.9 (245)
                  </div>
                </div>

                <div className="text-xs font-bold leading-snug line-clamp-1">
                  Ceramide Daily Shield SPF 50+
                </div>
                <div className="text-[10px] font-mono opacity-60 mt-0.5">
                  50 gr • Zero Whitecast
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-stone-200/50 dark:border-stone-800">
                <span className="text-xs font-bold font-mono text-[#151e17] dark:text-[#f5f7f4]">
                  Rp 129.000
                </span>
                <span
                  className={`text-[9px] font-mono font-medium px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors ${
                    isNight
                      ? 'bg-[#1a281f] text-stone-200 border border-stone-700'
                      : 'bg-[#1b4332] text-white'
                  }`}
                >
                  <ShoppingBag className="w-2.5 h-2.5" />
                  + Beli Sekarang
                </span>
              </div>
            </div>
          </div>

          {/* Live Architecture Telemetry HUD */}
          <div
            className={`relative z-10 p-2.5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono transition-colors ${
              isNight
                ? 'bg-[#121b15] border-stone-800 text-stone-400'
                : 'bg-[#f4f1ea] border-[#e4ded5] text-[#48564c]'
            }`}
          >
            <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300 font-semibold">
              <Activity className="w-3.5 h-3.5 text-[#2d6a4f] dark:text-[#52b788]" />
              <span>LIVE TELEMETRY HUD</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[9px]">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f] dark:bg-[#52b788]" />
                <span className="text-[#151e17] dark:text-[#f5f7f4]">Next.js SSR Sub-100ms</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f] dark:bg-[#52b788]" />
                <span className="text-[#151e17] dark:text-[#f5f7f4]">AdonisJS REST Engine</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f] dark:bg-[#52b788]" />
                <span className="text-[#151e17] dark:text-[#f5f7f4]">30+ Tabel PostgreSQL</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Desktop Web Platform: HolyCat E-Commerce Storefront
  if (project.id === 'holycat') {
    return (
      <div
        className={`relative w-full rounded-2xl sm:rounded-3xl border overflow-hidden transition-all duration-300 group/preview ${
          isNight
            ? 'bg-[#111a14] border-stone-800 shadow-xl shadow-black/50'
            : 'bg-white border-[#e4ded5] shadow-lg shadow-stone-900/5'
        } ${className}`}
      >
        {/* Minimalist Browser Chrome Bar */}
        <div
          className={`flex items-center justify-between px-4 py-2.5 border-b transition-colors ${
            isNight ? 'bg-[#141f18] border-stone-800' : 'bg-[#f4f1ea] border-[#e4ded5]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />

            <div
              className={`ml-2 px-3 py-1 rounded-md text-[11px] font-mono truncate max-w-[200px] sm:max-w-[280px] flex items-center gap-1.5 border ${
                isNight
                  ? 'bg-[#090f0c] border-stone-800 text-stone-300'
                  : 'bg-white border-[#e4ded5] text-[#151e17]'
              }`}
            >
              <ShieldCheck className="w-3 h-3 shrink-0 text-[#2d6a4f] dark:text-[#52b788]" />
              <span className="truncate">https://shop.holycatlabs.com</span>
            </div>
          </div>

          <div
            className={`flex items-center gap-1.5 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded border ${
              isNight
                ? 'bg-[#17231b] border-stone-800 text-stone-300'
                : 'bg-[#ebf2ec] border-stone-300/80 text-[#1b4332]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f] dark:bg-[#52b788]" />
            <span>ONLINE 99.9%</span>
          </div>
        </div>

        {/* Viewport: Live Storefront Studio + Telemetry HUD */}
        <div
          className={`relative w-full aspect-[16/11] overflow-hidden flex flex-col justify-between p-4 sm:p-6 select-none ${
            isNight ? 'bg-[#090f0c]' : 'bg-[#fcfbf8]'
          }`}
        >
          {/* Subtle Grid Watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.035]">
            <svg viewBox="0 0 800 500" fill="none" className="w-full h-full" preserveAspectRatio="none">
              <line x1="0" y1="120" x2="800" y2="120" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="260" x2="800" y2="260" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="260" y1="0" x2="260" y2="500" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="540" y1="0" x2="540" y2="500" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </div>

          {/* Storefront Mini Header */}
          <div className="relative z-10 flex items-center justify-between pb-3 border-b border-stone-200/70 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                  isNight ? 'bg-[#1c2c20] text-stone-200' : 'bg-[#1b4332] text-white'
                }`}
              >
                🐾
              </div>
              <div>
                <div className="text-xs font-black font-sans tracking-tight">HolyCat Storefront</div>
                <div className="text-[10px] font-mono opacity-60">Pet Care &amp; Nutrition</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-mono border ${
                  isNight
                    ? 'bg-[#131d16] border-stone-800 text-stone-400'
                    : 'bg-white border-[#e4ded5] text-stone-600'
                }`}
              >
                <span>Cari formula &amp; obat...</span>
              </div>
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium border ${
                  isNight
                    ? 'bg-[#16241b] border-stone-800 text-stone-300'
                    : 'bg-stone-100 border-stone-200 text-stone-700'
                }`}
              >
                <ShoppingCart className="w-3 h-3" />
                <span>2 Item</span>
              </div>
            </div>
          </div>

          {/* Product Showcase Cards (2 Columns) */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 my-auto py-2">
            {/* Product Card 1 */}
            <div
              className={`p-3.5 rounded-2xl border flex flex-col justify-between transition-all ${
                isNight
                  ? 'bg-[#111a14] border-stone-800'
                  : 'bg-white border-[#e4ded5] shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[9px] font-mono font-medium px-2 py-0.5 rounded border ${
                      isNight
                        ? 'bg-[#18261e] border-stone-800 text-stone-300'
                        : 'bg-stone-100 border-stone-200 text-stone-700'
                    }`}
                  >
                    BEST SELLER
                  </span>
                  <div className="text-[9px] font-mono text-stone-500 dark:text-stone-400">
                    ★ 4.9 (128)
                  </div>
                </div>

                <div className="text-xs font-bold leading-snug line-clamp-1">
                  Atlantic Salmon Formula
                </div>
                <div className="text-[10px] font-mono opacity-60 mt-0.5">
                  1.5 kg • Hairball &amp; Omega-3
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-stone-200/50 dark:border-stone-800">
                <span className="text-xs font-bold font-mono text-[#151e17] dark:text-[#f5f7f4]">
                  Rp 185.000
                </span>
                <span
                  className={`text-[9px] font-mono font-medium px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors ${
                    isNight
                      ? 'bg-[#1a281f] text-stone-200 border border-stone-700'
                      : 'bg-[#1b4332] text-white'
                  }`}
                >
                  <ShoppingBag className="w-2.5 h-2.5" />
                  + Keranjang
                </span>
              </div>
            </div>

            {/* Product Card 2 */}
            <div
              className={`p-3.5 rounded-2xl border flex flex-col justify-between transition-all ${
                isNight
                  ? 'bg-[#111a14] border-stone-800'
                  : 'bg-white border-[#e4ded5] shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`text-[9px] font-mono font-medium px-2 py-0.5 rounded border ${
                      isNight
                        ? 'bg-[#18261e] border-stone-800 text-stone-300'
                        : 'bg-stone-100 border-stone-200 text-stone-700'
                    }`}
                  >
                    KLINIK &amp; OBAT
                  </span>
                  <div className="text-[9px] font-mono text-stone-500 dark:text-stone-400">
                    ★ 4.8 (84)
                  </div>
                </div>

                <div className="text-xs font-bold leading-snug line-clamp-1">
                  Antifungal Herbal Shampoo
                </div>
                <div className="text-[10px] font-mono opacity-60 mt-0.5">
                  250 ml • Sensitive Coat Therapy
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-stone-200/50 dark:border-stone-800">
                <span className="text-xs font-bold font-mono text-[#151e17] dark:text-[#f5f7f4]">
                  Rp 95.000
                </span>
                <span
                  className={`text-[9px] font-mono font-medium px-2.5 py-1 rounded-md flex items-center gap-1 transition-colors ${
                    isNight
                      ? 'bg-[#1a281f] text-stone-200 border border-stone-700'
                      : 'bg-[#1b4332] text-white'
                  }`}
                >
                  <ShoppingBag className="w-2.5 h-2.5" />
                  + Keranjang
                </span>
              </div>
            </div>
          </div>

          {/* Live Architecture Telemetry HUD */}
          <div
            className={`relative z-10 p-2.5 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] font-mono transition-colors ${
              isNight
                ? 'bg-[#121b15] border-stone-800 text-stone-400'
                : 'bg-[#f4f1ea] border-[#e4ded5] text-[#48564c]'
            }`}
          >
            <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300 font-semibold">
              <Activity className="w-3.5 h-3.5 text-[#2d6a4f] dark:text-[#52b788]" />
              <span>LIVE TELEMETRY HUD</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[9px]">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f] dark:bg-[#52b788]" />
                <span className="text-[#151e17] dark:text-[#f5f7f4]">Midtrans 200 OK</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f] dark:bg-[#52b788]" />
                <span className="text-[#151e17] dark:text-[#f5f7f4]">BullMQ Active</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f] dark:bg-[#52b788]" />
                <span className="text-[#151e17] dark:text-[#f5f7f4]">30+ Model PostgreSQL</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Default Project Console Blueprint Frame (for catalog projects)
  return (
    <div
      className={`relative w-full rounded-2xl sm:rounded-3xl border overflow-hidden transition-all duration-300 group/preview ${
        isNight
          ? 'bg-[#111a14] border-stone-800 shadow-xl shadow-black/50'
          : 'bg-white border-[#e4ded5] shadow-lg shadow-stone-900/5'
      } ${className}`}
    >
      {/* Minimalist Browser Chrome Bar */}
      <div
        className={`flex items-center justify-between px-4 py-2.5 border-b transition-colors ${
          isNight ? 'bg-[#141f18] border-stone-800' : 'bg-[#f4f1ea] border-[#e4ded5]'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />

          <div
            className={`ml-2 px-3 py-1 rounded-md text-[11px] font-mono truncate max-w-[180px] sm:max-w-[300px] flex items-center gap-1.5 border ${
              isNight
                ? 'bg-[#090f0c] border-stone-800 text-stone-300'
                : 'bg-white border-[#e4ded5] text-[#151e17]'
            }`}
          >
            <Globe className="w-3 h-3 shrink-0 opacity-60" />
            <span className="truncate">{project.demoUrl || `https://${project.id}.internal`}</span>
          </div>
        </div>

        <div
          className={`flex items-center gap-1.5 text-[10px] font-mono font-medium px-2.5 py-0.5 rounded border ${
            isNight
              ? 'bg-[#17231b] border-stone-800 text-stone-300'
              : 'bg-[#ebf2ec] border-stone-300/80 text-[#1b4332]'
          }`}
        >
          <span>ENGINEERING CONSOLE</span>
        </div>
      </div>

      {/* Screen Viewport: High-End Architectural Diagram */}
      <div
        className={`relative w-full aspect-[16/11] overflow-hidden flex flex-col justify-between p-5 sm:p-7 select-none ${
          isNight ? 'bg-[#090f0c]' : 'bg-[#fcfbf8]'
        }`}
      >
        {/* Top Navbar */}
        <div className="relative z-10 flex items-center justify-between pb-3 border-b border-stone-200/70 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div
              className={`p-1.5 rounded-lg border ${
                isNight
                  ? 'bg-[#16231a] border-stone-800 text-emerald-400'
                  : 'bg-[#ebf2ec] border-stone-300/80 text-[#1b4332]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight tracking-tight">{project.title}</div>
              <div className={`text-[10px] font-mono ${isNight ? 'text-stone-400' : 'text-[#48564c]'}`}>
                {project.subtitle}
              </div>
            </div>
          </div>

          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
              isNight
                ? 'bg-[#16231a] border-stone-800 text-stone-300'
                : 'bg-white border-[#e4ded5] text-[#151e17]'
            }`}
          >
            Verified Architecture
          </span>
        </div>

        {/* Center Blueprint Diagram */}
        <div className="relative z-10 my-auto py-2">
          <div
            className={`p-4 rounded-2xl border ${
              isNight ? 'bg-[#111a14] border-stone-800' : 'bg-white border-[#e4ded5]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className={`text-[10px] font-mono font-medium uppercase tracking-wider ${
                  isNight ? 'text-stone-400' : 'text-[#556358]'
                }`}
              >
                // Spesifikasi Pipeline Sistem
              </span>
              <span className="text-[10px] font-mono opacity-60">Production Stack</span>
            </div>

            {/* Mini Pipeline Schematic */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-xl border ${
                    isNight
                      ? 'bg-[#142018] border-stone-800 text-stone-200'
                      : 'bg-[#fcfbf8] border-[#e4ded5] text-[#151e17]'
                  }`}
                >
                  <div className="opacity-60 text-[8px] uppercase">{m.label}</div>
                  <div className="font-bold mt-0.5 truncate">{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Status Ticker */}
        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-stone-200/70 dark:border-stone-800 text-[10px] font-mono">
          <div className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f] dark:bg-[#52b788]" />
            <span>Sistem Terkoneksi &amp; Aktif di Produksi</span>
          </div>
          <span className="opacity-60">{project.role}</span>
        </div>
      </div>
    </div>
  );
};
