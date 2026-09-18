'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { Honeypot } from '@/types';
import { Panel, ChartTooltip } from '@/components/ui';
import { CHART, chartAxis } from '@/lib/utils';

export function HoneypotHealthOverview({ honeypots }: { honeypots: Honeypot[] }) {
  const active = honeypots.filter((h) => h.status === 'ACTIVE').length;
  const decoys = honeypots.reduce((n, h) => n + h.totalDecoys, 0);
  const health = Math.round(honeypots.reduce((n, h) => n + h.health, 0) / honeypots.length);
  const attacks = honeypots.reduce((n, h) => n + h.attacksDetected, 0);
  const byAttacks = [...honeypots].sort((a, b) => b.attacksDetected - a.attacksDetected);
  const busiest = byAttacks[0];

  const metrics = [
    { label: 'Nodes active', value: `${active} of ${honeypots.length}` },
    { label: 'Average health', value: `${health}%` },
    { label: 'Decoys planted', value: decoys },
    { label: 'Attacks captured', value: attacks },
  ];

  return (
    <Panel title="Fleet" note={busiest ? `${busiest.name} is drawing the most attention with ${busiest.attacksDetected} attacks` : undefined}>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        <dl className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-lg border border-rule bg-rule">
          {metrics.map((m) => (
            <div key={m.label} className="bg-sheet p-4">
              <dt className="text-xs text-pencil">{m.label}</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-ink">{m.value}</dd>
            </div>
          ))}
        </dl>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byAttacks} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }} barSize={14}>
              <XAxis type="number" {...chartAxis} axisLine={false} />
              <YAxis type="category" dataKey="name" {...chartAxis} axisLine={false} width={92} tick={{ fill: CHART.ink, fontSize: 11 }} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(23,32,72,0.05)' }} />
              <Bar isAnimationActive={false} dataKey="attacksDetected" name="Attacks captured" radius={[0, 3, 3, 0]}>
                {byAttacks.map((h, i) => (
                  <Cell key={h.id} fill={i === 0 ? CHART.lure : CHART.ink} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Panel>
  );
}
