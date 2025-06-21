import { Id } from 'src/shared/entities/id';

import { CreateDiscountCodeDto } from '../dtos/create-discount-code.dto';
import { DiscountCode } from '../entities/discount-code';

export interface IDiscountCodesRepository {
  getById(id: Id): Promise<DiscountCode>;
  insertDiscountCode(discountCode: CreateDiscountCodeDto): Promise<Id>;

  updateDiscountCode(
    discountCodeId: Id,
    discountCode: DiscountCode,
  ): Promise<void>;
}
