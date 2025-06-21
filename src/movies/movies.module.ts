import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

import { MoviesController } from './infrastructure/controllers/movies.controller';
import { MoviesQuery } from './infrastructure/database/movies.query';
import { MoviesRepository } from './infrastructure/database/movies.repository';
import { MovieService } from './infrastructure/services/movie.service';

@Module({
  controllers: [MoviesController],
  imports: [DrizzleModule],
  providers: [MovieService, MoviesRepository, MoviesQuery],
})
export class MoviesModule {}
