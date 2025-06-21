import { CreateSeatDto } from '../dtos/create-seat.dto';
import { ISeatsRepository } from '../repositories/seats.repository.type';

export function createSeatUseCase(seatsRepository: ISeatsRepository) {
  return async (seat: CreateSeatDto) => seatsRepository.insertSeat(seat);
}
