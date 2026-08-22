'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabase, type WatchProgress } from '@/lib/supabase';
import { useAuth } from '@/context/auth-context';

export type PlayerEvent = {
  type: 'timeupdate' | 'play' | 'pause' | 'ended' | 'seeked';
  currentTime: number;
  duration: number;
};

export function useWatchProgress() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<WatchProgress[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProgress = useCallback(async () => {
    if (!user) {
      setProgress([]);
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from('watch_progress')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });
    if (error) {
      console.error('Error loading watch progress:', error);
    } else {
      setProgress(data as WatchProgress[]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const saveProgress = useCallback(async (item: {
    tmdb_id: number;
    media_type: string;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    season?: number;
    episode?: number;
    current_position: number;
    duration: number;
  }) => {
    if (!user) return;
    const progressPercent = item.duration > 0 ? (item.current_position / item.duration) * 100 : 0;
    const { error } = await supabase
      .from('watch_progress')
      .upsert({
        user_id: user.id,
        tmdb_id: item.tmdb_id,
        media_type: item.media_type,
        title: item.title,
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        season: item.season || 1,
        episode: item.episode || 1,
        current_position: item.current_position,
        duration: item.duration,
        progress: progressPercent,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,tmdb_id,media_type' });
    if (error) console.error('Error saving watch progress:', error);
    else loadProgress();
  }, [user, loadProgress]);

  return { progress, loading, saveProgress, loadProgress };
}
