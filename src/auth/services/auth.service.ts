import { Injectable, Logger } from '@nestjs/common';
import { Email } from 'src/shared/entities/email';
import { ApiException } from 'src/shared/errors/api-error';

import { SignUpDto } from '../auth.dtos';
import {
  EmailTakenException,
  InvalidCredentialsException,
} from '../entities/errors';
import { IdentityPayload } from '../entities/identity-payload';
import { AuthRepository } from '../repositories/auth.repository';
import { AuthTokenResponse } from '../types/auth-responses';
import { JWTService } from './jwt.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger();

  constructor(
    private passwordService: PasswordService,
    private jwtService: JWTService,
    private authRepository: AuthRepository,
  ) {}

  signIn(identity: IdentityPayload): AuthTokenResponse {
    return {
      token: this.jwtService.createToken({
        identityId: identity.getId(),
        roles: identity.getRoles(),
      }),
    };
  }

  async signUp(signUpDto: SignUpDto): Promise<AuthTokenResponse> {
    const { email, password } = signUpDto;

    const existingIdentity = await this.authRepository.getByEmail(
      email.toLowerCase(),
    );
    if (existingIdentity) {
      throw new EmailTakenException(email);
    }

    const encryptedPassword = await this.passwordService.hashPassword(password);

    try {
      const identityId = await this.authRepository.insertUser(
        email,
        encryptedPassword,
      );

      return {
        token: this.jwtService.createToken({
          identityId,
          roles: ['USER'],
        }),
      };
    } catch (err) {
      this.logger.error(err);
      throw new ApiException(500, 'Something went wrong');
    }
  }

  async validate(email: Email, password: string) {
    const identity = await this.authRepository.getByEmail(email);
    if (!identity) {
      throw new InvalidCredentialsException();
    }

    const isValidPassword = await this.passwordService.comparePasswords(
      password,
      identity.getPassword(),
    );
    if (!isValidPassword) {
      throw new InvalidCredentialsException();
    }

    return {
      identityId: identity.getId(),
      roles: identity.getRoles(),
    };
  }
}
