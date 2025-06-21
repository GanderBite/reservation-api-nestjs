import { Inject } from '@nestjs/common';
import { CreatePriceDto } from 'src/billing/application/dtos/create-price.dto';
import { IPricesRepository } from 'src/billing/application/repositories/prices.repository.type';
import { prices } from 'src/billing/schemas/prices.schema';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDb } from 'src/drizzle/types/drizzle';
import { Id } from 'src/shared/entities/id';

export class PricesRepository implements IPricesRepository {
  constructor(@Inject(DRIZZLE) private db: DrizzleDb) {}

  async insertPrice({
    category,
    currency,
    value,
  }: CreatePriceDto): Promise<Id> {
    const [created] = await this.db
      .insert(prices)
      .values({
        category,
        currency,
        value,
      })
      .returning({ id: prices.id });

    return created.id;
  }
}
