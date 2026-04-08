import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AntiAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {

    const logged = await this.auth.isLogged();

    const url = this.router.url;

    // 👇 permitir acceso a register siempre
    if (url.includes('register')) {
      return true;
    }

    if (logged) {
      this.router.navigate(['/pages/home-reservasya']);
      return false;
    }

    return true;
  }
}