import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: false
})
export class CalendarPage {

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}

  selectDate(event: any) {
    const date = event.detail.value;

    this.reservationService.setDate(date);
    this.router.navigate(['/pages/time-slots']);
  }
}