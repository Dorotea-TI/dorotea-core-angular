import { InjectionToken } from '@angular/core';
import { DoroteaStorageConfig } from '../interfaces/storage-config.interface';

export const DOROTEA_GOOGLE_STORAGE_CONFIG =
  new InjectionToken<DoroteaStorageConfig>('DOROTEA_GOOGLE_STORAGE_CONFIG');
