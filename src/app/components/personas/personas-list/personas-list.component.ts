
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PersonaService } from '@services/persona/persona.service';

declare var M:any;

//Models 

import { Persona } from 'src/app/modals/Persona';

@Component({
  selector: 'app-personas-list',
  templateUrl: './personas-list.component.html',
  styleUrls: ['./personas-list.component.scss',
              './responsive.scss']
})
export class PersonasListComponent implements OnInit {
  

  pageOfItemsPersonas: Array<any> = [];

  public personasArr: any = [];

  public isCheckedActive:any = '';

  public checked = false;
  public inputSearch = '';

  constructor(private _router: Router,private _personaService:PersonaService) { }

  ngOnInit(): void {

      var elemsCollapsible = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init(elemsCollapsible);
      
      this.loadPersonas();
   
  }

  loadPersonas() {
    this._personaService.getPersonas().subscribe(data => {
      this.personasArr = data;
      console.log(data);
    },
    error => {
      console.log(error);
    })
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItemsPersonas = pageOfItems;
  }

  onClickEdit(id:number){
    this._router.navigate(['/admin/personas/'+id+'/detail']);

  }

  onClickAddPersona(){
    this._router.navigate(['/admin/personas/create']);
  }

  onCheckBoxChange($event:any){
    let checked = $event.currentTarget.checked;

    if(checked){
      this.personasArr = this.personasArr.filter((elem:any) =>{ return elem.estado == "activo"});
      console.log(this.personasArr);  
 
    }else{
      this.loadPersonas();
    }
  }

  

}
