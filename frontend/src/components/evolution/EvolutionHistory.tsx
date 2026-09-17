'use client';

import { motion } from 'framer-motion';
import { History, TrendingUp } from 'lucide-react';

interface EvolutionHistoryProps {
  history: Array<{ time: string; behavior: string; oldStrategy: string; newStrategy: string; result: string }>;
}

export function EvolutionHistoryTable({ history }: EvolutionHistoryProps) {
  return (
    <div className="card-interactive p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-stone-300">
        <div className="flex items-center gap-3">
          <History className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-semibold text-stone-800">Evolution Audit History</h3>
        </div>
        <span className="text-[11px] text-stone-600">Adaptive Feedback Record</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-300 text-stone-600 text-[10px] uppercase font-mono">
              <th className="pb-2.5 font-semibold">Time</th>
              <th className="pb-2.5 font-semibold">Behavior</th>
              <th className="pb-2.5 font-semibold">Previous</th>
              <th className="pb-2.5 font-semibold">Adapted</th>
              <th className="pb-2.5 font-semibold text-right">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y border-stone-300/50">
            {history.map((row, i) => (
              <tr key={i} className="table-row-hover">
                <td className="py-3 pr-4 font-mono text-amber-400 font-semibold whitespace-nowrap">{row.time}</td>
                <td className="py-3 pr-4 font-medium text-stone-400 whitespace-nowrap">{row.behavior}</td>
                <td className="py-3 pr-4 text-stone-600 line-through whitespace-nowrap">{row.oldStrategy}</td>
                <td className="py-3 pr-4 whitespace-nowrap"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium text-[11px]">{row.newStrategy}</span></td>
                <td className="py-3 text-right whitespace-nowrap"><span className="inline-flex items-center gap-1 font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 text-[11px]"><TrendingUp className="w-3 h-3" />{row.result}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
