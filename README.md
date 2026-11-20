# A1Soft

Site for A1Soft, an international software and AI team. The first screen follows the supplied 1122×1402 reference: header, headline, signal graphic, and philosophy. About and contact sit below.

## Living graphic

The signal loop sits full-bleed behind the page. Menu and type are HTML over it; the page scrolls, the header stays transparent. `?visual=static` and `prefers-reduced-motion` freeze the poster.

Language switch: **RU / EN**. It changes every label on the page and the document language.

Telegram, WhatsApp, Max, and email sit in the contact column. Hover draws the stroke in the cyan filament and lights a glow. Handles live in `lib/contacts.ts`.

## Local

```bash
npm install
npm run dev
```

Open the printed local URL. Add `?visual=static` to freeze the hero.

## Deploy

Production is **Vercel**, same as the other Next.js sites. Push `main` to GitHub; Vercel builds from `vercel.json`.

## Stack

Next.js, TypeScript, Tailwind, shadcn/ui. Inter is loaded from a local WOFF2 file.
