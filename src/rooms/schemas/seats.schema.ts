import { integer, pgTable, unique, uuid, varchar } from 'drizzle-orm/pg-core';
import { v4 as uuidv4 } from 'uuid';

export const seats = pgTable(
  'seats',
  {
    col: integer().notNull(),
    id: uuid()
      .primaryKey()
      .$default(() => uuidv4()),
    row: varchar({ length: 1 }).notNull(),
  },
  (table) => [unique('uniqueRowCol').on(table.row, table.col)],
);
