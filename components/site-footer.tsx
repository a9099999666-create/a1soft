import Link from "next/link";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/70">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-3">
          <Logo />
          <p className="text-sm leading-6 text-muted-foreground">
            Студия цифровых продуктов. Собираем рабочий срез, которым можно
            пользоваться, а не презентацию на неделю.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
              Студия
            </p>
            <Link className="block hover:text-primary" href="/services">
              Услуги
            </Link>
            <Link className="block hover:text-primary" href="/cases">
              Кейсы
            </Link>
            <Link className="block hover:text-primary" href="/studio">
              Очередь заявок
            </Link>
          </div>
          <div className="space-y-2">
            <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
              Старт
            </p>
            <Link className="block hover:text-primary" href="/brief">
              Собрать бриф
            </Link>
            <a className="block hover:text-primary" href="mailto:hello@a1soft.studio">
              hello@a1soft.studio
            </a>
          </div>
          <div className="space-y-2">
            <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
              Правило
            </p>
            <p className="max-w-[16rem] leading-6 text-muted-foreground">
              Если действие нельзя выполнить — кнопка не врёт. Демо так и
              подписано.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
