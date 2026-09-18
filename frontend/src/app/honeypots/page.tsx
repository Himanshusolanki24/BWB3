'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { HoneypotHealthOverview } from '@/components/honeypots/HoneypotHealth';
import { HoneypotCard } from '@/components/honeypots/HoneypotCard';
import { honeypots as initialHoneypots } from '@/data/honeypots';
import { Plus } from 'lucide-react';
import type { Honeypot } from '@/types';

export default function HoneypotsPage() {
  const [nodes, setNodes] = useState<Honeypot[]>(initialHoneypots);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isDeploying, setIsDeploying] = useState(false);
  const filteredNodes = nodes.filter((h) => statusFilter === 'ALL' || h.status === statusFilter);

  const handleDeploySensor = () => {
    setIsDeploying(true);
    setTimeout(() => {
      const newNode: Honeypot = { id: `hny-${Date.now()}`, name: 'K8S-HNY-NEW', type: 'Kubernetes API', protocol: 'HTTPS', status: 'ACTIVE', location: 'Sandbox Cluster C', currentSessions: 0, totalDecoys: 9, health: 100, uptime: '0d 0h 01m', lastActivity: 'Just now', attacksDetected: 0 };
      setNodes((prev) => [newNode, ...prev]);
      setIsDeploying(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Honeypots" subtitle="Your decoy machines. A yellow edge means an attacker is inside right now.">
        <button onClick={handleDeploySensor} disabled={isDeploying} className="btn btn-primary">
          <Plus className="h-3.5 w-3.5" />
          {isDeploying ? 'Deploying' : 'Deploy a decoy node'}
        </button>
      </PageHeader>
      <HoneypotHealthOverview honeypots={nodes} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-[15px] font-semibold text-ink">Nodes</h2>
        <div className="seg" role="group" aria-label="Filter by status">
          {['ALL', 'ACTIVE', 'DEPLOYING', 'IDLE'].map((s) => (
            <button key={s} className="capitalize" aria-pressed={statusFilter === s} onClick={() => setStatusFilter(s)}>
              {s.toLowerCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredNodes.map((h) => <HoneypotCard key={h.id} honeypot={h} />)}
      </div>
    </div>
  );
}
