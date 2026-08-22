'use client';

import Link from 'next/link';
import {
  Music,
  Wrench,
  AlertTriangle,
  Radio,
  Sparkles,
  Upload,
  ArrowLeft
} from 'lucide-react';
import { useState } from 'react';

export default function MusicPage() {
  const [localFile, setLocalFile] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalFile(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] px-4 sm:px-8 py-8 max-w-4xl mx-auto select-none">
      <div className="space-backdrop" />
      <div className="space-twinkle" />

      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-cyan-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)] mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.3)]">
            <Music className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Music Hub</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Wrench className="w-3 h-3" />
                Under Development
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Lossless streaming engine, queue manager, and audio visualizer.
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold transition-all border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Under Development Status Container */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 flex flex-col gap-6 text-slate-300 shadow-2xl animate-fade-in">
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#0d1c33]/70 to-[#0d1c33]/70 border border-amber-500/30 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white mb-1">Octave Music Player is Under Active Development</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We are finalizing the backend stream proxy and Octave lossless playback engine to prevent stream rate
              limiting. Full cloud search and playlist sync will be available in the upcoming update.
            </p>
          </div>
        </div>

        {/* Local Audio Sandbox Player */}
        <div className="p-5 rounded-2xl bg-[#09152a]/80 border border-white/10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white mb-0.5">Local Audio Sandbox Player</h3>
              <p className="text-xs text-slate-400">You can still play local MP3, WAV, or FLAC files directly in your browser.</p>
            </div>
            <label className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/40 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Select File</span>
              <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {localFile && (
            <div className="p-4 rounded-xl bg-black/40 border border-cyan-500/30 flex flex-col gap-3 animate-scale-in">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-semibold text-white truncate">{fileName}</span>
              </div>
              <audio src={localFile} controls className="w-full h-8 accent-cyan-400" autoPlay />
            </div>
          )}
        </div>

        {/* Community Link */}
        <div className="p-4 rounded-2xl bg-[#071324] border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-400">
            For development roadmap and release announcements, join our Discord.
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
