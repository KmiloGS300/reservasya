import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation';

@Component({
  selector: 'app-time-slots',
  templateUrl: './time-slots.page.html',
  styleUrls: ['./time-slots.page.scss'],
  standalone: false
})
export class TimeSlotsPage {

  timeSlots: string[] = [];

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {
    this.generateTimeSlots();
  }

  generateTimeSlots() {
    const startHour = 11;
    const endHour = 20;

    for (let hour = startHour; hour <= endHour; hour++) {
      const suffix = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour;
      this.timeSlots.push(`${displayHour}:00 ${suffix}`);
    }
  }

  selectTime(time: string) {
  this.reservationService.setTime(time);
  this.router.navigate(['/customer-data']); // 👈 CAMBIO
}
}