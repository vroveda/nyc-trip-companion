import { useEffect, useRef } from "react";
import { MapPin, Navigation } from "lucide-react";
import type { TimelineItem } from "@/lib/trip-data";

interface DayMapProps {
  items: TimelineItem[];
  dayN: number;
}

// Leaflet is loaded via CDN in index.html — declare types minimally
declare const L: any;

const PIN_COLORS = [
  "#c9a84c", "#e07070", "#7ec8a4", "#7ab8e8",
  "#c97de0", "#e0a87d", "#a8e07d", "#7de0d8",
];

export function DayMap({ items, dayN }: DayMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const mappable = items.filter((it) => it.coords);

  useEffect(() => {
    if (!mapRef.current || mappable.length === 0) return;
    if (typeof L === "undefined") return;

    // Destroy previous instance if exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const center = mappable[0].coords!;
    const map = L.map(mapRef.current, {
      center: [center.lat, center.lng],
      zoom: 14,
      zoomControl: false,
      attributionControl: false,
    });

    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 19,
    }).addTo(map);

    const bounds: [number, number][] = [];

    mappable.forEach((item, i) => {
      const { lat, lng } = item.coords!;
      bounds.push([lat, lng]);
      const color = PIN_COLORS[i % PIN_COLORS.length];
      const num = i + 1;

      const icon = L.divIcon({
        className: "",
        html: `<div style="
          width:28px;height:28px;border-radius:50%;
          background:${color};border:2px solid rgba(255,255,255,0.9);
          display:flex;align-items:center;justify-content:center;
          font-weight:700;font-size:12px;color:#1a1612;
          box-shadow:0 2px 8px rgba(0,0,0,0.5);
          font-family:system-ui,sans-serif;
        ">${num}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const label = item.text.replace(/^(Jantar|Almoço|Café|Almoço|Lanche):\s*/i, "");
      const popup = L.popup({
        closeButton: false,
        className: "day-map-popup",
        offset: [0, -6],
      }).setContent(`
        <div style="
          background:#242018;border:1px solid rgba(201,168,76,0.3);
          border-radius:10px;padding:10px 12px;min-width:160px;
          font-family:system-ui,sans-serif;
        ">
          <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;">
            <div style="
              width:20px;height:20px;border-radius:50%;background:${color};
              display:flex;align-items:center;justify-content:center;
              font-weight:700;font-size:10px;color:#1a1612;flex-shrink:0;
            ">${num}</div>
            <span style="color:#f5f0e8;font-size:13px;font-weight:600;line-height:1.3;">${label}</span>
          </div>
          ${item.time ? `<div style="color:#c9a84c;font-size:11px;margin-bottom:8px;">🕐 ${item.time}</div>` : ""}
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapsQuery ?? label)}"
             target="_blank"
             style="
               display:flex;align-items:center;justify-content:center;gap:5px;
               background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.35);
               color:#c9a84c;border-radius:7px;padding:6px 10px;
               font-size:12px;font-weight:500;text-decoration:none;
             ">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            Abrir no Maps
          </a>
        </div>
      `);

      L.marker([lat, lng], { icon }).addTo(map).bindPopup(popup);
    });

    if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [24, 24] });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [dayN]);

  if (mappable.length === 0) return null;

  return (
    <div className="mb-4">
      {/* Legend */}
      <div className="mb-2 flex items-center gap-2">
        <MapPin className="h-3.5 w-3.5 text-gold" />
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {mappable.length} paradas no mapa · toque para abrir no Maps
        </span>
      </div>

      {/* Map */}
      <div
        ref={mapRef}
        className="w-full overflow-hidden rounded-2xl border border-border/60"
        style={{ height: 220 }}
      />

      {/* Pin legend below map */}
      <div className="mt-2 flex flex-wrap gap-1.5">
        {mappable.map((item, i) => {
          const label = item.text.replace(/^(Jantar|Almoço|Café|Lanche):\s*/i, "").split("·")[0].trim();
          return (
            <a
              key={i}
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapsQuery ?? label)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-border/50 bg-surface px-2.5 py-1 text-[11px] text-foreground active:bg-gold/10"
            >
              <span
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-[#1a1612]"
                style={{ background: PIN_COLORS[i % PIN_COLORS.length] }}
              >
                {i + 1}
              </span>
              <span className="max-w-[120px] truncate">{label}</span>
              <Navigation className="h-2.5 w-2.5 shrink-0 text-muted-foreground" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
