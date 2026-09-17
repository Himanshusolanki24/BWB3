'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import type { BehaviorDistribution as BehaviorDistributionType } from '@/types';

interface BehaviorDistributionProps {
  data: BehaviorDistributionType[];
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
}) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="bg-white border border-stone-300 px-3 py-1.5 rounded-lg shadow-md text-xs">
        <span className="font-semibold text-stone-700">{item.name}: </span>
        <span className="font-bold text-amber-700 font-mono">{item.value}%</span>
      </div>
    );
  }
  return null;
};

export function BehaviorDistribution({ data }: BehaviorDistributionProps) {
  return (
    <div className="card-interactive p-5 flex flex-col h-full bg-white border border-stone-200 shadow-xs">
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-stone-200">
        <div className="p-2 rounded-lg bg-orange-50 border border-orange-200">
          <PieChartIcon className="w-4 h-4 text-orange-600" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-stone-900 tracking-wide">
            Behavior Distribution
          </h3>
          <p className="text-xs text-stone-500 font-medium">
            AI classification breakdown across sessions
          </p>
        </div>
      </div>
      <div className="relative w-full h-56 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={78}
              paddingAngle={4}
              dataKey="value"
              stroke="#FFFFFF"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-black text-stone-900">100%</span>
          <span className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">
            Profiled
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-stone-200 text-xs">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200 shadow-xs"
          >
            <div className="flex items-center gap-1.5 truncate pr-1">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <span className="text-stone-700 font-semibold truncate text-[11px]">
                {item.name}
              </span>
            </div>
            <span className="font-mono font-bold text-stone-900 text-xs">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
