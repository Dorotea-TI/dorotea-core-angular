import { AbstractControl, ValidatorFn } from '@angular/forms';
import { inject } from '@angular/core';
import { GeneralValidationService } from '../services/general-validation.service';
import { DoroteaValidationErrors } from '../interfaces/validation-errors.interface';

export class GeneralValidators {
  static url(): ValidatorFn {
    const generalService = inject(GeneralValidationService);

    return (control: AbstractControl): DoroteaValidationErrors | null => {
      const url = control.value ?? '';

      if (!url) {
        return null;
      }

      if (!generalService.isValidUrl(url)) {
        return { invalidUrl: { value: url } };
      }

      return null;
    };
  }

  static creditCard(): ValidatorFn {
    const generalService = inject(GeneralValidationService);

    return (control: AbstractControl): DoroteaValidationErrors | null => {
      const cardNumber = control.value ?? '';

      if (!cardNumber) {
        return null;
      }

      if (!generalService.isValidCreditCard(cardNumber)) {
        return { invalidCreditCard: { value: cardNumber } };
      }

      return null;
    };
  }

  static minAge(minAge: number): ValidatorFn {
    const generalService = inject(GeneralValidationService);

    return (control: AbstractControl): DoroteaValidationErrors | null => {
      const birthDate = control.value;

      if (!birthDate) {
        return null;
      }

      const age = generalService.calculateAge(new Date(birthDate));

      if (age < minAge) {
        return {
          minAge: {
            value: birthDate,
            minAge,
          },
        };
      }

      return null;
    };
  }

  static maxAge(maxAge: number): ValidatorFn {
    const generalService = inject(GeneralValidationService);

    return (control: AbstractControl): DoroteaValidationErrors | null => {
      const birthDate = control.value;

      if (!birthDate) {
        return null;
      }

      const age = generalService.calculateAge(new Date(birthDate));

      if (age > maxAge) {
        return {
          maxAge: {
            value: birthDate,
            maxAge,
          },
        };
      }

      return null;
    };
  }

  static fileSize(maxSizeInMB: number): ValidatorFn {
    return (control: AbstractControl): DoroteaValidationErrors | null => {
      const file = control.value as File;

      if (!file) {
        return null;
      }

      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        return {
          fileSize: {
            value: file.size,
            maxSize: maxSizeInBytes,
          },
        };
      }

      return null;
    };
  }

  static fileType(allowedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): DoroteaValidationErrors | null => {
      const file = control.value as File;

      if (!file) {
        return null;
      }

      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (
        !fileExtension ||
        !allowedTypes.map((t) => t.toLowerCase()).includes(fileExtension)
      ) {
        return {
          fileType: {
            value: file.name,
            allowedTypes,
          },
        };
      }

      return null;
    };
  }
}
