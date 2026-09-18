import { Check } from 'lucide-react';
import type { AttackChainStep } from '@/types';
import { Panel } from '@/components/ui';
import { cn } from '@/lib/utils';

export function AttackChain({ steps }: { steps: AttackChainStep[] }) {
  const reached = steps.filter((s) => s.completed || s.active).length;

  return (
    <Panel title="Kill chain progress" note={`Reached ${reached} of ${steps.length} stages`}>
      <ol className="relative">
        {steps.map((step, i) => {
          const last = i === steps.length - 1;
          return (
            <li key={step.stage} className="relative flex gap-4 pb-5 last:pb-0">
              {!last && (
                <span className={cn('absolute left-[13px] top-7 bottom-0 w-px', step.completed ? 'bg-ink' : 'bg-rule-strong')} aria-hidden />
              )}
              <span
                className={cn(
                  'relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold',
                  step.completed && 'border-ink bg-ink text-white',
                  step.active && 'border-ink bg-lure text-ink',
                  !step.completed && !step.active && 'border-dashed border-rule-strong bg-sheet text-pencil'
                )}
              >
                {step.completed ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
              </span>
              <div className="flex min-w-0 flex-1 items-baseline justify-between gap-3 pt-1">
                <span className={cn('text-sm', step.active ? 'mark font-semibold text-ink' : step.completed ? 'text-ink' : 'text-pencil')}>
                  {step.stage}
                </span>
                <span className="shrink-0 font-mono text-[11px] text-pencil">
                  {step.active ? 'in progress' : step.completed ? step.timestamp : 'expected next'}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </Panel>
  );
}
