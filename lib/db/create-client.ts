import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import * as schema from "./schema.sqlite";

const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    text TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0,
    day TEXT NOT NULL,
    created_at INTEGER NOT NULL
  );
  CREATE INDEX IF NOT EXISTS todos_user_day_idx ON todos(user_id, day);
`;

export function createDb(sqlite: Database.Database) {
  sqlite.exec(SCHEMA_SQL);
  return drizzle(sqlite, { schema });
}
