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
  isDetail = false;

  previousUrl: string = '';
  currentUrl: string = '';

  showLogoutModal = false;
  showConfirmNavModal = false;
  nextRoute: string = '';

  constructor(
    private router: Router,
    private auth: AuthService
  ) {

    // 🔥 DETECTAR RUTA DESDE EL INICIO (FIX CLAVE)
    this.currentUrl = this.router.url;
    this.setRouteState(this.currentUrl);

    // 🔥 ESCUCHAR CAMBIOS DE RUTA
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {

        this.previousUrl = this.currentUrl;
        this.currentUrl = event.urlAfterRedirects;

        this.setRouteState(this.currentUrl);
      }
    });
  }

  // 🔥 NUEVO MÉTODO CENTRALIZADO
  setRouteState(url: string) {

    this.ocultarNavbar =
      url.includes('login') ||
      url.includes('register') ||
      url === '/home';

    this.isHomeReservasYa = false;
    this.isReservar = false;
    this.isGestionar = false;
    this.isAdmin = false;
    this.isDetail = false;

    if (url.includes('home-reservasya')) this.isHomeReservasYa = true;
    if (url.includes('calendar')) this.isReservar = true;
    if (url.includes('manage-reservation')) this.isGestionar = true;

    // 🔥 FIX ADMIN DEFINITIVO
    this.isAdmin = url.startsWith('/pages/admin');

    if (url.includes('reservation-detail')) this.isDetail = true;
  }

  goBack() {

    if (this.currentUrl.includes('reservation-detail')) {
      this.router.navigate(['/pages/manage-reservation'], { replaceUrl: true });
      return;
    }

    if (this.previousUrl.includes('admin')) {
      this.router.navigate(['/pages/admin'], { replaceUrl: true });
      return;
    }

    if (this.currentUrl.includes('manage-reservation')) {
      this.router.navigate(['/pages/home-reservasya'], { replaceUrl: true });
      return;
    }

    if (this.currentUrl.includes('calendar')) {

      if (this.previousUrl.includes('admin')) {
        this.router.navigate(['/pages/admin'], { replaceUrl: true });
        return;
      }

      this.router.navigate(['/pages/home-reservasya'], { replaceUrl: true });
      return;
    }

    this.router.navigate(['/pages/home-reservasya'], { replaceUrl: true });
  }

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