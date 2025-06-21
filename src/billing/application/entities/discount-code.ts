import { Id } from 'src/shared/entities/id';

export class DiscountCode {
  constructor(
    private id: Id,
    private code: string,
    private value: number,
  ) {}

  getCode() {
    return this.code;
  }

  getId() {
    return this.id;
  }

  getValue() {
    return this.value;
  }
}
