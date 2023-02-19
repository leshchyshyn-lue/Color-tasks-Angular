import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LOGIN_URL } from 'src/app/environment/url';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private readonly _router: Router
  ) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (state.url == "/" + LOGIN_URL) {
      return true;
    }

    const token = sessionStorage.getItem('token');

    if (!token) {
      return this._router.parseUrl("/" + LOGIN_URL);
    }
    return true;
  }

}
