import { Inject, Injectable } from '@nestjs/common';
import { DatabaseError } from 'pg';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDb } from 'src/drizzle/types/drizzle';
import { CreateMovieDto } from 'src/movies/application/dtos/create-movie.dto';
import { MovieExistsError } from 'src/movies/application/entities/errors';
import { IMovieRepository } from 'src/movies/application/repositories/movies.repository.type';
import { movies } from 'src/movies/schemas/movies.schema';
import { Id } from 'src/shared/entities/id';

@Injectable()
export class MoviesRepository implements IMovieRepository {
  constructor(@Inject(DRIZZLE) private db: DrizzleDb) {}

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
