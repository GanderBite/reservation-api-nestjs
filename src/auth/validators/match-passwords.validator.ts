import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

// Custom validator to check if password and confirmPassword match
@ValidatorConstraint({ name: 'MatchPasswords', async: false })
export class MatchPasswordsConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const object = args.object as { password: string };
    return confirmPassword === object.password;
  }

  defaultMessage() {
    return 'Passwords do not match';
  }
}
