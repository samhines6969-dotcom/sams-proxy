'use client';

import { useState, useMemo, useRef } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Play,
  ExternalLink,
  Sparkles,
  Flame,
  Trophy,
  Filter,
  Gamepad2,
  Maximize2
} from 'lucide-react';
import { GAMES } from '@/lib/catalog';
import { BrowserView } from '@/components/browser-view';
import { cn } from '@/lib/utils';

const CATEGORY_PILLS = [
  'All',
  'Action',
  'Racing',
  'Strategy',
  'Sports',
  'Skill',
  'Shooting',
  '2 Player',
  'io',
  'Retro',
  'Puzzle',
  'Idle',
];

export default function GamesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [browserUrl, setBrowserUrl] = useState<string | null>(null);

  const topScrollRef = useRef<HTMLDivElement>(null);
  const sportsScrollRef = useRef<HTMLDivElement>(null);
  const actionScrollRef = useRef<HTMLDivElement>(null);

  const scrollRow = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const offset = direction === 'left' ? -380 : 380;
      ref.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Group games into sections matching Screenshot 3
  const topGames = useMemo(() => GAMES.slice(0, 16), []);
  const sportsGames = useMemo(() => GAMES.filter((g) => g.category === 'Sports' || g.tags.includes('sports')).concat(GAMES.slice(16, 26)).slice(0, 16), []);
  const actionGames = useMemo(() => GAMES.filter((g) => g.category === 'Action' || g.category === 'Racing' || g.tags.includes('shooter')).concat(GAMES.slice(26, 36)).slice(0, 16), []);

  const filteredGames = useMemo(() => {
    return GAMES.filter((g) => {
      const matchesCat =
        activeCategory === 'All' ||
        g.category.toLowerCase() === activeCategory.toLowerCase() ||
        g.tags.some((t) => t.toLowerCase() === activeCategory.toLowerCase());
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, search]);

  const launchGame = (url: string) => {
    setBrowserUrl(url);
  };

  if (browserUrl) {
    return <BrowserView initialUrl={browserUrl} onClose={() => setBrowserUrl(null)} />;
  }

  // Render a horizontal scrollable row with arrows
  const renderGameRow = (
    title: string,
    games: typeof GAMES,
    ref: React.RefObject<HTMLDivElement>,
    badgeType: 'top' | 'pick' = 'top'
  ) => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">{title}</h2>
          <span className="text-xs text-slate-500 font-mono">({games.length})</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => scrollRow(ref, 'left')}
            className="w-7 h-7 rounded-full bg-[#0c1628] hover:bg-[#152747] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollRow(ref, 'right')}
            className="w-7 h-7 rounded-full bg-[#0c1628] hover:bg-[#152747] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto scrollbar-none pb-2 pt-1 px-1 -mx-1 snap-x"
      >
        {games.map((game, idx) => (
          <div
            key={game.id + '-' + idx}
            onClick={() => launchGame(game.url)}
            className="group relative flex-shrink-0 w-36 sm:w-44 h-24 sm:h-28 rounded-2xl bg-gradient-to-br from-[#0e1d38] to-[#081120] border border-white/[0.08] hover:border-blue-500/50 p-2.5 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(59,130,246,0.25)] select-none snap-start"
          >
            {/* Top Badges (matching Screenshot 3) */}
            <div className="flex items-center justify-between w-full">
              <span
                className={cn(
                  'px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider flex items-center gap-1',
                  badgeType === 'top'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                )}
              >
                <Sparkles className="w-2.5 h-2.5" />
                <span>{badgeType === 'top' ? 'Top' : 'Pick'}</span>
              </span>
            </div>

            {/* Game Card Center & Title */}
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                {game.title}
              </h3>
              <p className="text-[10px] text-slate-400 truncate">{game.category}</p>
            </div>

            {/* Play overlay on hover */}
            <div className="absolute inset-0 rounded-2xl bg-blue-600/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg">
                <Play className="w-4 h-4 fill-white ml-0.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] px-4 sm:px-8 py-6 max-w-7xl mx-auto select-none">
      <div className="space-backdrop" />
      <div className="space-twinkle" />

      {/* Top Search Bar (Screenshot 3) */}
      <div className="relative max-w-3xl mx-auto mb-5">
        <div className="relative flex items-center w-full hero-search-pill rounded-2xl p-1.5 sm:p-2">
          <div className="pl-3 text-slate-400">
            <Search className="w-4 h-4 text-blue-400" />
          </div>
          <input
            type="text"
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent px-3 py-1.5 text-xs sm:text-sm text-white outline-none placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Category Pills (Screenshot 3) */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-8 overflow-x-auto scrollbar-none pb-2">
        {CATEGORY_PILLS.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              'px-3.5 py-1 rounded-xl text-xs font-semibold transition-all whitespace-nowrap',
              activeCategory === cat
                ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                : 'bg-[#0a1324]/80 text-slate-400 hover:text-white hover:bg-[#122240] border border-white/[0.06]'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* When filtering / searching, display Grid */}
      {search.trim() || activeCategory !== 'All' ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-white">Results ({filteredGames.length})</h2>
          </div>

          {filteredGames.length === 0 ? (
            <div className="glass-panel rounded-2xl p-12 text-center text-slate-400">
              <Gamepad2 className="w-10 h-10 mx-auto mb-2 text-slate-600" />
              <span>No games matched your search.</span>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {filteredGames.map((game) => (
                <div
                  key={game.id}
                  onClick={() => launchGame(game.url)}
                  className="group relative h-28 rounded-2xl bg-gradient-to-br from-[#0e1d38] to-[#081120] border border-white/[0.08] hover:border-blue-500/50 p-3 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 w-max">
                    ⭐ Top
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                      {game.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 truncate">{game.category}</p>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-blue-600/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Default Sections (Screenshot 3): Top Games, Sports, Action & Racing, All Games */
        <div className="animate-fade-in">
          {renderGameRow('Top Games', topGames, topScrollRef, 'top')}
          {renderGameRow('Sports', sportsGames, sportsScrollRef, 'pick')}
          {renderGameRow('Action & Racing', actionGames, actionScrollRef, 'top')}

          {/* All Games Grid Section */}
          <div className="mt-8 mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-bold text-white">All Games ({GAMES.length})</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {GAMES.map((game) => (
                <div
                  key={game.id}
                  onClick={() => launchGame(game.url)}
                  className="group relative h-28 rounded-2xl bg-gradient-to-br from-[#0e1d38] to-[#081120] border border-white/[0.08] hover:border-blue-500/50 p-3 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 w-max">
                    🎮 Game
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                      {game.title}
                    </h3>
                    <p className="text-[10px] text-slate-400 truncate">{game.category}</p>
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-blue-600/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg">
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
