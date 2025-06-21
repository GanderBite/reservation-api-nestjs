import { Id } from 'src/shared/entities/id';

import { Seat } from './seat';

export class Room {
  constructor(
    private id: Id,
    private name: string,
    private seats: Seat[],
  ) {}

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getSeats() {
    return this.seats;
  }
}
