export interface DoroteaStorageConfig {
  bucket: string;
  projectId?: string;
  region?: string;
  enableCors?: boolean;
}

export interface DoroteaUploadOptions {
  generateUniqueName?: boolean;
  prefix?: string;
  metadata?: Record<string, any>;
  cacheControl?: string;
  contentType?: string;
}

export interface DoroteaUploadProgress {
  loaded: number;
  total: number;
  percentage: number;
  file: File;
}
