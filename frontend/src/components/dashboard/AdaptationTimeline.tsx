'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import type { AdaptationEvent } from '@/types';
import Link from 'next/link';

interface AdaptationTimelineProps {
  events: AdaptationEvent[];
}

export function AdaptationTimeline({ events }: AdaptationTimelineProps) {
  return (
    <div className="card-interactive p-5 flex flex-col h-full bg-white border border-stone-200 shadow-xs">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-50 border border-amber-200">
            <Zap className="w-4 h-4 text-amber-700" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 tracking-wide">
              Recent Adaptations
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              Autonomous deception shifts triggered by intent analysis
            </p>
          </div>
        </div>
        <Link
          href="/evolution"
          className="text-xs text-amber-800 hover:text-amber-900 flex items-center gap-1 font-bold"
        >
          <span>All Events</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-amber-400 before:via-teal-400 before:to-stone-300">
        {events.slice(0, 5).map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            className="relative group"
          >
            <span className="absolute -left-6 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-amber-500 text-amber-600 group-hover:scale-110 transition-transform shadow-xs">
              {index === 0 ? (
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
              )}
            </span>
            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 hover:border-stone-300 transition-all shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-mono text-[11px] text-amber-800 font-bold">
                  {event.timestamp}
                </span>
                {event.confidence && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-mono font-bold">
                    {event.confidence}% conf
                  </span>
                )}
              </div>
              <p className="text-xs font-bold text-stone-900">{event.behavior}</p>
              <div className="mt-1.5 text-[11px] flex flex-wrap items-center gap-1.5">
                <span className="text-stone-500 line-through">
                  {event.previousStrategy}
                </span>
                <span className="text-amber-700 font-bold">→</span>
                <span className="text-teal-700 font-bold">
                  {event.newStrategy}
                </span>
              </div>
              {event.result && (
                <div className="mt-2 pt-2 border-t border-stone-200 flex items-center justify-between text-[11px]">
                  <span className="text-stone-500 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Impact:
                  </span>
                  <span className="text-emerald-700 font-mono font-bold">
                    {event.result}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
