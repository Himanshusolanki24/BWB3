'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { reports as initialReports } from '@/data/intelligence';
import { FileText, Download, Eye, Plus, X, CheckCircle2 } from 'lucide-react';
import type { Report } from '@/types';

export default function ReportsPage() {
  const [reportsList, setReportsList] = useState<Report[]>(initialReports);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newRpt: Report = { id: `rpt-${reportsList.length + 1}`, title: 'Real-Time Attacker Session Recon', type: 'incident', description: 'Comprehensive forensic reconstruction of attack sessions.', generatedAt: new Date().toISOString(), status: 'ready', size: '3.1 MB' };
      setReportsList((prev) => [newRpt, ...prev]);
      setIsGenerating(false);
    }, 900);
  };

  const handleExport = (report: Report) => {
    setExportNotice(`Exported ${report.title}`);
    setTimeout(() => setExportNotice(null), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Security Reports" subtitle="Forensic incident timelines and evolution analytics.">
        <button onClick={handleGenerate} disabled={isGenerating} className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500 text-stone-50 font-semibold text-xs hover:bg-amber-400 transition-colors shadow-sm disabled:opacity-50">
          <Plus className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
          <span>{isGenerating ? 'Compiling...' : 'Generate Report'}</span>
        </button>
      </PageHeader>
      {exportNotice && <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs flex items-center justify-between"><span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />{exportNotice}</span><button onClick={() => setExportNotice(null)}><X className="w-3.5 h-3.5" /></button></div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportsList.map((rpt) => (
          <div key={rpt.id} className="card-interactive p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="p-2 rounded-lg bg-stone-200 border border-stone-300 text-blue-400"><FileText className="w-4 h-4" /></div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${rpt.status === 'ready' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>{rpt.status}</span>
              </div>
              <h3 className="text-sm font-bold text-stone-800">{rpt.title}</h3>
              <p className="text-xs text-stone-600 mt-1 line-clamp-3">{rpt.description}</p>
            </div>
            <div className="space-y-3 pt-3 border-t-honey-border">
              <div className="flex items-center justify-between text-[11px] text-stone-600"><span>Generated: {rpt.generatedAt.split('T')[0]}</span><span className="font-mono">{rpt.size || 'Pending'}</span></div>
              <div className="flex items-center gap-2 pt-1">
                <button onClick={() => setSelectedReport(rpt)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-stone-200 hover:bg-stone-300 text-stone-400 text-xs transition-colors border border-stone-300"><Eye className="w-3.5 h-3.5 text-blue-400" /><span>View</span></button>
                <button onClick={() => handleExport(rpt)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs transition-colors border border-amber-500/20"><Download className="w-3.5 h-3.5" /><span>Export</span></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
