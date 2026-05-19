import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { expenseCategories, type ExpenseCategory, days } from "@/lib/trip-data";

export const Route = createFileRoute("/gastos")({
  component: GastosPage,
  head: () => ({ meta: [{ title: "Gastos · NYC 2026" }] }),
});

type Expense = {
  id: string;
  desc: string;
  amount: number;
  category: ExpenseCategory;
  day: number;
};

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function GastosPage() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>("nyc-expenses", []);
  const [budget, setBudget] = useLocalStorage<number>("nyc-budget", 0);
  const [showForm, setShowForm] = useState(false);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("Comida");
  const [day, setDay] = useState<number>(1);

  const total = expenses.reduce((a, e) => a + e.amount, 0);
  const remaining = budget - total;
  const byDay = days.map((d) => ({
    day: d,
    total: expenses.filter((e) => e.day === d.n).reduce((a, e) => a + e.amount, 0),
  }));

  function add() {
    const amt = parseFloat(amount.replace(",", "."));
    if (!desc.trim() || !Number.isFinite(amt) || amt <= 0) return;
    setExpenses([{ id: crypto.randomUUID(), desc: desc.trim(), amount: amt, category, day }, ...expenses]);
    setDesc(""); setAmount(""); setShowForm(false);
  }

  function remove(id: string) {
    setExpenses(expenses.filter((e) => e.id !== id));
  }

  return (
    <div className="px-5 pt-12">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Carteira</p>
        <h1 className="mt-1 text-3xl font-semibold text-foreground">Gastos</h1>
      </header>

      <div className="rounded-2xl border border-border/60 bg-surface p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Total gasto</p>
        <p className="mt-1 text-3xl font-bold text-gold tabular-nums">{fmt(total)}</p>
        <div className="mt-4 flex items-center gap-3">
          <label className="text-xs text-muted-foreground">Budget</label>
          <input
            inputMode="decimal"
            value={budget || ""}
            onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
            placeholder="0"
            className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-sm tabular-nums text-foreground outline-none focus:border-gold"
          />
        </div>
        {budget > 0 && (
          <p className={`mt-2 text-xs ${remaining < 0 ? "text-red-accent" : "text-muted-foreground"}`}>
            Restante: <span className="font-semibold tabular-nums">{fmt(remaining)}</span>
          </p>
        )}
      </div>

      <button
        onClick={() => setShowForm((s) => !s)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gold py-3 text-sm font-semibold text-primary-foreground"
      >
        <Plus className="h-4 w-4" /> {showForm ? "Cancelar" : "Adicionar gasto"}
      </button>

      {showForm && (
        <div className="mt-3 flex flex-col gap-2 rounded-2xl border border-border/60 bg-surface p-4">
          <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Descrição" className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-gold" />
          <input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" placeholder="Valor (USD)" className="rounded-lg border border-border bg-background px-3 py-2 text-sm tabular-nums text-foreground outline-none focus:border-gold" />
          <div className="flex gap-2">
            <select value={category} onChange={(e) => setCategory(e.target.value as ExpenseCategory)} className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-gold">
              {expenseCategories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={day} onChange={(e) => setDay(Number(e.target.value))} className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-gold">
              {days.map((d) => <option key={d.n} value={d.n}>Dia {d.n}</option>)}
            </select>
          </div>
          <button onClick={add} className="mt-1 rounded-lg bg-gold py-2 text-sm font-semibold text-primary-foreground">Salvar</button>
        </div>
      )}

      <h2 className="mb-2 mt-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">Por dia</h2>
      <ul className="mb-6 flex flex-col gap-1.5">
        {byDay.map(({ day: d, total: t }) => (
          <li key={d.n} className="flex items-center justify-between rounded-xl border border-border/40 bg-surface px-4 py-2.5">
            <div>
              <p className="text-xs text-muted-foreground">{d.label}</p>
              <p className="text-sm text-foreground">Dia {d.n} · {d.title}</p>
            </div>
            <span className="text-sm font-semibold tabular-nums text-gold">{fmt(t)}</span>
          </li>
        ))}
      </ul>

      <h2 className="mb-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">Lançamentos</h2>
      {expenses.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border/60 p-6 text-center text-sm text-muted-foreground">Nenhum gasto ainda.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {expenses.map((e) => (
            <li key={e.id} className="flex items-center gap-3 rounded-2xl border border-border/60 bg-surface p-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground">{e.desc}</p>
                <p className="text-xs text-muted-foreground">{e.category} · Dia {e.day}</p>
              </div>
              <span className="text-sm font-semibold tabular-nums text-gold">{fmt(e.amount)}</span>
              <button onClick={() => remove(e.id)} className="p-1 text-muted-foreground active:text-red-accent">
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
