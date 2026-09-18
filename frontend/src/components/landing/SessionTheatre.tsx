'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

type FileState = 'base' | 'new' | 'gone';
interface Step {
  cmd: string;
  out: string;
  flagged?: boolean;
  intent?: [string, number];
  add?: string[];
  remove?: string[];
  note?: string;
}

const BASE_FILES = ['.bash_history', 'backup.sh', 'notes.txt'];

const SCRIPT: Step[] = [
  { cmd: 'whoami', out: 'admin' },
  { cmd: 'ls -a ~', out: '.bash_history  backup.sh  notes.txt' },
  {
    cmd: 'grep -ril password ~',
    out: '/home/admin/notes.txt',
    intent: ['Looking for credentials', 71],
    add: ['.aws/credentials', 'vault_export.csv'],
    remove: ['backup.sh'],
    note: 'Planted credentials that match the search',
  },
  {
    cmd: 'cat ~/.aws/credentials',
    out: '[default]\naws_access_key_id = AKIA4H7Q2XVN8DQ7\naws_secret_access_key = wJalrXUtnF•••••••',
    flagged: true,
    intent: ['Stealing cloud credentials', 94],
    note: 'That key is a canary. It reports home the moment it is used',
  },
  {
    cmd: 'nc -zv 10.0.1.50 3306',
    out: 'Connection to 10.0.1.50 3306 port [tcp/mysql] succeeded!',
    flagged: true,
    intent: ['Moving toward the database', 96],
    add: ['/var/backups/orders.sql'],
    remove: ['notes.txt'],
    note: 'Opened a fake database host and a backup to go with it',
  },
];

interface Line { cmd: string; typed: number; out?: string; flagged?: boolean }
interface View {
  lines: Line[];
  files: { name: string; state: FileState }[];
  intent: [string, number] | null;
  analyzing: boolean;
  note: string | null;
  dwell: number;
}

const initial = (): View => ({
  lines: [],
  files: BASE_FILES.map((name) => ({ name, state: 'base' })),
  intent: null,
  analyzing: false,
  note: null,
  dwell: 0,
});

function applyAdapt(v: View, s: Step): View {
  const files = v.files.map((f) => (s.remove?.includes(f.name) ? { ...f, state: 'gone' as const } : f));
  s.add?.forEach((name) => files.push({ name, state: 'new' }));
  return { ...v, files, intent: s.intent ?? v.intent, note: s.note ?? v.note, analyzing: false };
}

// The end state, shown as-is to people who prefer reduced motion.
function finalView(): View {
  return SCRIPT.reduce(
    (v, s) => applyAdapt({ ...v, lines: [...v.lines, { cmd: s.cmd, typed: s.cmd.length, out: s.out, flagged: s.flagged }] }, s),
    { ...initial(), dwell: 522 }
  );
}

const FINAL = finalView();
const reducedQuery = '(prefers-reduced-motion: reduce)';
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

const fmt = (sec: number) => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;

