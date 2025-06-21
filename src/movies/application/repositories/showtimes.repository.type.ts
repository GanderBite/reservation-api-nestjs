import { Id } from 'src/shared/entities/id';

import { CreateShowtimeDto } from '../dtos/create-showtime.dto';

export interface IShowtimesRepository {
  insertShowtime(
    priceId: Id,
    duration: number,
    showtime: CreateShowtimeDto,
  ): Promise<Id>;
}
