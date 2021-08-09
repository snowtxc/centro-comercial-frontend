import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,Validators,FormBuilder} from '@angular/forms';
import { DepartamentoService } from '@services/departamento-localidad/departamento.service';

//Services
import { EmpresaService } from '@services/empresa/empresa.service';
import { Localidad } from 'src/app/modals/Localidad';

//Models
import { Departamento } from "../../../modals/Departamento";

import { fromEvent} from 'rxjs';
import {map,debounceTime,switchAll, elementAt} from 'rxjs/operators';

declare var $:any;

declare var M:any;

  
@Component({
  selector: 'app-empresas-create',
  templateUrl: './empresas-create.component.html',
  styleUrls: ['./empresas-create.component.scss',
              './responsive.scss']
})
export class EmpresasCreateComponent implements OnInit,AfterViewInit {

  public addEmpresaForm: FormGroup;
  public submitedEmpresaForm = false;

  public logo? : File;
  public errorFormatFile  = false;

  public departamentosArr: Array<any>= [];
  public localidadesArr : Array<any>  =  [];

  public selectedLocalidadId :any;
  
  public datepicker :any;
  public fechaRequired = false;


  public emailEmpresaExist = false;
  public emailUserExist = false;
  

  @ViewChild('inputEmailEmpresa') input_email_empresa:any;
  @ViewChild('inputEmailUser')  input_email_user:any;


   
  constructor(private _builderForm:FormBuilder,private _empresaService:EmpresaService,private _departamentoService:DepartamentoService) {
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
      observaciones: ['',Validators.required],
      email_user_empresa: ['',[Validators.required,Validators.email]],
      password_user_empresa: ['',[Validators.required,Validators.minLength(8)]],
      username_user_empresa: ['',Validators.required],
      
    })

  }


  ngOnInit(): void {
    var elems = document.querySelectorAll('.datepicker'); 
    this.datepicker = M.Datepicker.init(elems,{
      format: "dd-mm-yyyy"              
    });
    


    this._departamentoService.getDepartamentos();
    this.eventloadDepartamentos();

    
  }

  ngAfterViewInit() {
    const checkEmailEmpresaEvent$ = fromEvent(this.input_email_empresa.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value), 
        debounceTime(250),
        map((result) => this._empresaService.checkIfEmailExist(result)),
        switchAll()
      ).subscribe(result =>{
         this.emailEmpresaExist = result;
      })
    
    const chekcEmailUserEvent$ = fromEvent(this.input_email_user.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value),
        debounceTime(250),
        map((result) => this._empresaService.checkIfEmailExist(result)),
        switchAll()
      ).subscribe(result => {
          this.emailUserExist = result;
      })
  }




  onSubmitAddEmpresa(){
   
   
    this.submitedEmpresaForm = true;

    if(this.addEmpresaForm.invalid){
      return;
    }

    if (!this.logo || this.errorFormatFile){
      return;
    }
    if (this.emailEmpresaExist || this.emailUserExist) {
      return;
    }

    const selectedFecha =  $("#fechaEmpresa").val();

  
    
    if (!selectedFecha || selectedFecha == '') {
      this.fechaRequired = true;
      return;
    }


    let  formData = new FormData();

    formData.append('nombre', this.addEmpresaForm.controls['name'].value);
    formData.append('rut',this.addEmpresaForm.controls['rut'].value);
    formData.append('fecha_inicio_empresa',selectedFecha);
    formData.append('razon_social', this.addEmpresaForm.controls['razon_social'].value);
    formData.append('Direccion', this.addEmpresaForm.controls['direccion'].value);
    formData.append('email', this.addEmpresaForm.controls['email'].value);
    formData.append('celular', this.addEmpresaForm.controls['celular'].value);
    formData.append('telefono', this.addEmpresaForm.controls['telefono'].value);
    formData.append('nro_bps', this.addEmpresaForm.controls['nro_bps'].value);
    formData.append('nro_referencia', this.addEmpresaForm.controls['nro_referencia'].value);
    formData.append('rubro', this.addEmpresaForm.controls['rubro'].value);
    formData.append('rubro_secundario', this.addEmpresaForm.controls['rubro_secundario'].value);
    formData.append('estado', this.addEmpresaForm.controls['estado'].value);
    formData.append('observaciones', this.addEmpresaForm.controls['observaciones'].value);
    formData.append('user_email', this.addEmpresaForm.controls['email_user_empresa'].value);
    formData.append('user_password', this.addEmpresaForm.controls['password_user_empresa'].value);
    formData.append('nombre_usuario', this.addEmpresaForm.controls['username_user_empresa'].value);
    formData.append('LocalidadId', this.selectedLocalidadId);
    formData.append('logo', this.logo,this.logo.name);

    this._empresaService.create(formData).then(result =>{ 
      window.scrollTo(0, 0)
      this.submitedEmpresaForm = false;
      M.toast({ html: 'Empresa creada correctamente!', classes: 'rounded' });
      this.addEmpresaForm.reset();
      $("#logo").val('');


    }).catch(error =>{
      console.log(error);
   ;
    })
     
   
  
    

  
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

  eventloadDepartamentos(){
    this._departamentoService.currentDepartamentosSubject.subscribe(data =>{
      this.departamentosArr = data; 
    })
  
  }

 
  mySelectDepartment($event:any){
    const idDep = $event;
    const findDepartament:any = this.departamentosArr.find(element => element.id  == idDep);
    this.localidadesArr = findDepartament.Localidads ;
  
  }

  selectLocalidad($event:any){
    this.selectedLocalidadId = $event;
  }
   



}
