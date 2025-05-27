import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralValidationService {
  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  isValidCreditCard(cardNumber: string): boolean {
    const cleanNumber = cardNumber.replace(/\D/g, '');

    if (cleanNumber.length < 13 || cleanNumber.length > 19) {
      return false;
    }

    return this.validateLuhnAlgorithm(cleanNumber);
  }

  calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  private validateLuhnAlgorithm(cardNumber: string): boolean {
    let sum = 0;
    let isEven = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }
}
