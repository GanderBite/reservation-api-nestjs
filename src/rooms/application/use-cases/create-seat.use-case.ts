import { Id } from 'src/shared/entities/id';

import { IPricesService } from '../acls/prices.service.type';
import { CreateSeatDto } from '../dtos/create-seat.dto';
import { Price } from '../entities/price';
import { ISeatsRepository } from '../repositories/seats.repository.type';

export function createSeatUseCase(
  seatsRepository: ISeatsRepository,
  pricesService: IPricesService,
) {
  return async (roomId: Id, seat: CreateSeatDto) => {
    const price = new Price(seat.price.value, seat.price.currency);

    const priceId = await pricesService.createPrice(price);
    return seatsRepository.insertSeat(roomId, priceId, seat);
  };
}
