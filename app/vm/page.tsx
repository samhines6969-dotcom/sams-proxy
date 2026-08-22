'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Terminal,
  Cpu,
  ExternalLink,
  Shield,
  Zap,
  Wrench,
  AlertTriangle,
  ArrowRight,
  Code2,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function VMPage() {
  const [activeTab, setActiveTab] = useState<'status' | 'roadmap'>('status');

  const handleLaunchPuter = () => {
    window.open('https://puter.com/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-6 max-w-5xl mx-auto flex flex-col gap-6 select-none">
      <div className="space-backdrop" />
      <div className="space-twinkle" />

      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-cyan-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
            <Terminal className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">VM Labs</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Wrench className="w-3 h-3" />
                Under Development
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              In-browser WebAssembly virtual machines and cloud desktop integrations.
            </p>
          </div>
        </div>

        {/* Dedicated Puter Launcher */}
        <button
          onClick={handleLaunchPuter}
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Launch Puter Desktop</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Under Development Status Container */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 flex flex-col gap-6 text-slate-300 shadow-2xl animate-fade-in">
        
        {/* Notice Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#0d1c33]/70 to-[#0d1c33]/70 border border-amber-500/30 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white mb-1">In-Browser Virtual Machines are Under Development</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We are currently re-architecting the in-browser x86/WASM virtualization core and Wisp networking relay to
              ensure zero frame-blocking errors and maximum stability. In the meantime, you can launch full cloud
              desktop environments using the official Puter button above.
            </p>
          </div>
        </div>

        {/* Live Lab Telemetry */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-[#09152a]/80 border border-white/10">
            <div className="flex items-center gap-2 text-cyan-400 mb-1 text-xs font-semibold">
              <Cpu className="w-4 h-4" />
              <span>Puter Web Desktop</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Multi-window desktop, terminal, and IDE environment.</p>
            <button
              onClick={handleLaunchPuter}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 hover:text-cyan-200"
            >
              <span>Launch in Dedicated Window</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[#09152a]/80 border border-white/10">
            <div className="flex items-center gap-2 text-amber-400 mb-1 text-xs font-semibold">
              <Code2 className="w-4 h-4" />
              <span>Firefox WASM Sandbox</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Gecko browser engine compiled to WebAssembly with Wisp relay.</p>
            <span className="text-[11px] font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
              Compilation in progress
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#09152a]/80 border border-white/10">
            <div className="flex items-center gap-2 text-purple-400 mb-1 text-xs font-semibold">
              <Layers className="w-4 h-4" />
              <span>x86 Linux Emulation</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Alpine, Debian, and FreeDOS ISO boot images with local persistence.</p>
            <span className="text-[11px] font-semibold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-lg border border-purple-500/20">
              Under development
            </span>
          </div>
        </div>

        {/* Community Updates CTA */}
        <div className="p-4 rounded-2xl bg-[#071324] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-400">
            Want early access to WASM VM builds? Join our community on Discord.
          </span>
          <a
            href="https://discord.gg/pEPWXe7jap"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/40 border border-cyan-500/40 text-cyan-300 font-bold transition-all"
          >
            Join Discord (discord.gg/pEPWXe7jap)
          </a>
        </div>
      </div>
    </div>
  );
}
