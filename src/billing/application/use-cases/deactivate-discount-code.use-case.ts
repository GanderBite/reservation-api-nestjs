import { DiscountCodesRepository } from 'src/billing/infrastructure/database/discount-codes.repository';
import { Id } from 'src/shared/entities/id';

export function deactivateDiscountCodeUseCase(
  discountCodesRepository: DiscountCodesRepository,
) {
  return async (discountCodeId: Id) => {
    const discountCode = await discountCodesRepository.getById(discountCodeId);

    discountCode.deactivate();

    await discountCodesRepository.updateDiscountCode(
      discountCode.getId(),
      discountCode,
    );
  };
}
