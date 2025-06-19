import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Id } from 'src/shared/entities/id';

import { IdentityPayload } from '../entities/identity-payload';
import { UserRoles } from '../entities/user-roles';

export type Payload = { roles: UserRoles; sub: Id };

@Injectable()
export class JWTService {
  constructor(private readonly jwtService: JwtService) {}

  createToken(payload: Payload) {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string) {
    const payload = this.jwtService.verify<Payload>(token);

    return new IdentityPayload(payload.sub, payload.roles);
  }
}
