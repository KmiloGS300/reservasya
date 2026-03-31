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

  selectedDate: string = '';

  // 🔥 Fecha mínima = hoy
  minDate: string = new Date().toISOString();

  // 🔥 Fecha máxima = hoy + 3 meses
  maxDate: string = (() => {
    const d = new Date();
    d.setMonth(d.getMonth() + 3);
    return d.toISOString();
  })();

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}

  continue() {
    if (!this.selectedDate) return;

    this.reservationService.setDate(this.selectedDate);
    this.router.navigate(['/pages/time-slots']);
  }
}