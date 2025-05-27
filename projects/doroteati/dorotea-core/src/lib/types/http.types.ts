export type DoroteaHttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface DoroteaRequestLog {
  method: DoroteaHttpMethod;
  url: string;
  params?: any;
  timestamp: number;
  duration?: number;
  success: boolean;
  error?: any;
}
