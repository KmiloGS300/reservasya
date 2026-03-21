import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false
})
export class RegisterComponent {

  nombre: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  register() {
    if (!this.nombre || !this.email || !this.password) {
      alert('Completa todos los campos');
      return;
    }

    // Simulación registro
    alert('Cuenta creada correctamente 🎉');

    // Redirigir al login
    this.router.navigate(['/login']);
  }

  irLogin() {
    this.router.navigate(['/login']);
  }
}