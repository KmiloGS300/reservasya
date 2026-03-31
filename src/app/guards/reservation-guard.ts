import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ReservationService } from '../services/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationGuard implements CanActivate {

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  canActivate(): boolean {

    const r = this.reservationService.getReservation();

    // 🔒 Validaciones por pasos

    // ❌ Si no hay fecha → no puede seguir
    if (!r.date) {
      this.router.navigate(['/pages/calendar']);
      return false;
    }

    // ❌ Si no hay hora → no puede ir más allá
    if (!r.time) {
      this.router.navigate(['/pages/time-slots']);
      return false;
    }

    // ❌ Si no hay datos del cliente → no puede confirmar
    if (!r.customerName || !r.phone || !r.people) {
      this.router.navigate(['/pages/customer-data']);
      return false;
    }

    return true;
  }
}