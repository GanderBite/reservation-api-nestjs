import { Id } from 'src/shared/entities/id';

export class Seat {
  constructor(
    private id: Id,
    private row: string,
    private col: number,
  ) {}

  getCol() {
    return this.col;
  }

  getId() {
    return this.id;
  }

  getRow() {
    return this.row;
  }

  toString() {
    return `${this.row}${this.col}`;
  }
}
