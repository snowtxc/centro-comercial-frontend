import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from '@services/authentication/authentication.service';

import { catchError,retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import {map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {

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
