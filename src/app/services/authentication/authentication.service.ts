import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from 'rxjs';


import { map} from "rxjs/operators"
import { catchError,retry } from 'rxjs/operators';



//Services

import { LocalstorageService } from '@services/localstorage/localstorage.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {



  constructor(private _http:HttpClient,private _localStorage:LocalstorageService,private _router:Router) {}


  auth(email:string,password:string):Observable<any>{
    const headers = new HttpHeaders();

    const body_content = {
      email: email,
      password: password
    }

    return this._http.post("/api/auth/login", body_content, { headers: headers }).pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    })).pipe(map(data =>{
       let obj = Object.create(data);
       
       const token = obj.token;
       const isAdmin =  obj.user.isAdmin;
       
       this.createUserSesion(token);

       if(isAdmin){
         this._router.navigate(['']);
       }else{
         this._router.navigate(['user_info']);
       }

    }))
  }


  createUserSesion(token: any) {
    this._localStorage.setToken(token);
  }


  destroyUserSesion() {
    this._localStorage.destroyToken();
    this._router.navigate(['login']);  
  }

  isLogged():Observable<any>{
  
    return this._http.get("/api/auth/is-logged"); 
  }


}
