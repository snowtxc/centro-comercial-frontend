import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from "@angular/common/http";

import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';


import { map} from "rxjs/operators"
import { catchError,retry } from 'rxjs/operators';

import { BehaviorSubject } from 'rxjs';

//Services

import { LocalstorageService } from '@services/localstorage/localstorage.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentDataSubject$: BehaviorSubject<any>;
  public  dataUser$ : Observable<any>;


  constructor(private _http:HttpClient,private _localStorage:LocalstorageService,private _router:Router) {
    this.currentDataSubject$ = new BehaviorSubject<any>(JSON.parse(_localStorage.getDataUser()!));
    this.dataUser$ = this.currentDataSubject$.asObservable();
  
  }


  auth(email:string,password:string):Observable<any>{
    const headers = new HttpHeaders();
    const body_content = {
      email: email,
      password: password
    }

    return this._http.post(environment.url + "/auth/login", body_content, { headers: headers }).pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    })).pipe(map(data =>{
       let obj = Object.create(data);

       const token = obj.token;

       const datauser = {
         username : obj.user.username,
         isAdmin : obj.user.isAdmin
       }

       this.createUserSesion(token,datauser);

       if(datauser.isAdmin){
         this._router.navigate(['']);
       }else{
         this._router.navigate(['user_info']);
       }

    }))
  }


  get userValue(){ return this.currentDataSubject$.value; }


  createUserSesion(token: any, datauser: any) {
    this._localStorage.setToken(token);
    this._localStorage.setDataUser(datauser);
    this.currentDataSubject$.next(datauser);

  }


  destroyUserSesion() {
    this._localStorage.destroyToken();
    this._localStorage.destroyDataUser();
    this.currentDataSubject$.next(null);
    this._router.navigate(['login']);  
  }

  isLogged(): boolean{
    if (this.currentDataSubject$.value != null) {
      return true;
    }
    return false;

  }

  


}
