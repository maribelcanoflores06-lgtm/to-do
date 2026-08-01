import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL no está definida. Añádela a .env.local con la connection string de Neon.",
  );
}

const sql = neon(databaseUrl);

export const db = drizzle(sql, { schema });
