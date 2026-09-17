'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, ArrowDown } from 'lucide-react';
import type { AttackChainStep } from '@/types';

interface AttackChainProps {
  steps: AttackChainStep[];
}

export function AttackChain({ steps }: AttackChainProps) {
  return (
    <div className="card-interactive p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-stone-300">
        <div className="flex items-center gap-3">
          <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          <h3 className="text-sm font-semibold text-stone-800">Attack Progression Chain</h3>
        </div>
        <span className="text-[11px] text-stone-600">Cyber Kill Chain</span>
      </div>
      <div className="flex flex-col items-center max-w-md mx-auto py-2">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <div key={step.stage} className="w-full flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-all ${
                  step.active ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                  step.completed ? 'bg-stone-200 border-stone-300 text-stone-400' :
                  'bg-transparent border-stone-300/40 text-stone-600 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  {step.completed ? (
                    <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4" /></div>
                  ) : step.active ? (
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-stone-50 flex items-center justify-center shrink-0 font-bold text-xs animate-pulse">●</div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-stone-200 border border-stone-300 text-stone-600 flex items-center justify-center shrink-0 text-xs">{index + 1}</div>
                  )}
                  <div>
                    <span className="text-xs font-bold tracking-wide block">{step.stage}</span>
                    {step.timestamp && <span className="text-[10px] text-stone-600 font-mono">Logged at {step.timestamp}</span>}
                  </div>
                </div>
                <div>
                  {step.active && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold uppercase tracking-wider border border-amber-500/40 animate-pulse">CURRENT</span>}
                  {step.completed && <span className="text-[10px] text-stone-600">Executed</span>}
                  {!step.active && !step.completed && <span className="text-[10px] text-stone-600 italic">Anticipated</span>}
                </div>
              </motion.div>
              {!isLast && (
                <div className="py-2 flex flex-col items-center text-stone-500">
                  <ArrowDown className="w-4 h-4 text-stone-600" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
