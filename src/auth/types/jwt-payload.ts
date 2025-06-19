import { Id } from 'src/shared/entities/id';

import { UserRoles } from '../entities/user-roles';

export type JWTPayload = {
  roles: UserRoles;
  sub: Id;
};
