export type ToolResult = {
  success: boolean;
  data?: unknown;
  error?: string;
};

export async function dnsLookup(domain: string): Promise<ToolResult> {
  try {
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(cleanDomain)}&type=A`);
    if (!res.ok) throw new Error('DNS lookup failed');
    const data = await res.json();
    return { success: true, data };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function checkIp(): Promise<ToolResult> {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    if (!res.ok) throw new Error('IP check failed');
    const data = await res.json();
    return { success: true, data };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function httpHeaderTest(url: string): Promise<ToolResult> {
  try {
    const cleanUrl = url.match(/^https?:\/\//) ? url : `https://${url}`;
    const res = await fetch(cleanUrl, { method: 'GET', redirect: 'follow' });
    const headers: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      headers[key] = value;
    });
    return { success: true, data: { status: res.status, statusText: res.statusText, headers, redirected: res.redirected, url: res.url } };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export async function speedTest(): Promise<ToolResult> {
  try {
    const start = performance.now();
    const res = await fetch('https://www.google.com/generate_204');
    const end = performance.now();
    const latency = Math.round(end - start);
    return { success: true, data: { latency, status: res.status } };
  } catch (e) {
    return { success: false, error: (e as Error).message };
  }
}

export function urlEncode(input: string): string {
  return encodeURIComponent(input);
}

export function urlDecode(input: string): string {
  try {
    return decodeURIComponent(input);
  } catch {
    return 'Invalid encoded URL';
  }
}

export function base64Encode(input: string): string {
  try {
    return btoa(input);
  } catch {
    return 'Invalid input for encoding';
  }
}

export function base64Decode(input: string): string {
  try {
    return atob(input);
  } catch {
    return 'Invalid base64 input';
  }
}
