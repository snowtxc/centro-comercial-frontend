import { Component, OnInit } from '@angular/core';

import { EmpresaService } from '@services/empresa/empresa.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'centro-comercial-frontend';
   
  constructor(private _empresas:EmpresaService){


  }
  ngOnInit(){

    

  
   
  }
}


