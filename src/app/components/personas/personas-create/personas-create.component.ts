import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { PersonaService } from '@services/persona/persona.service';


//Models
import {Persona} from "../../../modals/Persona";


declare var M:any;
@Component({
  selector: 'app-personas-create',
  templateUrl: './personas-create.component.html',
  styleUrls: ['./personas-create.component.scss',
              './responsive.scss']
})
export class PersonasCreateComponent implements OnInit {

  public addPersonForm: FormGroup;
  public submitedFormPerson = false;


  constructor(private _builderForm: FormBuilder,private _personaService:PersonaService) {
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

    const body_content ={
      nombre: this.addPersonForm.controls['nombre'].value,
      apellido: this.addPersonForm.controls['apellido'].value,
      email:    this.addPersonForm.controls['email'].value,
      celular: this.addPersonForm.controls['celular'].value,
      estado:  this.addPersonForm.controls['estado'].value
    }

    this._personaService.create(body_content).subscribe(result =>{
      M.toast({ html: 'Persona creada correctamente!', classes: 'rounded'});
      this.addPersonForm.reset();
      this.submitedFormPerson = false;
    },
    error =>{
      console.log(error);
    })

  }


  

}
