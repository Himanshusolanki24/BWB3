import Link from 'next/link';
import { Bell, Search } from 'lucide-react';
import { Logo } from './Sidebar';

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1480px] items-center gap-4 px-4 sm:px-6 lg:px-10">
        <div className="lg:hidden">
          <Logo />
        </div>

        <label className="relative hidden max-w-sm flex-1 md:block">
          <span className="sr-only">Search</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pencil" />
          <input className="field pl-9" placeholder="Search IPs, sessions, indicators" />
        </label>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/live-attacks"
            className="hidden items-center gap-2 rounded-full border border-signal/25 bg-signal-soft px-3 py-1 text-[13px] font-semibold text-signal sm:flex"
          >
            <span className="live-dot" />
            7 attackers engaged
          </Link>
          <button className="relative rounded-md p-2 text-graphite hover:bg-sheet hover:text-ink" aria-label="Notifications, 3 unread">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-lure ring-2 ring-paper" />
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white"
            aria-label="Account"
          >
            HS
          </button>
        </div>
      </div>
    </header>
  );
}
