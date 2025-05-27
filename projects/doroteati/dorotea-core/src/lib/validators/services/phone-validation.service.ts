import { Injectable } from '@angular/core';
import { VALIDATION_REGEX } from '../constants/validation-regex.constants';

@Injectable({
  providedIn: 'root',
})
export class PhoneValidationService {
  isValidColombianPhone(phone: string): boolean {
    const cleanPhone = phone.replace(/\D/g, '');

    if (cleanPhone.startsWith('57')) {
      return VALIDATION_REGEX.COLOMBIAN_PHONE_WITH_CODE.test(cleanPhone);
    }

    return VALIDATION_REGEX.COLOMBIAN_PHONE_WITHOUT_CODE.test(cleanPhone);
  }

  isValidUSPhone(phone: string): boolean {
    const cleanPhone = phone.replace(/\D/g, '');

    if (cleanPhone.startsWith('1')) {
      return VALIDATION_REGEX.US_PHONE_WITH_CODE.test(cleanPhone);
    }

    return VALIDATION_REGEX.US_PHONE_WITHOUT_CODE.test(cleanPhone);
  }

  isValidInternationalPhone(phone: string): boolean {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 7 && cleanPhone.length <= 15;
  }
}
