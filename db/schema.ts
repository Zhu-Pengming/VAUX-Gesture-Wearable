import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const waitlist = sqliteTable("waitlist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  interest: text("interest", { enum: ["product", "developer"] }).notNull().default("product"),
  createdAt: text("created_at").notNull(),
}, (table) => [uniqueIndex("waitlist_email_unique").on(table.email)]);
