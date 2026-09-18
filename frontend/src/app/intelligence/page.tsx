'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PageHeader } from '@/components/layout/PageHeader';
import { Panel, RiskBadge, Tag, ChartTooltip } from '@/components/ui';
import { threatTechniques, threatIndicators } from '@/data/intelligence';
import { CHART, RISK_HEX, chartAxis } from '@/lib/utils';

const tactics = ['ALL', 'Reconnaissance', 'Credential Access', 'Execution', 'Persistence', 'Lateral Movement'];

export default function ThreatIntelligencePage() {
  const [tab, setTab] = useState<'matrix' | 'indicators'>('matrix');
  const [tactic, setTactic] = useState('ALL');
  const [iocSearch, setIocSearch] = useState('');

  const techniques = threatTechniques.filter((t) => tactic === 'ALL' || t.tactic === tactic);
  const ranked = [...techniques].sort((a, b) => b.frequency - a.frequency);
  const q = iocSearch.toLowerCase();
  const iocs = threatIndicators.filter((i) => i.value.toLowerCase().includes(q) || i.type.toLowerCase().includes(q));

  return (
    <div className="space-y-6">
      <PageHeader title="Intelligence" subtitle="Techniques seen in your decoys, mapped to MITRE ATT&CK, and the indicators you can block today.">
        <div className="seg" role="tablist">
          <button role="tab" aria-selected={tab === 'matrix'} onClick={() => setTab('matrix')}>Techniques</button>
          <button role="tab" aria-selected={tab === 'indicators'} onClick={() => setTab('indicators')}>Indicators</button>
        </div>
      </PageHeader>

      {tab === 'matrix' && (
        <>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by tactic">
            {tactics.map((t) => (
              <button
                key={t}
                onClick={() => setTactic(t)}
                aria-pressed={tactic === t}
                className={
                  tactic === t
                    ? 'rounded-full border border-ink bg-ink px-3 py-1 text-[13px] font-semibold text-white'
                    : 'rounded-full border border-rule-strong bg-sheet px-3 py-1 text-[13px] text-graphite hover:border-ink hover:text-ink'
                }
              >
                {t === 'ALL' ? 'All tactics' : t}
              </button>
            ))}
          </div>

          <Panel title="How often each technique was used" note="Bar color shows severity">
            <div style={{ height: Math.max(ranked.length * 34, 80) }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ranked} layout="vertical" margin={{ top: 0, right: 24, left: 0, bottom: 0 }} barSize={16}>
                  <XAxis type="number" {...chartAxis} axisLine={false} hide />
                  <YAxis type="category" dataKey="name" width={220} {...chartAxis} axisLine={false} tick={{ fill: CHART.ink, fontSize: 12, fontFamily: 'var(--font-schibsted)' }} />
                  <Tooltip content={<ChartTooltip unit=" times" />} cursor={{ fill: 'rgba(23,32,72,0.05)' }} />
                  <Bar isAnimationActive={false} dataKey="frequency" name="Observed" radius={[0, 3, 3, 0]} label={{ position: 'right', fill: CHART.graphite, fontSize: 11 }}>
                    {ranked.map((t) => <Cell key={t.id} fill={RISK_HEX[t.severity]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {techniques.map((t) => (
              <article key={t.id} className="sheet flex flex-col p-5">
                <div className="flex items-center justify-between gap-2">
                  <Tag className="text-ink">{t.mitreId}</Tag>
                  <RiskBadge risk={t.severity} />
                </div>
                <h3 className="mt-3 text-[15px] font-semibold leading-snug text-ink">{t.name}</h3>
                <p className="mt-0.5 text-xs text-pencil">{t.tactic}</p>
                <p className="mt-2 line-clamp-3 flex-1 text-[13px] text-graphite">{t.description}</p>
                <div className="mt-4 flex items-center justify-between border-t border-rule pt-3 text-xs">
                  <span className="text-pencil">{t.frequency} times</span>
                  <span className="font-mono text-ink">{t.attackers.join(', ')}</span>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {tab === 'indicators' && (
        <Panel
          title="Indicators of compromise"
          note={`${iocs.length} of ${threatIndicators.length} indicators`}
          action={
            <label className="relative block w-full sm:w-72">
              <span className="sr-only">Search indicators</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-pencil" />
              <input className="field pl-8" placeholder="IP, hash, domain" value={iocSearch} onChange={(e) => setIocSearch(e.target.value)} />
            </label>
          }
        >
          <div className="-mx-5 overflow-x-auto px-5">
            <table className="data-table min-w-[720px]">
              <thead>
                <tr><th>Type</th><th>Value</th><th>Severity</th><th>Seen with</th><th>First seen</th></tr>
              </thead>
              <tbody>
                {iocs.map((i) => (
                  <tr key={i.id}>
                    <td><Tag>{i.type}</Tag></td>
                    <td className="max-w-xs truncate font-mono text-xs font-medium text-ink" title={i.value}>{i.value}</td>
                    <td><RiskBadge risk={i.severity} /></td>
                    <td className="font-mono text-xs text-graphite">{i.relatedAttackers.join(', ')}</td>
                    <td className="whitespace-nowrap text-xs text-pencil">{i.firstSeen}</td>
                  </tr>
                ))}
                {iocs.length === 0 && (
                  <tr><td colSpan={5} className="py-8 text-center text-sm text-pencil">No indicators match that search.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Panel>
      )}
    </div>
  );
}
