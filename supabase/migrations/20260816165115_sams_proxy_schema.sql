/*
# Sam's Proxy - Full Database Schema

## Overview
Complete schema for the Sam's Proxy application including user profiles, bookmarks, watch progress, chat rooms, and chat messages.

## New Tables
1. `profiles` - Extends auth.users with username, avatar URL, theme settings, proxy settings, and tab cloak preferences
2. `bookmarks` - User's saved quick links/shortcuts
3. `watch_progress` - Movie/TV/Anime watch progress tracking for "Continue Watching"
4. `chat_rooms` - Chat room definitions (global + custom rooms)
5. `chat_messages` - Real-time chat messages stored per room

## Security
- RLS enabled on all tables
- All tables are owner-scoped (user_id with DEFAULT auth.uid()) except chat_rooms/chat_messages which are shared
- Chat rooms and messages are readable by all authenticated users; writable by authenticated users
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  avatar_url text,
  theme jsonb NOT NULL DEFAULT '{"name":"midnight"}'::jsonb,
  custom_theme jsonb,
  background_url text,
  background_blur integer DEFAULT 0,
  background_opacity integer DEFAULT 100,
  proxy_engine text NOT NULL DEFAULT 'ultraviolet',
  transport text NOT NULL DEFAULT 'wisp',
  search_engine text NOT NULL DEFAULT 'google',
  cloak_title text,
  cloak_favicon text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Bookmarks table
CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  url text NOT NULL,
  icon text,
  category text DEFAULT 'general',
  position integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_bookmarks" ON bookmarks;
CREATE POLICY "select_own_bookmarks" ON bookmarks FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_bookmarks" ON bookmarks;
CREATE POLICY "insert_own_bookmarks" ON bookmarks FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_bookmarks" ON bookmarks;
CREATE POLICY "update_own_bookmarks" ON bookmarks FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_bookmarks" ON bookmarks;
CREATE POLICY "delete_own_bookmarks" ON bookmarks FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Watch progress table
CREATE TABLE IF NOT EXISTS watch_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  tmdb_id integer NOT NULL,
  media_type text NOT NULL,
  title text NOT NULL,
  poster_path text,
  backdrop_path text,
  season integer DEFAULT 1,
  episode integer DEFAULT 1,
  current_position real DEFAULT 0,
  duration real DEFAULT 0,
  progress real DEFAULT 0,
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tmdb_id, media_type)
);

ALTER TABLE watch_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_watch_progress" ON watch_progress;
CREATE POLICY "select_own_watch_progress" ON watch_progress FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_watch_progress" ON watch_progress;
CREATE POLICY "insert_own_watch_progress" ON watch_progress FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_watch_progress" ON watch_progress;
CREATE POLICY "update_own_watch_progress" ON watch_progress FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_watch_progress" ON watch_progress;
CREATE POLICY "delete_own_watch_progress" ON watch_progress FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Chat rooms table
CREATE TABLE IF NOT EXISTS chat_rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  is_global boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_chat_rooms" ON chat_rooms;
CREATE POLICY "select_chat_rooms" ON chat_rooms FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_chat_rooms" ON chat_rooms;
CREATE POLICY "insert_chat_rooms" ON chat_rooms FOR INSERT
  TO authenticated WITH CHECK (true);

-- Chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  username text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_chat_messages" ON chat_messages;
CREATE POLICY "select_chat_messages" ON chat_messages FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "insert_chat_messages" ON chat_messages;
CREATE POLICY "insert_chat_messages" ON chat_messages FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_chat_messages" ON chat_messages;
CREATE POLICY "delete_own_chat_messages" ON chat_messages FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Insert global room if not exists
INSERT INTO chat_rooms (name, description, is_global)
SELECT 'Global', 'The main global chat room', true
WHERE NOT EXISTS (SELECT 1 FROM chat_rooms WHERE is_global = true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_watch_progress_user_id ON watch_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_room_id ON chat_messages(room_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);