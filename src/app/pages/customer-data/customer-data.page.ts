import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-customer-data',
  templateUrl: './customer-data.page.html',
  styleUrls: ['./customer-data.page.scss'],
  standalone: false
})
export class CustomerDataPage {

  reservation = {
    name: '',
    phone: '',
    email: '',
    people: 1
  };

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}

  continue() {

    // 🔴 Seguridad extra (por si alguien fuerza el botón)
    if (!this.reservation.name || this.reservation.name.trim().length < 3) {
      return;
    }

    if (!this.reservation.phone || !/^[0-9]{7,15}$/.test(this.reservation.phone)) {
      return;
    }

    if (this.reservation.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.reservation.email)) {
      return;
    }

    if (!this.reservation.people || this.reservation.people < 1) {
      return;
    }

    // 🧹 Limpiar datos
    const cleanData = {
      name: this.reservation.name.trim(),
      phone: this.reservation.phone,
      email: this.reservation.email ? this.reservation.email.trim() : '',
      people: this.reservation.people
    };

    // 💾 Guardar
    this.reservationService.setCustomerData(
      cleanData.name,
      cleanData.people,
      cleanData.phone,
      cleanData.email
    );

    // 🚀 Navegar
    this.router.navigate(['/pages/confirmation']);
  }

}