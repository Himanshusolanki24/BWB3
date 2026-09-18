'use client';

import { useState } from 'react';
import type { EvolutionStage } from '@/types';
import { cn } from '@/lib/utils';

interface StageDetail {
  id: EvolutionStage;
  name: string;
  subtitle: string;
  action: string;
  inputs: string[];
  algorithms: string[];
  output: string;
}

const evolutionStages: StageDetail[] = [
  { id: 'OBSERVE', name: 'Observe', subtitle: 'Collect telemetry', action: 'Capture keystrokes, network traces, payload drops and system calls inside isolated traps.', inputs: ['SSH keystroke stream', 'HTTP payload bodies', 'API query patterns', 'Network egress attempts'], algorithms: ['Raw sensor interceptors', 'eBPF kernel probes', 'Pcap flow analyzers'], output: 'Normalized event stream' },
  { id: 'ANALYZE', name: 'Analyze', subtitle: 'Infer intent', action: 'Match the attacker’s actions against MITRE ATT&CK tactics to work out what they want.', inputs: ['Normalized event stream', 'Threat intelligence graph', 'Historic attacker signatures'], algorithms: ['Behavioral sequence transformers', 'Intent classifier v3.2', 'Risk scoring network'], output: 'Intent: database exfiltration (94% confidence)' },
  { id: 'ADAPT', name: 'Adapt', subtitle: 'Choose a strategy', action: 'Pick the deception that keeps the attacker engaged longest while staying contained.', inputs: ['Adversary intent', 'Available sandbox clusters', 'Honeynet topology rules'], algorithms: ['Deception decision tree', 'Engagement maximization', 'Containment bounds'], output: 'Strategy: database decoy injection' },
  { id: 'DECEIVE', name: 'Deceive', subtitle: 'Plant decoys', action: 'Generate fake files, credentials, honeyhashes and mock tables on the fly.', inputs: ['Selected strategy', 'Target honeypot node', 'Mock schema templates'], algorithms: ['Synthetic file generator', 'Canary credential generator', 'Honeytoken watermarking'], output: 'Planted database.conf, backup.sql, db_credentials.txt' },
  { id: 'LEARN', name: 'Learn', subtitle: 'Measure engagement', action: 'Watch how the attacker reacts to the new decoys and record dwell time and depth.', inputs: ['Decoy access logs', 'Time spent in decoy', 'Follow-up commands'], algorithms: ['Engagement quality index', 'Plausibility evaluator', 'Tactic success scorer'], output: '+5 interactions, 98% plausibility' },
  { id: 'EVOLVE', name: 'Evolve', subtitle: 'Improve the playbook', action: 'Retrain behavior weights and update the deception playbooks for next time.', inputs: ['Engagement outcome', 'Attacker counter-moves', 'Fleet-wide telemetry'], algorithms: ['Reinforcement learning from attacker feedback', 'Policy gradient updater'], output: 'Updated weights for database campaigns' },
];

export function EvolutionLoop() {
  const [selected, setSelected] = useState<EvolutionStage>('ADAPT');
  const detail = evolutionStages.find((s) => s.id === selected) || evolutionStages[2];

  return (
    <section className="sheet overflow-hidden">
      <ol className="grid grid-cols-2 gap-px border-b border-rule bg-rule sm:grid-cols-3 lg:grid-cols-6">
        {evolutionStages.map((s, i) => {
          const isSelected = s.id === selected;
          return (
            <li key={s.id}>
              <button
                onClick={() => setSelected(s.id)}
                aria-pressed={isSelected}
                className={cn('h-full w-full px-4 py-4 text-left transition-colors', isSelected ? 'bg-lure-soft' : 'bg-sheet hover:bg-sunk')}
              >
                <span className={cn('text-xs tabular-nums', isSelected ? 'font-semibold text-lure-ink' : 'text-pencil')}>Step {i + 1}</span>
                <span className={cn('mt-1 block text-[15px] font-semibold text-ink')}>
                  <span className={cn(isSelected && 'mark')}>{s.name}</span>
                </span>
                <span className="mt-0.5 block text-xs text-graphite">{s.subtitle}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="p-6">
        <p className="max-w-[70ch] text-[15px] text-ink">{detail.action}</p>
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-medium text-pencil">Takes in</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-ink">
              {detail.inputs.map((x) => <li key={x} className="border-l-2 border-rule-strong pl-2.5">{x}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-medium text-pencil">Runs</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-ink">
              {detail.algorithms.map((x) => <li key={x} className="border-l-2 border-cobalt pl-2.5">{x}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-medium text-pencil">Produces</h3>
            <p className="mt-2 rounded-md border border-lure bg-lure-soft px-3 py-2.5 font-mono text-[13px] text-ink">{detail.output}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
