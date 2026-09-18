import Link from 'next/link';
import type { Honeypot } from '@/types';
import { Meter } from '@/components/ui';
import { cn } from '@/lib/utils';

const statusStyle: Record<string, string> = {
  ACTIVE: 'text-moss',
  DEPLOYING: 'text-cobalt',
  IDLE: 'text-pencil',
  MAINTENANCE: 'text-ember',
};

export function HoneypotCard({ honeypot: h }: { honeypot: Honeypot }) {
  const engaged = h.currentSessions > 0;

  return (
    <article className={cn('sheet flex flex-col p-5', engaged && 'shadow-[inset_0_3px_0_var(--color-lure)]')}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-mono text-[15px] font-semibold text-ink">{h.name}</h3>
          <p className="mt-0.5 text-[13px] text-graphite">
            {h.type}, {h.protocol}
          </p>
        </div>
        <span className={cn('flex shrink-0 items-center gap-1.5 text-xs font-semibold capitalize', statusStyle[h.status])}>
          {h.status === 'ACTIVE' ? <span className="live-dot" /> : <span className="h-[7px] w-[7px] rounded-full bg-current" />}
          {h.status.toLowerCase()}
        </span>
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-3">
        {[
          { label: 'Attackers in', value: h.currentSessions },
          { label: 'Decoys', value: h.totalDecoys },
          { label: 'Attacks', value: h.attacksDetected },
        ].map((m) => (
          <div key={m.label}>
            <dt className="text-xs text-pencil">{m.label}</dt>
            <dd className="mt-0.5 text-xl font-semibold tabular-nums text-ink">{m.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5">
        <div className="flex justify-between text-xs">
          <span className="text-pencil">Health</span>
          <span className="font-semibold tabular-nums text-ink">{h.health}%</span>
        </div>
        <Meter value={h.health} className="mt-1.5" tone={h.health >= 90 ? 'bg-moss' : 'bg-ember'} />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-rule pt-3 text-xs text-pencil">
        <span>{h.location}, up {h.uptime}</span>
        <Link href={`/deception-lab?node=${h.name}`} className="font-semibold text-cobalt hover:underline">
          Inspect decoys
        </Link>
      </div>
    </article>
  );
}
