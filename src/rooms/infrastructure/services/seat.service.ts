import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from 'src/rooms/application/dtos/create-seat.dto';
import { createSeatUseCase } from 'src/rooms/application/use-cases/create-seat.use-case';
import { Id } from 'src/shared/entities/id';

import { AclPricesService } from '../acls/prices.service';
import { SeatsRepository } from '../database/seats.repository';

@Injectable()
export class SeatService {
  constructor(
    private seatsRepository: SeatsRepository,
    private priceService: AclPricesService,
  ) {}

  createSeat(roomId: Id, seat: CreateSeatDto): Promise<Id> {
    return createSeatUseCase(this.seatsRepository, this.priceService)(
      roomId,
      seat,
    );
  }
}
