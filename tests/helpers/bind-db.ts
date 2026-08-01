import { vi } from "vitest";

import { createTestDb } from "./test-db";

export const DEFAULT_TODAY = "2026-08-01";

const { dbRef } = vi.hoisted(() => ({
  dbRef: { current: null as ReturnType<typeof createTestDb> | null },
}));

vi.mock("@/lib/db", () => ({
  get db() {
    if (!dbRef.current) {
      throw new Error("Llama a bindTestDb() en beforeEach antes de usar server actions.");
    }
    return dbRef.current;
  },
}));

export function bindTestDb() {
  dbRef.current = createTestDb();
  return dbRef.current;
}

export function getBoundTestDb() {
  if (!dbRef.current) {
    throw new Error("Llama a bindTestDb() en beforeEach antes de usar server actions.");
  }
  return dbRef.current;
}
