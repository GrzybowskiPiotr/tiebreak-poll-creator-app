import {pgTable, unique, uuid, varchar} from "drizzle-orm/pg-core";
import {poll} from "./poll.js";

export const pollVoter = pgTable(
  "poll_voter",
  {
    id: uuid().defaultRandom().primaryKey(),
    voter_name: varchar("voter_name", {length: 100}).notNull(),
    avatar: varchar("avatar", {length: 250}), //avarat url or somthing equlivent
    poll_id: uuid()
      .references(() => poll.id, {onDelete: "cascade"})
      .notNull(),
    token_hash: varchar("token_hash").notNull(),
  },
  (table) => [
    unique("poll_voter_poll_token_unique").on(table.poll_id, table.token_hash),
  ],
);
