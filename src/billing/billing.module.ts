import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

import { DiscountCodesController } from './infrastructure/controllers/discount-codes.controller';
import { DiscountCodesQuery } from './infrastructure/database/discount-codes.query';
import { DiscountCodesRepository } from './infrastructure/database/discount-codes.repository';
import { PricesRepository } from './infrastructure/database/prices.repository';
import { DiscountCodesService } from './infrastructure/services/discount-codes.service';
import { PricesService } from './infrastructure/services/prices.service';

@Module({
  controllers: [DiscountCodesController],
  exports: [PricesService],
  imports: [DrizzleModule],
  providers: [
    PricesService,
    PricesRepository,
    DiscountCodesRepository,
    DiscountCodesService,
    DiscountCodesQuery,
  ],
})
export class BillingModule {}
