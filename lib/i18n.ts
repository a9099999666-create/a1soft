export type Lang = "ru" | "en";

export const copy = {
  ru: {
    skip: "К содержанию",
    aboutNav: "О компании",
    contactNav: "Контакты",
    langGroup: "Язык",
    headline: ["Сложное должно", "быть простым."],
    philosophyLabel: "Философия",
    philosophy: ["Разбираемся в сложном,", "пока решение не станет ясным."],
    aboutTitle: "О компании",
    about: [
      "A1Soft — международная команда из 20+ специалистов из разных стран.",
      "Мы создаём собственные цифровые продукты, работаем с кодом и искусственным интеллектом.",
      "Проверяем идеи на прототипах и доводим их до решений, которыми просто пользоваться.",
    ],
    contactTitle: "Контакты",
    contactLead: "Связаться с A1Soft",
    contactFields: [
      { label: "База", value: "Астана, Казахстан" },
      { label: "Компания", value: "ТОО «A 1 Soft»" },
      { label: "БИН", value: "261140006939" },
    ],
    footer: "ТОО «A 1 Soft» · Астана",
    visualLabel: "Схождение сигнала",
  },
  en: {
    skip: "Skip to content",
    aboutNav: "About",
    contactNav: "Contact",
    langGroup: "Language",
    headline: ["The complex", "should be simple."],
    philosophyLabel: "Philosophy",
    philosophy: ["We work through complexity", "until the solution is clear."],
    aboutTitle: "About",
    about: [
      "A1Soft is an international team of 20+ specialists from different countries.",
      "We build our own digital products and work with software and AI.",
      "We test ideas through prototypes and turn them into solutions that are easy to use.",
    ],
    contactTitle: "Contact",
    contactLead: "Contact A1Soft",
    contactFields: [
      { label: "Base", value: "Astana, Kazakhstan" },
      { label: "Company", value: "A 1 Soft LLP" },
      { label: "ID", value: "261140006939" },
    ],
    footer: "A 1 Soft LLP · Astana",
    visualLabel: "Signal convergence",
  },
} as const;
