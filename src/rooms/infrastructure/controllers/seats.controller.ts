import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/auth-jwt.quard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateSeatDto } from 'src/rooms/application/dtos/create-seat.dto';
import { SeatExistsError } from 'src/rooms/domain/errors';

import { SeatService } from '../services/seat.service';

@Controller('seats')
export class SeatsController {
  constructor(private seatsService: SeatService) {}
  @Post('/')
  @UseGuards(JWTAuthGuard, RolesGuard('ADMIN'))
  async createSeat(@Body() body: CreateSeatDto) {
    try {
      const id = await this.seatsService.createSeat(body);

      return { data: id };
    } catch (err) {
      if (err instanceof SeatExistsError) {
        throw new ConflictException(err.message);
      } else {
        throw new InternalServerErrorException(err);
      }
    }
  }
}
