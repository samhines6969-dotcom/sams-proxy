export type Anime = {
  id: number;
  title: { romaji?: string; english?: string; native?: string };
  coverImage: { large: string; medium: string; color: string };
  bannerImage: string | null;
  description: string;
  averageScore: number | null;
  episodes: number | null;
  status: string;
  genres: string[];
  format: string;
  season: string;
  startDate: { year: number | null; month: number | null; day: number | null };
};

export type AnimeDetails = Anime & {
  streamingEpisodes: {
    id: string;
    title: string;
    thumbnail: string | null;
    description: string;
  }[];
};

const ANILIST_URL = 'https://graphql.anilist.co';

async function anilistQuery(query: string, variables: Record<string, unknown>): Promise<any> {
  const res = await fetch(ANILIST_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`AniList API error: ${res.status}`);
  const data = await res.json();
  if (data.errors) throw new Error(data.errors[0]?.message || 'AniList error');
  return data.data;
}

export async function getTrendingAnime(perPage = 20): Promise<Anime[]> {
  const query = `
    query ($perPage: Int) {
      Page(page: 1, perPage: $perPage) {
        media(sort: TRENDING_DESC, type: ANIME) {
          id
          title { romaji english native }
          coverImage { large medium color }
          bannerImage
          description(asHtml: false)
          averageScore
          episodes
          status
          genres
          format
          season
          startDate { year month day }
        }
      }
    }
  `;
  const data = await anilistQuery(query, { perPage });
  return data.Page.media;
}

export async function getPopularAnime(perPage = 20): Promise<Anime[]> {
  const query = `
    query ($perPage: Int) {
      Page(page: 1, perPage: $perPage) {
        media(sort: POPULARITY_DESC, type: ANIME) {
          id
          title { romaji english native }
          coverImage { large medium color }
          bannerImage
          description(asHtml: false)
          averageScore
          episodes
          status
          genres
          format
          season
          startDate { year month day }
        }
      }
    }
  `;
  const data = await anilistQuery(query, { perPage });
  return data.Page.media;
}

export async function searchAnime(searchTerm: string, perPage = 20): Promise<Anime[]> {
  const query = `
    query ($search: String, $perPage: Int) {
      Page(page: 1, perPage: $perPage) {
        media(search: $search, type: ANIME, sort: SEARCH_MATCH) {
          id
          title { romaji english native }
          coverImage { large medium color }
          bannerImage
          description(asHtml: false)
          averageScore
          episodes
          status
          genres
          format
          season
          startDate { year month day }
        }
      }
    }
  `;
  const data = await anilistQuery(query, { search: searchTerm, perPage });
  return data.Page.media;
}

export async function getAnimeDetails(id: number): Promise<AnimeDetails> {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title { romaji english native }
        coverImage { large medium color }
        bannerImage
        description(asHtml: false)
        averageScore
        episodes
        status
        genres
        format
        season
        startDate { year month day }
        streamingEpisodes {
          id
          title
          thumbnail
          description
        }
      }
    }
  `;
  const data = await anilistQuery(query, { id });
  return data.Media;
}

export function getAnimeTitle(title: Anime['title']): string {
  return title.english || title.romaji || title.native || 'Unknown';
}
