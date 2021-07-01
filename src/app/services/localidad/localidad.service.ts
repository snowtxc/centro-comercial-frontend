import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from "rxjs";
import { catchError, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  constructor(private _http:HttpClient) { }
  create(body_content: any): Observable<any> {
    const headers = new HttpHeaders();

    return this._http.post(environment.url + "/localidades", body_content, { headers: headers }).pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));

  }

  getLocalidades(): Observable<any> {

    return this._http.get(environment.url + "/localidades").pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));

  }


  getLocalidad(id: number):Observable<any> {
    return this._http.get(environment.url + "localidades/" + id).pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));
  }



  deleteLocalidad(id: number):Observable<any> {
    return this._http.delete(environment.url + "/localidades/" + id).pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));

  }



}



