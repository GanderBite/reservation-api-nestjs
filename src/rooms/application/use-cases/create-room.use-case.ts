import { CreateRoomDto } from '../dtos/create-room.dto';
import { IRoomsRepository } from '../repositories/rooms.repository.type copy';

export function createRoomUseCase(roomsRepository: IRoomsRepository) {
  return (room: CreateRoomDto) => roomsRepository.insertRoom(room);
}
