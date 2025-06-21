export class DiscountCodeAlreadyExistsError extends Error {
  constructor(code: string) {
    super(`Discount ${code} already exists`);
  }
}

export class DiscountCodeNotFoundError extends Error {
  constructor(param: string) {
    super(`Discount code "${param}" not found`);
  }
}
