import { Inject, Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { prices } from 'src/billing/schemas/prices.schema';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDb } from 'src/drizzle/types/drizzle';
import { MovieDto } from 'src/movies/application/dtos/movie.dto';
import { PriceDto } from 'src/movies/application/dtos/price.dto';
import { ShowtimeDto } from 'src/movies/application/dtos/showtime.dto';
import { movies } from 'src/movies/schemas/movies.schema';
import { showtimes } from 'src/movies/schemas/showtimes.schema';

@Injectable()
export class ShowtimesQuery {
  constructor(@Inject(DRIZZLE) private db: DrizzleDb) {}

  async getAll(): Promise<ShowtimeDto[]> {
    return this.db
      .select({
        duration: showtimes.duration,
        id: showtimes.id,
        movie: sql<MovieDto>`json_build_object(
          'id', ${movies.id},
          'title', ${movies.title},
          'duration', ${movies.duration}
        )`,
        price: sql<PriceDto>`json_build_object(
          'value', ${prices.value},
          'currency', ${prices.currency}
        )`,
        roomId: showtimes.roomId,
      })
      .from(showtimes)
      .leftJoin(prices, eq(showtimes.priceId, prices.id))
      .leftJoin(movies, eq(showtimes.movieId, movies.id));
  }
}
