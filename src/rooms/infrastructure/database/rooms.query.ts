import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { prices } from 'src/billing/schemas/prices.schema';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDb } from 'src/drizzle/types/drizzle';
import { RoomDto } from 'src/rooms/application/dtos/room.dto';
import { SeatDto } from 'src/rooms/application/dtos/seat.dto';
import { RoomNotFoundError } from 'src/rooms/application/entities/errors';
import { rooms } from 'src/rooms/schemas/rooms.schema';
import { seats } from 'src/rooms/schemas/seats.schema';
import { Id } from 'src/shared/entities/id';

@Injectable()
export class RoomsQuery {
  constructor(@Inject(DRIZZLE) private db: DrizzleDb) {}

  async getRoom(roomId: Id): Promise<RoomDto> {
    const records = await this.db
      .select({
        id: rooms.id,
        name: rooms.name,
        seats: sql<SeatDto[]>`
            COALESCE(array_agg(
              json_build_object(
                'id', ${seats.id},
                'row', ${seats.row},
                'col', ${seats.col},
                'price', json_build_object(
                  'value', ${prices.value},
                  'currency', ${prices.currency}
                )
              )
            ) FILTER (WHERE ${seats.id} IS NOT NULL), '{}')
          `.as('seats'),
      })
      .from(rooms)
      .leftJoin(seats, eq(rooms.id, seats.roomId))
      .leftJoin(prices, eq(prices.id, seats.priceId))
      .where(eq(rooms.id, roomId))
      .groupBy(rooms.id);

    if (!records.length) {
      throw new RoomNotFoundError(roomId);
    }

    return records[0];
  }
}
