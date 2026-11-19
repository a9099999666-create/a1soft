# A1Soft

Site for A1Soft, an international software and AI team. The first screen follows the supplied 1122×1402 reference: header, headline, signal graphic, and philosophy. About and contact sit below.

## Living graphic

HTML text sits on top of a static poster cropped from the design reference. When motion is allowed, a muted looping video plays in that same frame. `?visual=static` and `prefers-reduced-motion` keep the poster still.

Language switch: **RU / EN**. It changes every label on the page and the document language.

## Local

```bash
npm install
npm run dev
```

Open the printed local URL. Add `?visual=static` to freeze the hero.

## Stack

Next.js, TypeScript, Tailwind, shadcn/ui. Inter is loaded from a local WOFF2 file.
