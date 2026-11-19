/** Swap these when the live handles are confirmed. */
export const channels = [
  {
    id: "telegram",
    href: "https://t.me/a1soft",
    ru: "Telegram",
    en: "Telegram",
  },
  {
    id: "whatsapp",
    href: "https://wa.me/77000000000",
    ru: "WhatsApp",
    en: "WhatsApp",
  },
  {
    id: "max",
    href: "https://max.ru/",
    ru: "Max",
    en: "Max",
  },
  {
    id: "email",
    href: "mailto:hello@a1soft.kz",
    ru: "Почта",
    en: "Email",
  },
] as const;

export type ChannelId = (typeof channels)[number]["id"];
