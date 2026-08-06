import { redirect } from "next/navigation";

import { TodoApp } from "@/app/components/TodoApp";
import { UserMenu } from "@/app/components/UserMenu";
import { Text } from "@/app/components/ui/Text";
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
  const firstName =
    (session.user.name ?? session.user.email ?? "tú").split(/[\s@]/)[0];

  return (
    <div className="relative mx-auto flex min-h-full w-full max-w-2xl flex-col px-5 pb-10 pt-8 sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,#D6C9FF_0%,transparent_100%)] opacity-70"
      />

      <header className="relative z-20 mb-6 flex items-start justify-between gap-4">
        <div>
          <Text variant="display">Hey, {firstName}</Text>
          <Text variant="body-muted" className="mt-1">
            {dayLabel}
            {editable ? " · Hoy" : ""}
          </Text>
        </div>
        <UserMenu
          name={session.user.name ?? session.user.email}
          image={session.user.image}
        />
      </header>

      <div className="relative z-0">
        <TodoApp day={day} todos={todos} editable={editable} />
      </div>
    </div>
  );
}
