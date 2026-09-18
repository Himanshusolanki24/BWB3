import type { DashboardStats } from '@/types';
import { cn } from '@/lib/utils';

const order: Array<{ key: keyof DashboardStats; title: string }> = [
  { key: 'activeSessions', title: 'Active sessions' },
  { key: 'attacksDetected', title: 'Attacks detected' },
  { key: 'uniqueAttackers', title: 'Unique attackers' },
  { key: 'decoysGenerated', title: 'Decoys generated' },
  { key: 'avgEngagement', title: 'Avg. time in decoy' },
];

export function StatStrip({ stats }: { stats: DashboardStats }) {
  return (
    <section className="sheet grid grid-cols-2 gap-px overflow-hidden bg-rule lg:grid-cols-5">
      {order.map(({ key, title }, i) => {
        const s = stats[key];
        const up = s.trend >= 0;
        return (
          <div
            key={key}
            className={cn('bg-sheet px-5 py-4', i === order.length - 1 && 'col-span-2 lg:col-span-1')}
          >
            <p className="text-[13px] text-graphite">{title}</p>
            <p className="mt-1.5 text-[30px] font-semibold tabular-nums leading-none tracking-[-0.03em] text-ink">{s.value}</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-pencil">
              <span className={cn('font-semibold', up ? 'text-moss' : 'text-signal')}>
                {up ? '▲' : '▼'} {Math.abs(s.trend)}%
              </span>
              {s.label.toLowerCase()}
            </p>
          </div>
        );
      })}
    </section>
  );
}
