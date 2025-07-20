import { InjectionToken } from '@angular/core';
import { DoroteaCoreConfig } from '../entities/dorotea-core-config';
import { DoroteaStorageConfig } from '../interfaces/storage-config.interface';

// Token para la configuración principal de Dorotea Core
export const DOROTEA_CORE_PROVIDER = new InjectionToken<DoroteaCoreConfig>(
  'DOROTEA_CORE_PROVIDER'
);

// Token para la configuración de Google Storage
export const DOROTEA_GOOGLE_STORAGE_CONFIG =
  new InjectionToken<DoroteaGoogleStorageConfig>(
    'DOROTEA_GOOGLE_STORAGE_CONFIG'
  );

// Re-exportar tipos para facilitar el uso
export type { DoroteaCoreConfig };
export type DoroteaGoogleStorageConfig = DoroteaStorageConfig;
