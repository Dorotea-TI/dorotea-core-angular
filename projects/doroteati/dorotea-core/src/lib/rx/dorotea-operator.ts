import { Observable, OperatorFunction } from 'rxjs';

/**
 * Operador que filtra valores nulos, undefined, false y strings vacíos
 * @returns Observable que solo emite valores "truthy" (excluyendo false explícitamente)
 */
export function nil<T>(): OperatorFunction<T, NonNullable<T>> {
  return function (source: Observable<T>): Observable<NonNullable<T>> {
    return new Observable((subscriber) => {
      const subscription = source.subscribe({
        next(value: T) {
          if (
            value !== undefined &&
            value !== null &&
            value !== false &&
            value !== ''
          ) {
            subscriber.next(value as NonNullable<T>);
          }
        },
        error(error: any) {
          subscriber.error(error);
        },
        complete() {
          subscriber.complete();
        },
      });

      // Cleanup function para manejar unsubscriptions apropiadamente
      return () => subscription.unsubscribe();
    });
  };
}

/**
 * Operador que solo emite cuando el valor es exactamente true
 * @returns Observable que solo emite valores true
 */
export function truly(): OperatorFunction<boolean, true> {
  return function (source: Observable<boolean>): Observable<true> {
    return new Observable((subscriber) => {
      const subscription = source.subscribe({
        next(value: boolean) {
          if (value === true) {
            subscriber.next(true);
          }
        },
        error(error: any) {
          subscriber.error(error);
        },
        complete() {
          subscriber.complete();
        },
      });

      // Cleanup function para manejar unsubscriptions apropiadamente
      return () => subscription.unsubscribe();
    });
  };
}

/**
 * Operador adicional que filtra solo valores definidos (no null ni undefined)
 * @returns Observable que solo emite valores definidos
 */
export function defined<T>(): OperatorFunction<T, NonNullable<T>> {
  return function (source: Observable<T>): Observable<NonNullable<T>> {
    return new Observable((subscriber) => {
      const subscription = source.subscribe({
        next(value: T) {
          if (value !== undefined && value !== null) {
            subscriber.next(value as NonNullable<T>);
          }
        },
        error(error: any) {
          subscriber.error(error);
        },
        complete() {
          subscriber.complete();
        },
      });

      return () => subscription.unsubscribe();
    });
  };
}

/**
 * Operador que filtra valores falsy (0, false, '', null, undefined, NaN)
 * @returns Observable que solo emite valores truthy
 */
export function truthy<T>(): OperatorFunction<T, NonNullable<T>> {
  return function (source: Observable<T>): Observable<NonNullable<T>> {
    return new Observable((subscriber) => {
      const subscription = source.subscribe({
        next(value: T) {
          if (value) {
            subscriber.next(value as NonNullable<T>);
          }
        },
        error(error: any) {
          subscriber.error(error);
        },
        complete() {
          subscriber.complete();
        },
      });

      return () => subscription.unsubscribe();
    });
  };
}
