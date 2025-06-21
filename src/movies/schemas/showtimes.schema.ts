import { integer, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { prices } from 'src/billing/schemas/prices.schema';
import { v4 } from 'uuid';

export const showtimes = pgTable('showtimes', {
  duration: integer().notNull(),
  id: uuid()
    .primaryKey()
    .$defaultFn(() => v4()),
  movieId: uuid('movie_id').notNull(),
  priceId: uuid('price_id')
    .notNull()
    .references(() => prices.id),
  roomId: uuid('room_id').notNull(),
  startTime: varchar('start_time', { length: 5 }),
});
