'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import type { AttackSession } from '@/types';
import { Panel, RiskBadge, Tag } from '@/components/ui';
import { cn } from '@/lib/utils';

interface AttackListProps {
  sessions: AttackSession[];
  selectedSessionId: string;
  onSelectSession: (id: string) => void;
}

const risks = ['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'];

export function AttackList({ sessions, selectedSessionId, onSelectSession }: AttackListProps) {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const q = search.toLowerCase();
  const filtered = sessions.filter(
    (s) =>
      (s.attackerId.toLowerCase().includes(q) || s.honeypot.toLowerCase().includes(q)) &&
      (riskFilter === 'ALL' || s.risk === riskFilter)
  );

  return (
    <Panel title="Sessions" note={`${filtered.length} of ${sessions.length} shown`} bodyClassName="space-y-3">
      <label className="relative block">
        <span className="sr-only">Filter sessions</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-pencil" />
        <input className="field pl-8" placeholder="Attacker ID or decoy" value={search} onChange={(e) => setSearch(e.target.value)} />
      </label>
      <div className="seg w-full" role="group" aria-label="Filter by risk">
        {risks.map((r) => (
          <button key={r} className="flex-1 capitalize" aria-pressed={riskFilter === r} onClick={() => setRiskFilter(r)}>
            {r.toLowerCase()}
          </button>
        ))}
      </div>

      <ul className="-mx-2 max-h-[560px] space-y-1 overflow-y-auto px-2 pt-1">
        {filtered.map((s) => {
          const selected = s.id === selectedSessionId;
          return (
            <li key={s.id}>
              <button
                onClick={() => onSelectSession(s.id)}
                aria-pressed={selected}
                className={cn(
                  'w-full rounded-lg border px-3 py-2.5 text-left transition-colors',
                  selected ? 'border-ink bg-sheet shadow-[inset_4px_0_0_var(--color-lure)]' : 'border-transparent hover:bg-sunk'
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[13px] font-semibold text-ink">{s.attackerId}</span>
                  <RiskBadge risk={s.risk} />
                </div>
                <div className="mt-1.5 flex items-center justify-between gap-2 text-xs text-graphite">
                  <span className="flex items-center gap-1.5">
                    <Tag>{s.honeypot}</Tag>
                    {s.protocol}
                  </span>
                  <span className="font-mono text-pencil">{s.duration}</span>
                </div>
                <p className="mt-1.5 truncate text-xs text-pencil">{s.behaviors.join(', then ')}</p>
              </button>
            </li>
          );
        })}
        {filtered.length === 0 && <li className="py-6 text-center text-sm text-pencil">No sessions match. Clear the search or pick another risk level.</li>}
      </ul>
    </Panel>
  );
}
