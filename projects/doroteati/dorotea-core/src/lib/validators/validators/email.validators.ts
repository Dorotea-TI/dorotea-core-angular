import { AbstractControl, ValidatorFn } from '@angular/forms';
import { inject } from '@angular/core';
import { EmailValidationService } from '../services/email-validation.service';
import { EmailConfig } from '../interfaces/validation-config.interface';
import { DoroteaValidationErrors } from '../interfaces/validation-errors.interface';

export class EmailValidators {
  static email(config: EmailConfig = {}): ValidatorFn {
    const emailService = inject(EmailValidationService);

    return (control: AbstractControl): DoroteaValidationErrors | null => {
      const email = control.value ?? '';

      if (!email) {
        return null;
      }

      if (!emailService.isValidEmail(email)) {
        return { invalidEmail: { value: email } };
      }

      return null;
    };
  }

  static emailDomain(allowedDomains: string[]): ValidatorFn {
    const emailService = inject(EmailValidationService);

    return (control: AbstractControl): DoroteaValidationErrors | null => {
      const email = control.value ?? '';

      if (!email) {
        return null;
      }

      if (!emailService.isDomainAllowed(email, allowedDomains)) {
        return {
          emailDomainNotAllowed: {
            value: email,
            allowedDomains,
          },
        };
      }

      return null;
    };
  }
}
