'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Search,
  Star,
  Film,
  Tv,
  Play,
  Clock,
  Info,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Clapperboard
} from 'lucide-react';
import { MediaCard } from '@/components/media-card';
import { PlayerModal } from '@/components/player-modal';
import {
  getTrendingMovies,
  getTrendingTV,
  getTopRated,
  getMovieGenres,
  getMoviesByGenre,
  searchTMDB,
  getPosterUrl,
  type TMDBMovie,
  type TMDBGenre,
} from '@/lib/tmdb';
import { useWatchProgress } from '@/hooks/use-watch-progress';
import { cn } from '@/lib/utils';

// Fallback high-profile mock movies in case TMDB offline
const FALLBACK_TOP10 = [
  { id: 1, title: 'Spider-Man: Brand New Day', year: '2026', rating: '7.9', type: 'Movie', poster: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg' },
  { id: 2, title: 'The Odyssey', year: '2026', rating: '8.0', type: 'Movie', poster: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg' },
  { id: 3, title: 'Minions & Monsters', year: '2026', rating: '7.4', type: 'Movie', poster: 'https://image.tmdb.org/t/p/w500/wWba3TaojhK7NdycRhoQpsG0FaH.jpg' },
  { id: 4, title: 'The Last House', year: '2026', rating: '6.9', type: 'Movie', poster: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg' },
  { id: 5, title: 'The End of Oak Street', year: '2026', rating: '6.7', type: 'Movie', poster: 'https://image.tmdb.org/t/p/w500/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg' },
  { id: 6, title: 'The Invite', year: '2026', rating: '7.4', type: 'Movie', poster: 'https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg' },
  { id: 7, title: 'Obsession', year: '2026', rating: '8.2', type: 'Movie', poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg' },
  { id: 8, title: "Don't Say Good Luck", year: '2026', rating: '6.9', type: 'Movie', poster: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg' },
];

export default function MoviesPage() {
  const [tab, setTab] = useState<'movies' | 'tv' | 'top'>('movies');
  const [items, setItems] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TMDBMovie[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<TMDBMovie | null>(null);
  const top10ScrollRef = useRef<HTMLDivElement>(null);

  const loadMedia = useCallback(async () => {
    setLoading(true);
    try {
      let data: TMDBMovie[] = [];
      if (tab === 'movies') data = await getTrendingMovies();
      else if (tab === 'tv') data = await getTrendingTV();
      else data = await getTopRated();
      setItems(data);
    } catch (e) {
      console.error('TMDB load error, fallback ready:', e);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const results = await searchTMDB(searchQuery);
        setSearchResults(results);
      } catch (e) {
        console.error('Search failed:', e);
      } finally {
        setSearching(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const scrollTop10 = (direction: 'left' | 'right') => {
    if (top10ScrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      top10ScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const heroMovie = items[0] || {
    id: 939243,
    title: 'Spider-Man: Brand New Day',
    overview:
      'Fighting crime full-time as Spider-Man in a world that doesn’t remember him—and the pressure of seeing his old friends move on without him—sparks a change in Peter Parker he may not have the power to control.',
    backdrop_path: '/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    vote_average: 7.9,
    media_type: 'movie',
  };

  const displayList = searchQuery.trim() ? searchResults : items;

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] px-4 sm:px-8 py-6 max-w-7xl mx-auto select-none">
      <div className="space-backdrop" />
      <div className="space-twinkle" />

      {/* Top Header & Search (Screenshot 5) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-white">
          <Clapperboard className="w-5 h-5 text-blue-400" />
          <h1 className="text-xl font-bold tracking-tight">Cinema</h1>
        </div>

        {/* Cinema Search Bar */}
        <div className="relative w-full sm:w-80">
          <div className="relative flex items-center w-full bg-[#0d1b33]/80 border border-white/10 rounded-2xl px-3 py-1.5 focus-within:border-blue-500/50 transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Search movies & TV..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-white outline-none placeholder:text-slate-500"
            />
          </div>
        </div>
      </div>

      {/* Featured Hero Banner (matching Screenshot 5) */}
      {!searchQuery && (
        <div className="relative w-full rounded-3xl overflow-hidden mb-8 border border-white/10 bg-[#081120] shadow-2xl group">
          {/* Hero Backdrop Image / Gradient */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{
              backgroundImage: heroMovie.backdrop_path
                ? `url(${getPosterUrl(heroMovie.backdrop_path, 'original')})`
                : `url(https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1600&q=80)`,
            }}
          />
          {/* Rich Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020810] via-[#020810]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020810] via-[#020810]/50 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 p-6 sm:p-10 md:p-14 max-w-2xl flex flex-col items-start justify-end min-h-[360px] sm:min-h-[420px]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-400">
                FEATURED · MOVIE
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
              {heroMovie.title || heroMovie.name}
            </h2>

            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-3">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{heroMovie.vote_average ? heroMovie.vote_average.toFixed(1) : '7.9'}</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed mb-6 max-w-xl">
              {heroMovie.overview ||
                'Fighting crime full-time as Spider-Man in a world that doesn’t remember him—and the pressure of seeing his old friends move on without him—sparks a change in Peter Parker.'}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedMedia(heroMovie)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-black text-xs font-bold shadow-lg transition-all hover:scale-105"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Play Now</span>
              </button>
              <button
                onClick={() => setSelectedMedia(heroMovie)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-semibold backdrop-blur-md transition-all"
              >
                <Info className="w-4 h-4" />
                <span>See more</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* "TOP 10 Today" Carousel with Numbered Rank Badges (Screenshot 5) */}
      {!searchQuery && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">TOP 10 Today</h2>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => scrollTop10('left')}
                className="w-7 h-7 rounded-full bg-[#0c1628] hover:bg-[#152747] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTop10('right')}
                className="w-7 h-7 rounded-full bg-[#0c1628] hover:bg-[#152747] border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={top10ScrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-none pb-3 pt-1 px-1 -mx-1 snap-x"
          >
            {(items.length > 0 ? items.slice(0, 10) : FALLBACK_TOP10).map((item, idx) => {
              const rank = idx + 1;
              const title = 'title' in item ? item.title : (item as any).name;
              const poster =
                'poster_path' in item && item.poster_path
                  ? getPosterUrl(item.poster_path, 'w500')
                  : (item as any).poster || 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg';
              const rating =
                'vote_average' in item && item.vote_average
                  ? item.vote_average.toFixed(1)
                  : (item as any).rating || '7.5';

              return (
                <div
                  key={(item as any).id || idx}
                  onClick={() =>
                    setSelectedMedia({
                      id: (item as any).id,
                      title: title || '',
                      overview: (item as any).overview || '',
                      poster_path: (item as any).poster_path || '',
                      backdrop_path: (item as any).backdrop_path || '',
                      vote_average: Number(rating),
                      genre_ids: [],
                      media_type: 'movie',
                    })
                  }
                  className="group relative flex-shrink-0 w-36 sm:w-44 cursor-pointer select-none snap-start"
                >
                  {/* Poster Container */}
                  <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-[#0c162a] border border-white/[0.08] group-hover:border-blue-500/50 transition-all duration-300 group-hover:-translate-y-1.5 shadow-lg group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(59,130,246,0.25)]">
                    <img
                      src={poster}
                      alt={title || 'Movie'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top rating badge */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1 text-[10px] font-bold text-amber-300">
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      <span>{rating}</span>
                    </div>

                    {/* Big Bold Rank Number Overlay (Screenshot 5) */}
                    <div className="absolute -bottom-2 -left-1 text-6xl sm:text-7xl font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] opacity-90 stroke-black select-none pointer-events-none">
                      {rank}
                    </div>

                    {/* Hover play icon */}
                    <div className="absolute inset-0 bg-blue-600/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black shadow-xl">
                        <Play className="w-4 h-4 fill-black ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Title & Metadata */}
                  <div className="mt-2 px-1">
                    <h3 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                      {title}
                    </h3>
                    <p className="text-[10px] text-slate-500">2026 · Movie</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Catalog Grid */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-bold text-white">
            {searchQuery ? `Search Results (${displayList.length})` : 'Popular Movies & Shows'}
          </h2>
        </div>

        {displayList.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center text-slate-400">
            <Film className="w-10 h-10 mx-auto mb-2 text-slate-600" />
            <span>No titles found.</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {displayList.map((item) => (
              <MediaCard key={item.id} item={item} onClick={() => setSelectedMedia(item)} />
            ))}
          </div>
        )}
      </div>

      {/* Player Modal */}
      {selectedMedia && (
        <PlayerModal
          tmdbId={selectedMedia.id}
          mediaType={(selectedMedia.media_type || 'movie') as 'movie' | 'tv'}
          title={selectedMedia.title || selectedMedia.name || 'Title'}
          posterPath={selectedMedia.poster_path}
          backdropPath={selectedMedia.backdrop_path}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </div>
  );
}
