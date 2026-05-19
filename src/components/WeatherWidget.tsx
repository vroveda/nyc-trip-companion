import { useEffect, useState } from "react";
import {
  Cloud, CloudRain, CloudSnow, Sun, CloudLightning,
  Wind, Droplets, CloudDrizzle, Eye, Thermometer,
} from "lucide-react";

// Open-Meteo WMO weather codes → label + icon
const WMO: Record<number, { label: string; Icon: React.ElementType; color: string }> = {
  0:  { label: "Céu limpo",       Icon: Sun,            color: "#f5c542" },
  1:  { label: "Poucas nuvens",   Icon: Sun,            color: "#f5c542" },
  2:  { label: "Parcialmente nublado", Icon: Cloud,     color: "#9ca3af" },
  3:  { label: "Nublado",         Icon: Cloud,          color: "#9ca3af" },
  45: { label: "Névoa",           Icon: Cloud,          color: "#9ca3af" },
  48: { label: "Névoa gelada",    Icon: Cloud,          color: "#9ca3af" },
  51: { label: "Chuvisco leve",   Icon: CloudDrizzle,   color: "#7ab8e8" },
  53: { label: "Chuvisco",        Icon: CloudDrizzle,   color: "#7ab8e8" },
  55: { label: "Chuvisco forte",  Icon: CloudDrizzle,   color: "#7ab8e8" },
  61: { label: "Chuva leve",      Icon: CloudRain,      color: "#7ab8e8" },
  63: { label: "Chuva",           Icon: CloudRain,      color: "#7ab8e8" },
  65: { label: "Chuva forte",     Icon: CloudRain,      color: "#7ab8e8" },
  71: { label: "Neve leve",       Icon: CloudSnow,      color: "#e0f2fe" },
  73: { label: "Neve",            Icon: CloudSnow,      color: "#e0f2fe" },
  75: { label: "Neve forte",      Icon: CloudSnow,      color: "#e0f2fe" },
  80: { label: "Pancadas leves",  Icon: CloudRain,      color: "#7ab8e8" },
  81: { label: "Pancadas",        Icon: CloudRain,      color: "#7ab8e8" },
  82: { label: "Pancadas fortes", Icon: CloudRain,      color: "#7ab8e8" },
  95: { label: "Tempestade",      Icon: CloudLightning, color: "#c9a84c" },
  96: { label: "Tempestade c/ granizo", Icon: CloudLightning, color: "#c9a84c" },
  99: { label: "Tempestade forte", Icon: CloudLightning, color: "#c9a84c" },
};

function getWMO(code: number) {
  return WMO[code] ?? { label: "—", Icon: Cloud, color: "#9ca3af" };
}

// Forecast day type
type ForecastDay = {
  date: string;       // "2026-06-20"
  label: string;      // "Sab"
  tMax: number;
  tMin: number;
  wmo: number;
};

type WeatherState =
  | { status: "loading" }
  | { status: "error" }
  | {
      status: "ok";
      temp: number;
      feels: number;
      wmo: number;
      humidity: number;
      wind: number;
      forecast: ForecastDay[];
      updatedAt: string;
    };

const DAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

// NYC coords
const LAT = 40.7128;
const LNG = -74.0060;

export function WeatherWidget() {
  const [wx, setWx] = useState<WeatherState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function fetchWeather() {
      try {
        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LNG}` +
          `&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code` +
          `&daily=temperature_2m_max,temperature_2m_min,weather_code` +
          `&timezone=America%2FNew_York&forecast_days=7`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("fetch failed");
        const data = await res.json();

        if (cancelled) return;

        const c = data.current;
        const d = data.daily;

        const forecast: ForecastDay[] = (d.time as string[]).map((date: string, i: number) => ({
          date,
          label: DAY_LABELS[new Date(date + "T12:00:00").getDay()],
          tMax: Math.round(d.temperature_2m_max[i]),
          tMin: Math.round(d.temperature_2m_min[i]),
          wmo: d.weather_code[i],
        }));

        const now = new Date();
        const updatedAt = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

        setWx({
          status: "ok",
          temp: Math.round(c.temperature_2m),
          feels: Math.round(c.apparent_temperature),
          wmo: c.weather_code,
          humidity: c.relative_humidity_2m,
          wind: Math.round(c.wind_speed_10m),
          forecast,
          updatedAt,
        });
      } catch {
        if (!cancelled) setWx({ status: "error" });
      }
    }

    fetchWeather();
    // Refresh every 30 min
    const id = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  // ── Loading ──
  if (wx.status === "loading") {
    return (
      <div className="mb-5 flex items-center gap-3 rounded-2xl border border-border/60 bg-surface p-4 animate-pulse">
        <div className="h-10 w-10 rounded-full bg-border/40" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-24 rounded bg-border/40" />
          <div className="h-3 w-16 rounded bg-border/40" />
        </div>
      </div>
    );
  }

  // ── Error ──
  if (wx.status === "error") {
    return (
      <div className="mb-5 flex items-center gap-3 rounded-2xl border border-border/60 bg-surface px-4 py-3 text-sm text-muted-foreground">
        <Cloud className="h-5 w-5 shrink-0" />
        <span>Clima indisponível agora</span>
      </div>
    );
  }

  // ── OK ──
  const { Icon, label, color } = getWMO(wx.wmo);

  return (
    <div className="mb-5 overflow-hidden rounded-2xl border border-border/60 bg-surface">
      {/* Current */}
      <div className="flex items-center gap-4 px-4 pt-4 pb-3">
        <Icon className="h-12 w-12 shrink-0" style={{ color }} strokeWidth={1.4} />
        <div className="flex-1 min-w-0">
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold leading-none text-foreground">{wx.temp}°</span>
            <span className="mb-1 text-sm text-muted-foreground">C</span>
          </div>
          <p className="mt-0.5 text-sm text-muted-foreground">{label}</p>
        </div>
        <div className="text-right text-[11px] text-muted-foreground space-y-1">
          <p className="uppercase tracking-wider text-gold text-[10px]">New York</p>
          <div className="flex items-center justify-end gap-1">
            <Thermometer className="h-3 w-3" />
            <span>Sensação {wx.feels}°</span>
          </div>
          <div className="flex items-center justify-end gap-1">
            <Droplets className="h-3 w-3" />
            <span>{wx.humidity}% umid.</span>
          </div>
          <div className="flex items-center justify-end gap-1">
            <Wind className="h-3 w-3" />
            <span>{wx.wind} km/h</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 h-px bg-border/50" />

      {/* 7-day forecast */}
      <div className="flex overflow-x-auto px-3 py-3 gap-1 scrollbar-none">
        {wx.forecast.map((day, i) => {
          const { Icon: DIcon, color: dc } = getWMO(day.wmo);
          const isToday = i === 0;
          return (
            <div
              key={day.date}
              className={`flex min-w-[52px] flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 ${
                isToday ? "bg-gold/10 ring-1 ring-gold/30" : ""
              }`}
            >
              <span className={`text-[10px] font-medium uppercase tracking-wider ${isToday ? "text-gold" : "text-muted-foreground"}`}>
                {isToday ? "Hoje" : day.label}
              </span>
              <DIcon className="h-4 w-4" style={{ color: dc }} strokeWidth={1.5} />
              <span className="text-xs font-semibold text-foreground">{day.tMax}°</span>
              <span className="text-[10px] text-muted-foreground">{day.tMin}°</span>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 pb-2.5 text-[10px] text-muted-foreground/60 text-right">
        Atualizado às {wx.updatedAt} · Open-Meteo
      </div>
    </div>
  );
}
