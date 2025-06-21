import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

import { MoviesController } from './infrastructure/controllers/movies.controller';
import { MoviesRepository } from './infrastructure/database/movies.repository';
import { MovieService } from './infrastructure/services/movie.service';

@Module({
  controllers: [MoviesController],
  imports: [DrizzleModule],
  providers: [MovieService, MoviesRepository],
})
export class MoviesModule {}
