import { Component } from '@angular/core';
import { ReservationService, Reservation } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: false
})
export class AdminPage {

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  async ngOnInit() {
    this.reservations = await this.reservationService.getReservations();
  }
}