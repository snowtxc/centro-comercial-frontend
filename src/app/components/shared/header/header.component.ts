import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication/authentication.service';

//Services

import {HeaderSidebarService} from "@services/header-sidebar/header-sidebar.service";


declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss',
              './responsive.scss']
})
export class HeaderComponent implements OnInit {
  


  constructor(private headerSidebar:HeaderSidebarService,private _auth:AuthenticationService) { }

  ngOnInit(): void {
    $(".dropdown-trigger").dropdown();

  }


  pushNavMenu(){
     this.headerSidebar.toggleSidebar();

  }

  onPushLogout(){
    this._auth.destroyUserSesion();
    

  }

}
