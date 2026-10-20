import {pgEnum, pgTable, text, uuid} from "drizzle-orm/pg-core";
import {catalogOption} from "./catalogOption.js";
import {poll} from "./poll.js";

export const poll_option_status = pgEnum("poll_option_status", [
  "approved",
  "pending",
]);

export const pollOptions = pgTable("poll_options", {
  id: uuid("id").defaultRandom().primaryKey(),
  pollId: uuid("poll_id")
    .notNull()
    .references(() => poll.id, {onDelete: "cascade"}),
  status: poll_option_status("status").default("pending").notNull(),
  optionName: text("option_name").notNull(),
  catalogOptionId: uuid("catalog_option_id").references(() => catalogOption.id),
});
