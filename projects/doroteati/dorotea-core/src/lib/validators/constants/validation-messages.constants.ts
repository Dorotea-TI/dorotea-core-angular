export const VALIDATION_MESSAGES = {
  PASSWORD_SECURE_MIN: (minLength: number) =>
    `La contraseña debe tener al menos ${minLength} caracteres`,
  PASSWORD_SECURE_UPPERCASE:
    'La contraseña debe contener al menos una letra mayúscula',
  PASSWORD_SECURE_LOWERCASE:
    'La contraseña debe contener al menos una letra minúscula',
  PASSWORD_SECURE_DIGIT: 'La contraseña debe contener al menos un número',
  PASSWORD_SECURE_SPECIAL_CHAR: (allowedChars: string) =>
    `La contraseña debe contener al menos uno de estos caracteres especiales: ${allowedChars}`,
  PASSWORD_MISMATCH: 'Las contraseñas no coinciden',

  INVALID_EMAIL: 'El formato del email no es válido',
  EMAIL_DOMAIN_NOT_ALLOWED: (domains: string[]) =>
    `Solo se permiten emails de los dominios: ${domains.join(', ')}`,

  INVALID_PHONE: (country: string) =>
    `El formato del teléfono no es válido para ${country}`,

  INVALID_URL: 'El formato de la URL no es válido',
  INVALID_CREDIT_CARD: 'El número de tarjeta de crédito no es válido',

  MIN_AGE: (minAge: number) => `Debe ser mayor de ${minAge} años`,
  MAX_AGE: (maxAge: number) => `Debe ser menor de ${maxAge} años`,

  FILE_SIZE: (maxSizeMB: number) =>
    `El archivo es demasiado grande. Tamaño máximo: ${maxSizeMB}MB`,
  FILE_TYPE: (allowedTypes: string[]) =>
    `Tipo de archivo no permitido. Tipos permitidos: ${allowedTypes.join(
      ', '
    )}`,

  DEFAULT_ERROR: 'Campo inválido',
} as const;
