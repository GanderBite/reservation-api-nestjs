import { relations } from 'drizzle-orm';
import { integer, pgTable, unique, uuid, varchar } from 'drizzle-orm/pg-core';
import { v4 as uuidv4 } from 'uuid';

import { rooms } from './rooms.schema';

export const seats = pgTable(
  'seats',
  {
    col: integer().notNull(),
    id: uuid()
      .primaryKey()
      .$default(() => uuidv4()),
    roomId: uuid('room_id').notNull(),
    row: varchar({ length: 1 }).notNull(),
  },
  (table) => [
    unique('uniqueRowColRoom').on(table.row, table.col, table.roomId),
  ],
);

export const seatsRelations = relations(seats, ({ one }) => ({
  room: one(rooms, {
    fields: [seats.roomId],
    references: [rooms.id],
  }),
}));
