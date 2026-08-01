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

  return (
    <>
      <DateNav day={day} />

      {editable ? (
        <form onSubmit={handleCreate} className="mt-6">
          <input
            type="text"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
            placeholder="Añadir to-do…"
            disabled={isPending}
            className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base outline-none transition focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-zinc-500"
          />
        </form>
      ) : null}

      <ul className="mt-6 flex flex-col gap-2">
        {todos.length === 0 ? (
          <li className="rounded-xl border border-dashed border-zinc-200 px-4 py-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            No hay to-dos este día
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
    <li className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3 py-3 dark:border-zinc-800 dark:bg-zinc-950">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={(event) => handleToggle(event.target.checked)}
        disabled={itemDisabled}
        className="h-4 w-4 shrink-0 accent-zinc-900 dark:accent-zinc-100"
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
          className="min-w-0 flex-1 bg-transparent text-base outline-none"
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
          className={`min-w-0 flex-1 text-left text-base ${
            todo.done ? "text-zinc-400 line-through" : ""
          } ${editable ? "cursor-text" : "cursor-default"}`}
        >
          {todo.text}
        </button>
      )}

      {editable ? (
        <button
          type="button"
          onClick={handleDelete}
          disabled={itemDisabled}
          className="shrink-0 rounded-lg px-2 py-1 text-sm text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
          aria-label="Eliminar to-do"
        >
          🗑
        </button>
      ) : null}
    </li>
  );
}
