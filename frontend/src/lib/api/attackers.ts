import { attackers, attackSessions } from '@/data/attackers';
import type { Attacker, AttackSession } from '@/types';

export async function getAttackers(): Promise<Attacker[]> {
  return attackers;
}

export async function getAttackerById(id: string): Promise<Attacker | undefined> {
  return attackers.find((a) => a.id === id);
}

export async function getAttackSessions(): Promise<AttackSession[]> {
  return attackSessions;
}

export async function getAttackSessionById(id: string): Promise<AttackSession | undefined> {
  return attackSessions.find((s) => s.id === id);
}
