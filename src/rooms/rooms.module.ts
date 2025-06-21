import { Module } from '@nestjs/common';
import { BillingModule } from 'src/billing/billing.module';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

import { AclPricesService } from './infrastructure/acls/prices.service';
import { RoomsController } from './infrastructure/controllers/rooms.controller';
import { RoomsQuery } from './infrastructure/database/rooms.query';
import { RoomsRepository } from './infrastructure/database/rooms.repository';
import { SeatsRepository } from './infrastructure/database/seats.repository';
import { RoomsService } from './infrastructure/services/rooms.service';
import { SeatService } from './infrastructure/services/seat.service';

@Module({
  controllers: [RoomsController],
  imports: [DrizzleModule, BillingModule],
  providers: [
    SeatService,
    SeatsRepository,
    RoomsService,
    RoomsRepository,
    RoomsQuery,
    AclPricesService,
  ],
})
export class RoomsModule {}
