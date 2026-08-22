'use client';

import { useState } from 'react';
import { Plus, X, ExternalLink } from 'lucide-react';
import { useBookmarks } from '@/hooks/use-bookmarks';
import { useAuth } from '@/context/auth-context';
import { toast } from 'sonner';

export function BookmarksGrid({ onNavigate }: { onNavigate: (url: string) => void }) {
  const { bookmarks, loading, addBookmark, removeBookmark } = useBookmarks();
  const { user } = useAuth();
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !url.trim()) return;
    const fullUrl = url.match(/^https?:\/\//) ? url : `https://${url}`;
    addBookmark(title, fullUrl);
    setTitle('');
    setUrl('');
    setShowAdd(false);
    toast.success('Bookmark added');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Quick Links</h2>
        {user && (
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/15 border border-primary/30 text-primary text-sm hover:bg-primary/25 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        )}
      </div>

      {showAdd && (
        <form onSubmit={handleAdd} className="glass-panel rounded-xl p-4 mb-4 animate-slide-up">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-sm outline-none focus:border-primary/50"
            />
            <input
              type="text"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-sm outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex gap-2 mt-3">
            <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Save
            </button>
            <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-20 glass-panel rounded-xl animate-pulse" />
          ))}
        </div>
      ) : bookmarks.length === 0 ? (
        <div className="glass-panel rounded-xl p-8 text-center text-muted-foreground text-sm">
          {user ? 'No bookmarks yet. Add some quick links to get started!' : 'Sign in to save your bookmarks and sync them across devices.'}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {bookmarks.map((bm) => (
            <div
              key={bm.id}
              className="group glass-panel rounded-xl p-3 hover:border-primary/30 transition-all cursor-pointer relative"
              onClick={() => onNavigate(bm.url)}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0">
                  <ExternalLink className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium truncate">{bm.title}</span>
              </div>
              <div className="text-xs text-muted-foreground truncate">{bm.url.replace(/^https?:\/\//, '')}</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeBookmark(bm.id);
                }}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
