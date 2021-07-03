import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from '@services/authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsNotLoggedGuard implements CanActivate {

  constructor(private _auth:AuthenticationService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this._auth.isLogged()) {
      return true;
    }

    this.router.navigate(['']);
    return false;
  
  }
  
}
