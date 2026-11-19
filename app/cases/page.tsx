import type { Metadata } from "next";
import Link from "next/link";
import { cases } from "@/lib/content";

export const metadata: Metadata = {
  title: "Кейсы",
  description: "Рабочие срезы A1Soft: каталог, очередь заявок, закрытый дневник.",
};

export default function CasesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs tracking-[0.18em] text-primary uppercase">Кейсы</p>
      <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl">
        Три среза, в которых спор шёл по факту, а не по слайду
      </h1>
      <div className="mt-12 grid gap-4">
        {cases.map((item) => (
          <Link
            key={item.slug}
            href={`/cases/${item.slug}`}
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50 sm:p-8"
          >
            <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
              {item.client} · {item.year}
            </p>
            <h2 className="mt-3 text-3xl">{item.title}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
              {item.summary}
            </p>
            <p className="mt-4 text-sm text-primary">{item.result}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
