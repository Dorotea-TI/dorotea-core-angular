import { Injectable } from '@angular/core';
import { DoroteaValidationErrors } from '../interfaces/validation-errors.interface';
import { VALIDATION_MESSAGES } from '../constants/validation-messages.constants';

@Injectable({
  providedIn: 'root',
})
export class ValidationMessageService {
  getErrorMessage(error: DoroteaValidationErrors): string {
    // Password errors
    if (error.passwordSecureMin) {
      return VALIDATION_MESSAGES.PASSWORD_SECURE_MIN(
        error.passwordSecureMin.minLength
      );
    }

    if (error.passwordSecureUppercase) {
      return VALIDATION_MESSAGES.PASSWORD_SECURE_UPPERCASE;
    }

    if (error.passwordSecureLowercase) {
      return VALIDATION_MESSAGES.PASSWORD_SECURE_LOWERCASE;
    }

    if (error.passwordSecureDigit) {
      return VALIDATION_MESSAGES.PASSWORD_SECURE_DIGIT;
    }

    if (error.passwordSecureSpecialChar) {
      return VALIDATION_MESSAGES.PASSWORD_SECURE_SPECIAL_CHAR(
        error.passwordSecureSpecialChar.allowedChars
      );
    }

    if (error.passwordMismatch) {
      return VALIDATION_MESSAGES.PASSWORD_MISMATCH;
    }

    // Email errors
    if (error.invalidEmail) {
      return VALIDATION_MESSAGES.INVALID_EMAIL;
    }

    if (error.emailDomainNotAllowed) {
      return VALIDATION_MESSAGES.EMAIL_DOMAIN_NOT_ALLOWED(
        error.emailDomainNotAllowed.allowedDomains
      );
    }

    // Phone errors
    if (error.invalidPhone) {
      return VALIDATION_MESSAGES.INVALID_PHONE(error.invalidPhone.country);
    }

    // General errors
    if (error.invalidUrl) {
      return VALIDATION_MESSAGES.INVALID_URL;
    }

    if (error.invalidCreditCard) {
      return VALIDATION_MESSAGES.INVALID_CREDIT_CARD;
    }

    // Age errors
    if (error.minAge) {
      return VALIDATION_MESSAGES.MIN_AGE(error.minAge.minAge);
    }

    if (error.maxAge) {
      return VALIDATION_MESSAGES.MAX_AGE(error.maxAge.maxAge);
    }

    // File errors
    if (error.fileSize) {
      return VALIDATION_MESSAGES.FILE_SIZE(
        error.fileSize.maxSize / (1024 * 1024)
      );
    }

    if (error.fileType) {
      return VALIDATION_MESSAGES.FILE_TYPE(error.fileType.allowedTypes);
    }

    return VALIDATION_MESSAGES.DEFAULT_ERROR;
  }
}
