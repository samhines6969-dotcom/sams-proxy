export type OctaveTrack = {
  id: string;
  title: string;
  artist: string;
  album: string;
  artwork: string;
  duration: number; // in seconds
  audioUrl: string;
  isLocal?: boolean;
  liked?: boolean;
};

// High-quality full length tracks from open audio sources & Jamendo Open Music API
export const DEFAULT_OCTAVE_LIBRARY: OctaveTrack[] = [
  {
    id: 'octave-1',
    title: 'Midnight City Dream',
    artist: 'Aether & Lofi Chill',
    album: 'Neon Horizon',
    artwork: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=60',
    duration: 198,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
  },
  {
    id: 'octave-2',
    title: 'Cyberpunk Drive 2088',
    artist: 'Synthwave Matrix',
    album: 'Retro Pulse',
    artwork: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=60',
    duration: 215,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=synthwave-80s-110045.mp3',
  },
  {
    id: 'octave-3',
    title: 'Tokyo Rain Alley',
    artist: 'Chilled Cat',
    album: 'Late Night Coffee',
    artwork: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=500&auto=format&fit=crop&q=60',
    duration: 164,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=ambient-piano-amp-strings-10711.mp3',
  },
  {
    id: 'octave-4',
    title: 'Gaming Energy & Beats',
    artist: 'Electro Pulse',
    album: 'Overdrive Level',
    artwork: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60',
    duration: 182,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=electronic-future-beats-117997.mp3',
  },
  {
    id: 'octave-5',
    title: 'Deep Focus Chillout',
    artist: 'Zenith Waves',
    album: 'Calm Spaces',
    artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60',
    duration: 240,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3?filename=chill-abstract-intention-12099.mp3',
  },
  {
    id: 'octave-6',
    title: 'Starlight Acoustic',
    artist: 'Horizon Strings',
    album: 'Golden Hour',
    artwork: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=500&auto=format&fit=crop&q=60',
    duration: 175,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/04/27/audio_30b2a758e7.mp3?filename=acoustic-guitars-ambient-110825.mp3',
  },
];

// Fetch full-length songs from Jamendo / Free Music REST API
export async function searchOctaveMusic(query: string, limit = 20): Promise<OctaveTrack[]> {
  try {
    const res = await fetch(
      `https://api.jamendo.com/v3.0/tracks/?client_id=563d34b7&format=jsonpretty&limit=${limit}&namesearch=${encodeURIComponent(
        query
      )}&include=musicinfo&audioformat=mp32`
    );
    if (!res.ok) throw new Error('Octave API unavailable');
    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      return DEFAULT_OCTAVE_LIBRARY.filter(
        (t) =>
          t.title.toLowerCase().includes(query.toLowerCase()) ||
          t.artist.toLowerCase().includes(query.toLowerCase())
      );
    }
    return data.results.map((r: any) => ({
      id: String(r.id),
      title: r.name || 'Untitled Song',
      artist: r.artist_name || 'Various Artists',
      album: r.album_name || 'Single',
      artwork: r.image || r.album_image || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60',
      duration: r.duration || 180,
      audioUrl: r.audio || r.audiodownload,
    }));
  } catch {
    return DEFAULT_OCTAVE_LIBRARY;
  }
}
