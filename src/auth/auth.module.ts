import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

import { JWT_SECRET } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthRepository } from './repositories/auth.repository';
import { AuthService } from './services/auth.service';
import { JWTService } from './services/jwt.service';
import { PasswordService } from './services/password.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { MatchPasswordsConstraint } from './validators/match-passwords.validator';

@Module({
  controllers: [AuthController],
  imports: [
    DrizzleModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  providers: [
    MatchPasswordsConstraint,
    PasswordService,
    JWTService,
    AuthRepository,
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
