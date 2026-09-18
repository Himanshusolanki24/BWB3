'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { AttackerProfileHeader } from '@/components/attackers/AttackerProfile';
import { BehaviorRadar } from '@/components/attackers/BehaviorRadar';
import { AttackChain } from '@/components/attackers/AttackChain';
import { Panel } from '@/components/ui';
import { attackers } from '@/data/attackers';
import { cn } from '@/lib/utils';

export default function AttackersPage() {
  const [selectedId, setSelectedId] = useState('ATK-2048');
  const attacker = attackers.find((a) => a.id === selectedId) || attackers[0];

  return (
    <div className="space-y-6">
      <PageHeader title="Attackers" subtitle="One profile per adversary: where they came from, what they wanted, and how far they got.">
        <div className="seg font-mono" role="group" aria-label="Choose attacker">
          {attackers.map((a) => (
            <button key={a.id} aria-pressed={selectedId === a.id} onClick={() => setSelectedId(a.id)}>
              {a.id}
            </button>
          ))}
        </div>
      </PageHeader>

      <AttackerProfileHeader attacker={attacker} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BehaviorRadar behaviors={attacker.behaviors} />
        <AttackChain steps={attacker.attackChain} />
      </div>

      <Panel title="Keystrokes" note="Every command this attacker ran inside a decoy, with what the decoy answered">
        <div className="-mx-5 overflow-x-auto px-5">
          <table className="data-table min-w-[680px]">
            <thead>
              <tr>
                <th>Time</th>
                <th>Command</th>
                <th>Decoy response</th>
                <th className="text-right">Verdict</th>
              </tr>
            </thead>
            <tbody>
              {attacker.commandHistory.map((cmd, i) => (
                <tr key={i}>
                  <td className="whitespace-nowrap font-mono text-xs text-pencil">{cmd.timestamp}</td>
                  <td className="font-mono text-xs font-medium text-ink">
                    <span className="mr-1.5 text-pencil">$</span>{cmd.command}
                  </td>
                  <td className="max-w-md truncate font-mono text-xs text-graphite" title={cmd.output}>
                    {cmd.output ? cmd.output.replace(/\n/g, ' ⏎ ') : 'no output'}
                  </td>
                  <td className={cn('whitespace-nowrap text-right text-xs font-semibold', cmd.flagged ? 'text-signal' : 'text-pencil')}>
                    {cmd.flagged ? 'Malicious' : 'Benign'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
