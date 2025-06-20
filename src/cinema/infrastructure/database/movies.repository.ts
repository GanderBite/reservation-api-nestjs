import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { CreateMovieDto } from 'src/cinema/application/dtos/create-movie.dto';
import { IMovieRepository } from 'src/cinema/application/repositories/movie.repository.type';
import { Movie } from 'src/cinema/domain/movie';
import { movies } from 'src/cinema/schemas/movies.schema';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDb } from 'src/drizzle/types/drizzle';
import { Id } from 'src/shared/entities/id';

@Injectable()
export class MoviesRepository implements IMovieRepository {
  constructor(@Inject(DRIZZLE) private db: DrizzleDb) {}

  async getByTitle(title: Id): Promise<Movie | null> {
    const records = await this.db
      .select()
      .from(movies)
      .where(eq(movies.title, title));

    if (!records.length) return null;

    const movie = records[0];

    return new Movie(movie.id, movie.title, movie.duration);
  }

  async insertMovie({ duration, title }: CreateMovieDto): Promise<Id> {
    const [created] = await this.db
      .insert(movies)
      .values({
        duration,
        title,
      })
      .returning({ id: movies.id });

    return created.id;
  }
}
