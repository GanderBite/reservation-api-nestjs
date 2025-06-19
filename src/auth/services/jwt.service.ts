import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Id } from 'src/shared/entities/id';
import { UserRoles } from '../entities/user-roles';
import { IdentityPayload } from '../entities/identity-payload';

type Payload = { identityId: Id; roles: UserRoles };

@Injectable()
export class JWTService {
  constructor(private readonly jwtService: JwtService) {}

  createToken(payload: Payload) {
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string) {
    const payload = this.jwtService.verify<Payload>(token);

    return new IdentityPayload(payload.identityId, payload.roles);
  }
}
