import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

//Services

import { HeaderSidebarService } from 'src/app/services/header-sidebar/header-sidebar.service';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss',
              './responsive.scss']
})
export class SidebarMenuComponent implements OnInit ,AfterViewInit{
  @ViewChild('SideBar') sidebarElem : any;
  
  public toggleNavBar = false;
  constructor(private _headerSidebar: HeaderSidebarService) { }

  ngOnInit(): void {
    this._headerSidebar.subjectHeaderToSidebar.subscribe((data) =>{

      

      if(this.sidebarElem.nativeElement.classList.contains('show')){

        this.sidebarElem.nativeElement.classList.remove("show");
        this.sidebarElem.nativeElement.classList.add("mostrar");
      }else{
       
        this.sidebarElem.nativeElement.classList.add("show");
        this.sidebarElem.nativeElement.classList.remove("mostrar")
      }
        
    });
    
  
  }


  ngAfterViewInit(){ 
    
    
  }

  clickedItem(){
    this.sidebarElem.nativeElement.classList.add("show");
    this.sidebarElem.nativeElement.classList.remove("mostrar")

  }

}
