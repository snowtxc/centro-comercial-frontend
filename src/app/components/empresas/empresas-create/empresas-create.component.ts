import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-empresas-create',
  templateUrl: './empresas-create.component.html',
  styleUrls: ['./empresas-create.component.scss',
              './responsive.scss']
})
export class EmpresasCreateComponent implements OnInit {

  public addEmpresaForm: FormGroup;
  public submitedEmpresaForm = false;


  constructor(private _builderForm:FormBuilder) {
    this.addEmpresaForm = this._builderForm.group({
      name: ['',Validators.required],
      razon_social: ['',Validators.required],
      direccion: ['',Validators.required],
      rut: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12), Validators.pattern("^[0-9]*$")]],
      estado: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      celular: ['', [Validators.required, Validators.pattern("^[0-9]*$")] ],
      nro_bps: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      nro_referencia: ['', Validators.pattern("^[0-9]*$")],
      logo:  ['',Validators.required],
      rubro: ['',Validators.required],
      rubro_secundario: [''],
      departamento: ['',Validators.required],
      localidad: ['',Validators.required],
      fecha_inicio_empresa: ['',Validators.required],
      observaciones: ['',Validators.required],
      email_user_empresa: ['',[Validators.required,Validators.email]],
      password_user_empresa: ['',[Validators.required,Validators.minLength(8)]],
      username_user_empresa: ['',Validators.required],
  
    })
   
  }

  ngOnInit(): void {
  }


  onSubmitAddEmpresa(){
    console.log(this.addEmpresaForm.controls['rut'].value.length)
    this.submitedEmpresaForm = true;
    if(this.addEmpresaForm.invalid){
      console.log(this.addEmpresaForm.invalid)
      return;
    }
    console.log("submit!");
  }
}
