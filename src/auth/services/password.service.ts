import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private readonly saltRounds = 10;

  async comparePasswords(password: string, encryptedPassword: string) {
    return bcrypt.compare(password, encryptedPassword);
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, this.saltRounds);
  }
}
