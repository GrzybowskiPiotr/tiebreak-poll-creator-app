import {pgTable, unique, uuid} from "drizzle-orm/pg-core";
import {pollOptions} from "./pollOptions.js";
import {pollVoter} from "./pollVoter.js";

export const vote = pgTable(
  "vote",
  {
    id: uuid().primaryKey().defaultRandom(),
    option_id: uuid()
      .references(() => pollOptions.id, {onDelete: "cascade"})
      .notNull(),
    voter_id: uuid()
      .references(() => pollVoter.id, {onDelete: "cascade"})
      .notNull(),
  },
  (table) => [
    unique("vote_voter_option_unique").on(table.option_id, table.voter_id),
  ],
);
