import { DoroteaError } from './dorotea-error';

export class DoroteaResponse<T> {
  public success: boolean = false;
  public error?: DoroteaError;
  public response?: T;
}
