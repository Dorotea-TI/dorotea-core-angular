export interface DoroteaHttpConfig {
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
  enableLogs?: boolean;
  logLevel?: 'info' | 'warn' | 'error';
}

export interface DoroteaRequestOptions {
  timeout?: number;
  retryAttempts?: number;
  enableCache?: boolean;
  cacheExpiration?: number;
  showProgress?: boolean;
  skipErrorHandling?: boolean;
}
