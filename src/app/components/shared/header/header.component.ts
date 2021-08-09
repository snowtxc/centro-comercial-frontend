import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@services/authentication/authentication.service';

//Services

import {HeaderSidebarService} from "@services/header-sidebar/header-sidebar.service";
import { UserService } from '@services/user/user.service';


declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss',
              './responsive.scss']
})
export class HeaderComponent implements OnInit {
  
  username = "";

  constructor(private headerSidebar:HeaderSidebarService,private _auth:AuthenticationService,private _userService:UserService) { }

  ngOnInit(): void {
    $(".dropdown-trigger").dropdown();
    console.log('asdas');
    this.getUsername();

  }


  pushNavMenu(){
     this.headerSidebar.toggleSidebar();
  }


  onPushLogout(){
    this._auth.destroyUserSesion();
  }

  getUsername(){
    this._userService.getUsername().subscribe(username =>{
      this.username = username;
    });
  }

}
