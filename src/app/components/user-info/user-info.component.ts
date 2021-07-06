import { Component, OnInit } from '@angular/core';


import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { DepartamentoService } from '@services/departamento-localidad/departamento.service';
import { EmpresaService } from '@services/empresa/empresa.service';

declare var M:any;
declare var $:any;


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  


  public editEmpresaForm: FormGroup;
  public submitedEditForm = false;

  


  public empresaID: number = 0;
  public Nombre: string = '';
  public razon_social: string = '';
  public rut: string = '';
  public Direccion: string = '';
  public email: string = '';
  public telefono: string = '';
  public celular: string = '';
  public nro_bps: string = '';
  public nro_referencia: string = '';
  public rubro: string = '';
  public rubro_secundario: string = '';
  public fecha_inicio_empresa: string = '';
  public url_logo: string = '';
  public observaciones: string = '';



  public localidadName: string = '';
  public localidadId: number = 0;

  public departamentoName: string = '';
  public departamentoId: string = '';
  
  public estado: string = '';

  public departamentosArr: Array < any > =[];
  public personasAsociadasArr: Array < any > =[];

  public localidadesArr: any = [];

  public departamento_selected = false;
  

  public logo ?: File;
  public errorFormatFile = false;







  constructor(private _builderForm: FormBuilder, private _route: ActivatedRoute, private _empresaService: EmpresaService, private _router: Router, private _departamentoService: DepartamentoService) {
    this.editEmpresaForm = this._builderForm.group({
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


    });
  }

  ngOnInit(): void {



    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);

    $('.datepicker').datepicker({
      format: 'dd-mm-yyyy'
    });




    this.loadEmpresa(10);


    this.emitLoadDepartamentos();
    this.eventLoadDepartamentos();


  }

  loadEmpresa(id_persona: any) {
    this._empresaService.getEmpresaById(id_persona).subscribe(empresa => {

     

      this.empresaID = empresa.id;
      this.Nombre = empresa.Nombre;
      this.razon_social = empresa.razon_social;
      this.rut = empresa.rut;
      this.Direccion = empresa.Direccion;
      this.email = empresa.email;
      this.telefono = empresa.telefono;
      this.celular = empresa.celular;
      this.nro_bps = empresa.nro_bps;
      this.nro_referencia = empresa.nro_referencia;
      this.rubro = empresa.rubro;
      this.rubro_secundario = empresa.rubro_secundario;
      this.fecha_inicio_empresa = empresa.fecha_inicio_empresa;
      this.url_logo = empresa.url_logo;
      this.observaciones = empresa.observaciones;
      this.localidadName = empresa.Localidad.name;
      this.estado = empresa.estado;
      this.departamentoName = empresa.Localidad.Departamento.name;

      this.localidadId = empresa.LocalidadId;
      this.departamentoId = empresa.Localidad.Departamento.id;

      this.localidadesArr = empresa.Localidads;


      this.personasAsociadasArr = empresa.Contactos;


    },
      error => {
        console.log(error);
      })
  }

  onSubmitEditEmpresa(){
    const selectedFecha = $("#fechaEmpresa").val();

    this.submitedEditForm = true;

    if (this.editEmpresaForm.invalid) {
      return;
    }
    let formData = new FormData();

    if (this.logo) {
      if (this.errorFormatFile) {
        return;
      }
      formData.append('logo', this.logo, this.logo.name);
    }



    formData.append('nombre', this.editEmpresaForm.controls['name'].value);
    formData.append('rut', this.editEmpresaForm.controls['rut'].value);
    formData.append('fecha_inicio_empresa', selectedFecha);
    formData.append('razon_social', this.editEmpresaForm.controls['razon_social'].value);
    formData.append('Direccion', this.editEmpresaForm.controls['direccion'].value);
    formData.append('email', this.editEmpresaForm.controls['email'].value);
    formData.append('celular', this.editEmpresaForm.controls['celular'].value);
    formData.append('telefono', this.editEmpresaForm.controls['telefono'].value);
    formData.append('nro_bps', this.editEmpresaForm.controls['nro_bps'].value);
    formData.append('nro_referencia', this.editEmpresaForm.controls['nro_referencia'].value);
    formData.append('rubro', this.editEmpresaForm.controls['rubro'].value);
    formData.append('rubro_secundario', this.editEmpresaForm.controls['rubro_secundario'].value);
    formData.append('estado', this.editEmpresaForm.controls['estado'].value);
    formData.append('observaciones', this.editEmpresaForm.controls['observaciones'].value);
    formData.append('LocalidadId', this.editEmpresaForm.controls['localidad'].value);


    this._empresaService.editEmpresa(this.empresaID, formData).then(result => {
      this.submitedEditForm = false;
      this.loadEmpresa(this.empresaID);
      M.toast({ html: 'Empresa  editada correctamente!', classes: 'rounded' });

    }).catch(error => {
      console.log(error);
    })


  }


  deleteEmpresa(){
    this._empresaService.deleteEmpresa(this.empresaID).subscribe(() => {
      this._router.navigate(['admin/empresas']);

    },
      error => {
        console.log(error);
      })

  }


  emitLoadDepartamentos(){ this._departamentoService.getDepartamentos() }

  eventLoadDepartamentos() {
    this._departamentoService.currentDepartamentosSubject.subscribe(data => {

      this.departamentosArr = data;
    })
  }


  mySelectDepartment($event: any){
    const idDep = $event;
    this.departamento_selected = true;

    const findDepartament: any = this.departamentosArr.find(element => element.id == idDep);
    this.localidadesArr = findDepartament.Localidads;

  }

  fileChangeEvent($event: any){
    this.errorFormatFile = false;
    const file = $event.target.files[0];
    this.logo = file;
    if (file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg') {
      return;
    }
    this.errorFormatFile = true;
  }

 }


