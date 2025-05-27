// dorotea-base-crud-http.service.ts
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { DoroteaQuery } from '../entities/dorotea-query';
import { DoroteaPagination } from '../entities/dorotea-pagination';
import { DoroteaBaseHttpService } from './dorotea-base-http.service';

@Injectable({
  providedIn: 'root',
})
export class DoroteaBaseCrudHttpService<T> extends DoroteaBaseHttpService {
  basePathUrl = '';

  constructor() {
    super(); // El constructor padre ya maneja inject()
  }

  /**
   * Obtiene un elemento por ID
   */
  fetch(itemId: number): Observable<T> {
    return this.get(this.basePathUrl + '/fetch/' + itemId);
  }

  /**
   * Obtiene un elemento por ID (versión Observable)
   */
  fetchOb(itemId: number): Observable<T> {
    return this.getOb(this.basePathUrl + '/fetch/' + itemId);
  }

  /**
   * Obtiene un elemento con relaciones específicas
   */
  fetchWithRelation(itemId: number, withs: Array<string>): Observable<T> {
    return this.getOb(
      this.basePathUrl + '/fetch/' + itemId + '?withs=' + withs.join()
    );
  }

  /**
   * Guarda un elemento
   */
  save(item: T): Observable<T> {
    return this.post(this.basePathUrl + '/save', item);
  }

  /**
   * Guarda un elemento (versión Observable)
   */
  saveOb(item: T): Observable<T> {
    return this.postOb(this.basePathUrl + '/save', item);
  }

  /**
   * Lista elementos con query
   */
  list(query: DoroteaQuery): Observable<DoroteaPagination<T>> {
    return this.post(this.basePathUrl + '/list', query.toParams());
  }

  /**
   * Lista elementos (versión Observable)
   */
  listOb(query: DoroteaQuery): Observable<DoroteaPagination<T>> {
    return this.postOb(this.basePathUrl + '/list', query.toParams());
  }

  /**
   * Obtiene todos los elementos
   */
  all(): Observable<DoroteaPagination<T>> {
    return this.list(new DoroteaQuery());
  }

  /**
   * Obtiene todos los elementos (versión Observable)
   */
  allOb(): Observable<DoroteaPagination<T>> {
    return this.listOb(new DoroteaQuery());
  }

  /**
   * Lista con un filtro simple
   */
  listWithOneWhere(key: string, value: any): Observable<DoroteaPagination<T>> {
    const query = new DoroteaQuery();
    query.addWhere(key, value);
    return this.listOb(query);
  }

  /**
   * Lista con parámetros adicionales
   */
  listWithExtras(
    query: DoroteaQuery,
    moreParams: any
  ): Observable<DoroteaPagination<T>> {
    const data = { ...query.toParams(), ...moreParams };
    return this.post(this.basePathUrl + '/list', data);
  }

  /**
   * Lista con parámetros adicionales (versión Observable)
   */
  listObWithExtras(
    query: DoroteaQuery,
    moreParams: any
  ): Observable<DoroteaPagination<T>> {
    const data = { ...query.toParams(), ...moreParams };
    return this.postOb(this.basePathUrl + '/list', data);
  }

  /**
   * Elimina un elemento
   */
  remove(itemId: number): Observable<boolean> {
    return this.delete(this.basePathUrl + '/remove/' + itemId);
  }

  /**
   * Elimina un elemento (versión Observable)
   */
  removeOb(itemId: number): Observable<boolean> {
    return this.deleteOb(this.basePathUrl + '/remove/' + itemId);
  }

  // ==================== MÉTODOS ADICIONALES ====================

  /**
   * Actualiza un elemento (PUT)
   */
  update(itemId: number, item: T): Observable<T> {
    return this.put(this.basePathUrl + '/update/' + itemId, item);
  }

  /**
   * Actualiza parcialmente un elemento (PATCH)
   */
  updatePartial(itemId: number, data: Partial<T>): Observable<T> {
    return this.patch(this.basePathUrl + '/update/' + itemId, data);
  }

  /**
   * Verifica si existe un elemento
   */
  exists(itemId: number): Observable<boolean> {
    return this.get(this.basePathUrl + '/exists/' + itemId);
  }

  /**
   * Cuenta el total de elementos
   */
  count(query?: DoroteaQuery): Observable<number> {
    const countQuery = query || new DoroteaQuery();
    return this.post(this.basePathUrl + '/count', countQuery.toParams());
  }

  /**
   * Busca elementos por texto
   */
  search(searchTerm: string): Observable<DoroteaPagination<T>> {
    const query = new DoroteaQuery();
    query.setSearch(searchTerm);
    return this.list(query);
  }
}
