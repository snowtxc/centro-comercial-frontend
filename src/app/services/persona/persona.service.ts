import { Injectable, OnInit } from '@angular/core';

import {HttpClient,HttpHeaders} from "@angular/common/http";


import  {environment} from "src/environments/environment";

import { Observable,throwError} from 'rxjs';

import { retry,catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  
  

  constructor(private _http:HttpClient) {
     
   }

  
 
 
  create(body_content: any): Observable<any> {
    const headers = new HttpHeaders();
    
    return this._http.post("/api/contactos", body_content, { headers: headers }).pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));

  }

  getPersonas(): Observable<any> {

    return this._http.get("/api/contactos").pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));

  }


  getPersonaById(id: any): Observable<any>{
    return this._http.get("/api/contactos/" + id).pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));
  }


  editPersona(id: number, body_content: any): Observable<any>{
    const headers = new HttpHeaders();

    return this._http.put("/api/contactos/" + id, body_content, { headers: headers }).pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));

  }

  deletePersona(id: number): Observable<any> {
    return this._http.delete("/api/contactos/" + id).pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));

  }

  asociateEmpresa(id_persona: number, id_empresa: number,body_content:any): Observable<any>{
    return this._http.post("/api/contactos/" + id_persona + "/empresas/" + id_empresa,body_content);
  }

  checkIfEmailExist(email: string): Observable<any> {
    return this._http.get("/api/auth/check_email/"+email);

  }


}
