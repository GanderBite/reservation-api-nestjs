import { integer, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { v4 as uuidv4 } from 'uuid';

export const prices = pgTable('prices', {
  category: text().notNull(),
  currency: varchar({ length: 3 }).notNull(),
  id: uuid()
    .primaryKey()
    .$default(() => uuidv4()),
  value: integer().notNull(),
});
