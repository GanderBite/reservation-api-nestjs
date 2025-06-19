import { IsEmail, IsString, MinLength, Validate } from 'class-validator';
import { Email } from 'src/shared/entities/email';

import { MatchPasswordsConstraint } from './validators/match-passwords.validator';

export class SignUpDto {
  @IsString()
  @MinLength(6)
  @Validate(MatchPasswordsConstraint)
  confirmPassword: string;

  @IsEmail()
  email: Email;

  @IsString()
  @MinLength(6)
  password: string;
}
