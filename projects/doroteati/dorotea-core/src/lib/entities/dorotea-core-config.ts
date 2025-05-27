import { Injectable, InjectionToken } from '@angular/core';

export const MIA_CORE_PROVIDER = new InjectionToken<DoroteaCoreConfig>(
  'doroteati.core'
);

@Injectable()
export class DoroteaCoreConfig {
  baseUrl: string = '';
  v2?: boolean = false;
  lang?: string = 'en';
}
