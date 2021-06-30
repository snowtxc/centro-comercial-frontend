import { Component, OnInit } from '@angular/core';

declare var M:any;

@Component({
  selector: 'app-departamentos-localidades',
  templateUrl: './departamentos-localidades.component.html',
  styleUrls: ['./departamentos-localidades.component.scss']
})
export class DepartamentosLocalidadesComponent implements OnInit {

  items = [1, 2, 3, 4];
  pageOfItems: Array<any> = [];

  constructor() { }

  ngOnInit(): void {

      var elemsCollapsible = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init(elemsCollapsible);

      var modalElems = document.querySelectorAll('.modal');
      var instances = M.Modal.init(modalElems);
  
   
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }


}
