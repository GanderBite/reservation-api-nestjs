import { PricesRepository } from 'src/billing/infrastructure/database/prices.repository';

import { CreatePriceDto } from '../dtos/create-price.dto';

export function createPriceUseCase(pricesRepository: PricesRepository) {
  return async (price: CreatePriceDto) => pricesRepository.insertPrice(price);
}
