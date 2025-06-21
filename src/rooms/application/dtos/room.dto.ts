import { Id } from 'src/shared/entities/id';

import { SeatDto } from './seat.dto';

export class RoomDto {
  id: Id;
  name: string;
  seats: SeatDto[];
}
