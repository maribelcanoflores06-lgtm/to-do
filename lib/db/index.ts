import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

import { createDb } from "./create-client";

const dataDir = path.join(process.cwd(), "data");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const sqlite = new Database(path.join(dataDir, "todo.db"));

export const db = createDb(sqlite);
