import { Id } from 'src/shared/entities/id';

import { SeatExistsError } from './errors';
import { Seat } from './seat';

export class Room {
  constructor(
    private id: Id,
    private name: string,
    private seats: Seat[],
  ) {}

  addSeat(seat: Seat) {
    const seatLabel = seat.toString();
    const alreadyExists = this.seats.some((s) => s.toString() === seatLabel);

    if (alreadyExists) {
      throw new SeatExistsError(seatLabel);
    }

    this.seats.push(seat);
  }

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
