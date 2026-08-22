// Root Service Worker for Ultraviolet Proxy & Memory Caching
importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');
importScripts('/uv/uv.sw.js');

const CACHE_NAME = 'petezah-uv-cache-v1';
const MEMORY_ROUTES = new Map();

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SAVE_ROUTE_MEMORY') {
    MEMORY_ROUTES.set(event.data.path, event.data.response);
  }
});
