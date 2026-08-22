const TMDB_API_KEY = '7569806b1d77ab6d8bd10f97b01843ce';
const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTY5ODA2YjFkNzdhYjZkOGJkMTBmOTdiMDE4NDNjZSIsIm5iZiI6MTc4NjQ4Mjc4Ny4yNDg5OTk4LCJzdWIiOiI2YTdiOTA2MzFlNGFkYWQ1ZmJhZTBjNTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HW7mSMgEq9hYhKSyNVNspwT--aZdcCrdUHA3d0ROn-0';
const TMDB_BASE = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export type TMDBMovie = {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  genre_ids: number[];
  media_type?: string;
};

export type TMDBGenre = {
  id: number;
  name: string;
};

export type TMDBSeason = {
  id: number;
  season_number: number;
  episode_count: number;
  name: string;
  overview: string;
  poster_path: string | null;
};

export type TMDBEpisode = {
  id: number;
  episode_number: number;
  name: string;
  overview: string;
  still_path: string | null;
  runtime: number | null;
  air_date: string;
};

export type TMDBSeasonDetails = {
  id: number;
  season_number: number;
  episodes: TMDBEpisode[];
  name: string;
  overview: string;
};

export type TMDBDetails = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  genres: TMDBGenre[];
  seasons?: TMDBSeason[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  runtime?: number;
  episode_run_time?: number[];
  tagline?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  status: string;
};

async function tmdbFetch(path: string): Promise<any> {
  const res = await fetch(`${TMDB_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`);
  return res.json();
}

export async function getTrendingMovies(): Promise<TMDBMovie[]> {
  const data = await tmdbFetch('/trending/movie/week?language=en-US');
  return data.results || [];
}

export async function getTrendingTV(): Promise<TMDBMovie[]> {
  const data = await tmdbFetch('/trending/tv/week?language=en-US');
  return data.results || [];
}

export async function getTopRated(): Promise<TMDBMovie[]> {
  const data = await tmdbFetch('/movie/top_rated?language=en-US&page=1');
  return data.results || [];
}

export async function getMovieGenres(): Promise<TMDBGenre[]> {
  const data = await tmdbFetch('/genre/movie/list?language=en');
  return data.genres || [];
}

export async function getTVGenres(): Promise<TMDBGenre[]> {
  const data = await tmdbFetch('/genre/tv/list?language=en');
  return data.genres || [];
}

export async function searchTMDB(query: string): Promise<TMDBMovie[]> {
  const data = await tmdbFetch(`/search/multi?query=${encodeURIComponent(query)}&language=en-US&page=1`);
  return (data.results || []).filter((r: TMDBMovie) => r.media_type === 'movie' || r.media_type === 'tv');
}

export async function getMovieDetails(id: number): Promise<TMDBDetails> {
  return tmdbFetch(`/movie/${id}?language=en-US`);
}

export async function getTVDetails(id: number): Promise<TMDBDetails> {
  return tmdbFetch(`/tv/${id}?language=en-US`);
}

export async function getSeasonDetails(tvId: number, seasonNumber: number): Promise<TMDBSeasonDetails> {
  return tmdbFetch(`/tv/${tvId}/season/${seasonNumber}?language=en-US`);
}

export async function getMoviesByGenre(genreId: number): Promise<TMDBMovie[]> {
  const data = await tmdbFetch(`/discover/movie?with_genres=${genreId}&language=en-US&sort_by=popularity.desc&page=1`);
  return data.results || [];
}

export function getPosterUrl(path: string | null, size: 'w200' | 'w300' | 'w500' | 'original' = 'w300'): string {
  if (!path) return '/placeholder.svg';
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size: 'w780' | 'w1280' | 'original' = 'w1280'): string {
  if (!path) return '/placeholder.svg';
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

export function getVidkingEmbedUrl(tmdbId: number, mediaType: 'movie' | 'tv', season?: number, episode?: number): string {
  if (mediaType === 'movie') {
    return `https://www.vidking.net/embed/movie/${tmdbId}?color=3b82f6&autoPlay=true`;
  }
  return `https://www.vidking.net/embed/tv/${tmdbId}/${season || 1}/${episode || 1}?color=3b82f6&autoPlay=true&nextEpisode=true&episodeSelector=true`;
}
