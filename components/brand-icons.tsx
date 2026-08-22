import React from 'react';

type IconProps = {
  className?: string;
  name?: string;
};

// Official brand icon SVG URLs from official SimpleIcons and Web Brand CDNs
export const OFFICIAL_BRAND_ICONS: Record<string, { iconUrl: string; bg: string; color: string }> = {
  gdocs: {
    iconUrl: 'https://cdn.simpleicons.org/googledocs/4285F4',
    bg: 'bg-blue-950/40 border-blue-500/30',
    color: '#4285F4',
  },
  firefox: {
    iconUrl: 'https://cdn.simpleicons.org/firefox/FF7139',
    bg: 'bg-orange-950/40 border-orange-500/30',
    color: '#FF7139',
  },
  youtube: {
    iconUrl: 'https://cdn.simpleicons.org/youtube/FF0000',
    bg: 'bg-red-950/40 border-red-500/30',
    color: '#FF0000',
  },
  chatgpt: {
    iconUrl: 'https://cdn.simpleicons.org/openai/10A37F',
    bg: 'bg-emerald-950/40 border-emerald-500/30',
    color: '#10A37F',
  },
  discord: {
    iconUrl: 'https://cdn.simpleicons.org/discord/5865F2',
    bg: 'bg-indigo-950/40 border-indigo-500/30',
    color: '#5865F2',
  },
  github: {
    iconUrl: 'https://cdn.simpleicons.org/github/FFFFFF',
    bg: 'bg-slate-900/60 border-slate-700/40',
    color: '#FFFFFF',
  },
  reddit: {
    iconUrl: 'https://cdn.simpleicons.org/reddit/FF4500',
    bg: 'bg-orange-950/40 border-orange-500/30',
    color: '#FF4500',
  },
  characterai: {
    iconUrl: 'https://cdn.simpleicons.org/robotframework/3B82F6',
    bg: 'bg-purple-950/40 border-purple-500/30',
    color: '#3B82F6',
  },
  spotify: {
    iconUrl: 'https://cdn.simpleicons.org/spotify/1ED760',
    bg: 'bg-green-950/40 border-green-500/30',
    color: '#1ED760',
  },
  tiktok: {
    iconUrl: 'https://cdn.simpleicons.org/tiktok/FFFFFF',
    bg: 'bg-slate-950/60 border-cyan-500/30',
    color: '#FFFFFF',
  },
  twitch: {
    iconUrl: 'https://cdn.simpleicons.org/twitch/9146FF',
    bg: 'bg-purple-950/40 border-purple-500/30',
    color: '#9146FF',
  },
  x: {
    iconUrl: 'https://cdn.simpleicons.org/x/FFFFFF',
    bg: 'bg-black/60 border-slate-700/40',
    color: '#FFFFFF',
  },
  snapchat: {
    iconUrl: 'https://cdn.simpleicons.org/snapchat/FFFC00',
    bg: 'bg-yellow-950/30 border-yellow-500/30',
    color: '#FFFC00',
  },
  netflix: {
    iconUrl: 'https://cdn.simpleicons.org/netflix/E50914',
    bg: 'bg-red-950/40 border-red-500/30',
    color: '#E50914',
  },
  hulu: {
    iconUrl: 'https://cdn.simpleicons.org/hulu/1CE783',
    bg: 'bg-emerald-950/40 border-emerald-500/30',
    color: '#1CE783',
  },
  vscode: {
    iconUrl: 'https://cdn.simpleicons.org/visualstudiocode/007ACC',
    bg: 'bg-sky-950/40 border-sky-500/30',
    color: '#007ACC',
  },
  replit: {
    iconUrl: 'https://cdn.simpleicons.org/replit/F26207',
    bg: 'bg-amber-950/40 border-amber-500/30',
    color: '#F26207',
  },
  coolmath: {
    iconUrl: 'https://cdn.simpleicons.org/speedtest/00C853',
    bg: 'bg-emerald-950/40 border-emerald-500/30',
    color: '#00C853',
  },
  poki: {
    iconUrl: 'https://cdn.simpleicons.org/nintendo/00E5FF',
    bg: 'bg-blue-950/40 border-cyan-500/30',
    color: '#00E5FF',
  },
  y8: {
    iconUrl: 'https://cdn.simpleicons.org/itchdotio/FA5C5C',
    bg: 'bg-red-950/40 border-red-500/30',
    color: '#FA5C5C',
  },
  scratch: {
    iconUrl: 'https://cdn.simpleicons.org/scratch/F49E17',
    bg: 'bg-amber-950/40 border-amber-500/30',
    color: '#F49E17',
  },
  w3schools: {
    iconUrl: 'https://cdn.simpleicons.org/w3schools/04AA6D',
    bg: 'bg-emerald-950/40 border-emerald-500/30',
    color: '#04AA6D',
  },
  gmail: {
    iconUrl: 'https://cdn.simpleicons.org/gmail/EA4335',
    bg: 'bg-red-950/30 border-red-500/30',
    color: '#EA4335',
  },
  gdrive: {
    iconUrl: 'https://cdn.simpleicons.org/googledrive/34A853',
    bg: 'bg-emerald-950/30 border-emerald-500/30',
    color: '#34A853',
  },
  nvidia: {
    iconUrl: 'https://cdn.simpleicons.org/nvidia/76B900',
    bg: 'bg-lime-950/40 border-lime-500/30',
    color: '#76B900',
  },
  xbox: {
    iconUrl: 'https://cdn.simpleicons.org/xbox/107C10',
    bg: 'bg-green-950/40 border-green-500/30',
    color: '#107C10',
  },
  hdtoday: {
    iconUrl: 'https://cdn.simpleicons.org/plex/EBAF00',
    bg: 'bg-amber-950/40 border-amber-500/30',
    color: '#EBAF00',
  },
  pinterest: {
    iconUrl: 'https://cdn.simpleicons.org/pinterest/BD081C',
    bg: 'bg-rose-950/40 border-rose-500/30',
    color: '#BD081C',
  },
  soundcloud: {
    iconUrl: 'https://cdn.simpleicons.org/soundcloud/FF5500',
    bg: 'bg-orange-950/40 border-orange-500/30',
    color: '#FF5500',
  },
  espn: {
    iconUrl: 'https://cdn.simpleicons.org/espn/CC0000',
    bg: 'bg-red-950/40 border-red-500/30',
    color: '#CC0000',
  },
  duolingo: {
    iconUrl: 'https://cdn.simpleicons.org/duolingo/58CC02',
    bg: 'bg-lime-950/40 border-lime-500/30',
    color: '#58CC02',
  },
  weather: {
    iconUrl: 'https://cdn.simpleicons.org/accuweather/0088CC',
    bg: 'bg-sky-950/40 border-sky-500/30',
    color: '#0088CC',
  },
  casino: {
    iconUrl: 'https://cdn.simpleicons.org/steam/FBBF24',
    bg: 'bg-amber-950/40 border-amber-500/30',
    color: '#FBBF24',
  },
  facebook: {
    iconUrl: 'https://cdn.simpleicons.org/facebook/1877F2',
    bg: 'bg-blue-950/40 border-blue-500/30',
    color: '#1877F2',
  },
  instagram: {
    iconUrl: 'https://cdn.simpleicons.org/instagram/E4405F',
    bg: 'bg-pink-950/40 border-pink-500/30',
    color: '#E4405F',
  },
  puter: {
    iconUrl: 'https://cdn.simpleicons.org/gnome/2563EB',
    bg: 'bg-blue-950/40 border-blue-500/30',
    color: '#2563EB',
  },
};

export const BrandIcons: Record<string, React.FC<IconProps>> = Object.fromEntries(
  Object.entries(OFFICIAL_BRAND_ICONS).map(([key, data]) => [
    key,
    ({ className = 'w-6 h-6' }: IconProps) => (
      <img
        src={data.iconUrl}
        alt={key}
        className={className}
        loading="lazy"
      />
    ),
  ])
);
