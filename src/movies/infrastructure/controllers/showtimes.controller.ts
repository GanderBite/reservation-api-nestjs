import {
  Body,
  Controller,
  InternalServerErrorException,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/guards/auth-jwt.quard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateShowtimeDto } from 'src/movies/application/dtos/create-showtime.dto';
import { MovieNotFoundError } from 'src/movies/application/entities/errors';
import { Id } from 'src/shared/entities/id';
import { Response } from 'src/shared/types/response.type';

import { ShowtimesService } from '../services/showtimes.service';

@Controller('showtimes')
export class ShowtimesController {
  constructor(private showtimesService: ShowtimesService) {}

  @Post()
  @UseGuards(JWTAuthGuard, RolesGuard('ADMIN'))
  async create(@Body() body: CreateShowtimeDto): Promise<Response<Id>> {
    try {
      const createdId = await this.showtimesService.createShowtime(body);

      return { data: createdId };
    } catch (err) {
      if (err instanceof MovieNotFoundError) {
        throw new NotFoundException(err.message);
      }

      throw new InternalServerErrorException(err);
    }
  }
}
