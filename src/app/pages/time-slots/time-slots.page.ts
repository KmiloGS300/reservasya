import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation';

@Component({
  selector: 'app-time-slots',
  templateUrl: './time-slots.page.html',
  styleUrls: ['./time-slots.page.scss'],
  standalone: false
})
export class TimeSlotsPage implements OnInit {

  timeSlots: string[] = [];
  selectedDate: string = '';
  selectedTime: string = '';

  reservedTimes: string[] = [];
  pastTimes: string[] = [];

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}

  async ngOnInit() {

    const reservation = this.reservationService.getReservation();

    // 🔴 Validar fecha
    if (!reservation?.date) {
      this.router.navigate(['/pages/calendar']);
      return;
    }

    this.selectedDate = reservation.date;

    const selectedDateObj = new Date(this.selectedDate);

    if (isNaN(selectedDateObj.getTime())) {
      this.router.navigate(['/pages/calendar']);
      return;
    }

    // 🔥 Generar horarios
    this.timeSlots = this.generateTimeSlots();

    const reservations = await this.reservationService.getReservations();

    // 🔴 HORAS OCUPADAS (BD)
    this.reservedTimes = reservations
      .filter((r: any) => r.date === this.selectedDate)
      .map((r: any) => r.time);

    // 🔴 HORAS PASADAS (SI ES HOY)
    const today = new Date();
    const isToday = selectedDateObj.toDateString() === today.toDateString();

    if (isToday) {
      const currentHour = today.getHours();

      this.pastTimes = this.timeSlots.filter(time => {
        return this.parseHour(time) <= currentHour;
      });
    }
  }

  generateTimeSlots(): string[] {
    const slots: string[] = [];
    const startHour = 11;
    const endHour = 20;

    for (let hour = startHour; hour <= endHour; hour++) {
      const suffix = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour;
      slots.push(`${displayHour}:00 ${suffix}`);
    }

    return slots;
  }

  parseHour(time: string): number {
    const [hourPart, modifier] = time.split(' ');
    let hour = parseInt(hourPart.split(':')[0]);

    if (modifier === 'PM' && hour !== 12) hour += 12;
    if (modifier === 'AM' && hour === 12) hour = 0;

    return hour;
  }

  selectTime(time: string) {

    if (!time || this.isDisabled(time)) return;

    this.selectedTime = time;

    setTimeout(() => {
      this.reservationService.setTime(time);
      this.router.navigate(['/customer-data']);
    }, 300);
  }

  isReserved(time: string): boolean {
    return this.reservedTimes.includes(time);
  }

  isPast(time: string): boolean {
    return this.pastTimes.includes(time);
  }

  isDisabled(time: string): boolean {
    return this.isReserved(time) || this.isPast(time);
  }
}