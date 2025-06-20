import { MovieExistsError } from 'src/cinema/domain/errors';

import { CreateMovieDto } from '../dtos/create-movie.dto';
import { IMovieRepository } from '../repositories/movie.repository.type';

export function createMovieUseCase(movieRepository: IMovieRepository) {
  return async (createMovieDto: CreateMovieDto) => {
    const existingMovie = await movieRepository.getByTitle(
      createMovieDto.title,
    );

    if (existingMovie) {
      throw new MovieExistsError(existingMovie.getTitle());
    }

    return movieRepository.insertMovie(createMovieDto);
  };
}
