export class MovieExistsError extends Error {
  constructor(title: string) {
    super(`Movie "${title}" already exists`);
  }
}
export class SeatExistsError extends Error {
  constructor(label: string) {
    super(`Seat "${label}" already exists`);
  }
}
