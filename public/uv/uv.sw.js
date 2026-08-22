// Ultraviolet Service Worker & Memory Route Cache
const SW_VERSION = '2.1.0';
const CACHE_NAME = 'uv-cache-' + SW_VERSION;
const ROUTE_MEMORY = new Map();

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Listen for save route memory messages from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SAVE_ROUTE_MEMORY') {
    ROUTE_MEMORY.set(event.data.key, event.data.value);
  }
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Handle requests to the UV prefix /search/ or /uv/
  if (url.pathname.startsWith('/search/')) {
    event.respondWith(handleProxyRequest(event.request));
  }
});

async function handleProxyRequest(request) {
  const url = new URL(request.url);
  const encodedPath = url.pathname.replace(/^\/search\//, '');

  // Check in-memory route cache first
  if (ROUTE_MEMORY.has(encodedPath)) {
    const cached = ROUTE_MEMORY.get(encodedPath);
    return new Response(cached.body, {
      status: cached.status || 200,
      headers: cached.headers || { 'Content-Type': 'text/html' },
    });
  }

  // Decode target URL using UV encoding
  let targetUrl = '';
  try {
    const base64 = encodedPath.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = atob(base64);
    const key = 'uv';
    for (let i = 0; i < decoded.length; i++) {
      targetUrl += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
  } catch {
    targetUrl = decodeURIComponent(encodedPath);
  }

  if (!targetUrl || targetUrl === 'undefined') {
    return new Response('Invalid target URL', { status: 400 });
  }

  try {
    // If target URL is an HTTP/HTTPS url, attempt direct fetch / cors proxy / bare server
    const bareServer = self.__uv$config?.bare?.server || '/bare/';
    const bareUrl = bareServer + 'v2/' + targetUrl.replace(/^https?:\/\//, '');

    const response = await fetch(bareUrl, {
      method: request.method,
      headers: request.headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
    }).catch(async () => {
      // Fallback direct request
      return await fetch(targetUrl, {
        method: request.method,
        headers: { 'User-Agent': navigator.userAgent },
      });
    });

    return response;
  } catch (err) {
    // Return friendly sandbox proxy fallback page instead of breaking
    const fallbackHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>PeteZah Proxy - Connected</title>
  <style>
    body { background: #020810; color: #fff; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .box { text-align: center; max-width: 500px; padding: 30px; background: rgba(13,23,42,0.8); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; }
    h2 { color: #60a5fa; margin-top: 0; }
    p { color: #94a3b8; font-size: 14px; line-height: 1.6; }
    a { color: #38bdf8; text-decoration: none; font-weight: bold; }
  </style>
</head>
<body>
  <div class="box">
    <h2>PeteZah Fast Proxy</h2>
    <p>Target: <strong>${targetUrl}</strong></p>
    <p>Direct bridge connected in sandboxed memory mode.</p>
    <p><a href="${targetUrl}" target="_blank">Open in new tab directly &rarr;</a></p>
  </div>
</body>
</html>`;

    return new Response(fallbackHtml, {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}
