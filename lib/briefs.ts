export const PRODUCT_KINDS = [
  { id: "product", label: "Продукт с нуля" },
  { id: "web", label: "Веб-приложение" },
  { id: "mobile", label: "Мобильный контур" },
  { id: "ai", label: "ИИ внутри продукта" },
] as const;

export const BUDGETS = [
  { id: "xs", label: "До 500 тыс. ₽" },
  { id: "s", label: "500 тыс. — 2 млн ₽" },
  { id: "m", label: "2 — 5 млн ₽" },
  { id: "l", label: "Больше 5 млн ₽" },
  { id: "talk", label: "Обсудим на созвоне" },
] as const;

export const DEADLINES = [
  { id: "now", label: "Как можно скорее" },
  { id: "month", label: "1–2 месяца" },
  { id: "quarter", label: "Квартал" },
  { id: "open", label: "Срок ещё не зафиксирован" },
] as const;

export const STATUSES = [
  { id: "new", label: "Новая" },
  { id: "review", label: "На разборе" },
  { id: "accepted", label: "Взяли в работу" },
  { id: "declined", label: "Отказ" },
] as const;

export type ProductKind = (typeof PRODUCT_KINDS)[number]["id"];
export type Budget = (typeof BUDGETS)[number]["id"];
export type Deadline = (typeof DEADLINES)[number]["id"];
export type BriefStatus = (typeof STATUSES)[number]["id"];

export type Brief = {
  id: string;
  createdAt: string;
  status: BriefStatus;
  sample?: boolean;
  company: string;
  contact: string;
  email: string;
  phone?: string;
  kind: ProductKind;
  problem: string;
  audience: string;
  deadline: Deadline;
  budget: Budget;
  links?: string;
};

export type BriefDraft = Omit<Brief, "id" | "createdAt" | "status" | "sample">;

const STORAGE_KEY = "a1soft.briefs.v1";

export const sampleBriefs: Brief[] = [
  {
    id: "sample-north",
    createdAt: "2026-11-12T09:20:00.000Z",
    status: "review",
    sample: true,
    company: "North Rental",
    contact: "Анна Соколова",
    email: "anna@north-rental.test",
    phone: "+7 921 000-12-40",
    kind: "web",
    problem:
      "Гости видят каталог, но заявка теряется в WhatsApp. Нужен один контур: карточка, даты, подтверждение хозяином.",
    audience: "Арендаторы в городе и хозяева техники по выходным.",
    deadline: "month",
    budget: "m",
    links: "https://north-rental.test",
  },
  {
    id: "sample-quiet",
    createdAt: "2026-11-08T14:05:00.000Z",
    status: "accepted",
    sample: true,
    company: "Quiet Day",
    contact: "Илья Орлов",
    email: "ilya@quietday.test",
    kind: "mobile",
    problem:
      "Дневник не должен становиться лентой. Нужен PIN, локальные записи и удаление без квеста в настройках.",
    audience: "Взрослые, которым нужен закрытый дневник на телефоне.",
    deadline: "quarter",
    budget: "s",
  },
];

function canUseStorage() {
  return typeof window !== "undefined";
}

function seedIfEmpty(items: Brief[]) {
  if (items.length > 0) return items;
  return sampleBriefs;
}

export function readBriefs(): Brief[] {
  if (!canUseStorage()) return sampleBriefs;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleBriefs));
      return sampleBriefs;
    }
    const parsed = JSON.parse(raw) as Brief[];
    if (!Array.isArray(parsed)) return seedIfEmpty([]);
    return parsed;
  } catch {
    return sampleBriefs;
  }
}

export function writeBriefs(items: Brief[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("a1soft-briefs"));
}

export function createBrief(draft: BriefDraft): Brief {
  const brief: Brief = {
    ...draft,
    id: `brief-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: "new",
  };
  const items = [brief, ...readBriefs()];
  writeBriefs(items);
  return brief;
}

export function getBrief(id: string) {
  return readBriefs().find((item) => item.id === id);
}

export function updateBriefStatus(id: string, status: BriefStatus) {
  const items = readBriefs().map((item) =>
    item.id === id ? { ...item, status } : item
  );
  writeBriefs(items);
  return items.find((item) => item.id === id);
}

export function removeBrief(id: string) {
  writeBriefs(readBriefs().filter((item) => item.id !== id));
}

export function restoreSamples() {
  const live = readBriefs().filter((item) => !item.sample);
  writeBriefs([...live, ...sampleBriefs]);
}

export function labelOf<T extends { id: string; label: string }>(
  list: readonly T[],
  id: string
) {
  return list.find((item) => item.id === id)?.label ?? id;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
