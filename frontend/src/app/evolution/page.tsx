'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { EvolutionLoop } from '@/components/evolution/EvolutionLoop';
import { CurrentEvolution } from '@/components/evolution/CurrentEvolution';
import { EvolutionHistoryTable } from '@/components/evolution/EvolutionHistory';
import { evolutionHistory } from '@/data/adaptations';
import { RefreshCw } from 'lucide-react';

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
      <PageHeader title="Evolution" subtitle="How the engine watches, decides and rebuilds the decoys. Pick a stage to see what goes in and what comes out.">
        <button onClick={handleSimulateCycle} disabled={isIterating} className="btn btn-primary">
          <RefreshCw className={`h-3.5 w-3.5 ${isIterating ? 'animate-spin' : ''}`} />
          {isIterating ? 'Running cycle' : 'Run a cycle'}
        </button>
      </PageHeader>
      <EvolutionLoop />
      <CurrentEvolution />
      <EvolutionHistoryTable history={history} />
    </div>
  );
}
