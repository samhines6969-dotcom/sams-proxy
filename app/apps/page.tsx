'use client';

import { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { BrowserView } from '@/components/browser-view';
import { OFFICIAL_BRAND_ICONS } from '@/components/brand-icons';
import { cn } from '@/lib/utils';

type AppTile = {
  id: string;
  name: string;
  category: string;
  url: string;
  iconKey: string;
  desc: string;
};

const RICH_APPS: AppTile[] = [
  { id: 'gdocs', name: 'Google Docs', category: 'Productivity', url: 'https://docs.google.com', iconKey: 'gdocs', desc: 'Create and edit documents' },
  { id: 'firefox', name: 'Firefox Browser', category: 'Web', url: 'https://developer.puter.com/labs/firefox-wasm/', iconKey: 'firefox', desc: 'HeyPuter WASM Firefox browser instance' },
  { id: 'youtube', name: 'YouTube', category: 'Media', url: 'https://youtube.com', iconKey: 'youtube', desc: 'Watch videos and music' },
  { id: 'chatgpt', name: 'ChatGPT', category: 'AI', url: 'https://chatgpt.com', iconKey: 'chatgpt', desc: 'AI assistant and coding' },
  { id: 'discord', name: 'Discord', category: 'Social', url: 'https://discord.com/app', iconKey: 'discord', desc: 'Talk, chat, and hang out' },
  { id: 'github', name: 'GitHub', category: 'Dev', url: 'https://github.com', iconKey: 'github', desc: 'Host and review code' },
  { id: 'reddit', name: 'Reddit', category: 'Social', url: 'https://reddit.com', iconKey: 'reddit', desc: 'Dive into anything' },
  { id: 'characterai', name: 'Character.AI', category: 'AI', url: 'https://character.ai', iconKey: 'characterai', desc: 'Chat with AI characters' },
  { id: 'spotify', name: 'Spotify', category: 'Media', url: 'https://open.spotify.com', iconKey: 'spotify', desc: 'Stream music and podcasts' },
  { id: 'tiktok', name: 'TikTok', category: 'Social', url: 'https://tiktok.com', iconKey: 'tiktok', desc: 'Short-form mobile videos' },
  { id: 'twitch', name: 'Twitch', category: 'Media', url: 'https://twitch.tv', iconKey: 'twitch', desc: 'Live stream gaming' },
  { id: 'x', name: 'X / Twitter', category: 'Social', url: 'https://x.com', iconKey: 'x', desc: 'Latest updates & breaking news' },
  { id: 'snapchat', name: 'Snapchat', category: 'Social', url: 'https://web.snapchat.com', iconKey: 'snapchat', desc: 'Snap and chat with friends' },
  { id: 'netflix', name: 'Netflix', category: 'Media', url: 'https://netflix.com', iconKey: 'netflix', desc: 'Movies and TV shows' },
  { id: 'hulu', name: 'Hulu', category: 'Media', url: 'https://hulu.com', iconKey: 'hulu', desc: 'Stream TV and movies' },
  { id: 'vscode', name: 'VS Code Web', category: 'Dev', url: 'https://vscode.dev', iconKey: 'vscode', desc: 'Code editing anywhere' },
  { id: 'replit', name: 'Replit', category: 'Dev', url: 'https://replit.com', iconKey: 'replit', desc: 'Build software online' },
  { id: 'coolmath', name: 'Coolmath Games', category: 'Games', url: 'https://coolmathgames.com', iconKey: 'coolmath', desc: 'Fun logic and puzzle games' },
  { id: 'poki', name: 'Poki', category: 'Games', url: 'https://poki.com', iconKey: 'poki', desc: 'Free online browser games' },
  { id: 'y8', name: 'Y8 Games', category: 'Games', url: 'https://y8.com', iconKey: 'y8', desc: 'Classic flash and web games' },
  { id: 'scratch', name: 'Scratch', category: 'Dev', url: 'https://scratch.mit.edu', iconKey: 'scratch', desc: 'Learn to code & create games' },
  { id: 'w3schools', name: 'W3Schools', category: 'Dev', url: 'https://w3schools.com', iconKey: 'w3schools', desc: 'Web development tutorials' },
  { id: 'gmail', name: 'Gmail', category: 'Productivity', url: 'https://mail.google.com', iconKey: 'gmail', desc: 'Secure Google email' },
  { id: 'gdrive', name: 'Google Drive', category: 'Productivity', url: 'https://drive.google.com', iconKey: 'gdrive', desc: 'Cloud storage and files' },
  { id: 'nvidia', name: 'GeForce NOW', category: 'Games', url: 'https://play.geforcenow.com', iconKey: 'nvidia', desc: 'Cloud gaming platform' },
  { id: 'xbox', name: 'Xbox Cloud Gaming', category: 'Games', url: 'https://xbox.com/play', iconKey: 'xbox', desc: 'Play Xbox games in browser' },
  { id: 'hdtoday', name: 'HD Today Cinema', category: 'Media', url: 'https://hdtoday.tv', iconKey: 'hdtoday', desc: 'HD movie streams' },
  { id: 'pinterest', name: 'Pinterest', category: 'Social', url: 'https://pinterest.com', iconKey: 'pinterest', desc: 'Visual inspiration and boards' },
  { id: 'soundcloud', name: 'SoundCloud', category: 'Media', url: 'https://soundcloud.com', iconKey: 'soundcloud', desc: 'Listen to artists and tracks' },
  { id: 'espn', name: 'ESPN Sports', category: 'Sports', url: 'https://espn.com', iconKey: 'espn', desc: 'Live scores and sports news' },
  { id: 'duolingo', name: 'Duolingo', category: 'Education', url: 'https://duolingo.com', iconKey: 'duolingo', desc: 'Learn languages for free' },
  { id: 'weather', name: 'Yahoo Weather', category: 'Tools', url: 'https://weather.com', iconKey: 'weather', desc: 'Local radar and forecasts' },
  { id: 'casino', name: 'Roulette & Casino', category: 'Games', url: 'https://247roulette.org', iconKey: 'casino', desc: 'Classic casino simulator' },
  { id: 'facebook', name: 'Facebook', category: 'Social', url: 'https://facebook.com', iconKey: 'facebook', desc: 'Connect with friends' },
];

export default function AppsPage() {
  const [search, setSearch] = useState('');
  const [browserUrl, setBrowserUrl] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return RICH_APPS;
    return RICH_APPS.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.desc.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [search]);

  const launchApp = (url: string) => {
    setBrowserUrl(url);
  };

  if (browserUrl) {
    return <BrowserView initialUrl={browserUrl} onClose={() => setBrowserUrl(null)} />;
  }

  return (
    <div className="relative min-h-[calc(100vh-6rem)] px-4 sm:px-8 py-4 max-w-7xl mx-auto select-none">
      <div className="space-backdrop" />
      <div className="space-twinkle" />

      {/* Top Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-8">
        <div className="relative flex items-center w-full hero-search-pill rounded-2xl p-1.5 sm:p-2">
          <div className="pl-3 text-slate-400">
            <Search className="w-4 h-4 text-cyan-400" />
          </div>
          <input
            type="text"
            placeholder="Search official web apps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent px-3 py-1.5 text-xs sm:text-sm text-white outline-none placeholder:text-slate-500 font-medium"
          />
          <button
            onClick={() => {
              const url = prompt('Enter custom app URL:');
              if (url) launchApp(url);
            }}
            className="w-7 h-7 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors mr-1"
            title="Add Custom App"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* macOS Style Official Brand App Icons Grid */}
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3 sm:gap-4 animate-fade-in">
        {filtered.map((app) => {
          const iconMeta = OFFICIAL_BRAND_ICONS[app.iconKey] || {
            iconUrl: 'https://cdn.simpleicons.org/google',
            bg: 'bg-slate-900/60 border-slate-700/40',
            color: '#FFFFFF',
          };

          return (
            <button
              key={app.id}
              type="button"
              onClick={() => launchApp(app.url)}
              className="group relative flex flex-col items-center justify-center p-3 rounded-2xl bg-[#091426]/90 hover:bg-[#0f2240] border border-white/[0.08] hover:border-cyan-500/50 shadow-md hover:shadow-[0_10px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(6,182,212,0.25)] transition-all duration-200 hover:-translate-y-1 text-center"
            >
              {/* macOS Style Squircle Container */}
              <div
                className={cn(
                  'w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center p-2.5 mb-2 transition-transform duration-200 group-hover:scale-105 border backdrop-blur-md shadow-inner',
                  iconMeta.bg
                )}
              >
                <img
                  src={iconMeta.iconUrl}
                  alt={app.name}
                  className="w-full h-full object-contain filter drop-shadow"
                  loading="lazy"
                />
              </div>

              {/* App Title */}
              <span className="text-[11px] sm:text-xs font-bold text-slate-200 group-hover:text-cyan-300 truncate w-full transition-colors">
                {app.name}
              </span>

              {/* Category */}
              <span className="text-[9px] text-slate-500 font-medium truncate w-full">
                {app.category}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
