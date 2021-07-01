import { Component, OnInit } from '@angular/core';

import { FormGroup, Validators, FormBuilder, Form} from "@angular/forms";

declare var M:any;

@Component({
  selector: 'app-departamentos-localidades',
  templateUrl: './departamentos-localidades.component.html',
  styleUrls: ['./departamentos-localidades.component.scss',
              './responsive.scss']
})
export class DepartamentosLocalidadesComponent implements OnInit {

  items = [1, 2, 3, 4];
  pageOfItems: Array<any> = [];

  //FORMS
  public formAddDep: FormGroup;
  public submitedFormDep = false;

  public formAddLocalidad: FormGroup;
  public submitedFormLocalidad = false;

  constructor(private _builderForm: FormBuilder) {
    
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

      
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  onSubmitAddDep(){
    this.submitedFormDep = true;
    if(this.formAddDep.invalid){
      return;
    }

    this.formAddDep.reset();
    this.submitedFormDep = false;
    console.log("Nice!");

  }

  onSubmitAddLocalidad(){
    this.submitedFormLocalidad = true;

    if(this.formAddLocalidad.invalid){
      return;
    } 

    this.formAddLocalidad.reset();
    this.submitedFormLocalidad = false;
    console.log("Nice localidad");

  }

}
