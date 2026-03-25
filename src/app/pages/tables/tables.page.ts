import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.page.html',
  styleUrls: ['./tables.page.scss'],
  standalone: false
})
export class TablesPage {

  date: any;
  time: any;

  tables = [
    { id: 1, capacity: 2, status: 'available' },
    { id: 2, capacity: 4, status: 'occupied' },
    { id: 3, capacity: 6, status: 'available' },
    { id: 4, capacity: 2, status: 'reserved' },
    { id: 5, capacity: 8, status: 'available' },
  ];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.date = nav?.extras.state?.['date'];
    this.time = nav?.extras.state?.['time'];
  }

  selectTable(table: any) {
    this.router.navigate(['/confirmation'], {
      state: {
        date: this.date,
        time: this.time,
        table: table
      }
    });
  }

}