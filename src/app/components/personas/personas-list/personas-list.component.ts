
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

declare var M:any;

@Component({
  selector: 'app-personas-list',
  templateUrl: './personas-list.component.html',
  styleUrls: ['./personas-list.component.scss',
              './responsive.scss']
})
export class PersonasListComponent implements OnInit {
  
  items = [1, 2, 3, 4];
  pageOfItems: Array<any> = [];

  constructor(private _router: Router) { }

  ngOnInit(): void {

      var elemsCollapsible = document.querySelectorAll('.collapsible');
      var instances = M.Collapsible.init(elemsCollapsible);
   
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  onClickEdit(){
    this._router.navigate(['/home/personas/1/detail']);

  }

  onClickAddPersona(){
    this._router.navigate(['/home/personas/create']);
  }

}
