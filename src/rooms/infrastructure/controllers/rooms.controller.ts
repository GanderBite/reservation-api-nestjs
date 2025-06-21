import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import {
  Body,
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/auth-jwt.quard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateRoomDto } from 'src/rooms/application/dtos/create-room.dto';
import { CreateSeatDto } from 'src/rooms/application/dtos/create-seat.dto';
import { RoomDto } from 'src/rooms/application/dtos/room.dto';
import {
  RoomNotFoundError,
  SeatExistsError,
} from 'src/rooms/application/entities/errors';
import { Id } from 'src/shared/entities/id';
import { Response } from 'src/shared/types/response.type';

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

  @CacheTTL(60 * 1000)
  @Get('/:roomId')
  @UseInterceptors(CacheInterceptor)
  async getRoom(@Param('roomId') roomId: Id): Promise<Response<RoomDto>> {
    try {
      const room = await this.roomsService.getRoom(roomId);

      return { data: room };
    } catch (err) {
      if (err instanceof RoomNotFoundError) {
        throw new NotFoundException(err.message);
      }

      throw new InternalServerErrorException(err);
    }
  }
}
