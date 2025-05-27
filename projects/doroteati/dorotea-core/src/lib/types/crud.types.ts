export type DoroteaId = string | number;

export type DoroteaSortDirection = 'asc' | 'desc';

export interface DoroteaApiMeta {
  total: number;
  page: number;
  perPage: number;
  lastPage: number;
  hasMore: boolean;
}
