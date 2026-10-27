import {sql} from "drizzle-orm";
import {
  boolean,
  check,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import {user} from "./auth-schema.js";

export const poll_status = pgEnum("poll_status", [
  "open",
  "closed",
  "reopened",
]);

export const poll = pgTable(
  "poll",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: text("user_id")
      .references(() => user.id, {onDelete: "cascade"})
      .notNull(),
    title: varchar({length: 100}).notNull(),
    max_choices: integer("max_choices").notNull(),
    close_at: timestamp({withTimezone: true}).notNull(),
    suggestions_enabled: boolean().default(false).notNull(),
    status: poll_status("status").default("open").notNull(),
  },
  (table) => [
    check(
      "poll_max_choices_check",
      sql`${table.max_choices} >= 1 AND ${table.max_choices} <= 10`,
    ),
  ],
);
