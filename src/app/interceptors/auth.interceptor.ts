import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LocalstorageService } from "@services/localstorage/localstorage.service";

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _localStorage:LocalstorageService,private _router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = this.addToken(request);
    return next.handle(request);
  }

  private addToken(request:HttpRequest<any>){
    const token = this._localStorage.getToken();
    if (token) { 
      let headers = request.headers
        .set('Content-Type', 'application/json')
        .set('Authorization', token);

      const cloneReq = request.clone({ headers });

      return cloneReq;

    }else {
      this._router.navigate(['/login']);
    }
    return request;
   
  }
}


