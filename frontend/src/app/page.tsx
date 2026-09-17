'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { EvolutionEngine } from '@/components/dashboard/EvolutionEngine';
import { AttackStream } from '@/components/dashboard/AttackStream';
import { BehaviorChart } from '@/components/dashboard/BehaviorChart';
import { BehaviorDistribution } from '@/components/dashboard/BehaviorDistribution';
import { AdaptationTimeline } from '@/components/dashboard/AdaptationTimeline';
import { AdaptationAlert } from '@/components/dashboard/AdaptationAlert';
import { getDashboardStats, getLiveAttacks, getBehaviorTimeSeries, getBehaviorDistribution as getBDist } from '@/lib/api/attacks';
import { getAdaptationEvents } from '@/lib/api/adaptations';

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const liveAttacks = await getLiveAttacks();
  const timeSeries = await getBehaviorTimeSeries('24H');
  const distribution = await getBDist();
  const adaptations = await getAdaptationEvents();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Security Overview"
        subtitle="Real-time visibility into attacker behavior and adaptive deception."
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-300 text-xs shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span className="font-bold text-amber-800 tracking-wide">LIVE SENSORS</span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-600 font-medium">Just now</span>
          </div>
        </div>
      </PageHeader>
      <AdaptationAlert />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Active Sessions" value={stats.activeSessions.value.toString().padStart(2, '0')} trend={stats.activeSessions.trend} label={stats.activeSessions.label} iconType="users" index={0} />
        <StatCard title="Attacks Detected" value={stats.attacksDetected.value} trend={stats.attacksDetected.trend} label={stats.attacksDetected.label} iconType="shield-alert" index={1} />
        <StatCard title="Unique Attackers" value={stats.uniqueAttackers.value} trend={stats.uniqueAttackers.trend} label={stats.uniqueAttackers.label} iconType="user-x" index={2} />
        <StatCard title="Decoys Generated" value={stats.decoysGenerated.value} trend={stats.decoysGenerated.trend} label={stats.decoysGenerated.label} iconType="layers" index={3} />
        <StatCard title="Avg. Engagement" value={stats.avgEngagement.value} trend={stats.avgEngagement.trend} label={stats.avgEngagement.label} iconType="clock" index={4} />
      </div>
      <EvolutionEngine />
      <AttackStream initialAttacks={liveAttacks} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><BehaviorChart initialData={timeSeries} /></div>
        <div><BehaviorDistribution data={distribution} /></div>
      </div>
      <AdaptationTimeline events={adaptations} />
    </div>
  );
}
