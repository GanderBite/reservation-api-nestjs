import { Id } from 'src/shared/entities/id';

import { CreateSeatDto } from '../dtos/create-seat.dto';

export interface ISeatsRepository {
  insertSeat(roomId: Id, seat: CreateSeatDto): Promise<Id>;
}
