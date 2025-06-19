import { Email } from 'src/shared/entities/email';
import { ApiException } from 'src/shared/errors/api-error';

import { UserRoles } from './user-roles';

export class EmailTakenException extends ApiException {
  constructor(email: Email) {
    super(409, `Email: ${email} already taken`);
  }
}

export class IdentityNotFoundException extends ApiException {
  constructor() {
    super(404, `Identity not found`);
  }
}

export class InvalidCredentialsException extends ApiException {
  constructor() {
    super(401, `Invalid credentials`);
  }
}

export class MissingIdentityPayload extends ApiException {
  constructor() {
    super(403, `Missing identity payload`);
  }
}

export class MissingPermissionsException extends ApiException {
  constructor(expected: UserRoles, current: UserRoles) {
    super(
      403,
      `Missing required permissions. Expected: ${expected.join(', ')}, received: ${current.join(', ')}`,
    );
  }
}
