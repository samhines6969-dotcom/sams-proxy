import type { ProxyEngine, Transport, SearchEngine } from './types';

export type ProxyConfig = {
  engine: ProxyEngine;
  transport: Transport;
  searchEngine: SearchEngine;
};

export const DEFAULT_PROXY_CONFIG: ProxyConfig = {
  engine: 'scramjet',
  transport: 'wisp',
  searchEngine: 'duckduckgo',
};

// Scramjet & Ultraviolet XOR codec
export function scramjetEncodeUrl(url: string): string {
  if (!url) return '';
  return encodeURIComponent(
    url
      .split('')
      .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char))
      .join('')
  );
}

export function scramjetDecodeUrl(encoded: string): string {
  if (!encoded) return '';
  const decoded = decodeURIComponent(encoded);
  return decoded
    .split('')
    .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char))
    .join('');
}

export function uvEncodeUrl(url: string): string {
  const key = 'uv';
  let result = '';
  for (let i = 0; i < url.length; i++) {
    const charCode = url.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }
  return btoa(result).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function uvDecodeUrl(encoded: string): string {
  try {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
    const key = 'uv';
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      const charCode = decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length);
      result += String.fromCharCode(charCode);
    }
    return result;
  } catch {
    return '';
  }
}

export function buildProxyUrl(config: ProxyConfig, targetUrl: string): string {
  switch (config.engine) {
    case 'scramjet':
      return `/scramjet/${scramjetEncodeUrl(targetUrl)}`;
    case 'ultraviolet':
      return `/search/${uvEncodeUrl(targetUrl)}`;
    case 'rammerhead':
      return `/rammerhead/?url=${encodeURIComponent(targetUrl)}`;
    default:
      return `/api/proxy?url=${encodeURIComponent(targetUrl)}`;
  }
}

export function getProxyPrefix(engine: ProxyEngine): string {
  switch (engine) {
    case 'scramjet':
      return '/scramjet/';
    case 'ultraviolet':
      return '/search/';
    case 'rammerhead':
      return '/rammerhead/';
    default:
      return '/api/proxy?url=';
  }
}
