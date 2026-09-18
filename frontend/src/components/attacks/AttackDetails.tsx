import Link from 'next/link';
import type { Attacker, AttackSession } from '@/types';
import { Panel, RiskBadge, Tag } from '@/components/ui';

export function AttackDetails({ session, attacker }: { session: AttackSession; attacker: Attacker }) {
  const facts = [
    { label: 'Decoy', value: session.honeypot },
    { label: 'Protocol', value: session.protocol },
    { label: 'Time in decoy', value: session.duration },
    { label: 'Commands logged', value: attacker.commandHistory.length },
  ];

  return (
    <Panel
      title={
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-mono">{session.attackerId}</span>
          <RiskBadge risk={session.risk} />
        </span>
      }
      note={
        <>
          From <span className="font-mono text-ink">{attacker.sourceIP}</span> in {attacker.country || 'an unknown country'}, {attacker.asn || 'AS4134'}. Session {session.id}.
        </>
      }
      action={<Link href={`/attackers?id=${attacker.id}`} className="btn">Open profile</Link>}
    >
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-rule bg-rule sm:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="bg-sunk px-3.5 py-3">
            <dt className="text-xs text-pencil">{f.label}</dt>
            <dd className="mt-1 font-mono text-sm font-medium text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-[13px] text-graphite">Seen doing</span>
        {session.behaviors.map((b) => (
          <Tag key={b} className="font-sans text-xs text-ink">{b}</Tag>
        ))}
      </div>
    </Panel>
  );
}
