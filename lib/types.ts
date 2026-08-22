export type ThemeName = 'midnight' | 'nebula' | 'emerald' | 'solar' | 'cyberpunk' | 'opal' | 'custom';

export type ThemeConfig = {
  name: ThemeName;
  label: string;
  description: string;
};

export const THEMES: ThemeConfig[] = [
  { name: 'midnight', label: 'Midnight', description: 'Deep midnight-blue and obsidian gradients with electric blue accents' },
  { name: 'nebula', label: 'Nebula Velvet', description: 'Deep purple and indigo hues with violet glows' },
  { name: 'emerald', label: 'Emerald Abyss', description: 'Dark slate-teal with mint emerald highlights' },
  { name: 'solar', label: 'Solar Flare', description: 'Carbon dark with amber/crimson undertones' },
  { name: 'cyberpunk', label: 'Cyberpunk Noir', description: 'True pitch-black with high-contrast cyan/magenta glow borders' },
  { name: 'opal', label: 'Opal Minimal', description: 'Slate monochrome dark-mode' },
];

export type CustomTheme = {
  gradientFrom: string;
  gradientVia: string;
  gradientTo: string;
  cardOpacity: number;
  borderOpacity: number;
  accent: string;
};

export type ProxyEngine = 'ultraviolet' | 'scramjet' | 'rammerhead';
export type Transport = 'bare' | 'wisp' | 'libcurl';
export type SearchEngine = 'google' | 'duckduckgo' | 'bing' | 'brave' | 'searxng';

export const PROXY_ENGINES: { value: ProxyEngine; label: string; description: string }[] = [
  { value: 'ultraviolet', label: 'Ultraviolet', description: 'Default engine - high compatibility with Wisp transport' },
  { value: 'scramjet', label: 'Scramjet', description: 'Advanced service worker based proxy' },
  { value: 'rammerhead', label: 'Rammerhead', description: 'Server-side proxy with session support' },
];

export const TRANSPORTS: { value: Transport; label: string; description: string }[] = [
  { value: 'bare', label: 'Bare Server', description: 'Classic bare server transport' },
  { value: 'wisp', label: 'Epoxy over Wisp', description: 'Modern websocket-based transport (recommended)' },
  { value: 'libcurl', label: 'Libcurl over Wisp', description: 'Libcurl-based transport over Wisp' },
];

export const SEARCH_ENGINES: { value: SearchEngine; label: string; url: (q: string) => string }[] = [
  { value: 'google', label: 'Google', url: (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}` },
  { value: 'duckduckgo', label: 'DuckDuckGo', url: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}` },
  { value: 'bing', label: 'Bing', url: (q) => `https://www.bing.com/search?q=${encodeURIComponent(q)}` },
  { value: 'brave', label: 'Brave', url: (q) => `https://search.brave.com/search?q=${encodeURIComponent(q)}` },
  { value: 'searxng', label: 'SearXNG', url: (q) => `https://searx.be/search?q=${encodeURIComponent(q)}` },
];

export type CloakPreset = {
  label: string;
  title: string;
  favicon: string;
};

export const CLOAK_PRESETS: CloakPreset[] = [
  { label: 'Google Classroom', title: 'Classes', favicon: 'https://www.google.com/favicon.ico' },
  { label: 'Google Drive', title: 'My Drive - Google Drive', favicon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png' },
  { label: 'Canvas LMS', title: 'Dashboard', favicon: 'https://canvas.instructure.com/favicon.ico' },
  { label: 'Desmos', title: 'Desmos | Scientific Calculator', favicon: 'https://www.desmos.com/favicon.ico' },
  { label: 'Google Docs', title: 'Google Docs', favicon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico' },
  { label: 'Khan Academy', title: 'Khan Academy | Free Online Courses', favicon: 'https://cdn.kastatic.org/favicon.ico' },
  { label: 'Wikipedia', title: 'Wikipedia', favicon: 'https://en.wikipedia.org/favicon.ico' },
];

export function isUrl(input: string): boolean {
  try {
    const url = new URL(input);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

export function buildSearchUrl(engine: SearchEngine, query: string): string {
  const engineConfig = SEARCH_ENGINES.find((e) => e.value === engine) || SEARCH_ENGINES[0];
  if (isUrl(query)) return query;
  if (query.match(/^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/)) return `https://${query}`;
  return engineConfig.url(query);
}
