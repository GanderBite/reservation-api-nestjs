import { Id } from 'src/shared/entities/id';

import { CreatePriceDto } from '../dtos/create-price.dto';

export interface IPricesRepository {
  insertPrice(price: CreatePriceDto): Promise<Id>;
}
