import { Injectable, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import Keycloak, { KeycloakProfile } from 'keycloak-js';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private keycloak: Keycloak;
  private userProfileSubject = new BehaviorSubject<KeycloakProfile | null>(null);
  userProfile$ = this.userProfileSubject.asObservable();

  private initializedPromise: Promise<boolean> | null = null;
  private initialized = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.keycloak = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'EduEval',
      clientId: 'edueval-backend',
    });
  }

  init(): Promise<boolean> {
    if (this.initializedPromise) {
      return this.initializedPromise;
    }

    if (!isPlatformBrowser(this.platformId)) {
      console.warn('Keycloak no se inicializa en un entorno no navegador.');
      return Promise.resolve(false);
    }

    this.initializedPromise = this.keycloak
      .init({
        onLoad: 'login-required',
        pkceMethod: 'S256',
        silentCheckSsoRedirectUri: `${window.location.origin}/assets/silent-check-sso.html`,
      })
      .then((authenticated) => {
        this.initialized = true;

        if (authenticated) {
          return this.keycloak.loadUserProfile().then((profile) => {
            this.userProfileSubject.next(profile);
            return true;
          });
        } else {
          this.userProfileSubject.next(null);
          return false;
        }
      })
      .catch((err) => {
        console.error('Error al inicializar Keycloak', err);
        this.initialized = false;
        return false;
      });

    return this.initializedPromise;
  }

  async login() {
    if (!this.initialized) await this.init();
    this.keycloak.login();
  }

  async logout() {
    if (!this.initialized) await this.init();
    this.keycloak.logout({ redirectUri: window.location.origin });
  }

  async getToken(): Promise<string | undefined> {
    if (!this.initialized) await this.init();
    return this.keycloak.token;
  }

  async isLoggedIn(): Promise<boolean> {
    if (!this.initialized) await this.init();
    return this.keycloak.authenticated ?? false;
  }

  async getRoles(): Promise<string[]> {
    if (!this.initialized) await this.init();
    return this.keycloak.realmAccess?.roles ?? [];
  }
}