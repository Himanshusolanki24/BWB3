'use client';

import { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import type { AttackSession } from '@/types';
import { getRiskBgColor } from '@/lib/utils';

interface AttackListProps {
  sessions: AttackSession[];
  selectedSessionId: string;
  onSelectSession: (id: string) => void;
}

export function AttackList({ sessions, selectedSessionId, onSelectSession }: AttackListProps) {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const filtered = sessions.filter((s) => {
    const matchesSearch = s.attackerId.toLowerCase().includes(search.toLowerCase()) || s.honeypot.toLowerCase().includes(search.toLowerCase());
    const matchesRisk = riskFilter === 'ALL' || s.risk === riskFilter;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="card-interactive p-4 flex flex-col h-full space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b-honey-border">
        <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        <h3 className="text-sm font-semibold text-stone-800">Active Sessions ({sessions.length})</h3>
      </div>
      <div className="space-y-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-600" />
          <input type="text" placeholder="Filter by ID or node..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-8 pr-3 py-1.5 bg-stone-200 border border-stone-300 rounded-lg text-xs text-stone-800 placeholder:text-stone-600 focus:outline-none focus:border-amber-500" />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map((risk) => (
            <button key={risk} onClick={() => setRiskFilter(risk)}
              className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap ${riskFilter === risk ? 'bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30' : 'text-stone-600 hover:text-stone-700'}`}>{risk}</button>
          ))}
        </div>
      </div>
      <div className="space-y-2 overflow-y-auto max-h-[500px] pr-1">
        {filtered.map((s) => {
          const isSelected = s.id === selectedSessionId;
          return (
            <div key={s.id} onClick={() => onSelectSession(s.id)}
              className={`p-3 rounded-lg border transition-all cursor-pointer text-xs ${isSelected ? 'bg-stone-200 border-amber-500/40 shadow-sm' : 'bg-stone-200/40 border-stone-300 hover:border-stone-400'}`}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2"><span className="font-mono font-bold text-stone-800">{s.attackerId}</span><span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-300 text-stone-600 font-mono">{s.protocol}</span></div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getRiskBgColor(s.risk)}`}>{s.risk}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-600"><span>Node: <strong className="text-stone-800">{s.honeypot}</strong></span><span>{s.duration}</span></div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-stone-600 pt-1.5 border-t-honey-border/40">
                <span className="truncate max-w-[180px]">{s.behaviors.join(' → ')}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-400' : ''}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
