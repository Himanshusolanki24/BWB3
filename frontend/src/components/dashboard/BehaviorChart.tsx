'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import type { BehaviorTimeSeriesPoint } from '@/types';
import { Panel, ChartTooltip } from '@/components/ui';
import { BEHAVIOR_SERIES, CHART, chartAxis } from '@/lib/utils';

const periods = ['6H', '12H', '24H'] as const;
type Period = (typeof periods)[number];
const sliceFor: Record<Period, number> = { '6H': -3, '12H': -6, '24H': 0 };

// ponytail: adaptation moment hard-coded to the 10:00 bucket; derive from adaptation events once the API returns real timestamps.
const ADAPTED_AT = '10:00';

export function BehaviorChart({ initialData }: { initialData: BehaviorTimeSeriesPoint[] }) {
  const [period, setPeriod] = useState<Period>('24H');
  const data = initialData.slice(sliceFor[period]);
  const total = data.reduce((sum, d) => sum + BEHAVIOR_SERIES.reduce((s, b) => s + d[b.key], 0), 0);

  return (
    <Panel
      className="h-full"
      title="Attacker activity"
      note={`${total} actions captured across all decoys, grouped by what the attacker was trying to do`}
      action={
        <div className="seg" role="group" aria-label="Time range">
          {periods.map((p) => (
            <button key={p} aria-pressed={period === p} onClick={() => setPeriod(p)}>
              {p}
            </button>
          ))}
        </div>
      }
    >
      <ul className="mb-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-graphite">
        {BEHAVIOR_SERIES.map((s) => (
          <li key={s.key} className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: s.color }} />
            {s.name}
          </li>
        ))}
        <li className="flex items-center gap-1.5">
          <span className="h-3 w-0.5 bg-lure" />
          Decoy adapted
        </li>
      </ul>
      <div className="graph-paper h-72 rounded-md">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 16, right: 8, left: -18, bottom: 0 }} barCategoryGap="22%">
            <CartesianGrid stroke={CHART.rule} vertical={false} />
            <XAxis dataKey="time" {...chartAxis} axisLine={{ stroke: CHART.pencil }} />
            <YAxis {...chartAxis} axisLine={false} />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(23,32,72,0.05)' }} />
            {data.some((d) => d.time === ADAPTED_AT) && (
              <ReferenceLine
                x={ADAPTED_AT}
                stroke={CHART.lure}
                strokeWidth={3}
                label={{ value: 'Decoy adapted', position: 'top', fill: CHART.ink, fontSize: 11, fontWeight: 600 }}
              />
            )}
            {BEHAVIOR_SERIES.map((s, i) => (
              <Bar
                key={s.key}
                isAnimationActive={false}
                dataKey={s.key}
                name={s.name}
                stackId="a"
                fill={s.color}
                radius={i === BEHAVIOR_SERIES.length - 1 ? [3, 3, 0, 0] : 0}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
