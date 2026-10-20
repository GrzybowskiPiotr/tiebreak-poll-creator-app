import {pgTable, uuid} from "drizzle-orm/pg-core";

export const optionCatalog = pgTable("option_catalog", {
  id: uuid().defaultRandom().primaryKey(),
  user_id: uuid().notNull(),
  // .references(() => user.id), referencja do tabeli z betterAuth do zrobienia po wdrożeniu abetteraUth
});
