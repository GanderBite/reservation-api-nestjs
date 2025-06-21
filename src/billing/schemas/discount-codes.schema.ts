import { boolean, integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { v4 as uuidv4 } from 'uuid';

export const discountCodes = pgTable('discount_codes', {
  code: varchar({ length: 10 }).notNull().unique(),
  id: uuid()
    .primaryKey()
    .$default(() => uuidv4()),
  isActive: boolean('is_active').notNull().default(false),
  value: integer().notNull(),
});
