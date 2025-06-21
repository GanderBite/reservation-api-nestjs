import { Injectable } from '@nestjs/common';
import { Id } from 'src/shared/entities/id';

import { CreateMovieDto } from '../../application/dtos/create-movie.dto';
import { createMovieUseCase } from '../../application/use-cases/create-movie.use-case';
import { MoviesQuery } from '../database/movies.query';
import { MoviesRepository } from '../database/movies.repository';

@Injectable()
export class MovieService {
  constructor(
    private moviesRepository: MoviesRepository,
    private moviesQuery: MoviesQuery,
  ) {}

  createMove(createMovieDto: CreateMovieDto): Promise<Id> {
    return createMovieUseCase(this.moviesRepository)(createMovieDto);
  }

  getAllMovies() {
    return this.moviesQuery.getAll();
  }
}
