import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { RiskLevel } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRiskBgColor(risk: string): string {
  switch (risk) {
    case 'CRITICAL': return 'bg-signal-soft text-signal border-signal/25';
    case 'HIGH': return 'bg-ember-soft text-ember border-ember/25';
    case 'MEDIUM': return 'bg-lure-soft text-lure-ink border-lure/50';
    default: return 'bg-sunk text-graphite border-rule-strong';
  }
}

export const RISK_HEX: Record<RiskLevel, string> = {
  CRITICAL: '#D5331F',
  HIGH: '#C8620A',
  MEDIUM: '#E0B100',
  LOW: '#A7B7F2',
};

// Behaviors escalate from pale (looking around) to hot (payload on disk).
export const CHART = {
  ink: '#172048',
  graphite: '#4B5575',
  pencil: '#646D8A',
  rule: '#DCE1E9',
  lure: '#F6C90E',
  cobalt: '#2E55E6',
  periwinkle: '#A7B7F2',
  ember: '#C8620A',
  signal: '#D5331F',
  moss: '#0F7A55',
};

export const BEHAVIOR_SERIES = [
  { key: 'reconnaissance', name: 'Reconnaissance', color: CHART.periwinkle },
  { key: 'credentialAccess', name: 'Credential access', color: CHART.cobalt },
  { key: 'exploitation', name: 'Exploitation', color: CHART.ink },
  { key: 'persistence', name: 'Persistence', color: CHART.ember },
  { key: 'payloadDelivery', name: 'Payload delivery', color: CHART.signal },
] as const;

export const chartAxis = {
  stroke: CHART.pencil,
  fontSize: 11,
  tickLine: false,
  fontFamily: 'var(--font-plex-mono)',
} as const;
