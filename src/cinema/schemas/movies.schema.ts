import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { v4 as uuidv4 } from 'uuid';

export const movies = pgTable('movies', {
  duration: integer().notNull(),
  id: uuid()
    .primaryKey()
    .$default(() => uuidv4()),
  title: varchar({ length: 50 }).unique().notNull(),
});
