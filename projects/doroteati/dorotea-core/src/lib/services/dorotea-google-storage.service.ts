import { Injectable, inject, signal, computed } from '@angular/core';
import {
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap, filter } from 'rxjs/operators';
import { STORAGE_ENDPOINTS } from '../constants/storage.constants';
import { DoroteaFile } from '../entities/dorotea-file';
import { DoroteaResponse } from '../entities/dorotea-response';
import {
  DoroteaUploadProgress,
  DoroteaUploadOptions,
} from '../interfaces/storage-config.interface';
import { DOROTEA_GOOGLE_STORAGE_CONFIG } from '../tokens/dorotea-tokens';
import { StorageUtils } from '../utils/storage.utils';

@Injectable({
  providedIn: 'root',
})
export class DoroteaGoogleStorageService {
  private http = inject(HttpClient);
  private config = inject(DOROTEA_GOOGLE_STORAGE_CONFIG);

  // Signals para estado reactivo
  private uploadsInProgress = signal<Map<string, DoroteaUploadProgress>>(
    new Map()
  );
  private uploadHistory = signal<DoroteaFile[]>([]);

  // Computed signals
  readonly activeUploads = computed(() =>
    Array.from(this.uploadsInProgress().values())
  );
  readonly totalActiveUploads = computed(() => this.uploadsInProgress().size);
  readonly uploadHistoryList = computed(() => this.uploadHistory());

  constructor() {
    if (!this.config?.bucket) {
      console.warn('DoroteaGoogleStorageService: No bucket configured');
    }
  }

  /**
   * Sube un archivo y retorna la respuesta completa de Google Storage
   */
  uploadFile(file: File, options: DoroteaUploadOptions = {}): Observable<any> {
    const fileName = StorageUtils.generateFileName(file.name, options);
    const url = this.buildUploadUrl(fileName);

    return this.http
      .post<any>(url, file, {
        headers: this.buildHeaders(file, options),
      })
      .pipe(catchError((error) => this.handleError(error, 'uploadFile')));
  }

  /**
   * Sube un archivo y retorna una respuesta normalizada con DoroteaFile
   */
  uploadDirect(
    file: File,
    options: DoroteaUploadOptions = {}
  ): Observable<DoroteaResponse<DoroteaFile>> {
    // Validar archivo
    const validationError = StorageUtils.validateFile(file);
    if (validationError) {
      return throwError(() => ({
        success: false,
        error: { code: 400, message: validationError },
      }));
    }

    const fileName = StorageUtils.generateFileName(file.name, options);
    const url = this.buildUploadUrl(fileName);

    return this.http
      .post<any>(url, file, {
        headers: this.buildHeaders(file, options),
      })
      .pipe(
        map((response) => this.transformToDoroteaResponse(response, file)),
        tap((result) => {
          if (result.success && result.response) {
            this.addToHistory(result.response);
          }
        }),
        catchError((error) => this.handleError(error, 'uploadDirect'))
      );
  }

  /**
   * Sube un archivo con progreso de subida
   */
  uploadWithProgress(
    file: File,
    options: DoroteaUploadOptions = {}
  ): Observable<DoroteaUploadProgress | DoroteaResponse<DoroteaFile>> {
    const fileName = StorageUtils.generateFileName(file.name, options);
    const url = this.buildUploadUrl(fileName);
    const uploadId = `${file.name}_${Date.now()}`;

    const request = new HttpRequest('POST', url, file, {
      headers: this.buildHeaders(file, options),
      reportProgress: true,
    });

    return this.http.request(request).pipe(
      map((event) => this.handleUploadEvent(event, file, uploadId)),
      filter(
        (
          result
        ): result is DoroteaUploadProgress | DoroteaResponse<DoroteaFile> =>
          result !== null
      ),
      tap((result) => {
        if ('success' in result && result.success && result.response) {
          this.addToHistory(result.response);
          this.removeFromProgress(uploadId);
        }
      }),
      catchError((error) => {
        this.removeFromProgress(uploadId);
        return this.handleError(error, 'uploadWithProgress');
      })
    );
  }

