import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';

export const DRIZZLE = Symbol('drizzle-orm');

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const connectionString =
          configService.getOrThrow<string>('DATABASE_URL');

        return drizzle(connectionString);
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
