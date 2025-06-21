import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

import { PricesRepository } from './infrastructure/database/prices.repository';
import { PricesService } from './infrastructure/services/prices.service';

@Module({
  exports: [PricesService],
  imports: [DrizzleModule],
  providers: [PricesService, PricesRepository],
})
export class BillingModule {}
