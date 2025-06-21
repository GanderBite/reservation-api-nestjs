import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from 'src/rooms/application/dtos/create-room.dto';
import { createRoomUseCase } from 'src/rooms/application/use-cases/create-room.use-case';
import { Id } from 'src/shared/entities/id';

import { RoomsQuery } from '../database/rooms.query';
import { RoomsRepository } from '../database/rooms.repository';

@Injectable()
export class RoomsService {
  constructor(
    private roomsRepository: RoomsRepository,
    private roomsQuery: RoomsQuery,
  ) {}

  createRoom(room: CreateRoomDto): Promise<Id> {
    return createRoomUseCase(this.roomsRepository)(room);
  }

  getRoom(roomId: Id) {
    return this.roomsQuery.getRoom(roomId);
  }
}
