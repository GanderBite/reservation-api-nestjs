import { Email } from 'src/shared/entities/email';
import { Id } from 'src/shared/entities/id';

import { UserRoles } from './user-roles';

export class Identity {
  constructor(
    private id: Id,
    private email: Email,
    private password: string,
    private roles: UserRoles,
  ) {}

  getEmail(): Email {
    return this.email;
  }

  getId() {
    return this.id;
  }

  getPassword() {
    return this.password;
  }

  getRoles() {
    return this.roles;
  }
}
