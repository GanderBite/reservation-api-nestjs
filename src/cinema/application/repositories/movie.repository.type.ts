import { Movie } from 'src/cinema/domain/movie';
import { Id } from 'src/shared/entities/id';

import { CreateMovieDto } from '../dtos/create-movie.dto';

export interface IMovieRepository {
  getByTitle(title: string): Promise<Movie | null>;
  insertMovie(move: CreateMovieDto): Promise<Id>;
}
