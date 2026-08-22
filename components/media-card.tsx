'use client';

import { Star, Play } from 'lucide-react';
import { getPosterUrl } from '@/lib/tmdb';
import type { TMDBMovie } from '@/lib/tmdb';

export function MediaCard({ item, onClick }: { item: TMDBMovie; onClick?: (item: TMDBMovie) => void }) {
  const title = item.title || item.name || 'Unknown';
  const year = (item.release_date || item.first_air_date || '').split('-')[0];
  const mediaType = item.media_type || (item.title ? 'movie' : 'tv');

  return (
    <div
      onClick={() => onClick?.(item)}
      className="group cursor-pointer relative rounded-xl overflow-hidden glass-panel hover:border-primary/40 transition-all"
    >
      <div className="aspect-[2/3] relative overflow-hidden bg-black/30">
        {item.poster_path ? (
          <img
            src={getPosterUrl(item.poster_path, 'w300')}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <Play className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/90 mx-auto">
            <Play className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
          </div>
        </div>
      </div>
      <div className="p-2 sm:p-3">
        <h3 className="text-xs sm:text-sm font-medium truncate">{title}</h3>
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          {year && <span>{year}</span>}
          <span className="capitalize">{mediaType}</span>
          {item.vote_average > 0 && (
            <span className="flex items-center gap-0.5 ml-auto">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              {item.vote_average.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
