import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2 text-sm font-medium tracking-tight",
        className
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
        A1
      </span>
      <span className="font-heading text-lg tracking-tight">A1Soft</span>
    </Link>
  );
}
