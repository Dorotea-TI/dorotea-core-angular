// dorotea-query.ts

/**
 * Tipos para mejorar la seguridad de tipos
 */
export type OrderDirection = 'asc' | 'desc';

export type WhereType =
  | 'date'
  | 'week'
  | 'month'
  | 'year'
  | 'raw'
  | 'between'
  | 'equal'
  | 'greater-than'
  | 'less-than'
  | 'in'
  | 'likes';

export interface DoroteaJoin {
  table: string;
  column: string;
  relation: string;
}

export interface DoroteaOrder {
  field: string;
  type: OrderDirection;
}

export interface DoroteaWhere {
  type: WhereType;
  key?: string;
  value?: any;
  from?: any;
  to?: any;
  query?: string;
  values?: any[];
  keys?: string[];
}

/**
 * @deprecated - Usar orders array en su lugar
 */
export interface DoroteaOrdType {
  title: string;
  asc: number;
}

export interface DoroteaQueryParams {
  page: number;
  where: string;
  wheres: DoroteaWhere[];
  joins: DoroteaJoin[];
  withs: string[];
  with: string[];
  search: string;
  orders: DoroteaOrder[];
  limit: number;
}

/**
 * Clase para construir queries complejas con filtros, paginación y ordenamiento
 */
export class DoroteaQuery {
  public pageCurrent: number = 1;
  public lastPage: number = 1;
  public itemPerPage: number = 50;

  public filters: Record<string, any> = {};
  public wheres: DoroteaWhere[] = [];
  public joins: DoroteaJoin[] = [];
  public withs: string[] = [];
  public search: string = '';

  /**
   * @deprecated - Usar addOrder, addOrderAsc, addOrderDesc en su lugar
   */
  public ordType: DoroteaOrdType = { title: '', asc: 1 };

  public orders: DoroteaOrder[] = [];

  // ========== MÉTODOS DE JOINS ==========

  /**
   * Agrega un join a la query
   */
  addJoin(table: string, column: string, relation: string): this {
    this.joins.push({ table, column, relation });
    return this;
  }

  /**
   * Remueve un join por índice
   */
  removeJoin(index: number): this {
    if (index >= 0 && index < this.joins.length) {
      this.joins.splice(index, 1);
    }
    return this;
  }

  /**
   * Limpia todos los joins
   */
  resetJoins(): this {
    this.joins = [];
    return this;
  }

  // ========== MÉTODOS DE WHERE POR FECHA ==========

  /**
   * Agrega filtro por fecha específica
   */
  addWhereDate(key: string, value: string): this {
    this.wheres.push({ type: 'date', key, value });
    return this;
  }

  /**
   * Remueve todos los filtros de fecha
   */
  removeWhereAllDate(): this {
    return this.removeWhereByType('date');
  }

  /**
   * Agrega filtro por semana (formato: 2020-01-01)
   */
  addWhereWeek(key: string, value: string): this {
    this.wheres.push({ type: 'week', key, value });
    return this;
  }

  /**
   * Remueve todos los filtros de semana
   */
  removeWhereAllWeek(): this {
    return this.removeWhereByType('week');
  }

  /**
   * Agrega filtro por mes
   */
  addWhereMonth(key: string, value: string): this {
    this.wheres.push({ type: 'month', key, value });
    return this;
  }

  /**
   * Remueve todos los filtros de mes
   */
  removeWhereAllMonth(): this {
    return this.removeWhereByType('month');
  }

  /**
   * Agrega filtro por año
   */
  addWhereYear(key: string, value: string): this {
    this.wheres.push({ type: 'year', key, value });
    return this;
  }

  /**
   * Remueve todos los filtros de año
   */
  removeWhereAllYear(): this {
    return this.removeWhereByType('year');
  }

  // ========== MÉTODOS DE WHERE GENERALES ==========

  /**
   * Agrega un WHERE raw con query personalizada
   */
  addWhereRaw(query: string, values: any[] = []): this {
    this.wheres.push({ type: 'raw', query, values });
    return this;
  }

  /**
   * Remueve todos los WHERE raw
   */
  removeWhereAllRaw(): this {
    return this.removeWhereByType('raw');
  }

  /**
   * Remueve todos los WHERE de un tipo específico
   */
  removeWhereByType(type: WhereType): this {
    this.wheres = this.wheres.filter((where) => where.type !== type);
    return this;
  }

