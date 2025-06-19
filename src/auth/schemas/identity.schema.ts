import { pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { v4 as uuidv4 } from 'uuid';

export const identities = pgTable('identities', {
  email: varchar({ length: 255 }).notNull(),
  id: uuid()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  password: text().notNull(),
  roles: text('roles').array().notNull(),
});
