'use client';

import { useState } from 'react';
import { Eye, Cpu, RefreshCw, Layers, GraduationCap, Sparkles, ArrowRight, Shield } from 'lucide-react';
import type { EvolutionStage } from '@/types';

interface StageDetail {
  id: EvolutionStage;
  name: string;
  subtitle: string;
  icon: any;
  action: string;
  inputs: string[];
  algorithms: string[];
  output: string;
}

const evolutionStages: StageDetail[] = [
  { id: 'OBSERVE', name: 'OBSERVE', subtitle: 'Telemetry Collection', icon: Eye, action: 'Capture keystrokes, network traces, payload drops & system calls in isolated traps.', inputs: ['SSH keystroke stream', 'HTTP payload bodies', 'API query patterns', 'Network egress attempts'], algorithms: ['Raw Sensor Interceptors', 'eBPF Kernel Probes', 'Pcap Flow Analyzers'], output: 'Normalized Event Stream' },
  { id: 'ANALYZE', name: 'ANALYZE', subtitle: 'Intent & Heuristic Modeling', icon: Cpu, action: 'Cluster adversary actions against MITRE ATT&CK tactics to deduce current objective.', inputs: ['Normalized Event Stream', 'Threat Intelligence Graph', 'Historic Attacker Signatures'], algorithms: ['Behavioral Sequence Transformers', 'Intent Classifier v3.2', 'Risk Scoring Neural Net'], output: 'Adversary Intent: "Database Exfiltration" (94% Conf)' },
  { id: 'ADAPT', name: 'ADAPT', subtitle: 'Strategy Selection', icon: RefreshCw, action: 'Determine optimum deception strategy to prolong engagement and maximize telemetry.', inputs: ['Adversary Intent', 'Available Sandbox Clusters', 'Honeynet Topology Rules'], algorithms: ['Deception Decision Tree', 'Engagement Maximization Engine', 'Safe Containment Bounds'], output: 'Selected Strategy: "Database Decoy Injection"' },
  { id: 'DECEIVE', name: 'DECEIVE', subtitle: 'Synthetic Asset Deployment', icon: Layers, action: 'Dynamically synthesize fake files, fake credentials, honeyhashes, and mock tables on the fly.', inputs: ['Selected Strategy', 'Target Honeypot Node', 'Realistic Mock Schema Templates'], algorithms: ['Synthetic File Synthesizer', 'Canary Credential Generator', 'Honeytoken Watermarking'], output: 'Deployed: database.conf, backup.sql, db_credentials.txt' },
  { id: 'LEARN', name: 'LEARN', subtitle: 'Engagement Measurement', icon: GraduationCap, action: 'Observe adversary reaction to synthesized decoys and record dwell time and depth.', inputs: ['Decoy Access Logs', 'Attacker Time in Decoy', 'Secondary Commands Issued'], algorithms: ['Engagement Quality Index', 'Decoy Plausibility Evaluator', 'Tactic Success Scorer'], output: 'Result: +5 interactions, 98% plausibility score' },
  { id: 'EVOLVE', name: 'EVOLVE', subtitle: 'Model & Strategy Optimization', icon: Sparkles, action: 'Retrain behavior classification weights and update autonomous deception playbooks.', inputs: ['Engagement Outcome', 'Adversary Adaptation Counter-moves', 'Global Fleet Telemetry'], algorithms: ['Reinforcement Learning from Attacker Feedback (RLAF)', 'Policy Gradient Updater'], output: 'Updated Deception Weights for Database Campaigns' },
];

export function EvolutionLoop() {
  const [selectedStage, setSelectedStage] = useState<EvolutionStage>('ADAPT');
  const currentDetail = evolutionStages.find((s) => s.id === selectedStage) || evolutionStages[2];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {evolutionStages.map((stage, i) => {
          const Icon = stage.icon;
          const isSelected = stage.id === selectedStage;
          return (
            <button key={stage.id} onClick={() => setSelectedStage(stage.id)}
              className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow shadow-amber-500/10' :
                'bg-stone-200/50 border-stone-300 hover:border-stone-400 text-stone-600 hover:text-stone-700'
              }`}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-stone-600">0{i + 1}</span>
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-stone-600'}`} />
                </div>
                <h4 className="text-xs font-bold tracking-wider font-mono">{stage.name}</h4>
                <p className="text-[10px] text-stone-600 truncate mt-0.5">{stage.subtitle}</p>
              </div>
              {isSelected && <div className="mt-3 text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 text-center">ACTIVE</div>}
            </button>
          );
        })}
      </div>
      <div className="card-accent p-6 border-amber-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-stone-300">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <currentDetail.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-bold">STAGE: {currentDetail.name}</span>
                <h3 className="text-base font-bold text-stone-800">{currentDetail.subtitle}</h3>
              </div>
              <p className="text-xs text-stone-600 mt-1 max-w-2xl">{currentDetail.action}</p>
            </div>
          </div>
          <span className="text-xs text-stone-600 font-mono">Self-Evolving Loop ↺</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 text-xs">
          <div className="p-3.5 rounded-xl bg-stone-200/80 border border-stone-300/60">
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block mb-2">Input Signals</span>
            <ul className="space-y-1.5 text-stone-600">
              {currentDetail.inputs.map((inp, idx) => <li key={idx} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" />{inp}</li>)}
            </ul>
          </div>
          <div className="p-3.5 rounded-xl bg-stone-200/80 border border-stone-300/60">
            <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider block mb-2">Internal ML Pipeline</span>
            <ul className="space-y-1.5 text-stone-600">
              {currentDetail.algorithms.map((alg, idx) => <li key={idx} className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-orange-400" />{alg}</li>)}
            </ul>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-2">Produced Output</span>
            <p className="font-mono text-stone-800 font-semibold bg-stone-100 p-2.5 rounded border border-stone-300">{currentDetail.output}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
