import { Inject } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDb } from 'src/drizzle/types/drizzle';
import { CreateShowtimeDto } from 'src/movies/application/dtos/create-showtime.dto';
import { IShowtimesRepository } from 'src/movies/application/repositories/showtimes.repository.type';
import { showtimes } from 'src/movies/schemas/showtimes.schema';
import { Id } from 'src/shared/entities/id';

export class ShowtimesRepository implements IShowtimesRepository {
  constructor(@Inject(DRIZZLE) private db: DrizzleDb) {}

  async insertShowtime(
    priceId: Id,
    duration: number,
    { movieId, roomId, startTime }: CreateShowtimeDto,
  ): Promise<Id> {
    const [created] = await this.db
      .insert(showtimes)
      .values({
        duration,
        movieId,
        priceId,
        roomId,
        startTime,
      })
      .returning({ id: showtimes.id });

    return created.id;
  }
}
