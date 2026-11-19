import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cases, method, services } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto w-full max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24">
        <p className="text-xs tracking-[0.22em] text-primary uppercase">
          Студия цифровых продуктов
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">
          Собираем продукт, которым можно пользоваться на следующей неделе.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          A1Soft берёт узкую задачу и доводит её до рабочего среза: роли,
          главный путь, пустые экраны и очередь заявок. Не рисуем «платформу на
          всё» и не прячем заглушки за красивыми словами.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/brief" className={cn(buttonVariants({ size: "lg" }))}>
            Собрать бриф
            <ArrowRightIcon />
          </Link>
          <Link
            href="/studio"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Открыть очередь студии
          </Link>
        </div>
        <dl className="mt-14 grid gap-6 border-t border-border/80 pt-8 sm:grid-cols-3">
          <Stat value="20 мин" label="на бриф, если задача уже понятна" />
          <Stat value="1 срез" label="главный путь, а не десять будущих модулей" />
          <Stat value="Честно" label="если провайдера нет — кнопка так и говорит" />
        </dl>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Услуги
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl">Что берём в работу</h2>
          </div>
          <Link href="/services" className="hidden text-sm text-primary sm:inline">
            Все услуги
          </Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href="/services"
              className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <h3 className="text-2xl">{service.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                {service.teaser}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border/80 bg-card/40">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Метод
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl">
              Сначала контур, потом код вокруг него
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Спорим по кликабельному срезу. Макет без данных не считается
              готовым этапом.
            </p>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {method.map((item) => (
              <li key={item.step} className="rounded-2xl border border-border bg-background/70 p-5">
                <p className="font-mono text-sm text-primary">{item.step}</p>
                <h3 className="mt-2 text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
              Кейсы
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl">Срезы, которые уже кликают</h2>
          </div>
          <Link href="/cases" className="hidden text-sm text-primary sm:inline">
            Все кейсы
          </Link>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {cases.map((item) => (
            <Link
              key={item.slug}
              href={`/cases/${item.slug}`}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                {item.kind} · {item.year}
              </p>
              <h3 className="mt-3 text-2xl">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                {item.result}
              </p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm text-primary">
                Разбор кейса
                <ArrowRightIcon className="size-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-heading text-3xl">{value}</dt>
      <dd className="mt-1 text-sm text-muted-foreground">{label}</dd>
    </div>
  );
}
