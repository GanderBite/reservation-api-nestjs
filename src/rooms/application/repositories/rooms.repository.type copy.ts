import { Id } from 'src/shared/entities/id';

import { CreateRoomDto } from '../dtos/create-room.dto';

export interface IRoomsRepository {
  insertRoom(room: CreateRoomDto): Promise<Id>;
}
