import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';




declare var M:any;
declare var $:any;

import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '@services/empresa/empresa.service';
import { PersonaService } from '@services/persona/persona.service';

@Component({
  selector: 'app-personas-detail',
  templateUrl: './personas-detail.component.html',
  styleUrls: ['./personas-detail.component.scss',
              './responsive.scss']
})
export class PersonasDetailComponent implements OnInit {

  public editPersonForm: FormGroup;
  public submitedFormPerson = false;

  public personaID: number = 0;  
  public nombre = "";
  public apellido = "";
  public email = "";
  public celular = "";
  public estado = "";

 



  public empresasAsociadasArr:any = [];

  public allEmpresasArr:any = [];
  public searchEmpresaInput:string = '';


  public relacionInput = '';
  public relacionRequired =false;


  
  constructor(private _builderForm:FormBuilder,private _route:ActivatedRoute,private _personaService:PersonaService,private _router:Router,private _empresaService:EmpresaService) {
    this.editPersonForm = this._builderForm.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(9)]],
      estado: ['', Validators.required]
    });
 }

  ngOnInit(): void {
      let idPersonaParam = this._route.snapshot.paramMap.get('id'); 

      this.loadPersona(idPersonaParam);

    $(document).ready(function () {
      $('.js-example-basic-single').select2();
    });

      var elemsModal = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elemsModal);

      this._empresaService.loadAllEmpresas();
      this.eventLoadEmpresas();

    

       
    
      
    
  }


  loadPersona(id_persona:any){
    this._personaService.getPersonaById(id_persona).subscribe(user => {
      this.personaID = user.id;
      this.nombre = user.Nombre;
      this.apellido = user.Apellido;
      this.email = user.email;
      this.celular = user.celular;
      this.estado = user.estado;
      this.empresasAsociadasArr = user.Empresas;

      
    },
      error => {
        console.log(error);
      })
  }

 
 eventLoadEmpresas(){
   this._empresaService.dataSubjetEmpresas.subscribe(data =>{
     this.allEmpresasArr = data;
  
   })
 }


  onSubmitEditPerson(){

    this.submitedFormPerson = true;
    if(this.editPersonForm.invalid){
      return ; 
    }

    const body_content = {
      nombre: this.editPersonForm.controls['nombre'].value,
      apellido: this.editPersonForm.controls['apellido'].value,
      email: this.editPersonForm.controls['email'].value,
      celular: this.editPersonForm.controls['celular'].value,
      estado: this.editPersonForm.controls['estado'].value

    }

   
    this._personaService.editPersona(this.personaID,body_content).subscribe(() =>{
      this.loadPersona(this.personaID)
      window.scrollTo(0, 0)
      this.submitedFormPerson = false; 
      M.toast({ html: 'Persona editada correctamente!', classes: 'rounded' });
      
    
    },
    error =>{
      console.log(error);
    })

  }

  deletePersona(){
    this._personaService.deletePersona(this.personaID).subscribe(data =>{
      this._router.navigate(['admin/personas']);
    
    },
    error =>{
      console.log(error);
    })
  }

  asociarEmpresa(idEmpresa:number){
    if(this.relacionInput == ''){
      this.relacionRequired = true;
      return;
    }

    const body_content = {
      relacion: this.relacionInput
    }

    
    this._personaService.asociateEmpresa(this.personaID, idEmpresa,body_content).subscribe(data =>{
      this.relacionInput = '';
      this.relacionRequired = false;
      
      $("#asociarEmpresaModal").modal("close");
      M.toast({ html: "Relacion establecida correctamente", classes: 'rounded' });
      this.loadPersona(this.personaID);


    },
    error =>{
      console.log(error);
    })
  }


}
