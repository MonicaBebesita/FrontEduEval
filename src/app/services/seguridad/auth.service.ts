
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, filter, tap, throwError, of } from 'rxjs'; // Importa 'of'
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  username: string;
  roles: string[];
}

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api';
  private isRefreshing = false;

  private accessToken$ = new BehaviorSubject<string | null>(null);
  private userRoles$ = new BehaviorSubject<string[]>([]);
  private loggedIn$ = new BehaviorSubject<boolean>(false);

 
  constructor(private http: HttpClient, private router: Router) {
    if (this.isBrowser()) {
      const token = this.getAccessToken();
      console.log('[AuthService] Inicializando, token encontrado:', token);
      const isTokenValid = token !== null && !this.isTokenExpired(token);
      console.log('[AuthService] ¿Token válido?:', isTokenValid);

      this.accessToken$.next(token);
      if (isTokenValid) {
        const roles = this.getRolesFromToken(token!);
        this.userRoles$.next(roles);
        this.loggedIn$.next(true);
        console.log('[AuthService] Roles iniciales cargados:', roles);
      } else {
        this.userRoles$.next([]);
        this.loggedIn$.next(false);
      }
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }



  private isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      const expired = decoded.exp < now;
      console.log(
        '[AuthService] Expiración del token:',
        decoded.exp,
        'Ahora:',
        now,
        '¿Expirado?:',
        expired
      );
      return expired;
    } catch (err) {
      console.error(
        '[AuthService] Error al decodificar token para expiración:',
        err
      );
      return true; // Si falla la decodificación, tratamos el token como inválido
    }
  }

  login(username: string, password: string) {
    console.log('[AuthService] Intentando login...');
    return this.http
      .post<any>(`${this.baseUrl}/token/`, { username, password })
      .pipe(
        tap((tokens) => {
          console.log('[AuthService] Tokens recibidos:', tokens);
          this.setTokens(tokens.access, tokens.refresh);
          this.loggedIn$.next(true);
          console.log('[AuthService] Login exitoso');
        })
      );
  }

  logout() {
    console.log('[AuthService] Cerrando sesión...');
    if (this.isBrowser()) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
    }
    this.accessToken$.next(null);
    this.userRoles$.next([]);
    this.loggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  private setTokens(access: string, refresh: string) {
    console.log('[AuthService] Guardando tokens...');
    if (this.isBrowser()) {
      localStorage.setItem(ACCESS_TOKEN_KEY, access);
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
    }
    this.accessToken$.next(access);
    const roles = this.getRolesFromToken(access);
    this.userRoles$.next(roles);
    // this.rolesLoaded$.next(true); // Notificar que los roles están listos
    console.log('[AuthService] Roles establecidos después del login/refresh:', roles);
  }

  getAccessToken(): string | null {
    return this.isBrowser() ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;
  }

  getRefreshToken(): string | null {
    return this.isBrowser() ? localStorage.getItem(REFRESH_TOKEN_KEY) : null;
  }

  refreshToken() {
    if (this.isRefreshing) return of(null); // Retorna un observable para evitar errores de tipo
    this.isRefreshing = true;

    return this.http
      .post<any>(`${this.baseUrl}/token/refresh/`, {
        refresh: this.getRefreshToken(),
      })
      .pipe(
        tap((response) => {
          console.log('[AuthService] Token refrescado:', response);
          this.setTokens(
            response.access,
            response.refresh ?? this.getRefreshToken()!
          );
          this.loggedIn$.next(true);
          this.isRefreshing = false;
        }),
        catchError((err) => {
          console.error('[AuthService] Error al refrescar token:', err);
          this.logout();
          this.isRefreshing = false; // Asegurarse de resetear el flag
          return throwError(() => err);
        })
      );
  }

  isLoggedIn(): boolean {
    const token = this.getAccessToken();
    return token !== null && !this.isTokenExpired(token);
  }

  isLoggedIn$() {
    return this.loggedIn$.asObservable();
  }

  getTokenStream() {
    return this.accessToken$.asObservable().pipe(filter((token) => !!token));
  }

  getRolesFromToken(tokenOverride?: string): string[] {
    const token = tokenOverride || this.getAccessToken();
    if (!token) return [];
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log('[AuthService] Roles decodificados:', decoded.roles);
      return decoded.roles || [];
    } catch (e) {
      console.error('[AuthService] Error al decodificar token:', e);
      return [];
    }
  }

  getUserRoles() {
    return this.userRoles$.asObservable();
  }

  isInRole(role: string): boolean {
    return this.getRolesFromToken().includes(role);
  }
}