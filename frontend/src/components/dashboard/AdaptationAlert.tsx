'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw } from 'lucide-react';

const alerts = [
  {
    behavior: 'Database reconnaissance',
    previous: 'Generic Linux files',
    next: 'Targeted MySQL environment with dump decoy',
    confidence: 94,
  },
  {
    behavior: 'Credential dumping via /etc/shadow',
    previous: 'Standard Linux decoys',
    next: 'Canary SSH keys and honeyhash injections',
    confidence: 98,
  },
];

export function AdaptationAlert() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [simulating, setSimulating] = useState(false);
  const alert = alerts[index];

  const simulate = () => {
    setSimulating(true);
    setTimeout(() => {
      setIndex((i) => (i + 1) % alerts.length);
      setVisible(true);
      setSimulating(false);
    }, 600);
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {visible ? (
        <motion.section
          key={index}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="sheet relative overflow-hidden border-lure/70 bg-lure-soft/60"
          role="status"
        >
          <div className="absolute inset-y-0 left-0 w-1.5 bg-lure" />
          <div className="flex flex-col gap-4 py-4 pl-6 pr-4 md:flex-row md:items-center">
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold text-ink">
                The environment adapted to a new behavior
                <span className="ml-2 inline-block whitespace-nowrap rounded-full bg-sheet px-2 py-px text-xs font-semibold text-lure-ink ring-1 ring-lure">
                  {alert.confidence}% confidence
                </span>
              </p>
              <p className="mt-1 text-sm text-graphite">
                Saw <strong className="font-semibold text-ink">{alert.behavior}</strong>. Replaced{' '}
                <span className="text-pencil line-through decoration-pencil/60">{alert.previous}</span> with{' '}
                <span className="mark font-semibold text-ink">{alert.next}</span>.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <Link href="/deception-lab" className="btn btn-primary">Inspect decoy</Link>
              <button onClick={() => setVisible(false)} className="rounded-md p-2 text-graphite hover:bg-sheet hover:text-ink" aria-label="Dismiss">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.section>
      ) : (
        <motion.div key="replay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
          <button onClick={simulate} disabled={simulating} className="btn">
            <RefreshCw className={`h-3.5 w-3.5 ${simulating ? 'animate-spin' : ''}`} />
            {simulating ? 'Simulating' : 'Simulate an adaptation'}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
