import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.page.html',
  styleUrls: ['./reservation-detail.page.scss'],
  standalone: false
})
export class ReservationDetailPage {

  reserva: any;

  // 🔴 control modal
  showDeleteModal = false;

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.reserva = nav?.extras.state?.['reserva'];
  }

  // 🔥 abrir modal
  openDeleteModal() {
    this.showDeleteModal = true;
  }

  // ❌ cancelar
  cancelDelete() {
    this.showDeleteModal = false;
  }

  // ✅ confirmar eliminación
  async confirmDelete() {

    this.showDeleteModal = false;

    await this.reservationService.deleteReservation(this.reserva);

    // 🔥 redirección + actualización automática
    this.router.navigateByUrl('/manage-reservations', { replaceUrl: true });

    setTimeout(() => {
      this.router.navigateByUrl('/pages/manage-reservation');
    }, 100);
  }
}