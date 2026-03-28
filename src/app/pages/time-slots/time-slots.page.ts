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
  availableTimeSlots: string[] = [];
  selectedDate: string = '';

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.selectedDate = this.reservationService.getReservation().date;

    // Generar horarios completos
    this.generateTimeSlots();

    // Filtrar horarios reservados
    const reservations = this.reservationService.getReservations();
    const reservedTimes = reservations
      .filter(r => r.date === this.selectedDate)
      .map(r => r.time);

    this.availableTimeSlots = this.timeSlots.filter(t => !reservedTimes.includes(t));
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
    if (!time) {
      alert('Selecciona un horario válido ⏰');
      return;
    }

    this.reservationService.setTime(time);
    this.router.navigate(['/customer-data']);
  }

  isReserved(time: string): boolean {
    return !this.availableTimeSlots.includes(time);
  }
}