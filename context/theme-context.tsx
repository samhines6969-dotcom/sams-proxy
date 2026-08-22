'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { THEMES, type ThemeName, type CustomTheme } from '@/lib/types';
import { useAuth } from './auth-context';
import { supabase } from '@/lib/supabase';

type ThemeContextValue = {
  themeName: ThemeName;
  customTheme: CustomTheme | null;
  backgroundUrl: string | null;
  backgroundBlur: number;
  backgroundOpacity: number;
  setTheme: (name: ThemeName) => void;
  setCustomTheme: (theme: CustomTheme) => void;
  setBackground: (url: string | null, blur: number, opacity: number) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  themeName: 'midnight',
  customTheme: null,
  backgroundUrl: null,
  backgroundBlur: 0,
  backgroundOpacity: 100,
  setTheme: () => {},
  setCustomTheme: () => {},
  setBackground: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { profile, user } = useAuth();
  const [themeName, setThemeName] = useState<ThemeName>('midnight');
  const [customTheme, setCustomThemeState] = useState<CustomTheme | null>(null);
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [backgroundBlur, setBackgroundBlur] = useState(0);
  const [backgroundOpacity, setBackgroundOpacity] = useState(100);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (themeName === 'custom' && customTheme) {
      root.setAttribute('data-theme', 'midnight');
      root.style.setProperty('--gradient-from', customTheme.gradientFrom);
      root.style.setProperty('--gradient-via', customTheme.gradientVia);
      root.style.setProperty('--gradient-to', customTheme.gradientTo);
      root.style.setProperty('--card-opacity', String(customTheme.cardOpacity / 100));
      root.style.setProperty('--border-opacity', String(customTheme.borderOpacity / 100));
      root.style.setProperty('--glow', customTheme.accent);
      root.style.setProperty('--accent', customTheme.accent);
      root.style.setProperty('--ring', customTheme.accent);
    } else {
      root.removeAttribute('style');
      if (themeName === 'midnight') {
        root.removeAttribute('data-theme');
      } else {
        root.setAttribute('data-theme', themeName);
      }
    }
  }, [themeName, customTheme]);

  // Apply background image
  useEffect(() => {
    if (backgroundUrl) {
      document.body.style.backgroundImage = `url(${backgroundUrl})`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.filter = `blur(${backgroundBlur}px)`;
    } else {
      document.body.style.backgroundImage = '';
      document.body.style.filter = '';
    }
  }, [backgroundUrl, backgroundBlur, backgroundOpacity]);

  // Load from profile
  useEffect(() => {
    if (profile) {
      const themeData = profile.theme as { name: string };
      if (themeData?.name) setThemeName(themeData.name as ThemeName);
      if (profile.custom_theme) setCustomThemeState(profile.custom_theme as unknown as CustomTheme);
      if (profile.background_url) setBackgroundUrl(profile.background_url);
      setBackgroundBlur(profile.background_blur);
      setBackgroundOpacity(profile.background_opacity);
    } else {
      setThemeName('midnight');
      setCustomThemeState(null);
      setBackgroundUrl(null);
      setBackgroundBlur(0);
      setBackgroundOpacity(100);
    }
  }, [profile]);

  const setTheme = useCallback((name: ThemeName) => {
    setThemeName(name);
    if (user) {
      supabase
        .from('profiles')
        .update({ theme: { name }, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .then(({ error }) => {
          if (error) console.error('Failed to save theme:', error);
        });
    }
  }, [user]);

  const setCustomTheme = useCallback((theme: CustomTheme) => {
    setCustomThemeState(theme);
    setThemeName('custom');
    if (user) {
      supabase
        .from('profiles')
        .update({ custom_theme: theme as unknown as Record<string, unknown>, theme: { name: 'custom' }, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .then(({ error }) => {
          if (error) console.error('Failed to save custom theme:', error);
        });
    }
  }, [user]);

  const setBackground = useCallback((url: string | null, blur: number, opacity: number) => {
    setBackgroundUrl(url);
    setBackgroundBlur(blur);
    setBackgroundOpacity(opacity);
    if (user) {
      supabase
        .from('profiles')
        .update({ background_url: url, background_blur: blur, background_opacity: opacity, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .then(({ error }) => {
          if (error) console.error('Failed to save background:', error);
        });
    }
  }, [user]);

  return (
    <ThemeContext.Provider value={{
      themeName,
      customTheme,
      backgroundUrl,
      backgroundBlur,
      backgroundOpacity,
      setTheme,
      setCustomTheme,
      setBackground,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