  /**
   * Agrega filtro BETWEEN
   */
  addWhereBetween(key: string, from: any, to: any): this {
    this.wheres.push({ type: 'between', key, from, to });
    return this;
  }

  /**
   * Remueve todos los filtros BETWEEN
   */
  removeWhereAllBetween(): this {
    return this.removeWhereByType('between');
  }

  /**
   * Agrega filtro de igualdad
   */
  addWhereEqual(key: string, value: any): this {
    this.wheres.push({ type: 'equal', key, value });
    return this;
  }

  /**
   * Agrega filtro mayor que
   */
  addWhereGreaterThan(key: string, value: any): this {
    this.wheres.push({ type: 'greater-than', key, value });
    return this;
  }

  /**
   * Agrega filtro menor que
   */
  addWhereLessThan(key: string, value: any): this {
    this.wheres.push({ type: 'less-than', key, value });
    return this;
  }

  /**
   * Agrega filtro IN
   */
  addWhereIn(key: string, values: any[]): this {
    this.wheres.push({ type: 'in', key, value: values });
    return this;
  }

  /**
   * Agrega filtro simple al objeto filters
   */
  addWhere(key: string, value: any): this {
    this.filters[key] = value;
    return this;
  }

  /**
   * @deprecated - Usar addWhereIn en su lugar
   */
  addwhereIn(key: string, values: any): this {
    console.warn('addwhereIn está deprecado, usar addWhereIn en su lugar');
    this.filters[`${key}:in`] = values;
    return this;
  }

  /**
   * Agrega filtro NOT IN
   */
  addWhereNotIn(key: string, values: any[]): this {
    this.filters[`${key}:notin`] = values;
    return this;
  }

  /**
   * @deprecated - Usar addWhereLike en su lugar
   */
  addwhereLike(key: string, value: any): this {
    console.warn('addwhereLike está deprecado, usar addWhereLike en su lugar');
    return this.addWhereLike(key, value);
  }

  /**
   * Agrega filtro LIKE
   */
  addWhereLike(key: string, value: any): this {
    this.filters[`${key}:like`] = value;
    return this;
  }

  /**
   * Agrega filtro LIKE para múltiples campos
   */
  addWhereLikes(keys: string[], value: any): this {
    this.wheres.push({ type: 'likes', keys, value });
    return this;
  }

  /**
   * @deprecated - Usar addWhereBetween en su lugar
   */
  addwhereBetween(key: string, from: string, to: string): this {
    console.warn(
      'addwhereBetween está deprecado, usar addWhereBetween en su lugar'
    );
    return this.addWhereBetween(key, from, to);
  }

  /**
   * Remueve un filtro específico
   */
  removeWhere(key: string): this {
    // Remover del objeto filters
    delete this.filters[key];

    // Remover del array wheres
    this.wheres = this.wheres.filter((where) => where.key !== key);

    return this;
  }

  /**
   * Genera string de filtros para la API
   */
  getWhere(): string {
    const parts: string[] = [];

    for (const [key, value] of Object.entries(this.filters)) {
      if (value !== undefined && value !== null) {
        parts.push(`${key}:${value}`);
      }
    }

    return parts.join(';');
  }

  /**
   * Limpia todos los filtros
   */
  resetWhere(): this {
    this.filters = {};
    this.wheres = [];
    return this;
  }

  // ========== MÉTODOS DE WITH ==========

  /**
   * Agrega relación para cargar
   */
  addWith(name: string): this {
    if (!this.withs.includes(name)) {
      this.withs.push(name);
    }
    return this;
  }

  /**
   * Agrega múltiples relaciones
   */
  addWiths(names: string[]): this {
    names.forEach((name) => this.addWith(name));
    return this;
  }

  /**
   * Remueve una relación
   */
  removeWith(name: string): this {
    const index = this.withs.indexOf(name);
    if (index !== -1) {
      this.withs.splice(index, 1);
    }
    return this;
  }

  /**
   * Limpia todas las relaciones
   */
  resetWith(): this {
    this.withs = [];
    return this;
  }

  // ========== MÉTODOS DE PAGINACIÓN ==========

