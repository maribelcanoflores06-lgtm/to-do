const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

export function today(): string {
  return formatDay(new Date());
}

export function formatDay(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseDayParam(value: string | undefined): string | null {
  if (!value || !DAY_RE.test(value)) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return value;
}

export function dayToDate(day: string): Date {
  const [year, month, date] = day.split("-").map(Number);
  return new Date(year, month - 1, date);
}

export function isToday(day: string): boolean {
  return day === today();
}

export function isFutureDay(day: string): boolean {
  return day > today();
}

export function addDays(day: string, offset: number): string {
  const date = dayToDate(day);
  date.setDate(date.getDate() + offset);
  return formatDay(date);
}

export function formatDayLabel(day: string): string {
  const date = dayToDate(day);
  const label = new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return label.charAt(0).toUpperCase() + label.slice(1);
}
