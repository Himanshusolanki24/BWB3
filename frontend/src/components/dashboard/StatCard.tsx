'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Users,
  ShieldAlert,
  UserX,
  Layers,
  Clock,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type StatIconType = 'users' | 'shield-alert' | 'user-x' | 'layers' | 'clock';

interface StatCardProps {
  title: string;
  value: string | number;
  trend: number;
  label: string;
  iconType: StatIconType;
  index?: number;
}

const iconMap: Record<StatIconType, LucideIcon> = {
  users: Users,
  'shield-alert': ShieldAlert,
  'user-x': UserX,
  layers: Layers,
  clock: Clock,
};

export function StatCard({ title, value, trend, label, iconType, index = 0 }: StatCardProps) {
  const isPositive = trend >= 0;
  const Icon = iconMap[iconType] || Users;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="stat-card p-5 bg-white border border-stone-200 shadow-xs"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
          <Icon className="w-4 h-4" />
        </div>
        <div
          className={cn(
            'flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full',
            isPositive
              ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
              : 'text-rose-700 bg-rose-50 border border-rose-200'
          )}
        >
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {isPositive ? '+' : ''}{trend}%
        </div>
      </div>
      <div className="text-3xl font-black text-stone-900 mb-1 tabular-nums tracking-tight">
        {value}
      </div>
      <div className="text-xs text-stone-500 uppercase tracking-wider font-bold">
        {title}
      </div>
      <div className="text-[11px] text-stone-500 font-medium mt-1">{label}</div>
    </motion.div>
  );
}
