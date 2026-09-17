// ============================================
// Honeypot — Self-Evolving Honeypot
// Core TypeScript Interfaces
// ============================================

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type BehaviorType =
  | 'Reconnaissance'
  | 'Credential Access'
  | 'Exploitation'
  | 'Persistence'
  | 'Payload Delivery'
  | 'Brute Force'
  | 'Lateral Movement'
  | 'Data Exfiltration'
  | 'Privilege Escalation';

export type EvolutionStage =
  | 'OBSERVE'
  | 'ANALYZE'
  | 'ADAPT'
  | 'DECEIVE'
  | 'LEARN'
  | 'EVOLVE';

export type HoneypotStatus = 'ACTIVE' | 'IDLE' | 'DEPLOYING' | 'MAINTENANCE';

export type AttackSessionStatus = 'ACTIVE' | 'MONITORING' | 'ENDED' | 'BLOCKED';

export interface Attack {
  id: string;
  timestamp: string;
  sourceIP: string;
  honeypot: string;
  action: string;
  behavior: BehaviorType;
  risk: RiskLevel;
  sessionId: string;
}

export interface Attacker {
  id: string;
  sourceIP: string;
  protocol: string;
  firstSeen: string;
  lastSeen: string;
  sessionDuration: string;
  risk: RiskLevel;
  behaviors: BehaviorProfile[];
  attackChain: AttackChainStep[];
  commandHistory: TerminalCommand[];
  totalSessions: number;
  country?: string;
  asn?: string;
}

export interface BehaviorProfile {
  type: BehaviorType;
  confidence: number;
}

export interface AttackChainStep {
  stage: string;
  timestamp: string;
  active: boolean;
  completed: boolean;
}

export interface TerminalCommand {
  timestamp: string;
  command: string;
  output: string;
  flagged: boolean;
}

export interface AttackSession {
  id: string;
  attackerId: string;
  honeypot: string;
  protocol: string;
  startTime: string;
  duration: string;
  status: AttackSessionStatus;
  risk: RiskLevel;
  behaviors: BehaviorType[];
  commandCount: number;
}

export interface Honeypot {
  id: string;
  name: string;
  type: string;
  status: HoneypotStatus;
  location: string;
  currentSessions: number;
  totalDecoys: number;
  health: number;
  uptime: string;
  lastActivity: string;
  attacksDetected: number;
  protocol: string;
}

export interface AdaptationEvent {
  id: string;
  timestamp: string;
  behavior: string;
  previousStrategy: string;
  newStrategy: string;
  confidence: number;
  result?: string;
  generatedDecoys?: string[];
  reason?: string;
}

export interface EvolutionState {
  currentStage: EvolutionStage;
  currentBehavior: string;
  currentStrategy: string;
  confidence: number;
  isActive: boolean;
  cycleCount: number;
}

export interface ThreatIndicator {
  id: string;
  type: 'IP' | 'Hash' | 'Domain' | 'URL' | 'Command' | 'Pattern';
  value: string;
  severity: RiskLevel;
  firstSeen: string;
  lastSeen: string;
  occurrences: number;
  relatedAttackers: string[];
}

export interface ThreatTechnique {
  id: string;
  mitreId: string;
  name: string;
  tactic: string;
  description: string;
  severity: RiskLevel;
  frequency: number;
  lastObserved: string;
  attackers: string[];
}

export interface Report {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly' | 'incident' | 'evolution' | 'performance';
  description: string;
  generatedAt: string;
  status: 'ready' | 'generating' | 'scheduled';
  size?: string;
}

export interface SystemHealth {
  status: 'operational' | 'degraded' | 'outage';
  uptime: string;
  cpuUsage: number;
  memoryUsage: number;
  activeHoneypots: number;
  totalHoneypots: number;
}

export interface DashboardStats {
  activeSessions: { value: number; trend: number; label: string };
  attacksDetected: { value: number; trend: number; label: string };
  uniqueAttackers: { value: number; trend: number; label: string };
  decoysGenerated: { value: number; trend: number; label: string };
  avgEngagement: { value: string; trend: number; label: string };
}

export interface BehaviorTimeSeriesPoint {
  time: string;
  reconnaissance: number;
  credentialAccess: number;
  exploitation: number;
  persistence: number;
  payloadDelivery: number;
}

export interface BehaviorDistribution {
  name: string;
  value: number;
  color: string;
}

export interface DeceptionFile {
  name: string;
  type: 'file' | 'directory';
  size?: string;
  generated: boolean;
  reason?: string;
  children?: DeceptionFile[];
}
