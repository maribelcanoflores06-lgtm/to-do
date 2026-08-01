"use client";

import { useRouter } from "next/navigation";

import { addDays, isToday, today } from "@/lib/dates";

type DateNavProps = {
  day: string;
};

export function DateNav({ day }: DateNavProps) {
  const router = useRouter();
  const viewingToday = isToday(day);

  function goToDay(nextDay: string) {
    if (nextDay > today()) {
      return;
    }
    router.push(nextDay === today() ? "/" : `/?fecha=${nextDay}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => goToDay(addDays(day, -1))}
        className="rounded-lg border border-zinc-200 px-3 py-2 text-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
        aria-label="Día anterior"
      >
        ←
      </button>

      <button
        type="button"
        onClick={() => goToDay(addDays(day, 1))}
        disabled={viewingToday}
        className="rounded-lg border border-zinc-200 px-3 py-2 text-sm transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:hover:bg-zinc-900"
        aria-label="Día siguiente"
      >
        →
      </button>

      <button
        type="button"
        onClick={() => goToDay(today())}
        disabled={viewingToday}
        className="rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-700 dark:hover:bg-zinc-900"
      >
        Hoy
      </button>

      <input
        type="date"
        value={day}
        max={today()}
        onChange={(event) => {
          if (event.target.value) {
            goToDay(event.target.value);
          }
        }}
        className="rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        aria-label="Seleccionar fecha"
      />
    </div>
  );
}
