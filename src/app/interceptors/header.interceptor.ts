import {
  HttpRequest,
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpEvent,
} from '@angular/common/http';

import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@services/local-storage.service';

export const headerInterceptor: HttpInterceptorFn = ( request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  const localStorageService = inject(LocalStorageService);
  const clonedRequest = request.clone({
    setHeaders: {
      token: `Bearer ${localStorageService.getAccessToken()}`,
      'ngrok-skip-browser-warning': 'fssf'
    },
  });
  return next(clonedRequest);
};
