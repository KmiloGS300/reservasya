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

    // Validación: verificar que se haya seleccionado una fecha
    if (!date) {
      alert('Por favor selecciona una fecha válida 📅');
      return;
    }

    // Opcional: validar que la fecha no sea pasada
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0,0,0,0); // ignorar hora

    if (selectedDate < today) {
      alert('No puedes seleccionar una fecha pasada ❌');
      return;
    }

    // Guardar fecha en el servicio y navegar
    this.reservationService.setDate(date);
    this.router.navigate(['/pages/time-slots']);
  }
}