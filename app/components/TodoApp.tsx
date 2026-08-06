"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import {
  createTodo,
  deleteTodo,
  toggleTodo,
  updateTodo,
} from "@/lib/actions/todos";
import type { Todo } from "@/lib/db/schema";

import { DateNav } from "./DateNav";
import { Button } from "./ui/Button";
import { Text } from "./ui/Text";

type TodoAppProps = {
  day: string;
  todos: Todo[];
  editable: boolean;
};

export function TodoApp({ day, todos, editable }: TodoAppProps) {
  const router = useRouter();
  const [newTodo, setNewTodo] = useState("");
  const [isPending, startTransition] = useTransition();

  function refresh() {
    startTransition(() => {
      router.refresh();
    });
  }

  function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = newTodo.trim();
    if (!text) {
      return;
    }

    startTransition(async () => {
      await createTodo(text);
      setNewTodo("");
      router.refresh();
    });
  }

  const pendingCount = todos.filter((todo) => !todo.done).length;
  const doneCount = todos.filter((todo) => todo.done).length;

  return (
    <>
      <DateNav day={day} />

      {editable ? (
        <form onSubmit={handleCreate} className="mt-6 flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="Añadir to-do…"
            disabled={isPending}
            className="min-h-11 min-w-0 flex-1 rounded-full bg-[#E5E5E5] px-5 py-3 text-base text-black outline-none transition placeholder:text-[#B0B0B0] focus:ring-2 focus:ring-black/15 disabled:text-[#C0C0C0]"
          />
          <Button type="submit" disabled={isPending || !newTodo.trim()} className="shrink-0">
            Añadir
          </Button>
        </form>
      ) : null}

      <section className="mt-6 rounded-[20px] bg-white p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <Text variant="title">Tareas</Text>
            <Text variant="body-muted" className="mt-1">
              {pendingCount === 0
                ? "No hay pendientes por ahora."
                : `${pendingCount} pendiente${pendingCount === 1 ? "" : "s"}`}
              {doneCount > 0 ? ` · ${doneCount} hecha${doneCount === 1 ? "" : "s"}` : ""}
            </Text>
          </div>
        </div>

        <ul className="flex flex-col gap-3">
          {todos.length === 0 ? (
            <li className="rounded-[14px] bg-[#F7F7F5] px-4 py-8 text-center">
              <Text variant="body-muted" as="span">
                No hay to-dos este día
              </Text>
            </li>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                editable={editable}
                disabled={isPending}
                onChange={refresh}
              />
            ))
          )}
        </ul>
      </section>
    </>
  );
}

type TodoItemProps = {
  todo: Todo;
  editable: boolean;
  disabled: boolean;
  onChange: () => void;
};

function TodoItem({ todo, editable, disabled, onChange }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const [isPending, startTransition] = useTransition();

  function handleToggle(done: boolean) {
    startTransition(async () => {
      await toggleTodo(todo.id, done);
      onChange();
    });
  }

  function handleSave() {
    const text = draft.trim();
    if (!text || text === todo.text) {
      setDraft(todo.text);
      setIsEditing(false);
      return;
    }

    startTransition(async () => {
      await updateTodo(todo.id, text);
      setIsEditing(false);
      onChange();
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteTodo(todo.id);
      onChange();
    });
  }

  const itemDisabled = disabled || isPending;

  return (
    <li className="flex items-center gap-3 rounded-[14px] bg-[#F7F7F5] px-3 py-3">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(event) => handleToggle(event.target.checked)}
        disabled={itemDisabled}
        className="h-5 w-5 shrink-0 rounded accent-black disabled:opacity-40"
        aria-label={todo.done ? "Marcar pendiente" : "Marcar hecho"}
      />

      {editable && isEditing ? (
        <input
          autoFocus
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={handleSave}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleSave();
            }
            if (event.key === "Escape") {
              setDraft(todo.text);
              setIsEditing(false);
            }
          }}
          disabled={itemDisabled}
          className="min-w-0 flex-1 bg-transparent text-base font-medium text-black outline-none"
        />
      ) : (
        <button
          type="button"
          onClick={() => {
            if (editable) {
              setDraft(todo.text);
              setIsEditing(true);
            }
          }}
          disabled={!editable || itemDisabled}
          className={`min-w-0 flex-1 text-left text-base font-medium ${
            todo.done ? "text-[#B0B0B0] line-through" : "text-black"
          } ${editable ? "cursor-text" : "cursor-default"}`}
        >
          {todo.text}
        </button>
      )}

      {editable ? (
        <Button
          variant="secondary"
          onClick={handleDelete}
          disabled={itemDisabled}
          aria-label="Eliminar to-do"
          className="min-h-9 shrink-0 px-3 py-1.5 text-sm"
        >
          Eliminar
        </Button>
      ) : null}
    </li>
  );
}
