import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  isAdmin = false;
  isDetail = false; // 🔥 NUEVO (IMPORTANTE)

  // 🔥 navegación
  previousUrl: string = '';
  currentUrl: string = '';

  // 🔵 modales
  showLogoutModal = false;
  showConfirmNavModal = false;
  nextRoute: string = '';

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        this.previousUrl = this.currentUrl;
        this.currentUrl = event.urlAfterRedirects;

        const url = this.currentUrl;

        console.log('URL:', url);
        console.log('PREV:', this.previousUrl);

        // 🔥 ocultar navbar
        this.ocultarNavbar =
          url.includes('login') ||
          url.includes('register') ||
          url === '/home';

        // 🔥 reset estados
        this.isHomeReservasYa = false;
        this.isReservar = false;
        this.isGestionar = false;
        this.isAdmin = false;
        this.isDetail = false;

        // 🔥 detección de rutas
        if (url.includes('home-reservasya')) this.isHomeReservasYa = true;
        if (url.includes('calendar')) this.isReservar = true;
        if (url.includes('manage-reservation')) this.isGestionar = true;
        if (url.includes('admin')) this.isAdmin = true;
        if (url.includes('reservation-detail')) this.isDetail = true;
      }
    });
  }

  // 🔙 VOLVER (lo dejamos intacto por si lo usas en otras vistas)
  goBack() {

    console.log('BACK desde:', this.currentUrl);
    console.log('IR A:', this.previousUrl);

    // DETAIL → MANAGE
    if (this.currentUrl.includes('reservation-detail')) {
      this.router.navigate(['/pages/manage-reservation'], { replaceUrl: true });
      return;
    }

    // SI VIENE DE ADMIN
    if (this.previousUrl.includes('admin')) {
      this.router.navigate(['/pages/admin'], { replaceUrl: true });
      return;
    }

    // MANAGE → HOME
    if (this.currentUrl.includes('manage-reservation')) {
      this.router.navigate(['/pages/home-reservasya'], { replaceUrl: true });
      return;
    }

    // CALENDAR
    if (this.currentUrl.includes('calendar')) {

      if (this.previousUrl.includes('admin')) {
        this.router.navigate(['/pages/admin'], { replaceUrl: true });
        return;
      }

      this.router.navigate(['/pages/home-reservasya'], { replaceUrl: true });
      return;
    }

    // DEFAULT
    this.router.navigate(['/pages/home-reservasya'], { replaceUrl: true });
  }

  // 🔥 IR A RESERVAR
  goToReservar() {
    this.nextRoute = '/pages/calendar';

    if (this.isGestionar) {
      this.showConfirmNavModal = true;
    } else {
      this.router.navigateByUrl(this.nextRoute);
    }
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