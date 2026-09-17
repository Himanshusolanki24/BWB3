'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Settings, CheckCircle2, Sliders } from 'lucide-react';

export default function SettingsPage() {
  const [autoAdapt, setAutoAdapt] = useState(true);
  const [canarySensitivity, setCanarySensitivity] = useState(90);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Engine Configuration" subtitle="Configure autonomous deception heuristics and containment boundaries.">
        <button onClick={handleSave} className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-amber-500 text-stone-50 font-semibold text-xs hover:bg-amber-400 transition-colors shadow-sm">
          {saved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Sliders className="w-3.5 h-3.5" />}
          <span>{saved ? 'Applied' : 'Save Preferences'}</span>
        </button>
      </PageHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-interactive p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b-honey-border"><svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg><h3 className="text-sm font-bold text-stone-800">Autonomous Deception Policies</h3></div>
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <div><span className="font-semibold text-stone-800 block">Self-Evolving Auto-Adaptation</span><span className="text-[11px] text-stone-600">AI engine autonomously alters fake environments.</span></div>
              <input type="checkbox" checked={autoAdapt} onChange={(e) => setAutoAdapt(e.target.checked)} className="w-4 h-4 rounded accent-amber-500 cursor-pointer" />
            </div>
            <div className="space-y-1.5 pt-2 border-t-honey-border/50">
              <div className="flex items-center justify-between"><span className="font-semibold text-stone-800">Canary Sensitivity Threshold</span><span className="font-mono text-amber-400 font-bold">{canarySensitivity}%</span></div>
              <input type="range" min="50" max="99" value={canarySensitivity} onChange={(e) => setCanarySensitivity(Number(e.target.value))} className="w-full accent-amber-500 cursor-pointer" />
            </div>
            <div className="space-y-1.5 pt-2 border-t-honey-border/50">
              <span className="font-semibold text-stone-800 block">Sandbox Containment Level</span>
              <select className="w-full p-2 rounded bg-stone-200 border border-stone-300 text-xs text-stone-400"><option>Strict Sandbox (Zero Egress)</option><option>Controlled Egress (DNS Sinkhole)</option><option>Full Emulation (Air-gapped)</option></select>
            </div>
          </div>
        </div>
        <div className="card-interactive p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b-honey-border"><svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg><h3 className="text-sm font-bold text-stone-800">SOC & SIEM Telemetry</h3></div>
          <div className="space-y-3 text-xs">
            {[
              { name: 'Splunk / SIEM', status: 'Connected' },
              { name: 'CrowdStrike Falcon X', status: 'Connected' },
              { name: 'Slack SOC War Room', status: 'Active' },
            ].map((integration) => (
              <div key={integration.name} className="p-3 rounded-lg bg-stone-200/60 border border-stone-300/50 flex items-center justify-between">
                <div><span className="font-semibold text-stone-800 block">{integration.name}</span><span className="text-[10px] text-stone-600">Connected</span></div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono">{integration.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
