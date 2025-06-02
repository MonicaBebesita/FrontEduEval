import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { routes } from './app.routes';
import { AuthService } from './seguridad/auth.service';
import { authInterceptor } from './seguridad/auth.interceptor';
import { tap } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideClientHydration(withEventReplay()),
    {
      provide: 'APP_INITIALIZER',
     useFactory: (authService: AuthService) => () => {
  if (typeof window !== 'undefined') {
    return authService.init().then(() => true);
  }
  return Promise.resolve(true);
},
      deps: [AuthService],
      multi: true,
    },
  ],
};
