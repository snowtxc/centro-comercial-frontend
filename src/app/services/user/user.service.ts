import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';

import { map ,retry, catchError} from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  getUsername():Observable<any>{
    return this._http.get("/api/user/info").pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    })).pipe(map(data => {
      let obj_user = Object.create(data);      
      return obj_user.username;
    }));;
  }

}
