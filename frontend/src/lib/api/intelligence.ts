import { threatTechniques, threatIndicators, reports } from '@/data/intelligence';
import type { ThreatTechnique, ThreatIndicator, Report } from '@/types';

export async function getThreatTechniques(): Promise<ThreatTechnique[]> {
  return threatTechniques;
}

export async function getThreatIndicators(): Promise<ThreatIndicator[]> {
  return threatIndicators;
}

export async function getReports(): Promise<Report[]> {
  return reports;
}
