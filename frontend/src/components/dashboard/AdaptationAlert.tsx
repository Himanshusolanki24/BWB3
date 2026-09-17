'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X, ArrowRight, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export function AdaptationAlert() {
  const [isVisible, setIsVisible] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [alertData, setAlertData] = useState({
    behavior: 'Database Reconnaissance',
    previousDeception: 'Generic Linux Files',
    newDeception: 'Targeted Database Environment (MySQL/Dump Decoy)',
    confidence: 94,
    time: 'Just now',
  });

  const simulateNewAdaptation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setAlertData({
        behavior: 'Credential Dumping via /etc/shadow',
        previousDeception: 'Standard Linux Decoys',
        newDeception: 'Canary SSH Keys & Honeyhash Injections',
        confidence: 98,
        time: 'Just now',
      });
      setIsVisible(true);
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="w-full">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="mb-6 rounded-xl border border-amber-300 bg-gradient-to-r from-amber-50 via-white to-amber-50/60 p-5 backdrop-blur-sm relative overflow-hidden shadow-xs"
          >
            <div className="absolute top-0 left-0 bottom-0 w-[4px] bg-gradient-to-b from-amber-500 via-teal-500 to-amber-600" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="p-2.5 rounded-lg bg-amber-100 border border-amber-300 text-amber-700 shrink-0">
                  <Zap className="w-5 h-5 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black tracking-wider uppercase text-amber-800">
                      ⚡ ADAPTATION DETECTED
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-mono font-bold">
                      Confidence: {alertData.confidence}%
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                    <span className="text-stone-600 font-medium">
                      Behavior:{' '}
                      <strong className="text-stone-900 font-bold">
                        {alertData.behavior}
                      </strong>
                    </span>
                    <span className="text-stone-400 hidden sm:inline">|</span>
                    <span className="text-stone-600 font-medium">
                      Previous:{' '}
                      <span className="text-stone-400 line-through font-normal">
                        {alertData.previousDeception}
                      </span>
                    </span>
                    <span className="text-amber-600 font-bold">→</span>
                    <span className="text-stone-600 font-medium">
                      New:{' '}
                      <strong className="text-teal-700 font-bold">
                        {alertData.newDeception}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-stone-300 text-[11px] text-emerald-700 font-semibold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Environment Updated</span>
                </div>
                <Link
                  href="/deception-lab"
                  className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-colors shadow-sm"
                >
                  <span>Inspect Decoy</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={() => setIsVisible(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 transition-colors rounded-md hover:bg-stone-100 focus-ring"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!isVisible && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={simulateNewAdaptation}
            disabled={isSimulating}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-amber-700 px-3 py-1.5 rounded border border-stone-300 hover:border-amber-400 transition-all bg-white shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Simulating...' : 'Simulate Adaptation'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
