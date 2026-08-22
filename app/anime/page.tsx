'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Flame, TrendingUp, Play, Star, X } from 'lucide-react';
import { getTrendingAnime, getPopularAnime, searchAnime, getAnimeDetails, getAnimeTitle, type Anime, type AnimeDetails } from '@/lib/anilist';
import { cn } from '@/lib/utils';

export default function AnimePage() {
  const [tab, setTab] = useState<'trending' | 'popular'>('trending');
  const [items, setItems] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Anime[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState<AnimeDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const loadTab = useCallback(async (t: 'trending' | 'popular') => {
    setLoading(true);
    try {
      const data = t === 'trending' ? await getTrendingAnime() : await getPopularAnime();
      setItems(data);
    } catch (e) {
      console.error('Failed to load anime:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTab(tab);
  }, [tab, loadTab]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const results = await searchAnime(searchQuery);
        setSearchResults(results);
      } catch (e) {
        console.error('Search failed:', e);
      } finally {
        setSearching(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const openDetails = async (anime: Anime) => {
    setShowDetails(true);
    setDetailsLoading(true);
    try {
      const details = await getAnimeDetails(anime.id);
      setSelectedAnime(details);
    } catch (e) {
      console.error('Failed to load details:', e);
    } finally {
      setDetailsLoading(false);
    }
  };

  const displayItems = searchQuery.trim() ? searchResults : items;

  return (
    <div className="max-w-[1600px] mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 glow-text">Anime</h1>

      <div className="relative mb-4 sm:mb-6">
        <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search anime..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-xl glass-panel border border-white/10 outline-none focus:border-primary/50 transition-colors text-sm sm:text-base"
        />
      </div>

      {!searchQuery && (
        <div className="flex items-center gap-2 mb-4 sm:mb-6 overflow-x-auto scrollbar-thin pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
          {[
            { id: 'trending', label: 'Trending', icon: Flame },
            { id: 'popular', label: 'Popular', icon: TrendingUp },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id as 'trending' | 'popular')}
              className={cn(
                'flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0',
                tab === id
                  ? 'bg-primary/15 text-primary border border-primary/30'
                  : 'glass-panel text-muted-foreground hover:text-foreground border border-transparent'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      )}

      {loading || searching ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="rounded-xl glass-panel animate-pulse aspect-[2/3]" />
          ))}
        </div>
      ) : displayItems.length === 0 ? (
        <div className="glass-panel rounded-xl p-8 sm:p-12 text-center text-muted-foreground">No anime found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4">
          {displayItems.map((anime) => (
            <div
              key={anime.id}
              onClick={() => openDetails(anime)}
              className="group cursor-pointer rounded-xl overflow-hidden glass-panel hover:border-primary/40 transition-all"
            >
              <div className="aspect-[2/3] relative overflow-hidden bg-black/30">
                <img
                  src={anime.coverImage.large}
                  alt={getAnimeTitle(anime.title)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/90 mx-auto">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                  </div>
                </div>
                {anime.averageScore && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/60 text-xs">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {Math.round(anime.averageScore / 10)}
                  </div>
                )}
              </div>
              <div className="p-2 sm:p-3">
                <h3 className="text-xs sm:text-sm font-medium truncate">{getAnimeTitle(anime.title)}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{anime.format}</span>
                  {anime.episodes && <span>&middot; {anime.episodes} eps</span>}
                  <span className={cn('ml-auto capitalize', anime.status === 'RELEASING' ? 'text-green-400' : '')}>
                    {anime.status === 'RELEASING' ? 'Airing' : anime.status === 'FINISHED' ? 'Done' : anime.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fade-in" onClick={() => setShowDetails(false)}>
          <div className="w-full max-w-3xl glass-panel-strong rounded-2xl overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto scrollbar-thin" onClick={(e) => e.stopPropagation()}>
            {detailsLoading || !selectedAnime ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
              </div>
            ) : (
              <>
                <div className="relative h-32 sm:h-48 overflow-hidden">
                  {selectedAnime.bannerImage ? (
                    <img src={selectedAnime.bannerImage} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <img src={selectedAnime.coverImage.large} alt="" className="w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <button
                    onClick={() => setShowDetails(false)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-3 sm:p-5">
                  <div className="flex gap-3 sm:gap-4">
                    <img src={selectedAnime.coverImage.large} alt="" className="w-16 h-24 sm:w-24 sm:h-36 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0">
                      <h2 className="text-lg sm:text-xl font-bold">{getAnimeTitle(selectedAnime.title)}</h2>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedAnime.genres.map((g) => (
                          <span key={g} className="px-2 py-0.5 rounded-md bg-primary/15 text-primary text-xs">{g}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                        <span>{selectedAnime.format}</span>
                        {selectedAnime.episodes && <span>{selectedAnime.episodes} episodes</span>}
                        {selectedAnime.averageScore && (
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {Math.round(selectedAnime.averageScore / 10)}/10
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-3 sm:mt-4 line-clamp-6">{selectedAnime.description.replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '')}</p>

                  {selectedAnime.streamingEpisodes && selectedAnime.streamingEpisodes.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold mb-2">Episodes</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto scrollbar-thin">
                        {selectedAnime.streamingEpisodes.map((ep, i) => (
                          <div key={ep.id} className="flex gap-2 p-2 rounded-lg glass-panel hover:border-primary/30 transition-colors cursor-pointer">
                            {ep.thumbnail && <img src={ep.thumbnail} alt="" className="w-16 h-10 rounded object-cover shrink-0" />}
                            <div className="min-w-0">
                              <div className="text-sm font-medium truncate">Ep {i + 1}: {ep.title}</div>
                              <div className="text-xs text-muted-foreground truncate">{ep.description.replace(/<[^>]+>/g, '').slice(0, 60)}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
