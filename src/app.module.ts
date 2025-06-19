import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { CinemaModule } from './cinema/cinema.module';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    AuthModule,
    CinemaModule,
  ],
  providers: [],
})
export class AppModule {}
