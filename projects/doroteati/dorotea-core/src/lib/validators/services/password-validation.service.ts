import { Injectable } from '@angular/core';
import { PasswordConfig } from '../interfaces/validation-config.interface';
import { DEFAULT_PASSWORD_CONFIG } from '../constants/validation-defaults.constants';
import { VALIDATION_REGEX } from '../constants/validation-regex.constants';

@Injectable({
  providedIn: 'root',
})
export class PasswordValidationService {
  isSecurePassword(password: string, config: PasswordConfig = {}): boolean {
    const finalConfig = { ...DEFAULT_PASSWORD_CONFIG, ...config };

    if (password.length < finalConfig.minLength) {
      return false;
    }

    if (finalConfig.requireUppercase && !this.hasOneUppercase(password)) {
      return false;
    }

    if (finalConfig.requireLowercase && !this.hasOneLowercase(password)) {
      return false;
    }

    if (finalConfig.requireDigit && !this.hasOneDigit(password)) {
      return false;
    }

    if (
      finalConfig.requireSpecialChar &&
      !this.hasSpecialChar(password, finalConfig.specialChars)
    ) {
      return false;
    }

    return true;
  }

  hasOneUppercase(password: string): boolean {
    return VALIDATION_REGEX.UPPERCASE.test(password);
  }

  hasOneLowercase(password: string): boolean {
    return VALIDATION_REGEX.LOWERCASE.test(password);
  }

  hasOneDigit(password: string): boolean {
    return VALIDATION_REGEX.DIGIT.test(password);
  }

  hasSpecialChar(password: string, specialChars: string): boolean {
    const escaped = specialChars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`[${escaped}]`);
    return regex.test(password);
  }
}
