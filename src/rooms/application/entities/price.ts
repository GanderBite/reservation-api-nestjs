export class Price {
  constructor(
    private value: number,
    private currency: string,
  ) {}

  getCurrency() {
    return this.currency;
  }

  getValue() {
    return this.value;
  }
}
