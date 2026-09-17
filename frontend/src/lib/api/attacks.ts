// API service layer — currently returns mock data.
// Replace implementations with real fetch() calls when backend is ready.

import { dashboardStats, liveAttacks, behaviorTimeSeries, behaviorDistribution } from '@/data/attacks';
import type { Attack, DashboardStats, BehaviorTimeSeriesPoint, BehaviorDistribution } from '@/types';

export async function getDashboardStats(): Promise<DashboardStats> {
  // TODO: Replace with fetch('/api/dashboard/stats')
  return dashboardStats;
}

export async function getLiveAttacks(): Promise<Attack[]> {
  // TODO: Replace with fetch('/api/attacks/live')
  return liveAttacks;
}

export async function getBehaviorTimeSeries(period: string = '24H'): Promise<BehaviorTimeSeriesPoint[]> {
  // TODO: Replace with fetch(`/api/attacks/behavior-series?period=${period}`)
  void period;
  return behaviorTimeSeries;
}

export async function getBehaviorDistribution(): Promise<BehaviorDistribution[]> {
  // TODO: Replace with fetch('/api/attacks/behavior-distribution')
  return behaviorDistribution;
}
