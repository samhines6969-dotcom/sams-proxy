export type WeatherData = {
  temperature: number;
  windspeed: number;
  weathercode: number;
  is_day: number;
  time: string;
};

export type WeatherLocation = {
  latitude: number;
  longitude: number;
  city?: string;
};

const WEATHER_CODE_MAP: Record<number, { label: string; icon: string }> = {
  0: { label: 'Clear sky', icon: 'sun' },
  1: { label: 'Mainly clear', icon: 'sun' },
  2: { label: 'Partly cloudy', icon: 'cloud-sun' },
  3: { label: 'Overcast', icon: 'cloud' },
  45: { label: 'Fog', icon: 'cloud-fog' },
  48: { label: 'Rime fog', icon: 'cloud-fog' },
  51: { label: 'Light drizzle', icon: 'cloud-drizzle' },
  53: { label: 'Moderate drizzle', icon: 'cloud-drizzle' },
  55: { label: 'Dense drizzle', icon: 'cloud-drizzle' },
  56: { label: 'Freezing drizzle', icon: 'cloud-drizzle' },
  57: { label: 'Freezing drizzle', icon: 'cloud-drizzle' },
  61: { label: 'Slight rain', icon: 'cloud-rain' },
  63: { label: 'Moderate rain', icon: 'cloud-rain' },
  65: { label: 'Heavy rain', icon: 'cloud-rain' },
  66: { label: 'Freezing rain', icon: 'cloud-rain' },
  67: { label: 'Freezing rain', icon: 'cloud-rain' },
  71: { label: 'Slight snow', icon: 'cloud-snow' },
  73: { label: 'Moderate snow', icon: 'cloud-snow' },
  75: { label: 'Heavy snow', icon: 'cloud-snow' },
  77: { label: 'Snow grains', icon: 'cloud-snow' },
  80: { label: 'Rain showers', icon: 'cloud-rain' },
  81: { label: 'Rain showers', icon: 'cloud-rain' },
  82: { label: 'Violent rain', icon: 'cloud-rain' },
  85: { label: 'Snow showers', icon: 'cloud-snow' },
  86: { label: 'Snow showers', icon: 'cloud-snow' },
  95: { label: 'Thunderstorm', icon: 'cloud-lightning' },
  96: { label: 'Thunderstorm', icon: 'cloud-lightning' },
  99: { label: 'Thunderstorm', icon: 'cloud-lightning' },
};

export function getWeatherInfo(code: number): { label: string; icon: string } {
  return WEATHER_CODE_MAP[code] || { label: 'Unknown', icon: 'cloud' };
}

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=celsius`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Weather fetch failed');
  const data = await res.json();
  return data.current_weather as WeatherData;
}

export async function reverseGeocode(lat: number, lon: number): Promise<string> {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`);
    if (!res.ok) return '';
    const data = await res.json();
    return data.address?.city || data.address?.town || data.address?.village || data.address?.county || '';
  } catch {
    return '';
  }
}
