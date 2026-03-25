import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: false
})
export class CalendarPage {

  constructor(private router: Router) {}

  selectDate(event: any) {
    const date = event.detail.value;

    this.router.navigate(['/time-slots'], {
      state: { date }
    });
  }

}