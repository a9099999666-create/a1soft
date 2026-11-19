"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { InboxIcon, SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  STATUSES,
  type BriefStatus,
  formatDate,
  labelOf,
  PRODUCT_KINDS,
} from "@/lib/briefs";
import { useBriefs } from "@/lib/use-briefs";
import { cn } from "@/lib/utils";

export function StudioInbox() {
  const { briefs, ready, restore } = useBriefs();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<BriefStatus | "all">("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return briefs.filter((brief) => {
      if (status !== "all" && brief.status !== status) return false;
      if (!needle) return true;
      return [brief.company, brief.contact, brief.problem, brief.email]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [briefs, query, status]);

  if (!ready) {
    return (
      <div className="space-y-3" aria-busy="true" aria-label="Загружаем очередь">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-2xl bg-secondary/70"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Компания, человек или проблема"
            className="h-9 pl-8"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <FilterChip
            active={status === "all"}
            onClick={() => setStatus("all")}
          >
            Все · {briefs.length}
          </FilterChip>
          {STATUSES.map((item) => (
            <FilterChip
              key={item.id}
              active={status === item.id}
              onClick={() => setStatus(item.id)}
            >
              {item.label} · {briefs.filter((brief) => brief.status === item.id).length}
            </FilterChip>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
          <InboxIcon className="mx-auto size-8 text-muted-foreground" />
          <h2 className="mt-4 text-2xl">Очередь пуста</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            {briefs.length === 0
              ? "Живых заявок нет. Соберите бриф или верните демо-карточки, чтобы посмотреть, как выглядит разбор."
              : "По этому фильтру ничего нет. Снимите статус или очистите поиск."}
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
            <Link href="/brief" className={cn(buttonVariants({ size: "lg" }))}>
              Собрать бриф
            </Link>
            {briefs.length === 0 ? (
              <Button variant="outline" size="lg" onClick={restore}>
                Вернуть демо-заявки
              </Button>
            ) : (
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setQuery("");
                  setStatus("all");
                }}
              >
                Сбросить фильтр
              </Button>
            )}
          </div>
        </div>
      ) : (
        <ul className="space-y-3">
          {filtered.map((brief) => (
            <li key={brief.id}>
              <Link
                href={`/studio/${brief.id}`}
                className="block rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-heading text-xl">{brief.company}</h2>
                  <Badge variant={brief.status === "declined" ? "destructive" : "secondary"}>
                    {labelOf(STATUSES, brief.status)}
                  </Badge>
                  {brief.sample ? <Badge variant="outline">демо</Badge> : null}
                </div>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {brief.problem}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  {labelOf(PRODUCT_KINDS, brief.kind)} · {brief.contact} ·{" "}
                  {formatDate(brief.createdAt)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
