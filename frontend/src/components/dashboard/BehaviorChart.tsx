'use client';

import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Activity } from 'lucide-react';
import type { BehaviorTimeSeriesPoint } from '@/types';

interface BehaviorChartProps {
  initialData: BehaviorTimeSeriesPoint[];
}

const timePeriods = ['1H', '6H', '24H', '7D'] as const;
type TimePeriod = (typeof timePeriods)[number];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (active && payload && payload.length)
    return (
      <div className="bg-white border border-stone-300 p-3 rounded-xl shadow-lg text-xs space-y-1.5 font-mono">
        <p className="font-sans font-bold text-stone-900 border-b border-stone-200 pb-1">
          Timeline: {label}
        </p>
        {payload.map((entry, index) => (
          <div key={`entry-${index}`} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 font-sans font-medium" style={{ color: entry.color }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.name}:
            </span>
            <span className="font-bold text-stone-900 font-mono">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  return null;
};

export function BehaviorChart({ initialData }: BehaviorChartProps) {
  const [activePeriod, setActivePeriod] = useState<TimePeriod>('24H');
  const displayData = initialData.slice(
    activePeriod === '1H' ? -3 : activePeriod === '6H' ? -6 : 0
  );

  return (
    <div className="card-interactive p-5 flex flex-col h-full bg-white border border-stone-200 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-teal-50 border border-teal-200">
            <Activity className="w-4 h-4 text-teal-700" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 tracking-wide">
              Attack Behavior Over Time
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              Multi-vector behavior volume & engagement patterns
            </p>
          </div>
        </div>
        <div className="flex items-center p-0.5 rounded-lg bg-stone-100 border border-stone-300">
          {timePeriods.map((period) => (
            <button
              key={period}
              onClick={() => setActivePeriod(period)}
              className={`px-3 py-1 text-xs rounded-md font-bold transition-all ${
                activePeriod === period
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRecon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D97706" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#D97706" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCred" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0D9488" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#0D9488" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExploit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EA580C" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#EA580C" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPayload" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC2626" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E7E0D8" vertical={false} />
            <XAxis
              dataKey="time"
              stroke="#78716C"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#D6CDC4' }}
            />
            <YAxis stroke="#78716C" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '12px', fontSize: '11px', fontWeight: 600 }}
            />
            <Area
              type="monotone"
              dataKey="reconnaissance"
              name="Reconnaissance"
              stroke="#D97706"
              fillOpacity={1}
              fill="url(#colorRecon)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="credentialAccess"
              name="Credential Access"
              stroke="#0D9488"
              fillOpacity={1}
              fill="url(#colorCred)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="exploitation"
              name="Exploitation"
              stroke="#EA580C"
              fillOpacity={1}
              fill="url(#colorExploit)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="payloadDelivery"
              name="Payload Delivery"
              stroke="#DC2626"
              fillOpacity={1}
              fill="url(#colorPayload)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
