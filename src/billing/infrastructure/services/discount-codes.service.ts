import { Injectable } from '@nestjs/common';
import { CreateDiscountCodeDto } from 'src/billing/application/dtos/create-discount-code.dto';
import { createDiscountCodeUseCase } from 'src/billing/application/use-cases/create-discount-code.use-case';

import { DiscountCodesRepository } from '../database/discount-codes.repository';

@Injectable()
export class DiscountCodesService {
  constructor(private discountCodesRepository: DiscountCodesRepository) {}

  createDiscount(discountCode: CreateDiscountCodeDto) {
    return createDiscountCodeUseCase(this.discountCodesRepository)(
      discountCode,
    );
  }
}
