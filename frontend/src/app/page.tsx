import { PageHeader } from '@/components/layout/PageHeader';
import { StatStrip } from '@/components/dashboard/StatCard';
import { EvolutionEngine } from '@/components/dashboard/EvolutionEngine';
import { AttackStream } from '@/components/dashboard/AttackStream';
import { BehaviorChart } from '@/components/dashboard/BehaviorChart';
import { BehaviorDistribution } from '@/components/dashboard/BehaviorDistribution';
import { AdaptationTimeline } from '@/components/dashboard/AdaptationTimeline';
import { AdaptationAlert } from '@/components/dashboard/AdaptationAlert';
import { getDashboardStats, getLiveAttacks, getBehaviorTimeSeries, getBehaviorDistribution } from '@/lib/api/attacks';
import { getAdaptationEvents } from '@/lib/api/adaptations';

export default async function DashboardPage() {
  const [stats, liveAttacks, timeSeries, distribution, adaptations] = await Promise.all([
    getDashboardStats(),
    getLiveAttacks(),
    getBehaviorTimeSeries('24H'),
    getBehaviorDistribution(),
    getAdaptationEvents(),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader title="Overview" subtitle="What attackers are doing inside your decoys, and how the environment is changing to keep them there." />
      <AdaptationAlert />
      <StatStrip stats={stats} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2"><BehaviorChart initialData={timeSeries} /></div>
        <BehaviorDistribution data={distribution} />
      </div>
      <AttackStream initialAttacks={liveAttacks} />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2"><EvolutionEngine /></div>
        <AdaptationTimeline events={adaptations} />
      </div>
    </div>
  );
}
