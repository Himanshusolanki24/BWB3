import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Logo } from '@/components/layout/Sidebar';
import { SessionTheatre } from '@/components/landing/SessionTheatre';

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

const contrasts = [
  {
    topic: 'The environment',
    them: 'One fixed image, identical for every visitor.',
    us: 'Rebuilt for each attacker, and again every time they change direction.',
  },
  {
    topic: 'When they look closely',
    them: 'Default banners and empty home folders give it away in minutes.',
    us: 'Files, services and credentials that match exactly what they searched for.',
  },
  {
    topic: 'What your team gets',
    them: 'Raw logs to read after the fact.',
    us: 'Intent mapped to MITRE ATT&CK while the session is still live.',
  },
  {
    topic: 'When they steal something',
    them: 'Nothing. The trip-wire already fired.',
    us: 'Canary credentials that report home from wherever they are used.',
  },
];

const decoyTicks = [
  { at: 0.12, label: 'Admin files' },
  { at: 0.34, label: 'Credential chain' },
  { at: 0.58, label: 'Database backup' },
  { at: 0.8, label: 'Network map' },
];

const loop = [
  { name: 'Observe', text: 'Every keystroke, request and packet inside the decoy.' },
  { name: 'Analyze', text: 'Match the sequence to a goal, with a confidence score.' },
  { name: 'Adapt', text: 'Pick the deception most likely to hold their attention.' },
  { name: 'Deceive', text: 'Generate the files, hosts and credentials on the spot.' },
  { name: 'Learn', text: 'Did they take the bait? For how long? What next?' },
  { name: 'Evolve', text: 'Feed the answer back so the next attacker meets a better trap.' },
];

