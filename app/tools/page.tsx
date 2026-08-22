'use client';

import { useState } from 'react';
import { Globe, Server, Gauge, Code2, Loader2, Search } from 'lucide-react';
import { dnsLookup, checkIp, httpHeaderTest, speedTest, urlEncode, urlDecode, base64Encode, base64Decode, type ToolResult } from '@/lib/tools';
import { cn } from '@/lib/utils';

type ToolId = 'dns' | 'ip' | 'headers' | 'speed' | 'encode' | 'base64';

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<ToolId>('dns');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [encodeInput, setEncodeInput] = useState('');
  const [encodeOutput, setEncodeOutput] = useState('');
  const [base64Input, setBase64Input] = useState('');
  const [base64Output, setBase64Output] = useState('');

  const runTool = async (tool: ToolId) => {
    setLoading(true);
    setOutput('');
    try {
      let result: ToolResult;
      switch (tool) {
        case 'dns':
          result = await dnsLookup(input || 'google.com');
          break;
        case 'ip':
          result = await checkIp();
          break;
        case 'headers':
          result = await httpHeaderTest(input || 'example.com');
          break;
        case 'speed':
          result = await speedTest();
          break;
        default:
          result = { success: false, error: 'Unknown tool' };
      }
      setOutput(JSON.stringify(result, null, 2));
    } catch (e) {
      setOutput(`Error: ${(e as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const tools = [
    { id: 'dns' as ToolId, label: 'DNS Lookup', icon: Globe, description: 'Look up DNS records for any domain' },
    { id: 'ip' as ToolId, label: 'IP Checker', icon: Server, description: 'Check your current public IP address' },
    { id: 'headers' as ToolId, label: 'HTTP Headers', icon: Search, description: 'Test HTTP response headers for any URL' },
    { id: 'speed' as ToolId, label: 'Speed Test', icon: Gauge, description: 'Benchmark your connection latency' },
    { id: 'encode' as ToolId, label: 'URL Encoder', icon: Code2, description: 'Encode and decode URLs' },
    { id: 'base64' as ToolId, label: 'Base64', icon: Code2, description: 'Encode and decode base64 strings' },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 glow-text">Tools</h1>

      {/* Tool selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.id}
              onClick={() => { setActiveTool(tool.id); setOutput(''); setInput(''); }}
              className={cn(
                'flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl transition-all text-center',
                activeTool === tool.id
                  ? 'glass-panel-strong border border-primary/40'
                  : 'glass-panel hover:border-primary/30'
              )}
            >
              <Icon className={cn('w-5 h-5 sm:w-6 sm:h-6', activeTool === tool.id ? 'text-primary' : 'text-muted-foreground')} />
              <span className={cn('text-xs sm:text-sm font-medium', activeTool === tool.id ? 'text-primary' : 'text-muted-foreground')}>{tool.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active tool description */}
      <p className="text-sm text-muted-foreground mb-4">{tools.find((t) => t.id === activeTool)?.description}</p>

      {/* Network tools (DNS, IP, Headers, Speed) */}
      {(activeTool === 'dns' || activeTool === 'headers') && (
        <div className="glass-panel rounded-xl p-4 mb-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={activeTool === 'dns' ? 'Enter domain (e.g. google.com)' : 'Enter URL (e.g. example.com)'}
              className="flex-1 px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-sm outline-none focus:border-primary/50"
              onKeyDown={(e) => e.key === 'Enter' && runTool(activeTool)}
            />
            <button
              onClick={() => runTool(activeTool)}
              disabled={loading}
              className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Run'}
            </button>
          </div>
        </div>
      )}

      {(activeTool === 'ip' || activeTool === 'speed') && (
        <div className="glass-panel rounded-xl p-4 mb-4">
          <button
            onClick={() => runTool(activeTool)}
            disabled={loading}
            className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin inline mr-2" /> : null}
            {activeTool === 'ip' ? 'Check My IP' : 'Run Speed Test'}
          </button>
        </div>
      )}

      {/* URL Encoder */}
      {activeTool === 'encode' && (
        <div className="glass-panel rounded-xl p-4 mb-4 space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Input</label>
            <textarea
              value={encodeInput}
              onChange={(e) => setEncodeInput(e.target.value)}
              placeholder="Enter text to encode/decode..."
              className="w-full px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-sm outline-none focus:border-primary/50 resize-y min-h-[80px] font-mono"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEncodeOutput(urlEncode(encodeInput))}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Encode
            </button>
            <button
              onClick={() => setEncodeOutput(urlDecode(encodeInput))}
              className="px-4 py-2 rounded-lg glass-panel text-sm hover:border-primary/30 transition-colors"
            >
              Decode
            </button>
          </div>
          {encodeOutput && (
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Output</label>
              <pre className="px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-sm font-mono whitespace-pre-wrap break-all">{encodeOutput}</pre>
            </div>
          )}
        </div>
      )}

      {/* Base64 */}
      {activeTool === 'base64' && (
        <div className="glass-panel rounded-xl p-4 mb-4 space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Input</label>
            <textarea
              value={base64Input}
              onChange={(e) => setBase64Input(e.target.value)}
              placeholder="Enter text to encode/decode..."
              className="w-full px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-sm outline-none focus:border-primary/50 resize-y min-h-[80px] font-mono"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setBase64Output(base64Encode(base64Input))}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Encode
            </button>
            <button
              onClick={() => setBase64Output(base64Decode(base64Input))}
              className="px-4 py-2 rounded-lg glass-panel text-sm hover:border-primary/30 transition-colors"
            >
              Decode
            </button>
          </div>
          {base64Output && (
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Output</label>
              <pre className="px-3 py-2.5 rounded-lg bg-black/30 border border-white/10 text-sm font-mono whitespace-pre-wrap break-all">{base64Output}</pre>
            </div>
          )}
        </div>
      )}

      {/* Output for network tools */}
      {output && (activeTool === 'dns' || activeTool === 'ip' || activeTool === 'headers' || activeTool === 'speed') && (
        <div className="glass-panel rounded-xl p-4">
          <label className="text-sm text-muted-foreground mb-1.5 block">Result</label>
          <pre className="text-xs sm:text-sm font-mono whitespace-pre-wrap break-all overflow-x-auto scrollbar-thin">{output}</pre>
        </div>
      )}
    </div>
  );
}
