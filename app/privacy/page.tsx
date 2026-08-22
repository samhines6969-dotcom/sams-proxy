'use client';

import Link from 'next/link';
import { Shield, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-8 max-w-4xl mx-auto select-none">
      <div className="space-backdrop" />
      <div className="space-twinkle" />

      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all mb-4 border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Privacy Policy</h1>
            <p className="text-xs text-slate-400">Your privacy is fundamental to our architecture.</p>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl flex flex-col gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            1. Zero Logging Architecture
          </h2>
          <p>
            <strong>Sam&apos;s Pr0xy</strong> is built with privacy-first principles. We do not store, log, track, or sell your
            browsing history, IP addresses, search queries, DNS lookups, or visited URLs.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            2. Local Client Storage
          </h2>
          <p>
            All user settings, cloak disguises (tab title and favicon cloaking), proxy engine preferences, and favorites
            are saved exclusively in your browser&apos;s local storage (`localStorage`). You can purge this data at any
            time directly from the Settings page.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            3. Proof-of-Work Verification (TryCap)
          </h2>
          <p>
            To prevent automated bot abuse without collecting personal identifiers, we utilize non-intrusive Proof-of-Work
            challenges powered by <strong>Cap</strong> (`trycap.dev`). This runs computational verification entirely in
            your browser without tracking cookies or fingerprinting.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            4. Third-Party Websites &amp; Proxied Content
          </h2>
          <p>
            When browsing external websites through Sam&apos;s Pr0xy, those third-party websites receive requests via our
            proxy gateway rather than your direct IP address. However, third-party sites maintain their own privacy policies
            governing any information you submit directly to them.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            5. Contact Us
          </h2>
          <p>
            If you have questions regarding this Privacy Policy, connect with us on Discord:{' '}
            <a
              href="https://discord.gg/pEPWXe7jap"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 underline hover:text-cyan-300 font-semibold"
            >
              https://discord.gg/pEPWXe7jap
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
