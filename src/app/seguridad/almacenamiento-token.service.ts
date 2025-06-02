import { Injectable } from '@angular/core';
//Guarda y gestiona los tokens en el navegador
@Injectable({ providedIn: 'root' })
export class AlmacenamientoTokenService {
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  saveTokens(access: string, refresh: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.accessTokenKey, access);
      localStorage.setItem(this.refreshTokenKey, refresh);
    }
  }

  getAccessToken(): string | null {
    return this.isBrowser() ? localStorage.getItem(this.accessTokenKey) : null;
  }

  getRefreshToken(): string | null {
    return this.isBrowser() ? localStorage.getItem(this.refreshTokenKey) : null;
  }

  clear(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.accessTokenKey);
      localStorage.removeItem(this.refreshTokenKey);
    }
  }
}
