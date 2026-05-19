import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, AlertTriangle, Star } from "lucide-react";
import { days, TRIP_START } from "@/lib/trip-data";
import { DayMap } from "@/components/DayMap";

export const Route = createFileRoute("/")({
  component: RoteiroPage,
  head: () => ({ meta: [{ title: "Roteiro · NYC 2026" }] }),
});

function useCountdown(targetISO: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(id);
  }, []);
  const diff = new Date(targetISO + "T00:00:00").getTime() - now;
  const dayMs = 86_400_000;
  return Math.max(0, Math.ceil(diff / dayMs));
}

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function RoteiroPage() {
  const today = todayISO();
  const daysLeft = useCountdown(TRIP_START);
  const initialOpen = useMemo(() => {
    const t = days.find((d) => d.date === today);
    return t ? t.n : days[0].n;
  }, [today]);
  const [open, setOpen] = useState<number>(initialOpen);

  return (
    <div className="px-5 pt-12">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">New York City</p>
        <h1 className="mt-1 font-semibold text-3xl leading-tight text-foreground">
          20–27 Jun <span className="text-muted-foreground">·</span> 2026
        </h1>
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border/60 bg-surface p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
            <span className="text-xl font-bold">{daysLeft}</span>
          </div>
          <div>
            <p className="text-sm text-foreground">{daysLeft === 0 ? "É hoje!" : `${daysLeft} dias para a viagem`}</p>
            <p className="text-xs text-muted-foreground">Countdown até 20/06/2026</p>
          </div>
        </div>
      </header>

      <h2 className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">Roteiro · 8 dias</h2>

      <ul className="flex flex-col gap-3 pb-8">
        {days.map((d) => {
          const isToday = d.date === today;
          const isOpen = open === d.n;
          return (
            <li
              key={d.n}
              className={`overflow-hidden rounded-2xl border bg-surface transition-colors ${
                isToday ? "border-gold/60 shadow-[0_0_0_1px_var(--gold)]" : "border-border/60"
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? -1 : d.n)}
                className="flex w-full items-center gap-4 p-4 text-left"
              >
                <div className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl ${isToday ? "bg-gold text-primary-foreground" : "bg-background text-gold"}`}>
                  <span className="text-[10px] font-medium uppercase tracking-wider opacity-70">Dia</span>
                  <span className="text-base font-bold leading-none">{d.n}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{d.label}{isToday && " · Hoje"}</p>
                  <p className="truncate text-sm font-semibold text-foreground">{d.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{d.subtitle}</p>
                </div>
                <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180 text-gold" : ""}`} />
              </button>

              {isOpen && (
                <div className="border-t border-border/60 px-4 py-4">
                  {/* MAP */}
                  <DayMap items={d.items} dayN={d.n} />

                  {/* TIMELINE */}
                  <ol className="flex flex-col gap-3">
                    {d.items.map((it, i) => (
                      <li key={i} className="flex gap-3">
                        <div className="flex w-14 shrink-0 flex-col items-start">
                          {it.time ? (
                            <span className="rounded-md bg-background px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-gold">{it.time}</span>
                          ) : (
                            <span className="text-[11px] text-muted-foreground">—</span>
                          )}
                        </div>
                        <div className="relative flex-1 pb-1">
                          <div className={`flex items-start gap-2 text-sm ${it.warn ? "text-red-accent" : "text-foreground"}`}>
                            {it.warn && <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />}
                            {it.star && <Star className="mt-0.5 h-4 w-4 shrink-0 text-gold" />}
                            <span className="leading-snug">{it.text}</span>
                          </div>
                          {/* Maps button for items with coords */}
                          {it.coords && it.mapsQuery && (
                            <a
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(it.mapsQuery)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-1 inline-flex items-center gap-1 rounded-lg border border-gold/30 bg-gold/5 px-2 py-0.5 text-[11px] text-gold active:bg-gold/15"
                            >
                              📍 Maps
                            </a>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
