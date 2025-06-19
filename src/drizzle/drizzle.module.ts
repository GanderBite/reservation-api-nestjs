import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';

import { DrizzleDb } from './types/drizzle';

export const DRIZZLE = Symbol('drizzle-orm');

@Module({
  exports: [DRIZZLE],
  providers: [
    {
      inject: [ConfigService],
      provide: DRIZZLE,
      useFactory: (configService: ConfigService) => {
        const connectionString =
          configService.getOrThrow<string>('DATABASE_URL');

        return drizzle(connectionString) as DrizzleDb;
      },
    },
  ],
})
export class DrizzleModule {}
