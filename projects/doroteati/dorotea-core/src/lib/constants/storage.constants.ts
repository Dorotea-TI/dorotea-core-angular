import { DoroteaUploadOptions } from '../interfaces/storage-config.interface';

export const STORAGE_ENDPOINTS = {
  UPLOAD: 'https://storage.googleapis.com/upload/storage/v1/b',
  API: 'https://storage.googleapis.com/storage/v1/b',
  PUBLIC: 'https://storage.googleapis.com',
} as const;

export const DEFAULT_UPLOAD_OPTIONS: Required<DoroteaUploadOptions> = {
  generateUniqueName: true,
  prefix: '',
  metadata: {},
  cacheControl: 'public, max-age=31536000',
  contentType: 'application/octet-stream',
} as const;

export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
] as const;

export const SUPPORTED_VIDEO_TYPES = [
  'video/mp4',
  'video/mpeg',
  'video/quicktime',
  'video/webm',
  'video/ogg',
] as const;
