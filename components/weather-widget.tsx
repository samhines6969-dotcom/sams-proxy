'use client';

import { useEffect, useState } from 'react';
import { Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog, CloudDrizzle, Sun, CloudSun, MapPin, Loader2 } from 'lucide-react';
import { fetchWeather, reverseGeocode, getWeatherInfo, type WeatherData } from '@/lib/weather';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'sun': Sun,
  'cloud-sun': CloudSun,
  'cloud': Cloud,
  'cloud-fog': CloudFog,
  'cloud-drizzle': CloudDrizzle,
  'cloud-rain': CloudRain,
  'cloud-snow': CloudSnow,
  'cloud-lightning': CloudLightning,
};

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const [w, c] = await Promise.all([
            fetchWeather(pos.coords.latitude, pos.coords.longitude),
            reverseGeocode(pos.coords.latitude, pos.coords.longitude),
          ]);
          setWeather(w);
          setCity(c);
        } catch (e) {
          setError('Failed to fetch weather');
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError('Location permission denied');
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return (
      <div className="glass-panel rounded-2xl p-5 flex items-center justify-center h-[88px]">
        <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="glass-panel rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <Cloud className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{error || 'Weather unavailable'}</span>
        </div>
      </div>
    );
  }

  const info = getWeatherInfo(weather.weathercode);
  const Icon = ICON_MAP[info.icon] || Cloud;

  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className="flex items-center gap-4">
        <Icon className="w-10 h-10 text-primary" />
        <div>
          <div className="text-2xl font-bold">{Math.round(weather.temperature)}&deg;C</div>
          <div className="text-sm text-muted-foreground">{info.label}</div>
        </div>
      </div>
      {city && (
        <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span>{city}</span>
        </div>
      )}
    </div>
  );
}
