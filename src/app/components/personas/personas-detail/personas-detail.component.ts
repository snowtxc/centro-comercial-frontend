import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
declare var M:any;

@Component({
  selector: 'app-personas-detail',
  templateUrl: './personas-detail.component.html',
  styleUrls: ['./personas-detail.component.scss',
              './responsive.scss']
})
export class PersonasDetailComponent implements OnInit {

  public editPersonForm: FormGroup;
  public submitedFormPerson = false;

  constructor(private _builderForm:FormBuilder) {
    this.editPersonForm = this._builderForm.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(9)]],
      estado: ['', Validators.required]
    });
 }

  ngOnInit(): void {
    
      var elemsModal = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elemsModal);
    
  }

  onSubmitEditPerson(){

    this.submitedFormPerson = true;
    if(this.editPersonForm.invalid){
      return ;
    }

    console.log("submited!")

  }
}
