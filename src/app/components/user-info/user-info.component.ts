import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  public editEmpresaForm:FormGroup;

  public submitedEditForm = false;



  constructor(private _builder:FormBuilder) { 
    this.editEmpresaForm = this._builder.group({
      name: ['', Validators.required],
      razon_social: ['', Validators.required],
      direccion: ['', Validators.required],
      rut: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12), Validators.pattern("^[0-9]*$")]],
      estado: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      celular: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      nro_bps: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      nro_referencia: ['', Validators.pattern("^[0-9]*$")],
      rubro: ['', Validators.required],
      rubro_secundario: [''],
      departamento: ['', Validators.required],
      localidad: ['', Validators.required],
      fecha_inicio_empresa: ['', Validators.required],
      observaciones: ['', Validators.required],
      email_user_empresa: ['', [Validators.required, Validators.email]],
      password_user_empresa: ['', [Validators.required, Validators.minLength(8)]],
      username_user_empresa: ['', Validators.required],

    })
  }

  ngOnInit(): void {
  }

  onSubmitEditEmpresa(){
    this.submitedEditForm = true;

    if(this.editEmpresaForm.invalid){
      return;
    }

    console.log("perro");
  }
}
