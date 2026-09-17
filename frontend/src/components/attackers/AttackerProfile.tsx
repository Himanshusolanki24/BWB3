'use client';

import { useState } from 'react';
import { Shield, Clock, Globe, Terminal, Server, AlertOctagon } from 'lucide-react';
import type { Attacker } from '@/types';
import { getRiskBgColor } from '@/lib/utils';

export function AttackerProfileHeader({ attacker }: { attacker: Attacker }) {
  return (
    <div className="card-interactive p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-honey-border">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-stone-200 border border-stone-300 flex items-center justify-center text-amber-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg font-bold font-mono text-stone-800">{attacker.id}</h2>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getRiskBgColor(attacker.risk)}`}>{attacker.risk} RISK</span>
            </div>
            <p className="text-xs text-stone-600 mt-1">Source IP: <span className="font-mono text-blue-400">{attacker.sourceIP}</span> • {attacker.country || 'Unknown'} • ASN: {attacker.asn || 'AS12345'}</p>
          </div>
        </div>
        <div className="text-right"><div className="text-[11px] text-stone-600">Total Sessions</div><div className="text-sm font-bold font-mono text-stone-800">{attacker.totalSessions}</div></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        {[
          { label: 'Protocol', value: attacker.protocol, color: 'cyan' },
          { label: 'First Seen', value: attacker.firstSeen, color: 'purple' },
          { label: 'Duration', value: attacker.sessionDuration, color: 'emerald' },
          { label: 'Last Seen', value: attacker.lastSeen, color: 'amber' },
        ].map((stat) => (
          <div key={stat.label} className="p-3.5 rounded-xl bg-stone-200/60 border border-stone-300/50">
            <span className="text-[10px] text-stone-600 block mb-1.5">{stat.label}</span>
            <span className="text-sm font-mono font-bold text-stone-800">{stat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
