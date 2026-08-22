'use client';

import { useEffect, useState } from 'react';
import { Clock as ClockIcon, Calendar } from 'lucide-react';

export function ClockWidget() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-2">
        <ClockIcon className="w-5 h-5 text-primary" />
        <span className="text-3xl font-bold tabular-nums">{timeStr}</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Calendar className="w-4 h-4" />
        <span>{dateStr}</span>
      </div>
    </div>
  );
}
