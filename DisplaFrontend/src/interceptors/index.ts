/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor';

/** Http interceptor providers in outside-in order */
/**
 * Agregar todos los interceptors dentro del array
 * Ojo que el orden de implementacion sí importa
 */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];