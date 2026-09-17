'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Radio,
  Server,
  UserSearch,
  Brain,
  Dna,
  Eye,
  FileBarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Activity,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/live-attacks', label: 'Live Attacks', icon: Radio },
  { href: '/honeypots', label: 'Honeypots', icon: Server },
  { href: '/attackers', label: 'Attackers', icon: UserSearch },
  { href: '/intelligence', label: 'Intelligence', icon: Brain },
  { href: '/evolution', label: 'Evolution', icon: Dna },
  { href: '/deception-lab', label: 'Deception Lab', icon: Eye },
  { href: '/reports', label: 'Reports', icon: FileBarChart },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="hidden lg:flex flex-col fixed left-0 top-0 h-screen bg-stone-50 border-r border-stone-200 z-40"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-stone-200 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-600 to-teal-600 flex items-center justify-center shrink-0 shadow-xs">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15 }}
                className="overflow-hidden"
              >
                <span className="font-black text-sm tracking-widest text-stone-900">
                  Honeypot
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Nav links */}
        <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto" aria-label="Main">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 focus-ring relative',
                  isActive
                    ? 'bg-amber-100/90 text-amber-950 border border-amber-300 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-transparent'
                )}
                title={collapsed ? item.label : undefined}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={cn('w-[18px] h-[18px] shrink-0', isActive ? 'text-amber-700' : 'text-stone-500')} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.15 }}
                      className="whitespace-nowrap overflow-hidden font-bold"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-amber-600 rounded-r" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* System Health */}
        <div className="px-3 py-3 border-t border-stone-200 shrink-0">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600 shrink-0 animate-pulse" />
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="text-[11px] text-stone-500 font-medium">System Health</p>
                  <p className="text-xs text-emerald-700 font-bold">Operational</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white border border-stone-300 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors shadow-xs focus-ring"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </motion.aside>

      {/* Mobile Nav */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 z-50 flex items-center justify-around px-2 py-2"
        role="navigation"
        aria-label="Mobile navigation"
      >
        {navItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-colors focus-ring',
                isActive ? 'text-amber-800 font-bold' : 'text-stone-500'
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label.split(' ')[0]}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
