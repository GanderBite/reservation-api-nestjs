import {
  Body,
  ConflictException,
  Controller,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/auth-jwt.quard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateRoomDto } from 'src/rooms/application/dtos/create-room.dto';
import { CreateSeatDto } from 'src/rooms/application/dtos/create-seat.dto';
import { SeatExistsError } from 'src/rooms/domain/errors';
import { Id } from 'src/shared/entities/id';

import { RoomsService } from '../services/rooms.service';
import { SeatService } from '../services/seat.service';

@Controller('rooms')
export class RoomsController {
  constructor(
    private roomsService: RoomsService,
    private seatsService: SeatService,
  ) {}
  @Post('/')
  @UseGuards(JWTAuthGuard, RolesGuard('ADMIN'))
  async createRoom(@Body() body: CreateRoomDto) {
    try {
      const id = await this.roomsService.createRoom(body);

      return { data: id };
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post('/:roomId/seats')
  @UseGuards(JWTAuthGuard, RolesGuard('ADMIN'))
  async createSeat(@Param('roomId') roomId: Id, @Body() body: CreateSeatDto) {
    try {
      const id = await this.seatsService.createSeat(roomId, body);

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
