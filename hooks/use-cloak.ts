'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/auth-context';

export function useCloak() {
  const { profile } = useAuth();

  useEffect(() => {
    if (profile?.cloak_title) {
      document.title = profile.cloak_title;
    } else {
      document.title = "Sam's Proxy";
    }

    if (profile?.cloak_favicon) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = profile.cloak_favicon;
    }
  }, [profile?.cloak_title, profile?.cloak_favicon]);
}