export function SessionTheatre() {
  const reduced = useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => false);
  const [live, setView] = useState<View>(initial);
  const view = reduced ? FINAL : live;
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    if (reduced) return;
    let alive = true;
    // Sleep that stands still while paused and bails out on unmount.
    const sleep = async (ms: number) => {
      let left = ms;
      while (alive && left > 0) {
        await new Promise((r) => setTimeout(r, 40));
        if (!pausedRef.current) left -= 40;
      }
      if (!alive) throw new Error('stopped');
    };
    const tick = setInterval(() => {
      if (!pausedRef.current) setView((v) => ({ ...v, dwell: Math.min(v.dwell + 2, 3599) }));
    }, 100);

    (async () => {
      try {
        while (alive) {
          setView(initial());
          await sleep(900);
          for (const step of SCRIPT) {
            setView((v) => ({ ...v, lines: [...v.lines, { cmd: step.cmd, typed: 0 }] }));
            for (let i = 1; i <= step.cmd.length; i++) {
              await sleep(38 + Math.random() * 50);
              setView((v) => ({ ...v, lines: v.lines.map((l, j) => (j === v.lines.length - 1 ? { ...l, typed: i } : l)) }));
            }
            await sleep(380);
            setView((v) => ({
              ...v,
              lines: v.lines.map((l, j) => (j === v.lines.length - 1 ? { ...l, out: step.out, flagged: step.flagged } : l)),
            }));
            if (step.intent) {
              await sleep(500);
              setView((v) => ({ ...v, analyzing: true }));
              await sleep(900);
              setView((v) => applyAdapt(v, step));
            }
            await sleep(1500);
          }
          await sleep(4500);
        }
      } catch {
        /* unmounted */
      }
    })();

    return () => {
      alive = false;
      clearInterval(tick);
    };
  }, [reduced]);

  const planted = view.files.filter((f) => f.state === 'new').length;
  const typing = view.lines.at(-1);
  const isTyping = typing && typing.typed < typing.cmd.length;

  return (
    <figure className="theatre sheet overflow-hidden shadow-[0_30px_80px_-30px_rgba(23,32,72,0.35)]" aria-label="Replay of an attacker session inside a Honeypot decoy">
      <div className="flex items-center justify-between gap-3 border-b border-rule px-5 py-3">
        <p className="font-mono text-xs text-graphite">
          <span className="text-signal">●</span> intruder@ssh-hny-01, from 185.220.101.12
        </p>
        <button
          hidden={reduced}
          onClick={() => setPaused((p) => !p)}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-semibold text-graphite hover:bg-sunk hover:text-ink"
          aria-label={paused ? 'Play replay' : 'Pause replay'}
        >
          {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          {paused ? 'Play' : 'Pause'}
        </button>
      </div>

      <div className="grid md:grid-cols-[1.35fr_1fr]">
        {/* What the attacker types */}
        <div className="flex h-[330px] flex-col justify-end overflow-hidden bg-sunk px-5 py-4 font-mono text-[12.5px] leading-relaxed md:h-[360px]">
          {view.lines.map((l, i) => (
            <div key={i} className={cn('theatre-line border-l-2 py-1 pl-3', l.flagged ? 'border-signal' : 'border-transparent')}>
              <p className="text-ink">
                <span className="select-none text-pencil">$ </span>
                {l.cmd.slice(0, l.typed)}
                {i === view.lines.length - 1 && (isTyping || !l.out) && <span className="theatre-caret" aria-hidden />}
              </p>
              {l.out && <pre className="theatre-out whitespace-pre-wrap text-graphite">{l.out}</pre>}
            </div>
          ))}
        </div>

        {/* What the attacker sees, and what the engine is doing about it */}
        <div className="flex flex-col border-t border-rule md:border-l md:border-t-0">
          <div className="flex-1 px-5 py-4">
            <p className="text-xs text-pencil">The decoy they&apos;re exploring</p>
            <ul className="mt-2 space-y-1 font-mono text-[13px]">
              {view.files.map((f) => (
                <li key={f.name} className={cn('theatre-file', `is-${f.state}`)}>
                  <span className="theatre-file-name">{f.name}</span>
                  {f.state === 'new' && <span className="ml-2 font-sans text-[11px] font-semibold text-lure-ink">planted</span>}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-rule px-5 py-4" aria-live="polite">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-xs text-pencil">What we think they want</p>
              <p className="text-xs font-semibold tabular-nums text-ink">{view.intent ? `${view.intent[1]}%` : ''}</p>
            </div>
            <p className={cn('mt-1 min-h-[1.5rem] text-[15px] font-semibold text-ink', view.analyzing && 'theatre-analyzing')}>
              {view.analyzing ? 'Reading intent…' : view.intent?.[0] ?? 'Watching'}
            </p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-sunk">
              <div className="theatre-meter h-full origin-left rounded-full bg-lure" style={{ transform: `scaleX(${(view.intent?.[1] ?? 0) / 100})` }} />
            </div>
            <p key={view.note} className="theatre-note mt-3 min-h-[2.5rem] text-[13px] text-graphite">
              {view.note && <span className="mark text-ink">{view.note}</span>}
            </p>
          </div>
        </div>
      </div>

      <figcaption className="grid grid-cols-3 border-t border-rule">
        {[
          { label: 'Time inside the decoy', value: fmt(view.dwell) },
          { label: 'Decoys planted for them', value: planted },
          { label: 'Canaries armed', value: view.lines.some((l) => l.flagged) ? view.lines.filter((l) => l.flagged).length : 0 },
        ].map((s, i) => (
          <div key={s.label} className={cn('px-5 py-3', i > 0 && 'border-l border-rule')}>
            <p className="text-[11px] text-pencil sm:text-xs">{s.label}</p>
            <p className="mt-0.5 text-xl font-semibold tabular-nums tracking-tight text-ink sm:text-2xl">{s.value}</p>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}
