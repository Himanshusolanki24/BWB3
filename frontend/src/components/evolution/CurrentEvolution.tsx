'use client';

import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Database, FileText, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function CurrentEvolution() {
  return (
    <div className="card-accent p-6 border-amber-500/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-300">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400">
            <Zap className="w-5 h-5" style={{ animation: 'pulse-glow 2s ease-in-out infinite' }} />
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-800">Active Strategy & Adaptation Profile</h3>
            <p className="text-xs text-stone-600">Real-time deception matrix</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">Confidence: 94%</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 text-xs">
          <div className="p-3 rounded-lg bg-stone-200/60 border border-stone-300">
            <span className="text-[10px] text-stone-600 uppercase font-bold tracking-wider block mb-1">Trigger Behavior</span>
            <div className="text-sm font-semibold text-stone-800">&ldquo;Database reconnaissance&rdquo;</div>
            <p className="text-[11px] text-stone-600 mt-1">Triggered after repeated database-related path access.</p>
          </div>
          <div className="p-3.5 rounded-lg bg-stone-200/60 border border-stone-300 space-y-2">
            <span className="text-[10px] text-stone-600 uppercase font-bold tracking-wider block">Autonomous Strategy Shift</span>
            <div className="flex items-center justify-between gap-2 text-xs">
              <div><div className="text-[10px] text-stone-600">Previous</div><div className="font-semibold text-stone-600 line-through">Generic Linux decoys</div></div>
              <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
              <div><div className="text-[10px] text-stone-600">New</div><div className="font-semibold text-blue-400">Database-focused deception</div></div>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-stone-200/60 border border-stone-300 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">Dynamically Generated Decoys</span>
            <span className="text-[10px] text-amber-400 font-mono">3 synthetic assets deployed</span>
          </div>
          <div className="space-y-2 text-xs">
            {[
              { name: 'database.conf', icon: FileText, desc: 'Synthetic DB Credential Trap' },
              { name: 'backup.sql', icon: Database, desc: 'Mock 2.1MB PII schema dump' },
              { name: 'db_credentials.txt', icon: Lock, desc: 'Honeyhash & Canary tokens' },
            ].map((decoy) => (
              <div key={decoy.name} className="flex items-center justify-between p-2 rounded bg-stone-100 border border-stone-300 font-mono">
                <div className="flex items-center gap-2">
                  <decoy.icon className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-stone-400">{decoy.name}</span>
                </div>
                <span className="text-[10px] text-stone-600">{decoy.desc}</span>
              </div>
            ))}
          </div>
          <div className="pt-2 text-right">
            <Link href="/deception-lab" className="text-xs text-amber-400 hover:amber-400-300 font-semibold">Open in Deception Lab →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
