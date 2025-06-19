import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Id } from 'src/shared/entities/id';
import { UserRoles } from '../entities/user-roles';
import { IdentityPayload } from '../entities/identity-payload';

export type IdentityReq = { identityId: Id; roles: UserRoles };

export const Identity = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request: { user: IdentityReq } = ctx.switchToHttp().getRequest();

    return new IdentityPayload(request.user.identityId, request.user.roles);
  },
);
