export type Lang = "ru" | "en";

export const copy = {
  ru: {
    skip: "К содержанию",
    aboutNav: "О компании",
    contactNav: "Контакты",
    langGroup: "Язык",
    headline: ["Сложное должно", "быть простым."],
    philosophyLabel: "Философия",
    philosophy: ["Разбираемся в сложном —", "пока решение не станет ясным."],
    aboutTitle: "О компании",
    about: [
      "A1Soft — международная команда. Больше двадцати специалистов из разных стран.",
      "Делаем собственные цифровые продукты: код и искусственный интеллект.",
      "Идею проверяем прототипом и доводим до решения, которым просто пользоваться.",
    ],
    contactTitle: "Контакты",
    contactLead: "Напишите — ответим",
    footer: "A1Soft",
    visualLabel: "Схождение сигнала",
  },
  en: {
    skip: "Skip to content",
    aboutNav: "About",
    contactNav: "Contact",
    langGroup: "Language",
    headline: ["The complex", "should be simple."],
    philosophyLabel: "Philosophy",
    philosophy: ["We stay with the complexity", "until the solution is clear."],
    aboutTitle: "About",
    about: [
      "A1Soft is an international team — more than twenty specialists from different countries.",
      "We build our own digital products: software and artificial intelligence.",
      "We prove ideas in prototypes, then keep what is simple to use.",
    ],
    contactTitle: "Contact",
    contactLead: "Write — we'll reply",
    footer: "A1Soft",
    visualLabel: "Signal convergence",
  },
} as const;
