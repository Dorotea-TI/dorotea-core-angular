import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, catchError } from 'rxjs';
import {
  DOROTEA_CORE_PROVIDER,
  DoroteaCoreConfig,
} from '../tokens/dorotea-tokens';
import { DoroteaResponse } from '../entities/dorotea-response';

@Injectable({
  providedIn: 'root',
})
export class DoroteaBaseHttpService {
  protected http = inject(HttpClient);
  protected config = inject<DoroteaCoreConfig>(DOROTEA_CORE_PROVIDER);

  /**
   * Petición POST
   */
  public post<T>(url: string, params: any): Observable<any> {
    if (this.config.v2) {
      return this.http.post<T>(url, params);
    }

    return this.http.post<DoroteaResponse<T>>(url, params).pipe(
      map((result) => {
        if (result.success) {
          return result.response!;
        }
        throw result.error;
      }),
      catchError((err) => {
        console.log('Dorotea Core Error - URL: ' + url);
        console.log('Dorotea Core Error - Params: ', params);
        throw err;
      })
    );
  }

  /**
   * Petición POST Observable (compatibilidad)
   */
  public postOb<T>(url: string, params: any): Observable<any> {
    return this.post<T>(url, params);
  }

  /**
   * Petición GET
   */
  public get<T>(url: string): Observable<any> {
    if (this.config.v2) {
      return this.http.get<T>(url);
    }

    return this.http.get<DoroteaResponse<T>>(url).pipe(
      map((result) => {
        if (result.success) {
          return result.response!;
        }
        throw result.error;
      }),
      catchError((err) => {
        console.log('Dorotea Core Error - URL: ' + url);
        console.log('Dorotea Core Error - Params: None');
        throw err;
      })
    );
  }

  /**
   * Petición GET Observable (compatibilidad)
   */
  public getOb<T>(url: string): Observable<any> {
    return this.get<T>(url);
  }

  /**
   * Petición PUT
   */
  public put<T>(url: string, params: any): Observable<any> {
    if (this.config.v2) {
      return this.http.put<T>(url, params);
    }

    return this.http.put<DoroteaResponse<T>>(url, params).pipe(
      map((result) => {
        if (result.success) {
          return result.response!;
        }
        throw result.error;
      }),
      catchError((err) => {
        console.log('Dorotea Core Error - URL: ' + url);
        console.log('Dorotea Core Error - Params: ', params);
        throw err;
      })
    );
  }

  /**
   * Petición PATCH
   */
  public patch<T>(url: string, params: any): Observable<any> {
    if (this.config.v2) {
      return this.http.patch<T>(url, params);
    }

    return this.http.patch<DoroteaResponse<T>>(url, params).pipe(
      map((result) => {
        if (result.success) {
          return result.response!;
        }
        throw result.error;
      }),
      catchError((err) => {
        console.log('Dorotea Core Error - URL: ' + url);
        console.log('Dorotea Core Error - Params: ', params);
        throw err;
      })
    );
  }

  /**
   * Petición DELETE
   */
  public delete<T>(url: string): Observable<any> {
    if (this.config.v2) {
      return this.http.delete<T>(url);
    }

    return this.http.delete<DoroteaResponse<T>>(url).pipe(
      map((result) => {
        if (result.success) {
          return result.response!;
        }
        throw result.error;
      }),
      catchError((err) => {
        console.log('Dorotea Core Error - URL: ' + url);
        console.log('Dorotea Core Error - Params: None');
        throw err;
      })
    );
  }

  /**
   * Petición DELETE Observable (compatibilidad)
   */
  public deleteOb<T>(url: string): Observable<any> {
    return this.delete<T>(url);
  }
}
