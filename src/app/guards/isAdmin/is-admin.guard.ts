
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthenticationService } from '@services/authentication/authentication.service';
import { catchError, retry } from 'rxjs/operators';

import {Observable, throwError} from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

  constructor(private _auth:AuthenticationService,private _router:Router){}
   
  canActivate(): Observable<boolean> {
    return this._auth.isLogged().pipe(catchError((err: HttpErrorResponse) => {
      if (err.status == 401) {
        this._router.navigate(['login']);
      }
      retry(3);
      return throwError(err.error);
    }));
  }
  
}
