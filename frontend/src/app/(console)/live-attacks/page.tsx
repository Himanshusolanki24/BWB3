'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { AttackList } from '@/components/attacks/AttackList';
import { AttackDetails } from '@/components/attacks/AttackDetails';
import { TerminalView } from '@/components/attacks/Terminal';
import { attackSessions, attackers } from '@/data/attackers';

export default function LiveAttacksPage() {
  const [selectedSessionId, setSelectedSessionId] = useState('sess-001');
  const session = attackSessions.find((s) => s.id === selectedSessionId) || attackSessions[0];
  const attacker = attackers.find((a) => a.id === session.attackerId) || attackers[0];

  return (
    <div>
      <PageHeader title="Live attacks" subtitle="Pick a session to see who is on the other end and replay exactly what they typed.">
        <span className="flex items-center gap-2 rounded-full border border-signal/25 bg-signal-soft px-3 py-1 text-[13px] font-semibold text-signal">
          <span className="live-dot" />
          {attackSessions.length} sessions open
        </span>
      </PageHeader>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="lg:sticky lg:top-24 lg:col-span-4">
          <AttackList sessions={attackSessions} selectedSessionId={selectedSessionId} onSelectSession={setSelectedSessionId} />
        </div>
        <div className="space-y-6 lg:col-span-8">
          <AttackDetails session={session} attacker={attacker} />
          <TerminalView
            sessionTitle={session.attackerId}
            protocol={session.protocol}
            honeypot={session.honeypot}
            commands={attacker.commandHistory}
            isActive={session.status === 'ACTIVE'}
          />
        </div>
      </div>
    </div>
  );
}
