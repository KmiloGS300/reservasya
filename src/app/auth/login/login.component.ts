import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (!this.email || !this.password) {
      alert('Completa los campos');
      return;
    }

    // Simulación login
    if (this.email === 'admin@gmail.com' && this.password === '1234') {
      alert('Bienvenido 🔥');
      this.router.navigate(['/pages']);
    } else {
      alert('Credenciales incorrectas ❌');
    }
  }

  // 👇 ESTE VA FUERA DEL login()
  irRegistro() {
    this.router.navigate(['/auth/register']);
  }

}