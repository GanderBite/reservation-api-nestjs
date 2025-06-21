import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

import { RoomsController } from './infrastructure/controllers/rooms.controller';
import { RoomsRepository } from './infrastructure/database/rooms.repository';
import { SeatsRepository } from './infrastructure/database/seats.repository';
import { RoomsService } from './infrastructure/services/rooms.service';
import { SeatService } from './infrastructure/services/seat.service';

@Module({
  controllers: [RoomsController],
  imports: [DrizzleModule],
  providers: [SeatService, SeatsRepository, RoomsService, RoomsRepository],
})
export class RoomsModule {}
