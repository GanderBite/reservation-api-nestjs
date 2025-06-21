export class DiscountCodeActivationError extends Error {
  constructor(reason = 'Discount code already active') {
    super(`Cannot activate discount code: ${reason}`);
  }
}

export class DiscountCodeAlreadyExistsError extends Error {
  constructor(code: string) {
    super(`Discount ${code} already exists`);
  }
}

export class DiscountCodeDeactivationError extends Error {
  constructor(reason = 'Discount code already inactive') {
    super(`Cannot activate discount code: ${reason}`);
  }
}

export class DiscountCodeNotFoundError extends Error {
  constructor(param: string) {
    super(`Discount code "${param}" not found`);
  }
}
