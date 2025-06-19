import { Id } from 'src/shared/entities/id';
import { UserRoles } from '../entities/user-roles';

export type JWTPayload = {
  sub: Id;
  roles: UserRoles;
};
