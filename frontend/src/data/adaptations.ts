import type { AdaptationEvent, EvolutionState, DeceptionFile } from '@/types';

export const evolutionState: EvolutionState = {
  currentStage: 'ADAPT',
  currentBehavior: 'Database reconnaissance',
  currentStrategy: 'Database-focused deception',
  confidence: 94,
  isActive: true,
  cycleCount: 47,
};

export const adaptationEvents: AdaptationEvent[] = [
  {
    id: 'adapt-001',
    timestamp: '10:26:00',
    behavior: 'New behavior pattern learned',
    previousStrategy: 'Database decoys',
    newStrategy: 'Enhanced database + credential chain',
    confidence: 96,
    result: '+2 interactions',
  },
  {
    id: 'adapt-002',
    timestamp: '10:25:30',
    behavior: 'Attacker accessed decoy database',
    previousStrategy: 'Database decoys',
    newStrategy: 'Database decoys',
    confidence: 94,
    result: 'Engagement maintained',
  },
  {
    id: 'adapt-003',
    timestamp: '10:25:00',
    behavior: 'Database decoy generated',
    previousStrategy: 'Admin files',
    newStrategy: 'Database-focused deception',
    confidence: 94,
    generatedDecoys: ['database.conf', 'backup.sql', 'db_credentials.txt'],
    reason: 'Attacker repeatedly accessed database-related paths.',
  },
  {
    id: 'adapt-004',
    timestamp: '10:24:30',
    behavior: 'Database interest identified',
    previousStrategy: 'Admin files',
    newStrategy: 'Database-focused deception',
    confidence: 88,
  },
  {
    id: 'adapt-005',
    timestamp: '10:24:00',
    behavior: 'Reconnaissance detected',
    previousStrategy: 'Generic Linux decoys',
    newStrategy: 'Admin files',
    confidence: 72,
    result: '+3m engagement',
  },
  {
    id: 'adapt-006',
    timestamp: '10:21:00',
    behavior: 'SSH brute force pattern',
    previousStrategy: 'Default SSH config',
    newStrategy: 'Weak credential honeytrap',
    confidence: 85,
    result: '+4 login attempts captured',
  },
  {
    id: 'adapt-007',
    timestamp: '10:18:00',
    behavior: 'Port scanning detected',
    previousStrategy: 'Minimal services',
    newStrategy: 'Expanded service decoys',
    confidence: 78,
    result: '+6 service interactions',
  },
];

export const evolutionHistory = [
  {
    time: '10:21',
    behavior: 'Reconnaissance',
    oldStrategy: 'Generic files',
    newStrategy: 'Admin files',
    result: '+3m engagement',
  },
  {
    time: '10:24',
    behavior: 'DB interest',
    oldStrategy: 'Admin files',
    newStrategy: 'Database decoys',
    result: '+5 interactions',
  },
  {
    time: '10:25',
    behavior: 'Credential search',
    oldStrategy: 'Database decoys',
    newStrategy: 'Credential chain',
    result: '+2m engagement',
  },
  {
    time: '10:26',
    behavior: 'Lateral movement',
    oldStrategy: 'Credential chain',
    newStrategy: 'Network topology decoys',
    result: '+3 interactions',
  },
];

export const deceptionFiles: DeceptionFile[] = [
  {
    name: '/home/admin/',
    type: 'directory',
    generated: true,
    reason: 'Admin home directory decoy',
    children: [
      { name: 'backup.sh', type: 'file', size: '2.4 KB', generated: true, reason: 'Script decoy for persistence detection' },
      { name: 'database.conf', type: 'file', size: '512 B', generated: true, reason: 'Database credential honeytrap' },
      { name: 'passwords.txt', type: 'file', size: '1.1 KB', generated: true, reason: 'Credential harvest decoy' },
      { name: 'employee_data.csv', type: 'file', size: '48 KB', generated: true, reason: 'Data exfiltration tracker' },
      { name: 'backup_2026.zip', type: 'file', size: '156 KB', generated: true, reason: 'Archive decoy with tracking' },
    ],
  },
  {
    name: '/var/backups/',
    type: 'directory',
    generated: true,
    reason: 'Backup directory for data-interested attackers',
    children: [
      { name: 'backup.sql', type: 'file', size: '2.1 MB', generated: true, reason: 'Database dump decoy' },
      { name: 'users.sql', type: 'file', size: '384 KB', generated: true, reason: 'User table decoy' },
      { name: 'config.tar.gz', type: 'file', size: '89 KB', generated: true, reason: 'Config archive decoy' },
    ],
  },
  {
    name: '/etc/',
    type: 'directory',
    generated: false,
    children: [
      { name: 'shadow', type: 'file', size: '1.2 KB', generated: true, reason: 'Credential access tracker' },
      { name: 'ssh/', type: 'directory', generated: false, children: [
        { name: 'sshd_config', type: 'file', size: '3.2 KB', generated: true, reason: 'SSH config honeytrap' },
        { name: 'authorized_keys', type: 'file', size: '512 B', generated: true, reason: 'Key injection tracker' },
      ]},
    ],
  },
];
