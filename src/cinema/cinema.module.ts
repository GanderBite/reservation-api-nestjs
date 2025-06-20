import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

import { MoviesController } from './infrastructure/controllers/movies.controller';
import { SeatsController } from './infrastructure/controllers/seats.controller';
import { MoviesRepository } from './infrastructure/database/movies.repository';
import { SeatsRepository } from './infrastructure/database/seats.repository';
import { MovieService } from './infrastructure/services/movie.service';
import { SeatService } from './infrastructure/services/seat.service';

@Module({
  controllers: [MoviesController, SeatsController],
  imports: [DrizzleModule],
  providers: [MovieService, MoviesRepository, SeatService, SeatsRepository],
})
export class CinemaModule {}
