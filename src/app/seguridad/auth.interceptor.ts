// src/app/seguridad/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AlmacenamientoTokenService } from './almacenamiento-token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AlmacenamientoTokenService);
  const token = authService.getAccessToken();

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq);
};
