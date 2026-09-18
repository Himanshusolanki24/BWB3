import type { BehaviorDistribution as BehaviorDistributionType } from '@/types';
import { Panel } from '@/components/ui';

export function BehaviorDistribution({ data }: { data: BehaviorDistributionType[] }) {
  const sorted = [...data].sort((a, b) => b.value - a.value);
  const max = sorted[0]?.value ?? 1;

  return (
    <Panel className="h-full" title="Behavior mix" note="Share of sessions by the intent the classifier assigned">
      <div className="flex h-3 w-full overflow-hidden rounded-full" role="img" aria-label="Proportion of sessions by behavior">
        {sorted.map((d) => (
          <span key={d.name} style={{ width: `${d.value}%`, background: d.color }} className="border-r-2 border-sheet last:border-r-0" />
        ))}
      </div>

      <ol className="mt-6 space-y-4">
        {sorted.map((d) => (
          <li key={d.name}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="flex items-center gap-2 text-ink">
                <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: d.color }} />
                {d.name}
              </span>
              <span className="font-semibold text-ink">{d.value}%</span>
            </div>
            <div className="mt-1.5 h-1 rounded-full bg-sunk">
              <div className="h-full rounded-full" style={{ width: `${(d.value / max) * 100}%`, background: d.color }} />
            </div>
          </li>
        ))}
      </ol>
    </Panel>
  );
}
