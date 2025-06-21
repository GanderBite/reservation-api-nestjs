import { Id } from 'src/shared/entities/id';

export class RoomNotFoundError extends Error {
  constructor(id: Id) {
    super(`Room "${id}" not found`);
  }
}

export class SeatExistsError extends Error {
  constructor(label: string) {
    super(`Seat "${label}" already exists`);
  }
}
