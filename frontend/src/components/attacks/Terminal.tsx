'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import type { TerminalCommand } from '@/types';
import { cn } from '@/lib/utils';

interface TerminalProps {
  sessionTitle: string;
  protocol: string;
  honeypot: string;
  commands: TerminalCommand[];
  isActive?: boolean;
}

// A printed tape of the session: light paper, flagged lines ruled in red.
export function TerminalView({ sessionTitle, protocol, honeypot, commands, isActive = true }: TerminalProps) {
  const [copied, setCopied] = useState(false);
  const [flaggedOnly, setFlaggedOnly] = useState(false);
  const shown = flaggedOnly ? commands.filter((c) => c.flagged) : commands;
  const flaggedCount = commands.filter((c) => c.flagged).length;

  const copyLog = () => {
    navigator.clipboard.writeText(commands.map((c) => `[${c.timestamp}] $ ${c.command}\n${c.output}`).join('\n\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="sheet overflow-hidden">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-3.5">
        <div>
          <h2 className="flex items-center gap-2 text-[15px] font-semibold text-ink">
            Session replay
            {isActive && <span className="flex items-center gap-1.5 text-xs font-semibold text-signal"><span className="live-dot" />recording</span>}
          </h2>
          <p className="mt-0.5 font-mono text-xs text-pencil">
            {sessionTitle}@{honeypot} over {protocol.toUpperCase()}, sandboxed /bin/bash
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="seg" role="group" aria-label="Filter commands">
            <button aria-pressed={!flaggedOnly} onClick={() => setFlaggedOnly(false)}>All {commands.length}</button>
            <button aria-pressed={flaggedOnly} onClick={() => setFlaggedOnly(true)}>Flagged {flaggedCount}</button>
          </div>
          <button onClick={copyLog} className="btn" aria-label="Copy session log">
            {copied ? <Check className="h-3.5 w-3.5 text-moss" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy log'}
          </button>
        </div>
      </header>

      <ol className="max-h-[520px] overflow-y-auto bg-sunk py-2 font-mono text-[12.5px] leading-relaxed">
        {shown.map((cmd, i) => (
          <li
            key={i}
            className={cn('border-l-[3px] px-5 py-2.5', cmd.flagged ? 'border-signal bg-signal-soft/50' : 'border-transparent')}
          >
            <div className="flex items-start gap-3">
              <span className="shrink-0 select-none text-[11px] leading-[1.6rem] text-pencil">{cmd.timestamp}</span>
              <span className="select-none text-pencil">$</span>
              <span className="min-w-0 flex-1 break-all font-medium text-ink">{cmd.command}</span>
              {cmd.flagged && <span className="shrink-0 select-none font-sans text-[11px] font-semibold text-signal">Known technique</span>}
            </div>
            {cmd.output && <pre className="mt-1 whitespace-pre-wrap pl-[5.4rem] text-graphite">{cmd.output}</pre>}
          </li>
        ))}
        {isActive && (
          <li className="flex items-center gap-3 px-5 py-2.5">
            <span className="text-pencil">$</span>
            <span className="h-4 w-2 animate-pulse bg-ink" aria-label="Waiting for input" />
          </li>
        )}
      </ol>
    </section>
  );
}
