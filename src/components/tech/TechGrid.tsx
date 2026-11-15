import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import type { Project, TechItem, TechLayer } from '../../types/portfolio';
import { techStackData, projectsData } from '../../data/portfolioData';
import { PipelineFlowPresets, type FlowDomainId } from './PipelineFlowPresets';
import { PipelineNodeLayer } from './PipelineNodeLayer';
import { PipelineInspector } from './PipelineInspector';
import { TechBeachDecorations } from './TechBeachDecorations';
import { useVillageAtmosphere } from '../../context/VillageAtmosphereContext';

interface TechGridProps {
  onOpenProject?: (project: Project) => void;
}

export const TechGrid: React.FC<TechGridProps> = ({ onOpenProject }) => {
  const [activeDomain, setActiveDomain] = useState<FlowDomainId>('all');
  const [selectedLayer, setSelectedLayer] = useState<TechLayer>('client');
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  const { atmosphere } = useVillageAtmosphere();
  const isNight = atmosphere === 'night';

  // partition technologies by architectural layer
  const clientTech = techStackData.filter((t) => t.layer === 'client');
  const backendTech = techStackData.filter((t) => t.layer === 'backend');
  const databaseTech = techStackData.filter((t) => t.layer === 'database');
  const devopsTech = techStackData.filter((t) => t.layer === 'devops');

  const handleSelectDomain = (domain: FlowDomainId) => {
    setActiveDomain(domain);
    setSelectedTech(null);

    if (domain === 'web' || domain === 'mobile') {
      setSelectedLayer('client');
    } else if (domain === 'backend') {
      setSelectedLayer('backend');
    } else if (domain === 'devops') {
      setSelectedLayer('devops');
    }
  };

  const handleSelectTech = (tech: TechItem) => {
    setSelectedTech(tech);
    setSelectedLayer(tech.layer);
  };

  const handleSelectLayer = (layer: TechLayer) => {
    setSelectedLayer(layer);
    setSelectedTech(null);
  };

  const handleSelectProject = (projectId: string) => {
    const targetProject = projectsData.find((p) => p.id === projectId);
    if (targetProject && onOpenProject) {
      onOpenProject(targetProject);
    }
  };

  return (
    <section id="stack" className={`relative z-20 -mt-1 w-full select-none transition-colors duration-500 ${
      isNight ? 'bg-[#0c1510] text-[#f8fafc]' : 'bg-[#f5f3ec] text-[#0f172a]'
    }`}>
      {/* background decorations */}
      <TechBeachDecorations />

      {/* content wrapper */}
      <div className="relative z-10 pt-14 sm:pt-16 pb-20 max-w-7xl mx-auto px-6 sm:px-12">
        {/* header */}
        <div className={`space-y-4 pb-8 border-b transition-colors duration-500 ${
          isNight ? 'border-emerald-500/20' : 'border-[#e4ded5]'
        }`}>
          <div className="flex items-center gap-2">
            <span
              className={`text-[11px] font-mono font-bold tracking-[0.28em] uppercase ${
                isNight ? 'text-amber-400' : 'text-[#1b4332]'
              }`}
            >
              03 // PETA KEAHLIAN &amp; TECH STACK
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${isNight ? 'bg-emerald-400' : 'bg-emerald-600'}`} />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] transition-colors duration-500 ${
                isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]'
              }`}>
                Tech Stack &amp; Tools Produksi
              </h2>
              <p className={`text-sm sm:text-base font-normal mt-2 max-w-2xl leading-relaxed transition-colors duration-500 ${
                isNight ? 'text-[#95a499]' : 'text-[#48564c]'
              }`}>
                Teknologi yang saya gunakan secara langsung pada lingkungan produksi untuk membangun sistem web performan tinggi, aplikasi mobile native, dan pipeline VPS.
              </p>
            </div>

            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-colors duration-500 shrink-0 self-start lg:self-auto ${
              isNight
                ? 'bg-[#142118] border-emerald-500/30 text-[#f5f7f4] shadow-sm'
                : 'bg-white border-[#e4ded5] text-[#151e17] shadow-sm'
            }`}>
              <Layers className={`w-3.5 h-3.5 ${isNight ? 'text-amber-400' : 'text-[#1b4332]'}`} />
              <span className={`text-xs font-mono font-semibold ${isNight ? 'text-[#f5f7f4]' : 'text-[#151e17]'}`}>
                {techStackData.length} Tools &amp; Frameworks
              </span>
            </div>
          </div>
        </div>

        {/* category filter selector */}
        <div className="mt-8">
          <PipelineFlowPresets
            activeDomain={activeDomain}
            onSelectDomain={handleSelectDomain}
          />
        </div>

        {/* architecture layer cards */}
        <div className="mt-8 sm:mt-10 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] sm:text-xs font-mono font-bold text-[#64748b] uppercase tracking-wider pb-1 sm:pb-0">
            <span>Daftar Kategori &amp; Layer</span>
            <span className="text-[10px] sm:text-xs text-[#64748b]">
              Klik pada layer atau kartu tool untuk inspeksi
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <PipelineNodeLayer
              layerId="client"
              stepNumber="01"
              title="Client / Frontend"
              subtitle="Web & Mobile Interface"
              roleDescription="UI interaktif, state management, render SSR/CSR, responsivitas."
              techItems={clientTech}
              activeDomain={activeDomain}
              selectedTech={selectedTech}
              onSelectTech={handleSelectTech}
              onSelectLayer={handleSelectLayer}
              isLayerSelected={selectedLayer === 'client'}
            />

            <PipelineNodeLayer
              layerId="backend"
              stepNumber="02"
              title="Backend Services"
              subtitle="API & Server Logic"
              roleDescription="Routing, otentikasi, validasi data, microservices, integrasi payment."
              techItems={backendTech}
              activeDomain={activeDomain}
              selectedTech={selectedTech}
              onSelectTech={handleSelectTech}
              onSelectLayer={handleSelectLayer}
              isLayerSelected={selectedLayer === 'backend'}
            />

            <PipelineNodeLayer
              layerId="database"
              stepNumber="03"
              title="Data & Storage"
              subtitle="Persistent Database"
              roleDescription="Relational & document database, ORM, indexing, caching Redis."
              techItems={databaseTech}
              activeDomain={activeDomain}
              selectedTech={selectedTech}
              onSelectTech={handleSelectTech}
              onSelectLayer={handleSelectLayer}
              isLayerSelected={selectedLayer === 'database'}
            />

            <PipelineNodeLayer
              layerId="devops"
              stepNumber="04"
              title="DevOps & OS"
              subtitle="Deployment & Platform"
              roleDescription="Containerization, Linux system admin, CI/CD pipeline, web server Nginx."
              techItems={devopsTech}
              activeDomain={activeDomain}
              selectedTech={selectedTech}
              onSelectTech={handleSelectTech}
              onSelectLayer={handleSelectLayer}
              isLayerSelected={selectedLayer === 'devops'}
            />
          </div>
        </div>

        {/* technology deep inspector */}
        <div className="mt-8 sm:mt-10">
          <PipelineInspector
            selectedTech={selectedTech}
            selectedLayer={selectedLayer}
            activeDomain={activeDomain}
            onClearTechSelection={() => setSelectedTech(null)}
            onSelectProject={handleSelectProject}
          />
        </div>
      </div>
    </section>
  );
};
