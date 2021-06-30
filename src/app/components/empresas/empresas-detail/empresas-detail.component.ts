import { Component, OnInit } from '@angular/core';

declare var M:any;

@Component({
  selector: 'app-empresas-detail',
  templateUrl: './empresas-detail.component.html',
  styleUrls: ['./empresas-detail.component.scss']
})
export class EmpresasDetailComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
   
      var datePickeElement = document.querySelectorAll('.datepicker');
      var instances = M.Datepicker.init(datePickeElement)
  }

}
