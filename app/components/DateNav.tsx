"use client";

import { useRouter } from "next/navigation";

import { addDays, isToday, today } from "@/lib/dates";

import { Button } from "./ui/Button";

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
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F0F0] text-base text-black transition-colors hover:bg-[#E5E5E5]"
        aria-label="Día anterior"
      >
        ←
      </button>

      <button
        type="button"
        onClick={() => goToDay(addDays(day, 1))}
        disabled={viewingToday}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F0F0] text-base text-black transition-colors hover:bg-[#E5E5E5] disabled:cursor-not-allowed disabled:bg-[#F5F5F5] disabled:text-[#C0C0C0]"
        aria-label="Día siguiente"
      >
        →
      </button>

      <Button
        variant="secondary"
        onClick={() => goToDay(today())}
        disabled={viewingToday}
        className="min-h-10 px-4 py-2 text-sm"
      >
        Hoy
      </Button>

      <input
        type="date"
        value={day}
        max={today()}
        onChange={(event) => {
          if (event.target.value) {
            goToDay(event.target.value);
          }
        }}
        className="min-h-10 rounded-[14px] bg-[#F2F2F2] px-3 py-2 text-sm font-medium text-black outline-none transition focus:ring-2 focus:ring-black/15"
        aria-label="Seleccionar fecha"
      />
    </div>
  );
}
