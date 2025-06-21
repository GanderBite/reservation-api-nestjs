import { Id } from 'src/shared/entities/id';

import { PriceDto } from './price.dto';

export class SeatDto {
  column: string;
  id: Id;
  price: PriceDto;
  row: string;
}
