'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import {
  Compass,
  Gamepad2,
  LayoutGrid,
  Terminal,
  Film,
  Music,
  Wrench,
  Settings,
  Search,
  Zap,
  X,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AuthModal } from '@/components/auth-modal';
import { useCloak } from '@/hooks/use-cloak';

const NAV_TABS = [
  { label: 'Home', href: '/', icon: Compass },
  { label: 'Games', href: '/games', icon: Gamepad2 },
  { label: 'Apps', href: '/apps', icon: LayoutGrid },
  { label: 'VM Labs', href: '/vm', icon: Terminal, highlight: true },
  { label: 'Movies', href: '/movies', icon: Film },
  { label: 'Music', href: '/music', icon: Music },
  { label: 'Tools', href: '/tools', icon: Wrench },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickQuery, setQuickQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useCloak();

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (searchOpen) return;
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 400);
  };

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      router.push(`/?q=${encodeURIComponent(quickQuery.trim())}`);
      setSearchOpen(false);
      setQuickQuery('');
      setIsHovered(false);
    }
  };

  const isVisible = isHovered || searchOpen;

  return (
    <>
      {/* Top Hover Trigger Zone */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="fixed top-0 left-0 right-0 h-16 z-[9999] pointer-events-auto flex items-start justify-center pt-1"
      >
        {/* Subtle Top Nudge Pill (Visible when navbar is hidden) */}
        <div
          className={cn(
            'flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#071324]/95 border border-cyan-500/40 text-[10px] font-semibold text-cyan-300 shadow-[0_4px_15px_rgba(6,182,212,0.25)] backdrop-blur-md transition-all duration-300 cursor-pointer select-none',
            isVisible ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-90 translate-y-0 hover:opacity-100 hover:scale-105'
          )}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>Hover for Navbar</span>
          <ChevronDown className="w-3 h-3 text-cyan-400" />
        </div>

        {/* Top Floating Glass Capsule Navbar (Slides down on hover) */}
        <header
          className={cn(
            'fixed top-3 left-0 right-0 flex items-center justify-center px-3 select-none transition-all duration-300 ease-out pointer-events-none',
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-16 pointer-events-none'
          )}
        >
          <nav className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-2 rounded-full bg-[#081222]/95 backdrop-blur-2xl border border-cyan-500/40 shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(6,182,212,0.2)] transition-all max-w-5xl w-full justify-between">
            
            {/* Brand Logo with Sam's Cat image */}
            <Link
              href="/"
              className="flex items-center gap-2.5 shrink-0 pl-1 group"
              title="Sam's Pr0xy"
            >
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-cyan-400/50 shadow-[0_0_12px_rgba(6,182,212,0.4)] group-hover:scale-105 transition-transform bg-[#0a1528]">
                <img
                  src="/samscat.png"
                  alt="Sam's Cat"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs sm:text-sm font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors flex items-center gap-1">
                  Sam&apos;s Pr0xy
                </span>
                <span className="text-[9px] font-bold text-cyan-400/80 uppercase tracking-wider">
                  Scramjet v3
                </span>
              </div>
            </Link>

            {/* Navigation Pill Tabs */}
            <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-none py-0.5 px-1">
              {NAV_TABS.map((tab) => {
                const active =
                  pathname === tab.href || (tab.href !== '/' && pathname.startsWith(tab.href));
                const Icon = tab.icon;

                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={cn(
                      'relative flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap',
                      active
                        ? 'bg-gradient-to-r from-cyan-500/25 to-blue-600/25 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                        : tab.highlight
                        ? 'text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.08] border border-transparent'
                    )}
                  >
                    <Icon className={cn('w-3.5 h-3.5 sm:w-4 sm:h-4', active ? 'text-cyan-400' : '')} />
                    <span className="hidden md:inline">{tab.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right Action buttons */}
            <div className="flex items-center gap-1.5 shrink-0 pr-1">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-slate-300 hover:text-white transition-all',
                  searchOpen ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'hover:bg-white/10'
                )}
                title="Quick Search"
              >
                {searchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              </button>

              <Link
                href="/vm"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all hover:scale-105"
              >
                <Zap className="w-3 h-3 fill-white" />
                <span>VM Labs</span>
              </Link>
            </div>
          </nav>

          {/* Quick Search Popover */}
          {searchOpen && (
            <div className="absolute top-16 w-full max-w-lg px-4 pointer-events-auto animate-scale-in">
              <form
                onSubmit={handleQuickSearch}
                className="relative flex items-center w-full p-2 rounded-2xl bg-[#09152a]/95 backdrop-blur-xl border border-cyan-500/40 shadow-2xl"
              >
                <Search className="w-4 h-4 text-cyan-400 ml-2 mr-2 shrink-0" />
                <input
                  type="text"
                  value={quickQuery}
                  onChange={(e) => setQuickQuery(e.target.value)}
                  placeholder="Search the web or enter URL..."
                  className="flex-1 bg-transparent text-xs sm:text-sm text-white outline-none placeholder:text-slate-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors"
                >
                  Go
                </button>
              </form>
            </div>
          )}
        </header>
      </div>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
}
