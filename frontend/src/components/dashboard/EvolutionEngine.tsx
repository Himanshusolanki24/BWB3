'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { EvolutionStage } from '@/types';
import { Panel, Meter } from '@/components/ui';
import { cn } from '@/lib/utils';

const stages: { id: EvolutionStage; label: string; description: string }[] = [
  { id: 'OBSERVE', label: 'Observe', description: 'Record every command and request the attacker sends.' },
  { id: 'ANALYZE', label: 'Analyze', description: 'Work out what the attacker is after from their sequence of actions.' },
  { id: 'ADAPT', label: 'Adapt', description: 'Pick the deception most likely to keep them engaged.' },
  { id: 'DECEIVE', label: 'Deceive', description: 'Generate and plant new decoy files, credentials and services.' },
  { id: 'LEARN', label: 'Learn', description: 'Measure whether the attacker took the bait, and for how long.' },
  { id: 'EVOLVE', label: 'Evolve', description: 'Feed the result back so the next choice is better.' },
];

export function EvolutionEngine() {
  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((i) => (i + 1) % stages.length), 3200);
    return () => clearInterval(t);
  }, [paused]);

  const stage = stages[active];

  return (
    <Panel
      className="h-full"
      title="Deception loop"
      note="Cycle 47, running for 2h 14m"
      action={<Link href="/evolution" className="btn">View engine</Link>}
    >
      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
        <div className="relative">
          <div className="absolute left-[8.33%] right-[8.33%] top-[15px] hidden h-px bg-rule-strong sm:block" aria-hidden />
          <motion.div
            className="absolute left-[8.33%] top-[14px] hidden h-[3px] rounded-full bg-lure sm:block"
            animate={{ width: `${(active / (stages.length - 1)) * 83.33}%` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            aria-hidden
          />
        <ol className="relative grid grid-cols-3 gap-y-5 sm:grid-cols-6">
          {stages.map((s, i) => {
            const isActive = i === active;
            const done = i < active;
            return (
              <li key={s.id} className="relative flex flex-col items-center">
                <button
                  onClick={() => setActive(i)}
                  aria-current={isActive ? 'step' : undefined}
                  className={cn(
                    'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold transition-colors',
                    isActive && 'border-ink bg-lure text-ink',
                    done && 'border-ink bg-ink text-white',
                    !isActive && !done && 'border-rule-strong bg-sheet text-pencil hover:border-ink hover:text-ink'
                  )}
                >
                  {i + 1}
                </button>
                <span className={cn('mt-2 text-[13px]', isActive ? 'font-semibold text-ink' : 'text-graphite')}>{s.label}</span>
              </li>
            );
          })}
        </ol>
        </div>

        <div className="mt-6 grid gap-4 border-t border-rule pt-5 md:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-xs text-pencil">Now running</p>
            <p className="mt-1 text-lg font-semibold tracking-tight text-ink">{stage.label}</p>
            <p className="mt-1 max-w-[46ch] text-sm text-graphite">{stage.description}</p>
          </div>
          <dl className="space-y-3 rounded-lg bg-sunk p-4 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-graphite">Current strategy</dt>
              <dd className="text-right font-semibold text-ink">Database-focused deception</dd>
            </div>
            <div>
              <div className="flex justify-between">
                <dt className="text-graphite">Confidence</dt>
                <dd className="font-semibold text-ink">94%</dd>
              </div>
              <Meter value={94} className="mt-2" tone="bg-lure" />
            </div>
          </dl>
        </div>
      </div>
    </Panel>
  );
}
