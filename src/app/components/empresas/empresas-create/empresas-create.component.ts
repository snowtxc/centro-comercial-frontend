import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators,FormBuilder} from '@angular/forms';

//Services
import { EmpresaService } from '@services/empresa/empresa.service';

declare var M:any;


@Component({
  selector: 'app-empresas-create',
  templateUrl: './empresas-create.component.html',
  styleUrls: ['./empresas-create.component.scss',
              './responsive.scss']
})
export class EmpresasCreateComponent implements OnInit {

  public addEmpresaForm: FormGroup;
  public submitedEmpresaForm = false;

  public logo? : File;
  public errorFormatFile  = false;


  constructor(private _builderForm:FormBuilder,private _empresaService:EmpresaService) {
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
    var elems = document.querySelectorAll('.datepicker'); 
    var instances = M.Datepicker.init(elems);
  }


  onSubmitAddEmpresa(){
    console.log(this.addEmpresaForm.controls['rut'].value.length)
    this.submitedEmpresaForm = true;
    if(this.addEmpresaForm.invalid){
      return;
    }

    if (!this.logo || this.errorFormatFile){
      return;
    }

    console.log(this.addEmpresaForm.controls);
    this.addEmpresaForm.reset();
    
  }


  fileChangeEvent($event:any){
    this.errorFormatFile = false;
    const  file = $event.target.files[0];
    this.logo = file;
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg'){
      return;
    }
    this.errorFormatFile = true;
 
  }
}
