import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PasswordService } from './services/password.service';
import { AuthService } from './services/auth.service';
import { JWTService } from './services/jwt.service';
import { AuthRepository } from './repositories/auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { JWT_SECRET } from './auth.constants';
import { MatchPasswordsConstraint } from './validators/match-passwords.validator';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    DrizzleModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '4h' },
    }),
  ],
  controllers: [AuthController],
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
