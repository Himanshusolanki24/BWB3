'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Panel } from '@/components/ui';

export default function SettingsPage() {
  const [autoAdapt, setAutoAdapt] = useState(true);
  const [sensitivity, setSensitivity] = useState(90);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Control how far the engine can change decoys on its own, and where alerts go.">
        <button onClick={handleSave} className="btn btn-primary">
          {saved && <Check className="h-3.5 w-3.5" />}
          {saved ? 'Saved' : 'Save changes'}
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Panel title="Deception policy" bodyClassName="divide-y divide-rule p-0">
          <label className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4">
            <span>
              <span className="block text-sm font-semibold text-ink">Adapt decoys automatically</span>
              <span className="text-[13px] text-graphite">Let the engine swap decoys without asking.</span>
            </span>
            <input type="checkbox" role="switch" checked={autoAdapt} onChange={(e) => setAutoAdapt(e.target.checked)} className="peer sr-only" />
            <span className="relative h-6 w-10 shrink-0 rounded-full bg-rule-strong transition-colors peer-checked:bg-ink peer-focus-visible:ring-2 peer-focus-visible:ring-cobalt peer-focus-visible:ring-offset-2 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-sheet after:transition-transform peer-checked:after:translate-x-4 peer-checked:after:bg-lure" />
          </label>
          <div className="px-5 py-4">
            <div className="flex items-center justify-between">
              <label htmlFor="sens" className="text-sm font-semibold text-ink">Canary sensitivity</label>
              <span className="text-sm font-semibold tabular-nums text-ink">{sensitivity}%</span>
            </div>
            <p className="text-[13px] text-graphite">Higher values alert on fainter signs of a token being used.</p>
            <input id="sens" type="range" min="50" max="99" value={sensitivity} onChange={(e) => setSensitivity(Number(e.target.value))} className="mt-3 w-full accent-ink" />
          </div>
          <div className="px-5 py-4">
            <label htmlFor="contain" className="text-sm font-semibold text-ink">Containment</label>
            <p className="mb-2 text-[13px] text-graphite">What traffic may leave a decoy.</p>
            <select id="contain" className="field">
              <option>Strict sandbox, no egress</option>
              <option>Controlled egress through a DNS sinkhole</option>
              <option>Full emulation, air-gapped</option>
            </select>
          </div>
        </Panel>

        <Panel title="Alert destinations" note="Where the engine sends detections" bodyClassName="divide-y divide-rule p-0">
          {['Splunk SIEM', 'CrowdStrike Falcon X', 'Slack #soc-war-room'].map((name) => (
            <div key={name} className="flex items-center justify-between px-5 py-4">
              <span className="text-sm font-semibold text-ink">{name}</span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-moss">
                <span className="h-[7px] w-[7px] rounded-full bg-moss" />
                Connected
              </span>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  );
}