export default function LandingPage() {
  return (
    <div className="landing overflow-x-clip">
      <header className="mx-auto flex h-20 max-w-[1240px] items-center justify-between px-5 sm:px-8">
        <Logo href="/" />
        <nav className="flex items-center gap-1 sm:gap-6" aria-label="Page sections">
          <a href="#different" className="hidden text-sm text-graphite hover:text-ink sm:inline">Why it works</a>
          <a href="#loop" className="hidden text-sm text-graphite hover:text-ink sm:inline">How it adapts</a>
          <Link href="/overview" className="btn btn-primary">Open the console</Link>
        </nav>
      </header>

      {/* Hero: the headline rewrites itself, then the product does the same thing live */}
      <section className="mx-auto max-w-[1240px] px-5 pb-24 pt-10 sm:px-8 lg:pt-16">
        <h1 className="hero-title text-ink">
          <span className="block">Decoys that</span>
          <span className="hero-swap">
            <span className="hero-old">wait.</span>
            <span className="hero-new"><span className="hero-mark">adapt.</span></span>
          </span>
        </h1>
        <div className="hero-copy mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[52ch] text-[17px] leading-relaxed text-graphite">
            Honeypot watches what an intruder is hunting for and rebuilds the fake environment around it, while they are still inside. They stay longer. You learn what they came for.
          </p>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link href="/overview" className="btn btn-primary h-11 px-5 text-[15px]">Open the console</Link>
            <a href="#different" className="btn h-11 px-5 text-[15px]">See what&apos;s different</a>
          </div>
        </div>

        <div className="hero-stage mt-14">
          <SessionTheatre />
          <p className="mt-3 text-center text-[13px] text-pencil">A real session shape, replayed. Nothing here touches a production system.</p>
        </div>
      </section>

      {/* The race: who keeps the attacker longer */}
      <section id="different" className="border-y border-rule bg-sheet">
        <div className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8">
          <h2 className="section-title max-w-[18ch] text-ink">Most honeypots get found out. Ours keeps up.</h2>
          <p className="mt-4 max-w-[58ch] text-[17px] text-graphite">
            Same attacker, same first command. Scroll to watch how long each decoy holds them.
          </p>

          <div className="scrub mt-14 space-y-12">
            <div>
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[15px] font-semibold text-ink">An ordinary honeypot</p>
                <p className="scrub-pop text-[13px] font-semibold text-signal" style={v({ '--at': '30%' })}>Gone after 3 minutes</p>
              </div>
              <div className="race-track mt-3">
                <div className="race-fill scrub-bar bg-signal/15" style={v({ '--to': 0.1, '--span': '8%' })} />
                <div className="race-rider scrub-ride" style={v({ '--to': 0.1, '--span': '8%' })}>
                  <span className="race-dot bg-signal" />
                </div>
                <p className="scrub-pop absolute left-[12%] top-1/2 -translate-y-1/2 pl-3 text-[13px] text-graphite" style={v({ '--at': '30%' })}>
                  Spotted the stock image and left
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-3">
                <p className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                  <span className="mark">Honeypot</span>
                </p>
                <p className="scrub-pop text-[13px] font-semibold text-moss" style={v({ '--at': '62%' })}>Still inside at 28 minutes</p>
              </div>
              <div className="race-track mt-3">
                <div className="race-fill scrub-bar bg-lure/45" style={v({ '--to': 0.94, '--span': '40%' })} />
                {decoyTicks.map((t) => (
                  <span
                    key={t.label}
                    className="race-tick scrub-pop"
                    style={v({ left: `${t.at * 100}%`, '--at': `${20 + t.at * 0.94 * 40}%` })}
                  >
                    <span className="race-tick-label">{t.label}</span>
                  </span>
                ))}
                <div className="race-rider scrub-ride" style={v({ '--to': 0.94, '--span': '40%' })}>
                  <span className="race-dot bg-ink" />
                </div>
              </div>
              <div className="mt-9 flex justify-between font-mono text-[11px] text-pencil" aria-hidden>
                {[0, 5, 10, 15, 20, 25, 30].map((m) => <span key={m}>{m}m</span>)}
              </div>
            </div>
          </div>

          <div className="mt-20 overflow-x-auto">
            <table className="contrast w-full min-w-[640px] text-left">
              <thead>
                <tr>
                  <th className="w-[22%]"><span className="sr-only">Topic</span></th>
                  <th className="w-[39%] text-sm font-medium text-pencil">Ordinary honeypot</th>
                  <th className="w-[39%] text-sm font-semibold text-ink">Honeypot</th>
                </tr>
              </thead>
              <tbody>
                {contrasts.map((c) => (
                  <tr key={c.topic}>
                    <th scope="row" className="text-[15px] font-semibold text-ink">{c.topic}</th>
                    <td className="text-[15px] text-pencil">{c.them}</td>
                    <td className="text-[15px] text-ink">
                      <span className="contrast-tick" aria-hidden />
                      {c.us}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* The loop, drawn as you scroll */}
      <section id="loop" className="mx-auto max-w-[1240px] px-5 py-24 sm:px-8">
        <h2 className="section-title max-w-[20ch] text-ink">The loop runs while they type.</h2>
        <p className="mt-4 max-w-[58ch] text-[17px] text-graphite">
          Six steps, repeated every few seconds for every session. Nobody on your team has to press a button.
        </p>

        <ol className="scrub relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-6">
          <span className="loop-line scrub-bar" style={v({ '--to': 1, '--span': '35%' })} aria-hidden />
          {loop.map((s, i) => (
            <li key={s.name} className="relative lg:pt-10">
              <span className="loop-node scrub-pop" style={v({ '--at': `${20 + (i / (loop.length - 1)) * 35}%` })}>
                {i + 1}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink lg:mt-0">{s.name}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-graphite">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-rule bg-ink text-white">
        <div className="mx-auto flex max-w-[1240px] flex-col items-start justify-between gap-8 px-5 py-20 sm:px-8 lg:flex-row lg:items-end">
          <h2 className="section-title max-w-[16ch]">Let them in. Keep them busy. Learn everything.</h2>
          <Link href="/overview" className="btn h-12 border-lure bg-lure px-6 text-[15px] text-ink hover:border-white hover:bg-white">
            Open the console
          </Link>
        </div>
      </section>

      <footer className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-5 py-8 text-[13px] text-pencil sm:px-8">
        <Logo href="/" />
        <p>Every decoy is synthetic. No real credentials are ever exposed.</p>
      </footer>
    </div>
  );
}
