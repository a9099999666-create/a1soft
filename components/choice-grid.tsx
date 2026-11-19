"use client";

import { cn } from "@/lib/utils";

type Option = { id: string; label: string };

export function ChoiceGrid({
  options,
  value,
  onChange,
  error,
}: {
  options: readonly Option[];
  value?: string;
  onChange: (id: string) => void;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={cn(
                "rounded-xl border px-3 py-3 text-left text-sm transition-colors",
                selected
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card/60 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
