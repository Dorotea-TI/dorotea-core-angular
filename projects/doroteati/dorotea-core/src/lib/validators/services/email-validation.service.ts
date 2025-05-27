import { Injectable } from '@angular/core';
import { VALIDATION_REGEX } from '../constants/validation-regex.constants';

@Injectable({
  providedIn: 'root',
})
export class EmailValidationService {
  isValidEmail(email: string): boolean {
    return VALIDATION_REGEX.EMAIL.test(email);
  }

  isDomainAllowed(email: string, allowedDomains: string[]): boolean {
    const domain = email.split('@')[1]?.toLowerCase();
    return domain
      ? allowedDomains.map((d) => d.toLowerCase()).includes(domain)
      : false;
  }
}
