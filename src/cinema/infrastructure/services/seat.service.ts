import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from 'src/cinema/application/dtos/create-seat.dto';
import { createSeatUseCase } from 'src/cinema/application/use-cases/create-seat.use-case';
import { Id } from 'src/shared/entities/id';

import { SeatsRepository } from '../database/seats.repository';

@Injectable()
export class SeatService {
  constructor(private seatsRepository: SeatsRepository) {}

  createSeat(seat: CreateSeatDto): Promise<Id> {
    return createSeatUseCase(this.seatsRepository)(seat);
  }
}
