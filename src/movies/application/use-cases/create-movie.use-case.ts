import { CreateMovieDto } from '../dtos/create-movie.dto';
import { IMovieRepository } from '../repositories/movies.repository.type';

export function createMovieUseCase(movieRepository: IMovieRepository) {
  return async (createMovieDto: CreateMovieDto) =>
    movieRepository.insertMovie(createMovieDto);
}
