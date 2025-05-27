export * from './interfaces/validation-config.interface';
export * from './interfaces/validation-errors.interface';
export * from './constants/validation-messages.constants';
export * from './constants/validation-regex.constants';
export * from './constants/validation-defaults.constants';
export * from './services/password-validation.service';
export * from './services/email-validation.service';
export * from './services/phone-validation.service';
export * from './services/general-validation.service';
export * from './services/validation-message.service';
export * from './validators/password.validators';
export * from './validators/email.validators';
export * from './validators/phone.validators';
export * from './validators/general.validators';

// Importaciones para la clase principal
import { PasswordValidators } from './validators/password.validators';
import { EmailValidators } from './validators/email.validators';
import { PhoneValidators } from './validators/phone.validators';
import { GeneralValidators } from './validators/general.validators';
import { PasswordValidationService } from './services/password-validation.service';
import { EmailValidationService } from './services/email-validation.service';
import { ValidationMessageService } from './services/validation-message.service';
import { PasswordConfig } from './interfaces/validation-config.interface';
import { DoroteaValidationErrors } from './interfaces/validation-errors.interface';

// Clase principal para mantener compatibilidad
export class DoroteaValidators {
  // Password validators
  static passwordSecure = PasswordValidators.passwordSecure;
  static passwordMatch = PasswordValidators.passwordMatch;

  // Email validators
  static email = EmailValidators.email;
  static emailDomain = EmailValidators.emailDomain;

  // Phone validators
  static phoneNumber = PhoneValidators.phoneNumber;

  // General validators
  static url = GeneralValidators.url;
  static creditCard = GeneralValidators.creditCard;
  static minAge = GeneralValidators.minAge;
  static maxAge = GeneralValidators.maxAge;
  static fileSize = GeneralValidators.fileSize;
  static fileType = GeneralValidators.fileType;

  // Helper methods (delegating to services)
  static isSecurePassword(password: string, config: PasswordConfig = {}) {
    const service = new PasswordValidationService();
    return service.isSecurePassword(password, config);
  }

  static hasOneUppercase(password: string) {
    const service = new PasswordValidationService();
    return service.hasOneUppercase(password);
  }

  static hasOneLowercase(password: string) {
    const service = new PasswordValidationService();
    return service.hasOneLowercase(password);
  }

  static hasOneDigit(password: string) {
    const service = new PasswordValidationService();
    return service.hasOneDigit(password);
  }

  static isValidEmail(email: string) {
    const service = new EmailValidationService();
    return service.isValidEmail(email);
  }

  static getErrorMessage(error: DoroteaValidationErrors) {
    const service = new ValidationMessageService();
    return service.getErrorMessage(error);
  }
}
