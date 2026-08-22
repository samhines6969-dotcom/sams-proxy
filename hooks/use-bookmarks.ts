'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabase, type Bookmark } from '@/lib/supabase';
import { useAuth } from '@/context/auth-context';

export function useBookmarks() {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookmarks = useCallback(async () => {
    if (!user) {
      setBookmarks([]);
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', user.id)
      .order('position', { ascending: true });
    if (error) {
      console.error('Error loading bookmarks:', error);
    } else {
      setBookmarks(data as Bookmark[]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadBookmarks();
  }, [loadBookmarks]);

  const addBookmark = useCallback(async (title: string, url: string, icon?: string, category?: string) => {
    if (!user) return;
    const { error } = await supabase
      .from('bookmarks')
      .insert({ user_id: user.id, title, url, icon, category: category || 'general', position: bookmarks.length });
    if (error) console.error('Error adding bookmark:', error);
    else loadBookmarks();
  }, [user, bookmarks.length, loadBookmarks]);

  const removeBookmark = useCallback(async (id: string) => {
    if (!user) return;
    const { error } = await supabase.from('bookmarks').delete().eq('id', id);
    if (error) console.error('Error removing bookmark:', error);
    else loadBookmarks();
  }, [user, loadBookmarks]);

  return { bookmarks, loading, addBookmark, removeBookmark, loadBookmarks };
}
