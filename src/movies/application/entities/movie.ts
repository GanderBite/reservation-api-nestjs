import { Id } from 'src/shared/entities/id';

export class Movie {
  constructor(
    private id: Id,
    private title: string,
    private duration: number,
  ) {}

  getDuration() {
    return this.duration;
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }
}
