# 🛡️ Honeypot — Self-Evolving Honeypot

> **DECEIVE • LEARN • DEFEND**
> *"Turn attacker behavior into actionable intelligence."*

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-FF6B35?style=for-the-badge&logo=recharts&logoColor=white)](https://recharts.org/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-4CAF50?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 📖 Overview

Honeypot is an enterprise-grade cybersecurity operations platform built around an autonomous deception loop. It continuously adapts its deception strategies based on real-world attacker behavior, transforming every interaction into actionable intelligence.

```
ATTACK → OBSERVE → ANALYZE → ADAPT → DECEIVE → LEARN → EVOLVE ↺
```

---

## ⚙️ Architecture & Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript (Strict Mode) |
| **Styling** | Tailwind CSS v4 with warm amber & stone palette |
| **Charts & Visuals** | Recharts, Framer Motion |
| **Icons** | Lucide React |
| **Architecture** | Modular API client abstraction, decoupled mock data layer, fully typed interfaces ready for FastAPI/Node backend |

---

## 🌐 Pages & Capabilities

| Route | Page | Description |
|---|---|---|
| `/` | **Dashboard** | Self-evolving engine visualization, real-time stat cards, live attack telemetry, behavior area chart, distribution donut, adaptations timeline, and adaptive alerts |
| `/live-attacks` | **Live Attacks** | Real-time attack monitor with synchronized session list, captured command forensics, and bash terminal trap |
| `/attackers` | **Attacker Intelligence** | Individual adversary profiles, ML behavioral heuristics, MITRE kill-chain progression, and command audit logs |
| `/honeypots` | **Honeypot Infrastructure** | Multi-protocol sandbox fleet status, node health gauges, cluster zones, and decoy deployment simulation |
| `/evolution` | **Evolution Engine** | Interactive 6-stage autonomous feedback loop, active strategy shifts, generated decoy tracking, and cycle simulation |
| `/deception-lab` | **Deception Lab** | Simulated sandbox filesystem, honeytoken canary secrets, synthetic daemons, virtual subnet topology, and web honeytraps |
| `/intelligence` | **Threat Intelligence** | MITRE ATT&CK technique matrix, tactic filtering, and searchable IOC registry with quick copy |
| `/reports` | **Security Reports** | Executive summaries, incident timelines, report generation, and PDF export simulation |
| `/settings` | **Configuration** | Autonomous policy toggles, canary sensitivity slider, containment policies, and SIEM forwarders |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Start production server
npm run start
```

**Default URL**: [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Project Structure

```
src/
├── app/                  # App Router pages & layouts
│   ├── layout.tsx        # Root layout with Sidebar & Topbar
│   ├── page.tsx          # Dashboard home
│   ├── attackers/        # Attacker Intelligence pages
│   ├── evolution/        # Evolution Engine pages
│   ├── honeypots/        # Honeypot Infrastructure pages
│   ├── intelligence/     # Threat Intelligence pages
│   ├── live-attacks/     # Live Attacks pages
│   ├── reports/          # Security Reports pages
│   ├── settings/         # Configuration pages
│   └── deception-lab/    # Deception Lab pages
├── components/           # Reusable UI components
│   ├── layout/           # Sidebar, Topbar, PageHeader
│   ├── dashboard/        # Dashboard widgets (charts, stats, alerts)
│   ├── attackers/        # Attacker profile, behavior radar, attack chain
│   ├── attacks/          # Attack list, terminal, attack details
│   ├── evolution/        # Evolution loop, history, current state
│   ├── honeypots/        # Honeypot cards, health overview
│   └── ...
├── lib/
│   ├── api/              # API client abstraction layer
│   └── utils.ts          # Utility functions (risk/status colors)
├── types/                # Fully typed TypeScript interfaces
└── data/                 # Decoupled mock data layer
```

---

## 🔗 Key Features

- **Autonomous Deception Loop** — Self-evolving honeypot that adapts in real-time
- **MITRE ATT&CK Integration** — Map attacker behavior to known tactics and techniques
- **Real-Time Telemetry** — Live attack streams with synchronized session tracking
- **ML Behavioral Heuristics** — Confidence-based AI classification of attacker intent
- **Interactive Kill Chain** — Visual progression through reconnaissance to exploitation
- **Command Forensics** — Captured attacker commands with full audit trail
- **Adaptive Alerts** — Context-aware security alerts based on evolving threat patterns
- **Decoy Deployment** — Simulated honeypot infrastructure with health monitoring
- **IOC Registry** — Searchable Indicators of Compromise with quick-copy functionality

---

## 📄 License

MIT
