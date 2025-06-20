import { Id } from 'src/shared/entities/id';

import { CreateMovieDto } from '../dtos/create-movie.dto';

export interface IMovieRepository {
  insertMovie(move: CreateMovieDto): Promise<Id>;
}
