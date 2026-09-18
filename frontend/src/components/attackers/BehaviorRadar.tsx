'use client';

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import type { BehaviorProfile, BehaviorType } from '@/types';
import { Panel, ChartTooltip } from '@/components/ui';
import { CHART } from '@/lib/utils';

// Fixed axes so every attacker's shape is comparable at a glance.
const AXES: BehaviorType[] = [
  'Reconnaissance', 'Brute Force', 'Credential Access', 'Exploitation', 'Privilege Escalation',
  'Persistence', 'Lateral Movement', 'Payload Delivery', 'Data Exfiltration',
];

export function BehaviorRadar({ behaviors }: { behaviors: BehaviorProfile[] }) {
  const data = AXES.map((axis) => ({
    axis,
    confidence: behaviors.find((b) => b.type === axis)?.confidence ?? 0,
  }));
  const top = [...behaviors].sort((a, b) => b.confidence - a.confidence)[0];

  return (
    <Panel
      title="Behavior fingerprint"
      note={top ? `Most likely after ${top.type.toLowerCase()} (${top.confidence}% confidence)` : 'No behavior classified yet'}
    >
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke={CHART.rule} />
            <PolarAngleAxis dataKey="axis" tick={{ fill: CHART.graphite, fontSize: 11 }} />
            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip content={<ChartTooltip unit="%" />} />
            <Radar
              isAnimationActive={false}
              name="Confidence"
              dataKey="confidence"
              stroke={CHART.ink}
              strokeWidth={1.75}
              fill={CHART.lure}
              fillOpacity={0.55}
              dot={{ r: 2.5, fill: CHART.ink, strokeWidth: 0 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}
