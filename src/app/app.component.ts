import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {

  mostrarNavbar = true;

  constructor(
    private platform: Platform,
    private router: Router
  ) {
    this.platform.ready().then(() => {
      this.configureStatusBar();
    });

    // 👇 Controlar cuándo mostrar el navbar
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;

        const rutasSinNavbar = ['login', 'register', 'home'];

        this.mostrarNavbar = !rutasSinNavbar.some(ruta => url.includes(ruta));
      }
    });
  }

  // 🔷 Configuración del Status Bar
  async configureStatusBar() {
    if (!Capacitor.isNativePlatform()) return;

    try {
      await StatusBar.setStyle({ style: Style.Dark });
      await StatusBar.setOverlaysWebView({ overlay: false });
      await StatusBar.setBackgroundColor({ color: '#000000' });
    } catch (error) {
      console.error('Error configuring status bar:', error);
    }
  }

}