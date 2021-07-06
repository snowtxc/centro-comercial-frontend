import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';

import { catchError,retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root' 
})
export class DepartamentoService {


  public currentDepartamentosSubject: Subject<any>;


  constructor(private _http:HttpClient) { 
    this.currentDepartamentosSubject = new Subject();

  }


  create(body_content: any): Observable<any> {
    const headers = new HttpHeaders();
                   
    return this._http.post(environment.url + "/departamentos", body_content, { headers: headers }).pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));

  }  

  getDepartamentos(): any {
    let departmentData$ =  this._http.get(environment.url + "/departamentos").pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));

    departmentData$.subscribe(data =>{
      console.log('sadasd');
      this.currentDepartamentosSubject.next(data);
    });

  }


  getDepartamentoById(id: number): Observable<any>{
    return this._http.get(environment.url + "departamentos/" + id).pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));
  }


  editDepartamento(id: number, body_content: any): Observable<any> {
    const headers = new HttpHeaders();

    return this._http.put(environment.url + "/departamentos/" + id, body_content, { headers: headers }).pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));

  }

   
  deleteDepartamento(id: number): Observable<any> {
    return this._http.delete(environment.url + "/departamentos/" + id).pipe(catchError((err) => {
      retry(3);
      return throwError(err.error);
    }));

  }


}


  

