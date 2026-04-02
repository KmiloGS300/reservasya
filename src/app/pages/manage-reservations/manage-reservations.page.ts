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