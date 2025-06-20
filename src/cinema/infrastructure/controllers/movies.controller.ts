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
import { CreateMovieDto } from 'src/cinema/application/dtos/create-movie.dto';
import { MovieExistsError } from 'src/cinema/domain/errors';
import { MovieService } from 'src/cinema/infrastructure/services/movie.service';

import { CreatedResponse } from '../responses/created.response';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MovieService) {}
  @Post('/')
  @UseGuards(JWTAuthGuard, RolesGuard('ADMIN'))
  async createMove(@Body() body: CreateMovieDto): Promise<CreatedResponse> {
    try {
      const id = await this.moviesService.createMove(body);

      return { data: id };
    } catch (err) {
      if (err instanceof MovieExistsError) {
        throw new ConflictException(err.message);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
