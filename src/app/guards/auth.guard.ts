import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const token = localStorage.getItem('adminToken');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const payload = this.parseJwt(token);
    if (!payload || this.isTokenExpired(payload)) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  
}
  private parseJwt(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  private isTokenExpired(payload: any): boolean {
    if (!payload || !payload.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return payload.exp < now;
  }
}
