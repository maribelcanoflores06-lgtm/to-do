import { boolean, index, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

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

export type Todo = typeof todos.$inferSelect;
