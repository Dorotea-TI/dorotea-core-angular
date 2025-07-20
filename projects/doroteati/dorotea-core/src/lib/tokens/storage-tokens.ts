import { InjectionToken } from '@angular/core';

// Solo la interface (si no está ya en el archivo principal)
export interface DoroteaStorageConfig {
  bucket: string;
  projectId?: string;
  region?: string;
  enableCors?: boolean;
}
