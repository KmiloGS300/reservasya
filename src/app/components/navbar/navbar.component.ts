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

  // 🔵 modal logout
  showLogoutModal: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        const url = event.urlAfterRedirects;

        console.log('URL ACTUAL:', url); // 🔥 debug

        // ❌ ocultar navbar SOLO login/register
        this.ocultarNavbar =
          url.startsWith('/auth/login') ||
          url.startsWith('/auth/register');

        // 🔥 SOLO para home-reservasya
        this.isHomeReservasYa = url.includes('/home-reservasya');
      }
    });
  }

  // 🔙 volver
  goBack() {
    window.history.back();
  }

  // 🔥 navegación
  goToReservar() {
    this.router.navigate(['/pages/calendar']);
  }

  goToGestionar() {
    this.router.navigate(['/pages/manage-reservation']);
  }

  // 🔐 logout (solo en HOME RESERVASYA)
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