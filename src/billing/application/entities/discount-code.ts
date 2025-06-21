import { Id } from 'src/shared/entities/id';

import {
  DiscountCodeActivationError,
  DiscountCodeDeactivationError,
} from './errors';

export class DiscountCode {
  constructor(
    private id: Id,
    private code: string,
    private value: number,
    private isActive: boolean,
  ) {}

  activate() {
    if (this.isActive) {
      throw new DiscountCodeActivationError();
    }

    this.isActive = true;
  }

  deactivate() {
    if (!this.isActive) {
      throw new DiscountCodeDeactivationError();
    }

    this.isActive = false;
  }

  getCode() {
    return this.code;
  }

  getId() {
    return this.id;
  }

  getIsActive() {
    return this.isActive;
  }

  getValue() {
    return this.value;
  }
}
