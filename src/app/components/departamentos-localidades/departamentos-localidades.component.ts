import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormBuilder, Form} from "@angular/forms";
import { DepartamentoService } from '@services/departamento-localidad/departamento.service';
import { LocalidadService } from '@services/localidad/localidad.service';


//Models
import {Departamento} from "src/app/modals/Departamento";

declare var M:any;
declare var $:any;

@Component({
  selector: 'app-departamentos-localidades',
  templateUrl: './departamentos-localidades.component.html',
  styleUrls: ['./departamentos-localidades.component.scss',
              './responsive.scss']
})
export class DepartamentosLocalidadesComponent implements OnInit {

  pageOfItemsDeps: Array<any> = [];

  public departamentosArr : any = [];
  

  //FORMS
  public formAddDep: FormGroup;
  public submitedFormDep = false;

  public formAddLocalidad: FormGroup;
  public submitedFormLocalidad = false;

  public errorLoadDepartamentos = false;

  public selectedIdDep: number = 0;
  public selectedNameDep: string = '';

  public searchValue = '';




  constructor(private _builderForm: FormBuilder,private _departamentoService:DepartamentoService,private _localidadService:LocalidadService) {
    
     

    this.formAddDep = this._builderForm.group({
      name_departamento:  ['',Validators.required]
    });

    this.formAddLocalidad = this._builderForm.group({
      name_localidad:  ['',Validators.required]
    })

  }
   
  ngOnInit(): void {

      var elemsCollapsible = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init(elemsCollapsible);

      var modalElems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(modalElems);


      //Emits
      this._departamentoService.getDepartamentos();
       
      //Event load
      this.eventLoadDepartamentos();


      
  }

  onChangePage(pageOfItems: Array<any>) {
    
    this.pageOfItemsDeps = pageOfItems;
  }



   eventLoadDepartamentos(){
      this._departamentoService.currentDepartamentosSubject.subscribe(data =>{
        this.departamentosArr = data;
      })
  
   }

  
  onSubmitAddDep(){
    this.submitedFormDep = true;
    if(this.formAddDep.invalid){
      return;
    }
    const nameDEP = this.formAddDep.controls['name_departamento'].value;

    const body_content = {  nombre : nameDEP }
    this._departamentoService.create(body_content).subscribe((data) =>{
      $("#addDepModal").modal("close");
      M.toast({ html: 'Departamento creado correctamente!', classes: 'rounded' });
      this._departamentoService.getDepartamentos();
      
    },  error =>{  M.toast({ html: error.error, classes: 'rounded' }); })
    this.submitedFormDep = false;
    this.formAddDep.reset();

  }


  selectDep(idDep:number,nombreDep:string){
    this.selectedIdDep = idDep;
    this.selectedNameDep = nombreDep;
  }



  onSubmitAddLocalidad(){
    this.submitedFormLocalidad = true;

    if(this.formAddLocalidad.invalid){  return; } 
    const nameLocalidad = this.formAddLocalidad.controls['name_localidad'].value;

    const body_content ={
      nombre:  nameLocalidad, 
      departamentoID: this.selectedIdDep
    } 
    this._localidadService.create(body_content).subscribe(result =>{
      $("#addLocalidadModal").modal("close");
      M.toast({ html: 'Localidad creada correctamente!', classes: 'rounded' });
      this._departamentoService.getDepartamentos();
    },
    error =>{
      console.log(error);
    })
    this.submitedFormLocalidad = false;
    this.formAddLocalidad.reset();
  }




  deleteLocalidad(id:number){
    this._localidadService.deleteLocalidad(id).subscribe(result =>{
      return;
    },
    error =>{
      M.toast({ html: error.error, classes: 'rounded' });
    })
  }

}
