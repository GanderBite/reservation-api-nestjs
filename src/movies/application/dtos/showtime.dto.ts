import { Id } from 'src/shared/entities/id';

import { MovieDto } from './movie.dto';
import { PriceDto } from './price.dto';

export class ShowtimeDto {
  id: Id;
  movie: MovieDto;
  price: PriceDto;
  roomId: Id;
}
