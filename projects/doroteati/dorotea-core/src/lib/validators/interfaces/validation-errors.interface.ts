import { ValidationErrors } from '@angular/forms';

export interface DoroteaValidationErrors extends ValidationErrors {
  // Password errors
  passwordSecureMin?: { value: string; minLength: number };
  passwordSecureUppercase?: { value: string };
  passwordSecureLowercase?: { value: string };
  passwordSecureDigit?: { value: string };
  passwordSecureSpecialChar?: { value: string; allowedChars: string };

  // Email errors
  invalidEmail?: { value: string };
  emailDomainNotAllowed?: { value: string; allowedDomains: string[] };

  // Phone errors
  invalidPhone?: { value: string; country: string };

  // General errors
  invalidUrl?: { value: string };
  invalidCreditCard?: { value: string };
  passwordMismatch?: { password: string; confirmPassword: string };
  minAge?: { value: Date; minAge: number };
  maxAge?: { value: Date; maxAge: number };
  fileSize?: { value: number; maxSize: number };
  fileType?: { value: string; allowedTypes: string[] };
}
