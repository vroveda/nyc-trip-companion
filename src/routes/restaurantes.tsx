import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Star } from "lucide-react";
import { restaurants } from "@/lib/trip-data";

export const Route = createFileRoute("/restaurantes")({
  component: RestaurantesPage,
  head: () => ({ meta: [{ title: "Restaurantes · NYC 2026" }] }),
});

function RestaurantesPage() {
  return (
    <div className="px-5 pt-12">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Onde comer</p>
        <h1 className="mt-1 text-3xl font-semibold text-foreground">Restaurantes</h1>
        <p className="mt-1 text-sm text-muted-foreground">{restaurants.length} paradas pela cidade</p>
      </header>

      <ul className="flex flex-col gap-3">
        {restaurants.map((r) => (
          <li key={r.name} className="rounded-2xl border border-border/60 bg-surface p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-gold/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gold">
                    {r.meal}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Dia {r.day}</span>
                  {r.star && <Star className="h-3.5 w-3.5 fill-gold text-gold" />}
                </div>
                <h3 className="mt-2 text-base font-semibold text-foreground">{r.name}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{r.desc}</p>
                {r.price && <p className="mt-1 text-xs font-medium text-gold">{r.price}</p>}
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.query)}`}
              target="_blank" rel="noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-gold/40 bg-gold/5 py-2.5 text-sm font-medium text-gold transition-colors active:bg-gold/15"
            >
              <MapPin className="h-4 w-4" />
              Abrir no Maps
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
