'use client';

import { useState, useRef } from 'react';
import { Terminal as TerminalIcon, ShieldAlert, Copy, Check } from 'lucide-react';
import type { TerminalCommand } from '@/types';

interface TerminalProps {
  sessionTitle: string;
  protocol: string;
  honeypot: string;
  commands: TerminalCommand[];
  isActive?: boolean;
}

export function TerminalView({
  sessionTitle,
  protocol,
  honeypot,
  commands,
  isActive = true,
}: TerminalProps) {
  const [copied, setCopied] = useState(false);
  const [filterFlagged, setFilterFlagged] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const displayedCommands = filterFlagged
    ? commands.filter((c) => c.flagged)
    : commands;

  const copyLog = () => {
    const text = commands
      .map((c) => `[${c.timestamp}] $ ${c.command}\n${c.output}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-stone-700/80 bg-[#121110] overflow-hidden flex flex-col shadow-xl">
      {/* Terminal Title Bar */}
      <div className="bg-[#1C1A17] px-4 py-3 border-b border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
          </div>
          <div className="h-4 w-[1px] bg-stone-700 mx-1" />
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-stone-100 font-bold tracking-wider">
              {sessionTitle} — {protocol.toUpperCase()} TRAP SESSION
            </span>
            {isActive && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                INTERCEPTING
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterFlagged(!filterFlagged)}
            className={`px-2.5 py-1 rounded text-[11px] font-semibold border transition-colors flex items-center gap-1 ${
              filterFlagged
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'text-stone-300 border-stone-700 hover:bg-stone-800 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3 h-3" />
            <span>{filterFlagged ? 'Show All' : 'Flagged Only'}</span>
          </button>
          <button
            onClick={copyLog}
            className="p-1.5 text-stone-300 hover:text-white rounded hover:bg-stone-800 border border-stone-700 transition-colors"
            title="Copy audit log"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Terminal Subheader */}
      <div className="px-4 py-2 bg-[#181614] border-b border-stone-800/80 text-[11px] text-stone-300 flex items-center justify-between font-mono">
        <div>
          Honeypot Decoy: <span className="text-cyan-300 font-bold">{honeypot}</span> | Sandboxed Shell: /bin/bash
        </div>
        <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Keystroke logger active
        </div>
      </div>

      {/* Terminal Output Body with high-contrast text */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs select-text font-mono min-h-[380px]">
        <div className="text-stone-400 text-[11px] border-b border-stone-800/60 pb-2">
          [Honeypot INTERCEPTOR v3.4] Isolated sandbox container initialized.
          <br />Attacker routed into synthetic decoy shell.
        </div>

        {displayedCommands.map((cmd, index) => (
          <div key={index} className="space-y-1.5">
            <div className="flex items-start gap-2">
              <span className="text-stone-400 text-[10px] select-none pt-0.5 shrink-0">
                [{cmd.timestamp}]
              </span>
              <span className="text-amber-400 font-extrabold select-none shrink-0">$</span>
              <span className="text-white font-bold tracking-wide break-all">
                {cmd.command}
              </span>
              {cmd.flagged && (
                <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-rose-500/25 text-rose-300 border border-rose-500/40 font-bold uppercase tracking-wider shrink-0 select-none">
                  TTP DETECTED
                </span>
              )}
            </div>
            {cmd.output && (
              <div className="pl-6 text-stone-200 whitespace-pre-wrap font-mono text-[11px] leading-relaxed bg-[#1C1917] p-2.5 rounded-md border border-stone-800 shadow-inner">
                {cmd.output}
              </div>
            )}
          </div>
        ))}

        {isActive && (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-stone-400 text-[10px] select-none">
              [{new Date().toTimeString().split(' ')[0]}]
            </span>
            <span className="text-amber-400 font-bold">$</span>
            <span className="inline-block w-2 h-4 bg-amber-400 animate-pulse" />
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Footer */}
      <div className="px-4 py-2 bg-[#181614] border-t border-stone-800 text-[10px] text-stone-400 flex items-center justify-between font-sans">
        <span>Session ID: {sessionTitle}</span>
        <span className="text-emerald-400 font-semibold">
          Deception State: Emulated filesystem live
        </span>
      </div>
    </div>
  );
}
