import { inject } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { DEFAULT_PASSWORD_CONFIG } from '../constants/validation-defaults.constants';
import { PasswordConfig } from '../interfaces/validation-config.interface';
import { DoroteaValidationErrors } from '../interfaces/validation-errors.interface';
import { PasswordValidationService } from '../services/password-validation.service';

export class PasswordValidators {
  static passwordSecure(config: PasswordConfig = {}): ValidatorFn {
    const finalConfig = { ...DEFAULT_PASSWORD_CONFIG, ...config };
    const passwordService = inject(PasswordValidationService);

    return (control: AbstractControl): DoroteaValidationErrors | null => {
      const password = control.value ?? '';

      if (password.length < finalConfig.minLength) {
        return {
          passwordSecureMin: {
            value: control.value,
            minLength: finalConfig.minLength,
          },
        };
      }

      if (
        finalConfig.requireUppercase &&
        !passwordService.hasOneUppercase(password)
      ) {
        return { passwordSecureUppercase: { value: control.value } };
      }

      if (
        finalConfig.requireLowercase &&
        !passwordService.hasOneLowercase(password)
      ) {
        return { passwordSecureLowercase: { value: control.value } };
      }

      if (finalConfig.requireDigit && !passwordService.hasOneDigit(password)) {
        return { passwordSecureDigit: { value: control.value } };
      }

      if (
        finalConfig.requireSpecialChar &&
        !passwordService.hasSpecialChar(password, finalConfig.specialChars)
      ) {
        return {
          passwordSecureSpecialChar: {
            value: control.value,
            allowedChars: finalConfig.specialChars,
          },
        };
      }

      return null;
    };
  }

  static passwordMatch(
    passwordField: string,
    confirmPasswordField: string
  ): ValidatorFn {
    return (control: AbstractControl): DoroteaValidationErrors | null => {
      const password = control.get(passwordField)?.value;
      const confirmPassword = control.get(confirmPasswordField)?.value;

      if (password && confirmPassword && password !== confirmPassword) {
        return {
          passwordMismatch: {
            password,
            confirmPassword,
          },
        };
      }

      return null;
    };
  }
}
