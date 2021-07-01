import { Component, OnInit } from '@angular/core';

//Services

import {HeaderSidebarService} from "../../../services/header-sidebar/header-sidebar.service";


declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss',
              './responsive.scss']
})
export class HeaderComponent implements OnInit {
  


  constructor(private headerSidebar:HeaderSidebarService) { }

  ngOnInit(): void {
    $(".dropdown-trigger").dropdown();

  }


  pushNavMenu(){
     this.headerSidebar.toggleSidebar();

  }

}
