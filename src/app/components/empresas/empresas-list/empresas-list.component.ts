import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";
import { DepartamentoService } from '@services/departamento-localidad/departamento.service';
import { EmpresaService } from '@services/empresa/empresa.service';

declare var M: any;

@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styleUrls: ['./empresas-list.component.scss',
               './responsive.scss']
})
export class EmpresasListComponent implements OnInit {

  public pageOfItemsEmpresas: Array<any> = [];
  public empresasArr: any = [];

  public rubrosArr: any  = [];
  public inputSearch:any = '';


  public departamentosArr:any = [];
  public localidadesArr:any = [];


  //Filters

   public localidadIdFilter:any ='';
   public departamentoIdFilter:any = '';
   public estadoFilterChecked: any = false;
   public rubroFilter:any = '';

   filterActivate = false;

   
  constructor(private _router:Router,private _empresasService:EmpresaService,private _departamentoService:DepartamentoService) { }

  ngOnInit(): void {
   
      var elems = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init(elems);

    
      this._empresasService.loadAllEmpresas();
      this._departamentoService.getDepartamentos();




      this.eventLoadEmpresas();
      this.eventloadDepartamentos();
      this.loadRubros();
      
    
    
   
  }






  eventLoadEmpresas(){
    this._empresasService.dataSubjetEmpresas.subscribe(data =>{
      this.empresasArr = data;
      
    },
    error =>{  console.log(error); })
  }


  eventloadDepartamentos(){
    this._departamentoService.currentDepartamentosSubject.subscribe(data =>{
      this.departamentosArr = data;
    })

  }


  


  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItemsEmpresas = pageOfItems;
  }

  selectedEmpresa(id:number){
      this._router.navigate(['/admin/empresas/'+id+'/detail']);
    
  }

  onClickAddEmpresa(){
    this._router.navigate(['/admin/empresas/create']);
    
  }



  loadRubros(){
    this._empresasService.getRubros().subscribe(data =>{
      this.rubrosArr = data;
      console.log(data);
    },
    error =>{
      console.log(error);
    })
  }


  mySelectDepartment($event: any) {
    const idDep = $event;
    const findDepartament: any = this.departamentosArr.find((element:any) => element.id == idDep);
    this.localidadesArr = findDepartament.Localidads;
    
  }


  mySelectRubro($event:any){
      console.log($event);
      this.rubroFilter = $event;
    

  }

  onCheckBoxChange($event:any){
    this.estadoFilterChecked = $event.currentTarget.checked;
    
  }


}


