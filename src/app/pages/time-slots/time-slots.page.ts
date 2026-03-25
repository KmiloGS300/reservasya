import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time-slots',
  templateUrl: './time-slots.page.html',
  styleUrls: ['./time-slots.page.scss'],
  standalone: false
})
export class TimeSlotsPage {

  date: any;
  timeSlots: string[] = [];

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.date = nav?.extras.state?.['date'];

    this.generateTimeSlots();
  }

  generateTimeSlots() {
    const startHour = 11; // 11 AM
    const endHour = 20;   // 8 PM

    for (let hour = startHour; hour <= endHour; hour++) {
      const formattedHour = this.formatHour(hour);
      this.timeSlots.push(formattedHour);
    }
  }

  formatHour(hour: number): string {
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;

    return `${displayHour}:00 ${suffix}`;
  }

  selectTime(time: string) {
    this.router.navigate(['/pages/tables'], {
      state: {
        date: this.date,
        time: time
      }
    });
  }

}