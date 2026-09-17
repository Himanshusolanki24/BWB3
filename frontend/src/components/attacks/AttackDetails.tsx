'use client';

import { Shield, Clock, Terminal, Globe, Server, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';
import type { Attacker, AttackSession } from '@/types';
import { getRiskBgColor } from '@/lib/utils';
import Link from 'next/link';

interface AttackDetailsProps {
  session: AttackSession;
  attacker: Attacker;
}

export function AttackDetails({ session, attacker }: AttackDetailsProps) {
  return (
    <div className="card-interactive p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-100 border border-amber-300 text-amber-800 font-bold">
              {session.attackerId}
            </span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${getRiskBgColor(session.risk)}`}>
              {session.risk} THREAT
            </span>
            <span className="text-xs text-stone-500">
              Session ID: <span className="font-mono text-stone-800 font-semibold">{session.id}</span>
            </span>
          </div>
          <p className="text-xs text-stone-600 mt-1">
            Origin: <span className="text-teal-700 font-mono font-bold">{attacker.sourceIP}</span> ({attacker.country || 'External'}) • ASN: {attacker.asn || 'AS4134'}
          </p>
        </div>

        <Link
          href={`/attackers?id=${attacker.id}`}
          className="text-xs font-bold px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-300 text-amber-800 hover:bg-amber-50 hover:border-amber-400 transition-colors self-start sm:self-auto shadow-xs"
        >
          View Full Profile →
        </Link>
      </div>

      {/* Meta Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-lg bg-stone-100/70 border border-stone-200">
          <span className="text-[11px] text-stone-500 font-semibold flex items-center gap-1 mb-1">
            <Server className="w-3.5 h-3.5 text-teal-600" />
            Honeypot
          </span>
          <span className="font-bold text-stone-900 font-mono">{session.honeypot}</span>
        </div>

        <div className="p-3 rounded-lg bg-stone-100/70 border border-stone-200">
          <span className="text-[11px] text-stone-500 font-semibold flex items-center gap-1 mb-1">
            <Globe className="w-3.5 h-3.5 text-orange-600" />
            Protocol
          </span>
          <span className="font-bold text-stone-900 font-mono">{session.protocol}</span>
        </div>

        <div className="p-3 rounded-lg bg-stone-100/70 border border-stone-200">
          <span className="text-[11px] text-stone-500 font-semibold flex items-center gap-1 mb-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Session Duration
          </span>
          <span className="font-bold text-stone-900 font-mono">{session.duration}</span>
        </div>

        <div className="p-3 rounded-lg bg-stone-100/70 border border-stone-200">
          <span className="text-[11px] text-stone-500 font-semibold flex items-center gap-1 mb-1">
            <Terminal className="w-3.5 h-3.5 text-amber-700" />
            Commands Logged
          </span>
          <span className="font-bold text-stone-900 font-mono">{attacker.commandHistory.length} cmds</span>
        </div>
      </div>

      {/* Active Behaviors */}
      <div className="pt-2">
        <span className="text-[11px] text-stone-500 uppercase tracking-wider font-bold block mb-2">
          Observed Attacker Behaviors:
        </span>
        <div className="flex flex-wrap gap-2">
          {session.behaviors.map((b) => (
            <span
              key={b}
              className="text-xs px-2.5 py-1 rounded-md bg-stone-100 border border-stone-300 text-stone-900 font-medium flex items-center gap-1.5 shadow-xs"
            >
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
