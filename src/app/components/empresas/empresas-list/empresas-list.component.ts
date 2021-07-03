import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";

declare var M: any;

@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styleUrls: ['./empresas-list.component.scss',
               './responsive.scss']
})
export class EmpresasListComponent implements OnInit {

  items = [1, 2, 3, 4];
  pageOfItems: Array<any> = [];


  constructor(private _router:Router) { }

  ngOnInit(): void {
   
      var elems = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init(elems);
   
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  selectedEmpresa(){
      this._router.navigate(['/admin/empresas/1/detail']);
    
  }

  onClickAddEmpresa(){
    this._router.navigate(['/admin/empresas/create']);
    
  }
}
