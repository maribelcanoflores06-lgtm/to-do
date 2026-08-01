import { beforeEach, describe, expect, it } from "vitest";

import {
  createTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
  updateTodo,
} from "@/lib/actions/todos";
import { todos } from "@/lib/db/schema";

import { bindTestDb, getBoundTestDb } from "./helpers/bind-db";
import { DEFAULT_TODAY, PAST_DAY } from "./helpers/fixtures";
import { clearAuth, resetMocks, setAuthUser, setToday } from "./helpers/mocks";

describe("server actions de to-dos", () => {
  beforeEach(() => {
    resetMocks();
    setToday(DEFAULT_TODAY);
    bindTestDb();
  });

  describe("crear y listar (hoy)", () => {
    beforeEach(() => {
      setAuthUser("user-1");
    });

    it("createTodo persiste con day=today() y done=false", async () => {
      await createTodo("Comprar leche");

      const rows = await getTodos(DEFAULT_TODAY);
      expect(rows).toHaveLength(1);
      expect(rows[0]?.text).toBe("Comprar leche");
      expect(rows[0]?.day).toBe(DEFAULT_TODAY);
      expect(rows[0]?.done).toBe(false);
    });

    it("createTodo ignora texto vacío o solo espacios", async () => {
      await createTodo("");
      await createTodo("   ");

      expect(await getTodos(DEFAULT_TODAY)).toHaveLength(0);
    });

    it("getTodos filtra por usuario y día y ordena por createdAt", async () => {
      const db = getBoundTestDb();
      await db.insert(todos).values([
        {
          userId: "user-1",
          text: "Primero",
          done: true,
          day: DEFAULT_TODAY,
          createdAt: new Date("2026-08-01T09:00:00"),
        },
        {
          userId: "user-1",
          text: "Segundo",
          done: false,
          day: DEFAULT_TODAY,
          createdAt: new Date("2026-08-01T10:00:00"),
        },
        {
          userId: "user-2",
          text: "De otro usuario",
          done: false,
          day: DEFAULT_TODAY,
          createdAt: new Date("2026-08-01T10:30:00"),
        },
        {
          userId: "user-1",
          text: "Otro día",
          done: false,
          day: PAST_DAY,
          createdAt: new Date("2026-07-31T10:00:00"),
        },
      ]);

      const rows = await getTodos(DEFAULT_TODAY);
      expect(rows.map((row) => row.text)).toEqual(["Primero", "Segundo"]);
    });

    it("getTodos sin sesión devuelve lista vacía", async () => {
      await createTodo("Persistido");
      clearAuth();

      expect(await getTodos(DEFAULT_TODAY)).toEqual([]);
    });
  });

  describe("editar y eliminar (solo hoy)", () => {
    beforeEach(() => {
      setAuthUser("user-1");
    });

    async function seedTodayTodo(text = "Original") {
      const db = getBoundTestDb();
      await db.insert(todos).values({
        userId: "user-1",
        text,
        done: false,
        day: DEFAULT_TODAY,
        createdAt: new Date("2026-08-01T10:00:00"),
      });
      const [row] = await db.select().from(todos);
      return row!;
    }

    async function seedPastTodo(text = "Pasado") {
      const db = getBoundTestDb();
      await db.insert(todos).values({
        userId: "user-1",
        text,
        done: false,
        day: PAST_DAY,
        createdAt: new Date("2026-07-31T10:00:00"),
      });
      const [row] = await db.select().from(todos);
      return row!;
    }

    it("updateTodo modifica texto de un to-do de hoy", async () => {
      const todo = await seedTodayTodo();

      await updateTodo(todo.id, "Actualizado");

      const rows = await getTodos(DEFAULT_TODAY);
      expect(rows[0]?.text).toBe("Actualizado");
    });

    it("updateTodo lanza error en to-do de día pasado", async () => {
      const todo = await seedPastTodo();

      await expect(updateTodo(todo.id, "Nuevo")).rejects.toThrow(
        "No se puede editar este to-do",
      );
    });

    it("deleteTodo elimina un to-do de hoy", async () => {
      const todo = await seedTodayTodo();

      await deleteTodo(todo.id);

      expect(await getTodos(DEFAULT_TODAY)).toHaveLength(0);
    });

    it("deleteTodo lanza error en to-do de día pasado", async () => {
      const todo = await seedPastTodo();

      await expect(deleteTodo(todo.id)).rejects.toThrow(
        "No se puede eliminar este to-do",
      );
    });

    it("getTodos mantiene orden de creación aunque algunos estén hechos", async () => {
      const db = getBoundTestDb();
      await db.insert(todos).values([
        {
          userId: "user-1",
          text: "A",
          done: true,
          day: DEFAULT_TODAY,
          createdAt: new Date("2026-08-01T08:00:00"),
        },
        {
          userId: "user-1",
          text: "B",
          done: false,
          day: DEFAULT_TODAY,
          createdAt: new Date("2026-08-01T09:00:00"),
        },
        {
          userId: "user-1",
          text: "C",
          done: true,
          day: DEFAULT_TODAY,
          createdAt: new Date("2026-08-01T10:00:00"),
        },
      ]);

      const rows = await getTodos(DEFAULT_TODAY);
      expect(rows.map((row) => row.text)).toEqual(["A", "B", "C"]);
    });
  });

  describe("toggle y aislamiento", () => {
    it("toggleTodo marca y desmarca en hoy", async () => {
      setAuthUser("user-1");
      const db = getBoundTestDb();
      await db.insert(todos).values({
        userId: "user-1",
        text: "Hoy",
        done: false,
        day: DEFAULT_TODAY,
        createdAt: new Date("2026-08-01T10:00:00"),
      });
      const [todo] = await db.select().from(todos);

      await toggleTodo(todo!.id, true);
      expect((await getTodos(DEFAULT_TODAY))[0]?.done).toBe(true);

      await toggleTodo(todo!.id, false);
      expect((await getTodos(DEFAULT_TODAY))[0]?.done).toBe(false);
    });

    it("toggleTodo marca y desmarca en día pasado", async () => {
      setAuthUser("user-1");
      const db = getBoundTestDb();
      await db.insert(todos).values({
        userId: "user-1",
        text: "Pasado",
        done: false,
        day: PAST_DAY,
        createdAt: new Date("2026-07-31T10:00:00"),
      });
      const [todo] = await db.select().from(todos);

      await toggleTodo(todo!.id, true);

      let rows = await getTodos(PAST_DAY);
      expect(rows[0]?.done).toBe(true);

      await toggleTodo(todo!.id, false);
      rows = await getTodos(PAST_DAY);
      expect(rows[0]?.done).toBe(false);
    });

    it("toggleTodo lanza error si el to-do no existe o es de otro usuario", async () => {
      setAuthUser("user-1");

      await expect(toggleTodo(999, true)).rejects.toThrow("To-do no encontrado");

      const db = getBoundTestDb();
      await db.insert(todos).values({
        userId: "user-2",
        text: "Ajeno",
        done: false,
        day: DEFAULT_TODAY,
        createdAt: new Date("2026-08-01T10:00:00"),
      });
      const [todo] = await db.select().from(todos);

      await expect(toggleTodo(todo!.id, true)).rejects.toThrow(
        "To-do no encontrado",
      );
    });

    it("getTodos no incluye to-dos de otro usuario", async () => {
      const db = getBoundTestDb();
      await db.insert(todos).values([
        {
          userId: "user-1",
          text: "Mío",
          done: false,
          day: DEFAULT_TODAY,
          createdAt: new Date("2026-08-01T10:00:00"),
        },
        {
          userId: "user-2",
          text: "Suyo",
          done: false,
          day: DEFAULT_TODAY,
          createdAt: new Date("2026-08-01T11:00:00"),
        },
      ]);

      setAuthUser("user-1");
      const rows = await getTodos(DEFAULT_TODAY);
      expect(rows).toHaveLength(1);
      expect(rows[0]?.text).toBe("Mío");
    });

    it("mutaciones lanzan No autorizado sin sesión", async () => {
      const db = getBoundTestDb();
      await db.insert(todos).values({
        userId: "user-1",
        text: "Test",
        done: false,
        day: DEFAULT_TODAY,
        createdAt: new Date("2026-08-01T10:00:00"),
      });
      const [todo] = await db.select().from(todos);

      clearAuth();

      await expect(updateTodo(todo!.id, "X")).rejects.toThrow("No autorizado");
      await expect(deleteTodo(todo!.id)).rejects.toThrow("No autorizado");
      await expect(toggleTodo(todo!.id, true)).rejects.toThrow("No autorizado");
    });
  });
});