  /**
   * Configura la paginación
   */
  setPagination(lastPage: number, itemPerPage: number): this {
    this.lastPage = lastPage;
    this.itemPerPage = itemPerPage;
    return this;
  }

  /**
   * Va a la página siguiente
   */
  nextPage(): this {
    if (this.pageCurrent < this.lastPage) {
      this.pageCurrent++;
    }
    return this;
  }

  /**
   * Va a la página anterior
   */
  prevPage(): this {
    if (this.pageCurrent > 1) {
      this.pageCurrent--;
    }
    return this;
  }

  /**
   * Va a una página específica
   */
  goToPage(page: number): this {
    if (page >= 1 && page <= this.lastPage) {
      this.pageCurrent = page;
    }
    return this;
  }

  // ========== MÉTODOS DE ORDENAMIENTO ==========

  /**
   * Agrega ordenamiento
   */
  addOrder(field: string, type: OrderDirection): this {
    // Remover orden existente para el mismo campo
    this.removeOrder(field);
    this.orders.push({ field, type });
    return this;
  }

  /**
   * Agrega ordenamiento ascendente
   */
  addOrderAsc(field: string): this {
    return this.addOrder(field, 'asc');
  }

  /**
   * Agrega ordenamiento descendente
   */
  addOrderDesc(field: string): this {
    return this.addOrder(field, 'desc');
  }

  /**
   * Remueve ordenamiento de un campo
   */
  removeOrder(field: string): this {
    this.orders = this.orders.filter((order) => order.field !== field);
    return this;
  }

  /**
   * Limpia todos los ordenamientos
   */
  resetOrders(): this {
    this.orders = [];
    return this;
  }

  // ========== MÉTODOS DE BÚSQUEDA ==========

  /**
   * Establece término de búsqueda
   */
  setSearch(search: string): this {
    this.search = search;
    return this;
  }

  /**
   * Limpia la búsqueda
   */
  clearSearch(): this {
    this.search = '';
    return this;
  }

  // ========== MÉTODO PRINCIPAL ==========

  /**
   * Convierte la query a parámetros para enviar a la API
   */
  toParams(): DoroteaQueryParams {
    // Procesar ordenamiento deprecado
    if (this.ordType?.title) {
      if (this.ordType.asc === 1) {
        this.addOrderAsc(this.ordType.title);
      } else {
        this.addOrderDesc(this.ordType.title);
      }
      this.ordType.title = '';
    }

    return {
      page: this.pageCurrent,
      where: this.getWhere(),
      wheres: this.wheres,
      joins: this.joins,
      withs: this.withs,
      with: this.withs, // Mantener compatibilidad
      search: this.search,
      orders: this.orders,
      limit: this.itemPerPage,
    };
  }

  // ========== MÉTODOS DE UTILIDAD ==========

  /**
   * Clona la query actual
   */
  clone(): DoroteaQuery {
    const newQuery = new DoroteaQuery();
    newQuery.pageCurrent = this.pageCurrent;
    newQuery.lastPage = this.lastPage;
    newQuery.itemPerPage = this.itemPerPage;
    newQuery.filters = { ...this.filters };
    newQuery.wheres = [...this.wheres];
    newQuery.joins = [...this.joins];
    newQuery.withs = [...this.withs];
    newQuery.search = this.search;
    newQuery.ordType = { ...this.ordType };
    newQuery.orders = [...this.orders];
    return newQuery;
  }

  /**
   * Limpia toda la query
   */
  reset(): this {
    this.pageCurrent = 1;
    this.lastPage = 1;
    this.itemPerPage = 50;
    this.filters = {};
    this.wheres = [];
    this.joins = [];
    this.withs = [];
    this.search = '';
    this.ordType = { title: '', asc: 1 };
    this.orders = [];
    return this;
  }

  /**
   * Verifica si la query tiene filtros aplicados
   */
  hasFilters(): boolean {
    return (
      Object.keys(this.filters).length > 0 ||
      this.wheres.length > 0 ||
      this.search.length > 0
    );
  }

  /**
   * Obtiene resumen de la query para debugging
   */
  getDebugInfo(): string {
    return JSON.stringify(
      {
        page: this.pageCurrent,
        filters: this.filters,
        wheres: this.wheres,
        search: this.search,
        orders: this.orders,
      },
      null,
      2
    );
  }
}
