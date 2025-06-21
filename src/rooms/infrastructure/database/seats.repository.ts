import { Inject, Injectable } from '@nestjs/common';
import { DatabaseError } from 'pg';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDb } from 'src/drizzle/types/drizzle';
import { CreateSeatDto } from 'src/rooms/application/dtos/create-seat.dto';
import { ISeatsRepository } from 'src/rooms/application/repositories/seats.repository.type';
import { SeatExistsError } from 'src/rooms/domain/errors';
import { seats } from 'src/rooms/schemas/seats.schema';
import { Id } from 'src/shared/entities/id';

@Injectable()
export class SeatsRepository implements ISeatsRepository {
  constructor(@Inject(DRIZZLE) private db: DrizzleDb) {}
  async insertSeat({ col, row }: CreateSeatDto): Promise<Id> {
    try {
      const [created] = await this.db
        .insert(seats)
        .values({
          col,
          row,
        })
        .returning({ id: seats.id });

      return created.id;
    } catch (err) {
      const error = err as { cause: DatabaseError };
      switch (error.cause.code) {
        case '23505':
          throw new SeatExistsError(`${row}${col}`);
        default:
          throw err;
      }
    }
  }
}
