'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { threatTechniques, threatIndicators } from '@/data/intelligence';
import { getRiskBgColor } from '@/lib/utils';

export default function ThreatIntelligencePage() {
  const [activeTab, setActiveTab] = useState<'matrix' | 'indicators'>('matrix');
  const [selectedTactic, setSelectedTactic] = useState('ALL');
  const [iocSearch, setIocSearch] = useState('');

  const tactics = ['ALL', 'Reconnaissance', 'Credential Access', 'Execution', 'Persistence', 'Lateral Movement'];
  const filteredTechniques = threatTechniques.filter((t) => selectedTactic === 'ALL' || t.tactic === selectedTactic);
  const filteredIOCs = threatIndicators.filter((ioc) => ioc.value.toLowerCase().includes(iocSearch.toLowerCase()) || ioc.type.toLowerCase().includes(iocSearch.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Threat Intelligence" subtitle="Adversary techniques mapped to MITRE ATT&CK with actionable indicators.">
        <div className="flex items-center gap-1 p-1 bg-stone-200 rounded-lg border border-stone-300 text-xs">
          <button onClick={() => setActiveTab('matrix')} className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${activeTab === 'matrix' ? 'bg-amber-500 text-stone-50' : 'text-stone-600 hover:text-stone-700'}`}>MITRE ATT&CK</button>
          <button onClick={() => setActiveTab('indicators')} className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${activeTab === 'indicators' ? 'bg-amber-500 text-stone-50' : 'text-stone-600 hover:text-stone-700'}`}>IOCs</button>
        </div>
      </PageHeader>
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-stone-600 font-medium">Tactic:</span>
            {tactics.map((tac) => (
              <button key={tac} onClick={() => setSelectedTactic(tac)} className={`px-3 py-1 text-xs rounded-lg transition-colors whitespace-nowrap ${selectedTactic === tac ? 'bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30' : 'text-stone-600 hover:text-stone-700'}`}>{tac}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTechniques.map((tech) => (
              <div key={tech.id} className="card-interactive p-4 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-stone-200 border border-stone-300 text-blue-400">{tech.mitreId}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${getRiskBgColor(tech.severity)}`}>{tech.severity}</span>
                  </div>
                  <h4 className="text-sm font-bold text-stone-800">{tech.name}</h4>
                  <div className="text-[11px] text-amber-400 font-medium mt-0.5">Tactic: {tech.tactic}</div>
                  <p className="text-xs text-stone-600 mt-2 line-clamp-2">{tech.description}</p>
                </div>
                <div className="pt-3 border-t-honey-border text-[11px] space-y-1.5 text-stone-600">
                  <div className="flex items-center justify-between"><span>Occurrences:</span><span className="font-mono font-bold text-stone-800">{tech.frequency} times</span></div>
                  <div className="flex items-center justify-between"><span>Adversaries:</span><span className="font-mono text-blue-400">{tech.attackers.join(', ')}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab === 'indicators' && (
        <div className="card-interactive p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-honey-border">
            <div><h3 className="text-sm font-bold text-stone-800">IOC Registry ({threatIndicators.length} artifacts)</h3><p className="text-xs text-stone-600">IP addresses, payloads, domains from honeypot traps</p></div>
            <div className="relative w-full sm:w-72">
              <input type="text" placeholder="Search indicator..." value={iocSearch} onChange={(e) => setIocSearch(e.target.value)} className="w-full pl-8 pr-3 py-1.5 bg-stone-200 border border-stone-300 rounded-lg text-xs text-stone-800 placeholder:text-stone-600 focus:outline-none focus:border-amber-500" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead><tr className="border-b border-stone-300 text-stone-600 uppercase text-[10px] font-mono"><th className="pb-2.5">Type</th><th className="pb-2.5">Value</th><th className="pb-2.5">Severity</th><th className="pb-2.5">Actor</th><th className="pb-2.5">First Seen</th></tr></thead>
              <tbody className="divide-y border-stone-300/50">
                {filteredIOCs.map((ioc) => (
                  <tr key={ioc.id} className="table-row-hover">
                    <td className="py-3 pr-4 whitespace-nowrap"><span className="px-2 py-0.5 rounded bg-stone-200 border border-stone-300 text-blue-400 text-[11px] font-bold">{ioc.type}</span></td>
                    <td className="py-3 pr-4 font-bold text-stone-800 whitespace-nowrap max-w-xs truncate font-mono">{ioc.value}</td>
                    <td className="py-3 pr-4 whitespace-nowrap"><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getRiskBgColor(ioc.severity)}`}>{ioc.severity}</span></td>
                    <td className="py-3 pr-4 text-amber-400 whitespace-nowrap">{ioc.relatedAttackers.join(', ')}</td>
                    <td className="py-3 pr-4 text-stone-600 whitespace-nowrap">{ioc.firstSeen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
