import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
  standalone: false
})
export class ConfirmationPage {

  reservation: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.reservation = nav?.extras.state;
  }

  confirmReservation() {
    console.log('Reservation confirmed:', this.reservation);
  }

}