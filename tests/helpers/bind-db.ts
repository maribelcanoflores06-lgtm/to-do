import { vi } from "vitest";

import { createTestDb } from "./test-db";

const { dbRef } = vi.hoisted(() => ({
  dbRef: { current: null as ReturnType<typeof createTestDb> | null },
}));

function requireBoundTestDb() {
  if (!dbRef.current) {
    throw new Error("Llama a bindTestDb() en beforeEach antes de usar server actions.");
  }
  return dbRef.current;
}

vi.mock("@/lib/db", () => ({
  get db() {
    return requireBoundTestDb();
  },
}));

export function bindTestDb() {
  dbRef.current = createTestDb();
  return dbRef.current;
}

export function getBoundTestDb() {
  return requireBoundTestDb();
}
