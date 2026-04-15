import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  async ngOnInit() {
    // 🔥 BORRA SESIÓN SIEMPRE
    await this.auth.logout();
  }

  irLogin() {
    this.router.navigate(['/auth/login'], { replaceUrl: true });
  }
}