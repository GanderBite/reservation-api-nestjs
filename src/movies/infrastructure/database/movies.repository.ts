import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DatabaseError } from 'pg';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDb } from 'src/drizzle/types/drizzle';
import { CreateMovieDto } from 'src/movies/application/dtos/create-movie.dto';
import {
  MovieExistsError,
  MovieNotFoundError,
} from 'src/movies/application/entities/errors';
import { Movie } from 'src/movies/application/entities/movie';
import { IMovieRepository } from 'src/movies/application/repositories/movies.repository.type';
import { movies } from 'src/movies/schemas/movies.schema';
import { Id } from 'src/shared/entities/id';

@Injectable()
export class MoviesRepository implements IMovieRepository {
  constructor(@Inject(DRIZZLE) private db: DrizzleDb) {}
  async getById(movieId: Id): Promise<Movie> {
    const records = await this.db
      .select()
      .from(movies)
      .where(eq(movies.id, movieId));

    if (!records.length) {
      throw new MovieNotFoundError(movieId);
    }

    const { duration, id, title } = records[0];

    return new Movie(id, title, duration);
  }

  async insertMovie({ duration, title }: CreateMovieDto): Promise<Id> {
    try {
      const [created] = await this.db
        .insert(movies)
        .values({
          duration,
          title,
        })
        .returning({ id: movies.id });

      return created.id;
    } catch (err) {
      const error = err as { cause: DatabaseError };
      switch (error.cause.code) {
        case '23505':
          throw new MovieExistsError(title);
        default:
          throw err;
      }
    }
  }
}
