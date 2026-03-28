import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService, Reservation } from 'src/app/services/reservation';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
  standalone: false
})
export class ConfirmationPage {

  reservation!: Reservation;

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    // 🔥 Trae todos los datos guardados
    this.reservation = this.reservationService.getReservation();
  }

  // 🔥 FORMATEAR FECHA (IMPORTANTE)
  formatDate(date: string): string {
    if (!date) return '';

    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  }

  // 🔥 CONFIRMAR RESERVA
  async confirmReservation() {

    // 👉 Validación básica (opcional pero pro)
    if (!this.reservation.customerName || !this.reservation.phone) {
      alert('Faltan datos del cliente');
      return;
    }

    await this.reservationService.saveReservation();

    console.log('Reserva guardada:', this.reservation);

    this.reservationService.clearReservation();

    alert('Reserva confirmada ✅');

    this.router.navigate(['/']);
  }

}