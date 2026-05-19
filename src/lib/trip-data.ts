export type TimelineItem = { time?: string; text: string; warn?: boolean; star?: boolean };
export type Day = {
  n: number;
  date: string; // ISO 2026-06-20
  label: string; // Sábado 20/06
  title: string;
  subtitle: string;
  items: TimelineItem[];
};

export const TRIP_START = "2026-06-20";

export const days: Day[] = [
  {
    n: 1, date: "2026-06-20", label: "Sábado 20/06",
    title: "Chegada + Times Square", subtitle: "Dia leve de adaptação",
    items: [
      { time: "15:00", text: "Pouso em LGA · Uber para o hotel" },
      { time: "16:30", text: "Check-in · Margaritaville Resort Times Square (560 7th Ave)" },
      { time: "18:30", text: "Times Square · Broadway District · primeiras fotos" },
      { time: "20:00", text: "Jantar: Los Tacos No.1" },
      { time: "21:00", text: "Sobremesa: Junior's (cheesecake)" },
      { time: "22:00", text: "Dormir cedo" },
    ],
  },
  {
    n: 2, date: "2026-06-21", label: "Domingo 21/06",
    title: "Midtown + Broadway", subtitle: "Pontos clássicos + 🎭 Harry Potter",
    items: [
      { time: "08:00", text: "Café rápido próximo ao hotel" },
      { time: "09:00", text: "Bryant Park → Biblioteca Pública NY → Grand Central → Chrysler (externo) → St. Patrick → 5th Avenue" },
      { time: "12:45", text: "Almoço: Joe's Pizza" },
      { time: "13:30", text: "Rockefeller Center · Top of the Rock" },
      { time: "17:30", text: "Retorno hotel · descanso" },
      { time: "19:00", text: "Jantar: Tanner Smith's" },
      { time: "21:00", text: "🎭 Musical Harry Potter (Broadway)", star: true },
      { time: "23:45", text: "Retorno hotel" },
    ],
  },
  {
    n: 3, date: "2026-06-22", label: "Segunda 22/06",
    title: "Central Park + Museus", subtitle: "Dia mais leve",
    items: [
      { time: "08:30", text: "Café: Ess-a-Bagel (ir cedo!)" },
      { time: "09:30", text: "Central Park: Bethesda Terrace · Bow Bridge · The Mall · Sheep Meadow" },
      { time: "13:00", text: "Museu: American Museum of Natural History OU MOMA" },
      { time: "16:30", text: "Retorno hotel · descanso" },
      { time: "19:30", text: "Jantar: The Smith (Lincoln Square)" },
    ],
  },
  {
    n: 4, date: "2026-06-23", label: "Terça 23/06",
    title: "Downtown + Brooklyn", subtitle: "Brooklyn Bridge ao pôr do sol",
    items: [
      { time: "09:00", text: "World Trade Center Memorial · Oculus · Wall Street · Charging Bull" },
      { time: "12:45", text: "Almoço: Xi'an Famous Foods" },
      { time: "14:00", text: "Battery Park · região sul de Manhattan" },
      { time: "17:30", text: "Caminhada Brooklyn Bridge" },
      { time: "18:30", text: "🌇 Pôr do sol em Dumbo (PRIORIDADE)", star: true },
      { time: "19:30", text: "Jantar: Juliana's Pizza (Brooklyn)" },
    ],
  },
  {
    n: 5, date: "2026-06-24", label: "Quarta 24/06 ⚽",
    title: "SoHo + West Village + Brasil x Scotland", subtitle: "Dia do jogo",
    items: [
      { time: "10:00", text: "SoHo · Little Italy · Chinatown" },
      { time: "13:00", text: "Almoço: Sugarfish (SoHo)" },
      { time: "14:30", text: "West Village: Friends Building · Ghostbusters HQ" },
      { time: "18:00", text: "Levain Bakery (cookie)" },
      { time: "19:00", text: "⚽ BRASIL x SCOTLAND — Smithfield Hall · Plano B: Football Factory at Legends", star: true },
      { text: "AVISO: Chegar cedo ao bar, vai lotar!", warn: true },
    ],
  },
  {
    n: 6, date: "2026-06-25", label: "Quinta 25/06",
    title: "Hudson Yards + High Line + COTE", subtitle: "Dia premium ✨",
    items: [
      { time: "10:00", text: "Hudson Yards · The Vessel" },
      { time: "13:00", text: "Almoço: Chelsea Market (cada um escolhe algo diferente)" },
      { time: "14:00", text: "High Line (caminhada completa) · Little Island" },
      { time: "18:00", text: "Retorno hotel · descanso · roupa do jantar" },
      { time: "20:00", text: "⭐ Jantar: COTE Korean Steakhouse (reserva obrigatória!)", star: true },
    ],
  },
  {
    n: 7, date: "2026-06-26", label: "Sexta 26/06",
    title: "Dia Livre", subtitle: "Absorver a cidade sem pressão",
    items: [
      { text: "Manhã e tarde livres: compras, repetir favorito, descanso, rooftop" },
      { time: "20:00", text: "Jantar: Monkey Bar" },
    ],
  },
  {
    n: 8, date: "2026-06-27", label: "Sábado 27/06",
    title: "Retorno ao Brasil ✈️", subtitle: "Voo de volta",
    items: [
      { text: "Manhã tranquila · malas" },
      { time: "16:30", text: "Saída hotel → Newark (EWR)" },
      { time: "20:30", text: "✈️ Voo de volta ao Brasil" },
      { text: "⚠️ Newark pode ter muito trânsito. Sair com 4h de antecedência!", warn: true },
    ],
  },
];

