import { createKeyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { BillingModule } from './billing/billing.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { MoviesModule } from './movies/movies.module';
import { RoomsModule } from './rooms/rooms.module';
import 'dotenv/config';

@Module({
  controllers: [],
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => {
        return {
          stores: [createKeyv(process.env.REDIS_URL)],
        };
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule,
    AuthModule,
    MoviesModule,
    RoomsModule,
    BillingModule,
  ],
  providers: [],
})
export class AppModule {}
