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
    aboutLead: "A1Soft",
    about: [
      "Международная команда. Более двадцати специалистов из разных стран.",
      "Создаём собственные продукты в области программной разработки и искусственного интеллекта. С самого начала проектируем их для людей по всему миру.",
      "Проверяем идеи на прототипах и доводим их до решений, которыми просто пользоваться.",
    ],
    contactTitle: "Контакты",
    contactLead: "Написать нам",
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
    philosophy: ["We work through the complex —", "until the solution is clear."],
    aboutTitle: "About",
    aboutLead: "A1Soft",
    about: [
      "An international team. More than twenty specialists from different countries.",
      "We create our own products in software development and artificial intelligence. From the start, we design them for people around the world.",
      "We test ideas on prototypes and bring them through to solutions that are simple to use.",
    ],
    contactTitle: "Contact",
    contactLead: "Write to us",
    footer: "A1Soft",
    visualLabel: "Signal convergence",
  },
} as const;
