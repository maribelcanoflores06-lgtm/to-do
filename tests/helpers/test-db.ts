import Database from "better-sqlite3";

import { createDb } from "@/lib/db/create-client";

export function createTestDb() {
  const sqlite = new Database(":memory:");
  return createDb(sqlite);
}
