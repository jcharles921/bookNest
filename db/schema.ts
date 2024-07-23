// schema.ts
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

// Define the Book table
export const books = sqliteTable("books", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  author: text("author").notNull(),
  image: text("image").notNull(),
  read: integer("read", { mode: "boolean" }).notNull().default(false),

  createdAt: text("createdAt").notNull(),
  rating: integer("rating").notNull(),
});

export const preferences = sqliteTable("preferences", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sortingOrder: text("sortingOrder").notNull(),
  preferredTheme: text("preferredTheme").notNull(),
});
