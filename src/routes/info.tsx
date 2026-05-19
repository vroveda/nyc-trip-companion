import { createFileRoute } from "@tanstack/react-router";
import { Building2, Plane, Trophy, Mountain, Car, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/info")({
  component: InfoPage,
  head: () => ({ meta: [{ title: "Info · NYC 2026" }] }),
});

function Card({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border/60 bg-surface p-5">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-gold" />
        <h2 className="text-xs uppercase tracking-[0.2em] text-gold">{title}</h2>
      </div>
      <div className="text-sm text-foreground">{children}</div>
    </section>
  );
}

function InfoPage() {
  return (
    <div className="px-5 pt-12">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-gold">Essenciais</p>
        <h1 className="mt-1 text-3xl font-semibold text-foreground">Info da viagem</h1>
      </header>

      <div className="flex flex-col gap-4">
        <Card icon={Building2} title="Hotel">
          <p className="font-semibold">Margaritaville Resort Times Square</p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Margaritaville+Resort+Times+Square"
            target="_blank" rel="noreferrer"
            className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"
          >
            <MapPin className="h-3.5 w-3.5" /> 560 7th Ave, New York, NY 10018
          </a>
          <a href="tel:+12122213007" className="mt-1 flex items-center gap-1.5 text-sm text-gold">
            <Phone className="h-3.5 w-3.5" /> +1 212-221-3007
          </a>
        </Card>

        <Card icon={Plane} title="Voos">
          <div className="flex flex-col gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Chegada</p>
              <p>20/06 · LGA · 15h00 <span className="text-muted-foreground">(saiu MCO 12h19)</span></p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Partida</p>
              <p>27/06 · EWR · 20h30</p>
            </div>
          </div>
        </Card>

        <Card icon={Trophy} title="Jogo do Brasil">
          <p>24/06 às 19h · <span className="font-semibold">Brasil x Scotland</span></p>
          <p className="mt-1 text-muted-foreground">Plano A: Smithfield Hall</p>
          <p className="text-muted-foreground">Plano B: Football Factory at Legends</p>
        </Card>

        <Card icon={Mountain} title="Observatórios — ranking">
          <ol className="flex flex-col gap-1.5">
            {["Top of the Rock", "Edge", "Summit", "Empire State Building", "One World Observatory"].map((o, i) => (
              <li key={o} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gold/10 text-xs font-bold text-gold">{i + 1}</span>
                <span>{o}</span>
              </li>
            ))}
          </ol>
        </Card>

        <Card icon={Car} title="Transporte">
          <ul className="flex list-inside list-disc flex-col gap-1 text-sm marker:text-gold">
            <li>Prioridade: ir a pé sempre que possível</li>
            <li>Uber/táxi para deslocamentos estratégicos</li>
            <li>Metrô só quando realmente necessário</li>
          </ul>
          <p className="mt-3 rounded-xl border border-red-accent/40 bg-red-accent/10 p-3 text-xs text-red-accent">
            ⚠️ Newark tem muito trânsito — sair cedo no dia 27 (4h de antecedência).
          </p>
        </Card>
      </div>
    </div>
  );
}
