'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  X,
  Plus,
  Lock,
  ExternalLink,
  Shield,
  Loader2,
  AlertTriangle,
  Copy,
  Check,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = {
  id: string;
  url: string;
  displayUrl: string;
  title: string;
  loading: boolean;
  srcDoc?: string;
  mode: 'srcdoc' | 'direct' | 'fallback';
  error?: string;
};

function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';
  if (trimmed.match(/^https?:\/\//)) return trimmed;
  if (trimmed.match(/^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/)) return `https://${trimmed}`;
  return `https://duckduckgo.com/?q=${encodeURIComponent(trimmed)}`;
}

// Multi-tier proxy fetching engine
async function fetchProxiedContent(url: string): Promise<string> {
  // 1. Try our Next.js in-house server proxy
  try {
    const res = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);
    if (res.ok) {
      const html = await res.text();
      if (html.length > 50) return html;
    }
  } catch {}

  // 2. Try AllOrigins CORS proxy fallback
  try {
    const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
    if (res.ok) {
      let html = await res.text();
      if (html.length > 50) {
        const baseUrl = url.substring(0, url.lastIndexOf('/') + 1);
        if (html.includes('<head>')) html = html.replace('<head>', `<head><base href="${baseUrl}">`);
        return html;
      }
    }
  } catch {}

  // 3. Try CodeTabs CORS proxy fallback
  try {
    const res = await fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`);
    if (res.ok) {
      let html = await res.text();
      if (html.length > 50) {
        const baseUrl = url.substring(0, url.lastIndexOf('/') + 1);
        if (html.includes('<head>')) html = html.replace('<head>', `<head><base href="${baseUrl}">`);
        return html;
      }
    }
  } catch {}

  throw new Error('Could not load site via proxy. Click "Stealth Mode" to open in cloaked about:blank window.');
}

export function BrowserView({ initialUrl, onClose }: { initialUrl: string; onClose: () => void }) {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: '1',
      url: normalizeUrl(initialUrl),
      displayUrl: initialUrl,
      title: initialUrl,
      loading: true,
      mode: 'srcdoc',
    },
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [urlInput, setUrlInput] = useState(initialUrl);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<Record<string, { stack: string[]; index: number }>>({
    '1': { stack: [normalizeUrl(initialUrl)], index: 0 },
  });
  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const updateTab = useCallback((id: string, updates: Partial<Tab>) => {
    setTabs((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  // Fetch proxied content for active tab if not loaded
  useEffect(() => {
    tabs.forEach((tab) => {
      if (tab.url && !tab.srcDoc && !tab.error && tab.mode === 'srcdoc') {
        updateTab(tab.id, { loading: true });
        fetchProxiedContent(tab.url)
          .then((html) => {
            updateTab(tab.id, { srcDoc: html, loading: false });
          })
          .catch((err) => {
            // If proxy fetch fails, try direct mode
            updateTab(tab.id, { mode: 'direct', loading: false, error: err.message });
          });
      }
    });
  }, [tabs, updateTab]);

  const navigate = useCallback(
    (input: string) => {
      const targetUrl = normalizeUrl(input);
      if (!targetUrl) return;

      updateTab(activeTabId, {
        url: targetUrl,
        displayUrl: targetUrl,
        title: targetUrl,
        loading: true,
        mode: 'srcdoc',
        srcDoc: undefined,
        error: undefined,
      });
      setUrlInput(targetUrl);
      setHistory((prev) => {
        const h = prev[activeTabId] || { stack: [], index: -1 };
        const newStack = [...h.stack.slice(0, h.index + 1), targetUrl];
        return { ...prev, [activeTabId]: { stack: newStack, index: newStack.length - 1 } };
      });
    },
    [activeTabId, updateTab]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(urlInput);
  };

  const newTab = () => {
    const id = String(Date.now());
    setTabs((prev) => [
      ...prev,
      { id, url: '', displayUrl: '', title: 'New Tab', loading: false, mode: 'srcdoc' },
    ]);
    setActiveTabId(id);
    setUrlInput('');
    setHistory((prev) => ({ ...prev, [id]: { stack: [], index: -1 } }));
  };

  const closeTab = (id: string) => {
    if (tabs.length === 1) {
      onClose();
      return;
    }
    const remaining = tabs.filter((t) => t.id !== id);
    setTabs(remaining);
    if (activeTabId === id) {
      setActiveTabId(remaining[0].id);
      setUrlInput(remaining[0].displayUrl);
    }
  };

  const switchTab = (id: string) => {
    setActiveTabId(id);
    const tab = tabs.find((t) => t.id === id);
    if (tab) setUrlInput(tab.displayUrl);
  };

  const reload = () => {
    const tab = activeTab;
    if (!tab) return;
    updateTab(activeTabId, { loading: true, srcDoc: undefined, error: undefined });
    fetchProxiedContent(tab.url)
      .then((html) => updateTab(activeTabId, { srcDoc: html, loading: false }))
      .catch((err) => updateTab(activeTabId, { mode: 'direct', loading: false, error: err.message }));
  };

  const openStealthWindow = () => {
    const win = window.open('about:blank', '_blank');
    if (win) {
      win.document.write(
        `<!DOCTYPE html><html><head><title>Google Docs</title><link rel="icon" href="https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico"><style>*{margin:0;padding:0;border:0}iframe{width:100vw;height:100vh}</style></head><body><iframe src="${activeTab.url}" allow="autoplay;fullscreen;clipboard-read;clipboard-write;pointer-lock;gamepad;microphone;camera" allowfullscreen></iframe></body></html>`
      );
      win.document.close();
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(activeTab.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#020810] flex flex-col animate-fade-in select-none">
      {/* Tab bar */}
      <div className="flex items-center gap-1 px-3 h-11 bg-[#050d1a] border-b border-white/[0.08] overflow-x-auto scrollbar-none shrink-0">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => switchTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs cursor-pointer transition-all max-w-[180px] group border',
              tab.id === activeTabId
                ? 'bg-blue-600/20 text-blue-300 border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.2)]'
                : 'bg-black/20 text-slate-400 border-transparent hover:bg-white/5 hover:text-white'
            )}
          >
            {tab.loading ? (
              <Loader2 className="w-3 h-3 animate-spin text-blue-400 shrink-0" />
            ) : (
              <Shield className="w-3 h-3 text-emerald-400 shrink-0" />
            )}
            <span className="truncate flex-1 font-medium">{tab.title || tab.displayUrl || 'New Tab'}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              className="opacity-40 hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-white/10"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}

        <button
          onClick={newTab}
          className="w-7 h-7 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors shrink-0"
          title="New Tab"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onClose}
          className="ml-auto px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-500/15 border border-red-500/30 text-red-300 hover:bg-red-500/25 transition-colors shrink-0"
        >
          Close Browser
        </button>
      </div>

      {/* Omnibox Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 px-3 h-12 bg-[#081222] border-b border-white/[0.08] shrink-0">
        <button
          onClick={() => {
            const h = history[activeTabId];
            if (h && h.index > 0) {
              const newIdx = h.index - 1;
              const u = h.stack[newIdx];
              navigate(u);
            }
          }}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          title="Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => {
            const h = history[activeTabId];
            if (h && h.index < h.stack.length - 1) {
              const newIdx = h.index + 1;
              const u = h.stack[newIdx];
              navigate(u);
            }
          }}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          title="Forward"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={reload}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          title="Reload"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          title="Home"
        >
          <Home className="w-3.5 h-3.5" />
        </button>

        {/* Input bar */}
        <form onSubmit={handleSubmit} className="flex-1 mx-1">
          <div className="relative flex items-center">
            <Lock className="absolute left-3 w-3.5 h-3.5 text-emerald-400" />
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Search or enter web URL..."
              className="w-full pl-9 pr-8 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-slate-200 outline-none focus:border-blue-500/50 font-mono transition-colors"
            />
          </div>
        </form>

        <button
          onClick={copyUrl}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          title="Copy Link"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={openStealthWindow}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold hover:bg-blue-600/30 transition-all"
          title="Open in about:blank cloaked tab"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Stealth Tab</span>
        </button>
      </div>

      {/* Frame Viewport */}
      <div className="flex-1 relative bg-[#020810] overflow-hidden">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;

          if (tab.srcDoc) {
            return (
              <iframe
                key={tab.id}
                ref={(el) => {
                  iframeRefs.current[tab.id] = el;
                }}
                srcDoc={tab.srcDoc}
                className={cn('w-full h-full border-0 bg-white', isActive ? 'block' : 'hidden')}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation allow-pointer-lock allow-modals"
                allow="autoplay; fullscreen; picture-in-picture; pointer-lock; gamepad; accelerometer; gyroscope; clipboard-read; clipboard-write"
                allowFullScreen
                title={tab.title}
              />
            );
          }

          if (tab.mode === 'direct' && tab.url) {
            return (
              <iframe
                key={tab.id}
                ref={(el) => {
                  iframeRefs.current[tab.id] = el;
                }}
                src={`/api/proxy?url=${encodeURIComponent(tab.url)}`}
                className={cn('w-full h-full border-0 bg-white', isActive ? 'block' : 'hidden')}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation allow-pointer-lock allow-modals"
                allow="autoplay; fullscreen; picture-in-picture; pointer-lock; gamepad; accelerometer; gyroscope; clipboard-read; clipboard-write"
                allowFullScreen
                title={tab.title}
                onError={() => updateTab(tab.id, { error: 'Site prevented embedding. Use Stealth Tab above.' })}
              />
            );
          }

          return (
            <div
              key={tab.id}
              className={cn(
                'absolute inset-0 flex flex-col items-center justify-center p-6 text-center',
                isActive ? 'flex' : 'hidden'
              )}
            >
              {tab.loading ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                  </div>
                  <p className="text-sm font-semibold text-white">Connecting via Sam&apos;s Pr0xy...</p>
                  <p className="text-xs text-slate-400 font-mono truncate max-w-sm">{tab.url}</p>
                </div>
              ) : tab.error ? (
                <div className="max-w-md p-6 rounded-2xl bg-[#0d1c33]/80 border border-white/10 shadow-2xl animate-scale-in">
                  <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-white mb-2">Embed Protection Detected</h3>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    This website enforces strict iframe policies. You can launch it instantly inside an unblocked
                    cloaked about:blank tab.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={openStealthWindow}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 transition-all"
                    >
                      Launch in Stealth Tab
                    </button>
                    <button
                      onClick={reload}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium transition-all"
                    >
                      Try Direct Embed
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center max-w-md">
                  <Shield className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-1">Sam&apos;s Pr0xy Browser</h3>
                  <p className="text-xs text-slate-400 mb-4">Enter a URL or search term above to begin browsing.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
