export interface DoroteaFile {
  name: string;
  url: string;
  mediaLink: string;
  size: number;
  contentType?: string;
  etag?: string;
  bucket?: string;
  generation?: string;
  timeCreated?: string;
  updated?: string;
}

export interface DoroteaResponse<T> {
  success: boolean;
  response?: T;
  error?: DoroteaError;
}

export interface DoroteaError {
  code: number;
  message: string;
  details?: any;
}
