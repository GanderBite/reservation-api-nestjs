import { Inject } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDb } from 'src/drizzle/types/drizzle';
import { CreateRoomDto } from 'src/rooms/application/dtos/create-room.dto';
import { IRoomsRepository } from 'src/rooms/application/repositories/rooms.repository.type copy';
import { rooms } from 'src/rooms/schemas/rooms.schema';
import { Id } from 'src/shared/entities/id';

export class RoomsRepository implements IRoomsRepository {
  constructor(@Inject(DRIZZLE) private db: DrizzleDb) {}
  async insertRoom({ name }: CreateRoomDto): Promise<Id> {
    const [created] = await this.db
      .insert(rooms)
      .values({
        name,
      })
      .returning({ id: rooms.id });

    return created.id;
  }
}
