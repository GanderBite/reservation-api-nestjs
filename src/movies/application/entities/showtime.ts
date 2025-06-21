import { Id } from 'src/shared/entities/id';

export class Showtime {
  constructor(
    private id: Id,
    private roomId: Id,
    private movieId: Id,
    private priceId: Id,
    private startTime: string,
    private endTime: string,
  ) {}

  getEndTime() {
    return this.endTime;
  }

  getId() {
    return this.id;
  }

  getMovieId() {
    return this.movieId;
  }

  getPriceId() {
    return this.priceId;
  }

  getRoomId() {
    return this.roomId;
  }

  getStartTime() {
    return this.startTime;
  }
}
