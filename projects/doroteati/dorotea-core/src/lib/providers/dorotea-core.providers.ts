import { Provider } from '@angular/core';
import {
  DOROTEA_CORE_PROVIDER,
  DOROTEA_GOOGLE_STORAGE_CONFIG,
  DoroteaGoogleStorageConfig,
} from '../tokens/dorotea-core.tokens';
import { DoroteaCoreConfig } from '../entities/dorotea-core-config';

// ==================== PROVIDERS PARA APP CONFIG ====================

/**
 * Configura Dorotea Core con los valores proporcionados
 */
export function provideDoroteaCore(config: DoroteaCoreConfig): Provider {
  return {
    provide: DOROTEA_CORE_PROVIDER,
    useValue: config,
  };
}

/**
 * Configura Google Storage para Dorotea
 */
export function provideDoroteaGoogleStorage(
  config: DoroteaGoogleStorageConfig
): Provider {
  return {
    provide: DOROTEA_GOOGLE_STORAGE_CONFIG,
    useValue: config,
  };
}

/**
 * Configuración completa de Dorotea (Core + Google Storage)
 */
export function provideDoroteaComplete(
  coreConfig: DoroteaCoreConfig,
  storageConfig: DoroteaGoogleStorageConfig
): Provider[] {
  return [
    provideDoroteaCore(coreConfig),
    provideDoroteaGoogleStorage(storageConfig),
  ];
}

// ==================== PROVIDERS DE COMPATIBILIDAD ====================

/**
 * Para aplicaciones que migren desde MiaCore
 */
export function provideMiaCore(config: DoroteaCoreConfig): Provider {
  return provideDoroteaCore(config);
}

/**
 * Para aplicaciones que migren desde MiaGoogleStorage
 */
export function provideMiaGoogleStorage(
  config: DoroteaGoogleStorageConfig
): Provider {
  return provideDoroteaGoogleStorage(config);
}
