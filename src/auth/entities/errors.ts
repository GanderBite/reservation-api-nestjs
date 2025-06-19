import { Email } from 'src/shared/entities/email';
import { ApiException } from 'src/shared/errors/api-error';

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
