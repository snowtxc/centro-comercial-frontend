import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from "rxjs";
import { catchError, retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  constructor(private _http:HttpClient,private router:Router) { }
  create(body_content: any): Observable<any> {
    const headers = new HttpHeaders();

    return this._http.post("/api/localidades", body_content, { headers: headers }).pipe(catchError((err) => {
      retry(3);
      this.router.navigate(['error']);
      return throwError(err.error);
    }));

  }

  getLocalidades(): Observable<any> {

    return this._http.get("/api/localidades").pipe(catchError((err) => {
      retry(3);
      this.router.navigate(['error']);
      return throwError(err.error);
    }));

  }


  getLocalidad(id: number):Observable<any> {
    return this._http.get("api/localidades/" + id).pipe(catchError((err) => {
      retry(3);
      this.router.navigate(['error']);
      return throwError(err.error);
    }));
  }



  deleteLocalidad(id: number):Observable<any> {
    return this._http.delete("/api/localidades/" + id).pipe(catchError((err) => {
      retry(3);
      this.router.navigate(['error']);
      return throwError(err.error);
    }));

  }



}



