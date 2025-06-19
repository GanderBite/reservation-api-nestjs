import { Id } from 'src/shared/entities/id';

import { UserRoles } from './user-roles';

export class IdentityPayload {
  constructor(
    private id: Id,
    private roles: UserRoles,
  ) {}

  getId() {
    return this.id;
  }

  getRoles() {
    return this.roles;
  }
}
