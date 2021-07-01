import { Component, OnInit } from '@angular/core';
declare var M:any;

@Component({
  selector: 'app-personas-detail',
  templateUrl: './personas-detail.component.html',
  styleUrls: ['./personas-detail.component.scss',
              './responsive.scss']
})
export class PersonasDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
      var elemsModal = document.querySelectorAll('.modal');
      var instances = M.Modal.init(elemsModal);
    

  }

}
