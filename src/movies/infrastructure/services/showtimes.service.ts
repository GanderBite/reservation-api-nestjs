import { Injectable } from '@nestjs/common';
import { CreateShowtimeDto } from 'src/movies/application/dtos/create-showtime.dto';
import { createShowtimeUseCase } from 'src/movies/application/use-cases/create-showtime.use-case';

import { AclPricesService } from '../acls/prices.service';
import { MoviesRepository } from '../database/movies.repository';
import { ShowtimesQuery } from '../database/showtimes.query';
import { ShowtimesRepository } from '../database/showtimes.repository';

@Injectable()
export class ShowtimesService {
  constructor(
    private showtimesRepository: ShowtimesRepository,
    private moviesRepository: MoviesRepository,
    private pricesService: AclPricesService,
    private showtimesQuery: ShowtimesQuery,
  ) {}

  createShowtime(showtime: CreateShowtimeDto) {
    return createShowtimeUseCase(
      this.showtimesRepository,
      this.moviesRepository,
      this.pricesService,
    )(showtime);
  }

  getAllShowtimes() {
    return this.showtimesQuery.getAll();
  }
}
