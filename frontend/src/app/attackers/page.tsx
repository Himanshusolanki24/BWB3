'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { AttackerProfileHeader } from '@/components/attackers/AttackerProfile';
import { BehaviorRadar } from '@/components/attackers/BehaviorRadar';
import { AttackChain } from '@/components/attackers/AttackChain';
import { attackers } from '@/data/attackers';

export default function AttackersPage() {
  const [selectedAttackerId, setSelectedAttackerId] = useState('ATK-2048');
  const selectedAttacker = attackers.find((a) => a.id === selectedAttackerId) || attackers[0];

  return (
    <div className="space-y-6">
      <PageHeader title="Attacker Intelligence" subtitle="Individual adversary profiles and behavioral analysis.">
        <div className="flex items-center gap-2 overflow-x-auto p-1 bg-stone-200 rounded-lg border border-stone-300">
          {attackers.map((a) => (
            <button key={a.id} onClick={() => setSelectedAttackerId(a.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all ${
                selectedAttackerId === a.id ? 'bg-amber-500 text-stone-50 shadow-sm' : 'text-stone-600 hover:text-stone-700'
              }`}>
              {a.id}
            </button>
          ))}
        </div>
      </PageHeader>
      <AttackerProfileHeader attacker={selectedAttacker} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BehaviorRadar behaviors={selectedAttacker.behaviors} />
        <AttackChain steps={selectedAttacker.attackChain} />
      </div>
      <div className="card-interactive p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-300">
          <div className="flex items-center gap-3">
            <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <h3 className="text-sm font-semibold text-stone-800">Captured Keystroke Forensics</h3>
          </div>
          <span className="text-xs text-stone-600">Decoy Intercept</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead><tr className="border-b border-stone-300 text-stone-600 text-[10px] uppercase"><th className="pb-2">Timestamp</th><th className="pb-2">Command</th><th className="pb-2">Response</th><th className="pb-2 text-right">Flag</th></tr></thead>
            <tbody className="divide-y border-stone-300/50">
              {selectedAttacker.commandHistory.map((cmd, i) => (
                <tr key={i} className="table-row-hover">
                  <td className="py-2.5 pr-4 text-stone-600 whitespace-nowrap">{cmd.timestamp}</td>
                  <td className="py-2.5 pr-4 text-amber-400 font-bold">$ {cmd.command}</td>
                  <td className="py-2.5 pr-4 text-stone-600 max-w-md truncate text-[11px] font-sans">{cmd.output ? cmd.output.replace(/\n/g, ' ⏎ ') : '<no output>'}</td>
                  <td className="py-2.5 text-right whitespace-nowrap">
                    {cmd.flagged ? <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">MALICIOUS</span> : <span className="text-[10px] text-stone-600">benign</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
