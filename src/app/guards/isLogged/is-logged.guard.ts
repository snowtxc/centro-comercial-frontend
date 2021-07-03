import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {

  constructor(private _auth:AuthenticationService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      
    if (this._auth.isLogged()){
      return true;
    }
    
    this.router.navigate(['login']);
    return false;
      
  }
  
}
