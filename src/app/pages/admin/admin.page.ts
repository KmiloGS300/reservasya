import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: false

})
export class AdminPage {

  reservations = [
    {
      name: 'John',
      date: '2026-03-25',
      time: '18:00',
      table: 2
    }
  ];

}