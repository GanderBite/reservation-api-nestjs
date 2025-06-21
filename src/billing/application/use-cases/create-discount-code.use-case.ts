import { CreateDiscountCodeDto } from '../dtos/create-discount-code.dto';
import { IDiscountCodesRepository } from '../repositories/discount-codes.repository.type';

export function createDiscountCodeUseCase(
  discountCodesRepository: IDiscountCodesRepository,
) {
  return async (discountCode: CreateDiscountCodeDto) =>
    discountCodesRepository.insertDiscountCode(discountCode);
}
