import { Injectable, signal, computed } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { DoroteaDataResult } from '../entities/dorotea-data-result';

@Injectable({
  providedIn: 'root',
})
export class DoroteaDataResultService {
  // Usar signal para estado reactivo
  private results = signal<{ [key: string]: DoroteaDataResult }>({});

  // Computed signals para estadísticas
  readonly totalResults = computed(() => Object.keys(this.results()).length);
  readonly searchingCount = computed(
    () =>
      Object.values(this.results()).filter(
        (r) => r.status === DoroteaDataResult.STATUS_SEARCHING
      ).length
  );
  readonly readyCount = computed(
    () =>
      Object.values(this.results()).filter(
        (r) => r.status === DoroteaDataResult.STATUS_READY
      ).length
  );
  readonly allKeys = computed(() => Object.keys(this.results()));

  constructor() {}

  /**
   * Ejecuta un Observable y cachea el resultado
   */
  execute<T>(key: string, obs: Observable<T>): Observable<T> {
    const current = this.results();
    let data = current[key];

    if (data === undefined) {
      // Crear nueva entrada
      const newResult: DoroteaDataResult = {
        key: key,
        status: DoroteaDataResult.STATUS_SEARCHING,
        obs: new Subject<T>(),
        timestamp: Date.now(),
      };

      // Actualizar el signal
      this.updateResult(key, newResult);

      // Ejecutar el observable
      obs
        .pipe(
          tap((result) => {
            // Actualizar cuando llegue el resultado
            const updatedResult = { ...newResult };
            updatedResult.status = DoroteaDataResult.STATUS_READY;
            updatedResult.items = result;
            updatedResult.result = result;

            this.updateResult(key, updatedResult);
            newResult.obs?.next(result);
            newResult.obs?.complete();
          }),
          catchError((error) => {
            // Manejar errores
            const errorResult = { ...newResult };
            errorResult.status = DoroteaDataResult.STATUS_READY;
            errorResult.error = error;

            this.updateResult(key, errorResult);
            newResult.obs?.error(error);

            return throwError(() => error);
          })
        )
        .subscribe();

      return newResult.obs!.asObservable();
    }

    // Si está buscando, devolver el observable existente
    if (data.status === DoroteaDataResult.STATUS_SEARCHING) {
      return data.obs!.asObservable();
    }

    // Si hay error, devolver error
    if (data.error) {
      return throwError(() => data.error);
    }

    // Si está listo, devolver el resultado
    return of(data.items);
  }

  /**
   * Ejecuta con configuración de timeout
   */
  executeWithTimeout<T>(
    key: string,
    obs: Observable<T>,
    timeoutMs: number = 30000
  ): Observable<T> {
    const timeoutObs = new Observable<T>((subscriber) => {
      const timeout = setTimeout(() => {
        const current = this.results();
        const data = current[key];
        if (data && data.status === DoroteaDataResult.STATUS_SEARCHING) {
          const timeoutResult = { ...data };
          timeoutResult.status = DoroteaDataResult.STATUS_READY;
          timeoutResult.error = new Error(`Timeout después de ${timeoutMs}ms`);

          this.updateResult(key, timeoutResult);
          subscriber.error(timeoutResult.error);
        }
      }, timeoutMs);

      const subscription = obs.subscribe({
        next: (value) => {
          clearTimeout(timeout);
          subscriber.next(value);
        },
        error: (error) => {
          clearTimeout(timeout);
          subscriber.error(error);
        },
        complete: () => {
          clearTimeout(timeout);
          subscriber.complete();
        },
      });

      return () => {
        clearTimeout(timeout);
        subscription.unsubscribe();
      };
    });

    return this.execute(key, timeoutObs);
  }

  /**
   * Verifica si existe un resultado para una clave
   */
  has(key: string): boolean {
    return key in this.results();
  }

  /**
   * Obtiene el estado de un resultado específico
   */
  getStatus(key: string): number {
    const current = this.results();
    return current[key]?.status ?? DoroteaDataResult.STATUS_PENDING;
  }

  /**
   * Obtiene un resultado específico (si está listo)
   */
  get<T>(key: string): T | null {
    const current = this.results();
    const data = current[key];

    if (data && data.status === DoroteaDataResult.STATUS_READY && !data.error) {
      return data.items as T;
    }

    return null;
  }

  /**
   * Verifica si un resultado está listo
   */
  isReady(key: string): boolean {
    return this.getStatus(key) === DoroteaDataResult.STATUS_READY;
  }

  /**
   * Verifica si un resultado está buscando
   */
  isSearching(key: string): boolean {
    return this.getStatus(key) === DoroteaDataResult.STATUS_SEARCHING;
  }

  /**
   * Verifica si un resultado tiene error
   */
  hasError(key: string): boolean {
    const current = this.results();
    return current[key]?.error !== undefined;
  }

  /**
   * Obtiene el error de un resultado
   */
  getError(key: string): any {
    const current = this.results();
    return current[key]?.error;
  }

  /**
   * Limpia un resultado específico
   */
  clear(key: string): void {
    const current = { ...this.results() };
    delete current[key];
    this.results.set(current);
  }

  /**
   * Limpia todos los resultados
   */
  clearAll(): void {
    this.results.set({});
  }

  /**
   * Limpia resultados antiguos (por defecto más de 1 hora)
   */
  clearOld(maxAgeMs: number = 3600000): void {
    const now = Date.now();
    const current = { ...this.results() };
    let hasChanges = false;

    for (const [key, result] of Object.entries(current)) {
      if (result.timestamp && now - result.timestamp > maxAgeMs) {
        delete current[key];
        hasChanges = true;
      }
    }

    if (hasChanges) {
      this.results.set(current);
    }
  }

  /**
   * Limpia solo los resultados con error
   */
  clearErrors(): void {
    const current = { ...this.results() };
    let hasChanges = false;

    for (const [key, result] of Object.entries(current)) {
      if (result.error) {
        delete current[key];
        hasChanges = true;
      }
    }

    if (hasChanges) {
      this.results.set(current);
    }
  }

  /**
   * Obtiene estadísticas del cache
   */
  getStats(): Observable<{
    total: number;
    searching: number;
    ready: number;
    errors: number;
  }> {
    const current = this.results();
    const values = Object.values(current);

    return of({
      total: values.length,
      searching: values.filter(
        (r) => r.status === DoroteaDataResult.STATUS_SEARCHING
      ).length,
      ready: values.filter(
        (r) => r.status === DoroteaDataResult.STATUS_READY && !r.error
      ).length,
      errors: values.filter((r) => r.error).length,
    });
  }

  /**
   * Lista todas las claves disponibles
   */
  getKeys(): string[] {
    return Object.keys(this.results());
  }

  /**
   * Obtiene todos los resultados listos
   */
  getAllReady<T>(): { [key: string]: T } {
    const current = this.results();
    const ready: { [key: string]: T } = {};

    for (const [key, result] of Object.entries(current)) {
      if (result.status === DoroteaDataResult.STATUS_READY && !result.error) {
        ready[key] = result.items as T;
      }
    }

    return ready;
  }

  // ==================== MÉTODOS PRIVADOS ====================

  private updateResult(key: string, result: DoroteaDataResult): void {
    const current = { ...this.results() };
    current[key] = result;
    this.results.set(current);
  }
}
