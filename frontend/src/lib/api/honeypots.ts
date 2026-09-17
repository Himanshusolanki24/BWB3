import { honeypots } from '@/data/honeypots';
import type { Honeypot } from '@/types';

export async function getHoneypots(): Promise<Honeypot[]> {
  return honeypots;
}

export async function getHoneypotById(id: string): Promise<Honeypot | undefined> {
  return honeypots.find((h) => h.id === id);
}
