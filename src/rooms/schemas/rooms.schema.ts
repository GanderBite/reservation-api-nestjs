import { relations } from 'drizzle-orm';
import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { v4 as uuidv4 } from 'uuid';

import { seats } from './seats.schema';

export const rooms = pgTable('rooms', {
  id: uuid()
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  name: varchar({ length: 50 }),
});

export const roomRelations = relations(rooms, ({ many }) => ({
  seats: many(seats),
}));
