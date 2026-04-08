import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService, Reservation } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
  standalone: false
})
export class ConfirmationPage implements OnInit {

  reservation!: Reservation;

  // 🔥 CONTROL DEL MODAL
  showModal: boolean = false;

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.reservation = this.reservationService.getReservation();

    // 🔴 Validar que exista reserva
    if (!this.reservation) {
      this.router.navigate(['/']);
      return;
    }
  }

  // 🔥 FORMATEAR FECHA
  formatDate(date: string): string {
    if (!date) return '';

    // 🔥 Quitar la hora si viene tipo ISO
    const cleanDate = date.split('T')[0];

    const parts = cleanDate.split('-');

    if (parts.length === 3) {
      const year = parts[0];
      const month = parts[1].padStart(2, '0');
      const day = parts[2].padStart(2, '0');

      return `${day}/${month}/${year}`;
    }

    return cleanDate;
  }

  // 🔥 VALIDAR DATOS COMPLETOS
  isValidReservation(): boolean {

    // 🔴 Fecha
    if (!this.reservation.date || isNaN(new Date(this.reservation.date).getTime())) {
      return false;
    }

    // 🔴 Hora
    if (!this.reservation.time) {
      return false;
    }

    // 🔴 Nombre
    if (!this.reservation.customerName || this.reservation.customerName.trim().length < 3) {
      return false;
    }

    // 🔴 Teléfono
    if (!this.reservation.phone || !/^[0-9]{7,15}$/.test(this.reservation.phone)) {
      return false;
    }

    // 🔴 Email (opcional pero válido)
    if (this.reservation.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.reservation.email)) {
      return false;
    }

    // 🔴 Personas
    if (!this.reservation.people || this.reservation.people < 1) {
      return false;
    }

    return true;
  }

  // 🔥 CONFIRMAR RESERVA
  async confirmReservation() {

    // ❌ Validación completa
    if (!this.isValidReservation()) {
      alert('Datos incompletos o inválidos ❌');
      return;
    }

    // 💾 Guardar
    await this.reservationService.saveReservation();

    console.log('Reserva guardada:', this.reservation);

    // 🧹 Limpiar
    this.reservationService.clearReservation();

    // 🔥 MODAL BONITO
    this.showModal = true;

    // ⏳ ESPERA + REDIRECCIÓN
    setTimeout(() => {
      this.showModal = false;
      this.router.navigate(['/home-reservasya'], { replaceUrl: true });
    }, 2000);
  }

}