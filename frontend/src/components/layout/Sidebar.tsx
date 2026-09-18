'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Radio, Server, UserSearch, Brain, Dna, FlaskConical, FileBarChart, Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const groups = [
  {
    label: 'Watch',
    items: [
      { href: '/', label: 'Overview', icon: LayoutDashboard },
      { href: '/live-attacks', label: 'Live attacks', icon: Radio },
      { href: '/attackers', label: 'Attackers', icon: UserSearch },
      { href: '/intelligence', label: 'Intelligence', icon: Brain },
    ],
  },
  {
    label: 'Deceive',
    items: [
      { href: '/honeypots', label: 'Honeypots', icon: Server },
      { href: '/evolution', label: 'Evolution', icon: Dna },
      { href: '/deception-lab', label: 'Deception lab', icon: FlaskConical },
    ],
  },
  {
    label: 'Admin',
    items: [
      { href: '/reports', label: 'Reports', icon: FileBarChart },
      { href: '/settings', label: 'Settings', icon: Settings },
    ],
  },
];

const mobileItems = groups.flatMap((g) => g.items).slice(0, 5);

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Honeypot home">
      <svg width="26" height="28" viewBox="0 0 26 28" aria-hidden>
        <path d="M13 1.5 24 7.75v12.5L13 26.5 2 20.25V7.75Z" fill="#F6C90E" stroke="#172048" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M13 8.5 19 12v6l-6 3.5L7 18v-6Z" fill="none" stroke="#172048" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="13" cy="15" r="1.7" fill="#172048" />
      </svg>
      <span className="text-[17px] font-bold tracking-[-0.02em] text-ink">Honeypot</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-[232px] flex-col border-r border-rule bg-sheet lg:flex"
        aria-label="Main navigation"
      >
        <div className="flex h-16 items-center px-5">
          <Logo />
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="mb-1.5 px-2.5 text-xs font-medium text-pencil">{group.label}</p>
              <ul className="space-y-px">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors',
                          isActive ? 'font-semibold text-ink' : 'text-graphite hover:bg-sunk hover:text-ink'
                        )}
                      >
                        <Icon className={cn('h-[17px] w-[17px] shrink-0', isActive ? 'text-ink' : 'text-pencil')} strokeWidth={isActive ? 2.2 : 1.8} />
                        <span className={cn(isActive && 'mark')}>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="m-3 rounded-lg border border-rule bg-sunk px-3 py-2.5">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-ink">
            <span className="live-dot text-moss" />
            All sensors reporting
          </p>
          <p className="mt-0.5 pl-[15px] text-xs text-pencil">4 of 6 nodes active</p>
        </div>
      </aside>

      <nav
        className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t border-rule bg-sheet/95 px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur lg:hidden"
        aria-label="Mobile navigation"
      >
        {mobileItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={cn('flex flex-col items-center gap-1 px-2 py-1 text-[11px]', isActive ? 'font-semibold text-ink' : 'text-pencil')}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.2 : 1.8} />
              <span className={cn(isActive && 'mark')}>{item.label.split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
