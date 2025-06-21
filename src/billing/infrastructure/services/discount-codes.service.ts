import { Injectable } from '@nestjs/common';
import { CreateDiscountCodeDto } from 'src/billing/application/dtos/create-discount-code.dto';
import { createDiscountCodeUseCase } from 'src/billing/application/use-cases/create-discount-code.use-case';
import { Id } from 'src/shared/entities/id';

import { DiscountCodesQuery } from '../database/discount-codes.query';
import { DiscountCodesRepository } from '../database/discount-codes.repository';

@Injectable()
export class DiscountCodesService {
  constructor(
    private discountCodesRepository: DiscountCodesRepository,
    private discountCodesQuery: DiscountCodesQuery,
  ) {}

  createDiscount(discountCode: CreateDiscountCodeDto) {
    return createDiscountCodeUseCase(this.discountCodesRepository)(
      discountCode,
    );
  }

  getDiscountCodeByCode(code: string) {
    return this.discountCodesQuery.getByCode(code);
  }

  getDiscountCodeById(id: Id) {
    return this.discountCodesQuery.getById(id);
  }
}