  /**
   * Sube múltiples archivos
   */
  uploadMultiple(
    files: File[],
    options: DoroteaUploadOptions = {}
  ): Observable<DoroteaResponse<DoroteaFile>[]> {
    const uploads = files.map((file) => this.uploadDirect(file, options));

    return new Observable((subscriber) => {
      const results: DoroteaResponse<DoroteaFile>[] = [];
      let completed = 0;

      uploads.forEach((upload, index) => {
        upload.subscribe({
          next: (result) => {
            results[index] = result;
            completed++;
            if (completed === files.length) {
              subscriber.next(results);
              subscriber.complete();
            }
          },
          error: (error) => {
            results[index] = {
              success: false,
              error: { code: 500, message: error.message || 'Upload failed' },
            };
            completed++;
            if (completed === files.length) {
              subscriber.next(results);
              subscriber.complete();
            }
          },
        });
      });
    });
  }

  /**
   * Elimina un archivo del storage
   */
  deleteFile(fileName: string): Observable<boolean> {
    const url = `${STORAGE_ENDPOINTS.API}/${
      this.config.bucket
    }/o/${encodeURIComponent(fileName)}`;

    return this.http.delete(url).pipe(
      map(() => {
        this.removeFromHistory(fileName);
        return true;
      }),
      catchError((error) => {
        console.error('Error deleting file:', error);
        return throwError(() => false);
      })
    );
  }

  /**
   * Genera URL pública para un archivo
   */
  getPublicUrl(fileName: string): string {
    return `${STORAGE_ENDPOINTS.PUBLIC}/${this.config.bucket}/${fileName}`;
  }

  /**
   * Limpia el historial de uploads
   */
  clearHistory(): void {
    this.uploadHistory.set([]);
  }

  /**
   * Cancela todas las subidas en progreso
   */
  cancelAllUploads(): void {
    this.uploadsInProgress.set(new Map());
  }

  // ==================== MÉTODOS PRIVADOS ====================

  private buildUploadUrl(fileName: string): string {
    return `${STORAGE_ENDPOINTS.UPLOAD}/${
      this.config.bucket
    }/o?uploadType=media&name=${encodeURIComponent(fileName)}`;
  }

  private buildHeaders(file: File, options: DoroteaUploadOptions): HttpHeaders {
    let headers = new HttpHeaders();

    // Content-Type
    headers = headers.set(
      'Content-Type',
      options.contentType || file.type || 'application/octet-stream'
    );

    // Cache-Control
    if (options.cacheControl) {
      headers = headers.set('Cache-Control', options.cacheControl);
    }

    return headers;
  }

  private transformToDoroteaResponse(
    response: any,
    originalFile: File
  ): DoroteaResponse<DoroteaFile> {
    return {
      success: true,
      response: {
        name: originalFile.name,
        url: this.getPublicUrl(response.name),
        mediaLink: this.getPublicUrl(response.name),
        size: response.size || originalFile.size,
        contentType: response.contentType || originalFile.type,
        etag: response.etag,
        bucket: response.bucket,
        generation: response.generation,
        timeCreated: response.timeCreated,
        updated: response.updated,
      },
    };
  }

  private handleUploadEvent(
    event: HttpEvent<any>,
    file: File,
    uploadId: string
  ): DoroteaUploadProgress | DoroteaResponse<DoroteaFile> | null {
    switch (event.type) {
      case HttpEventType.UploadProgress:
        if (event.total) {
          const progress: DoroteaUploadProgress = {
            loaded: event.loaded,
            total: event.total,
            percentage: Math.round((100 * event.loaded) / event.total),
            file,
          };
          this.updateProgress(uploadId, progress);
          return progress;
        }
        break;

      case HttpEventType.Response:
        if (event.body) {
          return this.transformToDoroteaResponse(event.body, file);
        }
        break;
    }

    return null;
  }

  private updateProgress(
    uploadId: string,
    progress: DoroteaUploadProgress
  ): void {
    const current = this.uploadsInProgress();
    current.set(uploadId, progress);
    this.uploadsInProgress.set(new Map(current));
  }

  private removeFromProgress(uploadId: string): void {
    const current = this.uploadsInProgress();
    current.delete(uploadId);
    this.uploadsInProgress.set(new Map(current));
  }

  private addToHistory(file: DoroteaFile): void {
    const current = this.uploadHistory();
    this.uploadHistory.set([file, ...current]);
  }

  private removeFromHistory(fileName: string): void {
    const current = this.uploadHistory();
    this.uploadHistory.set(
      current.filter((file) => !file.url.includes(fileName))
    );
  }

  private handleError(error: any, operation: string): Observable<never> {
    console.error(`${operation} failed:`, error);

    const doroteaError: DoroteaResponse<any> = {
      success: false,
      error: {
        code: error.status || 500,
        message: error.message || `Error en ${operation}`,
        details: error,
      },
    };

    return throwError(() => doroteaError);
  }
}
