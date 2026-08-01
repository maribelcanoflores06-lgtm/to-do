import { boolean, index, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    name: text("name"),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("users_email_idx").on(table.email)],
);

export const todos = pgTable(
  "todos",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    text: text("text").notNull(),
    done: boolean("done").notNull().default(false),
    day: text("day").notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).notNull(),
  },
  (table) => [index("todos_user_day_idx").on(table.userId, table.day)],
);

export type User = typeof users.$inferSelect;
export type Todo = typeof todos.$inferSelect;
