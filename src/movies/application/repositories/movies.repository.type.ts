import { Id } from 'src/shared/entities/id';

import { CreateMovieDto } from '../dtos/create-movie.dto';
import { Movie } from '../entities/movie';

export interface IMovieRepository {
  getById(id: Id): Promise<Movie>;
  insertMovie(move: CreateMovieDto): Promise<Id>;
}
