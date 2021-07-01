import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';

import  {Observable, throwError} from "rxjs";
import { catchError,retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private _http:HttpClient) { }


  create(body_content:any):Observable<any>{
    const headers = new HttpHeaders();

    return this._http.post(environment.url +"/empresas", body_content, { headers: headers }).pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));
    
  }

  getEmpresas():Observable<any>{

    return this._http.get(environment.url + "/empresas").pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));

  }


  getEmpresaById(id: number): Observable<any>{
    return this._http.get(environment.url + "empresas/" + id).pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));
  }


  editEmpresa(id: number, body_content: any): Observable<any>{
    const headers = new HttpHeaders();

    return this._http.put(environment.url + "/empresas/"+id, body_content, { headers: headers }).pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));

  }

  deleteEmpresa(id: number): Observable<any>{
    return this._http.delete(environment.url + "/empresas/" + id).pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));

  }

  asociatePersona(id_persona: number, id_empresa: number): Observable<any>{
    return this._http.get(environment.url +"/empresas/"+id_empresa+"/contactos/"+id_persona+"");
  }

 
}
