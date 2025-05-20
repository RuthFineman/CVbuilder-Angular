// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class JwtService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';

  decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }

  isAdmin(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    return decodedToken && decodedToken[this.roleClaim] === 'admin';
  }
}
