import { Injectable } from '@angular/core';

import  {Subject} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class HeaderSidebarService {

  public subjectHeaderToSidebar = new Subject();

  constructor() { }


  toggleSidebar(){
    this.subjectHeaderToSidebar.next(1);
    
  }



}
