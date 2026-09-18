import type { Attacker } from '@/types';
import { RiskBadge } from '@/components/ui';

export function AttackerProfileHeader({ attacker }: { attacker: Attacker }) {
  const facts = [
    { label: 'Protocol', value: attacker.protocol },
    { label: 'First seen', value: attacker.firstSeen },
    { label: 'Last seen', value: attacker.lastSeen },
    { label: 'Longest session', value: attacker.sessionDuration },
    { label: 'Sessions', value: attacker.totalSessions },
  ];

  return (
    <section className="sheet grid overflow-hidden md:grid-cols-[minmax(260px,1fr)_2fr]">
      <div className="border-b border-rule p-6 md:border-b-0 md:border-r">
        <div className="flex items-center gap-2.5">
          <h2 className="font-mono text-2xl font-semibold tracking-tight text-ink">{attacker.id}</h2>
          <RiskBadge risk={attacker.risk} />
        </div>
        <p className="mt-2 font-mono text-sm text-ink">{attacker.sourceIP}</p>
        <p className="mt-0.5 text-sm text-graphite">
          {attacker.country || 'Unknown country'}, {attacker.asn || 'AS12345'}
        </p>
      </div>
      <dl className="grid grid-cols-2 gap-px bg-rule sm:grid-cols-5">
        {facts.map((f) => (
          <div key={f.label} className="bg-sheet p-5">
            <dt className="text-xs text-pencil">{f.label}</dt>
            <dd className="mt-1.5 font-mono text-sm font-medium text-ink">{f.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
