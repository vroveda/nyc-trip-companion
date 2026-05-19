import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { checklistGroups } from "@/lib/trip-data";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const Route = createFileRoute("/checklist")({
  component: ChecklistPage,
  head: () => ({ meta: [{ title: "Checklist · NYC 2026" }] }),
});

function ChecklistPage() {
  const [checked, setChecked] = useLocalStorage<Record<string, boolean>>("nyc-checklist", {});
  const total = checklistGroups.reduce((a, g) => a + g.items.length, 0);
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="px-5 pt-12">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Preparação</p>
        <h1 className="mt-1 text-3xl font-semibold text-foreground">Checklist</h1>
        <div className="mt-4 rounded-2xl border border-border/60 bg-surface p-4">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Progresso</span>
            <span className="text-sm font-semibold text-foreground">{done}/{total}</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-background">
            <div className="h-full bg-gold transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </header>

      <div className="flex flex-col gap-6">
        {checklistGroups.map((g) => (
          <section key={g.title}>
            <h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{g.title}</h2>
            <ul className="flex flex-col gap-2">
              {g.items.map((it) => {
                const key = `${g.title}::${it}`;
                const isOn = !!checked[key];
                return (
                  <li key={key}>
                    <button
                      onClick={() => setChecked({ ...checked, [key]: !isOn })}
                      className="flex w-full items-center gap-3 rounded-2xl border border-border/60 bg-surface p-4 text-left"
                    >
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${isOn ? "border-gold bg-gold text-primary-foreground" : "border-border bg-background"}`}>
                        {isOn && <Check className="h-4 w-4" strokeWidth={3} />}
                      </span>
                      <span className={`flex-1 text-sm ${isOn ? "text-muted-foreground line-through" : "text-foreground"}`}>{it}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
