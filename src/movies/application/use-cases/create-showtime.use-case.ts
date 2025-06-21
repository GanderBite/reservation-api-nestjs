import { IPricesService } from '../acls/prices.service.type';
import { CreateShowtimeDto } from '../dtos/create-showtime.dto';
import { Price } from '../entities/price';
import { IMovieRepository } from '../repositories/movies.repository.type';
import { IShowtimesRepository } from '../repositories/showtimes.repository.type';

export function createShowtimeUseCase(
  showtimesRepository: IShowtimesRepository,
  moviesRepository: IMovieRepository,
  pricesService: IPricesService,
) {
  return async (showtime: CreateShowtimeDto) => {
    const movie = await moviesRepository.getById(showtime.movieId);

    const price = new Price(showtime.price.value, showtime.price.currency);
    const priceId = await pricesService.createPrice(price);

    return showtimesRepository.insertShowtime(
      priceId,
      movie.getDuration(),
      showtime,
    );
  };
}
