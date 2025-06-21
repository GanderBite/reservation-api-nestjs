import { Module } from '@nestjs/common';
import { BillingModule } from 'src/billing/billing.module';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

import { AclPricesService } from './infrastructure/acls/prices.service';
import { MoviesController } from './infrastructure/controllers/movies.controller';
import { ShowtimesController } from './infrastructure/controllers/showtimes.controller';
import { MoviesQuery } from './infrastructure/database/movies.query';
import { MoviesRepository } from './infrastructure/database/movies.repository';
import { ShowtimesQuery } from './infrastructure/database/showtimes.query';
import { ShowtimesRepository } from './infrastructure/database/showtimes.repository';
import { MovieService } from './infrastructure/services/movie.service';
import { ShowtimesService } from './infrastructure/services/showtimes.service';

@Module({
  controllers: [MoviesController, ShowtimesController],
  imports: [DrizzleModule, BillingModule],
  providers: [
    MovieService,
    MoviesRepository,
    MoviesQuery,
    ShowtimesService,
    ShowtimesRepository,
    ShowtimesQuery,
    AclPricesService,
  ],
})
export class MoviesModule {}
