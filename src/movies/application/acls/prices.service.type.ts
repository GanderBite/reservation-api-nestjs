import { Id } from 'src/shared/entities/id';

import { Price } from '../entities/price';

export interface IPricesService {
  createPrice(price: Price): Promise<Id>;
}