export type Restaurant = {
  meal: "Café" | "Almoço" | "Jantar" | "Sobremesa" | "Lanche" | "Jogo" | "Plano B";
  name: string; desc: string; price?: string; day: number; star?: boolean; query: string;
};

export const restaurants: Restaurant[] = [
  { meal: "Jantar", name: "Los Tacos No.1", desc: "Tacos", price: "US$15–25", day: 1, query: "Los Tacos No.1 New York" },
  { meal: "Sobremesa", name: "Junior's", desc: "Cheesecake de NY · Times Square", day: 1, query: "Junior's Times Square" },
  { meal: "Almoço", name: "Joe's Pizza", desc: "Pizza clássica NY", price: "US$10–20", day: 2, query: "Joe's Pizza New York" },
  { meal: "Jantar", name: "Tanner Smith's", desc: "Casual sofisticado", price: "US$40–70", day: 2, query: "Tanner Smith's New York" },
  { meal: "Café", name: "Ess-a-Bagel", desc: "Bagel tradicional NY · ir cedo", day: 3, query: "Ess-a-Bagel New York" },
  { meal: "Jantar", name: "The Smith", desc: "Casual sofisticado Lincoln Square", price: "US$40–65", day: 3, query: "The Smith Lincoln Square" },
  { meal: "Almoço", name: "Xi'an Famous Foods", desc: "Noodles chineses", price: "US$15–25", day: 4, query: "Xi'an Famous Foods New York" },
  { meal: "Jantar", name: "Juliana's Pizza", desc: "Pizza Brooklyn", price: "US$30–50", day: 4, query: "Juliana's Pizza Brooklyn" },
  { meal: "Almoço", name: "Sugarfish", desc: "Sushi SoHo", day: 5, query: "Sugarfish SoHo" },
  { meal: "Lanche", name: "Levain Bakery", desc: "Cookie famoso de NY", day: 5, query: "Levain Bakery New York" },
  { meal: "Jogo", name: "Smithfield Hall", desc: "Sports bar Brasil x Scotland", day: 5, query: "Smithfield Hall NYC" },
  { meal: "Plano B", name: "Football Factory at Legends", desc: "Sports bar futebol", day: 5, query: "Football Factory at Legends NYC" },
  { meal: "Almoço", name: "Chelsea Market", desc: "Mercado gastronômico", day: 6, query: "Chelsea Market New York" },
  { meal: "Jantar", name: "COTE Korean Steakhouse", desc: "Korean BBQ Flatiron · RESERVAR!", price: "US$65–85", day: 6, star: true, query: "COTE Korean Steakhouse New York" },
  { meal: "Jantar", name: "Monkey Bar", desc: "Clássico moderno NY", price: "US$60–80", day: 7, star: true, query: "Monkey Bar New York" },
];

export const checklistGroups: { title: string; items: string[] }[] = [
  { title: "Reservas Urgentes", items: [
    "Musical Harry Potter (Broadway)",
    "COTE Korean Steakhouse (25/06)",
    "Top of the Rock (observatório)",
    "Estátua da Liberdade (ferry)",
    "Sugarfish",
  ]},
  { title: "Ingressos & Atrações", items: [
    "American Museum of Natural History ou MOMA",
    "Confirmar horário do jogo Brasil x Scotland",
  ]},
  { title: "Documentos & Prep", items: [
    "Passaportes",
    "Seguro viagem",
    "Dólares em espécie",
    "Cartão internacional",
    "Download offline Google Maps NY",
    "Adaptador de tomada",
  ]},
  { title: "No dia da chegada", items: [
    "Uber do LGA ao hotel reservado",
    "Check-in Margaritaville Resort",
  ]},
];

export const expenseCategories = ["Comida", "Transporte", "Passeio", "Compras", "Outro"] as const;
export type ExpenseCategory = (typeof expenseCategories)[number];
