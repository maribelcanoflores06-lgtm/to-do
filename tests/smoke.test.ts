import { eq } from "drizzle-orm";
import { beforeEach, describe, expect, it } from "vitest";

import { auth } from "@/auth";
import { today } from "@/lib/dates";
import { todos } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

import {
  mockRevalidatePath,
  resetMocks,
  setAuthUser,
  setToday,
} from "./helpers/mocks";
import { createTestDb } from "./helpers/test-db";

describe("harness de pruebas de dominio", () => {
  beforeEach(() => {
    resetMocks();
  });

  it("crea una BD aislada, inserta un to-do y lo lee", async () => {
    const db = createTestDb();

    await db.insert(todos).values({
      userId: "user-1",
      text: "Comprar leche",
      done: false,
      day: "2026-08-01",
      createdAt: new Date("2026-08-01T10:00:00"),
    });

    const rows = await db
      .select()
      .from(todos)
      .where(eq(todos.userId, "user-1"));

    expect(rows).toHaveLength(1);
    expect(rows[0]?.text).toBe("Comprar leche");
    expect(rows[0]?.day).toBe("2026-08-01");
  });

  it("expone helpers de mock para sesión, today y revalidatePath", async () => {
    setAuthUser("user-42");
    setToday("2026-07-15");

    const session = await auth();
    expect(session?.user?.id).toBe("user-42");
    expect(today()).toBe("2026-07-15");

    revalidatePath("/");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/");
  });
});
