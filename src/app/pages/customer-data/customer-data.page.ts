import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/services/reservation';

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
    people: 0
  };

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}

  continue() {

    if (!this.reservation.name || !this.reservation.phone) {
      alert('Completa los datos');
      return;
    }

    this.reservationService.setCustomerData(
      this.reservation.name,
      this.reservation.people,
      this.reservation.phone,
      this.reservation.email
    );

    this.router.navigate(['/pages/confirmation']);
  }
}