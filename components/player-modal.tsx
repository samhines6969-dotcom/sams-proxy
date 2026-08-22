'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getVidkingEmbedUrl, getTVDetails, getSeasonDetails, getBackdropUrl, type TMDBDetails, type TMDBSeasonDetails } from '@/lib/tmdb';
import { useWatchProgress } from '@/hooks/use-watch-progress';

type PlayerModalProps = {
  tmdbId: number;
  mediaType: 'movie' | 'tv';
  title: string;
  posterPath: string | null;
  backdropPath: string | null;
  onClose: () => void;
};

export function PlayerModal({ tmdbId, mediaType, title, posterPath, backdropPath, onClose }: PlayerModalProps) {
  const [details, setDetails] = useState<TMDBDetails | null>(null);
  const [seasonDetails, setSeasonDetails] = useState<TMDBSeasonDetails | null>(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [loading, setLoading] = useState(true);
  const { saveProgress } = useWatchProgress();

  useEffect(() => {
    if (mediaType === 'tv') {
      getTVDetails(tmdbId)
        .then((d) => {
          setDetails(d);
          setSelectedSeason(d.seasons?.find((s) => s.season_number > 0)?.season_number || 1);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [tmdbId, mediaType]);

  useEffect(() => {
    if (mediaType === 'tv' && selectedSeason) {
      getSeasonDetails(tmdbId, selectedSeason)
        .then(setSeasonDetails)
        .catch(console.error);
    }
  }, [tmdbId, mediaType, selectedSeason]);

  // Player event listener for progress tracking
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (!event.data || typeof event.data !== 'object') return;
      const { type, currentTime, duration } = event.data;
      if (type === 'timeupdate' || type === 'pause' || type === 'seeked' || type === 'ended') {
        saveProgress({
          tmdb_id: tmdbId,
          media_type: mediaType,
          title,
          poster_path: posterPath,
          backdrop_path: backdropPath,
          season: mediaType === 'tv' ? selectedSeason : 1,
          episode: mediaType === 'tv' ? selectedEpisode : 1,
          current_position: currentTime || 0,
          duration: duration || 0,
        });
      }
    }
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [tmdbId, mediaType, title, posterPath, backdropPath, selectedSeason, selectedEpisode, saveProgress]);

  const embedUrl = getVidkingEmbedUrl(tmdbId, mediaType, mediaType === 'tv' ? selectedSeason : undefined, mediaType === 'tv' ? selectedEpisode : undefined);

  const nextEpisode = useCallback(() => {
    if (seasonDetails && selectedEpisode < seasonDetails.episodes.length) {
      setSelectedEpisode(selectedEpisode + 1);
    }
  }, [seasonDetails, selectedEpisode]);

  const prevEpisode = useCallback(() => {
    if (selectedEpisode > 1) {
      setSelectedEpisode(selectedEpisode - 1);
    }
  }, [selectedEpisode]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-fade-in" onClick={onClose}>
      <div className="w-full max-w-5xl glass-panel-strong rounded-2xl overflow-hidden animate-scale-in max-h-[95vh] overflow-y-auto scrollbar-thin" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/10">
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-bold truncate">{title}</h2>
            {mediaType === 'tv' && details && (
              <p className="text-sm text-muted-foreground">
                Season {selectedSeason} &middot; Episode {selectedEpisode}
              </p>
            )}
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player */}
        <div className="relative aspect-video bg-black">
          <iframe
            src={embedUrl}
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title}
          />
        </div>

        {/* Season/Episode picker for TV */}
        {mediaType === 'tv' && details && (
          <div className="p-3 sm:p-4 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
              <label className="text-xs sm:text-sm font-medium">Season:</label>
              <select
                value={selectedSeason}
                onChange={(e) => {
                  setSelectedSeason(Number(e.target.value));
                  setSelectedEpisode(1);
                }}
                className="px-2 sm:px-3 py-1.5 rounded-lg bg-black/30 border border-white/10 text-xs sm:text-sm outline-none focus:border-primary/50"
              >
                {details.seasons?.filter((s) => s.season_number > 0).map((s) => (
                  <option key={s.id} value={s.season_number} className="bg-background">
                    {s.name} ({s.episode_count} eps)
                  </option>
                ))}
              </select>
            </div>

            {seasonDetails && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 max-h-28 sm:max-h-32 overflow-y-auto scrollbar-thin">
                {seasonDetails.episodes.map((ep) => (
                  <button
                    key={ep.id}
                    onClick={() => setSelectedEpisode(ep.episode_number)}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm transition-colors ${
                      selectedEpisode === ep.episode_number
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10'
                    }`}
                  >
                    E{ep.episode_number}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 mt-2 sm:mt-3">
              <button
                onClick={prevEpisode}
                disabled={selectedEpisode <= 1}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <button
                onClick={nextEpisode}
                disabled={!seasonDetails || selectedEpisode >= seasonDetails.episodes.length}
                className="flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-30"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
