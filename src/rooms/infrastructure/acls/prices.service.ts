import { Injectable } from '@nestjs/common';
import { PricesService } from 'src/billing/infrastructure/services/prices.service';
import { IPricesService } from 'src/rooms/application/acls/prices.service.type';
import { Price } from 'src/rooms/application/entities/price';
import { Id } from 'src/shared/entities/id';

@Injectable()
export class AclPricesService implements IPricesService {
  constructor(private pricesService: PricesService) {}

  createPrice(price: Price): Promise<Id> {
    return this.pricesService.createPrice({
      category: 'seat',
      currency: price.getCurrency(),
      value: price.getValue(),
    });
  }
}
