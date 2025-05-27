export interface PasswordConfig {
  minLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireDigit?: boolean;
  requireSpecialChar?: boolean;
  specialChars?: string;
}

export interface EmailConfig {
  allowSubdomains?: boolean;
  allowInternational?: boolean;
}

export interface PhoneConfig {
  country?: 'CO' | 'US' | 'INTERNATIONAL';
  allowExtensions?: boolean;
}
