export interface DoroteaCrudOptions {
  baseUrl?: string;
  version?: string;
  timeout?: number;
  retryAttempts?: number;
}

export interface DoroteaListOptions {
  useCache?: boolean;
  cacheExpiration?: number;
  includeMeta?: boolean;
}

export interface DoroteaFetchOptions {
  withs?: string[];
  fields?: string[];
  useCache?: boolean;
}

export interface DoroteaSaveOptions {
  validateBeforeSave?: boolean;
  showProgress?: boolean;
  successMessage?: string;
}
