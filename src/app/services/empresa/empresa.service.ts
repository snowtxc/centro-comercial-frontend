import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';

import  {Observable, Subject, throwError} from "rxjs";
import { catchError,retry } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LocalstorageService } from '@services/localstorage/localstorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  
  
  public dataSubjetEmpresas: Subject<any>;
  public empresas:any = [];

  constructor(private _http:HttpClient,private _localStorage:LocalstorageService,private router:Router) { 
    this.dataSubjetEmpresas = new Subject();
  }
 
  create(formData:FormData){
    return new Promise((resolve, reject) => {
   
      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 201) {
            resolve(JSON.parse(xhr.response))
          } else {
  
            reject(xhr.response)
          } 
        }
      }             
      xhr.open('POST', environment.url + "/empresas", true); 
      const token: string = this._localStorage.getToken() || '';
      xhr.setRequestHeader('authorization',token);
      xhr.send(formData);
    })
  }

     



  loadAllEmpresas(){
    this._http.get("/api/empresas").pipe(catchError((err) => {
      retry(3);
      this.router.navigate(['error']);
      return throwError(err.error);
    })).subscribe(data => { 
      this.dataSubjetEmpresas.next(data);
      this.empresas = data;
    })

  }

  filterEmpresas(body_content:any):Observable<any>{
    const headers = new HttpHeaders();
    return this._http.post("/api/empresas/filter", body_content, { headers: headers }).pipe(catchError((err) => {
      retry(3);
      this.router.navigate(['error']);
      return throwError(err.error);
    }));;
  }

  


  getEmpresaById(id: number): Observable<any>{
    return this._http.get("/api/empresas/" + id).pipe(catchError((err) => {
      retry(3);
      this.router.navigate(['error']);
      return throwError(err.error);
    }));
  }


  editEmpresa(id: number, formData: any){
    return new Promise((resolve, reject) => {

      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.response))
          } else {
            
            reject(xhr.response)
          }
        }
      }
      xhr.open('PUT', environment.url + "/empresas/"+id, true);
      const token: string = this._localStorage.getToken() || '';
      xhr.setRequestHeader('authorization', token);
      xhr.send(formData);
    })

  }

  deleteEmpresa(id: number): Observable<any>{
    return this._http.delete("/api/empresas/" + id).pipe(catchError((err) => {
      retry(3);
      this.router.navigate(['error']);
      return throwError(err.error);
    }));

  }

  asociatePersona(id_persona: number, id_empresa: number): Observable<any>{
    return this._http.get("/api/empresas/" + id_empresa + "/contactos/" + id_persona + "").pipe(catchError((err) => {
      retry(3);
      this.router.navigate(['error']);
      return throwError(err.error);
    }));;
  }

  checkIfEmailExist(email:string):Observable<any>{
    return this._http.get("/api/empresas/check_email/" + email).pipe(catchError((err) => {
      retry(3);
      this.router.navigate(['error']);
      return throwError(err.error);
    }));;

  }


  getRubros():Observable<any>{
    return this._http.get("/api/empresas/rubros").pipe(catchError((err) => {
      retry(3);
      this.router.navigate(['error']);
      return throwError(err.error);
    }));;
  }


  getCountEmpresasByRubro():Observable<any>{
    return this._http.get("/api/empresas/rubros/cantidad").pipe(catchError((err) => {
      retry(3);
      this.router.navigate(['error']);
      return throwError(err.error);
    }));
  }

  getCountEmpresasByEstado():Observable<any>{
    return this._http.get("/api/empresas/estados/cantidad").pipe(catchError((err) => {
      retry(3);
      this.router.navigate(['error']);
      return throwError(err.error);
    }));;

  }






 
}
