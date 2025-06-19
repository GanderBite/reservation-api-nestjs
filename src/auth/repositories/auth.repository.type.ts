import { Email } from 'src/shared/entities/email';
import { Id } from 'src/shared/entities/id';

import { Identity } from '../entities/identity';

export interface IAuthRepository {
  getByEmail(email: Email): Promise<Identity | null>;
  insertUser(email: Email, password: string): Promise<Id>;
}
