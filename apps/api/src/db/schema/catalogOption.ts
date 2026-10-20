import {pgTable, uuid, varchar} from "drizzle-orm/pg-core";
import {optionCatalog} from "./optionCatalog.js";

export const catalogOption = pgTable("catalog_option", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar({length: 100}).notNull(),
  catalog_id: uuid("catalog_id")
    .references(() => optionCatalog.id)
    .notNull(),
});
