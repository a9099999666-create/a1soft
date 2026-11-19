import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-start px-4 py-24 sm:px-6">
      <p className="text-xs tracking-[0.18em] text-primary uppercase">404</p>
      <h1 className="mt-3 text-4xl">Такой страницы нет</h1>
      <p className="mt-4 text-muted-foreground">
        Вернитесь на главную, в бриф или в очередь студии.
      </p>
      <div className="mt-8 flex flex-col gap-2 sm:flex-row">
        <Link href="/" className={cn(buttonVariants({ size: "lg" }))}>
          На главную
        </Link>
        <Link
          href="/studio"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          В студию
        </Link>
      </div>
    </div>
  );
}
