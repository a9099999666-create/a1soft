"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  BUDGETS,
  DEADLINES,
  PRODUCT_KINDS,
  STATUSES,
  type BriefStatus,
  formatDate,
  labelOf,
} from "@/lib/briefs";
import { useBriefs } from "@/lib/use-briefs";
import { cn } from "@/lib/utils";

export function StudioBrief({ id }: { id: string }) {
  const router = useRouter();
  const { briefs, ready, setStatus, remove } = useBriefs();
  const brief = useMemo(
    () => briefs.find((item) => item.id === id),
    [briefs, id]
  );

  if (!ready) {
    return (
      <div className="h-80 animate-pulse rounded-2xl bg-secondary/70" aria-busy="true" />
    );
  }

  if (!brief) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
        <h1 className="text-3xl">Заявки нет</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Карточка удалена или открыта в другом браузере. Очередь хранится
          локально на этом устройстве.
        </p>
        <Link
          href="/studio"
          className={cn(buttonVariants({ size: "lg" }), "mt-6 inline-flex")}
        >
          К очереди
        </Link>
      </div>
    );
  }

  const current = brief;

  function changeStatus(status: BriefStatus) {
    setStatus(current.id, status);
    toast.success(`Статус: ${labelOf(STATUSES, status)}`);
  }

  function onRemove() {
    remove(current.id);
    toast("Заявка удалена");
    router.push("/studio");
  }

  return (
    <article className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{labelOf(STATUSES, brief.status)}</Badge>
        {brief.sample ? <Badge variant="outline">демо</Badge> : null}
        <span className="text-sm text-muted-foreground">
          {formatDate(brief.createdAt)}
        </span>
      </div>
      <div>
        <p className="text-xs tracking-[0.18em] text-primary uppercase">
          {labelOf(PRODUCT_KINDS, brief.kind)}
        </p>
        <h1 className="mt-2 text-4xl sm:text-5xl">{brief.company}</h1>
        <p className="mt-3 text-muted-foreground">
          {brief.contact} · {brief.email}
          {brief.phone ? ` · ${brief.phone}` : ""}
        </p>
      </div>

      <section className="grid gap-4 rounded-2xl border border-border bg-card p-5 sm:grid-cols-2">
        <Fact label="Срок" value={labelOf(DEADLINES, brief.deadline)} />
        <Fact label="Бюджет" value={labelOf(BUDGETS, brief.budget)} />
        <Fact label="Аудитория" value={brief.audience} />
        {brief.links ? <Fact label="Ссылки" value={brief.links} /> : null}
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="text-xl">Проблема</h2>
        <p className="mt-3 whitespace-pre-wrap leading-7 text-muted-foreground">
          {brief.problem}
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <h2 className="text-xl">Статус в студии</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Меняйте руками. Автоматического «взяли в работу» нет — это очередь
          людей.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {STATUSES.map((item) => (
            <Button
              key={item.id}
              type="button"
              size="lg"
              variant={brief.status === item.id ? "default" : "outline"}
              onClick={() => changeStatus(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/studio"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Назад в очередь
          </Link>
          <Button variant="destructive" size="lg" onClick={onRemove}>
            Удалить заявку
          </Button>
        </div>
      </section>
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-1 leading-6">{value}</p>
    </div>
  );
}
