"use server";

import { and, asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { today } from "@/lib/dates";
import { db } from "@/lib/db";
import { todos, type Todo } from "@/lib/db/schema";

async function requireUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("No autorizado");
  }
  return session.user.id;
}

async function getOwnedTodo(id: number, userId: string): Promise<Todo | undefined> {
  const [todo] = await db
    .select()
    .from(todos)
    .where(and(eq(todos.id, id), eq(todos.userId, userId)))
    .limit(1);

  return todo;
}

export async function getTodos(day: string): Promise<Todo[]> {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  return db
    .select()
    .from(todos)
    .where(and(eq(todos.userId, session.user.id), eq(todos.day, day)))
    .orderBy(asc(todos.createdAt));
}

export async function createTodo(text: string): Promise<void> {
  const userId = await requireUserId();
  const trimmed = text.trim();
  if (!trimmed) {
    return;
  }

  await db.insert(todos).values({
    userId,
    text: trimmed,
    done: false,
    day: today(),
    createdAt: new Date(),
  });

  revalidatePath("/");
}

export async function updateTodo(id: number, text: string): Promise<void> {
  const userId = await requireUserId();
  const trimmed = text.trim();
  if (!trimmed) {
    return;
  }

  const todo = await getOwnedTodo(id, userId);
  if (!todo || todo.day !== today()) {
    throw new Error("No se puede editar este to-do");
  }

  await db
    .update(todos)
    .set({ text: trimmed })
    .where(and(eq(todos.id, id), eq(todos.userId, userId)));

  revalidatePath("/");
}

export async function deleteTodo(id: number): Promise<void> {
  const userId = await requireUserId();
  const todo = await getOwnedTodo(id, userId);
  if (!todo || todo.day !== today()) {
    throw new Error("No se puede eliminar este to-do");
  }

  await db
    .delete(todos)
    .where(and(eq(todos.id, id), eq(todos.userId, userId)));

  revalidatePath("/");
}

export async function toggleTodo(id: number, done: boolean): Promise<void> {
  const userId = await requireUserId();
  const todo = await getOwnedTodo(id, userId);
  if (!todo) {
    throw new Error("To-do no encontrado");
  }

  await db
    .update(todos)
    .set({ done })
    .where(and(eq(todos.id, id), eq(todos.userId, userId)));

  revalidatePath("/");
}
