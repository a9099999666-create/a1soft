import type { Metadata } from "next";
import { BriefForm } from "@/components/brief-form";

export const metadata: Metadata = {
  title: "Бриф",
  description: "Четыре блока: кто вы, что нужно, срок и бюджет. Заявка сразу в очередь студии.",
};

export default function BriefPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <p className="text-xs tracking-[0.18em] text-primary uppercase">Бриф</p>
        <h1 className="mt-3 text-4xl sm:text-5xl">Опишите задачу так, как она есть</h1>
        <p className="mt-4 leading-7 text-muted-foreground">
          Не нужен ТЗ на сорок страниц. Нужны пользователь, поломка и рамки
          первой версии. Если срока или бюджета нет — так и отметьте.
        </p>
        <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
          <li>— Заявка сохраняется в этом браузере, без аккаунта.</li>
          <li>— Почту мы отсюда не рассылаем: карточка сразу в «Студии».</li>
          <li>— Демо-заявки помечены, живые — нет.</li>
        </ul>
      </div>
      <BriefForm />
    </div>
  );
}
