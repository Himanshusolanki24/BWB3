import Link from 'next/link';
import type { AdaptationEvent } from '@/types';
import { Panel } from '@/components/ui';
import { cn } from '@/lib/utils';

export function AdaptationTimeline({ events }: { events: AdaptationEvent[] }) {
  return (
    <Panel
      className="h-full"
      title="Recent adaptations"
      note="Each time the decoys changed, and what it bought"
      action={<Link href="/evolution" className="text-[13px] font-semibold text-cobalt hover:underline">See all</Link>}
    >
      <ol className="relative space-y-5 before:absolute before:bottom-2 before:left-[5px] before:top-2 before:w-px before:bg-rule-strong">
        {events.slice(0, 5).map((e, i) => {
          const changed = e.previousStrategy !== e.newStrategy;
          return (
            <li key={e.id} className="relative pl-6">
              <span
                className={cn(
                  'absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2',
                  i === 0 ? 'border-ink bg-lure' : 'border-rule-strong bg-sheet'
                )}
              />
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-semibold text-ink">{e.behavior}</p>
                <time className="shrink-0 font-mono text-[11px] text-pencil">{e.timestamp}</time>
              </div>
              <p className="mt-0.5 text-[13px] text-graphite">
                {changed ? (
                  <>
                    <span className="text-pencil line-through decoration-pencil/60">{e.previousStrategy}</span>
                    {' to '}
                    <span className="font-medium text-ink">{e.newStrategy}</span>
                  </>
                ) : (
                  <>Kept {e.newStrategy.toLowerCase()}</>
                )}
              </p>
              {e.result && <p className="mt-1 text-xs font-semibold text-moss">{e.result}</p>}
            </li>
          );
        })}
      </ol>
    </Panel>
  );
}
