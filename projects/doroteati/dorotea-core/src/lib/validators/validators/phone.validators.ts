import { AbstractControl, ValidatorFn } from '@angular/forms';
import { inject } from '@angular/core';
import { PhoneValidationService } from '../services/phone-validation.service';
import { PhoneConfig } from '../interfaces/validation-config.interface';
import { DoroteaValidationErrors } from '../interfaces/validation-errors.interface';
import { DEFAULT_PHONE_CONFIG } from '../constants/validation-defaults.constants';

export class PhoneValidators {
  static phoneNumber(config: PhoneConfig = {}): ValidatorFn {
    const finalConfig = { ...DEFAULT_PHONE_CONFIG, ...config };
    const phoneService = inject(PhoneValidationService);

    return (control: AbstractControl): DoroteaValidationErrors | null => {
      const phone = control.value ?? '';

      if (!phone) {
        return null;
      }

      let isValid = false;

      switch (finalConfig.country) {
        case 'CO':
          isValid = phoneService.isValidColombianPhone(phone);
          break;
        case 'US':
          isValid = phoneService.isValidUSPhone(phone);
          break;
        case 'INTERNATIONAL':
          isValid = phoneService.isValidInternationalPhone(phone);
          break;
        default:
          isValid = phoneService.isValidInternationalPhone(phone);
      }

      if (!isValid) {
        return {
          invalidPhone: {
            value: phone,
            country: finalConfig.country,
          },
        };
      }

      return null;
    };
  }
}
