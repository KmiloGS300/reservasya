import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false
})
export class NavbarComponent {

  ocultarNavbar = false;

  isHomeReservasYa = false;
  isReservar = false;
  isGestionar = false;

  // 🔵 modales
  showLogoutModal = false;
  showConfirmNavModal = false;
  nextRoute: string = '';

  constructor(
    private router: Router,
    private location: Location,
    private auth: AuthService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        const url = event.urlAfterRedirects;

        console.log('URL ACTUAL:', url);

        // 🔥 ocultar navbar
        this.ocultarNavbar =
          url.includes('login') ||
          url.includes('register') ||
          url === '/home';

        // 🔥 resetear estados
        this.isHomeReservasYa = false;
        this.isReservar = false;
        this.isGestionar = false;

        // 🔥 detectar rutas (ROBUSTO)
        if (url.includes('home-reservasya')) {
          this.isHomeReservasYa = true;
        }

        if (url.includes('calendar')) {
          this.isReservar = true;
        }

        if (url.includes('manage-reservation')) {
          this.isGestionar = true;
        }

        console.log('Reservar:', this.isReservar);
        console.log('Gestionar:', this.isGestionar);
      }
    });
  }

  // 🔙 volver
  goBack() {

    const url = this.router.url;

    const isSpecialPage =
      url.includes('reservation-detail') ||
      url.includes('manage-reservation');

    if (isSpecialPage) {

      // 🔥 INTENTA usar history real primero
      this.location.back();

      // 🔥 fallback por si el history está roto
      setTimeout(() => {
        if (this.router.url === url) {
          this.router.navigate(['/home-reservasya'], { replaceUrl: true });
        }
      }, 100);

    } else {
      // ✅ comportamiento normal en toda la app
      this.location.back();
    }

  }

  // 🔥 IR A RESERVAR
  goToReservar() {
    this.nextRoute = '/pages/calendar';

    // SOLO mostrar modal si vienes de gestionar
    if (this.isGestionar) {
      this.showConfirmNavModal = true;
    } else {
      this.router.navigateByUrl(this.nextRoute);
    }
  }

  // 🔥 (ya no lo usamos pero lo dejo por si luego lo necesitas)
  goToGestionar() {
    this.router.navigateByUrl('/pages/manage-reservation');
  }

  confirmNavigation() {
    this.showConfirmNavModal = false;

    setTimeout(() => {
      this.router.navigateByUrl(this.nextRoute);
      this.nextRoute = '';
    }, 100);
  }

  cancelNavigation() {
    this.showConfirmNavModal = false;
  }

  // 🔐 logout
  handleLogout() {
    this.showLogoutModal = true;
  }

  cancelLogout() {
    this.showLogoutModal = false;
  }

  confirmLogout() {
    this.showLogoutModal = false;
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }
}