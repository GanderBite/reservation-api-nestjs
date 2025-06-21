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
import { CreateRoomDto } from 'src/rooms/application/dtos/create-room.dto';
import { SeatExistsError } from 'src/rooms/domain/errors';

import { RoomsService } from '../services/rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}
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
}
