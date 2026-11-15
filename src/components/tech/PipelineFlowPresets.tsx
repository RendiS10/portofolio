import React from 'react';
import { Layers, Globe, Smartphone, Server, Terminal, Lock } from 'lucide-react';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

export type FlowDomainId = 'all' | 'web' | 'mobile' | 'backend' | 'devops' | 'cybersecurity';

interface PipelineFlowPresetsProps {
  activeDomain: FlowDomainId;
  onSelectDomain: (domain: FlowDomainId) => void;
}

export const PipelineFlowPresets: React.FC<PipelineFlowPresetsProps> = ({
  activeDomain,
  onSelectDomain
}) => {
  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  const domains: {
    id: FlowDomainId;
    label: string;
    icon: React.FC<{ className?: string }>;
    tag: string;
    isComingSoon?: boolean;
  }[] = [
    {
      id: 'all',
      label: 'Semua Stack',
      icon: Layers,
      tag: 'Semua'
    },
    {
      id: 'web',
      label: 'Frontend / Web',
      icon: Globe,
      tag: 'Web'
    },
    {
      id: 'mobile',
      label: 'Mobile App',
      icon: Smartphone,
      tag: 'Flutter'
    },
    {
      id: 'backend',
      label: 'Backend & DB',
      icon: Server,
      tag: 'APIs'
    },
    {
      id: 'devops',
      label: 'DevOps & Linux',
      icon: Terminal,
      tag: 'Infra'
    },
    {
      id: 'cybersecurity',
      label: 'Cyber Security',
      icon: Lock,
      tag: 'Roadmap',
      isComingSoon: true
    }
  ];

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span
          className={`text-xs font-mono font-bold uppercase tracking-wider ${
            isNight ? 'text-amber-400' : 'text-[#1b4332]'
          }`}
        >
          Kategori Arsitektur
        </span>
        <span className={`text-[11px] font-mono ${isNight ? 'text-[#95a499]' : 'text-[#64748b]'}`}>
          Filter layer arsitektur produksi
        </span>
      </div>

      {/* domain filter buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {domains.map((domain) => {
          const Icon = domain.icon;
          const isActive = activeDomain === domain.id;

          if (domain.isComingSoon) {
            return (
              <div
                key={domain.id}
                title="Modul Cyber Security sedang dalam roadmap pembelajaran"
                className={`p-3 rounded-2xl border border-dashed text-left opacity-40 cursor-not-allowed select-none flex flex-col justify-between transition-colors ${
                  isNight
                    ? 'border-emerald-500/20 bg-[#111a14]/50 text-[#95a499]'
                    : 'border-[#cbd5e1] bg-[#f8fafc] text-[#94a3b8]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center ${
                      isNight
                        ? 'border-emerald-500/20 bg-[#17231c] text-[#95a499]'
                        : 'border-[#e2e8f0] bg-[#f1f5f9] text-[#94a3b8]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  <span
                    className={`text-[9px] font-mono font-medium uppercase px-1.5 py-0.5 rounded border ${
                      isNight
                        ? 'bg-[#17231c] text-[#95a499] border-emerald-500/20'
                        : 'bg-[#f1f5f9] text-[#94a3b8] border-[#e2e8f0]'
                    }`}
                  >
                    {domain.tag}
                  </span>
                </div>

                <div className="mt-2 text-xs font-semibold tracking-tight leading-tight">
                  {domain.label}
                </div>
              </div>
            );
          }

          return (
            <button
              key={domain.id}
              type="button"
              onClick={() => onSelectDomain(domain.id)}
              className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer select-none flex flex-col justify-between ${
                isActive
                  ? isNight
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md ring-1 ring-emerald-400'
                    : 'bg-[#1b4332] text-white border-[#1b4332] shadow-md ring-1 ring-[#1b4332]'
                  : isNight
                  ? 'bg-[#111a14] border-emerald-500/20 text-[#c2ceb9] hover:border-emerald-500/40 hover:bg-[#16221a]'
                  : 'bg-white border-[#e4ded5] text-[#151e17] hover:border-[#1b4332]/40 hover:bg-[#fcfbf9]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-white/20 border-white/40 text-white'
                      : isNight
                      ? 'bg-[#17231c] border-emerald-500/20 text-emerald-300'
                      : 'bg-[#ebf2ec] border-emerald-200 text-[#1b4332]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <span
                  className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white border-white/30'
                      : isNight
                      ? 'bg-[#17231c] text-[#95a499] border-emerald-500/20'
                      : 'bg-[#f4f1ea] text-[#48564c] border-[#e4ded5]'
                  }`}
                >
                  {domain.tag}
                </span>
              </div>

              <div
                className={`mt-2 text-xs font-bold tracking-tight leading-tight ${
                  isActive ? 'text-white' : isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]'
                }`}
              >
                {domain.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
