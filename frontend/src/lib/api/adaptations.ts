import { adaptationEvents, evolutionState, evolutionHistory, deceptionFiles } from '@/data/adaptations';
import type { AdaptationEvent, EvolutionState, DeceptionFile } from '@/types';

export async function getEvolutionState(): Promise<EvolutionState> {
  return evolutionState;
}

export async function getAdaptationEvents(): Promise<AdaptationEvent[]> {
  return adaptationEvents;
}

export async function getEvolutionHistory() {
  return evolutionHistory;
}

export async function getDeceptionFiles(): Promise<DeceptionFile[]> {
  return deceptionFiles;
}
