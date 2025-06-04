import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.auth.getAccessToken();

    const authReq = accessToken
      ? req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
      : req;

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && this.auth.getRefreshToken()) {
          return this.auth.refreshToken()!.pipe(
            switchMap(() => {
              const newAccess = this.auth.getAccessToken();
              const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${newAccess}` } });
              return next.handle(cloned);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
