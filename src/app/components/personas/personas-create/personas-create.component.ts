import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-personas-create',
  templateUrl: './personas-create.component.html',
  styleUrls: ['./personas-create.component.scss',
              './responsive.scss']
})
export class PersonasCreateComponent implements OnInit {

  public addPersonForm: FormGroup;
  public submitedFormPerson = false;

  constructor(private _builderForm: FormBuilder) {
    this.addPersonForm = this._builderForm.group({
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      email:  ['',[Validators.required,Validators.email]],
      celular: ['', [Validators.required, Validators.pattern("^[0-9]*$"),Validators.minLength(9),Validators.maxLength(9)]],
      estado: ['',Validators.required]
    });
   }

  ngOnInit(): void {
  }

  onSubmitAddPerson(){
    this.submitedFormPerson = true;
    if(this.addPersonForm.invalid){
      return;
    }

    console.log("nice");

  }

}
