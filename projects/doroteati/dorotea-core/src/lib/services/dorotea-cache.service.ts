import { Injectable, signal, computed } from '@angular/core';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiration: number;
}

@Injectable({
  providedIn: 'root',
})
export class DoroteaCacheService {
  private cache = signal<Map<string, CacheEntry<any>>>(new Map());

  // Computed para estadísticas del cache
  readonly cacheSize = computed(() => this.cache().size);
  readonly cacheKeys = computed(() => Array.from(this.cache().keys()));

  set<T>(key: string, data: T, expiration: number = 300000): void {
    // 5 min default
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      expiration,
    };

    const current = this.cache();
    current.set(key, entry);
    this.cache.set(new Map(current));
  }

  get<T>(key: string): T | null {
    const current = this.cache();
    const entry = current.get(key);

    if (!entry) {
      return null;
    }

    // Verificar si expiró
    if (Date.now() - entry.timestamp > entry.expiration) {
      this.delete(key);
      return null;
    }

    return entry.data as T;
  }

  delete(key: string): void {
    const current = this.cache();
    current.delete(key);
    this.cache.set(new Map(current));
  }

  clear(): void {
    this.cache.set(new Map());
  }

  has(key: string): boolean {
    const entry = this.cache().get(key);
    if (!entry) return false;

    // Verificar si expiró
    if (Date.now() - entry.timestamp > entry.expiration) {
      this.delete(key);
      return false;
    }

    return true;
  }

  generateKey(baseUrl: string, method: string, params?: any): string {
    const paramsStr = params ? JSON.stringify(params) : '';
    return `${baseUrl}_${method}_${btoa(paramsStr)}`;
  }
}
