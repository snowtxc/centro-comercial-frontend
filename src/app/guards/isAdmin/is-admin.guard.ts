
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthenticationService } from '@services/authentication/authentication.service';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private _auth:AuthenticationService,private _router:Router){}
   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const isAdmin = this._auth.userValue.isAdmin; 

      if(isAdmin){
        return true;
      
      }
      this._router.navigate(["user_info"]);
      return false;
      

    }
  
}
