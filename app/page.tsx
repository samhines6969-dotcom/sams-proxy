'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  Plus,
  Shield,
  Clock,
  ChevronDown
} from 'lucide-react';
import { BrowserView } from '@/components/browser-view';
import { OFFICIAL_BRAND_ICONS } from '@/components/brand-icons';
import { useProxy } from '@/context/proxy-context';
import { buildSearchUrl, isUrl, SEARCH_ENGINES } from '@/lib/types';
import { cn } from '@/lib/utils';

// Official Shortcuts placed directly under the search bar
const BRAND_SHORTCUTS = [
  { name: 'Instagram', iconKey: 'instagram', url: 'https://instagram.com' },
  { name: 'Spotify', iconKey: 'spotify', url: 'https://open.spotify.com' },
  { name: 'TikTok', iconKey: 'tiktok', url: 'https://tiktok.com' },
  { name: 'Discord', iconKey: 'discord', url: 'https://discord.com/app' },
  { name: 'YouTube', iconKey: 'youtube', url: 'https://youtube.com' },
];

export default function HomePage() {
  const router = useRouter();
  const { searchEngine, setSearchEngine } = useProxy();
  const [query, setQuery] = useState('');
  const [browserUrl, setBrowserUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [engineDropdownOpen, setEngineDropdownOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      setQuery(q);
      launchBrowser(q);
    }
  }, []);

  // Ctrl+K keyboard shortcut to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('sams-search-input')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const launchBrowser = (input: string) => {
    const targetUrl = isUrl(input) || input.match(/^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/)
      ? (input.match(/^https?:\/\//) ? input : `https://${input}`)
      : buildSearchUrl(searchEngine, input);
    setBrowserUrl(targetUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) launchBrowser(query);
  };

  if (browserUrl) {
    return <BrowserView initialUrl={browserUrl} onClose={() => setBrowserUrl(null)} />;
  }

  return (
    <div className="relative min-h-[calc(100vh-2rem)] flex flex-col justify-between px-4 sm:px-6 md:px-12 py-4 select-none">
      <div className="space-backdrop" />
      <div className="space-twinkle" />

      {/* Center Hero: Sam's Pr0xy Branding, Search Pill & Brand Shortcuts */}
      <div className="flex flex-col items-center justify-center text-center my-auto py-12 max-w-3xl mx-auto w-full animate-fade-in">
        {/* Cat Logo & Brand Header */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.4)] bg-[#071324] hover:scale-105 transition-transform">
            <img src="/samscat.png" alt="Sam's Cat" className="w-full h-full object-cover" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white glow-text">
                Sam&apos;s Pr0xy
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-[9px] font-extrabold text-cyan-300 tracking-wider uppercase">
                Scramjet v3
              </span>
            </div>
            <p className="text-xs text-slate-400">Next-generation private web unblocker &amp; cloud hub.</p>
          </div>
        </div>

        {/* Large Glowing Search Pill */}
        <form onSubmit={handleSubmit} className="w-full max-w-2xl px-2 my-5">
          <div className="relative flex items-center w-full hero-search-pill rounded-2xl p-2 sm:p-2.5">
            <div className="flex items-center pl-3 text-slate-400">
              <Search className="w-5 h-5 text-cyan-400" />
            </div>

            <input
              id="sams-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the web or enter any URL..."
              className="flex-1 bg-transparent px-4 py-2 text-sm sm:text-base text-white outline-none placeholder:text-slate-500 font-medium"
              autoFocus
            />

            {/* Ctrl+K badge */}
            <div className="hidden sm:flex items-center pr-3">
              <kbd className="px-2 py-0.5 text-[11px] font-semibold text-slate-400 bg-white/5 border border-white/10 rounded-md font-mono">
                Ctrl+K
              </kbd>
            </div>
          </div>
        </form>

        {/* Official Brand Shortcuts Under Search Bar (Instagram, Spotify, TikTok, Discord, YouTube, +) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-6 max-w-xl">
          {BRAND_SHORTCUTS.map((item) => {
            const iconMeta = OFFICIAL_BRAND_ICONS[item.iconKey] || {
              iconUrl: 'https://cdn.simpleicons.org/google',
              bg: 'bg-slate-900/60 border-slate-700/40',
            };

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => launchBrowser(item.url)}
                className={cn(
                  'group flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border backdrop-blur-md shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 bg-[#09152a]/90 hover:bg-[#0f2242] border-white/10 hover:border-cyan-500/50'
                )}
                title={item.name}
              >
                <div className="w-4 h-4 shrink-0">
                  <img src={iconMeta.iconUrl} alt={item.name} className="w-full h-full object-contain filter drop-shadow" />
                </div>
                <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </span>
              </button>
            );
          })}

          <button
            onClick={() => router.push('/apps')}
            className="flex items-center justify-center w-9 h-9 rounded-2xl bg-[#09152a]/90 hover:bg-[#0f2244] border border-white/10 text-slate-400 hover:text-white transition-all shadow-sm hover:scale-105"
            title="Browse All Apps"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Engine / Proxy Selector Pill Dropdown */}
        <div className="relative inline-block">
          <button
            type="button"
            onClick={() => setEngineDropdownOpen(!engineDropdownOpen)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#081a33]/90 hover:bg-[#0e284f] border border-cyan-500/30 text-xs font-semibold text-cyan-300 transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            <Shield className="w-3.5 h-3.5 text-cyan-400" />
            <span className="capitalize">{searchEngine} (Scramjet Mode)</span>
            <ChevronDown className="w-3 h-3 text-cyan-400" />
          </button>

          {engineDropdownOpen && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 py-1 rounded-2xl bg-[#071324] border border-white/10 backdrop-blur-xl shadow-2xl z-50 animate-scale-in">
              {SEARCH_ENGINES.map((engine) => (
                <button
                  key={engine.value}
                  type="button"
                  onClick={() => {
                    setSearchEngine(engine.value as any);
                    setEngineDropdownOpen(false);
                  }}
                  className={cn(
                    'w-full px-3 py-2 text-left text-xs font-medium transition-colors flex items-center justify-between',
                    searchEngine === engine.value
                      ? 'bg-cyan-600/20 text-cyan-300'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <span>{engine.label}</span>
                  {searchEngine === engine.value && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status Bar */}
      <footer className="w-full max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 py-3 border-t border-white/[0.06] text-xs text-slate-500">
        <div className="flex items-center gap-3 sm:gap-4 font-medium">
          <span className="text-cyan-400 font-bold">Sam&apos;s Pr0xy</span>
          <span className="text-slate-600">·</span>
          <a
            href="https://discord.gg/pEPWXe7jap"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400/90 hover:text-cyan-300 font-semibold transition-colors flex items-center gap-1"
          >
            <span>Discord Community</span>
          </a>
          <span className="text-slate-600">·</span>
          <Link href="/tos" className="hover:text-slate-300 transition-colors">
            Terms of Service
          </Link>
          <span className="text-slate-600">·</span>
          <Link href="/privacy" className="hover:text-slate-300 transition-colors">
            Privacy Policy
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 ml-auto">
          <div className="flex items-center gap-1 text-emerald-400">
            <Shield className="w-3.5 h-3.5" />
            <span>Active &amp; Secure</span>
          </div>
          <span className="text-slate-600">·</span>
          <div className="flex items-center gap-1.5 font-mono text-slate-400">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{currentTime || '03:13 PM'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
