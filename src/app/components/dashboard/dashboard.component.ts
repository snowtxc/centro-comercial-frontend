import { Component, OnInit } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/angular';
import { EmpresaService } from '@services/empresa/empresa.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss',
              './responsive.scss']
})
export class DashboardComponent implements OnInit {
 
  pageOfItems: Array<any> = [];
  items: any = [1,2,3,4]
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [
      
    ] 
  };
  
  public arrEmpresas :any = [];

  public cantEmpresasActivas: number = 0;
  public cantEmpresasInactivas:number = 0;
  
  public cantEmpresasByRubro:any = []


  constructor(private _empresasService:EmpresaService) { 
    
    
  }

  ngOnInit(): void {
    this.getCountEmpresasByRubro();
    this._empresasService.loadAllEmpresas();
    this.eventLoadEmpresas();
    this.loadCountEmpresasByEstado();
    this.loadCountEmpresasByRubro();
  }


  eventLoadEmpresas(){
    this._empresasService.dataSubjetEmpresas.subscribe(data =>{
      this.arrEmpresas = data;
      this.setAnniversary();
    })
    

  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  getCountEmpresasByRubro(){
    this._empresasService.getCountEmpresasByRubro().subscribe(data =>{
      console.log(data);
    },
    error =>{
      console.log(error);
    })

  }

  setAnniversary(){
     const anioActual = new Date().getFullYear();
     var aniversarios= [];
     for(let i = 0;i < this.arrEmpresas.length; i++){
       
        let separate = this.arrEmpresas[i].fecha_inicio_empresa.split('-');
        console.log(separate);
        let anirvesaty = anioActual+'-'+separate[1]+'-'+separate[0];
        
        aniversarios.push({title: this.arrEmpresas[i].Nombre, date: anirvesaty});
     }

     this.calendarOptions.events = aniversarios;
  }


  loadCountEmpresasByEstado(){
    this._empresasService.getCountEmpresasByEstado().subscribe(data =>{
      console.log(data);
      for(let i = 0; i < 2;i++){
        if(data[i].estado == "activo"){
          this.cantEmpresasActivas = data[i].cantidad;

        }else if(data[i].estado == "inactivo"){
          this.cantEmpresasInactivas = data[i].cantidad;
        }
      }
    });

  }


  loadCountEmpresasByRubro(){
    this._empresasService.getCountEmpresasByRubro().subscribe(data =>{ 
      this.cantEmpresasByRubro =data; })
  }


}


