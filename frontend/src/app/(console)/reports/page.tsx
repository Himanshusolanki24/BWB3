'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { reports as initialReports } from '@/data/intelligence';
import { Plus, X, Check } from 'lucide-react';
import type { Report } from '@/types';
import { cn } from '@/lib/utils';

export default function ReportsPage() {
  const [reportsList, setReportsList] = useState<Report[]>(initialReports);
  const [isGenerating, setIsGenerating] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newRpt: Report = { id: `rpt-${Date.now()}`, title: 'Real-time attacker session reconstruction', type: 'incident', description: 'Forensic reconstruction of every open attack session, command by command.', generatedAt: new Date().toISOString(), status: 'ready', size: '3.1 MB' };
      setReportsList((prev) => [newRpt, ...prev]);
      setIsGenerating(false);
      setNotice(`Generated ${newRpt.title}`);
    }, 900);
  };

  const handleExport = (report: Report) => {
    setNotice(`Exported ${report.title}`);
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Reports" subtitle="Incident timelines and evolution summaries you can hand to your team.">
        <button onClick={handleGenerate} disabled={isGenerating} className="btn btn-primary">
          <Plus className="h-3.5 w-3.5" />
          {isGenerating ? 'Generating' : 'Generate report'}
        </button>
      </PageHeader>

      {notice && (
        <div className="flex items-center justify-between rounded-lg border border-moss/30 bg-moss-soft px-4 py-2.5 text-sm text-moss" role="status">
          <span className="flex items-center gap-2 font-semibold"><Check className="h-4 w-4" />{notice}</span>
          <button onClick={() => setNotice(null)} aria-label="Dismiss" className="rounded p-1 hover:bg-sheet"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}

      <div className="sheet divide-y divide-rule">
        {reportsList.map((r) => (
          <article key={r.id} className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center">
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[15px] font-semibold text-ink">{r.title}</h3>
                <span className="rounded bg-sunk px-1.5 py-px text-xs capitalize text-graphite ring-1 ring-rule">{r.type}</span>
              </div>
              <p className="mt-0.5 max-w-[80ch] text-[13px] text-graphite">{r.description}</p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <span className="w-24 text-xs tabular-nums text-pencil">{r.generatedAt.split('T')[0]}</span>
              <span className="w-16 text-xs tabular-nums text-pencil">{r.size || '—'}</span>
              <span className={cn('w-20 text-xs font-semibold capitalize', r.status === 'ready' ? 'text-moss' : 'text-ember')}>{r.status}</span>
              <button onClick={() => handleExport(r)} disabled={r.status !== 'ready'} className="btn">Export</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
