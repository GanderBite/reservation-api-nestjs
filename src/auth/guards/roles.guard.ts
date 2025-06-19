import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  mixin,
  Type,
} from '@nestjs/common';

import { IdentityFromRequest } from '../decorators/identity.decorator';
import {
  MissingIdentityPayload,
  MissingPermissionsException,
} from '../entities/errors';
import { UserRoles } from '../entities/user-roles';

export function RolesGuard(...allowedRoles: UserRoles): Type<CanActivate> {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request: { user: IdentityFromRequest } = context
        .switchToHttp()
        .getRequest();
      const user = request.user;

      if (!user || !user.roles) {
        throw new MissingIdentityPayload();
      }

      const rolesSet = new Set(allowedRoles);

      const hasRole = user.roles.some((role) => rolesSet.has(role));

      if (!hasRole) {
        throw new MissingPermissionsException(allowedRoles, user.roles);
      }

      return true;
    }
  }

  return mixin(RoleGuardMixin);
}
