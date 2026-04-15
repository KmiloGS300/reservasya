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

  constructor(private reservationService: ReservationService) {}

  // 🔥 AL INICIAR
  async ngOnInit() {
    await this.loadReservas();
  }

  // 🔥 CUANDO REGRESAS A LA VISTA
  async ionViewWillEnter() {
    await this.loadReservas();
  }

  // 🔥 CARGAR RESERVAS
  async loadReservas() {
    this.reservas = await this.reservationService.getReservations();
  }

  // 🔥 EDITAR
  editar(reserva: Reservation) {
    this.selectedReserva = { ...reserva }; // copia segura
    this.showEditModal = true;
  }

  // 🔥 CERRAR MODAL
  cerrarModal() {
    this.showEditModal = false;
  }

  // 🔥 GUARDAR CAMBIOS
  async guardarCambios() {

    if (!this.selectedReserva || !this.selectedReserva.id) return;

    await this.reservationService.updateReservation(this.selectedReserva);

    // 🔥 cerrar modal edición
    this.showEditModal = false;

    // 🔥 mostrar éxito
    this.showSuccessModal = true;

    // 🔥 recargar lista
    await this.loadReservas();

    // 🔥 ocultar modal éxito
    setTimeout(() => {
      this.showSuccessModal = false;
    }, 2000);
  }

  // 🔥 ELIMINAR
  async eliminar(reserva: Reservation) {

    const confirmDelete = window.confirm('¿Eliminar reserva?');

    if (!confirmDelete) return;

    await this.reservationService.deleteReservation(reserva);

    // 🔥 actualizar lista
    await this.loadReservas();
  }
}