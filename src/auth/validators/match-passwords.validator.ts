import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

// Custom validator to check if password and confirmPassword match
@ValidatorConstraint({ async: false, name: 'MatchPasswords' })
export class MatchPasswordsConstraint implements ValidatorConstraintInterface {
  defaultMessage() {
    return 'Passwords do not match';
  }

  validate(confirmPassword: string, args: ValidationArguments) {
    const object = args.object as { password: string };
    return confirmPassword === object.password;
  }
}
