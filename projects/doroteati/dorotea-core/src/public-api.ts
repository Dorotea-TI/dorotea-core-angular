/*
 * Public API Surface of @doroteati/dorotea-core
 * Librería Angular 19 - Standalone Components
 */

// ==================== TOKENS CENTRALIZADOS ====================
export * from './lib/tokens/dorotea-tokens';

// ==================== ENTITIES ====================
export * from './lib/entities/dorotea-core-config';
export * from './lib/entities/dorotea-data-result';
export * from './lib/entities/dorotea-error';
export * from './lib/entities/dorotea-file';
export * from './lib/entities/dorotea-interaction';
export * from './lib/entities/dorotea-model';
export * from './lib/entities/dorotea-pagination';
export * from './lib/entities/dorotea-query';
export * from './lib/entities/dorotea-response';
export * from './lib/entities/dorotea-confirm-modal-config';

// ==================== SERVICES ====================
export * from './lib/services/dorotea-base-http.service';
export * from './lib/services/dorotea-base-crud-http.service';
export * from './lib/services/dorotea-cache.service';
export * from './lib/services/dorotea-data-result.service';
export * from './lib/services/dorotea-google-storage.service';
export * from './lib/services/dorotea-logger.service';

// ==================== COMPONENTS (STANDALONE) ====================
export * from './lib/modals/dorotea-confirm-modal/dorotea-confirm-modal.component';

// ==================== DIRECTIVES (STANDALONE) ====================
export * from './lib/directives/file-google.directive';
export * from './lib/directives/file-drag-and-drop.directive';

// ==================== VALIDATORS CON TODA SU ESTRUCTURA ====================
export * from './lib/validators/dorotea-validators';
export * from './lib/validators/interfaces/validation-config.interface';
export * from './lib/validators/interfaces/validation-errors.interface';
export * from './lib/validators/constants/validation-messages.constants';
export * from './lib/validators/constants/validation-regex.constants';
export * from './lib/validators/constants/validation-defaults.constants';
export * from './lib/validators/services/password-validation.service';
export * from './lib/validators/services/email-validation.service';
export * from './lib/validators/services/phone-validation.service';
export * from './lib/validators/services/general-validation.service';
export * from './lib/validators/services/validation-message.service';
export * from './lib/validators/validators/password.validators';
export * from './lib/validators/validators/email.validators';
export * from './lib/validators/validators/phone.validators';
export * from './lib/validators/validators/general.validators';

// ==================== RX OPERATORS ====================
export * from './lib/rx/dorotea-operator';

// ==================== HELPERS ====================
export * from './lib/helpers/bytes.helper';
export * from './lib/helpers/string.helper';

// ==================== INTERFACES ====================
export * from './lib/interfaces/crud-options.interface';
export * from './lib/interfaces/http-config.interface';
export * from './lib/interfaces/storage-config.interface';

// ==================== TYPES ====================
export * from './lib/types/crud.types';
export * from './lib/types/http.types';

// ==================== CONSTANTS ====================
export * from './lib/constants/storage.constants';

// ==================== UTILS ====================
export * from './lib/utils/storage.utils';

// ==================== PROVIDERS PARA CONFIGURACIÓN FÁCIL ====================
import { Provider } from '@angular/core';
import {
  DOROTEA_CORE_PROVIDER,
  DoroteaCoreConfig,
  DOROTEA_GOOGLE_STORAGE_CONFIG,
  DoroteaGoogleStorageConfig,
} from './lib/tokens/dorotea-tokens';

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

// ==================== COMPATIBILIDAD LEGACY ====================
// Para proyectos que migren desde MiaCore sin cambios

// Entities con alias legacy
export { DoroteaError as MiaError } from './lib/entities/dorotea-error';
export { DoroteaResponse as MiaResponse } from './lib/entities/dorotea-response';
export { DoroteaPagination as MiaPagination } from './lib/entities/dorotea-pagination';
export { DoroteaQuery as MiaQuery } from './lib/entities/dorotea-query';
export { DoroteaModel as MiaModel } from './lib/entities/dorotea-model';
export { DoroteaFile as MiaFile } from './lib/entities/dorotea-file';
export { DoroteaConfirmModalConfig as MiaConfirmModalConfig } from './lib/entities/dorotea-confirm-modal-config';
export { DoroteaDataResult as MiaDataResult } from './lib/entities/dorotea-data-result';
export { DoroteaCoreConfig as MiaCoreConfig } from './lib/entities/dorotea-core-config';
export { DoroteaInteraction as MiaInteraction } from './lib/entities/dorotea-interaction';

// Services con alias legacy
export { DoroteaDataResultService as MiaDataResultService } from './lib/services/dorotea-data-result.service';
export { DoroteaBaseHttpService as MiaBaseHttpService } from './lib/services/dorotea-base-http.service';
export { DoroteaBaseCrudHttpService as MiaBaseCrudHttpService } from './lib/services/dorotea-base-crud-http.service';
export { DoroteaGoogleStorageService as GoogleStorageService } from './lib/services/dorotea-google-storage.service';

// Components con alias legacy
export { DoroteaConfirmModalComponent as MiaConfirmModalComponent } from './lib/modals/dorotea-confirm-modal/dorotea-confirm-modal.component';

// Directives con alias legacy
export { DoroteaFileGoogleDirective as FileGoogleDirective } from './lib/directives/file-google.directive';
export { FileDragAndDropDirective } from './lib/directives/file-drag-and-drop.directive';

// Validators con alias legacy
export { DoroteaValidators as MiaValidators } from './lib/validators/dorotea-validators';

// Providers de compatibilidad
export function provideMiaCore(config: DoroteaCoreConfig): Provider {
  return provideDoroteaCore(config);
}

export function provideMiaGoogleStorage(
  config: DoroteaGoogleStorageConfig
): Provider {
  return provideDoroteaGoogleStorage(config);
}

// Operadores RX
export { nil, truly, defined, truthy } from './lib/rx/dorotea-operator';

// ==================== HELPERS ADICIONALES ====================
export { BytesHelper } from './lib/helpers/bytes.helper';
export { StringHelper } from './lib/helpers/string.helper';
export { StorageUtils } from './lib/utils/storage.utils';

// ==================== CLASES DE CONFIGURACIÓN LEGACY ====================
export class MiaGoogleStorage {
  bucket: string = '';
}
