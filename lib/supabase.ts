import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not set. The app will not be able to connect to the database.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
  theme: { name: string } | Record<string, unknown>;
  custom_theme: Record<string, unknown> | null;
  background_url: string | null;
  background_blur: number;
  background_opacity: number;
  proxy_engine: string;
  transport: string;
  search_engine: string;
  cloak_title: string | null;
  cloak_favicon: string | null;
  created_at: string;
  updated_at: string;
};

export type Bookmark = {
  id: string;
  user_id: string;
  title: string;
  url: string;
  icon: string | null;
  category: string;
  position: number;
  created_at: string;
};

export type WatchProgress = {
  id: string;
  user_id: string;
  tmdb_id: number;
  media_type: string;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  season: number;
  episode: number;
  current_position: number;
  duration: number;
  progress: number;
  updated_at: string;
};

export type ChatRoom = {
  id: string;
  name: string;
  description: string | null;
  created_by: string | null;
  is_global: boolean;
  created_at: string;
};

export type ChatMessage = {
  id: string;
  room_id: string;
  user_id: string;
  username: string;
  content: string;
  created_at: string;
};
