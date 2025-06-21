import { Injectable } from '@nestjs/common';
import { CreateDiscountCodeDto } from 'src/billing/application/dtos/create-discount-code.dto';
import { activateDiscountCodeUseCase } from 'src/billing/application/use-cases/activate-discount-code.use-case';
import { createDiscountCodeUseCase } from 'src/billing/application/use-cases/create-discount-code.use-case';
import { deactivateDiscountCodeUseCase } from 'src/billing/application/use-cases/deactivate-discount-code.use-case';
import { Id } from 'src/shared/entities/id';

import { DiscountCodesQuery } from '../database/discount-codes.query';
import { DiscountCodesRepository } from '../database/discount-codes.repository';

@Injectable()
export class DiscountCodesService {
  constructor(
    private discountCodesRepository: DiscountCodesRepository,
    private discountCodesQuery: DiscountCodesQuery,
  ) {}

  async activateDiscountCode(id: Id) {
    await activateDiscountCodeUseCase(this.discountCodesRepository)(id);
  }

  createDiscount(discountCode: CreateDiscountCodeDto) {
    return createDiscountCodeUseCase(this.discountCodesRepository)(
      discountCode,
    );
  }

  async deactivateDiscountCode(id: Id) {
    await deactivateDiscountCodeUseCase(this.discountCodesRepository)(id);
  }

  getDiscountCodeByCode(code: string) {
    return this.discountCodesQuery.getByCode(code);
  }

  getDiscountCodeById(id: Id) {
    return this.discountCodesRepository.getById(id);
  }
}
