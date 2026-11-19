"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChoiceGrid } from "@/components/choice-grid";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BUDGETS,
  DEADLINES,
  PRODUCT_KINDS,
  type Budget,
  type BriefDraft,
  type Deadline,
  type ProductKind,
  createBrief,
} from "@/lib/briefs";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Кто вы" },
  { id: 2, title: "Что нужно" },
  { id: 3, title: "Рамки" },
];

type Errors = Partial<Record<keyof BriefDraft, string>>;

const empty: BriefDraft = {
  company: "",
  contact: "",
  email: "",
  phone: "",
  kind: "" as ProductKind,
  problem: "",
  audience: "",
  deadline: "" as Deadline,
  budget: "" as Budget,
  links: "",
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function BriefForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<BriefDraft>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [doneId, setDoneId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function patch<K extends keyof BriefDraft>(key: K, value: BriefDraft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(current: number) {
    const next: Errors = {};
    if (current === 1) {
      if (!draft.company.trim()) next.company = "Укажите компанию или проект.";
      if (!draft.contact.trim()) next.contact = "Как к вам обращаться.";
      if (!draft.email.trim()) next.email = "Нужна почта для ответа.";
      else if (!isEmail(draft.email.trim())) next.email = "Похоже, это не почта.";
    }
    if (current === 2) {
      if (!draft.kind) next.kind = "Выберите тип работы.";
      if (draft.problem.trim().length < 20) {
        next.problem = "Опишите проблему хотя бы в двух предложениях.";
      }
      if (!draft.audience.trim()) next.audience = "Кто этим будет пользоваться.";
    }
    if (current === 3) {
      if (!draft.deadline) next.deadline = "Выберите ориентир по сроку.";
      if (!draft.budget) next.budget = "Выберите вилку или «обсудим».";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (!validate(step)) return;
    setStep((value) => Math.min(3, value + 1));
  }

  function submit() {
    if (!validate(3)) return;
    setSubmitting(true);
    try {
      const brief = createBrief({
        ...draft,
        company: draft.company.trim(),
        contact: draft.contact.trim(),
        email: draft.email.trim(),
        phone: draft.phone?.trim() || undefined,
        problem: draft.problem.trim(),
        audience: draft.audience.trim(),
        links: draft.links?.trim() || undefined,
      });
      setDoneId(brief.id);
      toast.success("Бриф в очереди студии");
    } catch {
      toast.error("Не удалось сохранить бриф. Обновите страницу и попробуйте снова.");
    } finally {
      setSubmitting(false);
    }
  }

  if (doneId) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p className="text-xs tracking-[0.18em] text-primary uppercase">
          Заявка принята
        </p>
        <h2 className="mt-3 text-3xl">Бриф уже в студии</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Мы разберём его в очереди. Можно открыть карточку сейчас: статус
          «Новая», пока его не взяли в работу.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <Link
            href={`/studio/${doneId}`}
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Открыть карточку
          </Link>
          <Link
            href="/studio"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Вся очередь
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-8">
      <ol className="mb-8 grid grid-cols-3 gap-2 text-sm">
        {steps.map((item) => (
          <li
            key={item.id}
            className={cn(
              "rounded-lg border px-3 py-2",
              item.id === step
                ? "border-primary bg-primary/10"
                : item.id < step
                  ? "border-border text-foreground"
                  : "border-transparent bg-secondary/50 text-muted-foreground"
            )}
          >
            <span className="block text-[11px] tracking-widest uppercase">
              Шаг {item.id}
            </span>
            {item.title}
          </li>
        ))}
      </ol>

      {step === 1 ? (
        <div className="grid gap-4">
          <Field
            label="Компания или проект"
            error={errors.company}
            htmlFor="company"
          >
            <Input
              id="company"
              value={draft.company}
              aria-invalid={Boolean(errors.company)}
              placeholder="Например, North Rental"
              onChange={(event) => patch("company", event.target.value)}
            />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Контакт" error={errors.contact} htmlFor="contact">
              <Input
                id="contact"
                value={draft.contact}
                aria-invalid={Boolean(errors.contact)}
                placeholder="Имя"
                onChange={(event) => patch("contact", event.target.value)}
              />
            </Field>
            <Field label="Почта" error={errors.email} htmlFor="email">
              <Input
                id="email"
                type="email"
                value={draft.email}
                aria-invalid={Boolean(errors.email)}
                placeholder="you@company.ru"
                onChange={(event) => patch("email", event.target.value)}
              />
            </Field>
          </div>
          <Field label="Телефон, если удобнее созвон" htmlFor="phone">
            <Input
              id="phone"
              value={draft.phone}
              placeholder="+7 …"
              onChange={(event) => patch("phone", event.target.value)}
            />
          </Field>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-5">
          <div className="space-y-2">
            <Label>Тип работы</Label>
            <ChoiceGrid
              options={PRODUCT_KINDS}
              value={draft.kind}
              error={errors.kind}
              onChange={(id) => patch("kind", id as ProductKind)}
            />
          </div>
          <Field
            label="Какую проблему решаем"
            error={errors.problem}
            htmlFor="problem"
          >
            <Textarea
              id="problem"
              value={draft.problem}
              aria-invalid={Boolean(errors.problem)}
              placeholder="Что сейчас ломается у людей и какой первый путь должен заработать."
              onChange={(event) => patch("problem", event.target.value)}
            />
          </Field>
          <Field label="Кто пользователь" error={errors.audience} htmlFor="audience">
            <Textarea
              id="audience"
              value={draft.audience}
              aria-invalid={Boolean(errors.audience)}
              placeholder="Роль, город, частота использования."
              onChange={(event) => patch("audience", event.target.value)}
            />
          </Field>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="grid gap-5">
          <div className="space-y-2">
            <Label>Срок</Label>
            <ChoiceGrid
              options={DEADLINES}
              value={draft.deadline}
              error={errors.deadline}
              onChange={(id) => patch("deadline", id as Deadline)}
            />
          </div>
          <div className="space-y-2">
            <Label>Бюджет первой версии</Label>
            <ChoiceGrid
              options={BUDGETS}
              value={draft.budget}
              error={errors.budget}
              onChange={(id) => patch("budget", id as Budget)}
            />
          </div>
          <Field label="Ссылки, если уже есть" htmlFor="links">
            <Input
              id="links"
              value={draft.links}
              placeholder="Сайт, Figma, репозиторий"
              onChange={(event) => patch("links", event.target.value)}
            />
          </Field>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={step === 1}
          onClick={() => setStep((value) => Math.max(1, value - 1))}
        >
          Назад
        </Button>
        {step < 3 ? (
          <Button type="button" size="lg" onClick={goNext}>
            Дальше
          </Button>
        ) : (
          <Button type="button" size="lg" disabled={submitting} onClick={submit}>
            {submitting ? "Сохраняем…" : "Отправить в студию"}
          </Button>
        )}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Заявка остаётся в этом браузере. Почту мы не отправляем — откройте{" "}
        <button
          type="button"
          className="underline underline-offset-2"
          onClick={() => router.push("/studio")}
        >
          очередь студии
        </button>
        , чтобы увидеть карточку.
      </p>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
