import { DiscountCodesRepository } from 'src/billing/infrastructure/database/discount-codes.repository';
import { Id } from 'src/shared/entities/id';

export function activateDiscountCodeUseCase(
  discountCodesRepository: DiscountCodesRepository,
) {
  return async (discountCodeId: Id) => {
    const discountCode = await discountCodesRepository.getById(discountCodeId);

    discountCode.activate();

    await discountCodesRepository.updateDiscountCode(
      discountCode.getId(),
      discountCode,
    );
  };
}
