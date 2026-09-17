'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { AttackDetails } from '@/components/attacks/AttackDetails';
import { TerminalView } from '@/components/attacks/Terminal';
import { attackSessions, attackers } from '@/data/attackers';
import { Flame } from 'lucide-react';
import { getRiskBgColor } from '@/lib/utils';

export default function LiveAttacksPage() {
  const [selectedSessionId, setSelectedSessionId] = useState('sess-001');
  const selectedSession =
    attackSessions.find((s) => s.id === selectedSessionId) || attackSessions[0];
  const selectedAttacker =
    attackers.find((a) => a.id === selectedSession.attackerId) || attackers[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Live Attack Monitor"
        subtitle="Observe attacker activity with raw command capture, synthetic deception traps, and session isolation."
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-100 border border-rose-200 text-xs text-rose-800 font-bold">
          <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
          {attackSessions.length} Active Feeds
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-4 space-y-6">
          <div className="card-interactive p-4 flex flex-col h-full space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-200">
              <Flame className="w-4 h-4 text-amber-600 animate-pulse" />
              <h3 className="text-sm font-bold text-stone-900">
                Active Sessions ({attackSessions.length})
              </h3>
            </div>
            <div className="space-y-2 overflow-y-auto max-h-[500px] pr-1">
              {attackSessions.map((s) => {
                const isSelected = s.id === selectedSessionId;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedSessionId(s.id)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer text-xs ${
                      isSelected
                        ? 'bg-amber-50/80 border-amber-400 shadow-xs ring-1 ring-amber-300'
                        : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-bold text-stone-900">
                        {s.attackerId}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getRiskBgColor(s.risk)}`}
                      >
                        {s.risk}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-600">
                      <span>
                        Node: <strong className="text-stone-900 font-semibold">{s.honeypot}</strong>
                      </span>
                      <span className="font-mono text-stone-500">{s.duration}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="lg:col-span-8 space-y-6">
          <AttackDetails session={selectedSession} attacker={selectedAttacker} />
          <TerminalView
            sessionTitle={selectedSession.attackerId}
            protocol={selectedSession.protocol}
            honeypot={selectedSession.honeypot}
            commands={selectedAttacker.commandHistory}
            isActive={selectedSession.status === 'ACTIVE'}
          />
        </div>
      </div>
    </div>
  );
}
