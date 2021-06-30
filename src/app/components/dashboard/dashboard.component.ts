import { Component, OnInit } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items = [1,2,3,4];
  pageOfItems: Array<any> = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [
      { title: 'Avance software', date: '2021-08-06' },
      { title: 'Altech ', date: '2021-07-01' }
    ]
  };
  
  constructor() { 
    
  }

  ngOnInit(): void {
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }


}
