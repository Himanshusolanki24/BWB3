import Link from 'next/link';
import { Panel } from '@/components/ui';

const decoys = [
  { name: 'database.conf', desc: 'Database credentials trap' },
  { name: 'backup.sql', desc: 'Mock 2.1 MB customer schema dump' },
  { name: 'db_credentials.txt', desc: 'Honeyhashes and canary tokens' },
];

export function CurrentEvolution() {
  return (
    <Panel
      title="Current strategy"
      note="Triggered after the attacker kept touching database-related paths"
      action={<span className="rounded-full bg-lure-soft px-2.5 py-0.5 text-xs font-semibold text-lure-ink ring-1 ring-lure">94% confidence</span>}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-xs text-pencil">Behavior detected</p>
          <p className="mt-1 text-lg font-semibold tracking-tight text-ink">Database reconnaissance</p>
          <div className="mt-5 flex items-center gap-3 text-sm">
            <div className="flex-1 rounded-md border border-dashed border-rule-strong px-3 py-2">
              <p className="text-xs text-pencil">Before</p>
              <p className="text-graphite line-through decoration-pencil/60">Generic Linux decoys</p>
            </div>
            <span className="text-pencil" aria-hidden>→</span>
            <div className="flex-1 rounded-md border border-ink px-3 py-2">
              <p className="text-xs text-pencil">Now</p>
              <p className="font-semibold text-ink">Database-focused deception</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <p className="text-xs text-pencil">Decoys planted for this strategy</p>
            <Link href="/deception-lab" className="text-[13px] font-semibold text-cobalt hover:underline">Open in lab</Link>
          </div>
          <ul className="mt-2 divide-y divide-rule rounded-md border border-rule">
            {decoys.map((d) => (
              <li key={d.name} className="flex items-center justify-between gap-3 px-3 py-2.5">
                <span className="mark font-mono text-[13px] text-ink">{d.name}</span>
                <span className="text-right text-xs text-graphite">{d.desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}
