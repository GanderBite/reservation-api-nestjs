import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Id } from 'src/shared/entities/id';

import { IdentityPayload } from '../entities/identity-payload';
import { UserRoles } from '../entities/user-roles';

export type IdentityFromRequest = { identityId: Id; roles: UserRoles };

export const Identity = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request: { user: IdentityFromRequest } = ctx
      .switchToHttp()
      .getRequest();
    return new IdentityPayload(request.user.identityId, request.user.roles);
  },
);
