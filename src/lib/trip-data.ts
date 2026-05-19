export type LatLng = { lat: number; lng: number };

export type TimelineItem = {
  time?: string;
  text: string;
  warn?: boolean;
  star?: boolean;
  coords?: LatLng;
  mapsQuery?: string;
};

export type Day = {
  n: number;
  date: string;
  label: string;
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
      { time: "15:00", text: "Pouso em LGA · Uber para o hotel", coords: { lat: 40.7769, lng: -73.8740 }, mapsQuery: "LaGuardia Airport New York" },
      { time: "16:30", text: "Check-in · Margaritaville Resort Times Square", coords: { lat: 40.7558, lng: -73.9908 }, mapsQuery: "Margaritaville Resort Times Square" },
      { time: "18:30", text: "Times Square · Broadway District", coords: { lat: 40.7580, lng: -73.9855 }, mapsQuery: "Times Square New York" },
      { time: "20:00", text: "Jantar: Los Tacos No.1", coords: { lat: 40.7574, lng: -73.9877 }, mapsQuery: "Los Tacos No.1 Times Square New York" },
      { time: "21:00", text: "Sobremesa: Junior's (cheesecake)", coords: { lat: 40.7568, lng: -73.9875 }, mapsQuery: "Junior's Restaurant Times Square" },
    ],
  },
  {
    n: 2, date: "2026-06-21", label: "Domingo 21/06",
    title: "Midtown + Broadway", subtitle: "Pontos clássicos + 🎭 Harry Potter",
    items: [
      { time: "09:00", text: "Bryant Park", coords: { lat: 40.7536, lng: -73.9832 }, mapsQuery: "Bryant Park New York" },
      { time: "09:30", text: "Biblioteca Pública de NY", coords: { lat: 40.7532, lng: -73.9822 }, mapsQuery: "New York Public Library" },
      { time: "10:00", text: "Grand Central Terminal", coords: { lat: 40.7527, lng: -73.9772 }, mapsQuery: "Grand Central Terminal New York" },
      { time: "10:45", text: "Chrysler Building (externo)", coords: { lat: 40.7516, lng: -73.9755 }, mapsQuery: "Chrysler Building New York" },
      { time: "11:15", text: "St. Patrick's Cathedral", coords: { lat: 40.7586, lng: -73.9762 }, mapsQuery: "St Patrick's Cathedral New York" },
      { time: "11:45", text: "5th Avenue · lojas", coords: { lat: 40.7614, lng: -73.9776 }, mapsQuery: "5th Avenue New York" },
      { time: "12:45", text: "Almoço: Joe's Pizza", coords: { lat: 40.7547, lng: -73.9974 }, mapsQuery: "Joe's Pizza New York" },
      { time: "13:30", text: "Rockefeller Center · Top of the Rock", coords: { lat: 40.7587, lng: -73.9787 }, mapsQuery: "Rockefeller Center New York" },
      { time: "19:00", text: "Jantar: Tanner Smith's", coords: { lat: 40.7561, lng: -73.9904 }, mapsQuery: "Tanner Smith's New York" },
      { time: "21:00", text: "🎭 Musical Harry Potter (Broadway)", star: true, coords: { lat: 40.7590, lng: -73.9845 }, mapsQuery: "Broadway Theatre New York Harry Potter" },
    ],
  },
  {
    n: 3, date: "2026-06-22", label: "Segunda 22/06",
    title: "Central Park + Museus", subtitle: "Dia mais leve",
    items: [
      { time: "08:30", text: "Café: Ess-a-Bagel (ir cedo!)", coords: { lat: 40.7527, lng: -73.9701 }, mapsQuery: "Ess-a-Bagel New York" },
      { time: "09:30", text: "Central Park · Bethesda Terrace", coords: { lat: 40.7739, lng: -73.9712 }, mapsQuery: "Bethesda Terrace Central Park" },
      { time: "10:15", text: "Bow Bridge · Central Park", coords: { lat: 40.7759, lng: -73.9735 }, mapsQuery: "Bow Bridge Central Park New York" },
      { time: "11:00", text: "The Mall · Sheep Meadow", coords: { lat: 40.7694, lng: -73.9736 }, mapsQuery: "The Mall Central Park New York" },
      { time: "13:00", text: "American Museum of Natural History", coords: { lat: 40.7813, lng: -73.9740 }, mapsQuery: "American Museum of Natural History New York" },
      { time: "19:30", text: "Jantar: The Smith", coords: { lat: 40.7742, lng: -73.9819 }, mapsQuery: "The Smith Lincoln Square New York" },
    ],
  },
  {
    n: 4, date: "2026-06-23", label: "Terça 23/06",
    title: "Downtown + Brooklyn", subtitle: "Brooklyn Bridge ao pôr do sol",
    items: [
      { time: "09:00", text: "World Trade Center Memorial", coords: { lat: 40.7115, lng: -74.0131 }, mapsQuery: "9/11 Memorial New York" },
      { time: "09:45", text: "Oculus · WTC", coords: { lat: 40.7113, lng: -74.0127 }, mapsQuery: "Oculus World Trade Center New York" },
      { time: "10:30", text: "Wall Street · Charging Bull", coords: { lat: 40.7056, lng: -74.0134 }, mapsQuery: "Charging Bull Wall Street New York" },
      { time: "12:45", text: "Almoço: Xi'an Famous Foods", coords: { lat: 40.7137, lng: -74.0072 }, mapsQuery: "Xi'an Famous Foods New York" },
      { time: "14:00", text: "Battery Park", coords: { lat: 40.7033, lng: -74.0170 }, mapsQuery: "Battery Park New York" },
      { time: "17:30", text: "Caminhada Brooklyn Bridge", coords: { lat: 40.7061, lng: -73.9969 }, mapsQuery: "Brooklyn Bridge New York" },
      { time: "18:30", text: "🌇 Pôr do sol em Dumbo", star: true, coords: { lat: 40.7033, lng: -73.9881 }, mapsQuery: "Dumbo Brooklyn New York" },
      { time: "19:30", text: "Jantar: Juliana's Pizza", coords: { lat: 40.7026, lng: -73.9934 }, mapsQuery: "Juliana's Pizza Brooklyn" },
    ],
  },
  {
    n: 5, date: "2026-06-24", label: "Quarta 24/06 ⚽",
    title: "SoHo + West Village + Brasil x Scotland", subtitle: "Dia do jogo",
    items: [
      { time: "10:00", text: "SoHo · Little Italy · Chinatown", coords: { lat: 40.7233, lng: -74.0030 }, mapsQuery: "SoHo New York" },
      { time: "13:00", text: "Almoço: Sugarfish", coords: { lat: 40.7238, lng: -74.0019 }, mapsQuery: "Sugarfish SoHo New York" },
      { time: "14:30", text: "West Village · Friends Building", coords: { lat: 40.7339, lng: -74.0063 }, mapsQuery: "Friends Apartment Building New York" },
      { time: "15:15", text: "Ghostbusters HQ", coords: { lat: 40.7195, lng: -74.0058 }, mapsQuery: "Ghostbusters Firehouse New York" },
      { time: "18:00", text: "Levain Bakery", coords: { lat: 40.7281, lng: -74.0023 }, mapsQuery: "Levain Bakery New York" },
      { time: "19:00", text: "⚽ BRASIL x SCOTLAND · Smithfield Hall", star: true, coords: { lat: 40.7477, lng: -73.9983 }, mapsQuery: "Smithfield Hall New York" },
      { text: "⚠️ Chegar cedo ao bar, vai lotar!", warn: true },
    ],
  },
  {
    n: 6, date: "2026-06-25", label: "Quinta 25/06",
    title: "Hudson Yards + High Line + COTE", subtitle: "Dia premium ✨",
    items: [
      { time: "10:00", text: "The Vessel · Hudson Yards", coords: { lat: 40.7540, lng: -74.0019 }, mapsQuery: "The Vessel Hudson Yards New York" },
      { time: "13:00", text: "Almoço: Chelsea Market", coords: { lat: 40.7425, lng: -74.0059 }, mapsQuery: "Chelsea Market New York" },
      { time: "14:00", text: "High Line · caminhada completa", coords: { lat: 40.7480, lng: -74.0048 }, mapsQuery: "High Line New York" },
      { time: "15:30", text: "Little Island", coords: { lat: 40.7469, lng: -74.0093 }, mapsQuery: "Little Island New York" },
      { time: "20:00", text: "⭐ Jantar: COTE Korean Steakhouse", star: true, coords: { lat: 40.7404, lng: -73.9908 }, mapsQuery: "COTE Korean Steakhouse New York" },
    ],
  },
  {
    n: 7, date: "2026-06-26", label: "Sexta 26/06",
    title: "Dia Livre", subtitle: "Absorver a cidade sem pressão",
    items: [
      { text: "Manhã e tarde livres: compras, repetir favorito, descanso, rooftop" },
      { time: "20:00", text: "Jantar: Monkey Bar", coords: { lat: 40.7574, lng: -73.9754 }, mapsQuery: "Monkey Bar New York" },
    ],
  },
  {
    n: 8, date: "2026-06-27", label: "Sábado 27/06",
    title: "Retorno ao Brasil ✈️", subtitle: "Voo de volta",
    items: [
      { text: "Manhã tranquila · malas" },
      { time: "16:30", text: "Saída hotel → Newark (EWR)", coords: { lat: 40.6895, lng: -74.1745 }, mapsQuery: "Newark Liberty International Airport" },
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
  { meal: "Jantar",     name: "Los Tacos No.1",              desc: "Tacos",                              price: "US$15–25",  day: 1, query: "Los Tacos No.1 Times Square New York" },
  { meal: "Sobremesa",  name: "Junior's",                    desc: "Cheesecake de NY · Times Square",                        day: 1, query: "Junior's Restaurant Times Square" },
  { meal: "Almoço",    name: "Joe's Pizza",                  desc: "Pizza clássica NY",                  price: "US$10–20",  day: 2, query: "Joe's Pizza New York" },
  { meal: "Jantar",     name: "Tanner Smith's",              desc: "Casual sofisticado",                 price: "US$40–70",  day: 2, query: "Tanner Smith's New York" },
  { meal: "Café",       name: "Ess-a-Bagel",                 desc: "Bagel tradicional NY · ir cedo",                         day: 3, query: "Ess-a-Bagel New York" },
  { meal: "Jantar",     name: "The Smith",                   desc: "Casual sofisticado Lincoln Square",  price: "US$40–65",  day: 3, query: "The Smith Lincoln Square New York" },
  { meal: "Almoço",    name: "Xi'an Famous Foods",           desc: "Noodles chineses",                   price: "US$15–25",  day: 4, query: "Xi'an Famous Foods New York" },
  { meal: "Jantar",     name: "Juliana's Pizza",             desc: "Pizza Brooklyn",                     price: "US$30–50",  day: 4, query: "Juliana's Pizza Brooklyn" },
  { meal: "Almoço",    name: "Sugarfish",                    desc: "Sushi SoHo",                                             day: 5, query: "Sugarfish SoHo New York" },
  { meal: "Lanche",    name: "Levain Bakery",                desc: "Cookie famoso de NY",                                    day: 5, query: "Levain Bakery New York" },
  { meal: "Jogo",       name: "Smithfield Hall",             desc: "Sports bar Brasil x Scotland",                           day: 5, query: "Smithfield Hall New York" },
  { meal: "Plano B",   name: "Football Factory at Legends",  desc: "Sports bar futebol",                                     day: 5, query: "Football Factory at Legends NYC" },
  { meal: "Almoço",    name: "Chelsea Market",               desc: "Mercado gastronômico",                                   day: 6, query: "Chelsea Market New York" },
  { meal: "Jantar",     name: "COTE Korean Steakhouse",      desc: "Korean BBQ Flatiron · RESERVAR!",    price: "US$65–85",  day: 6, star: true, query: "COTE Korean Steakhouse New York" },
  { meal: "Jantar",     name: "Monkey Bar",                  desc: "Clássico moderno NY",                price: "US$60–80",  day: 7, star: true, query: "Monkey Bar New York" },
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
