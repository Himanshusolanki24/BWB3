import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRiskColor(risk: string): string {
  switch (risk) {
    case 'CRITICAL': return 'text-red-400';
    case 'HIGH': return 'text-orange-400';
    case 'MEDIUM': return 'text-amber-400';
    case 'LOW': return 'text-amber-400';
    default: return 'text-stone-600';
  }
}

export function getRiskBgColor(risk: string): string {
  switch (risk) {
    case 'CRITICAL': return 'bg-red-500/10 text-red-400 border-red-500/20';
    case 'HIGH': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    case 'MEDIUM': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    case 'LOW': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    default: return 'bg-slate-500/10 text-stone-600 border-slate-500/20';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'ACTIVE': return 'text-amber-400';
    case 'IDLE': return 'text-stone-600';
    case 'DEPLOYING': return 'text-blue-400';
    case 'MAINTENANCE': return 'text-amber-400';
    case 'MONITORING': return 'text-blue-400';
    case 'ENDED': return 'text-stone-600';
    case 'BLOCKED': return 'text-red-400';
    default: return 'text-stone-600';
  }
}

export function getStatusDotColor(status: string): string {
  switch (status) {
    case 'ACTIVE': return 'bg-amber-400';
    case 'IDLE': return 'bg-slate-400';
    case 'DEPLOYING': return 'bg-blue-400';
    case 'MAINTENANCE': return 'bg-amber-400';
    case 'MONITORING': return 'bg-blue-400';
    default: return 'bg-slate-400';
  }
}
