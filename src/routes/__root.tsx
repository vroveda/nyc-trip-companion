import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Calendar, UtensilsCrossed, CheckSquare, Wallet, Info } from "lucide-react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gold">404</h1>
        <p className="mt-4 text-muted-foreground">Página não encontrada</p>
        <Link to="/" className="mt-6 inline-flex rounded-2xl bg-gold px-4 py-2 text-sm font-medium text-primary-foreground">
          Voltar
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">Algo deu errado</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-2xl bg-gold px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#1a1612" },
      { title: "NYC · Junho 2026" },
      { name: "description", content: "Companion de viagem para NYC, 20–27 de Junho de 2026." },
      { property: "og:title", content: "NYC · Junho 2026" },
      { name: "twitter:title", content: "NYC · Junho 2026" },
      { property: "og:description", content: "Companion de viagem para NYC, 20–27 de Junho de 2026." },
      { name: "twitter:description", content: "Companion de viagem para NYC, 20–27 de Junho de 2026." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/567bf218-26f7-4235-b7d7-24bfb50fb30f/id-preview-a4bd4e9f--c5441b0b-5081-4c0b-ad42-893d004b04f7.lovable.app-1779229854309.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/567bf218-26f7-4235-b7d7-24bfb50fb30f/id-preview-a4bd4e9f--c5441b0b-5081-4c0b-ad42-893d004b04f7.lovable.app-1779229854309.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="dark">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

const tabs = [
  { to: "/", label: "Roteiro", icon: Calendar },
  { to: "/restaurantes", label: "Comida", icon: UtensilsCrossed },
  { to: "/checklist", label: "Lista", icon: CheckSquare },
  { to: "/gastos", label: "Gastos", icon: Wallet },
  { to: "/info", label: "Info", icon: Info },
] as const;

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background pb-24">
        <Outlet />
      </div>
      <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-md -translate-x-1/2 border-t border-border bg-surface/95 backdrop-blur-lg">
        <ul className="flex items-stretch justify-around px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2">
          {tabs.map(({ to, label, icon: Icon }) => (
            <li key={to} className="flex-1">
              <Link
                to={to}
                activeOptions={{ exact: true }}
                className="flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-medium text-muted-foreground transition-colors data-[status=active]:text-gold"
              >
                <Icon className="h-5 w-5" strokeWidth={1.8} />
                <span className="tracking-wide">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </QueryClientProvider>
  );
}
