import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, Calendar, Flame, ExternalLink, RefreshCw } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';
import { useGithubContributions } from '../../hooks/useGithubContributions';
import { GithubHeatmapGrid } from './GithubHeatmapGrid';
import { profileData } from '../../data/portfolioData';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

const formatIndonesianDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const GithubActivitySection: React.FC = () => {
  const githubUrl = profileData.contact.github || 'https://github.com/RendiS10';
  const username = githubUrl.split('/').filter(Boolean).pop() || 'RendiS10';

  const { data, loading, error, selectedYear, setSelectedYear, stats } = useGithubContributions(username);
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  const formatYearLabel = (yearKey: string): string => {
    if (yearKey === 'lastYear') return '1 Tahun Terakhir';
    return yearKey;
  };

  return (
    <section
      id="activity"
      className={`relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden select-none z-20 transition-colors duration-500 ${
        isNight ? 'bg-[#090f0c] text-[#f5f7f4]' : 'bg-[#fbfaf6] text-[#151e17]'
      }`}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
        {/* section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-14 border-b transition-colors duration-500 ${
            isNight ? 'border-[#1f2d24]' : 'border-[#e4ded5]'
          }`}
        >
          <div className="max-w-2xl">
            <h2 className={`text-3xl sm:text-5xl font-bold tracking-tight leading-[1.08] transition-colors duration-500 ${
              isNight ? 'text-[#f8fafc]' : 'text-[#0f172a]'
            }`}>
              Aktivitas GitHub
            </h2>
          </div>

          <p className={`max-w-md text-xs sm:text-sm font-medium leading-relaxed transition-colors duration-500 ${
            isNight ? 'text-stone-300' : 'text-[#475569]'
          }`}>
            Kontribusi publik di akun {username}. Pekerjaan di repositori privat perusahaan tidak semuanya terhitung di sini.
          </p>
        </motion.div>

        {/* master bento dock card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.1 }}
          className={`mt-8 sm:mt-12 rounded-2xl p-5 sm:p-8 border transition-colors duration-500 ${
            isNight
              ? 'bg-[#111a14] border-[#1f2d24]'
              : 'bg-white border-[#e4ded5]'
          }`}
        >
          {/* control bar with clean username and year pills */}
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b transition-colors duration-500 ${
            isNight ? 'border-[#1f2d24]' : 'border-[#e4ded5]'
          }`}>
            <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-2.5 w-full sm:w-auto">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full border text-xs font-mono font-semibold transition-all hover:-translate-y-0.5 ${
                  isNight
                    ? 'bg-[#17231c] hover:bg-[#203227] border-emerald-500/30 text-[#f5f7f4]'
                    : 'bg-[#f4f1ea] hover:bg-[#ebf2ec] border-[#e4ded5] text-[#151e17]'
                }`}
              >
                <SiGithub color={isNight ? '#80ed99' : '#1b4332'} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>@{username}</span>
              </a>

              <span className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-full border text-[11px] sm:text-xs font-mono font-semibold ${
                isNight
                  ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                  : 'bg-[#ebf2ec] border-emerald-200 text-[#1b4332]'
              }`}>
                {stats.totalContributions.toLocaleString('id-ID')} Kontribusi
              </span>
            </div>

            {/* year selector tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {['lastYear', '2026', '2025', '2024'].map((yearKey) => {
                const isActive = selectedYear === yearKey;
                return (
                  <button
                    key={yearKey}
                    type="button"
                    onClick={() => setSelectedYear(yearKey)}
                    className={`px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer border ${
                      isActive
                        ? isNight
                          ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                          : 'bg-[#1b4332] text-white border-[#1b4332] shadow-sm'
                        : isNight
                        ? 'bg-[#17231c] text-[#95a499] hover:text-white border-[#1f2d24] hover:border-emerald-500/40'
                        : 'bg-[#fcfbf9] text-[#48564c] hover:bg-[#f4f1ea] hover:text-[#151e17] border-[#e4ded5]'
                    }`}
                  >
                    {formatYearLabel(yearKey)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* error state or heatmap grid */}
          <div className="py-4 sm:py-6">
            {error ? (
              <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center">
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                  Gagal memuat data dari GitHub API: {error}
                </p>
                <button
                  type="button"
                  onClick={() => setSelectedYear(selectedYear)}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1b4332] text-white text-xs font-mono font-semibold cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Coba Lagi</span>
                </button>
              </div>
            ) : (
              <GithubHeatmapGrid
                contributions={data?.contributions || []}
                loading={loading}
              />
            )}
          </div>

          {/* metrics summary sub-cards */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 pt-4 sm:pt-6 border-t transition-colors duration-500 ${
            isNight ? 'border-[#1f2d24]' : 'border-[#e4ded5]'
          }`}>
            <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-colors duration-500 ${
              isNight ? 'bg-[#16221a] border-[#1f2d24]' : 'bg-[#fcfbf9] border-[#e4ded5]'
            }`}>
              <div className={`flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono font-bold ${isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'}`}>
                <GitCommit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1b4332] dark:text-emerald-400" />
                <span>TOTAL COMMIT</span>
              </div>
              <div className={`text-xl sm:text-2xl font-bold mt-1.5 sm:mt-2 ${isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]'}`}>
                {stats.totalContributions.toLocaleString('id-ID')}
              </div>
              <span className={`text-[10px] sm:text-[11px] font-mono mt-0.5 block truncate ${isNight ? 'text-[#95a499]' : 'text-[#64748b]'}`}>
                periode {formatYearLabel(selectedYear)}
              </span>
            </div>

            <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-colors duration-500 ${
              isNight ? 'bg-[#16221a] border-[#1f2d24]' : 'bg-[#fcfbf9] border-[#e4ded5]'
            }`}>
              <div className={`flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono font-bold ${isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'}`}>
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ea580c]" />
                <span>HARI TERAKTIF</span>
              </div>
              <div className={`text-xl sm:text-2xl font-bold mt-1.5 sm:mt-2 truncate ${isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]'}`}>
                {stats.maxDay ? `${stats.maxDay.count} Commit` : '-'}
              </div>
              <span className={`text-[10px] sm:text-[11px] font-mono mt-0.5 block truncate ${isNight ? 'text-[#95a499]' : 'text-[#64748b]'}`}>
                {stats.maxDay ? formatIndonesianDateShort(stats.maxDay.date) : 'Tidak ada data'}
              </span>
            </div>

            <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-colors duration-500 ${
              isNight ? 'bg-[#16221a] border-[#1f2d24]' : 'bg-[#fcfbf9] border-[#e4ded5]'
            }`}>
              <div className={`flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-mono font-bold ${isNight ? 'text-[#80ed99]' : 'text-[#1b4332]'}`}>
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#16a34a]" />
                <span>HARI PRODUKTIF</span>
              </div>
              <div className={`text-xl sm:text-2xl font-bold mt-1.5 sm:mt-2 ${isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]'}`}>
                {stats.activeDaysCount} Hari
              </div>
              <span className={`text-[10px] sm:text-[11px] font-mono mt-0.5 block truncate ${isNight ? 'text-[#95a499]' : 'text-[#64748b]'}`}>
                avg {stats.averagePerActiveDay} / hari
              </span>
            </div>

            {/* Profile CTA link */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col justify-between border transition-all hover:-translate-y-0.5 group cursor-pointer ${
                isNight
                  ? 'bg-emerald-600 hover:bg-emerald-500 border-emerald-500 text-white shadow-sm'
                  : 'bg-[#1b4332] hover:bg-[#153427] border-[#1b4332] text-white shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono font-semibold text-emerald-100">
                <span>REPOSITORI</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold tracking-tight text-white mt-1">
                  Lihat Profil GitHub &rarr;
                </div>
                <span className="text-[10px] sm:text-[11px] text-emerald-200 font-mono block">
                  github.com/{username}
                </span>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
