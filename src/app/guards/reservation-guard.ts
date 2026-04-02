import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ReservationService } from '../services/reservation.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationGuard implements CanActivate {

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const r = this.reservationService.getReservation();
    const path = route.routeConfig?.path;

    // ⏰ time-slots solo necesita fecha
    if (path === 'time-slots') {
      if (!r.date) {
        this.router.navigate(['/pages/calendar']);
        return false;
      }
      return true;
    }

    // 👤 customer-data necesita fecha + hora
    if (path === 'customer-data') {
      if (!r.date) {
        this.router.navigate(['/pages/calendar']);
        return false;
      }
      if (!r.time) {
        this.router.navigate(['/pages/time-slots']);
        return false;
      }
      return true;
    }

    // ✅ confirmation necesita todo
    if (path === 'confirmation') {
      if (!r.date) {
        this.router.navigate(['/pages/calendar']);
        return false;
      }
      if (!r.time) {
        this.router.navigate(['/pages/time-slots']);
        return false;
      }
      if (!r.customerName || !r.phone || !r.people) {
        this.router.navigate(['/pages/customer-data']);
        return false;
      }
      return true;
    }

    return true;
  }
}