export class SeatExistsError extends Error {
  constructor(label: string) {
    super(`Seat "${label}" already exists`);
  }
}
