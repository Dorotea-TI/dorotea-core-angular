import { Injectable } from '@angular/core';

@Injectable()
export class DoroteaCoreConfig {
  baseUrl: string = '';
  v2?: boolean = false;
  lang?: string = 'en';
}
