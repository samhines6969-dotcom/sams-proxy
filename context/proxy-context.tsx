'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { ProxyEngine, Transport, SearchEngine } from '@/lib/types';
import { useAuth } from './auth-context';
import { supabase } from '@/lib/supabase';

type ProxyContextValue = {
  engine: ProxyEngine;
  transport: Transport;
  searchEngine: SearchEngine;
  setEngine: (engine: ProxyEngine) => void;
  setTransport: (transport: Transport) => void;
  setSearchEngine: (engine: SearchEngine) => void;
};

const ProxyContext = createContext<ProxyContextValue>({
  engine: 'ultraviolet',
  transport: 'wisp',
  searchEngine: 'google',
  setEngine: () => {},
  setTransport: () => {},
  setSearchEngine: () => {},
});

export function ProxyProvider({ children }: { children: React.ReactNode }) {
  const { profile, user } = useAuth();
  const [engine, setEngineState] = useState<ProxyEngine>('ultraviolet');
  const [transport, setTransportState] = useState<Transport>('wisp');
  const [searchEngine, setSearchEngineState] = useState<SearchEngine>('google');

  // Register Ultraviolet Service Worker
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then((reg) => {
          console.log('PeteZah Ultraviolet Service Worker registered:', reg.scope);
        })
        .catch((err) => {
          // Attempt fallback uv.sw.js
          navigator.serviceWorker
            .register('/uv/uv.sw.js', { scope: '/search/' })
            .catch(() => {});
        });
    }
  }, []);

  useEffect(() => {
    if (profile) {
      setEngineState(profile.proxy_engine as ProxyEngine);
      setTransportState(profile.transport as Transport);
      setSearchEngineState(profile.search_engine as SearchEngine);
    } else {
      setEngineState('ultraviolet');
      setTransportState('wisp');
      setSearchEngineState('google');
    }
  }, [profile]);

  const setEngine = useCallback((e: ProxyEngine) => {
    setEngineState(e);
    if (user) {
      supabase.from('profiles').update({ proxy_engine: e, updated_at: new Date().toISOString() }).eq('id', user.id).then(({ error }) => {
        if (error) console.error('Failed to save engine:', error);
      });
    }
  }, [user]);

  const setTransport = useCallback((t: Transport) => {
    setTransportState(t);
    if (user) {
      supabase.from('profiles').update({ transport: t, updated_at: new Date().toISOString() }).eq('id', user.id).then(({ error }) => {
        if (error) console.error('Failed to save transport:', error);
      });
    }
  }, [user]);

  const setSearchEngine = useCallback((s: SearchEngine) => {
    setSearchEngineState(s);
    if (user) {
      supabase.from('profiles').update({ search_engine: s, updated_at: new Date().toISOString() }).eq('id', user.id).then(({ error }) => {
        if (error) console.error('Failed to save search engine:', error);
      });
    }
  }, [user]);

  return (
    <ProxyContext.Provider value={{ engine, transport, searchEngine, setEngine, setTransport, setSearchEngine }}>
      {children}
    </ProxyContext.Provider>
  );
}

export function useProxy() {
  return useContext(ProxyContext);
}
