import { Id } from 'src/shared/entities/id';

export class Price {
  constructor(
    private category: string,
    private currency: string,
    private id: Id,
    private value: number,
  ) {}

  getCategory() {
    return this.category;
  }

  getCurrency() {
    return this.currency;
  }

  getId() {
    return this.id;
  }

  getValue() {
    return this.value;
  }
}
