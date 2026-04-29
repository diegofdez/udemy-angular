import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthResponse } from '@auth/interfaces/auth-reponse.interface';
import { User } from '@auth/interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({providedIn: 'root'})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User|null>(null);
  private _token = signal<string|null>(localStorage.getItem('token'));

  private http = inject(HttpClient);

  checkStatusResource = rxResource({
    stream: () => this.checkStatus()
  });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() === 'checking') {
      return 'checking';
    }

    return this._user() ? 'authenticated' : 'not-authenticated';
  });

  user = computed<User|null>(() => this._user());
  token = computed<string|null>(() => this._token());
  isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);

  login(email: string, password: string): Observable<boolean> {
    this._authStatus.set('checking');

    return this.http.post<AuthResponse>(`${baseUrl}/auth/login`, { email, password })
      .pipe(
        map(resp => this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  register(email: string, fullName: string, password: string): Observable<boolean> {
    this._authStatus.set('checking');

    return this.http.post<AuthResponse>(`${baseUrl}/auth/register`, { email, fullName, password })
      .pipe(
        map(resp => this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`, {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    }).pipe(
        map(resp => this.handleAuthSuccess(resp)),
        catchError((error: any) => this.handleAuthError(error))
    );
  }

  getUser(): Observable<User|null> {
    if (this._user()) {
      return of(this._user()!);
    }

    return this.http.get<AuthResponse>(`${baseUrl}/auth/check-status`, {
      // headers: {
      //   Authorization: `Bearer ${token}`
      // }
    }).pipe(
        map(resp => resp.user)
    );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');

    localStorage.removeItem('token');
  }

  private handleAuthSuccess({ token, user }: AuthResponse) {
    this._authStatus.set('authenticated');
    this._user.set(user);
    this._token.set(token);

    localStorage.setItem('token', token);

    return true;
  }

  private handleAuthError(error: any) {
    this.logout();
    return of(false);
  }
}
