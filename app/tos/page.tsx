'use client';

import Link from 'next/link';
import { Shield, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';

export default function TosPage() {
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
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Terms of Service</h1>
            <p className="text-xs text-slate-400">Last updated: August 2026</p>
          </div>
        </div>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl flex flex-col gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using <strong>Sam&apos;s Pr0xy</strong>, you acknowledge that you have read, understood, and
            agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this
            service.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            2. Permitted Use &amp; Web Freedom
          </h2>
          <p>
            Sam&apos;s Pr0xy is provided as a client-side proxy, sandboxing, and web utility intended for educational
            research, unblocking public resources, web application testing, and private browsing. You agree to use the
            service in compliance with all applicable local, state, and international laws.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            3. Prohibited Activities
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
            <li>Engaging in denial of service (DoS/DDoS) attacks or automated abuse against third-party networks.</li>
            <li>Distributing malicious software, viruses, phishing kits, or destructive payloads.</li>
            <li>Unauthorized intrusion or exploitation of external servers.</li>
            <li>Violating intellectual property rights or copyright without proper authorization.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            4. Disclaimer of Warranties
          </h2>
          <p>
            Sam&apos;s Pr0xy is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any
            kind, whether express or implied. We do not guarantee uninterrupted availability, error-free operation, or
            that third-party content fetched via proxy will always render without modification.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            5. Community &amp; Support
          </h2>
          <p>
            For inquiries, DMCA notices, or community discussion, join our official community on Discord at{' '}
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
