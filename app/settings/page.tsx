'use client';

import { useState, useRef, useEffect } from 'react';
import { Palette, Network, EyeOff, Cloud, Download, Upload, Check, Loader2, Image as ImageIcon, Shield } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import { useProxy } from '@/context/proxy-context';
import { useAuth } from '@/context/auth-context';
import { THEMES, PROXY_ENGINES, TRANSPORTS, SEARCH_ENGINES, CLOAK_PRESETS, type ThemeName, type CustomTheme, type ProxyEngine, type Transport, type SearchEngine } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type SettingsTab = 'theme' | 'proxy' | 'cloak' | 'account';

export default function SettingsPage() {
  const { themeName, customTheme, backgroundUrl, backgroundBlur, backgroundOpacity, setTheme, setCustomTheme, setBackground } = useTheme();
  const { engine, transport, searchEngine, setEngine, setTransport, setSearchEngine } = useProxy();
  const { user, profile, signOut, refreshProfile } = useAuth();
  const [tab, setTab] = useState<SettingsTab>('theme');
  const [saving, setSaving] = useState(false);

  // Custom theme state
  const [customGradFrom, setCustomGradFrom] = useState('#1a1a2e');
  const [customGradVia, setCustomGradVia] = useState('#16213e');
  const [customGradTo, setCustomGradTo] = useState('#0f3460');
  const [customAccent, setCustomAccent] = useState('#3b82f6');
  const [customCardOpacity, setCustomCardOpacity] = useState(60);
  const [customBorderOpacity, setCustomBorderOpacity] = useState(10);

  // Background state
  const [bgUrl, setBgUrl] = useState(backgroundUrl || '');
  const [bgBlur, setBgBlur] = useState(backgroundBlur);
  const [bgOpacity, setBgOpacity] = useState(backgroundOpacity);

  // Cloak state
  const [cloakTitle, setCloakTitle] = useState(profile?.cloak_title || '');
  const [cloakFavicon, setCloakFavicon] = useState(profile?.cloak_favicon || '');

  useEffect(() => {
    if (profile) {
      setCloakTitle(profile.cloak_title || '');
      setCloakFavicon(profile.cloak_favicon || '');
    }
  }, [profile]);

  const applyCustomTheme = () => {
    const theme: CustomTheme = {
      gradientFrom: customGradFrom,
      gradientVia: customGradVia,
      gradientTo: customGradTo,
      cardOpacity: customCardOpacity,
      borderOpacity: customBorderOpacity,
      accent: customAccent,
    };
    setCustomTheme(theme);
    toast.success('Custom theme applied');
  };

  const applyBackground = () => {
    setBackground(bgUrl || null, bgBlur, bgOpacity);
    toast.success('Background updated');
  };

  const applyCloak = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ cloak_title: cloakTitle || null, cloak_favicon: cloakFavicon || null, updated_at: new Date().toISOString() })
        .eq('id', user.id);
      if (error) throw error;
      await refreshProfile();
      toast.success('Tab cloak applied');
    } catch (err) {
      toast.error('Failed to apply cloak');
    } finally {
      setSaving(false);
    }
  };

  const removeCloak = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ cloak_title: null, cloak_favicon: null, updated_at: new Date().toISOString() })
        .eq('id', user.id);
      if (error) throw error;
      setCloakTitle('');
      setCloakFavicon('');
      document.title = "Sam's Proxy";
      await refreshProfile();
      toast.success('Tab cloak removed');
    } catch (err) {
      toast.error('Failed to remove cloak');
    } finally {
      setSaving(false);
    }
  };

  const exportData = async () => {
    if (!user) return;
    try {
      const [bookmarksRes, progressRes] = await Promise.all([
        supabase.from('bookmarks').select('*').eq('user_id', user.id),
        supabase.from('watch_progress').select('*').eq('user_id', user.id),
      ]);
      const data = {
        profile,
        bookmarks: bookmarksRes.data,
        watchProgress: progressRes.data,
        exportedAt: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sams-proxy-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Data exported');
    } catch (err) {
      toast.error('Failed to export data');
    }
  };

  const importData = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (data.bookmarks) {
        for (const bm of data.bookmarks) {
          await supabase.from('bookmarks').insert({
            user_id: user.id,
            title: bm.title,
            url: bm.url,
            icon: bm.icon,
            category: bm.category || 'general',
            position: bm.position || 0,
          });
        }
      }
      if (data.watchProgress) {
        for (const wp of data.watchProgress) {
          await supabase.from('watch_progress').upsert({
            user_id: user.id,
            tmdb_id: wp.tmdb_id,
            media_type: wp.media_type,
            title: wp.title,
            poster_path: wp.poster_path,
            backdrop_path: wp.backdrop_path,
            season: wp.season,
            episode: wp.episode,
            current_position: wp.current_position,
            duration: wp.duration,
            progress: wp.progress,
          }, { onConflict: 'user_id,tmdb_id,media_type' });
        }
      }
      toast.success('Data imported successfully');
    } catch (err) {
      toast.error('Failed to import data - invalid file');
    }
  };

  const tabs = [
    { id: 'theme' as SettingsTab, label: 'Theme', icon: Palette },
    { id: 'proxy' as SettingsTab, label: 'Proxy', icon: Network },
    { id: 'cloak' as SettingsTab, label: 'Tab Cloak', icon: EyeOff },
    { id: 'account' as SettingsTab, label: 'Account', icon: Cloud },
  ];

  return (
    <div className="max-w-[1000px] mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 glow-text">Settings</h1>

      {/* Tab selector */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-thin pb-2 -mx-3 px-3 sm:mx-0 sm:px-0">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              'flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0',
              tab === id
                ? 'bg-primary/15 text-primary border border-primary/30'
                : 'glass-panel text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Theme Settings */}
      {tab === 'theme' && (
        <div className="space-y-6 animate-fade-in">
          {/* Preset themes */}
          <div className="glass-panel rounded-xl p-4 sm:p-5">
            <h2 className="text-base sm:text-lg font-semibold mb-3">Preset Themes</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {THEMES.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => setTheme(theme.name as ThemeName)}
                  className={cn(
                    'p-3 rounded-xl text-left transition-all',
                    themeName === theme.name
                      ? 'glass-panel-strong border border-primary/40'
                      : 'glass-panel hover:border-primary/20'
                  )}
                >
                  <div className="text-sm font-medium">{theme.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{theme.description}</div>
                  {themeName === theme.name && (
                    <Check className="w-4 h-4 text-primary mt-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Custom theme creator */}
          <div className="glass-panel rounded-xl p-4 sm:p-5">
            <h2 className="text-base sm:text-lg font-semibold mb-3">Custom Theme Creator</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Gradient From</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={customGradFrom} onChange={(e) => setCustomGradFrom(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent" />
                  <input type="text" value={customGradFrom} onChange={(e) => setCustomGradFrom(e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-sm font-mono outline-none focus:border-primary/50" />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Gradient Via</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={customGradVia} onChange={(e) => setCustomGradVia(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent" />
                  <input type="text" value={customGradVia} onChange={(e) => setCustomGradVia(e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-sm font-mono outline-none focus:border-primary/50" />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Gradient To</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={customGradTo} onChange={(e) => setCustomGradTo(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent" />
                  <input type="text" value={customGradTo} onChange={(e) => setCustomGradTo(e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-sm font-mono outline-none focus:border-primary/50" />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Accent</label>
                <div className="flex items-center gap-2">
                  <input type="color" value={customAccent} onChange={(e) => setCustomAccent(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer bg-transparent" />
                  <input type="text" value={customAccent} onChange={(e) => setCustomAccent(e.target.value)} className="flex-1 px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-sm font-mono outline-none focus:border-primary/50" />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Card Opacity: {customCardOpacity}%</label>
                <input type="range" min={0} max={100} value={customCardOpacity} onChange={(e) => setCustomCardOpacity(Number(e.target.value))} className="w-full accent-primary" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Border Opacity: {customBorderOpacity}%</label>
                <input type="range" min={0} max={100} value={customBorderOpacity} onChange={(e) => setCustomBorderOpacity(Number(e.target.value))} className="w-full accent-primary" />
              </div>
            </div>
            <button onClick={applyCustomTheme} className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Apply Custom Theme
            </button>
          </div>

          {/* Custom background */}
          <div className="glass-panel rounded-xl p-4 sm:p-5">
            <h2 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Custom Background
            </h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Background Image URL</label>
                <input
                  type="text"
                  value={bgUrl}
                  onChange={(e) => setBgUrl(e.target.value)}
                  placeholder="https://example.com/wallpaper.jpg"
                  className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-sm outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Blur: {bgBlur}px</label>
                <input type="range" min={0} max={20} value={bgBlur} onChange={(e) => setBgBlur(Number(e.target.value))} className="w-full accent-primary" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Opacity: {bgOpacity}%</label>
                <input type="range" min={0} max={100} value={bgOpacity} onChange={(e) => setBgOpacity(Number(e.target.value))} className="w-full accent-primary" />
              </div>
              <button onClick={applyBackground} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                Apply Background
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Proxy Settings */}
      {tab === 'proxy' && (
        <div className="space-y-4 sm:space-y-6 animate-fade-in">
          <div className="glass-panel rounded-xl p-4 sm:p-5">
            <h2 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
              <Network className="w-4 h-4" /> Proxy Engine
            </h2>
            <div className="space-y-2">
              {PROXY_ENGINES.map((e) => (
                <button
                  key={e.value}
                  onClick={() => setEngine(e.value as ProxyEngine)}
                  className={cn(
                    'w-full p-3 rounded-xl text-left transition-all flex items-start gap-3',
                    engine === e.value ? 'glass-panel-strong border border-primary/40' : 'glass-panel hover:border-primary/20'
                  )}
                >
                  <div className={cn('w-5 h-5 rounded-full border-2 shrink-0 mt-0.5', engine === e.value ? 'border-primary bg-primary' : 'border-white/20')} />
                  <div>
                    <div className="text-sm font-medium">{e.label}</div>
                    <div className="text-xs text-muted-foreground">{e.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4 sm:p-5">
            <h2 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Transport
            </h2>
            <div className="space-y-2">
              {TRANSPORTS.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTransport(t.value as Transport)}
                  className={cn(
                    'w-full p-3 rounded-xl text-left transition-all flex items-start gap-3',
                    transport === t.value ? 'glass-panel-strong border border-primary/40' : 'glass-panel hover:border-primary/20'
                  )}
                >
                  <div className={cn('w-5 h-5 rounded-full border-2 shrink-0 mt-0.5', transport === t.value ? 'border-primary bg-primary' : 'border-white/20')} />
                  <div>
                    <div className="text-sm font-medium">{t.label}</div>
                    <div className="text-xs text-muted-foreground">{t.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4 sm:p-5">
            <h2 className="text-base sm:text-lg font-semibold mb-3">Default Search Engine</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SEARCH_ENGINES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSearchEngine(s.value as SearchEngine)}
                  className={cn(
                    'p-3 rounded-xl text-sm font-medium transition-all',
                    searchEngine === s.value
                      ? 'bg-primary text-primary-foreground'
                      : 'glass-panel text-muted-foreground hover:text-foreground'
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Cloak Settings */}
      {tab === 'cloak' && (
        <div className="space-y-4 sm:space-y-6 animate-fade-in">
          <div className="glass-panel rounded-xl p-4 sm:p-5">
            <h2 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
              <EyeOff className="w-4 h-4" /> Tab Cloak Presets
            </h2>
            <p className="text-sm text-muted-foreground mb-3">Disguise this tab to look like a legitimate educational site.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CLOAK_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => { setCloakTitle(preset.title); setCloakFavicon(preset.favicon); }}
                  className={cn(
                    'p-3 rounded-xl text-left transition-all flex items-center gap-3',
                    cloakTitle === preset.title
                      ? 'glass-panel-strong border border-primary/40'
                      : 'glass-panel hover:border-primary/20'
                  )}
                >
                  <img src={preset.favicon} alt="" className="w-5 h-5 rounded" />
                  <div>
                    <div className="text-sm font-medium">{preset.label}</div>
                    <div className="text-xs text-muted-foreground">Title: &quot;{preset.title}&quot;</div>
                  </div>
                  {cloakTitle === preset.title && <Check className="w-4 h-4 text-primary ml-auto" />}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4 sm:p-5">
            <h2 className="text-base sm:text-lg font-semibold mb-3">Custom Cloak</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Custom Page Title</label>
                <input
                  type="text"
                  value={cloakTitle}
                  onChange={(e) => setCloakTitle(e.target.value)}
                  placeholder="My Drive - Google Drive"
                  className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-sm outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Custom Favicon URL</label>
                <input
                  type="text"
                  value={cloakFavicon}
                  onChange={(e) => setCloakFavicon(e.target.value)}
                  placeholder="https://example.com/favicon.ico"
                  className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-sm outline-none focus:border-primary/50"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={applyCloak}
                  disabled={saving || !user}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply Cloak'}
                </button>
                <button
                  onClick={removeCloak}
                  disabled={saving || !user}
                  className="px-4 py-2 rounded-lg glass-panel text-sm hover:border-red-500/30 transition-colors disabled:opacity-50"
                >
                  Remove Cloak
                </button>
              </div>
              {!user && <p className="text-xs text-muted-foreground">Sign in to save your cloak settings.</p>}
            </div>
          </div>
        </div>
      )}

      {/* Account & Data Settings */}
      {tab === 'account' && (
        <div className="space-y-4 sm:space-y-6 animate-fade-in" id="account">
          <div className="glass-panel rounded-xl p-4 sm:p-5">
            <h2 className="text-base sm:text-lg font-semibold mb-3 flex items-center gap-2">
              <Cloud className="w-4 h-4" /> Cloud Sync
            </h2>
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold text-lg">
                    {profile?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div className="font-medium">{profile?.username || 'User'}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <Check className="w-3 h-3 text-green-400" /> Synced to cloud
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Your settings, bookmarks, watch progress, and chat messages are synced to your account.
                </div>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/25 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Sign in to sync your settings, bookmarks, and watch progress across devices.
              </div>
            )}
          </div>

          {user && (
            <div className="glass-panel rounded-xl p-4 sm:p-5">
              <h2 className="text-base sm:text-lg font-semibold mb-3">Data Portability</h2>
              <p className="text-sm text-muted-foreground mb-4">Export or import your data as a JSON backup file.</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={exportData}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-4 h-4" /> Export Data
                </button>
                <label className="flex items-center gap-2 px-4 py-2 rounded-lg glass-panel text-sm hover:border-primary/30 transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" /> Import Data
                  <input type="file" accept=".json" onChange={importData} className="hidden" />
                </label>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
