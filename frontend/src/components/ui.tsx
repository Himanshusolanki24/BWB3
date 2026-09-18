import { cn, getRiskBgColor } from '@/lib/utils';

interface PanelProps {
  title?: React.ReactNode;
  note?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}

export function Panel({ title, note, action, className, bodyClassName, children }: PanelProps) {
  return (
    <section className={cn('sheet flex flex-col', className)}>
      {(title || action) && (
        <header className="flex flex-wrap items-start justify-between gap-3 px-5 pt-4">
          <div className="min-w-0">
            {title && <h2 className="text-[15px] font-semibold tracking-tight text-ink">{title}</h2>}
            {note && <p className="mt-0.5 text-[13px] text-pencil">{note}</p>}
          </div>
          {action && <div className="flex shrink-0 items-center gap-2">{action}</div>}
        </header>
      )}
      <div className={cn('flex-1 p-5', bodyClassName)}>{children}</div>
    </section>
  );
}

export function RiskBadge({ risk, className }: { risk: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2 py-px text-[11px] font-semibold capitalize',
        getRiskBgColor(risk),
        className
      )}
    >
      {risk.toLowerCase()}
    </span>
  );
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded border border-rule bg-sunk px-1.5 py-px font-mono text-[11px] text-graphite', className)}>
      {children}
    </span>
  );
}

export function Meter({ value, className, tone = 'bg-ink' }: { value: number; className?: string; tone?: string }) {
  return (
    <div className={cn('h-1.5 w-full overflow-hidden rounded-full bg-sunk ring-1 ring-inset ring-rule', className)}>
      <div className={cn('h-full rounded-full', tone)} style={{ width: `${value}%` }} />
    </div>
  );
}

export function ChartTooltip({
  active,
  payload,
  label,
  unit = '',
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number | string; color?: string; payload?: { fill?: string } }>;
  label?: string;
  unit?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="min-w-40 rounded-lg border border-rule-strong bg-sheet px-3 py-2 text-xs shadow-[0_6px_24px_rgba(23,32,72,0.12)]">
      {label && <p className="mb-1.5 font-mono text-[11px] text-pencil">{label}</p>}
      {payload.map((p) => (
        <div key={p.name} className="flex items-center justify-between gap-4 py-0.5">
          <span className="flex items-center gap-1.5 text-graphite">
            <span className="h-2 w-2 rounded-sm" style={{ background: p.color ?? p.payload?.fill }} />
            {p.name}
          </span>
          <span className="font-semibold text-ink">
            {p.value}
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}
