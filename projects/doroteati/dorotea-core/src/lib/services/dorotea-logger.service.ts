import { Injectable, signal, computed } from '@angular/core';
import { DoroteaHttpMethod, DoroteaRequestLog } from '../types/http.types';

@Injectable({
  providedIn: 'root',
})
export class DoroteaLoggerService {
  private logs = signal<DoroteaRequestLog[]>([]);
  private enableLogs = signal<boolean>(true);
  private logLevel = signal<'info' | 'warn' | 'error'>('info');

  // Computed signals
  readonly allLogs = computed(() => this.logs());
  readonly errorLogs = computed(() =>
    this.logs().filter((log) => !log.success)
  );
  readonly successLogs = computed(() =>
    this.logs().filter((log) => log.success)
  );
  readonly logCount = computed(() => this.logs().length);

  log(logEntry: DoroteaRequestLog): void {
    if (!this.enableLogs()) return;

    const current = this.logs();
    // Mantener solo los últimos 100 logs
    const newLogs = [logEntry, ...current].slice(0, 100);
    this.logs.set(newLogs);

    // Console logging basado en nivel
    this.logToConsole(logEntry);
  }

  setLogLevel(level: 'info' | 'warn' | 'error'): void {
    this.logLevel.set(level);
  }

  enableLogging(enable: boolean): void {
    this.enableLogs.set(enable);
  }

  clearLogs(): void {
    this.logs.set([]);
  }

  getLogsByUrl(url: string): DoroteaRequestLog[] {
    return this.logs().filter((log) => log.url.includes(url));
  }

  getLogsByMethod(method: DoroteaHttpMethod): DoroteaRequestLog[] {
    return this.logs().filter((log) => log.method === method);
  }

  private logToConsole(logEntry: DoroteaRequestLog): void {
    const level = this.logLevel();
    const { method, url, success, duration, error } = logEntry;

    const message = `${method} ${url} - ${
      success ? 'SUCCESS' : 'ERROR'
    } (${duration}ms)`;

    if (
      !success &&
      (level === 'error' || level === 'warn' || level === 'info')
    ) {
      console.error('🔴 Dorotea HTTP Error:', message, error);
    } else if (success && level === 'info') {
      console.log('🟢 Dorotea HTTP Success:', message);
    }
  }
}
