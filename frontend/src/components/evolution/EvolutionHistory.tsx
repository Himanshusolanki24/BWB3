import { Panel } from '@/components/ui';

interface EvolutionHistoryProps {
  history: Array<{ time: string; behavior: string; oldStrategy: string; newStrategy: string; result: string }>;
}

export function EvolutionHistoryTable({ history }: EvolutionHistoryProps) {
  return (
    <Panel title="History" note="Every strategy change and what it gained">
      <div className="-mx-5 overflow-x-auto px-5">
        <table className="data-table min-w-[680px]">
          <thead>
            <tr><th>Time</th><th>Behavior</th><th>Replaced</th><th>With</th><th className="text-right">Gain</th></tr>
          </thead>
          <tbody>
            {history.map((row, i) => (
              <tr key={i}>
                <td className="whitespace-nowrap font-mono text-xs text-pencil">{row.time}</td>
                <td className="whitespace-nowrap text-ink">{row.behavior}</td>
                <td className="whitespace-nowrap text-pencil line-through decoration-pencil/60">{row.oldStrategy}</td>
                <td className="whitespace-nowrap font-medium text-ink">{row.newStrategy}</td>
                <td className="whitespace-nowrap text-right text-xs font-semibold text-moss">{row.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
