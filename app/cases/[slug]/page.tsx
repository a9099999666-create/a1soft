import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cases, getCase } from "@/lib/content";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) return { title: "Кейс" };
  return { title: item.title, description: item.result };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getCase(slug);
  if (!item) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-xs tracking-[0.18em] text-primary uppercase">
        {item.client} · {item.kind} · {item.year}
      </p>
      <h1 className="mt-3 text-4xl sm:text-5xl">{item.title}</h1>
      <p className="mt-5 text-lg leading-8 text-muted-foreground">{item.summary}</p>
      <section className="mt-10 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-2xl">Что сделали</h2>
        <ul className="mt-4 space-y-2">
          {item.work.map((line) => (
            <li key={line} className="text-muted-foreground">
              — {line}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-4 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-2xl">Итог</h2>
        <p className="mt-3 leading-7 text-muted-foreground">{item.outcome}</p>
      </section>
      <div className="mt-8 flex flex-col gap-2 sm:flex-row">
        <Link href="/brief" className={cn(buttonVariants({ size: "lg" }))}>
          Принести похожую задачу
        </Link>
        <Link
          href="/cases"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          Все кейсы
        </Link>
      </div>
    </div>
  );
}
