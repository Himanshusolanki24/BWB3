'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import type { BehaviorProfile } from '@/types';

interface BehaviorRadarProps {
  behaviors: BehaviorProfile[];
}

export function BehaviorRadar({ behaviors }: BehaviorRadarProps) {
  const getColor = (conf: number) => {
    if (conf >= 75) return 'from-amber-500 to-amber-400';
    if (conf >= 50) return 'from-blue-500 to-blue-400';
    if (conf >= 25) return 'from-orange-500 to-orange-400';
    return 'from-amber-500 to-amber-400';
  };

  return (
    <div className="card-interactive p-5 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-stone-300">
        <div className="flex items-center gap-3">
          <Brain className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-semibold text-stone-800">Behavior Classification Profile</h3>
        </div>
        <span className="text-[11px] text-stone-600">ML Confidence Score</span>
      </div>
      <div className="space-y-3.5">
        {behaviors.map((b, index) => (
          <div key={b.type} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-stone-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />{b.type}
              </span>
              <span className="font-mono font-bold text-amber-400">{b.confidence}%</span>
            </div>
            <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden border border-stone-300/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${b.confidence}%` }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                className={`h-full rounded-full bg-gradient-to-r ${getColor(b.confidence)}`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="pt-2 text-[11px] text-stone-600 flex items-center justify-between border-t-honey-border/50">
        <span>Model: Behavioral Heuristics v2.4</span>
        <span className="text-blue-400">Multi-stage Intent</span>
      </div>
    </div>
  );
}
