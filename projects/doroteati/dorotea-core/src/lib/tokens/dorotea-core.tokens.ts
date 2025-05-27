import { InjectionToken } from '@angular/core';
import { DoroteaCoreConfig } from '../entities/dorotea-core-config';

// ==================== TOKENS PRINCIPALES ====================

/**
 * Token para la configuración principal de Dorotea Core
 */
export const DOROTEA_CORE_PROVIDER = new InjectionToken<DoroteaCoreConfig>(
  'DOROTEA_CORE_PROVIDER',
  {
    providedIn: 'root',
    factory: () => ({
      baseUrl: '',
      v2: false,
      lang: 'en',
    }),
  }
);

/**
 * Token para la configuración de Google Storage
 */
export interface DoroteaGoogleStorageConfig {
  bucket: string;
  projectId?: string;
  region?: string;
}

export const DOROTEA_GOOGLE_STORAGE_CONFIG =
  new InjectionToken<DoroteaGoogleStorageConfig>(
    'DOROTEA_GOOGLE_STORAGE_CONFIG'
  );

// ==================== COMPATIBILIDAD LEGACY ====================
export { DOROTEA_CORE_PROVIDER as MIA_CORE_PROVIDER };
export { DOROTEA_GOOGLE_STORAGE_CONFIG as MIA_GOOGLE_STORAGE_PROVIDER };
