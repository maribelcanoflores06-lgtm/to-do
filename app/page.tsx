import { redirect } from "next/navigation";

import { TodoApp } from "@/app/components/TodoApp";
import { UserMenu } from "@/app/components/UserMenu";
import { auth } from "@/auth";
import { getTodos } from "@/lib/actions/todos";
import {
  formatDayLabel,
  isFutureDay,
  isToday,
  parseDayParam,
  today,
} from "@/lib/dates";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ fecha?: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const params = await searchParams;
  const parsedDay = parseDayParam(params.fecha);
  const day =
    parsedDay && !isFutureDay(parsedDay) ? parsedDay : today();

  const todos = await getTodos(day);
  const dayLabel = formatDayLabel(day);
  const editable = isToday(day);

  return (
    <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col px-4 py-8 sm:px-6">
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Mis to-dos</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {dayLabel}
            {editable ? " · Hoy" : ""}
          </p>
        </div>
        <UserMenu
          name={session.user.name ?? session.user.email}
          image={session.user.image}
        />
      </header>

      <TodoApp day={day} todos={todos} editable={editable} />
    </div>
  );
}
