import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

import { SeatsController } from './infrastructure/controllers/seats.controller';
import { SeatsRepository } from './infrastructure/database/seats.repository';
import { SeatService } from './infrastructure/services/seat.service';

@Module({
  controllers: [SeatsController],
  imports: [DrizzleModule],
  providers: [SeatService, SeatsRepository],
})
export class RoomsModule {}
