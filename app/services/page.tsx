import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Услуги",
  description: "Продукт с нуля, веб, мобильный контур и ИИ внутри продукта.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
      <p className="text-xs tracking-[0.18em] text-primary uppercase">Услуги</p>
      <h1 className="mt-3 max-w-3xl text-4xl sm:text-5xl">
        Берём работу, которую можно сдать кликабельным срезом
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
        Не продаём «цифровую трансформацию». Каждая услуга заканчивается тем,
        что человек проходит путь в браузере или на телефоне.
      </p>
      <div className="mt-12 space-y-6">
        {services.map((service) => (
          <article
            key={service.slug}
            id={service.slug}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8"
          >
            <h2 className="text-3xl">{service.title}</h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
              {service.body}
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-border/80 bg-background/60 px-4 py-3 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/brief" className={cn(buttonVariants({ size: "lg" }))}>
          Описать задачу в брифе
        </Link>
        <Link
          href="/cases"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          Смотреть кейсы
        </Link>
      </div>
    </div>
  );
}
