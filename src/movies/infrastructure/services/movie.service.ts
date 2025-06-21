import { Injectable } from '@nestjs/common';
import { Id } from 'src/shared/entities/id';

import { CreateMovieDto } from '../../application/dtos/create-movie.dto';
import { createMovieUseCase } from '../../application/use-cases/create-movie.use-case';
import { MoviesRepository } from '../database/movies.repository';

@Injectable()
export class MovieService {
  constructor(private moviesRepository: MoviesRepository) {}

  createMove(createMovieDto: CreateMovieDto): Promise<Id> {
    return createMovieUseCase(this.moviesRepository)(createMovieDto);
  }
}
