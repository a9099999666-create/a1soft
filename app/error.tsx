"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col px-4 py-24 sm:px-6">
      <p className="text-xs tracking-[0.18em] text-primary uppercase">Ошибка</p>
      <h1 className="mt-3 text-4xl">Не получилось открыть страницу</h1>
      <p className="mt-4 text-muted-foreground">
        {error.message || "Обновите страницу. Если повторится — вернитесь на главную."}
      </p>
      <Button className="mt-8 w-fit" size="lg" onClick={reset}>
        Попробовать снова
      </Button>
    </div>
  );
}
