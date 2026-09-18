'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Panel, Tag } from '@/components/ui';
import { FileText, Database, Lock, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

type TabId = 'files' | 'credentials' | 'services' | 'network' | 'web';

const tabs: { id: TabId; label: string }[] = [
  { id: 'files', label: 'Files' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'services', label: 'Services' },
  { id: 'network', label: 'Network' },
  { id: 'web', label: 'Web traps' },
];

const files = [
  { name: 'backup.sh', icon: FileText, reason: 'Script decoy', content: '#!/bin/bash\n# nightly backup\nmysqldump -u app_admin -p"$DB_PASS" production_orders > /var/backups/orders.sql' },
  {
    name: 'database.conf',
    icon: Database,
    reason: 'Planted because the attacker showed interest in databases',
    content: '[database]\nhost = 10.0.1.50\nport = 3306\nuser = app_admin\npassword = {{HONEYTOKEN_CANARY_DB_PASS}}\ndbname = production_orders',
  },
  { name: 'passwords.txt', icon: Lock, reason: 'Credential harvesting bait', content: 'vpn: j.miller / {{CANARY_VPN}}\njira: admin / {{CANARY_JIRA}}' },
  { name: 'employee_data.csv', icon: FileText, reason: 'Personal-data canary', content: 'id,name,email,ssn\n1041,Dana Ruiz,d.ruiz@corp.example,{{CANARY_SSN}}' },
];

export default function DeceptionLabPage() {
  const [tab, setTab] = useState<TabId>('files');
  const [fileName, setFileName] = useState('database.conf');
  const file = files.find((f) => f.name === fileName) || files[1];

  return (
    <div className="space-y-6">
      <PageHeader title="Deception lab" subtitle="The fake environment the attacker sees. Everything here is synthetic and carries a tracking beacon.">
        <span className="flex items-center gap-2 text-[13px] text-graphite">
          <ShieldCheck className="h-4 w-4 text-moss" />
          No real credentials exposed
        </span>
      </PageHeader>

      <div className="flex gap-6 overflow-x-auto border-b border-rule" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              '-mb-px whitespace-nowrap border-b-[3px] pb-2.5 text-sm transition-colors',
              tab === t.id ? 'border-lure font-semibold text-ink' : 'border-transparent text-graphite hover:text-ink'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'files' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Panel className="lg:col-span-4" title="/home/admin" note="Seeded automatically for this attacker" bodyClassName="px-3 pb-3 pt-3">
            <ul className="space-y-0.5">
              {files.map((f) => (
                <li key={f.name}>
                  <button
                    onClick={() => setFileName(f.name)}
                    aria-pressed={fileName === f.name}
                    className={cn(
                      'flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left font-mono text-[13px]',
                      fileName === f.name ? 'bg-lure-soft text-ink' : 'text-graphite hover:bg-sunk hover:text-ink'
                    )}
                  >
                    <f.icon className="h-4 w-4 shrink-0 text-pencil" />
                    <span className="truncate">{f.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel
            className="lg:col-span-8"
            title={<span className="font-mono">/home/admin/{file.name}</span>}
            note={file.reason}
            action={<span className="text-xs font-semibold text-moss">Beacon armed</span>}
          >
            <pre className="overflow-x-auto rounded-md border border-rule bg-sunk p-4 font-mono text-[13px] leading-relaxed text-ink">
              {file.content.split(/(\{\{[A-Z_]+\}\})/).map((part, i) =>
                part.startsWith('{{') ? <span key={i} className="mark">{part}</span> : part
              )}
            </pre>
            <p className="mt-3 text-xs text-pencil">Highlighted values are canary tokens. Using one alerts the SOC and identifies the attacker.</p>
          </Panel>
        </div>
      )}

      {tab === 'credentials' && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {[
            { name: 'AWS_ACCESS_KEY_ID', value: 'AKIAIOSFODNN7EXAMPLE' },
            { name: 'MYSQL_ROOT_HASH', value: '$6$salt$canary_hash_beacon' },
            { name: 'SSH_PRIVATE_KEY', value: 'id_rsa, 4096-bit, beaconed' },
          ].map((c) => (
            <article key={c.name} className="sheet p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[13px] font-semibold text-ink">{c.name}</span>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-moss"><span className="live-dot" />Live</span>
              </div>
              <p className="mt-3 truncate rounded bg-sunk px-2.5 py-1.5 font-mono text-xs text-graphite">{c.value}</p>
            </article>
          ))}
        </div>
      )}

      {tab === 'services' && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { port: 22, name: 'OpenSSH 8.9p1', hits: 142 },
            { port: 80, name: 'Apache httpd 2.4.52', hits: 89 },
            { port: 3306, name: 'MySQL Community 8.0.32', hits: 48 },
            { port: 6379, name: 'Redis Server 7.0.5', hits: 26 },
          ].map((s) => (
            <article key={s.port} className="sheet p-5">
              <p className="font-mono text-2xl font-semibold text-ink">:{s.port}</p>
              <p className="mt-1 text-sm text-graphite">{s.name}</p>
              <p className="mt-4 text-xs text-pencil"><span className="font-semibold text-ink">{s.hits}</span> probes captured</p>
            </article>
          ))}
        </div>
      )}

      {tab === 'network' && (
        <Panel title="Fake network" note="What an attacker sees when they scan from inside a decoy">
          <div className="space-y-5 font-mono text-[13px]">
            <div>
              <p className="font-semibold text-ink">10.0.1.0/24 <span className="font-sans font-normal text-pencil">DMZ decoy subnet</span></p>
              <ul className="mt-2 space-y-1.5 border-l border-rule-strong pl-4 text-graphite">
                <li>10.0.1.10 <Tag className="ml-2">SSH-HNY-01</Tag> <span className="font-sans text-pencil">Linux decoy</span></li>
                <li>10.0.1.50 <Tag className="ml-2">DB-HNY-01</Tag> <span className="font-sans text-pencil">database decoy</span></li>
              </ul>
            </div>
            <p className="font-semibold text-ink">10.0.2.0/24 <span className="font-sans font-normal text-pencil">synthetic enterprise, air-gapped</span></p>
          </div>
        </Panel>
      )}

      {tab === 'web' && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {[
            { path: '/admin/portal', kind: 'SSO login trap', desc: 'Logs username lists and password-spraying attempts.', stat: '400+ brute-force payloads today' },
            { path: '/api/v1/customers/export', kind: 'Data export trap', desc: 'Serves a generated CSV seeded with canary tokens.', stat: 'Every download reported' },
          ].map((w) => (
            <article key={w.path} className="sheet p-5">
              <p className="font-mono text-[15px] font-semibold text-ink">{w.path}</p>
              <p className="mt-0.5 text-xs text-pencil">{w.kind}</p>
              <p className="mt-3 text-sm text-graphite">{w.desc}</p>
              <p className="mt-4 border-t border-rule pt-3 text-xs font-semibold text-ink">{w.stat}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
