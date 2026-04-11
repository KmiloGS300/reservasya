import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ReservationService, Reservation } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-manage-reservations',
  templateUrl: './manage-reservations.page.html',
  styleUrls: ['./manage-reservations.page.scss'],
  standalone: false
})
export class ManageReservationsPage implements OnInit {

  reservas: Reservation[] = [];
  reservasFiltradas: Reservation[] = [];
  searchTerm = '';

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.loadReservas();
  }

  // 🔥 ESTA ES LA MAGIA
  async ionViewWillEnter() {
    await this.loadReservas();
  }

  formatDate(date: string): string {
    if (!date) return '';

    // 🔥 quitar hora si viene tipo ISO
    const cleanDate = date.split('T')[0];

    const [year, month, day] = cleanDate.split('-');

    return `${day}/${month}/${year}`;
  }

  // 🔥 FUNCIÓN CENTRAL
  async loadReservas() {
    this.reservas = await this.reservationService.getReservations();
    this.reservasFiltradas = this.reservas;
  }

  buscar() {
    const term = this.searchTerm.toLowerCase();

    this.reservasFiltradas = this.reservas.filter(r =>
      r.customerName.toLowerCase().includes(term) ||
      r.email.toLowerCase().includes(term)
    );
  }

  verReserva(reserva: Reservation) {
    this.router.navigate(['/reservation-detail'], {
      state: { reserva }
    });
  }
}