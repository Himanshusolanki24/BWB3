'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import type { EvolutionStage } from '@/types';

const stages: { id: EvolutionStage; label: string; description: string }[] = [
  { id: 'OBSERVE', label: 'OBSERVE', description: 'Collect attacker actions' },
  { id: 'ANALYZE', label: 'ANALYZE', description: 'Identify behavior and intent' },
  { id: 'ADAPT', label: 'ADAPT', description: 'Select deception strategy' },
  { id: 'DECEIVE', label: 'DECEIVE', description: 'Deploy new decoys' },
  { id: 'LEARN', label: 'LEARN', description: 'Measure attacker response' },
  { id: 'EVOLVE', label: 'EVOLVE', description: 'Improve future strategies' },
];

export function EvolutionEngine() {
  const [activeStage, setActiveStage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const advance = useCallback(() => {
    if (!isPaused) {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }
  }, [isPaused]);

  useEffect(() => {
    const interval = setInterval(advance, 3000);
    return () => clearInterval(interval);
  }, [advance]);

  const currentStage = stages[activeStage];
  const radius = 120;
  const centerX = 160;
  const centerY = 160;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card-interactive p-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-bold text-stone-900">Self-Evolving Deception Engine</h2>
          <p className="text-xs font-medium text-stone-500 mt-0.5">Autonomous adaptive response cycle</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300">
          <div className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
          <span className="text-[11px] font-bold text-amber-800">LIVE CYCLE</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Circular visualization with clean outer ring and no internal chords/dotted lines */}
        <div className="relative shrink-0">
          <svg width="320" height="320" viewBox="0 0 320 320" className="drop-shadow-sm">
            {/* Background circular track */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="#E7E0D8"
              strokeWidth="2.5"
            />

            {/* Active animated progress arc along the circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="url(#evolutionGradient)"
              strokeWidth="3.5"
              strokeDasharray={`${(2 * Math.PI * radius) / 6} ${(2 * Math.PI * radius * 5) / 6}`}
              strokeDashoffset={-(2 * Math.PI * radius * activeStage) / 6 + (2 * Math.PI * radius) / 4}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.6s ease' }}
            />

            <defs>
              <linearGradient id="evolutionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#0D9488" />
              </linearGradient>
            </defs>

            {/* Stage nodes with high contrast colors */}
            {stages.map((stage, i) => {
              const angle = (i * 360) / stages.length - 90;
              const rad = (angle * Math.PI) / 180;
              const x = centerX + radius * Math.cos(rad);
              const y = centerY + radius * Math.sin(rad);
              const isActive = i === activeStage;
              const isPast = i < activeStage;

              return (
                <g key={stage.id} className="cursor-pointer" onClick={() => setActiveStage(i)}>
                  {/* Outer pulse ring for active node */}
                  {isActive && (
                    <circle
                      cx={x}
                      cy={y}
                      r={28}
                      fill="none"
                      stroke="rgba(217, 119, 6, 0.3)"
                      strokeWidth="1.5"
                      className="animate-ping"
                    />
                  )}

                  {/* Node circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isActive ? 24 : 19}
                    fill={isActive ? '#FEF3C7' : isPast ? '#F5F0EB' : '#FFFFFF'}
                    stroke={isActive ? '#D97706' : isPast ? '#B45309' : '#D6CDC4'}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    style={{ transition: 'all 0.3s ease' }}
                  />

                  {/* Node label */}
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={isActive ? 9.5 : 8.5}
                    fontWeight={isActive ? 800 : 600}
                    fill={isActive ? '#92400E' : isPast ? '#78350F' : '#44403C'}
                    fontFamily="Inter, sans-serif"
                    letterSpacing="0.04em"
                    style={{ transition: 'fill 0.3s ease' }}
                  >
                    {stage.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Center text in the circle with rich high-contrast colors */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.2 }}
                className="text-center px-4"
              >
                <p className="text-xl font-black text-amber-600 tracking-wider">
                  {currentStage.label}
                </p>
                <p className="text-xs font-semibold text-stone-600 mt-1 max-w-[130px] leading-snug">
                  {currentStage.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right side info panel with high-contrast text */}
        <div className="flex-1 space-y-4 w-full">
          <div className="p-4 rounded-xl bg-stone-100 border border-stone-200/80">
            <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-1">
              Current Strategy
            </p>
            <p className="text-sm font-bold text-stone-900">
              Database-Focused Deception
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-100 border border-stone-200/80">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                Confidence
              </p>
              <p className="text-sm font-black text-amber-700 font-mono">
                94%
              </p>
            </div>
            <div className="w-full h-2 rounded-full bg-stone-200 overflow-hidden border border-stone-300/40">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 to-teal-600"
                initial={{ width: 0 }}
                animate={{ width: '94%' }}
                transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Adaptation notification card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="p-4 rounded-xl border border-amber-300 bg-amber-50/80 shadow-xs"
          >
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-amber-700" />
              <p className="text-xs font-extrabold text-amber-800 tracking-wide uppercase">
                ADAPTATION DETECTED
              </p>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-600 font-medium">Behavior</span>
                <span className="text-stone-900 font-bold">Database Recon</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600 font-medium">Previous</span>
                <span className="text-stone-400 line-through">Generic Files</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600 font-medium">New</span>
                <span className="text-teal-700 font-bold">Database Environment</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-amber-200/80">
                <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-stone-700 text-[11px] font-semibold">
                  Environment updated
                </span>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center gap-4 text-xs font-semibold text-stone-500">
            <span>Cycle #47</span>
            <span>•</span>
            <span>Running for 2h 14m</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
