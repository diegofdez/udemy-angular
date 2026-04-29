
import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';
import { firstValueFrom } from 'rxjs';

export const NotAuthenticatedGuard: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('NotAuthenticatedGuard called');

  const isAuthenticated = await firstValueFrom(authService.checkStatus());
  console.log('Auth status:', isAuthenticated);

  if (isAuthenticated) {
    console.log('User is authenticated, redirecting to home');
    await router.navigate(['/']);
    return false;
  }

  return true;
}
