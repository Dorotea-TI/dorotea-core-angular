import {
  PasswordConfig,
  EmailConfig,
  PhoneConfig,
} from '../interfaces/validation-config.interface';

export const DEFAULT_PASSWORD_CONFIG: Required<PasswordConfig> = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: false,
  requireDigit: true,
  requireSpecialChar: false,
  specialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?',
} as const;

export const DEFAULT_EMAIL_CONFIG: Required<EmailConfig> = {
  allowSubdomains: true,
  allowInternational: true,
} as const;

export const DEFAULT_PHONE_CONFIG: Required<PhoneConfig> = {
  country: 'CO',
  allowExtensions: false,
} as const;
