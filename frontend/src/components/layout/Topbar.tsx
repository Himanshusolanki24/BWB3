'use client';

import { Bell, User, Wifi } from 'lucide-react';

export function Topbar() {
  return (
    <header className="h-16 border-b border-stone-200 bg-white/90 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30 shadow-xs">
      <div className="lg:hidden flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-amber-600 to-teal-600 flex items-center justify-center shadow-xs">
          <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L3 7v6c0 4.4 3 7.5 7 9 4-1.5 7-4.6 7-9V7l-7-5z" />
          </svg>
        </div>
        <span className="font-extrabold text-xs tracking-widest text-stone-900">Honeypot</span>
      </div>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 shadow-xs">
          <Wifi className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span className="text-xs font-extrabold text-emerald-800 tracking-wide">ONLINE</span>
        </div>

        <button
          className="relative p-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors focus-ring"
          aria-label="Notifications"
        >
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
        </button>

        <button
          className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-stone-100 transition-colors focus-ring"
          aria-label="User profile"
        >
          <div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-300 flex items-center justify-center shadow-xs">
            <User className="w-4 h-4 text-stone-600" />
          </div>
        </button>
      </div>
    </header>
  );
}
