'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { HoneypotHealthOverview } from '@/components/honeypots/HoneypotHealth';
import { HoneypotCard } from '@/components/honeypots/HoneypotCard';
import { honeypots as initialHoneypots } from '@/data/honeypots';
import { Server, Plus } from 'lucide-react';
import type { Honeypot } from '@/types';

export default function HoneypotsPage() {
  const [nodes, setNodes] = useState<Honeypot[]>(initialHoneypots);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isDeploying, setIsDeploying] = useState(false);
  const filteredNodes = nodes.filter((h) => statusFilter === 'ALL' || h.status === statusFilter);

  const handleDeploySensor = () => {
    setIsDeploying(true);
    setTimeout(() => {
      const newNode: Honeypot = { id: 'hny-new', name: 'K8S-HNY-NEW', type: 'Kubernetes API', protocol: 'HTTPS', status: 'ACTIVE', location: 'Sandbox Cluster C', currentSessions: 0, totalDecoys: 9, health: 100, uptime: '0d 0h 01m', lastActivity: 'Just now', attacksDetected: 0 };
      setNodes((prev) => [newNode, ...prev]);
      setIsDeploying(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Honeypot Infrastructure" subtitle="Manage distributed deception clusters and synthetic decoy targets.">
        <button onClick={handleDeploySensor} disabled={isDeploying} className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-amber-500 text-stone-50 font-semibold text-xs hover:bg-amber-400 transition-colors shadow-sm disabled:opacity-50">
          <Plus className="w-3.5 h-3.5" />{isDeploying ? 'Deploying...' : 'Deploy Decoy Node'}
        </button>
      </PageHeader>
      <HoneypotHealthOverview honeypots={nodes} />
      <div className="flex items-center gap-2 p-3 rounded-xl bg-stone-200/50 border border-stone-300">
        <span className="text-xs text-stone-600 font-medium">Filter:</span>
        <div className="flex items-center gap-1">
          {['ALL', 'ACTIVE', 'DEPLOYING', 'IDLE'].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${statusFilter === s ? 'bg-amber-500/20 text-amber-400 font-semibold border border-amber-500/30' : 'text-stone-600 hover:text-stone-700'}`}>{s}</button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNodes.map((h, i) => <HoneypotCard key={h.id} honeypot={h} index={i} />)}
      </div>
    </div>
  );
}
