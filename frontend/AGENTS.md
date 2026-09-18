# 🛡️ Honeypot — Self-Evolving Honeypot Platform

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Overview

Enterprise-grade cybersecurity operations platform built around an autonomous deception loop: `ATTACK → OBSERVE → ANALYZE → ADAPT → DECEIVE → LEARN → EVOLVE ↺`

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4, "field instrument" light palette (cool paper, Prussian ink, highlighter yellow)
- **Charts & Visuals**: Recharts, Framer Motion
- **Icons**: Lucide React
- **Architecture**: Modular API client abstraction (`/src/lib/api/`), decoupled mock data layer (`/src/data/`), fully typed TypeScript interfaces (`/src/types/`) ready for a backend

## Color System

Tokens live in `@theme` in `src/app/globals.css` and generate utilities (`bg-paper`, `text-ink`, `border-rule`, …):

| Token | Value | Usage |
|---|---|---|
| `paper` | `#EDF0F4` | Page background |
| `sheet` | `#FFFFFF` | Panels/cards |
| `sunk` | `#F5F7FA` | Inset surfaces, table hover |
| `rule` / `rule-strong` | `#DCE1E9` / `#BDC5D3` | Hairlines, borders |
| `ink` | `#172048` | Primary text, primary buttons |
| `graphite` / `pencil` | `#4B5575` / `#646D8A` | Secondary / muted text |
| `lure` (+`-soft`, `-ink`) | `#F6C90E` | Deception: decoys, adaptations, active nav (the `.mark` highlighter) |
| `signal` (+`-soft`) | `#D5331F` | Attacker activity, critical risk |
| `ember` / `cobalt` / `moss` | `#C8620A` / `#2E55E6` / `#0F7A55` | High risk / links & focus / healthy |

Chart colors: `CHART`, `BEHAVIOR_SERIES` (pale → hot as behavior escalates) and `RISK_HEX` in `src/lib/utils.ts`.
Fonts: Schibsted Grotesk (UI) + IBM Plex Mono (IPs, commands, hashes only), loaded in `layout.tsx`.

## Component Structure

```
src/components/
├── layout/           # Sidebar.tsx, Topbar.tsx, PageHeader.tsx
├── dashboard/        # StatCard, EvolutionEngine, AttackStream, BehaviorChart, BehaviorDistribution, AdaptationTimeline, AdaptationAlert
├── attackers/        # AttackerProfile, BehaviorRadar, AttackChain
├── attacks/          # AttackList, Terminal, AttackDetails
├── evolution/        # EvolutionLoop, CurrentEvolution, EvolutionHistory
├── honeypots/        # HoneypotCard, HoneypotHealth
└── attacks/          # AttackList, Terminal, AttackDetails
```

## Page Structure

```
src/app/
├── layout.tsx          # Root layout: fonts + globals only
├── page.tsx            # Marketing landing page (/) — hero SessionTheatre, scroll-scrubbed race & loop
├── (console)/layout.tsx  # Sidebar & Topbar for every console route below
├── (console)/overview/ # Dashboard (/overview)
├── attackers/          # Attacker Intelligence pages
├── evolution/          # Evolution Engine pages
├── honeypots/          # Honeypot Infrastructure pages
├── intelligence/       # Threat Intelligence pages
├── live-attacks/       # Live Attacks pages
├── reports/            # Security Reports pages
├── settings/           # Configuration pages
└── deception-lab/      # Deception Lab pages
```

## Utility Functions

**`src/lib/utils.ts`** contains:
- `cn()` — clsx + tailwind-merge utility
- `getRiskBgColor(risk)` — returns bg + text + border classes for risk badge
- `CHART`, `BEHAVIOR_SERIES`, `RISK_HEX`, `chartAxis` — shared chart styling

**`src/components/ui.tsx`** — `Panel`, `RiskBadge`, `Tag`, `Meter`, `ChartTooltip`. CSS primitives in globals: `.sheet`, `.mark`, `.btn`/`.btn-primary`, `.seg`, `.field`, `.data-table`, `.live-dot`.

## Key Conventions

- All components use `'use client'` directive
- Page-level components are server components (no `'use client'`)
- CSS custom properties are referenced via `var(--color-*)` (e.g. `var(--color-lure)`)
- Tailwind CSS v4 `@theme` block generates all color utility classes
- Icons from `lucide-react`
- Animations via `framer-motion` (AnimatePresence, motion.div)
- Charts via `recharts` (stacked BarChart, RadarChart, horizontal bars); mount animations are off
- Custom tooltips are extracted as separate components outside JSX
- `text-ink` primary, `text-graphite` secondary, `text-pencil` muted; `.sheet` for surfaces; `border-rule` for borders
- Sentence case everywhere; no all-caps labels

## Build & Development

```bash
npm run dev       # Start development server (http://localhost:3000)
npm run build     # Production build
npm run start     # Start production server
```

All 12 routes prerender as static content. Build must pass before considering work complete.

## Important Notes

- The AGENTS.md file includes Next.js agent rules block that is auto-generated by `next dev`. Do not remove it.
- `src/data/` contains mock data that simulates API responses
- `src/types/index.ts` defines all TypeScript interfaces (Attacker, Honeypot, AttackSession, etc.)
- The Terminal component is a light "printed tape"; flagged commands get a red left rule
- No `dark:` class prefixes — this is a light-only theme
- The `dark` class was removed from `<html>` element in layout.tsx
