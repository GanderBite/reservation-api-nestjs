import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDb } from 'src/drizzle/types/drizzle';
import { movies } from 'src/movies/schemas/movies.schema';

@Injectable()
export class MoviesQuery {
  constructor(@Inject(DRIZZLE) private db: DrizzleDb) {}

  getAll() {
    return this.db.select().from(movies);
  }
}
