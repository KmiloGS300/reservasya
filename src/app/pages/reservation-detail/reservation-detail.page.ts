import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ReservationService, Reservation } from 'src/app/services/reservation';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.page.html',
  styleUrls: ['./reservation-detail.page.scss'],
  standalone: false
})
export class ReservationDetailPage {

  reserva: any;

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.reserva = nav?.extras.state?.['reserva'];
  }

  editar() {
    // luego lo conectamos con tu flujo
    alert('Editar próximamente ✏️');
  }

  async eliminar() {
    const confirm = window.confirm('¿Eliminar reserva?');

    if (!confirm) return;

    await this.reservationService.deleteReservation(this.reserva);

    alert('Reserva eliminada ✅');
    this.router.navigate(['/manage-reservations']);
  }
}