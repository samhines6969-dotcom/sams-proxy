'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { Shield, Check, ArrowRight, Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function VerificationModal({
  onVerified,
  isOpen,
}: {
  onVerified?: () => void;
  isOpen?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const verified = localStorage.getItem('sams_verified');
      if (!verified && isOpen !== false) {
        setOpen(true);
      }
    }
  }, [isOpen]);

  const handleCapSolve = () => {
    if (isVerified) return;
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 700);
  };

  const handleContinue = () => {
    if (!isVerified || !agreed || submitting) return;
    setSubmitting(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sams_verified', 'true');
    }
    setTimeout(() => {
      setOpen(false);
      setSubmitting(false);
      if (onVerified) onVerified();
    }, 300);
  };

  if (!open) return null;

  return (
    <>
      {/* Load TryCap CDN Script from https://trycap.dev */}
      <Script src="https://cdn.jsdelivr.net/npm/cap-widget" strategy="lazyOnload" />

      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#020612]/95 backdrop-blur-2xl animate-fade-in">
        <div className="relative w-full max-w-[420px] mx-auto text-center flex flex-col items-center animate-scale-in">
          {/* Holographic Shield Icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#09152a] border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-5 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <Shield className="w-8 h-8" />
          </div>

          {/* Eyebrow */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold tracking-[0.2em] uppercase mb-3 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-3 h-3" />
            <span>SAM&apos;S PR0XY GATE</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            Verify to Continue
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-[320px] mb-6">
            A quick proof-of-work check keeps the network safe. Agree to terms and enter the unblocked hub.
          </p>

          {/* Cap Widget / Interactive Proof of Work Button */}
          <div className="w-full max-w-[320px] mb-5">
            <button
              type="button"
              onClick={handleCapSolve}
              className={cn(
                'w-full py-3.5 px-4 rounded-xl border flex items-center justify-between transition-all select-none shadow-md',
                isVerified
                  ? 'bg-[#091f3a] border-cyan-500/50 text-cyan-200'
                  : 'bg-[#081324] border-white/10 hover:border-cyan-500/40 text-slate-300 hover:bg-[#0c1c33]'
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-6 h-6 rounded-md border flex items-center justify-center transition-all',
                    isVerified
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400'
                      : isVerifying
                      ? 'border-cyan-400 bg-cyan-500/10'
                      : 'border-white/20 bg-black/30'
                  )}
                >
                  {isVerifying ? (
                    <div className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                  ) : isVerified ? (
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                  ) : null}
                </div>
                <span className="text-sm font-semibold">
                  {isVerifying ? 'Solving Proof-of-Work...' : isVerified ? 'Cap Verified' : 'Verify via Cap (trycap.dev)'}
                </span>
              </div>
              <span className="text-[10px] font-bold tracking-wider text-cyan-400 uppercase px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                CAP
              </span>
            </button>
          </div>

          {/* Checkbox agreement */}
          <label className="flex items-start gap-3 max-w-[320px] text-left cursor-pointer select-none mb-6 group">
            <div className="relative flex items-center mt-0.5">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="sr-only peer"
              />
              <div
                className={cn(
                  'w-5 h-5 rounded-md border flex items-center justify-center transition-all',
                  agreed
                    ? 'bg-cyan-600 border-cyan-500 text-white shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                    : 'bg-[#081324] border-white/20 group-hover:border-white/40'
                )}
              >
                {agreed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
            </div>
            <span className="text-xs text-slate-400 leading-snug">
              I agree to the{' '}
              <a href="/tos" target="_blank" className="text-cyan-400 hover:underline">
                Terms of Service
              </a>
              ,{' '}
              <a href="/privacy" target="_blank" className="text-cyan-400 hover:underline">
                Privacy Policy
              </a>
              , and{' '}
              <a href="/tos" target="_blank" className="text-cyan-400 hover:underline">
                DMCA Safe Harbor
              </a>
              .
            </span>
          </label>

          {/* Continue button */}
          <button
            type="button"
            onClick={handleContinue}
            disabled={!isVerified || !agreed || submitting}
            className={cn(
              'flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg',
              isVerified && agreed && !submitting
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/30 cursor-pointer hover:scale-[1.02]'
                : 'bg-[#0c182c] text-slate-500 border border-white/5 cursor-not-allowed opacity-60'
            )}
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
            <span>Enter Sam&apos;s Pr0xy</span>
          </button>

          {/* Status text */}
          <p className="text-xs text-cyan-400/90 mt-4 min-h-[1.2rem] font-medium">
            {isVerified && agreed
              ? 'Verification complete. Click Enter to continue.'
              : isVerified
              ? 'Cap verified. Please accept terms to continue.'
              : ''}
          </p>

          {/* Footer */}
          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
            <Star className="w-3 h-3 text-cyan-400 fill-cyan-400/30" />
            <span>Secure Gate · Sam&apos;s Pr0xy · trycap.dev</span>
          </div>
        </div>
      </div>
    </>
  );
}
