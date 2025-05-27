export const VALIDATION_REGEX = {
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/,
  DIGIT: /\d/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  COLOMBIAN_PHONE_WITH_CODE: /^57[3][0-9]{9}$/,
  COLOMBIAN_PHONE_WITHOUT_CODE: /^[3][0-9]{9}$/,
  US_PHONE_WITH_CODE: /^1[2-9]\d{2}[2-9]\d{2}\d{4}$/,
  US_PHONE_WITHOUT_CODE: /^[2-9]\d{2}[2-9]\d{2}\d{4}$/,
} as const;
