'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { EvolutionLoop } from '@/components/evolution/EvolutionLoop';
import { CurrentEvolution } from '@/components/evolution/CurrentEvolution';
import { EvolutionHistoryTable } from '@/components/evolution/EvolutionHistory';
import { evolutionHistory } from '@/data/adaptations';
import { Dna, RefreshCw } from 'lucide-react';

export default function EvolutionEnginePage() {
  const [history, setHistory] = useState(evolutionHistory);
  const [isIterating, setIsIterating] = useState(false);

  const handleSimulateCycle = () => {
    setIsIterating(true);
    setTimeout(() => {
      const newEntry = { time: new Date().toTimeString().split(' ')[0].slice(0, 5), behavior: 'Privilege Escalation attempt', oldStrategy: 'Database decoys', newStrategy: 'Synthetic Sudoers & Vulnerable Cron Trap', result: '+6m engagement (+4 commands)' };
      setHistory((prev) => [newEntry, ...prev]);
      setIsIterating(false);
    }, 900);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Evolution Engine" subtitle="Autonomous feedback loops that continuously refine honeynet deception.">
        <button onClick={handleSimulateCycle} disabled={isIterating} className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500 text-stone-50 font-semibold text-xs hover:bg-amber-400 transition-colors shadow-sm disabled:opacity-50">
          <RefreshCw className={`w-3.5 h-3.5 ${isIterating ? 'animate-spin' : ''}`} />
          <span>{isIterating ? 'Synthesizing...' : 'Simulate Cycle'}</span>
        </button>
      </PageHeader>
      <EvolutionLoop />
      <CurrentEvolution />
      <EvolutionHistoryTable history={history} />
    </div>
  );
}
