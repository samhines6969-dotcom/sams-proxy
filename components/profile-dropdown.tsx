'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, Settings, LogOut, Cloud, CloudOff } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import type { Profile } from '@/lib/supabase';
import { cn } from '@/lib/utils';

export function ProfileDropdown({ profile }: { profile: Profile | null }) {
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
      >
        <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary text-sm font-bold">
          {profile?.username?.charAt(0).toUpperCase() || 'U'}
        </div>
        <span className="hidden sm:block text-sm font-medium max-w-[100px] truncate">
          {profile?.username || 'User'}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 glass-panel-strong rounded-xl p-2 animate-scale-in z-50">
          <div className="px-3 py-2 border-b border-white/10 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
                {profile?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="min-w-0">
                <div className="font-medium text-sm truncate">{profile?.username || 'User'}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {profile ? (
                    <>
                      <Cloud className="w-3 h-3 text-green-400" />
                      <span>Synced</span>
                    </>
                  ) : (
                    <>
                      <CloudOff className="w-3 h-3" />
                      <span>Not synced</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/settings"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors"
            onClick={() => setOpen(false)}
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          <Link
            href="/settings#account"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors"
            onClick={() => setOpen(false)}
          >
            <User className="w-4 h-4" />
            Account
          </Link>
          <button
            onClick={() => {
              signOut();
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
