import type { Metadata } from "next";
import { StudioInbox } from "@/components/studio-inbox";

export const metadata: Metadata = {
  title: "Студия",
  description: "Очередь брифов A1Soft: новые, на разборе, в работе и отказ.",
};

export default function StudioPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6">
      <p className="text-xs tracking-[0.18em] text-primary uppercase">Студия</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Очередь заявок</h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
        Сюда падает бриф с сайта. Статусы меняются руками. Если очередь пустая —
        соберите бриф или верните демо-карточки.
      </p>
      <div className="mt-10">
        <StudioInbox />
      </div>
    </div>
  );
}
