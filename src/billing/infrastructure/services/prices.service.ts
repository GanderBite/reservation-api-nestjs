import { Injectable } from '@nestjs/common';
import { CreatePriceDto } from 'src/billing/application/dtos/create-price.dto';
import { createPriceUseCase } from 'src/billing/application/use-cases/create-price.use-case';

import { PricesRepository } from '../database/prices.repository';

@Injectable()
export class PricesService {
  constructor(private pricesRepository: PricesRepository) {}

  createPrice(price: CreatePriceDto) {
    return createPriceUseCase(this.pricesRepository)(price);
  }
}
