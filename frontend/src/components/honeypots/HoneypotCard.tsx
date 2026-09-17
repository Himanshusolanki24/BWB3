'use client';

import { motion } from 'framer-motion';
import { Server, Users, Layers, Activity, Clock, ArrowUpRight } from 'lucide-react';
import type { Honeypot } from '@/types';
import Link from 'next/link';

interface HoneypotCardProps {
  honeypot: Honeypot;
  index: number;
}

export function HoneypotCard({ honeypot, index }: HoneypotCardProps) {
  const isHealthy = honeypot.health >= 90;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="card-interactive p-5 flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-stone-200 border border-stone-300 text-blue-400">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-800 font-mono">{honeypot.name}</h3>
              <p className="text-[11px] text-stone-600">{honeypot.type} ({honeypot.protocol})</p>
            </div>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
            honeypot.status === 'ACTIVE' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
            honeypot.status === 'DEPLOYING' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
            'bg-amber-500/10 text-amber-400 border-amber-500/20'
          }`}>● {honeypot.status}</span>
        </div>
        <div className="text-[11px] text-stone-600 mb-4">Cluster Zone: <span className="text-stone-400 font-medium">{honeypot.location}</span></div>
        <div className="grid grid-cols-3 gap-2 p-2.5 rounded-lg bg-stone-200/50 border border-stone-300/50 text-center mb-4">
          <div><div className="text-[10px] text-stone-600 uppercase">Sessions</div><div className="text-sm font-bold font-mono text-amber-400">{honeypot.currentSessions}</div></div>
          <div className="border-x border-stone-300/60"><div className="text-[10px] text-stone-600 uppercase">Decoys</div><div className="text-sm font-bold font-mono text-blue-400">{honeypot.totalDecoys}</div></div>
          <div><div className="text-[10px] text-stone-600 uppercase">Attacks</div><div className="text-sm font-bold font-mono text-stone-800">{honeypot.attacksDetected}</div></div>
        </div>
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-600 text-[11px]">System Health</span>
            <span className={`font-mono font-bold ${isHealthy ? 'text-amber-400' : 'text-amber-400'}`}>{honeypot.health}%</span>
          </div>
          <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden border border-stone-300/40">
            <div className={`h-full rounded-full ${isHealthy ? 'bg-amber-400' : 'bg-amber-400'}`} style={{ width: `${honeypot.health}%` }} />
          </div>
        </div>
      </div>
      <div className="pt-3 border-t-honey-border flex items-center justify-between text-[11px] text-stone-600">
        <span>Uptime: {honeypot.uptime}</span>
        <Link href={`/deception-lab?node=${honeypot.name}`} className="text-amber-400 hover:amber-400-300 font-medium flex items-center gap-1 transition-colors">
          <span>Inspect Decoys</span><ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
}
