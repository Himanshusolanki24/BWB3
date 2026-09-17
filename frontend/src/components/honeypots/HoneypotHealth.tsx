'use client';

import { Server, Activity, ShieldCheck, Cpu, HardDrive } from 'lucide-react';
import type { Honeypot } from '@/types';

interface HoneypotHealthProps {
  honeypots: Honeypot[];
}

export function HoneypotHealthOverview({ honeypots }: HoneypotHealthProps) {
  const activeCount = honeypots.filter((h) => h.status === 'ACTIVE').length;
  const totalDecoys = honeypots.reduce((acc, h) => acc + h.totalDecoys, 0);
  const avgHealth = Math.round(honeypots.reduce((acc, h) => acc + h.health, 0) / honeypots.length);
  const totalAttacksCaptured = honeypots.reduce((acc, h) => acc + h.attacksDetected, 0);

  return (
    <div className="card-interactive p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-300">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <Activity className="w-5 h-5 text-amber-400" style={{ animation: 'pulse-glow 2s ease-in-out infinite' }} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-stone-800">Sandbox Cluster Fleet Status</h2>
            <p className="text-xs text-stone-600">Isolated multi-protocol deception nodes</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" style={{ animation: 'pulse-glow 2s ease-in-out infinite' }} />
            99.98% Uptime
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Fleet Health', value: `${avgHealth}%`, sub: 'Normal baseline', color: 'amber', icon: ShieldCheck },
          { label: 'Active Nodes', value: `${activeCount} / ${honeypots.length}`, sub: '1 deploying, 1 idle', color: 'blue', icon: Server },
          { label: 'Decoys', value: `${totalDecoys}`, sub: 'Synthetic assets seeded', color: 'orange', icon: HardDrive },
          { label: 'Attacks', value: `${totalAttacksCaptured}`, sub: 'Logged to intelligence lake', color: 'amber', icon: Activity },
        ].map((metric) => (
          <div key={metric.label} className="p-4 rounded-xl bg-stone-200/60 border border-stone-300/50">
            <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
              <span>{metric.label}</span>
              <metric.icon className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-stone-800 font-mono">{metric.value}</div>
            <div className="text-[11px] text-stone-600 mt-1">{metric.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
