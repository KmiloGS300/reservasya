import { Component, OnInit } from '@angular/core';
import { ReservationService, Reservation } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: false
})
export class AdminPage implements OnInit {

  reservas: Reservation[] = [];

  // 🔥 MODAL EDITAR
  showEditModal: boolean = false;
  selectedReserva: Reservation = {} as Reservation;

  // 🔥 MODAL ÉXITO
  showSuccessModal: boolean = false;
  successMessage: string = ''; // ✅ NUEVO

  // 🔥 MODAL ELIMINAR
  showDeleteModal: boolean = false;
  selectedToDelete: Reservation | null = null;

  constructor(private reservationService: ReservationService) {}

  async ngOnInit() {
    await this.loadReservas();
  }

  async ionViewWillEnter() {
    await this.loadReservas();
  }

  async loadReservas() {
    this.reservas = await this.reservationService.getReservations();
  }

  // ✏️ EDITAR
  editar(reserva: Reservation) {
    this.selectedReserva = { ...reserva };
    this.showEditModal = true;
  }

  cerrarModal() {
    this.showEditModal = false;
  }

  async guardarCambios() {

    if (!this.selectedReserva || !this.selectedReserva.id) return;

    await this.reservationService.updateReservation(this.selectedReserva);

    this.showEditModal = false;

    // 🔥 MENSAJE DINÁMICO
    this.successMessage = 'La reserva fue modificada correctamente';
    this.showSuccessModal = true;

    await this.loadReservas();

    setTimeout(() => {
      this.showSuccessModal = false;
    }, 2000);
  }

  // 🗑️ ELIMINAR (ABRE MODAL)
  eliminar(reserva: Reservation) {
    this.selectedToDelete = reserva;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.selectedToDelete = null;
  }

  async confirmDelete() {

    if (!this.selectedToDelete) return;

    await this.reservationService.deleteReservation(this.selectedToDelete);

    this.showDeleteModal = false;
    this.selectedToDelete = null;

    await this.loadReservas();

    // 🔥 MENSAJE DINÁMICO
    this.successMessage = 'La reserva fue eliminada correctamente';
    this.showSuccessModal = true;

    setTimeout(() => {
      this.showSuccessModal = false;
    }, 2000);
  }
}